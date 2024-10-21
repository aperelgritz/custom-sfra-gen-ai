'use strict';

var genericGenAiHelpers = require('*/cartridge/scripts/genericGenAiHelpers');

function getPromptTemplateName() {
	const Site = require('dw/system/Site');
	return Site.getCurrent().preferences.custom.promptBuilderTemplate;
}

function callNatLangSearchPrompt(userQuery) {
	var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
	var oauthUtils = require('*/cartridge/scripts/sfOauth');

	var promptTemplate = getPromptTemplateName();

	try {
		var oauthToken = oauthUtils.getOAuthToken();

		var service = LocalServiceRegistry.createService(
			'salesforce.connect.rest',
			{
				createRequest: function (svc, params) {
					svc.setURL(svc.getURL() + `/${promptTemplate}/generations`);
					svc.setRequestMethod('POST');
					svc.addHeader('Authorization', 'Bearer ' + oauthToken);
					svc.addHeader('Content-Type', 'application/json');

					// Replace this payload with your actual payload
					var payload = JSON.stringify({
						isPreview: 'false',
						inputParams: {
							valueMap: {
								'Input:User_Query': {
									value: userQuery,
								},
							},
						},
						additionalConfig: {
							numGenerations: 1,
							temperature: 0,
							frequencyPenalty: 0.0,
							presencePenalty: 0.0,
							additionalParameters: {},
							applicationName: 'PromptBuilderPreview',
						},
					});

					return payload;
				},
				parseResponse: function (svc, response) {
					return JSON.parse(response.text);
				},
			}
		);

		var result = service.call();

		if (result.status === 'OK') {
			var promptRes = genericGenAiHelpers.decodeHtmlEntities(
				result.object.generations[0].text
			);
			var promptResParsed = JSON.parse(promptRes);
			return promptResParsed;
		} else {
			throw new Error();
		}
	} catch (error) {
		return error;
	}
}

/**
 * performs a search
 *
 * @param {Object} req - Provided HTTP query parameters
 * @param {Object} res - Provided HTTP query parameters
 * @return {Object} - an object with relevant search information
 * @param {Object} httpParameterMap - Query params
 */
function searchIds(req, ids) {
	var CatalogMgr = require('dw/catalog/CatalogMgr');
	var URLUtils = require('dw/web/URLUtils');
	var ProductSearchModel = require('dw/catalog/ProductSearchModel');
	var ArrayList = require('dw/util/ArrayList');

	var pageMetaHelper = require('*/cartridge/scripts/helpers/pageMetaHelper');
	var ProductSearch = require('*/cartridge/models/search/productSearch');
	var reportingUrlsHelper = require('*/cartridge/scripts/reportingUrls');
	var schemaHelper = require('*/cartridge/scripts/helpers/structuredDataHelper');
	var searchHelpers = require('*/cartridge/scripts/helpers/searchHelpers');

	var apiProductSearch = new ProductSearchModel();
	var categoryTemplate = '';
	var maxSlots = 4;
	var productSearch;
	var reportingURLs;

	var productIdsArrayList = new ArrayList();
	productIdsArrayList.add(ids);
	// Max 30 IDs supported in setProductIDs
	apiProductSearch.setProductIDs(productIdsArrayList.slice(0, 30));

	apiProductSearch.search();

	// if (!apiProductSearch.personalizedSort) {
	// 	applyCache(res);
	// }
	categoryTemplate = searchHelpers.getCategoryTemplate(apiProductSearch);
	productSearch = new ProductSearch(
		apiProductSearch,
		req.querystring,
		req.querystring.srule,
		CatalogMgr.getSortingOptions(),
		CatalogMgr.getSiteCatalog().getRoot()
	);

	pageMetaHelper.setPageMetaTags(req.pageMetaData, productSearch);

	var canonicalUrl = URLUtils.url('Search-Show', 'cgid', req.querystring.cgid);
	var refineurl = URLUtils.url('Search-Refinebar');
	var allowedParams = ['q', 'cgid', 'pmin', 'pmax', 'srule', 'pmid'];
	var isRefinedSearch = false;

	Object.keys(req.querystring).forEach(function (element) {
		if (allowedParams.indexOf(element) > -1) {
			refineurl.append(element, req.querystring[element]);
		}

		if (['pmin', 'pmax'].indexOf(element) > -1) {
			isRefinedSearch = true;
		}

		if (element === 'preferences') {
			var i = 1;
			isRefinedSearch = true;
			Object.keys(req.querystring[element]).forEach(function (preference) {
				refineurl.append('prefn' + i, preference);
				refineurl.append('prefv' + i, req.querystring[element][preference]);
				i++;
			});
		}
	});

	if (productSearch.searchKeywords !== null && !isRefinedSearch) {
		reportingURLs =
			reportingUrlsHelper.getProductSearchReportingURLs(productSearch);
	}

	var result = {
		productSearch: productSearch,
		maxSlots: maxSlots,
		reportingURLs: reportingURLs,
		refineurl: refineurl,
		canonicalUrl: canonicalUrl,
		apiProductSearch: apiProductSearch,
	};

	if (
		productSearch.isCategorySearch &&
		!productSearch.isRefinedCategorySearch &&
		categoryTemplate &&
		apiProductSearch.category.parent.ID === 'root'
	) {
		pageMetaHelper.setPageMetaData(req.pageMetaData, productSearch.category);
		result.category = apiProductSearch.category;
		result.categoryTemplate = categoryTemplate;
	}

	if (
		!categoryTemplate ||
		categoryTemplate === 'rendering/category/categoryproducthits'
	) {
		result.schemaData = schemaHelper.getListingPageSchema(
			productSearch.productIds
		);
	}

	return result;
}

exports.searchIds = searchIds;
exports.callNatLangSearchPrompt = callNatLangSearchPrompt;
