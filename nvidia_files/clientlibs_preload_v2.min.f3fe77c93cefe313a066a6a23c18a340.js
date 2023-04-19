/* Define NVIDIAGDC namespace if it doesn't already exist! */
var NVIDIAGDC = NVIDIAGDC || {};
NVIDIAGDC.largeDesktopBreakpoint = 1350;
NVIDIAGDC.desktopBreakpoint = 1024;
NVIDIAGDC.tabletBreakpoint = 640;
NVIDIAGDC.mobileBreakpoint = 320;

/*
 * Device detection - yes, yuck, I know. Add classes and store globally available flags in the namespace.
 */
;
(function ($, window, document, undefined) {

	var aClasses = [],
	iOS = false;

	NVIDIAGDC.Browser = {
			'os' : "unknown",
			'device' : "unknown"
	};

	if (/Android/i.test(navigator.userAgent)) {
		aClasses.push('os-android');
		NVIDIAGDC.Browser['os'] = "android";
	}

	if (/iPhone/i.test(navigator.userAgent)) {
		aClasses.push('device-iphone');
		iOS = true;
		NVIDIAGDC.Browser['device'] = "iphone";
	}

	if (/iPod/i.test(navigator.userAgent)) {
		aClasses.push('device-ipod');
		iOS = true;
		NVIDIAGDC.Browser['device'] = "ipod";
	}

	if (/iPad/i.test(navigator.userAgent)) {
		aClasses.push('device-ipad');
		iOS = true;
		NVIDIAGDC.Browser['device'] = "ipad";
	}
	if (/MSIE 10.0/i.test(navigator.userAgent)) {
		aClasses.push('browser-ie10');
	}

	if (iOS) {
		aClasses.push('os-ios');
		NVIDIAGDC.Browser['os'] = "ios";
	}

	if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)){
		aClasses.push('device-tablet-mobile');
	}else if(navigator.userAgent.match(/Macintosh/i)){
        aClasses.push('device-macintosh');
    }else{
		aClasses.push('device-desktop');
	}

	var sClasses = aClasses.join(' ');
	$('html').addClass(sClasses);

	// Excluded browser check
	NVIDIAGDC.Browser.isSupportedBrowser = function(aExcludedBrowsers) {
		var bIsSupportedBrowser = true;
		if (typeof NVIDIAGDC.Browser != 'undefined') {
			// Detect excluded operating systems
			$.each(aExcludedBrowsers, function(nBrowserIndex, oBrowser) {
				var $this = $(this),
				os = oBrowser['os'],
				devices = oBrowser['devices'];
				if (NVIDIAGDC.Browser['os'] == os) {
					if (typeof devices == 'object') {
						$.each(devices, function(nDeviceIndex, sDeviceValue) {
							if (NVIDIAGDC.Browser['device'] == NVIDIAGDC.Browser['device']) {
								bIsSupportedBrowser = false;
								return false;
							}
						});
					} else if (typeof devices == 'string') {
						if (devices == 'all') {
							bIsSupportedBrowser = false;
						}
					}
					return false;
				}
			});
		}
		return bIsSupportedBrowser;
	}

	//Detect which viewport/mediaquery is in use e.g. Tablet, Mobile or Desktop
	NVIDIAGDC.Browser.getViewport  = function() {
		//return state after it has any double quotations removed
		return window.getComputedStyle(document.body,':after').content.replace(/"/g, "");
	}
	NVIDIAGDC.Browser.getToken  = function() {
		var token="";
		try{
			if(NVIDIAGDC.NOD.getSession()){
				token = NVIDIAGDC.NOD.getSession().id_token;
				
				try{
					 if (typeof Cookies!== "undefined" && typeof Cookies.get("nv.profile")=== "undefined" ) {
						 var tokenAPI=NVIDIAGDC.nod.srvcendpoint+"/nod/api/v1/kaltura/session/create";
						 $.ajax({
					 		 url: tokenAPI,
					 		 headers: {
					 		   Authorization: 'Bearer '+ token,
					 		 },
					 		 xhrFields: {
				 		      withCredentials: true
					 		 },
					 		 success: function(data) {
					 			  location.reload();
					 	      }
					 		})
			             
					 };
					}catch(e){
						console.log("failed to create session");
					}
			}
		}catch (e) {
			
		}

		return token;
	}

	NVIDIAGDC.Browser.mountUnmount  = function(object,mountunmount,index) {
		console.log("base unmount called");
	}
	NVIDIAGDC.Browser.reMountAll  = function() {
		console.log("reMountAllCalled");
	}
	NVIDIAGDC.Browser.generateToken  = function() {
		//return state after it has any double quotations removed
		var d = new Date().getTime();//Timestamp
		var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16;//random number between 0 and 16
			if(d > 0){//Use timestamp until depleted
				r = (d + r)%16 | 0;
				d = Math.floor(d/16);
			} else {//Use microseconds since page-load if supported
				r = (d2 + r)%16 | 0;
				d2 = Math.floor(d2/16);
			}
			return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
		});
	}
	NVIDIAGDC.Browser.getUrlParameter  = function(param) {

		var sPageURL = window.location.search.substring(1);
		var sURLVariables = sPageURL.split('&');
		for (var i = 0; i < sURLVariables.length; i++) {
			var sParameterName = sURLVariables[i].split('=');
			if (sParameterName[0] == param) {
				return sParameterName[1];
			}
		}
	};



})(jQuery, window, document);
$(document).ready(function() {
	/*Setting Anonymous Cookie*/
	const cookieName = "nvweb_A";
	if (typeof Cookies!== "undefined" && typeof Cookies.get("nvweb_A")=== "undefined") {
		const cookieValue = NVIDIAGDC.Browser.generateToken();
		const daysToExpire = new Date(3147483647 * 1000).toUTCString();
		document.cookie = cookieName + '=' + cookieValue + ';path=/' + '; expires=' + daysToExpire; 
	};

	if (document.location.href.match(/nvidiaGDClog/)) {
		nvidiaGDClog = function() {
			console.log.apply(console, arguments);
		}
		for (var _i = 0; _i < nvidiaGDClogqueue.length; _i++) {
			nvidiaGDClog.apply(nvidiaGDClog, nvidiaGDClogqueue[_i]);
		}
	}
});

/*!
 * JavaScript Cookie v2.1.3
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
  var registeredInModuleLoader = false;
  if (typeof define === 'function' && define.amd) {
    define(factory);
    registeredInModuleLoader = true;
  }
  if (typeof exports === 'object') {
    module.exports = factory();
    registeredInModuleLoader = true;
  }
  if (!registeredInModuleLoader) {
    var OldCookies = window.Cookies;
    var api = window.Cookies = factory();
    api.noConflict = function () {
      window.Cookies = OldCookies;
      return api;
    };
  }
}(function () {
  function extend () {
    var i = 0;
    var result = {};
    for (; i < arguments.length; i++) {
      var attributes = arguments[ i ];
      for (var key in attributes) {
        result[key] = attributes[key];
      }
    }
    return result;
  }

  function init (converter) {
    function api (key, value, attributes) {
      var result;
      if (typeof document === 'undefined') {
        return;
      }

      // Write

      if (arguments.length > 1) {
        attributes = extend({
          path: '/'
        }, api.defaults, attributes);

        if (typeof attributes.expires === 'number') {
          var expires = new Date();
          expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
          attributes.expires = expires;
        }

        try {
          result = JSON.stringify(value);
          if (/^[\{\[]/.test(result)) {
            value = result;
          }
        } catch (e) {}

        if (!converter.write) {
          value = encodeURIComponent(String(value))
            .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
        } else {
          value = converter.write(value, key);
        }

        key = encodeURIComponent(String(key));
        key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
        key = key.replace(/[\(\)]/g, escape);

        return (document.cookie = [
          key, '=', value,
          attributes.expires ? '; expires=' + attributes.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
          attributes.path ? '; path=' + attributes.path : '',
          attributes.domain ? '; domain=' + attributes.domain : '',
          attributes.secure ? '; secure' : ''
        ].join(''));
      }

      // Read

      if (!key) {
        result = {};
      }

      // To prevent the for loop in the first place assign an empty array
      // in case there are no cookies at all. Also prevents odd result when
      // calling "get()"
      var cookies = document.cookie ? document.cookie.split('; ') : [];
      var rdecode = /(%[0-9A-Z]{2})+/g;
      var i = 0;

      for (; i < cookies.length; i++) {
        var parts = cookies[i].split('=');
        var cookie = parts.slice(1).join('=');

        if (cookie.charAt(0) === '"') {
          cookie = cookie.slice(1, -1);
        }

        try {
          var name = parts[0].replace(rdecode, decodeURIComponent);
          cookie = converter.read ?
            converter.read(cookie, name) : converter(cookie, name) ||
            cookie.replace(rdecode, decodeURIComponent);

          if (this.json) {
            try {
              cookie = JSON.parse(cookie);
            } catch (e) {}
          }

          if (key === name) {
            result = cookie;
            break;
          }

          if (!key) {
            result[name] = cookie;
          }
        } catch (e) {}
      }

      return result;
    }

    api.set = api;
    api.get = function (key) {
      return api.call(api, key);
    };
    api.getJSON = function () {
      return api.apply({
        json: true
      }, [].slice.call(arguments));
    };
    api.defaults = {};

    api.remove = function (key, attributes) {
      api(key, '', extend(attributes, {
        expires: -1
      }));
    };

    api.withConverter = init;

    return api;
  }

  return init(function () {});
}));

/*!
 * jquery.base64.js 0.1 - https://github.com/yckart/jquery.base64.js
 * Makes Base64 en & -decoding simpler as it is.
 *
 * Based upon: https://gist.github.com/Yaffle/1284012
 *
 * Copyright (c) 2012 Yannick Albert (http://yckart.com)
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
 * 2013/02/10
 **/
;(function($) {

    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        a256 = '',
        r64 = [256],
        r256 = [256],
        i = 0;

    var UTF8 = {

        /**
         * Encode multi-byte Unicode string into utf-8 multiple single-byte characters
         * (BMP / basic multilingual plane only)
         *
         * Chars in range U+0080 - U+07FF are encoded in 2 chars, U+0800 - U+FFFF in 3 chars
         *
         * @param {String} strUni Unicode string to be encoded as UTF-8
         * @returns {String} encoded string
         */
        encode: function(strUni) {
            // use regular expressions & String.replace callback function for better efficiency
            // than procedural approaches
            var strUtf = strUni.replace(/[\u0080-\u07ff]/g, // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
            function(c) {
                var cc = c.charCodeAt(0);
                return String.fromCharCode(0xc0 | cc >> 6, 0x80 | cc & 0x3f);
            })
            .replace(/[\u0800-\uffff]/g, // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
            function(c) {
                var cc = c.charCodeAt(0);
                return String.fromCharCode(0xe0 | cc >> 12, 0x80 | cc >> 6 & 0x3F, 0x80 | cc & 0x3f);
            });
            return strUtf;
        },

        /**
         * Decode utf-8 encoded string back into multi-byte Unicode characters
         *
         * @param {String} strUtf UTF-8 string to be decoded back to Unicode
         * @returns {String} decoded string
         */
        decode: function(strUtf) {
            // note: decode 3-byte chars first as decoded 2-byte strings could appear to be 3-byte char!
            var strUni = strUtf.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, // 3-byte chars
            function(c) { // (note parentheses for precence)
                var cc = ((c.charCodeAt(0) & 0x0f) << 12) | ((c.charCodeAt(1) & 0x3f) << 6) | (c.charCodeAt(2) & 0x3f);
                return String.fromCharCode(cc);
            })
            .replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, // 2-byte chars
            function(c) { // (note parentheses for precence)
                var cc = (c.charCodeAt(0) & 0x1f) << 6 | c.charCodeAt(1) & 0x3f;
                return String.fromCharCode(cc);
            });
            return strUni;
        }
    };

    while(i < 256) {
        var c = String.fromCharCode(i);
        a256 += c;
        r256[i] = i;
        r64[i] = b64.indexOf(c);
        ++i;
    }

    function code(s, discard, alpha, beta, w1, w2) {
        s = String(s);
        var buffer = 0,
            i = 0,
            length = s.length,
            result = '',
            bitsInBuffer = 0;

        while(i < length) {
            var c = s.charCodeAt(i);
            c = c < 256 ? alpha[c] : -1;

            buffer = (buffer << w1) + c;
            bitsInBuffer += w1;

            while(bitsInBuffer >= w2) {
                bitsInBuffer -= w2;
                var tmp = buffer >> bitsInBuffer;
                result += beta.charAt(tmp);
                buffer ^= tmp << bitsInBuffer;
            }
            ++i;
        }
        if(!discard && bitsInBuffer > 0) result += beta.charAt(buffer << (w2 - bitsInBuffer));
        return result;
    }

    var Plugin = $.base64 = function(dir, input, encode) {
            return input ? Plugin[dir](input, encode) : dir ? null : this;
        };

    Plugin.btoa = Plugin.encode = function(plain, utf8encode) {
        plain = Plugin.raw === false || Plugin.utf8encode || utf8encode ? UTF8.encode(plain) : plain;
        plain = code(plain, false, r256, b64, 8, 6);
        return plain + '===='.slice((plain.length % 4) || 4);
    };

    Plugin.atob = Plugin.decode = function(coded, utf8decode) {
        coded = String(coded).split('=');
        var i = coded.length;
        do {--i;
            coded[i] = code(coded[i], true, r64, a256, 6, 8);
        } while (i > 0);
        coded = coded.join('');
        return Plugin.raw === false || Plugin.utf8decode || utf8decode ? UTF8.decode(coded) : coded;
    };
}(jQuery));
;(function ($, document, undefined) {
    window.cookiesType = Object.freeze({ REQUIRED: "C0001", PERFORMANCE: "C0002", ADVERTISING: "C0003", PERSONALIZATION: "C0004", SOCIALMEDIA: "C0005" });

    window.Cookies.optan = {
        set: function (name, value, optanType, options) {

            options = options ? options : {};
            options = Object.assign({ path: '/' }, options);

            if (optanType !== 1 && this.chkOptanPreference(optanType) == -1) {
                Cookies.remove(name);
                return false;
            }

            Cookies.set(name, value, options);

            return true;
        },

        chkOptanPreference: function (optanType) {
            return OptanonActiveGroups.split(",").indexOf(optanType.toString());
        }
    }

    $(document).on('click', '.onetrust-pc-dark-filter', function(){
        $("#close-pc-btn-handler").trigger("click");
    });
})(jQuery, document);
