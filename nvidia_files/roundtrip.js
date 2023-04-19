try {
    
    __adroll.load_adroll_tpc(__adroll.render_advertisable_cell);
}
catch(e) {}

try {
        function __adroll__(){this.version="2.0";this.exp=8760;this.eexp=720;this.pv=1E11*Math.random();this.__adc="__ar_v4";this._loaded=this._broken=!1;this._url=2E3;this._kwl=300;this._r={};this._logs=[];this.cm_urls=[];this.consent_networks={facebook:"f",linkedin:"linkedin"};this.pixelstart=this.session_time=0;this._init_idb();this._init_floc_trial();for(var a=Array(4),b=0;b<a.length;b++)a[b]=(Math.round(1E11*Math.random()).toString(16)+Array(9).join("0")).substr(0,8);this._set_global("adroll_sid",a.join(""));
this._has_global("adroll_adv_id")&&(this.load_experiment_js(),this.init_pixchk(),this.trigger_gtm_consent_event(),this.load_pixel_assistant(),["adroll_adv_id","adroll_pix_id"].forEach(function(a){window.hasOwnProperty(a)&&("string"===typeof window[a]||window[a]instanceof String)&&(window[a]=window[a].replace(/[^A-Z0-9_]/g,""))}));window.adroll=window.adroll||{};window.adroll.identify_email=this.identify_email.bind(this);a="ABCDEFG".split("");this._has_global("adroll_adv_id")&&0<=a.indexOf(window.adroll_adv_id.substr(0,
1))&&this._pixel_timing(!0,!0,null)};__adroll__.prototype.call_consent_check=function(){function a(){var a=["_s="+b.get_adroll_sid(),"_b=2"];"#_ar_gdpr="===(window.location.hash||"").substr(0,10)&&a.push("dbg="+unescape((window.location.hash||"").substr(10)));window.adroll_fpconsent&&a.push("_afc=1");a=b._srv("/consent/check/"+b._global("adroll_adv_id")+"?"+a.join("&"));b.add_script_element(a)}var b=this;this._is_defined(window.adroll_fpconsent)?a():window.setTimeout(a,100)};
__adroll__.prototype.call_consent_write=function(a){window.adroll_fpconsent&&(a+="&_afc=1");this.add_script_element(this._srv("/consent/write?"+a))};__adroll__.prototype._consent_cookie=function(a){return a?(this.set("__adroll_consent",a,8760),a):this.get("__adroll_consent")};__adroll__.prototype.load_consent_banner=function(){window.document.getElementById("__adroll_consent_banner_el")||this.add_script_element("s.adroll.com/j/consent_tcfv2.js",{id:"__adroll_consent_banner_el"})};
__adroll__.prototype.get_consent_params=function(){return this.get("__adroll_consent_params")};__adroll__.prototype.set_consent_params=function(a){this.set("__adroll_consent_params",a)};__adroll__.prototype.clear_consent_params=function(){this.del("__adroll_consent_params")};__adroll__.prototype.handle_null_consent=function(a){a||(a=this.get_consent_params())&&this.call_consent_write(a)};
__adroll__.prototype.save_first_party_consent=function(a){var b=(a||{}).euconsent;if((a=(a||{}).arconsent)||b)this._consent_cookie(a),window.localStorage.setItem("__adroll_consent_data",this.jsonStringify({arconsent:a,euconsent:b}))};
__adroll__.prototype.get_first_party_consent=function(){if(this._has_global("__adroll_consent_data"))return this._global("__adroll_consent_data");var a=null;try{if(window.localStorage){var b=window.localStorage.getItem("__adroll_consent_data");b&&(a=this.jsonParse(b))}}catch(c){}if(b=this._consent_cookie())a=a||{},a.arconsent=b;this._set_global("__adroll_consent_data",a);return a};
__adroll__.prototype.trigger_gtm_consent_event=function(a){function b(a,b,c){b=isNaN(Number(b))?"c:"+b:"tcf:"+b;!0!==c&&!1!==c&&(c="unknown");a[c][b]=1}function c(a){return","+q.object_keys(a).join(",")+","}if(!window.dataLayer||"function"===typeof window.dataLayer.push)if(window.dataLayer=window.dataLayer||[],a){var d=this._global("__adroll_consent"),e=this._global("__adroll_consent_data")||{},f=e.eucookie||{},n=f.max_vendor_id||e.max_vendor_id||0,m=e.networks||[],l=f.purposes_allowed||0,g={"true":{},
"false":{},unknown:{}},h={"true":{},"false":{},unknown:{}},k={"true":{},"false":{}},q=this,p;if("boolean"===typeof d){for(p=0;p<m.length;p++)b(g,m[p],d);for(p=1;p<n;p++)b(g,p,d),b(h,p,d);for(p=1;25>p;p++)k[d][p]=1}else{for(p in d)d.hasOwnProperty(p)&&b(g,p,d[p]);for(p=1;p<=n;p++)b(h,p,(f.vendor_consent||{})[p]);for(p=0;24>p;p++)k[!!(l&1<<p)][p+1]=1}window.dataLayer.push({event:a,nextrollVendorsConsent:c(g["true"]),nextrollVendorsConsentUnknown:c(g.unknown),nextrollVendorsConsentDenied:c(g["false"]),
nextrollVendorsRawConsent:c(h["true"]),nextrollVendorsRawConsentUnknown:c(h.unknown),nextrollVendorsRawConsentDenied:c(h["false"]),nextrollPurposesConsent:c(k["true"]),nextrollPurposesConsentUnknown:null,nextrollPurposesConsentDenied:c(k["false"]),nextrollgdpr:this._global("__adroll_consent_is_gdpr"),nextrolliab:e.euconsent})}else window.dataLayer.push({event:"nextroll-ready"})};
__adroll__.prototype.set_consent=function(a,b,c,d,e,f){if(0===arguments.length){if(!this._has_global("__adroll_consent"))return;a=this._global("__adroll_consent")}var n="nextroll-consent";this._has_global("__adroll_consent")&&(n="nextroll-consent-modified");this._set_global("__adroll_consent",a);this._set_global("__adroll_consent_is_gdpr",c);this._set_global("__adroll_consent_data",f||{});d&&this._set_global("__adroll_consent_user_country",d);e&&this._set_global("__adroll_consent_adv_country",e);
var m=["5L5IV3X4ZNCUZFMLN5KKOD","VMYZUWPHFRH37EAOEU2EQS","3QOM4TKN4RD7TO3HCPYRKV"],l=this._global("adroll_adv_id");"CA"===d&&0<=m.indexOf(l)&&(c=!0);c&&("adroll"===(f||{}).banner||b)&&this.load_consent_banner();null===a?this.handle_null_consent(b):(this.save_first_party_consent(f),b||this.clear_consent_params(),this._install_cmp&&this._install_cmp(),this._trigger_consent_event&&this._trigger_consent_event(),!1!==a&&!1!==(a||{}).a&&(this._log_floc_cohort(),this._sync_fpid(),this.trigger_gtm_consent_event(n),
this._load_black_crow(),this.call_next_tpc()))};__adroll__.prototype._load_precheck_js=function(){this.add_script_element("https://s.adroll.com/j/pre/"+window.adroll_adv_id+"/"+window.adroll_pix_id+"/fpconsent.js")};__adroll__.prototype.cookieEnabled=function(){if(this._broken)return!1;this.set("_te_","1");return"1"===this.get("_te_")?(this.del("_te_"),!0):!1};__adroll__.prototype.get=function(a){var b=window.document.cookie;if(null===b)return this._broken=!0,null;var c;0>b.indexOf(a+"=")?b=null:(a=b.indexOf(a+"=")+a.length+1,c=b.indexOf(";",a),-1===c&&(c=b.length),b=b.substring(a,c),b=""===b?null:window.unescape(b));return b};
__adroll__.prototype.set=function(a,b,c){var d;c&&"number"===typeof c?(d=new Date,d.setTime(d.getTime()+36E5*c),c=d.toGMTString(),c="; expires="+c):c="";d="; domain="+window.location.hostname;b=window.escape(b);window.document.cookie=a+"="+b+c+"; path=/"+d+"; samesite=lax"};__adroll__.prototype.del=function(a){this.set(a,"",-8760)};
__adroll__.prototype.check_cookie=function(a,b){for(var c=a.split("|"),d=c.length-1;0<=d;d--)if(c[d]){var e=c[d].split(":");b===e[0]&&(e[2]=""+(parseInt(e[2])+1),c[d]=e.join(":"))}return c.join("|")};__adroll__.prototype.handle=function(a){var b=this.get(this.__adc)||"";-1!==b.indexOf(a)?this.set(this.__adc,this.check_cookie(b,a),this.exp):(a=[b,[a,this.get_date(this.eexp),"1"].join(":")].join("|"),this.set(this.__adc,a,this.exp))};
__adroll__.prototype.expire_old=function(){for(var a=this.get_date(!1),b=this.get(this.__adc),b=b?b.split("|"):[""],c=[],d=b.length-1;0<=d;d--)b[d]&&""!==b[d]&&b[d].split(":")[1]>a&&c.push(b[d]);this.set(this.__adc,c.join("|"),this.exp)};__adroll__.prototype.get_date=function(a){var b=new Date;a&&b.setTime(b.getTime()+36E5*a);a=""+b.getUTCFullYear();var c=b.getUTCMonth(),c=10<=c?c:"0"+c,b=b.getUTCDate();return[a,c,10<=b?b:"0"+b].join("")};
__adroll__.prototype.set_pixel_cookie=function(a,b){this.handle(a);this.handle(b);this.pixel_loaded()};__adroll__.prototype.consent_allowed=function(a){var b=this._global("__adroll_consent");return"object"===typeof b?b[a]:b};__adroll__.prototype.listenToEvent=function(a,b,c){a.addEventListener?a.addEventListener(b,this.wrapException(c),!1):a.attachEvent("on"+b,this.wrapException(c))};__adroll__.prototype._head=function(){return(window.document.getElementsByTagName("head")||[null])[0]||(window.document.getElementsByTagName("body")||[null])[0]||window.document.getElementsByTagName("script")[0].parentNode};__adroll__.prototype._body=function(){return window.document.body||(window.document.getElementsByTagName("body")||[null])[0]};
__adroll__.prototype.runCookieMatch=function(){var a=this.cm_urls.length;if(!(0>=a))for(var b=0;b<=a;b++)this.popAndSend()};__adroll__.prototype.matchesSelector=function(a,b){var c=a.matches||a.webkitMatchesSelector||a.mozMatchesSelector||a.msMatchesSelector||a.oMatchesSelector;return c&&c.call(a,b)};__adroll__.prototype.popAndSend=function(){if(!(0>=this.cm_urls.length)){var a=this.cm_urls.shift(),b=new Image;b.src=a;b.setAttribute("alt","")}};
__adroll__.prototype.add_param_to_url=function(a,b){var c=a.indexOf("?"),d="",e="";-1!==c?(d=a.slice(0,c+1),e="&"+a.slice(c+1)):(c=a.indexOf("#",-1===c?0:c),-1===c?d=a+"?":(d=a.slice(0,c)+"?",e=a.slice(c)));return d+b+e};
__adroll__.prototype._init_idb=function(){function a(){return b._adroll_idb.transaction("adroll","readwrite").objectStore("adroll")}var b=this,c=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB;if(c&&!this._adroll_idb){this._adroll_idb=!0;var d=c.open("adroll",1);d.onupgradeneeded=function(){b._adroll_idb=d.result;b._adroll_idb.createObjectStore("adroll",{keyPath:"id"});b._adroll_idb.getStore=a};d.onsuccess=function(){b._adroll_idb=d.result;b._adroll_idb.getStore=
a};d.onblocked=function(){b._adroll_idb=null}}};__adroll__.prototype._get_idb_row=function(a,b,c){var d=this;if(this._adroll_idb)if(!0===this._adroll_idb)5>c?window.setTimeout(this._get_idb_row.call(this,a,b,(c||1)+1),100):b&&b.call(d,null);else{var e=b,f=window.setTimeout(function(){e&&e.call(d,null)},1E3);this._adroll_idb.getStore().get(a).onsuccess=function(){e=null;window.clearTimeout(f);b&&b.call(d,this.result)}}else b.call(this,null)};
__adroll__.prototype._set_idb_row=function(a,b,c){if("object"!==typeof b)throw Error("Row must be object");this._adroll_idb&&(!0===this._adroll_idb?5>c&&window.setTimeout(this._set_idb_row.call(this,a,b,(c||1)+1),100):(b.id=a,this._adroll_idb.getStore().put(b)))};
__adroll__.prototype.closest=function(a,b){if(a.closest)return a.closest(b);if(!b)return null;for(var c=a;null!==c;c=c.parentNode){var d=c.matches||c.webkitMatchesSelector||c.mozMatchesSelector||c.msMatchesSelector||c.oMatchesSelector;if(d&&d.call(c,b))return c}return null};__adroll__.prototype.dyno=function(a,b){if(a){var c=new XMLHttpRequest;c.onreadystatechange=function(){if(c.readyState===c.HEADERS_RECEIVED&&"recordUser"!==a){var d=this.parseDynoResponseHeader(c.getAllResponseHeaders());this._queueAndCallback("dyno",[a,b,d])}}.bind(this);var d={},e;for(e in b)b.hasOwnProperty(e)&&(d[e]="object"===typeof b[e]?this.jsonStringify(b[e]):b[e]);d=this.get_segment_path(this._global("adroll_adv_id"),this._global("adroll_pix_id"),d);e=this._srv("/segment"+d);c.open("GET",
e,!0);c.withCredentials=!0;c.send();this.is_ipv6()&&this.imgRequest(this._srv("/seg4"+d,!0))}};__adroll__.prototype.registerDynoCallback=function(a,b){this._registerCallback("dyno",a,b)};
__adroll__.prototype.parseDynoResponseHeader=function(a){var b={};if(!a)return b;a=a.split("\n");for(var c=0,d=a.length;c<d;c++){var e=a[c],f=e.indexOf(":");if(0<f){var n=e.substring(0,f).trim().toLowerCase();this.startsWith(n,"x-")&&(b[n]=e.substring(f+1).trim())}}b&&(b.hasOwnProperty("x-segment-eid")&&(window.adroll_seg_eid=b["x-segment-eid"]),b.hasOwnProperty("x-rule-type")&&(window.adroll_rule_type=b["x-rule-type"]));return b};__adroll__.prototype.is_under_experiment=function(a){return window.adroll_exp_list&&0<=window.adroll_exp_list.indexOf(a)};__adroll__.prototype.load_experiment_js=function(){var a=window.document.getElementById("adroll_scr_exp");return a?a:this.add_script_element("https://s.adroll.com/j/exp/"+window.adroll_adv_id+"/index.js",{id:"adroll_scr_exp",onError:"window.adroll_exp_list = [];"})};__adroll__.prototype.is_experiment_js_loaded=function(){return!!window.adroll_exp_list};
__adroll__.prototype.is_test_advertisable=function(){return"ADV_EID"===this._global("adroll_adv_id")};__adroll__.prototype.if_under_experiment_js=function(a,b,c,d){var e=this;this.load_experiment_js();this.on_experiment_loaded(function(){e.is_under_experiment(a)?"function"===typeof b&&b.call(e):"function"===typeof c&&c.call(e)},d)};
__adroll__.prototype.on_experiment_loaded=function(a,b){function c(){if(e.is_experiment_js_loaded()||e.is_test_advertisable())d=!0;d?a.call(e):window.setTimeout(c,10)}var d=!1,e=this;window.setTimeout(function(){d=!0},b||500);c()};__adroll__.prototype.external_data_to_qs=function(a,b){var c=[];this._is_v1_to_v2_shim()&&"undefined"===typeof b&&(b=a,a=this.get_external_data());if(!a)return null;for(var d in a)a.hasOwnProperty(d)&&this._is_defined(a[d])&&null!==a[d]&&c.push(this.normalize_var(window.escape(""+d)+"="+window.escape(""+a[d]),!1));c=c.join("&");b&&(c=window.escape(c));return"adroll_external_data="+c};
__adroll__.prototype.get_page_properties=function(){if(this._has_global("adroll_page_properties")){var a=this._global("adroll_page_properties"),b={},c;for(c in a)a.hasOwnProperty(c)&&"undefined"!==a[c]&&(b[c.toLowerCase()]=a[c]);return b}return null};
__adroll__.prototype.replace_external_data=function(a){var b=this.get_external_data(),c=this.get_conversion_value(),d=null,e;if(b)for(e in b)b.hasOwnProperty(e)&&(d=new RegExp("\\["+e+"\\]","gi"),a=a.replace(d,b[e]),d=new RegExp("\\["+e+"_ESC\\]","gi"),a=a.replace(d,window.escape(b[e])));if(c)for(e in c)c.hasOwnProperty(e)&&(d=new RegExp("\\["+e+"\\]","gi"),a=a.replace(d,c[e]),d=new RegExp("\\["+e+"_ESC\\]","gi"),a=a.replace(d,window.escape(c[e])));return a};
__adroll__.prototype.get_external_data=function(){if(this._has_global("adroll_custom_data")){var a=this._global("adroll_custom_data"),b={},c;for(c in a)a.hasOwnProperty(c)&&"undefined"!==a[c]&&(b[c.toLowerCase()]=a[c]);return b}return null};
__adroll__.prototype.parse_conversion_attrs=function(a){if(!a)return null;for(var b={},c=["conv_value","conversion_value"],d=["adroll_currency","currency"],e=0;e<c.length;e++)if(a.hasOwnProperty(c[e])){b.conv_value=a[c[e]];break}for(c=0;c<d.length;c++)if(a.hasOwnProperty(d[c])){b.currency=a[d[c]];break}return 1<=Object.keys(b).length?b:null};
__adroll__.prototype.get_conversion_value=function(a){var b=this._ensure_global("adroll_currency",null),c=this._ensure_global("adroll_conversion_value",null),d=this._ensure_global("adroll_conversion_value_in_dollars",null);return(a=this.parse_conversion_attrs(a))?a:c?{conv_value:""+c,currency:b}:d?{conv_value:""+parseInt(100*d),currency:"USC"}:null};__adroll__.prototype._form_attach=function(){var a=this._form_els_allowed();if(a){var b=[],c;for(c in a)a.hasOwnProperty(c)&&"submit"===a[c].type&&b.push(c);this._adroll_submit_sels=b.join(",");a=window.document.querySelectorAll("input,select,textarea");for(b=0;b<a.length;b++)this._form_data(a[b]);a=this._body();this.listenToEvent(a,"blur",this._form_change.bind(this));this.listenToEvent(a,"change",this._form_change.bind(this));this.listenToEvent(a,"focusout",this._form_change.bind(this));this.listenToEvent(a,
"click",this._form_click.bind(this));this.listenToEvent(a,"submit",this._form_save.bind(this))}};__adroll__.prototype._form_els_allowed=function(){return 0===this.object_keys(this._ensure_global("adroll_form_fields",{})).length?null:this._global("adroll_form_fields")};
__adroll__.prototype._form_el_allowed=function(a){if(!a||!a.type||!this._form_els_allowed())return a._adroll_el_ok=!1;if(this._is_defined(a._adroll_el_ok))return a._adroll_el_ok;var b=a.type.toLowerCase(),c=(a.name||"").toLowerCase(),d=this._form_els_allowed(),e=this._desc_el(a);if("password"===b||"file"===b||c.match(/cc_number|credit_card|card_number|cv[cv]_code/))return a._adroll_el_ok=!1;if(this._is_defined(d.length)){if(0<=d.indexOf(e))return a._adroll_el_ok=!0;for(e=0;e<d.length;e++)if(this.closest(a,
d[e]))return a._adroll_el_ok=!0}else{if(d[e])return a._adroll_el_ok=d[e];for(e in d)if(d.hasOwnProperty(e)&&(b=this.closest(a,e.replace(/\s*:is\(.*/,"")))&&b===a)return a._adroll_el_ok=d[e]}return a._adroll_el_ok=!1};__adroll__.prototype._desc_el=function(a){if(!a)return"";var b=a.tagName.toLowerCase();a.id?b=b+"#"+a.id:a.getAttribute("name")?b=b+'[name="'+a.getAttribute("name")+'"]':a.className&&(b=b+"."+a.className.replace(/ /g,"."));return b};
__adroll__.prototype._find_el=function(a,b){var c;b=b||window.document;try{c=b.querySelector(a)}catch(e){c=null}if(c)return c;try{c=this.matchesSelector(b,a)&&b}catch(e){c=null}if(c)return c;var d=a.match(/(\s*):is\(([^\)]*)\)/);d&&(c=d[1]?b.querySelector(d[2]):this.matchesSelector(b,d[2])&&b);return c||null};
__adroll__.prototype._form_data=function(a){var b="form"===a.tagName.toLowerCase(),c=this._desc_el(b?a:a.form);this._is_defined(this._adroll_form_data)||(this._adroll_form_data={});this._is_defined(this._adroll_form_data[c])||(this._adroll_form_data[c]={data:{},kind:{},contact:{}});if(!b){var b=this._form_el_allowed(a),d=this._desc_el(a);if(!b)return delete this._adroll_form_data[c].contact[d],null;if(":contact"===b.type)return this._find_el(b.sel,a)?this._adroll_form_data[c].contact[d]=b.sel:delete this._adroll_form_data[c].contact[d],
null;var e=a.value,f=b.auth||0;this._is_defined(a.options)&&this._is_defined(a.selectedIndex)?e=(a.options[a.selectedIndex]||{}).value:"button"===a.tagName.toLowerCase()&&(e=e||a.textContent);e?(this._adroll_form_data[c].data[d]={val:e,auth:f},b.type&&(this._adroll_form_data[c].kind[b.type]={val:e,auth:f})):(delete this._adroll_form_data[c].data[d],b.type&&delete this._adroll_form_data[c].kind[b.type])}a={contact:this._adroll_form_data[c].contact,data:{},kind:this._adroll_form_data[c].kind};a.data[c]=
this._adroll_form_data[c].data;return 0===this.object_keys(a.data[c]).length?null:a};__adroll__.prototype._form_change=function(a){a=a.target;this._form_el_allowed(a)&&this._form_data(a)};__adroll__.prototype._form_click=function(a){a=a.target;this.closest(a,this._adroll_submit_sels)&&(a=this.closest(a,"form"))&&this._form_save({target:a})};
__adroll__.prototype._form_save=function(a){var b=this._form_data(a.target);b&&b.contact&&(a=this.object_keys(b.contact),0<a.length?b.contact=a:delete b.contact);a=this._redact_pci(this.jsonStringify(b));b&&!a.match(/^{"data":{"contact":\[[^\]]*\],"[^"]+":{}},"kind":{}}$/)&&(b.kind.email&&b.kind.email.auth&&this.identify_email(b.kind.email.val),b=this._ensure_global("adroll_adv_id",""),b=this._srv("/form/"+b+"?pv="+encodeURIComponent(this.pv)),this._xhr({body:a,headers:{"Content-Type":"application/json"},
method:"POST",url:b,withCredentials:!0}))};__adroll__.prototype._redact_pci=function(a){a=a.split(/([\d\-\.\ ]+)/);for(var b=0;b<a.length;b++)this.is_luhn(a[b])&&(a[b]=" <PCI_REDACTED> ");return a.join("")};__adroll__.prototype._xhr=function(a){a=a||{};var b=new XMLHttpRequest;b.open(a.method||"GET",a.url,!1!==a.async);for(var c in a.headers||{})a.headers.hasOwnProperty(c)&&b.setRequestHeader(c,a.headers[c]);a.withCredentials&&(b.withCredentials=a.withCredentials);b.send(a.body||null)};__adroll__.prototype._has_global=function(a){return this._is_defined(this._global(a))};__adroll__.prototype._global=function(a){return window[a]};__adroll__.prototype._set_global=function(a,b){window[a]=b};__adroll__.prototype._unset_global=function(a){delete window[a]};__adroll__.prototype._ensure_global=function(a,b){this._has_global(a)||this._set_global(a,b);return this._global(a)};__adroll__.prototype.set_first_party_cookie=function(a){if(a=this.get_first_party_cookie()||a)return this.set("__adroll_fpc",a,8766),a;a=this.md5((new Date).getTime()+Math.round(1E11*Math.random())+window.navigator.userAgent.toLowerCase()+window.document.referrer)+"-"+(new Date).getTime();this.set("__adroll_fpc",a,8766);return a};
__adroll__.prototype.get_first_party_cookie=function(){try{var a=this.get("__adroll_fpc");if(a){var b=a.replace("-s2-","-").replace(/-$/,"");if("-"===b.charAt(32)&&b.substr(33).match(/\D/)&&Date.parse){var c=new Date(b.substr(33));if(c&&!isNaN(c.getTime()))return b.substr(0,33)+c.getTime()}return b}}catch(d){}return null};__adroll__.prototype._get_fpid_ls=function(){return window.localStorage.getItem("__adroll_fpc")};
__adroll__.prototype._set_fpid_ls=function(a){window.localStorage.setItem("__adroll_fpc",a)};__adroll__.prototype._get_fpid_idb=function(a){var b=this;this._get_idb_row("__adroll_fpc",function(c){a&&a.call(b,(c||{}).val)})};__adroll__.prototype._set_fpid_idb=function(a){this._set_idb_row("__adroll_fpc",{val:a})};
__adroll__.prototype._sync_fpid=function(){var a=this;this.if_under_experiment_js("fpidexp",function(){var b=a.get_first_party_cookie(),c=a._get_fpid_ls();a._get_fpid_idb(function(d){a._log_pex_event("fpidexp","load","","",{fpc:b||"",lsid:c||"",idbid:d||""});(d=b||c||d)?a.set_first_party_cookie(d):d=a.set_first_party_cookie();a._set_fpid_ls(d);a._set_fpid_idb(d)})},function(){this.set_first_party_cookie()})};__adroll__.prototype.jsonStringify=function(a){this.jsonStringifyFunc||this.initJsonStringify();return this.jsonStringifyFunc(a)};__adroll__.prototype.jsonParse=function(a){var b=this._global("JSON");return"function"===typeof b.parse?b.parse(a):eval("("+a+")")};
__adroll__.prototype.initJsonStringify=function(){var a=this._global("JSON");this.jsonStringifyFunc=a&&a.stringify&&"function"===typeof a.stringify?a.stringify:function(){function a(b){return e[b]||"\\u"+(b.charCodeAt(0)+65536).toString(16).substr(1)}var c=Object.prototype.toString,d=Array.isArray||function(a){return"[object Array]"===c.call(a)},e={'"':'\\"',"\\":"\\\\","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t"},f=/[\\"\u0000-\u001F\u2028\u2029]/g;return function m(e){if(null===e)return"null";
if("number"===typeof e)return isFinite(e)?e.toString():"null";if("boolean"===typeof e)return e.toString();if("object"===typeof e){if("function"===typeof e.toJSON)return m(e.toJSON());if(d(e)){for(var g="[",h=0;h<e.length;h++)g+=(h?", ":"")+m(e[h]);return g+"]"}if("[object Object]"===c.call(e)){g=[];for(h in e)e.hasOwnProperty(h)&&g.push(m(h)+": "+m(e[h]));return"{"+g.join(", ")+"}"}}return'"'+e.toString().replace(f,a)+'"'}}()};__adroll__.prototype.macro_values=function(){var a=this._ensure_global("adroll_cpm_macro",null),b=this._ensure_global("adroll_url_macro",null),c=this._ensure_global("adroll_c_macro",null),d=this._ensure_global("adroll_subnetwork",null),e=this._ensure_global("adroll_ad_payload",null),f=this._ensure_global("adroll_win_notif",null),n=this._ensure_global("adroll_rtb_dict",null),m=this._ensure_global("adroll_debug_string",null),l=this._ensure_global("adroll_ad_container_version",null),g=this._ensure_global("adroll_pixalate_click_url",
null),h={r:/^\$\{.*\}$/i,g:/^%%.*%%$/i,b:/^\[.*\]$/i,x:/^\$\{.*\}$/i,t:/INSERTCLICKTRACKER/}[this._global("adroll_ext_network")],h=this._is_defined(h)?h:/CANNOT_MATCH_THIS/,k={};a&&!h.test(a)&&(k.adroll_cpm_macro=a);m&&!h.test(m)&&(k.adroll_debug_string=m);l&&!h.test(l)&&(k.adroll_ad_container_version=l);b&&!h.test(b)&&(k.adroll_url_macro=b);c&&!h.test(c)&&(k.adroll_c_macro=c);d&&!h.test(d)&&(k.adroll_subnetwork=d);e&&!h.test(e)&&(k.adroll_ad_payload=e);f&&!/^[|$]/.test(f)&&(k.adroll_win_notif=f);
g&&!h.test(g)&&(k.adroll_pixalate_click_url=g);if(n&&("string"!==typeof n||!/^[|$]/.test(n))){if("string"===typeof n)try{0===n.indexOf("b64:")&&(n=atob(n.substr(4))),n=this.jsonParse(n)}catch(q){this.log("failed to parse: "+q),n={}}"object"===typeof n&&(k.adroll_rtb_dict=n)}return k};__adroll__.prototype.format_macros=function(a,b,c,d){return this.macro_url_params(this.macro_values(),a,b,c,d)};
__adroll__.prototype.macro_url_params=function(a,b,c,d,e){e=this._is_defined(e)?e:!1;var f=d?window.escape:function(a){return a},n=a.adroll_cpm_macro,m=a.adroll_url_macro,l=c?a.adroll_c_macro:null,g=[],h=this.is_lenient_click(b);l&&0===l.indexOf("http")?(h=f,"g"===this._global("adroll_ext_network")&&(h=d?function(a){return a}:window.unescape),g.push(["clickurl",h(l)])):h&&e&&g.push(["clickurl",""]);this._global("adroll_ad_destination_url")&&!e&&g.push(["desturl",f(this._global("adroll_ad_destination_url"))]);
this._global("adroll_ext_network")&&g.push(["adroll_network",this._global("adroll_ext_network")]);n&&g.push(["cpm",n]);a.adroll_subnetwork&&g.push(["adroll_subnetwork",a.adroll_subnetwork]);a.adroll_ad_payload&&g.push(["adroll_ad_payload",a.adroll_ad_payload]);a.adroll_debug_string&&g.push(["debug_string",f(a.adroll_debug_string)]);a.adroll_ad_container_version&&g.push(["adroll_ad_container_version",f(a.adroll_ad_container_version)]);a.adroll_pixalate_click_url&&g.push(["adroll_pixalate_click_url",
f(a.adroll_pixalate_click_url)]);m&&(a=this.parseUri(window.unescape(m)),g.push(["site_url",f("http://"+a.host)]),c&&(g.push(["adroll_width",f(this._global("adroll_width"))]),g.push(["adroll_height",f(this._global("adroll_height"))])));this._global("adroll_insertion_id")&&g.push(["adroll_insertion_id",this._global("adroll_insertion_id")]);this.log("Macros found "+this.serialize(g));return b?this.buildurl(b,g):this.serialize(g)};
__adroll__.prototype.serialize=function(a){if(a.length){for(var b=[],c=a.length-1;0<=c;c--)b.push(a[c].join("="));return b.join("&")}return""};__adroll__.prototype.includes=function(a,b){return-1!==a.indexOf(b)};__adroll__.prototype.startswith=function(a,b){return 0===a.indexOf(b)};__adroll__.prototype.endswith=function(a,b){return-1!==a.indexOf(b,a.length-b.length)};
__adroll__.prototype.buildurl=function(a,b){var c=this.serialize(b),d=a.indexOf("?");return c?d===a.length-1?a+c:-1!==d?"&"===a[a.length-1]?a+c:a+"&"+c:a+"?"+c:a};__adroll__.prototype.md5=function(){function a(a,b){var c=(a&65535)+(b&65535);return(a>>16)+(b>>16)+(c>>16)<<16|c&65535}function b(b,c,d,e,k,q){c=a(a(c,b),a(e,q));return a(c<<k|c>>>32-k,d)}function c(a,c,d,e,k,q,f){return b(c&d|~c&e,a,c,k,q,f)}function d(a,c,d,e,k,q,f){return b(c&e|d&~e,a,c,k,q,f)}function e(a,c,d,e,k,q,f){return b(d^(c|~e),a,c,k,q,f)}function f(m,l){var g=m[0],h=m[1],k=m[2],f=m[3],g=c(g,h,k,f,l[0],7,-680876936),f=c(f,g,h,k,l[1],12,-389564586),k=c(k,f,g,h,l[2],17,606105819),h=c(h,
k,f,g,l[3],22,-1044525330),g=c(g,h,k,f,l[4],7,-176418897),f=c(f,g,h,k,l[5],12,1200080426),k=c(k,f,g,h,l[6],17,-1473231341),h=c(h,k,f,g,l[7],22,-45705983),g=c(g,h,k,f,l[8],7,1770035416),f=c(f,g,h,k,l[9],12,-1958414417),k=c(k,f,g,h,l[10],17,-42063),h=c(h,k,f,g,l[11],22,-1990404162),g=c(g,h,k,f,l[12],7,1804603682),f=c(f,g,h,k,l[13],12,-40341101),k=c(k,f,g,h,l[14],17,-1502002290),h=c(h,k,f,g,l[15],22,1236535329),g=d(g,h,k,f,l[1],5,-165796510),f=d(f,g,h,k,l[6],9,-1069501632),k=d(k,f,g,h,l[11],14,643717713),
h=d(h,k,f,g,l[0],20,-373897302),g=d(g,h,k,f,l[5],5,-701558691),f=d(f,g,h,k,l[10],9,38016083),k=d(k,f,g,h,l[15],14,-660478335),h=d(h,k,f,g,l[4],20,-405537848),g=d(g,h,k,f,l[9],5,568446438),f=d(f,g,h,k,l[14],9,-1019803690),k=d(k,f,g,h,l[3],14,-187363961),h=d(h,k,f,g,l[8],20,1163531501),g=d(g,h,k,f,l[13],5,-1444681467),f=d(f,g,h,k,l[2],9,-51403784),k=d(k,f,g,h,l[7],14,1735328473),h=d(h,k,f,g,l[12],20,-1926607734),g=b(h^k^f,g,h,l[5],4,-378558),f=b(g^h^k,f,g,l[8],11,-2022574463),k=b(f^g^h,k,f,l[11],16,
1839030562),h=b(k^f^g,h,k,l[14],23,-35309556),g=b(h^k^f,g,h,l[1],4,-1530992060),f=b(g^h^k,f,g,l[4],11,1272893353),k=b(f^g^h,k,f,l[7],16,-155497632),h=b(k^f^g,h,k,l[10],23,-1094730640),g=b(h^k^f,g,h,l[13],4,681279174),f=b(g^h^k,f,g,l[0],11,-358537222),k=b(f^g^h,k,f,l[3],16,-722521979),h=b(k^f^g,h,k,l[6],23,76029189),g=b(h^k^f,g,h,l[9],4,-640364487),f=b(g^h^k,f,g,l[12],11,-421815835),k=b(f^g^h,k,f,l[15],16,530742520),h=b(k^f^g,h,k,l[2],23,-995338651),g=e(g,h,k,f,l[0],6,-198630844),f=e(f,g,h,k,l[7],
10,1126891415),k=e(k,f,g,h,l[14],15,-1416354905),h=e(h,k,f,g,l[5],21,-57434055),g=e(g,h,k,f,l[12],6,1700485571),f=e(f,g,h,k,l[3],10,-1894986606),k=e(k,f,g,h,l[10],15,-1051523),h=e(h,k,f,g,l[1],21,-2054922799),g=e(g,h,k,f,l[8],6,1873313359),f=e(f,g,h,k,l[15],10,-30611744),k=e(k,f,g,h,l[6],15,-1560198380),h=e(h,k,f,g,l[13],21,1309151649),g=e(g,h,k,f,l[4],6,-145523070),f=e(f,g,h,k,l[11],10,-1120210379),k=e(k,f,g,h,l[2],15,718787259),h=e(h,k,f,g,l[9],21,-343485551);m[0]=a(g,m[0]);m[1]=a(h,m[1]);m[2]=
a(k,m[2]);m[3]=a(f,m[3])}var n="0123456789abcdef".split("");return function(a){var b=a;/[\x80-\xFF]/.test(b)&&(b=unescape(encodeURI(b)));var c=b.length;a=[1732584193,-271733879,-1732584194,271733878];var d;for(d=64;d<=b.length;d+=64){for(var e=b.substring(d-64,d),q=[],p=void 0,p=0;64>p;p+=4)q[p>>2]=e.charCodeAt(p)+(e.charCodeAt(p+1)<<8)+(e.charCodeAt(p+2)<<16)+(e.charCodeAt(p+3)<<24);f(a,q)}b=b.substring(d-64);e=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(d=0;d<b.length;d++)e[d>>2]|=b.charCodeAt(d)<<(d%
4<<3);e[d>>2]|=128<<(d%4<<3);if(55<d)for(f(a,e),d=0;16>d;d++)e[d]=0;e[14]=8*c;f(a,e);for(b=0;b<a.length;b++){c=a;d=b;e=a[b];q="";for(p=0;4>p;p++)q+=n[e>>8*p+4&15]+n[e>>8*p&15];c[d]=q}return a.join("")}}();__adroll__.prototype._init_floc_trial=function(){var a=window.document.createElement("meta");a.httpEquiv="origin-trial";a.content="A41wt2Lsq30A9Ox/WehogvJckPI4aY9RoSxhb8FMtVnqaUle1AtI6Yf7Wk+7+Wm0AfDDOkMX+Wn6wnDpBWYgWwYAAAB8eyJvcmlnaW4iOiJodHRwczovL2Fkcm9sbC5jb206NDQzIiwiZmVhdHVyZSI6IkludGVyZXN0Q29ob3J0QVBJIiwiZXhwaXJ5IjoxNjI2MjIwNzk5LCJpc1N1YmRvbWFpbiI6dHJ1ZSwiaXNUaGlyZFBhcnR5Ijp0cnVlfQ==";this._head().appendChild(a)};
__adroll__.prototype._log_floc_cohort=function(){var a=this._global("adroll_seg_eid")||"";if("function"===typeof window.document.interestCohort){var b=this;window.document.interestCohort().then(function(c){if(c){var d=c.id;c=c.version;d&&c&&b._log_pex_event("floc",d,c,{seg:a},null)}})["catch"](function(a){b.log("floc-error:"+a)})}};
__adroll__.prototype._log_pex_event=function(a,b,c,d,e){a=encodeURIComponent(a);b=encodeURIComponent(b);c=encodeURIComponent(c);var f=this._ensure_global("adroll_adv_id",""),n=this._ensure_global("adroll_pix_id","");e=e?"&ex="+encodeURIComponent(this.jsonStringify(e)):"";var m="";"object"===typeof d&&(m="&"+this.object_to_querystring(d));d=this._srv("/pex/"+f+"/"+n+"?ev="+a+"&es="+b+"&esv="+c+"&pv="+this.pv+m+e);"function"===typeof navigator.sendBeacon?navigator.sendBeacon(d):this.imgRequest(d)};
__adroll__.prototype._pixel_timing=function(a,b,c){function d(){m.session_time+=(new Date).getTime()-(c||0)}function e(a,b){var d=b;18E5<m.session_time&&(d="newsession",m.preconsent_sent=!1,m.prepixel_sent=!1);b=d;if(!("preconsent"===b&&m.preconsent_sent||"prepixel"===b&&m.prepixel_sent)){d=b;m.preconsent_sent=m.preconsent_sent||"preconsent"===d;m.prepixel_sent=m.prepixel_sent||"prepixel"===d;"newsession"===b&&(a=0,c=l=(new Date).getTime(),m.pixelstart=l,m.session_time=0);d=["f="+a];"undefined"!==
typeof b&&d.push("ft="+b);var e=m._global("adct");e&&"undefined"!==e&&d.push("adct="+window.escape(e));d=encodeURIComponent(d.join("&"));d=m._srv("/onp/"+m._global("adroll_adv_id")+"/"+m._global("adroll_pix_id")+"?ev="+d);"function"===typeof navigator.sendBeacon?navigator.sendBeacon(d):m.imgRequest(d)}}function f(a,b){window.setTimeout(function(){!b||!0!==window.__adroll_consent&&!0!==(window.__adroll_consent||{}).a||(d(),e(m.session_time,"preconsent"),"object"===typeof window.performance&&e(m.pixelstart-
window.performance.timing.domInteractive,"prepixel"))},500*Math.random())}function n(a){if("visible"===window.document.visibilityState||a.type in g)m._pixel_timing(!1,!1,l);else if("hidden"===window.document.visibilityState||a.type in h)!0===window.__adroll_consent||!0===(window.__adroll_consent||{}).a?(d(),e(m.session_time)):d()}var m=this,l=(new Date).getTime(),g=["focus","focusin","pageshow"],h=["blur","focusout","pagehide"];0===m.pixelstart&&(m.pixelstart=l);"function"===typeof window.__tcfapi&&
!0===b&&(b=!1,window.__tcfapi("addEventListener",2,f));!0!==window.__adroll_consent&&!0!==(window.__adroll_consent||{}).a?window.setTimeout(function(){m._pixel_timing(!0,b,l)},500):!0===a&&("hidden"in window.document?window.document.addEventListener("visibilitychange",n):"mozHidden"in window.document?window.document.addEventListener("mozvisibilitychange",n):"webkitHidden"in window.document?window.document.addEventListener("webkitvisibilitychange",n):"msHidden"in window.document?window.document.addEventListener("msvisibilitychange",
n):"onfocusin"in window.document?(window.document.addEventListener("focusin",n),window.document.addEventListener("focusout",n)):(window.document.addEventListener("pageshow",n),window.document.addEventListener("pagehide",n),window.document.addEventListener("focus",n),window.document.addEventListener("blur",n)))};__adroll__.prototype._gurl=function(){var a=window.location;return this.normalize_url(a.pathname+a.search)};__adroll__.prototype.get_dummy_product_for_facebook=function(a){return{product_id:"adroll_dummy_product",product_group:a,product_action:null,product_category:null}};__adroll__.prototype.facebook_dummy_product_enabled=function(){return!0};
__adroll__.prototype.extract_pid=function(a,b,c,d,e){if(this._is_v1_to_v2_shim()&&!d&&!e)return this._v1_to_v2_shim_extract_pid(a,b,c);a||(a={});var f=null,n=this._gurl(),f=null;if("2.0"!==this.get_version())return null;var f="productView"===b?"":b,m=null;c&&(m=c.products);m&&0!==m.length||(m=this.extract_product_from_rollcrawl_opts(a,n));(!m||0===m.length)&&c&&c.hasOwnProperty("product_id")&&c.product_id&&(m=[this.copyObj(c,["products"])]);a=[];if(m)for(n=0;n<m.length;n++){var l=m[n].product_id;
null!==l&&""!==l&&"undefined"!==l&&a.push(m[n])}if(a&&0!==a.length)f={product_action:f,product_list:a};else if(this.facebook_dummy_product_enabled()&&"facebook"===d)f=this.get_dummy_product_for_facebook(null);else return this._callUserEventEndpoint(b,c),null;e&&e(f);return f};
__adroll__.prototype.extract_product_from_rollcrawl_opts=function(a,b){function c(a){return a?(a=new RegExp(a,"gi"),!!a.exec(b)):null}var d=null,e=null,f=null;if(a.regexp_group&&!("string"===a.regexp_group&&a.regexp_group instanceof String)&&"html"===a.regexp_group.scheme){if(c(a.blacklist_regexp)||!0!==c(a.regexp))return"";d=this.get_product_id_from_dom(a.regexp_group)}else if(!d){if(c(a.blacklist_regexp))return"";d=this.get_product_id_from_url(b,a.regexp,a.regexp_group)}e||!a.product_group_group||
"string"===a.product_group_group&&a.product_group_group instanceof String||"html"!==a.product_group_group.scheme?e||a.product_group_regexp&&(e=this.get_product_id_from_url(b,a.product_group_regexp,a.product_group_group)):e=this.get_product_id_from_dom(a.product_group_group);if(d){var n={},f=[];n.product_id=d;n.product_group=e;f.push(n)}return f};
__adroll__.prototype.get_pid=function(a){if(this._is_v1_to_v2_shim())return this._v1_to_v2_shim_get_pid(a);var b=function(b,d){this.is_product_event(b)&&this.extract_pid(a,b,d,"adroll",function(a){if(a){var f=a.product_action,n=a.product_list;if(n&&0!==n.length){a=this.copyObj(d)||{};var m=[];f&&m.push(["adroll_product_action",this.normalize_var((f+"").toLowerCase(),!0)]);n&&(m.push(["adroll_products",window.encodeURIComponent(this.jsonStringify(n))]),a.products||(a.products=n));m.push(["adroll_version",
this.get_version()]);(f=this.external_data_to_qs(d,!0))&&m.push([f]);f=this._srv(this.buildurl("/p/"+this._global("adroll_adv_id")+"/",m));m=window.document.createElement("img");m.src=f;m.height=m.width=1;m.border=0;m.setAttribute("alt","");this._head().appendChild(m);this._callUserEventEndpoint(b,a)}}}.bind(this))}.bind(this);this.registerTrackCallback(b,"productEventCallback")};
__adroll__.prototype.get_product_id_from_dom=function(a){var b=null,c;a.path&&(window.jQuery?(c=window.jQuery(a.path),c.length&&(c=c.eq(0),b="text"===a.attribute?c.text():c.attr(a.attribute))):window.Prototype&&window.$$?(c=window.$$(a.path),c.length&&(c=c[0],b="text"===a.attribute?c.innerText&&!window.opera?c.innerText:c.innerHTML.stripScripts().unescapeHTML().replace(/[\n\r\s]+/g," "):c.readAttribute(a.attribute))):window.YUI?(c=window.YUI().use("node"),c.one&&(c=c.one(a.path),b=null,c&&(b="text"===
a.attribute?c.get("text"):c.getAttribute(a.attribute)))):window.MooTools&&window.$$&&(c=window.$$(a.path),c.length&&(c=c[0],b="text"===a.attribute?c.get("text"):c.getProperty(a.attribute))));if(b&&(b=b.replace(/^\s\s*/,"").replace(/\s\s*$/,""),a.regular_expression&&a.regular_expression_replace))if(c=new RegExp(a.regular_expression,"gi"),b=c.exec(b),null!==b){a=a.regular_expression_replace;for(c=0;c<b.length;c++)a=a.replace(new RegExp("\\\\"+c,"gi"),b[c]||"");b=a}else b="";return b};
__adroll__.prototype.get_product_id_from_url=function(a,b,c){var d=null;try{d=parseInt(c)}catch(e){}return null!==d&&!isNaN(d)&&b&&(a=(new RegExp(b,"gi")).exec(a),null!==a&&d in a)?a[d]:null};__adroll__.prototype.store_adroll_loaded_record=function(a,b){window.adroll_loaded=(window.adroll_loaded||[]).concat({version:this.version,ts:(new Date).getTime(),adroll_adv_id:a,adroll_pix_id:b})};__adroll__.prototype.get_segment_url=function(a,b,c){return this._srv("/segment"+this.get_segment_path(a,b,c))};
__adroll__.prototype.get_segment_path=function(a,b,c){this.expire_old();var d=this.get_keywords(),e=[];try{e.push("adroll_s_ref="+window.escape(window.document.referrer))}catch(p){}try{e.push("keyw="+window.escape(d))}catch(p){}c=this._v1_to_v2_shim_use_globals(c,e);try{var f=c.segment_name||c.adroll_segments;this.is_null_or_blank(f)||e.push("name="+window.escape(f.toLowerCase()))}catch(p){}try{var n=this.get_conversion_value(c);n.conv_value&&e.push("conv_value="+n.conv_value);n.currency&&e.push("adroll_currency="+
n.currency)}catch(p){}try{var m=c.adroll_email;if(!this.is_null_or_blank(m)){var m=m.replace(/^\s+|\s+$/g,""),l=m.toLowerCase();this.is_already_hashed(l)?e.push("hashed_email="+l):this.is_email_valid(m)?e.push("hashed_email="+this.md5(l)):(e.push("data_error=email"),e.push("data_error_message=invalid_format"))}}catch(p){}try{if(this._has_user_identifier()){var g=this._global("adroll_user_identifier"),g=g.replace(/^\s\s*/,"").replace(/\s\s*$/,"");e.push("user_identifier="+window.encodeURIComponent(g))}}catch(p){}try{var h=
this._global("adct"),k=this.extract_query_param("adct",window.location.search.substr(1));k&&"undefined"!==k&&h!==k&&(this._set_global("adct",k),e.push("adct="+window.escape(k)))}catch(p){}try{var q=this.external_data_to_qs(c,!0);q&&e.push(q)}catch(p){}e.push("adroll_version="+this.get_version());this._v1_to_v2_shim_unset_globals();return this.get_base_url("",a,b,null,"",e)};
__adroll__.prototype.loadGlobalFunctions=function(){var a=this._global("adroll");if(a&&"object"===typeof a){var b=this;a.setProperties=function(){return b.setProperties.apply(b,arguments)};a.identify=function(){return b.identify.apply(b,arguments)};a.track=function(){return b.track.apply(b,arguments)};for(var c,d,e=0;e<a.length;e++)c=a[e][0],d=a[e][1],"setProperties"===c?this.setProperties.apply(this,d):"identify"===c?this.identify.apply(this,d):"track"===c&&this.track.apply(this,d)}};
__adroll__.prototype.get_base_url=function(a,b,c,d,e,f){var n=a.split("?");a=n[0]+"/"+b+"/"+c+(d?"/"+d:"")+(e?"/"+e:"");var m="?";n[1]&&(a+="?"+n[1],m="&");var n=m+"no-cookies=1",l="";this.cookieEnabled()?(l=window.escape(this.get_eids()),a+=m+"cookie="+l):a+=n;f&&(a+="&"+f.join("&"));a=this.add_tpc_to_url(a);if(a.length>this._url){try{this.del(this.__adc)}catch(g){}if(a.length-l.length>this._url)return a;this.log("Url was too big, shrinking it");return this.get_url(b,c,d,e,f)}this.log("Generated url: "+
a);return a};__adroll__.prototype.add_script_element=function(a,b){var c=window.document.createElement("script"),d=this._secure()?"https://":"http://";a.match(/^(\w+:)*\/\//)&&(d="");for(var e in b)b.hasOwnProperty(e)&&"src"!==e&&c.setAttribute(e,b[e]);c.type="text/javascript";c.src=d+a;this._head().appendChild(c);return c};__adroll__.prototype.get_url=function(a,b,c,d,e){var f=c?this._srv("/c"):this._srv("/r");return this.get_base_url(f,a,b,c,d,e)};
__adroll__.prototype.get_eids=function(){try{for(var a=this.get(this.__adc),b=a?a.split("|"):"",a=[],c=b.length-1;0<=c;c--)if(b[c]&&""!==b[c]){var d=b[c].split(":");a.push([d[0],d[2]].join(":"))}return a.join("|")}catch(e){return this.del(this.__adc),""}};__adroll__.prototype.add_pixel_load_callback=function(a){this._loaded&&a.call(this);this._load_cbs=(this._load_cbs||[]).concat(a)};
__adroll__.prototype.pixel_loaded=function(){this._loaded=!0;for(var a=this._load_cbs||[];0<a.length;){var b=a.shift();try{b.call(this)}catch(c){this.log("pixel_loaded callback error: "+c)}}};__adroll__.prototype.sha256=function(a){function b(a,b){return a>>>b|a<<32-b}var c=window.unescape(window.encodeURIComponent(a)),d=Math.pow(2,32),e,f="",n=[],m=8*c.length,l=[],g=[];e=0;for(var h={},k=2;64>e;k++)if(!h[k]){for(a=0;313>a;a+=k)h[a]=k;l[e]=Math.pow(k,.5)*d|0;g[e++]=Math.pow(k,1/3)*d|0}for(c+="\u0080";0!==c.length%64-56;)c+="\x00";for(a=0;a<c.length;a++){e=c.charCodeAt(a);if(e>>8)return null;n[a>>2]|=e<<(3-a)%4*8}n[n.length]=m/d|0;n[n.length]=m;for(e=0;e<n.length;){c=n.slice(e,e+=16);d=
l;l=l.slice(0,8);for(a=0;64>a;a++){var h=c[a-15],k=c[a-2],m=l[0],q=l[4],h=l[7]+(b(q,6)^b(q,11)^b(q,25))+(q&l[5]^~q&l[6])+g[a]+(c[a]=16>a?c[a]:c[a-16]+(b(h,7)^b(h,18)^h>>>3)+c[a-7]+(b(k,17)^b(k,19)^k>>>10)|0),m=(b(m,2)^b(m,13)^b(m,22))+(m&l[1]^m&l[2]^l[1]&l[2]),l=[h+m|0].concat(l);l[4]=l[4]+h|0}for(a=0;8>a;a++)l[a]=l[a]+d[a]|0}for(a=0;8>a;a++)for(e=3;e+1;e--)n=l[a]>>8*e&255,f+=(16>n?0:"")+n.toString(16);return f};__adroll__.prototype._container_is_secure=function(a){return this._is_defined(a)?a:this._secure()};__adroll__.prototype.ad_servers_url=function(a,b){return(this._container_is_secure(b)?"https://":"http://")+"d.adroll.com"+a};__adroll__.prototype.ad_request_url=function(a,b,c,d,e){var f=this._global("adroll_a_id"),n=this._global("adroll_s_id"),m=this._global("adroll_insertion_id");a=this.ad_servers_url("/r/"+n+"/"+f+"/"+m+"."+a,e);return this.format_macros(a,b,c,d)};
__adroll__.prototype.click_url=function(a,b){var c=this.ad_servers_url(a?"/click/lenient/":"/click/",!1);return this.format_macros(c,!0,!0,b)};__adroll__.prototype.engage_url=function(){var a=this.ad_servers_url("/event/");return this.format_macros(a,!1,!0,!1)};__adroll__.prototype.cdn_url=function(a,b){return(this._container_is_secure(b)?"https://s.adroll.com":"http://a.adroll.com")+a};
__adroll__.prototype.ad_file_url=function(a,b){var c=this._global("adroll_ad_filename");a=a?c.split(".")[0]+a:c;c="/a/"+c.substring(0,3)+"/"+c.substring(3,6)+"/"+a;return this.cdn_url(c,b)};__adroll__.prototype.roll_crawl_url=function(){return"https://d.adroll.com/p"};__adroll__.prototype.is_lenient_click=function(a){return(a=a?this.parseUri(a):null)&&this.includes(a.path,"lenient")};__adroll__.prototype.record_user=function(a){a=a||{};try{this._unset_global("adroll_page_properties")}catch(b){}Object.keys(a).length&&this._set_global("adroll_page_properties",a);this.dyno("recordUser",a)};__adroll__.prototype.record_adroll_email=function(a){this._record_adroll_email(a,"/id")};__adroll__.prototype.record_adroll_private_email=function(a){this._record_adroll_email(a,"/idp")};
__adroll__.prototype._record_adroll_email=function(a,b){if(this._has_email()){var c=this._global("_adroll_email"),c=c.replace(/^\s+|\s+$/g,""),d,e,f=c.toLowerCase(),n=this.is_email_valid(c);this.is_already_hashed(f)?d=f:n&&(d=this.md5(f),e=this.sha256(f));c=(b||"/id")+"/"+this._global("adroll_adv_id")+"/";d={hashed_email:d,sha256_email:e};n&&(f=f.split("@")[1],d.email_domain=f);a&&(d.idsource=a);c+=this._reg_lpq("?epq",d);this.imgRequest(this._srv(c))}};
__adroll__.prototype._send_plain_text_identifiers=function(a,b,c){if((a||b)&&c){c={idsource:c};var d=(!1===window.adroll_sendrolling_cross_device?"/idp/":"/id/")+this._global("adroll_adv_id")+"/";if(a){a=a.replace(/^\s+|\s+$/g,"").toLowerCase();var e=a.split("@")[1];c.email=a;c.hashed_email=this.md5(a);c.sha256_email=this.sha256(a);c.email_domain=e}b&&(c.user_identifier=b);d+=this._reg_lpq("?epq",c);this.imgRequest(this._srv(d))}};__adroll__.prototype._has_email=function(){return this._has_global("_adroll_email")};
__adroll__.prototype._has_user_identifier=function(){return this._has_global("adroll_user_identifier")&&"example_user_id"!==this._global("adroll_user_identifier")};__adroll__.prototype.is_already_hashed=function(a){return/^[a-f0-9]{32}$/.test(a)};__adroll__.prototype.is_email_valid=function(a){return/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(a)};
__adroll__.prototype.identify=function(a,b){(a.email||a.userId)&&this._send_plain_text_identifiers(a.email,a.userId,b||"adroll-identify");a.email&&this._set_global("_adroll_email",a.email);var c=this.copyObj(a,["email","userId"]);c&&(c=this._srv("/uat/"+this._global("adroll_adv_id")+"/"+this._global("adroll_pix_id")+"/?user_attributes="+window.encodeURIComponent(this.jsonStringify(c))),b&&(c+="&idsource="+b),this.imgRequest(c));this._queueAndCallback("identify",[a,b])};
__adroll__.prototype.setProperties=function(a){if(this._has_global("adroll_page_properties")){var b=this._global("adroll_page_properties");this._unset_global("adroll_page_properties");this.extendObj(b,a);this._set_global("adroll_page_properties",b)}else this._set_global("adroll_page_properties",a)};__adroll__.prototype.appendPageProperties=function(a){this._has_global("adroll_page_properties")&&(a=this.extendObj(this._global("adroll_page_properties"),a));return a};
__adroll__.prototype._callUserEventEndpoint=function(a,b){var c=this._srv("/uev/"+this._global("adroll_adv_id")+"/"+this._global("adroll_pix_id")+"/?event_name="+window.encodeURIComponent(a)+"&adroll_version="+this.get_version()),d=this.copyObj(b);if(d){c+="&event_attributes="+window.encodeURIComponent(this.jsonStringify(d));try{var e=this.get_conversion_value(d);e.conv_value&&(c+="&conv_value="+window.encodeURIComponent(e.conv_value));e.currency&&(c+="&adroll_currency="+window.encodeURIComponent(e.currency))}catch(f){}}this.imgRequest(c)};
__adroll__.prototype.identify_email=function(a){var b=this;this.add_pixel_load_callback(function(){function c(){if(window.__adroll_idem0)window.__adroll_idem0(a,"adroll-identify-email");else if(0<d){--d;for(var e=window.document.querySelectorAll("script"),f=0;f<e.length;f++)if(e[f].src.match(/sendrolling/)){window.setTimeout(c,500);return}b.identify({email:a},"adroll-identify-email")}}var d=3;c()})};
__adroll__.prototype.track=function(a,b){this._track_pxl_assistant(a,b);a&&this._ensure_global("__adroll_consent",null)&&(b=b?this.appendPageProperties(b):this.get_page_properties(),"pageView"===a?this.dyno("fbDynoCallback",b):(this.is_product_event(a)?this.get_pid(this._global("adroll_rollcrawl_opts")):this._callUserEventEndpoint(a,b),this._queueAndCallback("track",[a,b])))};
__adroll__.prototype._reg_lpq=function(a,b){var c,d,e=[],f={},n=btoa(this.object_to_querystring(b));if(!n)return"";for(c=65;91>c;c++)e.push(String.fromCharCode(c));n=n.split("");e.push("-","_","\t");n=n.reverse();e.splice(13,0,"+","/","=");for(c=0;c<e.length-3;c++)d=e.concat(e)[c+e.length/2],f[e[c]]=d,f[e[c].toLowerCase()]=d.toLowerCase();return(e=n.map(function(a){return f[a]||a}).join("").trim())?a+"="+e:""};
__adroll__.prototype._registerCallback=function(a,b,c){this.callbacks=this.callbacks||{};this.callbackNames=this.callbackNames||[];this.callbacks[a]=this.callbacks[a]||[];if(!("function"!==typeof b||-1<this.callbackNames.indexOf(c))&&(this.callbackNames.push(c),this.callbacks[a].push(b),this.callbackQueues&&this.callbackQueues[a]&&this.callbackQueues[a].length))for(c=0;c<this.callbackQueues[a].length;c++)b.apply(null,this.callbackQueues[a][c])};
__adroll__.prototype._queueAndCallback=function(a,b){this.callbackQueues=this.callbackQueues||{};this.callbackQueues[a]=this.callbackQueues[a]||[];this.callbackQueues[a].push(b);if(this.callbacks&&this.callbacks[a]&&this.callbacks[a].length)for(var c=0;c<this.callbacks[a].length;c++)this.callbacks[a][c].apply(null,b)};__adroll__.prototype.registerIdentifyCallback=function(a,b){this._registerCallback("identify",a,b)};
__adroll__.prototype.registerTrackCallback=function(a,b){this._registerCallback("track",a,b)};__adroll__.prototype._track_pxl_assistant=function(a,b){this._has_global("__adroll_pxl_assistant_track")||this._set_global("__adroll_pxl_assistant_track",[]);this._global("__adroll_pxl_assistant_track").push({eventName:a,eventAttrs:b});if(this._nrpa_event_handler)try{this._nrpa_event_handler({track:this._global("__adroll_pxl_assistant_track")})}catch(c){}};__adroll__.prototype._is_defined=function(a){return"undefined"===a||"null"===a?!1:"undefined"!==typeof a};__adroll__.prototype.is_null_or_blank=function(a){return null===a||!this._is_defined(a)||""===a.trim()};__adroll__.prototype.normalize_var=function(a,b){if(!a)return"";a=a.toString().substr(0,this._kwl).replace(/,/gi,".");b&&(a=window.escape(a));return a};__adroll__.prototype.get_version=function(){return this._has_global("adroll_version")?this._global("adroll_version"):"2.0"};
__adroll__.prototype.is_product_event=function(a){return-1!==this.product_events.indexOf(a)};__adroll__.prototype.get_keywords=function(){try{var a=window.document.referrer||"";if(!a)return"";var b=this.parseUri(a);return-1!==b.host.indexOf("www.google.")?b.queryKey.q.substring(0,this._kwl):-1!==b.host.indexOf("bing.com")?b.queryKey.q.substring(0,this._kwl):""}catch(c){return""}};
__adroll__.prototype.parseUri=function(a){a=/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/.exec(a);for(var b={queryKey:{}},c=14,d="source protocol authority userInfo user password host port relative path directory file query anchor".split(" ");c--;)b[d[c]]=a[c]||"";b[d[12]].replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(a,c,d){c&&(b.queryKey[c]=d)});return b};
__adroll__.prototype._secure=function(){return!0};__adroll__.prototype._protocol=function(){return window.document.location.protocol};__adroll__.prototype._native=function(){try{return"http"!==this._protocol().slice(0,4)}catch(a){return!0}};__adroll__.prototype.has_param_in_url=function(a,b){var c=a.split("?");return 1<c.length&&-1!==("&"+c[1]).indexOf("&"+b+"=")};
__adroll__.prototype._srv=function(a,b){a=this._is_defined(a)?a:"";var c="d.adroll.com";b&&(c="ipv4.d.adroll.com");c=this.add_tpc_to_url("https://"+c+a);if(!this.has_param_in_url(c,"arrfrr"))var d=this._get_arrfrr(),c=this.add_param_to_url(c,"arrfrr="+encodeURIComponent(d));this.has_param_in_url(c,"pv")||(c=this.add_param_to_url(c,"pv="+this.pv));return this.add_consent_to_url(this.add_fpc_to_url(c))};
__adroll__.prototype._get_arrfrr=function(a){a||(a=window.location.href);var b=a.split("#");a=b.shift();var b=b.length?"#"+b.join("#"):null,c=a.split("?"),d=this;if(1<c.length){var e=c[1].replace(/([^&=]+)=([^&]+)/g,function(a,b,c){return b.match(/cc_number|credit_card|card_number|cv[cv]_code/)||d.is_luhn(unescape(c))?b+"=NR_REDACT":b+"="+c});c[1]!==e&&(a=c[0]+"?"+e)}b&&(a+=b);return a};
__adroll__.prototype.is_luhn=function(a){if("string"!==typeof a)return!1;a=a.replace(/\D/g,"");if(13>a.length||19<a.length)return!1;for(var b=0,c=!1,d,e=a.length-1;0<=e;e--)d=parseInt(a.charAt(e),10),c&&(d*=2,9<d&&(d-=9)),b+=d,c=!c;return 0===b%10};__adroll__.prototype._cdn=function(a){a=this._is_defined(a)?a:"";return"https://s.adroll.com"+a};__adroll__.prototype.log=function(a){this._logs.push(a)};__adroll__.prototype.read_log=function(a){return this._logs.join(a?"\n":"<br>\n")};
__adroll__.prototype.normalize_url=function(a){return a.toLowerCase()};__adroll__.prototype.imgRequest=function(a){var b=new window.Image;b.src=this.add_tpc_to_url(a);b.setAttribute("width","1");b.setAttribute("height","1");b.setAttribute("border","0");b.setAttribute("alt","");return this._head().appendChild(b)};
__adroll__.prototype.b64toint=function(a){function b(a,c){if(1>c)return"";if(c%2)return b(a,c-1)+a;var d=b(a,c/2);return d+d}var c="",d;a=a.replace("-","+").replace("_","/");for(var e=0;e<a.length;e++)d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a[e]).toString(2),c=c+b("0",6-d.length)+d;return parseInt(c,2)};__adroll__.prototype.copyObj=function(a,b){if(!a)return null;var c={},d=0,e;for(e in a)!a.hasOwnProperty(e)||b&&-1!==b.indexOf(e)||(d++,c[e]=a[e]);return d?c:null};
__adroll__.prototype.extendObj=function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a};__adroll__.prototype.startsWith=function(a,b){return a.substring(0,b.length)===b};__adroll__.prototype.convert_to_map=function(a){if(null===a)return null;var b={},c;for(c in a)a.hasOwnProperty(c)&&"undefined"!==a[c]&&(b[c.toLowerCase()]=a[c]);return b};
__adroll__.prototype.object_keys=function(a){if(window.Object&&window.Object.keys)return Object.keys(a);if("object"===typeof a)return[];var b=[],c;for(c in a)a.hasOwnProperty(c)&&b.push(c);return b};__adroll__.prototype.wrapException=function(a){return function(b){try{return a(b)}catch(c){}}};
__adroll__.prototype.add_tpc_to_url=function(a){var b=this._global("adroll_tpc");if(!a||!b)return a;var c=a.substr(a.indexOf("://")+3).split("/")[0];return a.match(/[?&]adroll_tpc=/)&&"d.adroll.com"!==c?a:this.add_param_to_url(a,"adroll_tpc="+encodeURIComponent(b))};
__adroll__.prototype.add_fpc_to_url=function(a){var b=this.get_first_party_cookie();if(!a||!b)return a;var c=this.parseUri(a);return c.queryKey.adroll_fpc||"d.adroll.com"!==c.host&&"ipv4.d.adroll.com"!==c.host&&"d.adroll.com"!==c.host+":"+c.port&&"ipv4.d.adroll.com"!==c.host+":"+c.port?a:this.add_param_to_url(a,"adroll_fpc="+encodeURIComponent(b))};
__adroll__.prototype.add_consent_to_url=function(a){if(!a)return a;if(this.has_param_in_url(a,"_arc"))return a;var b=this.get_first_party_consent();if(!b||!b.arconsent)return a;var c=a.match(/^\w+:\/\/([^\/]+)/);return c&&"d.adroll.com"!==c[1]&&"ipv4.d.adroll.com"!==c[1]?a:this.add_param_to_url(a,"_arc="+encodeURIComponent(b.arconsent))};
__adroll__.prototype.getSafariVersion=function(){var a=/^Mozilla\/5\.0 \([^)]+\) AppleWebKit\/[^ ]+ \(KHTML, like Gecko\) Version\/([^ ]+)( Mobile\/[^ ]+)? Safari\/[^ ]+$/i.exec(navigator.userAgent);return a?a[1]:null};__adroll__.prototype.set_tpc=function(a,b){var c=this.tpc_callback();a&&b&&this._set_global("adroll_tpc",encodeURIComponent(a)+"="+encodeURIComponent(b));c&&c.call(this)};
__adroll__.prototype.tpc_callback=function(a){var b=window.adroll_tpc_callback,c=this;if(!a)return window.adroll_tpc_callback=a,b;window.adroll_tpc_callback=function(){if(b)try{b.call(c)}catch(d){c.log("tpc callback failed: "+d)}try{a.call(c)}catch(d){c.log("tpc callback failed: "+d)}};return null};__adroll__.prototype.call_next_tpc=function(){var a=this.tpc_callback();window.adroll_lex33_called?a&&a.call(this):(window.adroll_lex33_called=1,this._call_33across(a))};
__adroll__.prototype.extract_query_param=function(a,b){for(var c=b.split("&"),d=0;d<c.length;d++){var e=c[d].split("=");if(decodeURIComponent(e[0])===a)return decodeURIComponent(e[1])}return null};__adroll__.prototype.get_adroll_sid=function(){var a=this.get_consent_params();return a&&(a=this.extract_query_param("_s",a))?a:this._global("adroll_sid")};__adroll__.prototype.load_adroll_tpc=function(a){this.tpc_callback(a);if(this._consent_checked)return this.set_consent();this._consent_checked=!0;this.call_consent_check()};
__adroll__.prototype.get_tpc_decode_timeout=function(){return 1500};__adroll__.prototype.init_pixchk=function(){this.if_under_experiment_js("pixchk",function(){window.addEventListener("message",this.pixchk_handler,!1)},function(){},1E3)};
__adroll__.prototype.pixchk_handler=function(a){if(a.origin.match(/^https?:\/\/[^\/:]*\.adroll\.com\b/))try{var b=JSON.parse(a.data);"pixchk"===b.cmd&&a.source.postMessage(JSON.stringify({cmd:"pixrpl",adv_id:window.adroll_adv_id,pix_id:window.adroll_pix_id,token:b.token}),"*")}catch(c){}};
__adroll__.prototype.load_pixel_assistant=function(){if(!window.document.getElementById("adroll_nrpa_sdk")){var a=(window.location.hash||"").match("nrpa=([A-Z0-7]+)8([A-F0-9]+Z)"),b=Math.floor((new Date).getTime()/1E3)-3600;(window.sessionStorage.getItem("adroll_nrpa_sdk")||a&&a[1]===window.adroll_adv_id&&!(parseInt(a[2],16)<b))&&this.add_script_element("https://s.adroll.com/j/nrpa.js",{id:"adroll_nrpa_sdk"})}};
__adroll__.prototype.set_suspended=function(){this._set_global("__adroll_data_suspended",!0)};__adroll__.prototype.is_suspended=function(){return this._has_global("__adroll_data_suspended")};
__adroll__.prototype.object_to_querystring=function(a){var b=null;if("object"===typeof a&&("function"===typeof window.URLSearchParams&&(b=(new window.URLSearchParams(a)).toString(),"[object URLSearchParams]"===b&&(b=null)),null===b)){var b="",c;for(c in a)a.hasOwnProperty(c)&&(b=b+"&"+encodeURIComponent(c)+"="+encodeURIComponent(a[c]));b=b.substr(1)}return b};__adroll__.prototype._get_lex_timeout=function(){return 1E3};
__adroll__.prototype.is_ipv6=function(){return(this._global("__adroll_consent_data")||{}).isipv6};
__adroll__.prototype._call_33across=function(a){function b(){a&&a.call(c)}var c=this;if(!0===this._ensure_global("__adroll_consent_is_gdpr",null))b();else{var d=(this._global("__adroll_consent_data")||{}).ipgeo||{},e=(d.country_code||"").toLowerCase(),d=(d.region_name||"").toLowerCase();if("us"!==e||"california"===d)b();else if(e=navigator.userAgent.toLowerCase(),-1===e.indexOf("safari/"))b();else{if(-1!==e.indexOf(" edg/")){if((e=e.match(/ edg\/([\d\.]+)/))&&79>parseFloat(e[1])){b();return}}else{if(-1!==
e.indexOf(" chrome/")){b();return}if((e=e.match(/ version\/([\d\.]+)/))&&11>parseFloat(e[1])){b();return}}this.if_under_experiment_js("block33a",function(){b()},function(){var d=c._ensure_global("adroll_adv_id",""),e=c._ensure_global("adroll_pix_id",""),d=c._srv("/lex/"+d+"/"+e+"?id=${PUBTOK}&pv="+c.pv),d="https://lex.33across.com/ps/v1/pubtoken/?pid=115&event=rtg&us_privacy=&rnd=<RANDOM>&ru=<URL>".replace("<RANDOM>",c.pv).replace("<URL>",encodeURIComponent(d));window.adroll_lex_cb=a;window.adroll_lex_to=
window.setTimeout(function(){window.adroll_lex_to=null;window.adroll_lex_cb=null;b()},c._get_lex_timeout());c.add_script_element(d)})}}};__adroll__.prototype.set_lex_id=function(a){window.adroll_lex_to&&(window.clearTimeout(window.adroll_lex_to),window.adroll_lex_to=null);this.set_tpc("lx3",a);a=window.adroll_lex_cb;window.adroll_lex_cb=null;a&&a.call(this)};
__adroll__.prototype._load_black_crow=function(){var a=this;if(!0!==this._ensure_global("__adroll_consent_is_gdpr",null)){var b=(this._global("__adroll_consent_data")||{}).ipgeo||{},c=(b.country_code||"").toLowerCase(),b=(b.region_name||"").toLowerCase();"us"===c&&"california"!==b&&this.if_under_experiment_js("blackcrow",function(){window.blackcrow=window.blackcrow||[];window.blackcrow.push({app_name:"audience",bind:"scores_update",callback:function(b){a._log_pex_event("blackcrow","audience","scores_update",
"",{scores:b})}});var b=a._ensure_global("adroll_adv_id","adroll");this.add_script_element("https://init.blackcrow.ai/js/core/<ADV_EID>.js".replace("<ADV_EID>",b))})}};__adroll__.prototype._is_v1_to_v2_shim=function(){return!0===window.__adroll_v1_to_v2_shim};
__adroll__.prototype._v1_to_v2_shim_use_globals=function(a,b){try{this._is_v1_to_v2_shim()&&(this._has_global("adroll_segments")&&(a.adroll_segments=this._global("adroll_segments")),this._has_global("adroll_email")&&(a.adroll_email=this._global("adroll_email")),this._has_global("adroll_shop_id")&&"undefined"===typeof a.adroll_shop_id&&(a.adroll_shop_id=this._global("adroll_shop_id")),this._has_global("adroll_p")&&b.push("adroll_p="+window.escape(this._global("adroll_p"))),this._has_global("adroll_u")&&
b.push("adroll_u="+window.escape(this._global("adroll_u"))),this._has_global("adroll_m")&&this._has_global("adroll_m_type")&&(b.push("adroll_m="+window.escape(this._global("adroll_m"))),b.push("adroll_m_type="+window.escape(this._global("adroll_m_type")))))}catch(c){}return a};
__adroll__.prototype._v1_to_v2_shim_unset_globals=function(){try{this._is_v1_to_v2_shim()&&(this._unset_global("adroll_conversion_value"),this._unset_global("adroll_conversion_value_in_dollars"),this._unset_global("adroll_currency"),this._unset_global("adroll_email"),this._unset_global("adroll_segments"),this._unset_global("adroll_user_identifier"))}catch(a){}};
__adroll__.prototype._v1_to_v2_shim_extract_pid=function(a,b,c){function d(a){return a?(a=new RegExp(a,"gi"),!!a.exec(l)):null}a||(a={});var e=null,f=null,n=null,m=null,l=this._gurl(),g=this.get_external_data();g&&(f=g.product_id,e=g.product_group,n=g.product_action,m=g.adroll_product_category_id);if(!f&&a.regexp_group&&!("string"===a.regexp_group&&a.regexp_group instanceof String)&&"html"===a.regexp_group.scheme){if(d(a.blacklist_regexp)||!0!==d(a.regexp))return"";f=this.get_product_id_from_dom(a.regexp_group)}else if(!f){if(d(a.blacklist_regexp))return"";
f=this.get_product_id_from_url(l,a.regexp,a.regexp_group)}e||!a.product_group_group||"string"===a.product_group_group&&a.product_group_group instanceof String||"html"!==a.product_group_group.scheme?e||a.product_group_regexp&&(e=this.get_product_id_from_url(l,a.product_group_regexp,a.product_group_group)):e=this.get_product_id_from_dom(a.product_group_group);if(f)a={product_id:f,product_group:e,product_action:n,product_category:m};else if(this.facebook_dummy_product_enabled()&&"facebook"===b)a=this.get_dummy_product_for_facebook(e);
else return null;c&&c(a);return a};
__adroll__.prototype._v1_to_v2_shim_get_pid=function(a){this.extract_pid(a,"adroll",function(a){if(a){var c=a.product_id,d=a.product_group,e=a.product_action,f=a.product_category;a=[];var n;if(c instanceof Array)for(n=0;n<c.length;n++)a.push(["adroll_product_id",this.normalize_var((c[n]+"").toLowerCase(),!0)]);else a.push(["adroll_product_id",this.normalize_var((c+"").toLowerCase(),!0)]);if(f instanceof Array)for(n=0;n<f.length;n++)a.push(["adroll_product_category_id",this.normalize_var((f[n]+"").toLowerCase(),
!0)]);else f&&a.push(["adroll_product_category_id",this.normalize_var((f+"").toLowerCase(),!0)]);d&&a.push(["adroll_product_group",this.normalize_var((d+"").toLowerCase(),!0)]);e&&a.push(["adroll_product_action",this.normalize_var((e+"").toLowerCase(),!0)]);(c=this.external_data_to_qs(!0))&&a.push([c]);c=this._srv(this.buildurl("/p/"+this._global("adroll_adv_id")+"/",a));d=window.document.createElement("img");d.src=c;d.height=d.width=1;d.border=0;d.setAttribute("alt","");this._head().appendChild(d)}}.bind(this))};window.__adroll=window.__adroll||new __adroll__;


    window.adroll_sendrolling_cross_device = true;
    window.adroll_form_fields = {};

    __adroll__.prototype.render_advertisable_cell = function () {
        if (typeof __adroll._form_attach != 'undefined') {
            __adroll._form_attach();
        }

        __adroll.segment_map = JSON.parse("{\"2IQ2QTJ4XJE73IXAMGGIDK\":{\"child\":\"2IQ2QTJ4XJE73IXAMGGIDK\",\"type\":\"s\"},\"2ISAHDNIA5HHVD3A3YXQWT\":{\"child\":\"2ISAHDNIA5HHVD3A3YXQWT\",\"type\":\"s\"},\"37KNG3NTKNCANNSJLCHMMZ\":{\"child\":\"37KNG3NTKNCANNSJLCHMMZ\",\"type\":\"s\"},\"4FGD42OTLVDDTMYWEGOWKS\":{\"child\":\"4FGD42OTLVDDTMYWEGOWKS\",\"type\":\"s\"},\"4JPZPVZXWJFZJB443ADIOB\":{\"child\":\"4JPZPVZXWJFZJB443ADIOB,5CP43WRFL5G7ZLGOEBWMUI\",\"type\":\"s\"},\"4V5RXEG2AVDGTBXT63VJ2L\":{\"child\":\"4V5RXEG2AVDGTBXT63VJ2L\",\"type\":\"c\"},\"6M3B4UVBCFD2DMAXL5F2KW\":{\"child\":\"6M3B4UVBCFD2DMAXL5F2KW\",\"type\":\"s\"},\"6TMNJ6AK3NC3FAIP6INGSQ\":{\"child\":\"6TMNJ6AK3NC3FAIP6INGSQ\",\"type\":\"s\"},\"7HZBNHOPFBFETNSCARXJXK\":{\"child\":\"7HZBNHOPFBFETNSCARXJXK\",\"type\":\"c\"},\"7JRBTCSWRBDEJHGF3HWXPV\":{\"child\":\"7JRBTCSWRBDEJHGF3HWXPV\",\"type\":\"s\"},\"7T7M76UE4VH6ZKAVTBVNCN\":{\"child\":\"7T7M76UE4VH6ZKAVTBVNCN\",\"type\":\"c\"},\"AXP5XWQCDJBKREHWKHIQNM\":{\"child\":\"AXP5XWQCDJBKREHWKHIQNM\",\"type\":\"s\"},\"C4TEX3BUQRHZ3BUHPAHFB5\":{\"child\":\"C4TEX3BUQRHZ3BUHPAHFB5\",\"type\":\"s\"},\"C5OXKC2JC5AKJJ46TVVDCB\":{\"child\":\"C5OXKC2JC5AKJJ46TVVDCB\",\"type\":\"s\"},\"C7N44BBM75HMVKVOBH6422\":{\"child\":\"C7N44BBM75HMVKVOBH6422\",\"type\":\"s\"},\"CDAD4M4HG5GQHCHS7TE4UG\":{\"child\":\"CDAD4M4HG5GQHCHS7TE4UG\",\"type\":\"p\"},\"CDP57OI3F5AMXNMIJ74KQY\":{\"child\":\"CDP57OI3F5AMXNMIJ74KQY\",\"type\":\"s\"},\"CSEFQ4HBYVHUPIKBAM3VUL\":{\"child\":\"CSEFQ4HBYVHUPIKBAM3VUL\",\"type\":\"s\"},\"EU65NFKMOJESXOT4DUFLES\":{\"child\":\"EU65NFKMOJESXOT4DUFLES\",\"type\":\"s\"},\"F2KDMAPIXVBFPLFZ72NEMG\":{\"child\":\"F2KDMAPIXVBFPLFZ72NEMG\",\"type\":\"s\"},\"FTTEX3VSYVHCLN4MIABK4Q\":{\"child\":\"FTTEX3VSYVHCLN4MIABK4Q\",\"type\":\"s\"},\"GQIA5LSCKVCP7MY3SMNYW2\":{\"child\":\"GQIA5LSCKVCP7MY3SMNYW2\",\"type\":\"s\"},\"HCVGYN6ENJABZGPLSDVSVD\":{\"child\":\"HCVGYN6ENJABZGPLSDVSVD\",\"type\":\"s\"},\"HIHHOMN3EZHJNLV2GJMPY6\":{\"child\":\"HIHHOMN3EZHJNLV2GJMPY6\",\"type\":\"c\"},\"HSLRKYWS2RDIVOLBHCUPG4\":{\"child\":\"HSLRKYWS2RDIVOLBHCUPG4\",\"type\":\"c\"},\"IAARAUD46ZGIFIHWPU3YSL\":{\"child\":\"IAARAUD46ZGIFIHWPU3YSL\",\"type\":\"s\"},\"IEMFA2SCKFGUBFBIVAERHV\":{\"child\":\"IEMFA2SCKFGUBFBIVAERHV,YU4UBJ7D5RFMDABQFQW3Y4\",\"type\":\"s\"},\"JN24EZGTUNHMXDWQYGOTK5\":{\"child\":\"JN24EZGTUNHMXDWQYGOTK5\",\"type\":\"s\"},\"KCSZMBW47JARVBHEJ6S6QU\":{\"child\":\"KCSZMBW47JARVBHEJ6S6QU\",\"type\":\"s\"},\"LDLXFRDJQJFTVDRGZZ72OJ\":{\"child\":\"LDLXFRDJQJFTVDRGZZ72OJ\",\"type\":\"s\"},\"LN2GBQSN6RH63IKMVOUZ5T\":{\"child\":\"LN2GBQSN6RH63IKMVOUZ5T\",\"type\":\"p\"},\"M7BMRDPF4JABLBWBP6YITM\":{\"child\":\"M7BMRDPF4JABLBWBP6YITM\",\"type\":\"s\"},\"MBPUTMRIPZAPFEWZLZUCLL\":{\"child\":\"MBPUTMRIPZAPFEWZLZUCLL\",\"type\":\"s\"},\"MO6D723E2NGAPEBABIJIG7\":{\"child\":\"MO6D723E2NGAPEBABIJIG7\",\"type\":\"s\"},\"MVXHMCKHG5EWHMZAKLVXB7\":{\"child\":\"MVXHMCKHG5EWHMZAKLVXB7\",\"type\":\"s\"},\"MWS3UJVM3VDYDOKM2DRAGN\":{\"child\":\"MWS3UJVM3VDYDOKM2DRAGN\",\"type\":\"p\"},\"NBOIOHULEVAC5MZ3ICEQ6S\":{\"child\":\"NBOIOHULEVAC5MZ3ICEQ6S\",\"type\":\"s\"},\"NIOSZ3KXQBEWFIEJ4OQXYP\":{\"child\":\"NIOSZ3KXQBEWFIEJ4OQXYP\",\"type\":\"s\"},\"O4G53UGDWREO7GC27RELBR\":{\"child\":\"O4G53UGDWREO7GC27RELBR\",\"type\":\"s\"},\"OAXYDQPCXFCSLNUBWUACA4\":{\"child\":\"OAXYDQPCXFCSLNUBWUACA4\",\"type\":\"s\"},\"OBXI7LVKZZB6PB5OGBP5N2\":{\"child\":\"OBXI7LVKZZB6PB5OGBP5N2\",\"type\":\"s\"},\"OCLSZOT635BIJC4PMSLWYT\":{\"child\":\"OCLSZOT635BIJC4PMSLWYT\",\"type\":\"s\"},\"OUR5SNJTGRFHLAUNCXIFWD\":{\"child\":\"OUR5SNJTGRFHLAUNCXIFWD\",\"type\":\"p\"},\"PEYTXPDMWNEW5LJDHZCCO5\":{\"child\":\"PEYTXPDMWNEW5LJDHZCCO5,IWOLI34QQZEOFDZW25SELS\",\"type\":\"s\"},\"PU6WHI4FIZELJKNEOHCEOJ\":{\"child\":\"PU6WHI4FIZELJKNEOHCEOJ\",\"type\":\"s\"},\"QE6G6IVRLRGLRPEFFE7KWP\":{\"child\":\"QE6G6IVRLRGLRPEFFE7KWP\",\"type\":\"s\"},\"QKWTX5XQ2JAYFKWESJHFS2\":{\"child\":\"QKWTX5XQ2JAYFKWESJHFS2\",\"type\":\"c\"},\"QZFEBRSDV5G3LH5LK2B6BL\":{\"child\":\"QZFEBRSDV5G3LH5LK2B6BL\",\"type\":\"c\"},\"QZS6CDE5UNASJBESR4HFRU\":{\"child\":\"QZS6CDE5UNASJBESR4HFRU\",\"type\":\"s\"},\"R5OXLLMBKVGI7EDIIMT4S6\":{\"child\":\"R5OXLLMBKVGI7EDIIMT4S6\",\"type\":\"s\"},\"RI7GKJNRERF55DPOCFCBTC\":{\"child\":\"RI7GKJNRERF55DPOCFCBTC\",\"type\":\"s\"},\"RUIPVU5YKRAHVC7ARFZHKZ\":{\"child\":\"RUIPVU5YKRAHVC7ARFZHKZ\",\"type\":\"s\"},\"RXWSJ76KO5CCBEPZRZ7BA7\":{\"child\":\"RXWSJ76KO5CCBEPZRZ7BA7\",\"type\":\"s\"},\"S36IJHBZJJEA7IJGKLAP5B\":{\"child\":\"S36IJHBZJJEA7IJGKLAP5B\",\"type\":\"s\"},\"SB6ZQU7JZVAU3IZTKO43IB\":{\"child\":\"SB6ZQU7JZVAU3IZTKO43IB\",\"type\":\"s\"},\"SCIVZVVQRRBNPCUEEH5QCH\":{\"child\":\"SCIVZVVQRRBNPCUEEH5QCH\",\"type\":\"s\"},\"SEUCMRSW65GVPLOMS4F2CP\":{\"child\":\"SEUCMRSW65GVPLOMS4F2CP\",\"type\":\"s\"},\"SRAHXXSVPZFENPV3B55QOK\":{\"child\":\"SRAHXXSVPZFENPV3B55QOK\",\"type\":\"s\"},\"THVKZLCBSNDIJCVEQVNCWI\":{\"child\":\"THVKZLCBSNDIJCVEQVNCWI\",\"type\":\"s\"},\"TK6QUGW6NBHSRIFVT3EVM2\":{\"child\":\"TK6QUGW6NBHSRIFVT3EVM2\",\"type\":\"s\"},\"TYUZYKZG3JFNZPM2ECF3LD\":{\"child\":\"TYUZYKZG3JFNZPM2ECF3LD\",\"type\":\"c\"},\"U7LOXPRBXJBWTCRWMDGVDM\":{\"child\":\"U7LOXPRBXJBWTCRWMDGVDM\",\"type\":\"s\"},\"UK7BW2WFOFAGDBWMKXXQZC\":{\"child\":\"UK7BW2WFOFAGDBWMKXXQZC\",\"type\":\"s\"},\"UN6OZXB3TZCT7PEYPIJDVY\":{\"child\":\"UN6OZXB3TZCT7PEYPIJDVY\",\"type\":\"s\"},\"UOZ56LA2WFD7DCDVE33XJJ\":{\"child\":\"UOZ56LA2WFD7DCDVE33XJJ\",\"type\":\"s\"},\"URE3JWVMUVFVBHJ5ALANWO\":{\"child\":\"URE3JWVMUVFVBHJ5ALANWO,T4RZOUTDTRCO5D6JHXY5LK\",\"type\":\"s\"},\"UZPXUEEVGRFJBAPVZZ3YBV\":{\"child\":\"UZPXUEEVGRFJBAPVZZ3YBV\",\"type\":\"s\"},\"V6IHISDDYZHEFMD7FL65HJ\":{\"child\":\"V6IHISDDYZHEFMD7FL65HJ\",\"type\":\"s\"},\"VD75TUN62FFUPDWLUI5FUJ\":{\"child\":\"VD75TUN62FFUPDWLUI5FUJ\",\"type\":\"s\"},\"W754AIRPRRGJLA4SG2LS2L\":{\"child\":\"W754AIRPRRGJLA4SG2LS2L\",\"type\":\"s\"},\"WBHLG4Y5WRHBLEQMFEEM32\":{\"child\":\"WBHLG4Y5WRHBLEQMFEEM32\",\"type\":\"s\"},\"XQKJ7CLBMREGRMHLELFNE7\":{\"child\":\"XQKJ7CLBMREGRMHLELFNE7\",\"type\":\"c\"},\"XSR4KIZBO5DPTCQ2EEPPEK\":{\"child\":\"XSR4KIZBO5DPTCQ2EEPPEK\",\"type\":\"s\"},\"ZIEIGY47A5HWVGFXZSI6CS\":{\"child\":\"ZIEIGY47A5HWVGFXZSI6CS\",\"type\":\"s\"},\"ZPKN2WURM5DGNGTCFB7NM6\":{\"child\":\"ZPKN2WURM5DGNGTCFB7NM6\",\"type\":\"s\"}}");
        __adroll.product_events = ["productView", "addToCart", "cartView", "purchase", "productListView"];
        var scheme = (("https:" == document.location.protocol) ? "https" : "http");
        var adnxs_domain = 'secure.adnxs.com';
        var aol_domain = 'secure.leadback.advertising.com';

        if (scheme=='http') { adnxs_domain = 'ib.adnxs.com'; aol_domain = 'leadback.advertising.com';}
        var el = document.createElement("div");
        el.style["width"] = "1px";
        el.style["height"] = "1px";
        el.style["display"] = "inline";
        el.style["position"] = "absolute";

        if (__adroll.consent_allowed(__adroll.consent_networks.facebook)) {
                !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
                n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
                document,'script','//connect.facebook.net/en_US/fbevents.js');
        }

        __adroll__._fbq_calls = [];
        function adrollFbqAsync(arguments) {
            __adroll__._fbq_calls.push(arguments);
        }

        function retryAdrollFbqApply(t) {
            setTimeout(function(){ adrollFbqApply(t * 2); }, t * 100);
        }

        function adrollFbqApply(t) {
            var calls = __adroll__._fbq_calls;
            // Sanity check: retry until at least a FB call is queued.
            if (calls.length === 0) {
                retryAdrollFbqApply(t);
                return;
            }
            if (typeof fbq != 'undefined') {
                __adroll__._fbq_calls = [];
                for (var i = 0; i < calls.length; i++) {
                    fbq.apply(null, calls[i]);
                }
                return;
            }
            retryAdrollFbqApply(t);
        }

        retryAdrollFbqApply(1);

        try {
                try {
                
(function() {
  var ua = window.navigator.userAgent.toLowerCase();
  if (window === window.top && ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1 && ua.indexOf('crios') === -1) {
    window.document.body.className += ' adroll_safari_light_theme';
    var b = window.document.createElement('script');
    b.language = 'javascript';
    b.src = '//d.adroll.com/bounce/pre/JUWZDLBKWFDCTN75AR2KST/RVXVWKJN7ZFAJEQ2WH4YF4/?d=' + encodeURIComponent('//s.adroll.com/j/bounce.js');
    window.__adroll._head().appendChild(b);
  }
})();

                } catch(e) {}
                try {
                
(function() {
var rtb = document.createElement("div");
rtb.style["width"] = "1px";
rtb.style["height"] = "1px";
rtb.style["display"] = "inline";
rtb.style["position"] = "absolute";
rtb.innerHTML = ["/cm/b/out?advertisable=JUWZDLBKWFDCTN75AR2KST","/cm/g/out?advertisable=JUWZDLBKWFDCTN75AR2KST","/cm/index/out?advertisable=JUWZDLBKWFDCTN75AR2KST","/cm/l/out?advertisable=JUWZDLBKWFDCTN75AR2KST","/cm/n/out?advertisable=JUWZDLBKWFDCTN75AR2KST","/cm/o/out?advertisable=JUWZDLBKWFDCTN75AR2KST","/cm/outbrain/out?advertisable=JUWZDLBKWFDCTN75AR2KST","/cm/pubmatic/out?advertisable=JUWZDLBKWFDCTN75AR2KST","/cm/r/out?advertisable=JUWZDLBKWFDCTN75AR2KST","/cm/taboola/out?advertisable=JUWZDLBKWFDCTN75AR2KST","/cm/triplelift/out?advertisable=JUWZDLBKWFDCTN75AR2KST","/cm/x/out?advertisable=JUWZDLBKWFDCTN75AR2KST"].reduce(function (acc, cmURL) {
    return acc + '<img height="1" width="1" style="border-style:none;" alt="" src="' + __adroll._srv(cmURL) + '"/>';
}, '');
__adroll._head().appendChild(rtb);
})();

                } catch(e) {}
                try {
                
(function(){
    var scr = document.createElement("script");
    scr.type = "text/javascript";
    scr.src = "//s.adroll.com/j/sendrolling.js";
    ((document.getElementsByTagName("head") || [null])[0] || document.getElementsByTagName("script")[0].parentNode).appendChild(scr);
}());

                } catch(e) {}
                try {
                
(function(d) {
    var ca = d.cookie.split(';');
    var cn = "_mkto_trk=";
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(cn) == 0) {
            l = "<img height=\"1\" width=\"1\" style=\"border-style:none;\" alt=\"\" src=\"https://d.adroll.com/cm/mk/JUWZDLBKWFDCTN75AR2KST/in?id=[mk_id]\"/>";
            l = l.replace(/\[protocol\]/gi, ("https:" == d.location.protocol) ? "https" : "http");
            l = l.replace(/\[mk_id\]/gi, escape(c.substring(cn.length,c.length)));
            d.createElement("div").innerHTML = l;
        }
    }
})(document);


                } catch(e) {}
                try {
                var func = function(eventName, eventAttrs, headers) {
    var fbLimitedDataUse = true;
    if (__adroll.consent_allowed(__adroll.consent_networks.facebook)) {
        var segment_eids = __adroll.segment_map[headers["x-segment-eid"]].child;
        var segment_type = __adroll.segment_map[headers["x-segment-eid"]].type;
        var external_data = __adroll.convert_to_map(eventAttrs);

        var product_id_list = [];
        var product_group_list = [];

        // parsing product json from external data
        if (external_data && external_data.hasOwnProperty("products")) {
            var products = external_data["products"];
            for (var i = 0; i < products.length; i++) {
                var product_id = products[i]["product_id"];
                var product_group = products[i]["product_group"];
                if (product_id && product_id.length != 0 ) {
                    product_id_list[i] = product_id;
                    product_group_list[i] = product_group;
                }
            }
        }
        if (typeof __adroll.fb === 'undefined'){
            if (fbLimitedDataUse) {
                adrollFbqAsync(['dataProcessingOptions', ['LDU'], 0, 0]);
            }
            adrollFbqAsync(['init', '1928711947357163']);

            adrollFbqAsync(['set', 'autoConfig', 'false', '1928711947357163']);
            __adroll.fb=true;

            var __fbcd = {segment_eid: segment_eids};
            for (var prop in external_data){
                if (prop === "products") {
                    __fbcd['ar_product_id'] = product_id_list;
                    __fbcd['ar_product_group'] = product_group_list;
                }
                else {
                    __fbcd['ar_' + prop] = external_data[prop];
                }
            }

            adrollFbqAsync(['track', "PageView", __fbcd]);

            if (segment_type === "c") {
                var suppress_conversion = (typeof adroll_shopify_dupe_conversion == 'boolean' && adroll_shopify_dupe_conversion) ||
                                          (typeof adroll_shopify_empty_referrer == 'boolean' && adroll_shopify_empty_referrer);

                if (!suppress_conversion) {
                    var conversion = __adroll.get_conversion_value(eventAttrs) || {conv_value: 0, currency: 'USD'};
                    var conversion_value = conversion['conv_value'];
                    var currency = conversion['currency'];
                    conversion_value = currency === 'USC' ? conversion_value / 100 : conversion_value;
                    currency = currency === 'USC' ? 'USD' : currency;

                    var fb_track_src = "https://www.facebook.com/tr/?id=1928711947357163" +
                                      "&ev=Purchase" +
                                      "&cd[value]=" + conversion_value +
                                      "&cd[currency]=" + currency +
                                      "&cd[segment_eid]=" + encodeURIComponent(segment_eids);

                    if(typeof external_data == "object"){
                        for (var prop in external_data){
                            if (prop === "products") {
                                fb_track_src += "&cd[ar_product_id]=" + product_id_list + "&cd[ar_product_group]=" + product_group_list;
                            }
                            else {
                                fb_track_src += "&cd[ar_" + prop + "]=" + external_data[prop];
                            }
                        }
                    }

                    var img = document.createElement("img");
                    img.src = fb_track_src;
                    img.height = img.width = 1;
                    img.border = 0;
                    img.setAttribute("alt", "");
                    __adroll._head().appendChild(img);
                }
            }
        } else {
            var __fbcd = {event: "EventSegment", segment_eid: segment_eids};
            for (var prop in external_data){
                if (prop === "products") {
                    __fbcd['ar_product_id'] = product_id_list;
                    __fbcd['ar_product_group'] = product_group_list;
                }
                else {
                    __fbcd['ar_' + prop] = external_data[prop];
                }
            }

            adrollFbqAsync(['track', "CustomEvent", __fbcd]);
            if (segment_type === "c") {
                var suppress_conversion = (typeof adroll_shopify_dupe_conversion == 'boolean' && adroll_shopify_dupe_conversion) ||
                                          (typeof adroll_shopify_empty_referrer == 'boolean' && adroll_shopify_empty_referrer);

                if (!suppress_conversion) {
                    var conversion = __adroll.get_conversion_value(eventAttrs) || {conv_value: 0, currency: 'USD'};
                    var conversion_value = conversion['conv_value'];
                    var currency = conversion['currency'];
                    conversion_value = currency === 'USC' ? conversion_value / 100 : conversion_value;
                    currency = currency === 'USC' ? 'USD' : currency;

                    var fb_track_src = "https://www.facebook.com/tr/?id=1928711947357163" +
                                      "&ev=Purchase" +
                                      "&cd[value]=" + conversion_value +
                                      "&cd[currency]=" + currency +
                                      "&cd[segment_eid]=" + encodeURIComponent(segment_eids);

                    if(typeof external_data == "object"){
                        for (var prop in external_data){
                            if (prop === "products") {
                                fb_track_src += "&cd[ar_product_id]=" + product_id_list + "&cd[ar_product_group]=" + product_group_list;
                            } else {
                                fb_track_src += "&cd[ar_" + prop + "]=" + external_data[prop];
                            }
                        }
                    }

                    var img = document.createElement("img");
                    img.src = fb_track_src;
                    img.height = img.width = 1;
                    img.border = 0;
                    img.setAttribute("alt", "");
                    __adroll._head().appendChild(img);
                }
            }
        }
    }
}
__adroll.registerDynoCallback(func, 'fbDynoCallback');

                } catch(e) {}
        } catch(e) {}

       __adroll.loadGlobalFunctions();

               __adroll._head().appendChild(el);
        if (typeof __adroll.set_pixel_cookie != 'undefined') {__adroll.set_pixel_cookie(adroll_adv_id, adroll_pix_id);}
    };
}
catch(e) {}

try {
    
    __adroll.load_adroll_tpc(__adroll.render_advertisable_cell);
}
catch(e) {}
