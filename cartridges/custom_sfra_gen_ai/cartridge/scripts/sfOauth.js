'use strict';

var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var Site = require('dw/system/Site');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Transaction = require('dw/system/Transaction');

/**
 * Get OAuth token from Salesforce
 * @returns {string} OAuth token
 */
function getOAuthToken() {
	// Get stored token
	var tokenCustomObject = CustomObjectMgr.getCustomObject(
		'SFGenAIAuth',
		'RefArchGlobal'
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
			svc.setRequestMethod('POST');
			svc.setAuthentication('NONE');
			svc.addHeader('Content-Type', 'application/x-www-form-urlencoded');
			svc.addHeader('Accept', 'application/json');
			svc.addParam('grant_type', 'password');
			svc.addParam('username', 'aperelgritz@rcg-ido-spring24.demo');
			svc.addParam('password', 'W0c2K02Ece*g');
			svc.addParam(
				'client_id',
				'3MVG9SOw8KERNN08QjNMFkqCpGKTN.m6wH1Q2LQWOViFBLZf4BoPYnaeloHoU35820qoGJWLNCaV0VaeB1nWK'
			);
			svc.addParam(
				'client_secret',
				'8063D39369E69213FA5E92729615C77967BB4AD17EB65E7F9962F3EA91639C9C'
			);

			// var clientId = Site.getCurrent().getCustomPreferenceValue('clientId');
			// var clientSecret =
			// 	Site.getCurrent().getCustomPreferenceValue('clientSecret');
			// var username = Site.getCurrent().getCustomPreferenceValue('username');
			// var password = Site.getCurrent().getCustomPreferenceValue('password');
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
					'RefArchGlobal'
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
