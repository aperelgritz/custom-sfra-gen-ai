'use strict';

var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var Site = require('dw/system/Site');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Transaction = require('dw/system/Transaction');

var genAiConfig = require('*/cartridge/config/genAiConfig');

/**
 * Get OAuth token from Salesforce
 * @returns {string} OAuth token
 */
function getOAuthToken() {
	// Get stored token
	var tokenCustomObject = CustomObjectMgr.getCustomObject(
		'SFGenAIAuth',
		Site.getCurrent().getID()
	);
	var accessToken, expirationTime;

	// Check if there's a cached token
	if (tokenCustomObject) {
		accessToken = tokenCustomObject.custom.accessToken;
		expirationTime = tokenCustomObject.custom.expirationTime;

		// Check if the token is still valid
		if (new Date() < new Date(parseInt(expirationTime))) {
			return accessToken;
		}
	}

	var service = LocalServiceRegistry.createService('salesforce.oauth', {
		createRequest: function (svc) {
			var svcCredential = svc.getConfiguration().getCredential();
			if (
				empty(svcCredential.getUser()) ||
				empty(svcCredential.getPassword()) ||
				empty(svcCredential.custom.genAiClientId) ||
				empty(svcCredential.custom.genAiClientSecret)
			) {
				throw new Error(
					'Service configuration requires valid username, password, client ID and client secret'
				);
			}

			svc.setRequestMethod('POST');
			svc.setAuthentication('NONE');
			svc.addHeader('Content-Type', 'application/x-www-form-urlencoded');
			svc.addHeader('Accept', 'application/json');
			svc.addParam('grant_type', 'password');
			svc.addParam('username', svcCredential.getUser());
			svc.addParam('password', svcCredential.getPassword());
			svc.addParam('client_id', svcCredential.custom.genAiClientId);
			svc.addParam('client_secret', svcCredential.custom.genAiClientSecret);
		},
		parseResponse: function (svc, response) {
			return JSON.parse(response.text);
		},
	});

	var config = service.getConfiguration();
	var reqData = service.getRequestData();
	var url = service.getURL();

	var result = service.call();
	if (result.status === 'OK' && result.object) {
		accessToken = result.object.access_token;
		expirationTime = parseInt(result.object.issued_at) + 3600000;

		// Cache the new token
		Transaction.wrap(function () {
			if (!tokenCustomObject) {
				tokenCustomObject = CustomObjectMgr.createCustomObject(
					'SFGenAIAuth',
					Site.getCurrent().getID()
				);
			}
			tokenCustomObject.custom.accessToken = accessToken;
			tokenCustomObject.custom.expirationTime = expirationTime.toString();
		});

		return accessToken;
	}

	throw new Error('Failed to obtain OAuth token');
}

module.exports = {
	getOAuthToken: getOAuthToken,
};
