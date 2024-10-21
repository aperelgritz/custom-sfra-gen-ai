'use strict';

var ProductSearchModel = require('dw/catalog/ProductSearchModel');
var ArrayList = require('dw/util/ArrayList');

/**
 * Gets the current customer's previous orders in condensed format
 * @param {dw.customer.Customer} customer - xxx
 * @returns {Object} a plain object of the current customer's orders
 */
function getCondensedOrders(customer) {
	var orderHist = customer.getOrderHistory();

	if (orderHist.getOrderCount() === 0) {
		return null;
	}

	// Limit the results to the last 2 orders
	var orders = orderHist.getOrders();
	var lastOrders = [];
	var counter = 0;
	while (orders.hasNext() && counter < 2) {
		lastOrders.push(orders.next());
		counter++;
	}
	orders.close();

	// Serialize the orders into a JSON object
	var condensedOrders = [];
	condensedOrders = lastOrders.map(function (order) {
		return {
			orderDate: order.creationDate,
			items: order.productLineItems.toArray().map((item) => ({
				productName: item.productName,
				productId: item.productID,
				quantity: item.quantity.value,
			})),
		};
	});

	return condensedOrders;
}

function getCondensedBasket(basket) {
	var basketJson = {};
	basketJson = basket.productLineItems.toArray().map((item) => ({
		productName: item.productName,
		quantity: item.quantity.value,
	}));

	return basketJson;
}

function enrichMissingProducts(prodIds) {
	// function enrichMissingProducts(prodsObj) {
	var productIds = new ArrayList();
	for (let i = 0; i < prodIds.length; i++) {
		productIds.add(prodIds[i]);
	}
	// for (let i = 0; i < prodsObj.length; i++) {
	// 	productIds.add({
	// 		productId: prodsObj[i].productId,
	// 		orderDate: prodsObj[i].orderDate,
	// 	});
	// }

	var productSearchModel = new ProductSearchModel();
	productSearchModel.setProductIDs(productIds);
	productSearchModel.search();

	var searchHits = productSearchModel.getProductSearchHits();
	var products = [];

	while (searchHits.hasNext()) {
		var searchHit = searchHits.next();
		var product = searchHit.getFirstRepresentedProduct();
		products.push({
			productName: product.getName(),
			productId: searchHit.getFirstRepresentedProductID(),
			productImage: product.getImage('small').URL.toString(),
			productPrice: product.getPriceModel().getPrice().toFormattedString(),
		});
	}

	return {
		missingProducts: products,
	};
}

module.exports = {
	getCondensedOrders: getCondensedOrders,
	getCondensedBasket: getCondensedBasket,
	enrichMissingProducts: enrichMissingProducts,
};
