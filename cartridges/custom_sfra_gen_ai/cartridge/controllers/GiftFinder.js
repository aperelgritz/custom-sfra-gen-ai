'use strict';

var server = require('server');

// Display Landing Page for Gift Finder by Price
server.get('Start', server.middleware.https, function (req, res, next) {
	res.render('giftFinder/giftFinder');
	next();
});

// Display Landing Page for Gift Finder Self-Grouping
server.get(
	'StartSelfGrouping',
	server.middleware.https,
	function (req, res, next) {
		res.render('giftFinder/giftFinderSelfGrouping');
		next();
	}
);

// Process user query for Gift Finder by Price
server.get('Query', server.middleware.https, function (req, res, next) {
	var giftFinderHelpers = require('*/cartridge/scripts/giftFinderHelpers');

	var promptResParsed = giftFinderHelpers.callGiftFinderPrompt(
		req.querystring.q,
		'Gift_Finder'
	);

	res.render('giftFinder/giftFinder', promptResParsed);

	next();
});

// Process user query for Gift Finder Self-Grouping
server.get(
	'QuerySelfGrouping',
	server.middleware.https,
	function (req, res, next) {
		var giftFinderHelpers = require('*/cartridge/scripts/giftFinderHelpers');

		var promptResParsed = giftFinderHelpers.callGiftFinderPrompt(
			req.querystring.q,
			'Gift_Finder_Self_Grouping'
		);

		res.render('giftFinder/giftFinderSelfGrouping', promptResParsed);

		next();
	}
);

module.exports = server.exports();
