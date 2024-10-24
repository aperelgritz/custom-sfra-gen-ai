'use strict';

window.jQuery = require('jquery');
window.$ = window.jQuery;

var processInclude = require('base/util');

$(document).ready(function () {
	processInclude(require('base/components/menu'));
	processInclude(require('base/components/cookie'));
	processInclude(require('base/components/consentTracking'));
	processInclude(require('base/components/footer'));
	processInclude(require('base/components/miniCart'));
	processInclude(require('base/components/collapsibleItem'));
	processInclude(require('base/components/search'));
	processInclude(require('base/components/clientSideValidation'));
	processInclude(require('base/components/countrySelector'));
	processInclude(require('./basketCheck'));
	processInclude(require('./searchGenAi'));
});

require('base/thirdParty/bootstrap');
require('base/components/spinner');
