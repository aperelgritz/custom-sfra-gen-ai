'use strict';

var server = require('server');

server.get('Start', server.middleware.https, function (req, res, next) {
	res.render('giftFinder/giftFinder');
	next();
});

server.get('Query', server.middleware.https, function (req, res, next) {
	var giftFinderHelpers = require('*/cartridge/scripts/giftFinderHelpers');

	var promptResParsed = giftFinderHelpers.callGiftFinderPrompt(
		req.querystring.q
	);

	res.render('giftFinder/giftFinder', promptResParsed);

	// res.render('giftFinder/giftFinder', {
	// 	productIds: [
	// 		'25695701M',
	// 		'25589508M',
	// 		'25720046M',
	// 		'25419334M',
	// 		'25493613M',
	// 	],
	// });

	next();
});

module.exports = server.exports();
