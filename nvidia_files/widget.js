hushly.bombora = true;
hushly.api = "https://app.hushly.com/";
hushly.eventApi = "http://localhost:8585/";
hushly.eventApiVersion = "v1";
hushly.cdn = "https://app.hushly.com/";
hushly.coreApi = "https://core-api.hushly.com/";
hushly.css = "https://app.hushly.com/assets/widget-86616d5946edd9a2cd99f210fd4931af.css";
hushly.loader = "https://app.hushly.com/assets/widget-loader-4ea0ab9e10361ac74d1736d4771a4eac.js";
hushly.scripts = [
    "https://app.hushly.com/assets/widget-lib-1-a1f8ecf70c072a3ecedd6e457423b3f5.js",
    "https://app.hushly.com/assets/widget-lib-2-71e90bdbaf8e69fb602dc214e6869f8e.js",
    "https://app.hushly.com/assets/widget-core-d69caf737304e35cda9bcbea51b8fd3d.js"
]


var widgetSource = "https://app.hushly.com/assets/widget-501241365316ccaa6a710fa6a5f52abb.js";
"undefined" != typeof window._hlyc && (widgetSource = window._hlyc),

function() {
    var scriptTag = document.createElement("script"); 
    scriptTag.type = "text/javascript"; 
    scriptTag.async = true; 
    scriptTag.src = widgetSource; 
    (document.getElementsByTagName("head")[0] 
                    || document.documentElement).appendChild(scriptTag);
}();
//ccm informer
(function(f,i,c){var a=decodeURIComponent,e="",l="",o="||",g=";;",h="split",b="length",j="indexOf",k=0,n="localStorage",m="_ccmdt";f[c]=f[c]||{};function d(q){var p;if(f[n]){return f[n][q]||""}else{p=i.cookie.match(q+"=([^;]*)");return(p&&p[1])||""}}f[c].us={};e=a(d(m))[h](o);k=e[b];if(k>0){while(k--){l=e[k][h]("=");if(l[b]>1){if(l[1][j](g)>-1){f[c].us[l[0]]=l[1][h](g);f[c].us[l[0]].pop()}else{f[c].us[l[0]]=l[1]}}}}})(window,document,"_ml");

//ccm tag
function loadBomboraTag() {
    _ml = window._ml || {};
    _ml.eid = '62379';
    _ml.informer = {
        callbackAlways: true,
        callback: function(){
            if (window._hly_bombora_us) {
                _ml.us = window._hly_bombora_us;
            }
            hushly("event", "hly-bombora-informer-ready");
        },
        enable: true
    };
    var s = document.getElementsByTagName('script')[0], cd = new Date(), mltag = document.createElement('script');
    mltag.type = 'text/javascript'; mltag.async = true;
    mltag.src = 'https://ml314.com/tag.aspx?' + cd.getDate() + cd.getMonth() + cd.getFullYear();
    s.parentNode.insertBefore(mltag, s);
};

(function() {
    if (document.readyState === 'ready' || document.readyState === 'complete') {
        loadBomboraTag();
    } else {
        window.addEventListener('load', loadBomboraTag);
    }
})();
