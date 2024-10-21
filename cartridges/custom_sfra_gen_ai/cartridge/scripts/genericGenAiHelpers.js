'use strict';

function escapeAndStringifyJson(json) {
	let stringifiedJson = JSON.stringify(json);
	let safeString = stringifiedJson.replace(/[\&\<\>\'\"\/]/g, function (char) {
		return {
			'&': '\\&',
			'<': '\\<',
			'>': '\\>',
			'"': '\\"',
			"'": "\\'",
			'/': '\\/',
		}[char];
	});

	return safeString;
}

function decodeHtmlEntities(str) {
	return str
		.replace(/&quot;/g, '"')
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&#39;/g, "'")
		.replace(/&nbsp;/g, ' ');
}

function logSearchPerformance(query, startTime) {
	var Logger = require('dw/system/Logger');
	try {
		var genAiConfig = require('*/cartridge/config/genAiConfig');

		// Guard clause to check if logging is enabled
		if (!genAiConfig || !genAiConfig.logGenAiSearchPerf) {
			return;
		}

		var customInfoLog;
		try {
			customInfoLog = Logger.getLogger('info', 'info');
		} catch (e) {
			// Log the error with a fallback warn
			customInfoLog = Logger.warn(
				`Caught error while attempting to log search Gen AI message: ${e.message}`
			);
		}

		// Guard clause to ensure logger was created successfully
		if (!customInfoLog) {
			return;
		}

		if (genAiConfig.logGenAiSearchPerf) {
			var endTime = new Date();
			var responseTime = endTime - startTime; // time in milliseconds

			// Log the information
			customInfoLog.info(
				'Call to "Search-GenAI" with q="' +
					query +
					'". Response time: ' +
					responseTime +
					'ms'
			);
		}
	} catch (error) {
		// Log the error with a fallback warn
		Logger.warn(
			`Caught error in final catch while attempting to log search Gen AI message: ${error.message}`
		);
	}
}

module.exports = {
	escapeAndStringifyJson: escapeAndStringifyJson,
	decodeHtmlEntities: decodeHtmlEntities,
	logSearchPerformance: logSearchPerformance,
};
