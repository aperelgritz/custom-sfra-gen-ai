'use strict';

var server = require('server');
server.extend(module.superModule);

var genAiConfig = require('*/cartridge/config/genAiConfig');
var genericGenAiHelpers = require('*/cartridge/scripts/genericGenAiHelpers');

server.get('GenAI', function (req, res, next) {
	var searchGenAiHelpers = require('*/cartridge/scripts/searchGenAiHelpers');

	// Log search query and response time
	var startTime = genAiConfig.logGenAiSearchPerf ? new Date() : null;

	var promptResParsed = searchGenAiHelpers.callNatLangSearchPrompt(
		req.querystring.q
	);

	var result = searchGenAiHelpers.searchIds(req, promptResParsed.products);

	// Log search query and response time
	genericGenAiHelpers.logSearchPerformance(req.querystring.q, startTime);

	res.render('search/searchResults', {
		productSearch: result.productSearch,
		maxSlots: result.maxSlots,
		reportingURLs: result.reportingURLs,
		refineurl: result.refineurl,
		category: result.category ? result.category : null,
		canonicalUrl: result.canonicalUrl,
		schemaData: result.schemaData,
		apiProductSearch: result.apiProductSearch,
		userQuery: req.querystring.q,
		summaryText: promptResParsed.text,
	});

	return next();
});

module.exports = server.exports();
