'use strict';

var server = require('server');

server.get('Start', server.middleware.https, function (req, res, next) {
	res.render('giftFinder/giftFinder');
	next();
});

server.get(
	'StartSelfGrouping',
	server.middleware.https,
	function (req, res, next) {
		res.render('giftFinder/giftFinderSelfGrouping');
		next();
	}
);

server.get('Query', server.middleware.https, function (req, res, next) {
	var giftFinderHelpers = require('*/cartridge/scripts/giftFinderHelpers');

	var promptResParsed = giftFinderHelpers.callGiftFinderPrompt(
		req.querystring.q,
		'Gift_Finder'
	);

	res.render('giftFinder/giftFinder', promptResParsed);

	next();
});

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
