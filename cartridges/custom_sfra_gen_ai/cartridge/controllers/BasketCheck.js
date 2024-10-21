'use strict';

var server = require('server');

var BasketMgr = require('dw/order/BasketMgr');
var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var oauthUtils = require('*/cartridge/scripts/sfOauth');
var genericGenAiHelpers = require('*/cartridge/scripts/genericGenAiHelpers');
var basketCheckHelpers = require('*/cartridge/scripts/basketCheckHelpers');

server.get('Start', server.middleware.https, function (req, res, next) {
	var customer = req.currentCustomer.raw;

	if (!customer.isAuthenticated()) {
		res.render('cart/basketCheck/basketCheck', {
			success: false,
			data: 'Please login so we can check your order history.',
		});
		return next();
	}

	// Get the latest orders in condensed format
	var ordersJson = basketCheckHelpers.getCondensedOrders(customer);

	if (!ordersJson) {
		res.render('cart/basketCheck/basketCheck', {
			success: false,
			data: 'No order history found.',
		});
		return next();
	}

	var currentBasket = BasketMgr.getCurrentBasket();

	if (!currentBasket || currentBasket.productQuantityTotal === 0) {
		res.render('cart/basketCheck/basketCheck', {
			success: false,
			data: 'Basket is empty.',
		});
		return next();
	}

	// Map the basket's product line items to a JSON object
	var basketJson = basketCheckHelpers.getCondensedBasket(currentBasket);

	try {
		var oauthToken = oauthUtils.getOAuthToken();

		var service = LocalServiceRegistry.createService(
			'salesforce.connect.rest',
			{
				createRequest: function (svc, params) {
					svc.setURL(svc.getURL() + '/Basket_Check/generations');
					svc.setRequestMethod('POST');
					svc.addHeader('Authorization', 'Bearer ' + oauthToken);
					svc.addHeader('Content-Type', 'application/json');

					var safeBasket =
						genericGenAiHelpers.escapeAndStringifyJson(basketJson);
					var safePastOrders =
						genericGenAiHelpers.escapeAndStringifyJson(ordersJson);

					// Replace this payload with your actual payload
					var payload = JSON.stringify({
						isPreview: 'false',
						inputParams: {
							valueMap: {
								'Input:Basket_Products': {
									value: safeBasket,
								},
								'Input:Order_History': {
									value: safePastOrders,
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
			const htmlDecoded = genericGenAiHelpers.decodeHtmlEntities(
				result.object.generations[0].text
			);
			const jsonObject = JSON.parse(htmlDecoded);
			let prodIds = [];
			prodIds = jsonObject.missingProducts.map((prod) => prod.productId);
			let enrichedJsonObject =
				basketCheckHelpers.enrichMissingProducts(prodIds);

			res.render('cart/basketCheck/basketCheck', {
				success: true,
				data: enrichedJsonObject,
			});
		} else {
			res.render('cart/basketCheck/basketCheck', {
				success: false,
				data: result.errorMessage,
			});
		}
	} catch (error) {
		res.render('cart/basketCheck/basketCheck', {
			success: false,
			data: error.message,
		});
	}

	next();
});

server.get('Mock', server.middleware.https, function (req, res, next) {
	let enrichedJsonObject = {
		missingProducts: [
			{
				productId: '701644259235M',
				productImage:
					'/on/demandware.static/-/Sites-apparel-m-catalog/default/dw8c24749d/images/small/PG.10255090.JJ169XX.PZ.jpg',
				productName: 'Belted Fit and Flare.',
				productPrice: '£81.92',
			},
			{
				productId: '701644333768M',
				productImage:
					'/on/demandware.static/-/Sites-apparel-m-catalog/default/dwc90163ce/images/small/PG.10244893.JJ493XX.PZ.jpg',
				productName: 'Cap Sleeve Wrap Dress.',
				productPrice: '£95.36',
			},
			{
				productId: '701644026646M',
				productImage:
					'/on/demandware.static/-/Sites-apparel-m-catalog/default/dw3bd61506/images/small/PG.10234340.JJ0DDXX.PZ.jpg',
				productName: 'Floral Scoop Neck Tank Dress',
				productPrice: '£56.96',
			},
		],
	};

	res.render('cart/basketCheck/basketCheck', {
		success: true,
		data: enrichedJsonObject,
	});

	next();
});

module.exports = server.exports();
