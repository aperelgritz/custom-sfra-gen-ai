'use strict';

var server = require('server');
server.extend(module.superModule);

var Logger = require('dw/system/Logger');

server.get('GenAI', function (req, res, next) {
	var searchGenAiHelpers = require('*/cartridge/scripts/searchGenAiHelpers');

	var startTime = new Date();

	var promptResParsed = searchGenAiHelpers.callNatLangSearchPrompt(
		req.querystring.q
	);

	var result = searchGenAiHelpers.searchIds(req, promptResParsed.products);

	var endTime = new Date();
	var responseTime = endTime - startTime; // time in milliseconds

	// Log the query and response time
	Logger.warn(
		'Call to "Search-GenAI" with q="' +
			req.querystring.q +
			'". Response time: ' +
			responseTime +
			'ms'
	);

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
