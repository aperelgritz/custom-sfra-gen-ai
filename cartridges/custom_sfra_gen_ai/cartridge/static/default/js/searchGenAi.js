!function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=19)}([,,function(t,e){t.exports=function(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}},function(t,e,n){var r=n(9),i="object"==typeof self&&self&&self.Object===Object&&self,o=r||i||Function("return this")();t.exports=o},function(t,e,n){var r=n(3).Symbol;t.exports=r},function(t,e,n){var r=n(2),i=n(8),o=n(11),s=Math.max,a=Math.min;t.exports=function(t,e,n){var c,u,f,l,d,p,h=0,v=!1,b=!1,$=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function m(e){var n=c,r=u;return c=u=void 0,h=e,l=t.apply(r,n)}function g(t){return h=t,d=setTimeout(x,e),v?m(t):l}function y(t){var n=t-p;return void 0===p||n>=e||n<0||b&&t-h>=f}function x(){var t=i();if(y(t))return j(t);d=setTimeout(x,function(t){var n=e-(t-p);return b?a(n,f-(t-h)):n}(t))}function j(t){return d=void 0,$&&c?m(t):(c=u=void 0,l)}function w(){var t=i(),n=y(t);if(c=arguments,u=this,p=t,n){if(void 0===d)return g(p);if(b)return clearTimeout(d),d=setTimeout(x,e),m(p)}return void 0===d&&(d=setTimeout(x,e)),l}return e=o(e)||0,r(n)&&(v=!!n.leading,f=(b="maxWait"in n)?s(o(n.maxWait)||0,e):f,$="trailing"in n?!!n.trailing:$),w.cancel=function(){void 0!==d&&clearTimeout(d),h=0,c=p=u=d=void 0},w.flush=function(){return void 0===d?l:j(i())},w}},,,function(t,e,n){var r=n(3);t.exports=function(){return r.Date.now()}},function(t,e,n){(function(e){var n="object"==typeof e&&e&&e.Object===Object&&e;t.exports=n}).call(this,n(10))},function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){var r=n(12),i=n(2),o=n(14),s=/^[-+]0x[0-9a-f]+$/i,a=/^0b[01]+$/i,c=/^0o[0-7]+$/i,u=parseInt;t.exports=function(t){if("number"==typeof t)return t;if(o(t))return NaN;if(i(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=i(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=r(t);var n=a.test(t);return n||c.test(t)?u(t.slice(2),n?2:8):s.test(t)?NaN:+t}},function(t,e,n){var r=n(13),i=/^\s+/;t.exports=function(t){return t?t.slice(0,r(t)+1).replace(i,""):t}},function(t,e){var n=/\s/;t.exports=function(t){for(var e=t.length;e--&&n.test(t.charAt(e)););return e}},function(t,e,n){var r=n(15),i=n(18);t.exports=function(t){return"symbol"==typeof t||i(t)&&"[object Symbol]"==r(t)}},function(t,e,n){var r=n(4),i=n(16),o=n(17),s=r?r.toStringTag:void 0;t.exports=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":s&&s in Object(t)?i(t):o(t)}},function(t,e,n){var r=n(4),i=Object.prototype,o=i.hasOwnProperty,s=i.toString,a=r?r.toStringTag:void 0;t.exports=function(t){var e=o.call(t,a),n=t[a];try{t[a]=void 0;var r=!0}catch(t){}var i=s.call(t);return r&&(e?t[a]=n:delete t[a]),i}},function(t,e){var n=Object.prototype.toString;t.exports=function(t){return n.call(t)}},function(t,e){t.exports=function(t){return null!=t&&"object"==typeof t}},function(t,e,n){"use strict";var r=n(5),i=$(".suggestions-wrapper").data("url");function o(t){return $(t).siblings(".suggestions-wrapper")}function s(t){return!!$(t).closest(".search-mobile").length}function a(){$("body").removeClass("modal-open"),$("header").siblings().attr("aria-hidden","false"),$(".suggestions").removeClass("modal")}function c(t){"close"===t?$(".search-mobile button.fa-search").removeClass("fa-search").addClass("fa-close").attr("type","button"):$(".search-mobile button.fa-close").removeClass("fa-close").addClass("fa-search").attr("type","submit")}function u(t){$(t).scrollTop()+$(t).innerHeight()>=$(t)[0].scrollHeight?$(".more-below").fadeOut():$(".more-below").fadeIn()}function f(t){var e,n,r,i,a,f=o(this).empty();if($.spinner().stop(),"object"!=typeof t){f.append(t).show(),$(this).siblings(".reset-button").addClass("d-sm-block"),s(e=this)&&(a=(r=$(e)).offset().top,n=r.outerHeight(),(i=o(e).find(".suggestions")).css("top",a+n),u(e),i.scroll((function(){u(this)}))),s(this)&&(c("close"),function(t){s(t)&&($("body").addClass("modal-open"),$("header").siblings().attr("aria-hidden","true"),o(t).find(".suggestions").addClass("modal"))}(this));var l=$(".suggestions .item");$(l).length?$("input.search-field").attr("aria-describedby","search-result-count"):$("input.search-field").removeAttr("aria-describedby")}else f.hide()}function l(t){$(t).val().length>=1?($.spinner().start(),$.ajax({context:t,url:i+encodeURIComponent($(t).val()),method:"GET",success:f,error:function(){$.spinner().stop()}})):(c("search"),$(t).siblings(".reset-button").removeClass("d-sm-block"),a(),o(t).empty())}function d(t){var e=$(".suggestions .item");0===e.filter(".selected").length?(e.first().addClass("selected"),$("input.search-field").each((function(){$(this).attr("aria-activedescendant",e.first()[0].id)}))):e.each((function(n){var r=n+t;return!$(this).hasClass("selected")||($(this).removeClass("selected"),$(this).removeAttr("aria-selected"),0!==e.eq(r).length?(e.eq(r).addClass("selected"),e.eq(r).attr("aria-selected",!0),$(this).removeProp("aria-selected"),$("input.search-field").each((function(){$(this).attr("aria-activedescendant",e.eq(r)[0].id)}))):(e.first().addClass("selected"),e.first().attr("aria-selected",!0),$("input.search-field").each((function(){$(this).attr("aria-activedescendant",e.first()[0].id)}))),!1)}))}t.exports={handleSearchInput:function(){$("input.search-field").off("keyup focus"),$("input.search-field").each((function(){var t=r(l,300);$(this).on("keyup focus",(function(e){switch(e.which){case 40:d(1),e.preventDefault();break;case 38:d(-1),e.preventDefault();break;default:$(this).val().trim().split(/\s+/).length<3?t(this,e):(a(),$(".search-mobile .suggestions").unbind("scroll"),$(".suggestions-wrapper").empty(),$("button.reset-button").css("transform","scale(0)"),$("input.search-field").on("keypress",(function(t){if("Enter"===t.key){if(t.preventDefault(),$(this).data("handled"))return;$(this).data("handled",!0),$.spinner().start();var e=$(".search-with-gen-ai-url").data("url"),n=window.location.origin+e+encodeURIComponent($(this).val());window.location.href=n}})))}}))})),$("input.search-field").on("keyup",(function(t){"Enter"===t.key&&$(this).data("handled",!1)}))}}}]);