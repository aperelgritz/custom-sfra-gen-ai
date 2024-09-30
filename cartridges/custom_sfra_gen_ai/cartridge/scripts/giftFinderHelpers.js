'use strict';

var searchGenAiHelpers = require('*/cartridge/scripts/searchGenAiHelpers');

function decodeHtmlEntities(str) {
	return str
		.replace(/&quot;/g, '"')
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&#39;/g, "'");
}

function callGiftFinderPrompt(userQuery) {
	var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
	var oauthUtils = require('*/cartridge/scripts/sfOauth');

	// var promptTemplate = getPromptTemplateName();

	try {
		var oauthToken = oauthUtils.getOAuthToken();

		var service = LocalServiceRegistry.createService(
			'salesforce.connect.rest',
			{
				createRequest: function (svc, params) {
					svc.setURL(svc.getURL() + `/Gift_Finder/generations`);
					svc.setRequestMethod('POST');
					svc.addHeader('Authorization', 'Bearer ' + oauthToken);
					svc.addHeader('Content-Type', 'application/json');

					// Replace this payload with your actual payload
					var payload = JSON.stringify({
						isPreview: 'false',
						inputParams: {
							valueMap: {
								'Input:User_Query': {
									value: userQuery,
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
			var promptRes = decodeHtmlEntities(result.object.generations[0].text);
			var promptResParsed = JSON.parse(promptRes);
			return promptResParsed;
		} else {
			throw new Error();
		}
	} catch (error) {
		return error;
	}
}

exports.callGiftFinderPrompt = callGiftFinderPrompt;
