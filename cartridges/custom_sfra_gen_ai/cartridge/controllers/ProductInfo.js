'use strict';

var server = require('server');

// Get Price, Colors, Sizes to enrich Catalog CSV with a Python script
server.get('Get', function (req, res, next) {
	var ProductMgr = require('dw/catalog/ProductMgr');
	var Currency = require('dw/util/Currency');

	var gbpCurrency = Currency.getCurrency('GBP');
	session.setCurrency(gbpCurrency);

	var id = req.querystring.id;
	var product = ProductMgr.getProduct(id);

	var pvm = product.getVariationModel();
	var iter = pvm.getProductVariationAttributes().iterator();
	var colorValues = [];
	var sizeValues = [];

	while (iter.hasNext()) {
		var attr = iter.next();
		if (attr.ID === 'color') {
			var attrValueColl = pvm.getAllValues(attr).toArray();
			for (var value of attrValueColl) {
				colorValues.push(value.getDisplayValue());
			}
		}
		if (attr.ID === 'size') {
			var attrValueColl = pvm.getAllValues(attr).toArray();
			for (var value of attrValueColl) {
				sizeValues.push(value.getDisplayValue());
			}
		}
	}

	var output = {
		productId: id,
		price: product.getPriceModel().getMaxPrice().toFormattedString(),
		colorValues: colorValues,
		sizeValues: sizeValues,
	};

	res.json(output);

	next();
});

module.exports = server.exports();
