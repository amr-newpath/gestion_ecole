import{_ as Sn,k as gt,r as An,o as U,c as $,b as d,m as pt,p as Rt,v as Pn,F as he,f as ge,t as T,n as _n,a as pe,g as be,h as Mn}from"./index-8845255c.js";import{_ as Cn,E as En}from"./jspdf.es.min-30149d82.js";function I(t,e){if(e.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+e.length+" present")}function E(t){I(1,arguments);var e=Object.prototype.toString.call(t);return t instanceof Date||Cn(t)==="object"&&e==="[object Date]"?new Date(t.getTime()):typeof t=="number"||e==="[object Number]"?new Date(t):((typeof t=="string"||e==="[object String]")&&typeof console<"u"&&(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn(new Error().stack)),new Date(NaN))}var On={};function Tn(){return On}function ye(t){var e=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return e.setUTCFullYear(t.getFullYear()),t.getTime()-e.getTime()}function Mt(t,e){I(2,arguments);var n=E(t),a=E(e),r=n.getTime()-a.getTime();return r<0?-1:r>0?1:r}function Nn(t,e){I(2,arguments);var n=E(t),a=E(e),r=n.getFullYear()-a.getFullYear(),o=n.getMonth()-a.getMonth();return r*12+o}function Dn(t,e){return I(2,arguments),E(t).getTime()-E(e).getTime()}var we={ceil:Math.ceil,round:Math.round,floor:Math.floor,trunc:function(e){return e<0?Math.ceil(e):Math.floor(e)}},In="trunc";function Ln(t){return t?we[t]:we[In]}function Fn(t){I(1,arguments);var e=E(t);return e.setHours(23,59,59,999),e}function zn(t){I(1,arguments);var e=E(t),n=e.getMonth();return e.setFullYear(e.getFullYear(),n+1,0),e.setHours(23,59,59,999),e}function Rn(t){I(1,arguments);var e=E(t);return Fn(e).getTime()===zn(e).getTime()}function jn(t,e){I(2,arguments);var n=E(t),a=E(e),r=Mt(n,a),o=Math.abs(Nn(n,a)),i;if(o<1)i=0;else{n.getMonth()===1&&n.getDate()>27&&n.setDate(30),n.setMonth(n.getMonth()-r*o);var s=Mt(n,a)===-r;Rn(E(t))&&o===1&&Mt(t,a)===1&&(s=!1),i=r*(o-Number(s))}return i===0?0:i}function Yn(t,e,n){I(2,arguments);var a=Dn(t,e)/1e3;return Ln(n==null?void 0:n.roundingMethod)(a)}var Wn={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}},Un=function(e,n,a){var r,o=Wn[e];return typeof o=="string"?r=o:n===1?r=o.one:r=o.other.replace("{{count}}",n.toString()),a!=null&&a.addSuffix?a.comparison&&a.comparison>0?"in "+r:r+" ago":r};const $n=Un;function jt(t){return function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=e.width?String(e.width):t.defaultWidth,a=t.formats[n]||t.formats[t.defaultWidth];return a}}var Xn={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},Hn={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},Vn={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},Bn={date:jt({formats:Xn,defaultWidth:"full"}),time:jt({formats:Hn,defaultWidth:"full"}),dateTime:jt({formats:Vn,defaultWidth:"full"})};const Gn=Bn;var qn={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"},Qn=function(e,n,a,r){return qn[e]};const Kn=Qn;function at(t){return function(e,n){var a=n!=null&&n.context?String(n.context):"standalone",r;if(a==="formatting"&&t.formattingValues){var o=t.defaultFormattingWidth||t.defaultWidth,i=n!=null&&n.width?String(n.width):o;r=t.formattingValues[i]||t.formattingValues[o]}else{var s=t.defaultWidth,l=n!=null&&n.width?String(n.width):t.defaultWidth;r=t.values[l]||t.values[s]}var f=t.argumentCallback?t.argumentCallback(e):e;return r[f]}}var Jn={narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},Zn={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},ta={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},ea={narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},na={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},aa={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},ra=function(e,n){var a=Number(e),r=a%100;if(r>20||r<10)switch(r%10){case 1:return a+"st";case 2:return a+"nd";case 3:return a+"rd"}return a+"th"},ia={ordinalNumber:ra,era:at({values:Jn,defaultWidth:"wide"}),quarter:at({values:Zn,defaultWidth:"wide",argumentCallback:function(e){return e-1}}),month:at({values:ta,defaultWidth:"wide"}),day:at({values:ea,defaultWidth:"wide"}),dayPeriod:at({values:na,defaultWidth:"wide",formattingValues:aa,defaultFormattingWidth:"wide"})};const oa=ia;function rt(t){return function(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=n.width,r=a&&t.matchPatterns[a]||t.matchPatterns[t.defaultMatchWidth],o=e.match(r);if(!o)return null;var i=o[0],s=a&&t.parsePatterns[a]||t.parsePatterns[t.defaultParseWidth],l=Array.isArray(s)?la(s,function(u){return u.test(i)}):sa(s,function(u){return u.test(i)}),f;f=t.valueCallback?t.valueCallback(l):l,f=n.valueCallback?n.valueCallback(f):f;var c=e.slice(i.length);return{value:f,rest:c}}}function sa(t,e){for(var n in t)if(t.hasOwnProperty(n)&&e(t[n]))return n}function la(t,e){for(var n=0;n<t.length;n++)if(e(t[n]))return n}function fa(t){return function(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=e.match(t.matchPattern);if(!a)return null;var r=a[0],o=e.match(t.parsePattern);if(!o)return null;var i=t.valueCallback?t.valueCallback(o[0]):o[0];i=n.valueCallback?n.valueCallback(i):i;var s=e.slice(r.length);return{value:i,rest:s}}}var ca=/^(\d+)(th|st|nd|rd)?/i,ua=/\d+/i,ma={narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},da={any:[/^b/i,/^(a|c)/i]},va={narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},ha={any:[/1/i,/2/i,/3/i,/4/i]},ga={narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},pa={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},ba={narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},ya={narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},wa={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},xa={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},ka={ordinalNumber:fa({matchPattern:ca,parsePattern:ua,valueCallback:function(e){return parseInt(e,10)}}),era:rt({matchPatterns:ma,defaultMatchWidth:"wide",parsePatterns:da,defaultParseWidth:"any"}),quarter:rt({matchPatterns:va,defaultMatchWidth:"wide",parsePatterns:ha,defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:rt({matchPatterns:ga,defaultMatchWidth:"wide",parsePatterns:pa,defaultParseWidth:"any"}),day:rt({matchPatterns:ba,defaultMatchWidth:"wide",parsePatterns:ya,defaultParseWidth:"any"}),dayPeriod:rt({matchPatterns:wa,defaultMatchWidth:"any",parsePatterns:xa,defaultParseWidth:"any"})};const Sa=ka;var Aa={code:"en-US",formatDistance:$n,formatLong:Gn,formatRelative:Kn,localize:oa,match:Sa,options:{weekStartsOn:0,firstWeekContainsDate:1}};const Pa=Aa;function Be(t,e){if(t==null)throw new TypeError("assign requires that input parameter not be null or undefined");for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t}function _a(t){return Be({},t)}var xe=1440,Ma=2520,Yt=43200,Ca=86400;function Ea(t,e,n){var a,r;I(2,arguments);var o=Tn(),i=(a=(r=n==null?void 0:n.locale)!==null&&r!==void 0?r:o.locale)!==null&&a!==void 0?a:Pa;if(!i.formatDistance)throw new RangeError("locale must contain formatDistance property");var s=Mt(t,e);if(isNaN(s))throw new RangeError("Invalid time value");var l=Be(_a(n),{addSuffix:!!(n!=null&&n.addSuffix),comparison:s}),f,c;s>0?(f=E(e),c=E(t)):(f=E(t),c=E(e));var u=Yn(c,f),b=(ye(c)-ye(f))/1e3,p=Math.round((u-b)/60),k;if(p<2)return n!=null&&n.includeSeconds?u<5?i.formatDistance("lessThanXSeconds",5,l):u<10?i.formatDistance("lessThanXSeconds",10,l):u<20?i.formatDistance("lessThanXSeconds",20,l):u<40?i.formatDistance("halfAMinute",0,l):u<60?i.formatDistance("lessThanXMinutes",1,l):i.formatDistance("xMinutes",1,l):p===0?i.formatDistance("lessThanXMinutes",1,l):i.formatDistance("xMinutes",p,l);if(p<45)return i.formatDistance("xMinutes",p,l);if(p<90)return i.formatDistance("aboutXHours",1,l);if(p<xe){var M=Math.round(p/60);return i.formatDistance("aboutXHours",M,l)}else{if(p<Ma)return i.formatDistance("xDays",1,l);if(p<Yt){var C=Math.round(p/xe);return i.formatDistance("xDays",C,l)}else if(p<Ca)return k=Math.round(p/Yt),i.formatDistance("aboutXMonths",k,l)}if(k=jn(c,f),k<12){var h=Math.round(p/Yt);return i.formatDistance("xMonths",h,l)}else{var g=k%12,y=Math.floor(k/12);return g<3?i.formatDistance("aboutXYears",y,l):g<9?i.formatDistance("overXYears",y,l):i.formatDistance("almostXYears",y+1,l)}}function Oa(t,e){return I(1,arguments),Ea(t,Date.now(),e)}function ke(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),n.push.apply(n,a)}return n}function m(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?ke(Object(n),!0).forEach(function(a){_(t,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):ke(Object(n)).forEach(function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(n,a))})}return t}function Ot(t){"@babel/helpers - typeof";return Ot=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Ot(t)}function Ta(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Se(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function Na(t,e,n){return e&&Se(t.prototype,e),n&&Se(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}function _(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function ne(t,e){return Ia(t)||Fa(t,e)||Ge(t,e)||Ra()}function dt(t){return Da(t)||La(t)||Ge(t)||za()}function Da(t){if(Array.isArray(t))return Ht(t)}function Ia(t){if(Array.isArray(t))return t}function La(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function Fa(t,e){var n=t==null?null:typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(n!=null){var a=[],r=!0,o=!1,i,s;try{for(n=n.call(t);!(r=(i=n.next()).done)&&(a.push(i.value),!(e&&a.length===e));r=!0);}catch(l){o=!0,s=l}finally{try{!r&&n.return!=null&&n.return()}finally{if(o)throw s}}return a}}function Ge(t,e){if(t){if(typeof t=="string")return Ht(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);if(n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set")return Array.from(t);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Ht(t,e)}}function Ht(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function za(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ra(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var Ae=function(){},ae={},qe={},Qe=null,Ke={mark:Ae,measure:Ae};try{typeof window<"u"&&(ae=window),typeof document<"u"&&(qe=document),typeof MutationObserver<"u"&&(Qe=MutationObserver),typeof performance<"u"&&(Ke=performance)}catch{}var ja=ae.navigator||{},Pe=ja.userAgent,_e=Pe===void 0?"":Pe,H=ae,x=qe,Me=Qe,bt=Ke;H.document;var Y=!!x.documentElement&&!!x.head&&typeof x.addEventListener=="function"&&typeof x.createElement=="function",Je=~_e.indexOf("MSIE")||~_e.indexOf("Trident/"),yt,wt,xt,kt,St,z="___FONT_AWESOME___",Vt=16,Ze="fa",tn="svg-inline--fa",Q="data-fa-i2svg",Bt="data-fa-pseudo-element",Ya="data-fa-pseudo-element-pending",re="data-prefix",ie="data-icon",Ce="fontawesome-i2svg",Wa="async",Ua=["HTML","HEAD","STYLE","SCRIPT"],en=function(){try{return!0}catch{return!1}}(),w="classic",S="sharp",oe=[w,S];function vt(t){return new Proxy(t,{get:function(n,a){return a in n?n[a]:n[w]}})}var lt=vt((yt={},_(yt,w,{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands",fak:"kit","fa-kit":"kit"}),_(yt,S,{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light"}),yt)),ft=vt((wt={},_(wt,w,{solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab",kit:"fak"}),_(wt,S,{solid:"fass",regular:"fasr",light:"fasl"}),wt)),ct=vt((xt={},_(xt,w,{fab:"fa-brands",fad:"fa-duotone",fak:"fa-kit",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"}),_(xt,S,{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light"}),xt)),$a=vt((kt={},_(kt,w,{"fa-brands":"fab","fa-duotone":"fad","fa-kit":"fak","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"}),_(kt,S,{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl"}),kt)),Xa=/fa(s|r|l|t|d|b|k|ss|sr|sl)?[\-\ ]/,nn="fa-layers-text",Ha=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i,Va=vt((St={},_(St,w,{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"}),_(St,S,{900:"fass",400:"fasr",300:"fasl"}),St)),an=[1,2,3,4,5,6,7,8,9,10],Ba=an.concat([11,12,13,14,15,16,17,18,19,20]),Ga=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],G={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},ut=new Set;Object.keys(ft[w]).map(ut.add.bind(ut));Object.keys(ft[S]).map(ut.add.bind(ut));var qa=[].concat(oe,dt(ut),["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",G.GROUP,G.SWAP_OPACITY,G.PRIMARY,G.SECONDARY]).concat(an.map(function(t){return"".concat(t,"x")})).concat(Ba.map(function(t){return"w-".concat(t)})),ot=H.FontAwesomeConfig||{};function Qa(t){var e=x.querySelector("script["+t+"]");if(e)return e.getAttribute(t)}function Ka(t){return t===""?!0:t==="false"?!1:t==="true"?!0:t}if(x&&typeof x.querySelector=="function"){var Ja=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];Ja.forEach(function(t){var e=ne(t,2),n=e[0],a=e[1],r=Ka(Qa(n));r!=null&&(ot[a]=r)})}var rn={styleDefault:"solid",familyDefault:"classic",cssPrefix:Ze,replacementClass:tn,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};ot.familyPrefix&&(ot.cssPrefix=ot.familyPrefix);var et=m(m({},rn),ot);et.autoReplaceSvg||(et.observeMutations=!1);var v={};Object.keys(rn).forEach(function(t){Object.defineProperty(v,t,{enumerable:!0,set:function(n){et[t]=n,st.forEach(function(a){return a(v)})},get:function(){return et[t]}})});Object.defineProperty(v,"familyPrefix",{enumerable:!0,set:function(e){et.cssPrefix=e,st.forEach(function(n){return n(v)})},get:function(){return et.cssPrefix}});H.FontAwesomeConfig=v;var st=[];function Za(t){return st.push(t),function(){st.splice(st.indexOf(t),1)}}var X=Vt,F={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function tr(t){if(!(!t||!Y)){var e=x.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=t;for(var n=x.head.childNodes,a=null,r=n.length-1;r>-1;r--){var o=n[r],i=(o.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(i)>-1&&(a=o)}return x.head.insertBefore(e,a),t}}var er="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function mt(){for(var t=12,e="";t-- >0;)e+=er[Math.random()*62|0];return e}function nt(t){for(var e=[],n=(t||[]).length>>>0;n--;)e[n]=t[n];return e}function se(t){return t.classList?nt(t.classList):(t.getAttribute("class")||"").split(" ").filter(function(e){return e})}function on(t){return"".concat(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function nr(t){return Object.keys(t||{}).reduce(function(e,n){return e+"".concat(n,'="').concat(on(t[n]),'" ')},"").trim()}function Dt(t){return Object.keys(t||{}).reduce(function(e,n){return e+"".concat(n,": ").concat(t[n].trim(),";")},"")}function le(t){return t.size!==F.size||t.x!==F.x||t.y!==F.y||t.rotate!==F.rotate||t.flipX||t.flipY}function ar(t){var e=t.transform,n=t.containerWidth,a=t.iconWidth,r={transform:"translate(".concat(n/2," 256)")},o="translate(".concat(e.x*32,", ").concat(e.y*32,") "),i="scale(".concat(e.size/16*(e.flipX?-1:1),", ").concat(e.size/16*(e.flipY?-1:1),") "),s="rotate(".concat(e.rotate," 0 0)"),l={transform:"".concat(o," ").concat(i," ").concat(s)},f={transform:"translate(".concat(a/2*-1," -256)")};return{outer:r,inner:l,path:f}}function rr(t){var e=t.transform,n=t.width,a=n===void 0?Vt:n,r=t.height,o=r===void 0?Vt:r,i=t.startCentered,s=i===void 0?!1:i,l="";return s&&Je?l+="translate(".concat(e.x/X-a/2,"em, ").concat(e.y/X-o/2,"em) "):s?l+="translate(calc(-50% + ".concat(e.x/X,"em), calc(-50% + ").concat(e.y/X,"em)) "):l+="translate(".concat(e.x/X,"em, ").concat(e.y/X,"em) "),l+="scale(".concat(e.size/X*(e.flipX?-1:1),", ").concat(e.size/X*(e.flipY?-1:1),") "),l+="rotate(".concat(e.rotate,"deg) "),l}var ir=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-counter-scale, 0.25));
          transform: scale(var(--fa-counter-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom right;
          transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom left;
          transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top left;
          transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(var(--fa-li-width, 2em) * -1);
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  -webkit-animation-name: fa-beat;
          animation-name: fa-beat;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  -webkit-animation-name: fa-bounce;
          animation-name: fa-bounce;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  -webkit-animation-name: fa-fade;
          animation-name: fa-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  -webkit-animation-name: fa-beat-fade;
          animation-name: fa-beat-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  -webkit-animation-name: fa-flip;
          animation-name: fa-flip;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  -webkit-animation-name: fa-shake;
          animation-name: fa-shake;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 2s);
          animation-duration: var(--fa-animation-duration, 2s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));
          animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    -webkit-animation-delay: -1ms;
            animation-delay: -1ms;
    -webkit-animation-duration: 1ms;
            animation-duration: 1ms;
    -webkit-animation-iteration-count: 1;
            animation-iteration-count: 1;
    -webkit-transition-delay: 0s;
            transition-delay: 0s;
    -webkit-transition-duration: 0s;
            transition-duration: 0s;
  }
}
@-webkit-keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@-webkit-keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@-webkit-keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@-webkit-keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@-webkit-keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@-webkit-keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}

.fa-rotate-180 {
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}

.fa-rotate-270 {
  -webkit-transform: rotate(270deg);
          transform: rotate(270deg);
}

.fa-flip-horizontal {
  -webkit-transform: scale(-1, 1);
          transform: scale(-1, 1);
}

.fa-flip-vertical {
  -webkit-transform: scale(1, -1);
          transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  -webkit-transform: scale(-1, -1);
          transform: scale(-1, -1);
}

.fa-rotate-by {
  -webkit-transform: rotate(var(--fa-rotate-angle, none));
          transform: rotate(var(--fa-rotate-angle, none));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;function sn(){var t=Ze,e=tn,n=v.cssPrefix,a=v.replacementClass,r=ir;if(n!==t||a!==e){var o=new RegExp("\\.".concat(t,"\\-"),"g"),i=new RegExp("\\--".concat(t,"\\-"),"g"),s=new RegExp("\\.".concat(e),"g");r=r.replace(o,".".concat(n,"-")).replace(i,"--".concat(n,"-")).replace(s,".".concat(a))}return r}var Ee=!1;function Wt(){v.autoAddCss&&!Ee&&(tr(sn()),Ee=!0)}var or={mixout:function(){return{dom:{css:sn,insertCss:Wt}}},hooks:function(){return{beforeDOMElementCreation:function(){Wt()},beforeI2svg:function(){Wt()}}}},R=H||{};R[z]||(R[z]={});R[z].styles||(R[z].styles={});R[z].hooks||(R[z].hooks={});R[z].shims||(R[z].shims=[]);var D=R[z],ln=[],sr=function t(){x.removeEventListener("DOMContentLoaded",t),Tt=1,ln.map(function(e){return e()})},Tt=!1;Y&&(Tt=(x.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(x.readyState),Tt||x.addEventListener("DOMContentLoaded",sr));function lr(t){Y&&(Tt?setTimeout(t,0):ln.push(t))}function ht(t){var e=t.tag,n=t.attributes,a=n===void 0?{}:n,r=t.children,o=r===void 0?[]:r;return typeof t=="string"?on(t):"<".concat(e," ").concat(nr(a),">").concat(o.map(ht).join(""),"</").concat(e,">")}function Oe(t,e,n){if(t&&t[e]&&t[e][n])return{prefix:e,iconName:n,icon:t[e][n]}}var fr=function(e,n){return function(a,r,o,i){return e.call(n,a,r,o,i)}},Ut=function(e,n,a,r){var o=Object.keys(e),i=o.length,s=r!==void 0?fr(n,r):n,l,f,c;for(a===void 0?(l=1,c=e[o[0]]):(l=0,c=a);l<i;l++)f=o[l],c=s(c,e[f],f,e);return c};function cr(t){for(var e=[],n=0,a=t.length;n<a;){var r=t.charCodeAt(n++);if(r>=55296&&r<=56319&&n<a){var o=t.charCodeAt(n++);(o&64512)==56320?e.push(((r&1023)<<10)+(o&1023)+65536):(e.push(r),n--)}else e.push(r)}return e}function Gt(t){var e=cr(t);return e.length===1?e[0].toString(16):null}function ur(t,e){var n=t.length,a=t.charCodeAt(e),r;return a>=55296&&a<=56319&&n>e+1&&(r=t.charCodeAt(e+1),r>=56320&&r<=57343)?(a-55296)*1024+r-56320+65536:a}function Te(t){return Object.keys(t).reduce(function(e,n){var a=t[n],r=!!a.icon;return r?e[a.iconName]=a.icon:e[n]=a,e},{})}function qt(t,e){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},a=n.skipHooks,r=a===void 0?!1:a,o=Te(e);typeof D.hooks.addPack=="function"&&!r?D.hooks.addPack(t,Te(e)):D.styles[t]=m(m({},D.styles[t]||{}),o),t==="fas"&&qt("fa",e)}var At,Pt,_t,J=D.styles,mr=D.shims,dr=(At={},_(At,w,Object.values(ct[w])),_(At,S,Object.values(ct[S])),At),fe=null,fn={},cn={},un={},mn={},dn={},vr=(Pt={},_(Pt,w,Object.keys(lt[w])),_(Pt,S,Object.keys(lt[S])),Pt);function hr(t){return~qa.indexOf(t)}function gr(t,e){var n=e.split("-"),a=n[0],r=n.slice(1).join("-");return a===t&&r!==""&&!hr(r)?r:null}var vn=function(){var e=function(o){return Ut(J,function(i,s,l){return i[l]=Ut(s,o,{}),i},{})};fn=e(function(r,o,i){if(o[3]&&(r[o[3]]=i),o[2]){var s=o[2].filter(function(l){return typeof l=="number"});s.forEach(function(l){r[l.toString(16)]=i})}return r}),cn=e(function(r,o,i){if(r[i]=i,o[2]){var s=o[2].filter(function(l){return typeof l=="string"});s.forEach(function(l){r[l]=i})}return r}),dn=e(function(r,o,i){var s=o[2];return r[i]=i,s.forEach(function(l){r[l]=i}),r});var n="far"in J||v.autoFetchSvg,a=Ut(mr,function(r,o){var i=o[0],s=o[1],l=o[2];return s==="far"&&!n&&(s="fas"),typeof i=="string"&&(r.names[i]={prefix:s,iconName:l}),typeof i=="number"&&(r.unicodes[i.toString(16)]={prefix:s,iconName:l}),r},{names:{},unicodes:{}});un=a.names,mn=a.unicodes,fe=It(v.styleDefault,{family:v.familyDefault})};Za(function(t){fe=It(t.styleDefault,{family:v.familyDefault})});vn();function ce(t,e){return(fn[t]||{})[e]}function pr(t,e){return(cn[t]||{})[e]}function q(t,e){return(dn[t]||{})[e]}function hn(t){return un[t]||{prefix:null,iconName:null}}function br(t){var e=mn[t],n=ce("fas",t);return e||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function V(){return fe}var ue=function(){return{prefix:null,iconName:null,rest:[]}};function It(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=e.family,a=n===void 0?w:n,r=lt[a][t],o=ft[a][t]||ft[a][r],i=t in D.styles?t:null;return o||i||null}var Ne=(_t={},_(_t,w,Object.keys(ct[w])),_(_t,S,Object.keys(ct[S])),_t);function Lt(t){var e,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=n.skipLookups,r=a===void 0?!1:a,o=(e={},_(e,w,"".concat(v.cssPrefix,"-").concat(w)),_(e,S,"".concat(v.cssPrefix,"-").concat(S)),e),i=null,s=w;(t.includes(o[w])||t.some(function(f){return Ne[w].includes(f)}))&&(s=w),(t.includes(o[S])||t.some(function(f){return Ne[S].includes(f)}))&&(s=S);var l=t.reduce(function(f,c){var u=gr(v.cssPrefix,c);if(J[c]?(c=dr[s].includes(c)?$a[s][c]:c,i=c,f.prefix=c):vr[s].indexOf(c)>-1?(i=c,f.prefix=It(c,{family:s})):u?f.iconName=u:c!==v.replacementClass&&c!==o[w]&&c!==o[S]&&f.rest.push(c),!r&&f.prefix&&f.iconName){var b=i==="fa"?hn(f.iconName):{},p=q(f.prefix,f.iconName);b.prefix&&(i=null),f.iconName=b.iconName||p||f.iconName,f.prefix=b.prefix||f.prefix,f.prefix==="far"&&!J.far&&J.fas&&!v.autoFetchSvg&&(f.prefix="fas")}return f},ue());return(t.includes("fa-brands")||t.includes("fab"))&&(l.prefix="fab"),(t.includes("fa-duotone")||t.includes("fad"))&&(l.prefix="fad"),!l.prefix&&s===S&&(J.fass||v.autoFetchSvg)&&(l.prefix="fass",l.iconName=q(l.prefix,l.iconName)||l.iconName),(l.prefix==="fa"||i==="fa")&&(l.prefix=V()||"fas"),l}var yr=function(){function t(){Ta(this,t),this.definitions={}}return Na(t,[{key:"add",value:function(){for(var n=this,a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];var i=r.reduce(this._pullDefinitions,{});Object.keys(i).forEach(function(s){n.definitions[s]=m(m({},n.definitions[s]||{}),i[s]),qt(s,i[s]);var l=ct[w][s];l&&qt(l,i[s]),vn()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(n,a){var r=a.prefix&&a.iconName&&a.icon?{0:a}:a;return Object.keys(r).map(function(o){var i=r[o],s=i.prefix,l=i.iconName,f=i.icon,c=f[2];n[s]||(n[s]={}),c.length>0&&c.forEach(function(u){typeof u=="string"&&(n[s][u]=f)}),n[s][l]=f}),n}}]),t}(),De=[],Z={},tt={},wr=Object.keys(tt);function xr(t,e){var n=e.mixoutsTo;return De=t,Z={},Object.keys(tt).forEach(function(a){wr.indexOf(a)===-1&&delete tt[a]}),De.forEach(function(a){var r=a.mixout?a.mixout():{};if(Object.keys(r).forEach(function(i){typeof r[i]=="function"&&(n[i]=r[i]),Ot(r[i])==="object"&&Object.keys(r[i]).forEach(function(s){n[i]||(n[i]={}),n[i][s]=r[i][s]})}),a.hooks){var o=a.hooks();Object.keys(o).forEach(function(i){Z[i]||(Z[i]=[]),Z[i].push(o[i])})}a.provides&&a.provides(tt)}),n}function Qt(t,e){for(var n=arguments.length,a=new Array(n>2?n-2:0),r=2;r<n;r++)a[r-2]=arguments[r];var o=Z[t]||[];return o.forEach(function(i){e=i.apply(null,[e].concat(a))}),e}function K(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),a=1;a<e;a++)n[a-1]=arguments[a];var r=Z[t]||[];r.forEach(function(o){o.apply(null,n)})}function j(){var t=arguments[0],e=Array.prototype.slice.call(arguments,1);return tt[t]?tt[t].apply(null,e):void 0}function Kt(t){t.prefix==="fa"&&(t.prefix="fas");var e=t.iconName,n=t.prefix||V();if(e)return e=q(n,e)||e,Oe(gn.definitions,n,e)||Oe(D.styles,n,e)}var gn=new yr,kr=function(){v.autoReplaceSvg=!1,v.observeMutations=!1,K("noAuto")},Sr={i2svg:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return Y?(K("beforeI2svg",e),j("pseudoElements2svg",e),j("i2svg",e)):Promise.reject("Operation requires a DOM of some kind.")},watch:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=e.autoReplaceSvgRoot;v.autoReplaceSvg===!1&&(v.autoReplaceSvg=!0),v.observeMutations=!0,lr(function(){Pr({autoReplaceSvgRoot:n}),K("watch",e)})}},Ar={icon:function(e){if(e===null)return null;if(Ot(e)==="object"&&e.prefix&&e.iconName)return{prefix:e.prefix,iconName:q(e.prefix,e.iconName)||e.iconName};if(Array.isArray(e)&&e.length===2){var n=e[1].indexOf("fa-")===0?e[1].slice(3):e[1],a=It(e[0]);return{prefix:a,iconName:q(a,n)||n}}if(typeof e=="string"&&(e.indexOf("".concat(v.cssPrefix,"-"))>-1||e.match(Xa))){var r=Lt(e.split(" "),{skipLookups:!0});return{prefix:r.prefix||V(),iconName:q(r.prefix,r.iconName)||r.iconName}}if(typeof e=="string"){var o=V();return{prefix:o,iconName:q(o,e)||e}}}},O={noAuto:kr,config:v,dom:Sr,parse:Ar,library:gn,findIconDefinition:Kt,toHtml:ht},Pr=function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=e.autoReplaceSvgRoot,a=n===void 0?x:n;(Object.keys(D.styles).length>0||v.autoFetchSvg)&&Y&&v.autoReplaceSvg&&O.dom.i2svg({node:a})};function Ft(t,e){return Object.defineProperty(t,"abstract",{get:e}),Object.defineProperty(t,"html",{get:function(){return t.abstract.map(function(a){return ht(a)})}}),Object.defineProperty(t,"node",{get:function(){if(Y){var a=x.createElement("div");return a.innerHTML=t.html,a.children}}}),t}function _r(t){var e=t.children,n=t.main,a=t.mask,r=t.attributes,o=t.styles,i=t.transform;if(le(i)&&n.found&&!a.found){var s=n.width,l=n.height,f={x:s/l/2,y:.5};r.style=Dt(m(m({},o),{},{"transform-origin":"".concat(f.x+i.x/16,"em ").concat(f.y+i.y/16,"em")}))}return[{tag:"svg",attributes:r,children:e}]}function Mr(t){var e=t.prefix,n=t.iconName,a=t.children,r=t.attributes,o=t.symbol,i=o===!0?"".concat(e,"-").concat(v.cssPrefix,"-").concat(n):o;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:m(m({},r),{},{id:i}),children:a}]}]}function me(t){var e=t.icons,n=e.main,a=e.mask,r=t.prefix,o=t.iconName,i=t.transform,s=t.symbol,l=t.title,f=t.maskId,c=t.titleId,u=t.extra,b=t.watchable,p=b===void 0?!1:b,k=a.found?a:n,M=k.width,C=k.height,h=r==="fak",g=[v.replacementClass,o?"".concat(v.cssPrefix,"-").concat(o):""].filter(function(W){return u.classes.indexOf(W)===-1}).filter(function(W){return W!==""||!!W}).concat(u.classes).join(" "),y={children:[],attributes:m(m({},u.attributes),{},{"data-prefix":r,"data-icon":o,class:g,role:u.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(M," ").concat(C)})},A=h&&!~u.classes.indexOf("fa-fw")?{width:"".concat(M/C*16*.0625,"em")}:{};p&&(y.attributes[Q]=""),l&&(y.children.push({tag:"title",attributes:{id:y.attributes["aria-labelledby"]||"title-".concat(c||mt())},children:[l]}),delete y.attributes.title);var P=m(m({},y),{},{prefix:r,iconName:o,main:n,mask:a,maskId:f,transform:i,symbol:s,styles:m(m({},A),u.styles)}),L=a.found&&n.found?j("generateAbstractMask",P)||{children:[],attributes:{}}:j("generateAbstractIcon",P)||{children:[],attributes:{}},N=L.children,zt=L.attributes;return P.children=N,P.attributes=zt,s?Mr(P):_r(P)}function Ie(t){var e=t.content,n=t.width,a=t.height,r=t.transform,o=t.title,i=t.extra,s=t.watchable,l=s===void 0?!1:s,f=m(m(m({},i.attributes),o?{title:o}:{}),{},{class:i.classes.join(" ")});l&&(f[Q]="");var c=m({},i.styles);le(r)&&(c.transform=rr({transform:r,startCentered:!0,width:n,height:a}),c["-webkit-transform"]=c.transform);var u=Dt(c);u.length>0&&(f.style=u);var b=[];return b.push({tag:"span",attributes:f,children:[e]}),o&&b.push({tag:"span",attributes:{class:"sr-only"},children:[o]}),b}function Cr(t){var e=t.content,n=t.title,a=t.extra,r=m(m(m({},a.attributes),n?{title:n}:{}),{},{class:a.classes.join(" ")}),o=Dt(a.styles);o.length>0&&(r.style=o);var i=[];return i.push({tag:"span",attributes:r,children:[e]}),n&&i.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),i}var $t=D.styles;function Jt(t){var e=t[0],n=t[1],a=t.slice(4),r=ne(a,1),o=r[0],i=null;return Array.isArray(o)?i={tag:"g",attributes:{class:"".concat(v.cssPrefix,"-").concat(G.GROUP)},children:[{tag:"path",attributes:{class:"".concat(v.cssPrefix,"-").concat(G.SECONDARY),fill:"currentColor",d:o[0]}},{tag:"path",attributes:{class:"".concat(v.cssPrefix,"-").concat(G.PRIMARY),fill:"currentColor",d:o[1]}}]}:i={tag:"path",attributes:{fill:"currentColor",d:o}},{found:!0,width:e,height:n,icon:i}}var Er={found:!1,width:512,height:512};function Or(t,e){!en&&!v.showMissingIcons&&t&&console.error('Icon with name "'.concat(t,'" and prefix "').concat(e,'" is missing.'))}function Zt(t,e){var n=e;return e==="fa"&&v.styleDefault!==null&&(e=V()),new Promise(function(a,r){if(j("missingIconAbstract"),n==="fa"){var o=hn(t)||{};t=o.iconName||t,e=o.prefix||e}if(t&&e&&$t[e]&&$t[e][t]){var i=$t[e][t];return a(Jt(i))}Or(t,e),a(m(m({},Er),{},{icon:v.showMissingIcons&&t?j("missingIconAbstract")||{}:{}}))})}var Le=function(){},te=v.measurePerformance&&bt&&bt.mark&&bt.measure?bt:{mark:Le,measure:Le},it='FA "6.4.2"',Tr=function(e){return te.mark("".concat(it," ").concat(e," begins")),function(){return pn(e)}},pn=function(e){te.mark("".concat(it," ").concat(e," ends")),te.measure("".concat(it," ").concat(e),"".concat(it," ").concat(e," begins"),"".concat(it," ").concat(e," ends"))},de={begin:Tr,end:pn},Ct=function(){};function Fe(t){var e=t.getAttribute?t.getAttribute(Q):null;return typeof e=="string"}function Nr(t){var e=t.getAttribute?t.getAttribute(re):null,n=t.getAttribute?t.getAttribute(ie):null;return e&&n}function Dr(t){return t&&t.classList&&t.classList.contains&&t.classList.contains(v.replacementClass)}function Ir(){if(v.autoReplaceSvg===!0)return Et.replace;var t=Et[v.autoReplaceSvg];return t||Et.replace}function Lr(t){return x.createElementNS("http://www.w3.org/2000/svg",t)}function Fr(t){return x.createElement(t)}function bn(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=e.ceFn,a=n===void 0?t.tag==="svg"?Lr:Fr:n;if(typeof t=="string")return x.createTextNode(t);var r=a(t.tag);Object.keys(t.attributes||[]).forEach(function(i){r.setAttribute(i,t.attributes[i])});var o=t.children||[];return o.forEach(function(i){r.appendChild(bn(i,{ceFn:a}))}),r}function zr(t){var e=" ".concat(t.outerHTML," ");return e="".concat(e,"Font Awesome fontawesome.com "),e}var Et={replace:function(e){var n=e[0];if(n.parentNode)if(e[1].forEach(function(r){n.parentNode.insertBefore(bn(r),n)}),n.getAttribute(Q)===null&&v.keepOriginalSource){var a=x.createComment(zr(n));n.parentNode.replaceChild(a,n)}else n.remove()},nest:function(e){var n=e[0],a=e[1];if(~se(n).indexOf(v.replacementClass))return Et.replace(e);var r=new RegExp("".concat(v.cssPrefix,"-.*"));if(delete a[0].attributes.id,a[0].attributes.class){var o=a[0].attributes.class.split(" ").reduce(function(s,l){return l===v.replacementClass||l.match(r)?s.toSvg.push(l):s.toNode.push(l),s},{toNode:[],toSvg:[]});a[0].attributes.class=o.toSvg.join(" "),o.toNode.length===0?n.removeAttribute("class"):n.setAttribute("class",o.toNode.join(" "))}var i=a.map(function(s){return ht(s)}).join(`
`);n.setAttribute(Q,""),n.innerHTML=i}};function ze(t){t()}function yn(t,e){var n=typeof e=="function"?e:Ct;if(t.length===0)n();else{var a=ze;v.mutateApproach===Wa&&(a=H.requestAnimationFrame||ze),a(function(){var r=Ir(),o=de.begin("mutate");t.map(r),o(),n()})}}var ve=!1;function wn(){ve=!0}function ee(){ve=!1}var Nt=null;function Re(t){if(Me&&v.observeMutations){var e=t.treeCallback,n=e===void 0?Ct:e,a=t.nodeCallback,r=a===void 0?Ct:a,o=t.pseudoElementsCallback,i=o===void 0?Ct:o,s=t.observeMutationsRoot,l=s===void 0?x:s;Nt=new Me(function(f){if(!ve){var c=V();nt(f).forEach(function(u){if(u.type==="childList"&&u.addedNodes.length>0&&!Fe(u.addedNodes[0])&&(v.searchPseudoElements&&i(u.target),n(u.target)),u.type==="attributes"&&u.target.parentNode&&v.searchPseudoElements&&i(u.target.parentNode),u.type==="attributes"&&Fe(u.target)&&~Ga.indexOf(u.attributeName))if(u.attributeName==="class"&&Nr(u.target)){var b=Lt(se(u.target)),p=b.prefix,k=b.iconName;u.target.setAttribute(re,p||c),k&&u.target.setAttribute(ie,k)}else Dr(u.target)&&r(u.target)})}}),Y&&Nt.observe(l,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function Rr(){Nt&&Nt.disconnect()}function jr(t){var e=t.getAttribute("style"),n=[];return e&&(n=e.split(";").reduce(function(a,r){var o=r.split(":"),i=o[0],s=o.slice(1);return i&&s.length>0&&(a[i]=s.join(":").trim()),a},{})),n}function Yr(t){var e=t.getAttribute("data-prefix"),n=t.getAttribute("data-icon"),a=t.innerText!==void 0?t.innerText.trim():"",r=Lt(se(t));return r.prefix||(r.prefix=V()),e&&n&&(r.prefix=e,r.iconName=n),r.iconName&&r.prefix||(r.prefix&&a.length>0&&(r.iconName=pr(r.prefix,t.innerText)||ce(r.prefix,Gt(t.innerText))),!r.iconName&&v.autoFetchSvg&&t.firstChild&&t.firstChild.nodeType===Node.TEXT_NODE&&(r.iconName=t.firstChild.data)),r}function Wr(t){var e=nt(t.attributes).reduce(function(r,o){return r.name!=="class"&&r.name!=="style"&&(r[o.name]=o.value),r},{}),n=t.getAttribute("title"),a=t.getAttribute("data-fa-title-id");return v.autoA11y&&(n?e["aria-labelledby"]="".concat(v.replacementClass,"-title-").concat(a||mt()):(e["aria-hidden"]="true",e.focusable="false")),e}function Ur(){return{iconName:null,title:null,titleId:null,prefix:null,transform:F,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function je(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},n=Yr(t),a=n.iconName,r=n.prefix,o=n.rest,i=Wr(t),s=Qt("parseNodeAttributes",{},t),l=e.styleParser?jr(t):[];return m({iconName:a,title:t.getAttribute("title"),titleId:t.getAttribute("data-fa-title-id"),prefix:r,transform:F,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:o,styles:l,attributes:i}},s)}var $r=D.styles;function xn(t){var e=v.autoReplaceSvg==="nest"?je(t,{styleParser:!1}):je(t);return~e.extra.classes.indexOf(nn)?j("generateLayersText",t,e):j("generateSvgReplacementMutation",t,e)}var B=new Set;oe.map(function(t){B.add("fa-".concat(t))});Object.keys(lt[w]).map(B.add.bind(B));Object.keys(lt[S]).map(B.add.bind(B));B=dt(B);function Ye(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!Y)return Promise.resolve();var n=x.documentElement.classList,a=function(u){return n.add("".concat(Ce,"-").concat(u))},r=function(u){return n.remove("".concat(Ce,"-").concat(u))},o=v.autoFetchSvg?B:oe.map(function(c){return"fa-".concat(c)}).concat(Object.keys($r));o.includes("fa")||o.push("fa");var i=[".".concat(nn,":not([").concat(Q,"])")].concat(o.map(function(c){return".".concat(c,":not([").concat(Q,"])")})).join(", ");if(i.length===0)return Promise.resolve();var s=[];try{s=nt(t.querySelectorAll(i))}catch{}if(s.length>0)a("pending"),r("complete");else return Promise.resolve();var l=de.begin("onTree"),f=s.reduce(function(c,u){try{var b=xn(u);b&&c.push(b)}catch(p){en||p.name==="MissingIcon"&&console.error(p)}return c},[]);return new Promise(function(c,u){Promise.all(f).then(function(b){yn(b,function(){a("active"),a("complete"),r("pending"),typeof e=="function"&&e(),l(),c()})}).catch(function(b){l(),u(b)})})}function Xr(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;xn(t).then(function(n){n&&yn([n],e)})}function Hr(t){return function(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=(e||{}).icon?e:Kt(e||{}),r=n.mask;return r&&(r=(r||{}).icon?r:Kt(r||{})),t(a,m(m({},n),{},{mask:r}))}}var Vr=function(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=n.transform,r=a===void 0?F:a,o=n.symbol,i=o===void 0?!1:o,s=n.mask,l=s===void 0?null:s,f=n.maskId,c=f===void 0?null:f,u=n.title,b=u===void 0?null:u,p=n.titleId,k=p===void 0?null:p,M=n.classes,C=M===void 0?[]:M,h=n.attributes,g=h===void 0?{}:h,y=n.styles,A=y===void 0?{}:y;if(e){var P=e.prefix,L=e.iconName,N=e.icon;return Ft(m({type:"icon"},e),function(){return K("beforeDOMElementCreation",{iconDefinition:e,params:n}),v.autoA11y&&(b?g["aria-labelledby"]="".concat(v.replacementClass,"-title-").concat(k||mt()):(g["aria-hidden"]="true",g.focusable="false")),me({icons:{main:Jt(N),mask:l?Jt(l.icon):{found:!1,width:null,height:null,icon:{}}},prefix:P,iconName:L,transform:m(m({},F),r),symbol:i,title:b,maskId:c,titleId:k,extra:{attributes:g,styles:A,classes:C}})})}},Br={mixout:function(){return{icon:Hr(Vr)}},hooks:function(){return{mutationObserverCallbacks:function(n){return n.treeCallback=Ye,n.nodeCallback=Xr,n}}},provides:function(e){e.i2svg=function(n){var a=n.node,r=a===void 0?x:a,o=n.callback,i=o===void 0?function(){}:o;return Ye(r,i)},e.generateSvgReplacementMutation=function(n,a){var r=a.iconName,o=a.title,i=a.titleId,s=a.prefix,l=a.transform,f=a.symbol,c=a.mask,u=a.maskId,b=a.extra;return new Promise(function(p,k){Promise.all([Zt(r,s),c.iconName?Zt(c.iconName,c.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(M){var C=ne(M,2),h=C[0],g=C[1];p([n,me({icons:{main:h,mask:g},prefix:s,iconName:r,transform:l,symbol:f,maskId:u,title:o,titleId:i,extra:b,watchable:!0})])}).catch(k)})},e.generateAbstractIcon=function(n){var a=n.children,r=n.attributes,o=n.main,i=n.transform,s=n.styles,l=Dt(s);l.length>0&&(r.style=l);var f;return le(i)&&(f=j("generateAbstractTransformGrouping",{main:o,transform:i,containerWidth:o.width,iconWidth:o.width})),a.push(f||o.icon),{children:a,attributes:r}}}},Gr={mixout:function(){return{layer:function(n){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.classes,o=r===void 0?[]:r;return Ft({type:"layer"},function(){K("beforeDOMElementCreation",{assembler:n,params:a});var i=[];return n(function(s){Array.isArray(s)?s.map(function(l){i=i.concat(l.abstract)}):i=i.concat(s.abstract)}),[{tag:"span",attributes:{class:["".concat(v.cssPrefix,"-layers")].concat(dt(o)).join(" ")},children:i}]})}}}},qr={mixout:function(){return{counter:function(n){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.title,o=r===void 0?null:r,i=a.classes,s=i===void 0?[]:i,l=a.attributes,f=l===void 0?{}:l,c=a.styles,u=c===void 0?{}:c;return Ft({type:"counter",content:n},function(){return K("beforeDOMElementCreation",{content:n,params:a}),Cr({content:n.toString(),title:o,extra:{attributes:f,styles:u,classes:["".concat(v.cssPrefix,"-layers-counter")].concat(dt(s))}})})}}}},Qr={mixout:function(){return{text:function(n){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.transform,o=r===void 0?F:r,i=a.title,s=i===void 0?null:i,l=a.classes,f=l===void 0?[]:l,c=a.attributes,u=c===void 0?{}:c,b=a.styles,p=b===void 0?{}:b;return Ft({type:"text",content:n},function(){return K("beforeDOMElementCreation",{content:n,params:a}),Ie({content:n,transform:m(m({},F),o),title:s,extra:{attributes:u,styles:p,classes:["".concat(v.cssPrefix,"-layers-text")].concat(dt(f))}})})}}},provides:function(e){e.generateLayersText=function(n,a){var r=a.title,o=a.transform,i=a.extra,s=null,l=null;if(Je){var f=parseInt(getComputedStyle(n).fontSize,10),c=n.getBoundingClientRect();s=c.width/f,l=c.height/f}return v.autoA11y&&!r&&(i.attributes["aria-hidden"]="true"),Promise.resolve([n,Ie({content:n.innerHTML,width:s,height:l,transform:o,title:r,extra:i,watchable:!0})])}}},Kr=new RegExp('"',"ug"),We=[1105920,1112319];function Jr(t){var e=t.replace(Kr,""),n=ur(e,0),a=n>=We[0]&&n<=We[1],r=e.length===2?e[0]===e[1]:!1;return{value:Gt(r?e[0]:e),isSecondary:a||r}}function Ue(t,e){var n="".concat(Ya).concat(e.replace(":","-"));return new Promise(function(a,r){if(t.getAttribute(n)!==null)return a();var o=nt(t.children),i=o.filter(function(N){return N.getAttribute(Bt)===e})[0],s=H.getComputedStyle(t,e),l=s.getPropertyValue("font-family").match(Ha),f=s.getPropertyValue("font-weight"),c=s.getPropertyValue("content");if(i&&!l)return t.removeChild(i),a();if(l&&c!=="none"&&c!==""){var u=s.getPropertyValue("content"),b=~["Sharp"].indexOf(l[2])?S:w,p=~["Solid","Regular","Light","Thin","Duotone","Brands","Kit"].indexOf(l[2])?ft[b][l[2].toLowerCase()]:Va[b][f],k=Jr(u),M=k.value,C=k.isSecondary,h=l[0].startsWith("FontAwesome"),g=ce(p,M),y=g;if(h){var A=br(M);A.iconName&&A.prefix&&(g=A.iconName,p=A.prefix)}if(g&&!C&&(!i||i.getAttribute(re)!==p||i.getAttribute(ie)!==y)){t.setAttribute(n,y),i&&t.removeChild(i);var P=Ur(),L=P.extra;L.attributes[Bt]=e,Zt(g,p).then(function(N){var zt=me(m(m({},P),{},{icons:{main:N,mask:ue()},prefix:p,iconName:y,extra:L,watchable:!0})),W=x.createElementNS("http://www.w3.org/2000/svg","svg");e==="::before"?t.insertBefore(W,t.firstChild):t.appendChild(W),W.outerHTML=zt.map(function(kn){return ht(kn)}).join(`
`),t.removeAttribute(n),a()}).catch(r)}else a()}else a()})}function Zr(t){return Promise.all([Ue(t,"::before"),Ue(t,"::after")])}function ti(t){return t.parentNode!==document.head&&!~Ua.indexOf(t.tagName.toUpperCase())&&!t.getAttribute(Bt)&&(!t.parentNode||t.parentNode.tagName!=="svg")}function $e(t){if(Y)return new Promise(function(e,n){var a=nt(t.querySelectorAll("*")).filter(ti).map(Zr),r=de.begin("searchPseudoElements");wn(),Promise.all(a).then(function(){r(),ee(),e()}).catch(function(){r(),ee(),n()})})}var ei={hooks:function(){return{mutationObserverCallbacks:function(n){return n.pseudoElementsCallback=$e,n}}},provides:function(e){e.pseudoElements2svg=function(n){var a=n.node,r=a===void 0?x:a;v.searchPseudoElements&&$e(r)}}},Xe=!1,ni={mixout:function(){return{dom:{unwatch:function(){wn(),Xe=!0}}}},hooks:function(){return{bootstrap:function(){Re(Qt("mutationObserverCallbacks",{}))},noAuto:function(){Rr()},watch:function(n){var a=n.observeMutationsRoot;Xe?ee():Re(Qt("mutationObserverCallbacks",{observeMutationsRoot:a}))}}}},He=function(e){var n={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return e.toLowerCase().split(" ").reduce(function(a,r){var o=r.toLowerCase().split("-"),i=o[0],s=o.slice(1).join("-");if(i&&s==="h")return a.flipX=!0,a;if(i&&s==="v")return a.flipY=!0,a;if(s=parseFloat(s),isNaN(s))return a;switch(i){case"grow":a.size=a.size+s;break;case"shrink":a.size=a.size-s;break;case"left":a.x=a.x-s;break;case"right":a.x=a.x+s;break;case"up":a.y=a.y-s;break;case"down":a.y=a.y+s;break;case"rotate":a.rotate=a.rotate+s;break}return a},n)},ai={mixout:function(){return{parse:{transform:function(n){return He(n)}}}},hooks:function(){return{parseNodeAttributes:function(n,a){var r=a.getAttribute("data-fa-transform");return r&&(n.transform=He(r)),n}}},provides:function(e){e.generateAbstractTransformGrouping=function(n){var a=n.main,r=n.transform,o=n.containerWidth,i=n.iconWidth,s={transform:"translate(".concat(o/2," 256)")},l="translate(".concat(r.x*32,", ").concat(r.y*32,") "),f="scale(".concat(r.size/16*(r.flipX?-1:1),", ").concat(r.size/16*(r.flipY?-1:1),") "),c="rotate(".concat(r.rotate," 0 0)"),u={transform:"".concat(l," ").concat(f," ").concat(c)},b={transform:"translate(".concat(i/2*-1," -256)")},p={outer:s,inner:u,path:b};return{tag:"g",attributes:m({},p.outer),children:[{tag:"g",attributes:m({},p.inner),children:[{tag:a.icon.tag,children:a.icon.children,attributes:m(m({},a.icon.attributes),p.path)}]}]}}}},Xt={x:0,y:0,width:"100%",height:"100%"};function Ve(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return t.attributes&&(t.attributes.fill||e)&&(t.attributes.fill="black"),t}function ri(t){return t.tag==="g"?t.children:[t]}var ii={hooks:function(){return{parseNodeAttributes:function(n,a){var r=a.getAttribute("data-fa-mask"),o=r?Lt(r.split(" ").map(function(i){return i.trim()})):ue();return o.prefix||(o.prefix=V()),n.mask=o,n.maskId=a.getAttribute("data-fa-mask-id"),n}}},provides:function(e){e.generateAbstractMask=function(n){var a=n.children,r=n.attributes,o=n.main,i=n.mask,s=n.maskId,l=n.transform,f=o.width,c=o.icon,u=i.width,b=i.icon,p=ar({transform:l,containerWidth:u,iconWidth:f}),k={tag:"rect",attributes:m(m({},Xt),{},{fill:"white"})},M=c.children?{children:c.children.map(Ve)}:{},C={tag:"g",attributes:m({},p.inner),children:[Ve(m({tag:c.tag,attributes:m(m({},c.attributes),p.path)},M))]},h={tag:"g",attributes:m({},p.outer),children:[C]},g="mask-".concat(s||mt()),y="clip-".concat(s||mt()),A={tag:"mask",attributes:m(m({},Xt),{},{id:g,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[k,h]},P={tag:"defs",children:[{tag:"clipPath",attributes:{id:y},children:ri(b)},A]};return a.push(P,{tag:"rect",attributes:m({fill:"currentColor","clip-path":"url(#".concat(y,")"),mask:"url(#".concat(g,")")},Xt)}),{children:a,attributes:r}}}},oi={provides:function(e){var n=!1;H.matchMedia&&(n=H.matchMedia("(prefers-reduced-motion: reduce)").matches),e.missingIconAbstract=function(){var a=[],r={fill:"currentColor"},o={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};a.push({tag:"path",attributes:m(m({},r),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var i=m(m({},o),{},{attributeName:"opacity"}),s={tag:"circle",attributes:m(m({},r),{},{cx:"256",cy:"364",r:"28"}),children:[]};return n||s.children.push({tag:"animate",attributes:m(m({},o),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:m(m({},i),{},{values:"1;0;1;1;0;1;"})}),a.push(s),a.push({tag:"path",attributes:m(m({},r),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:n?[]:[{tag:"animate",attributes:m(m({},i),{},{values:"1;0;0;0;0;1;"})}]}),n||a.push({tag:"path",attributes:m(m({},r),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:m(m({},i),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:a}}}},si={hooks:function(){return{parseNodeAttributes:function(n,a){var r=a.getAttribute("data-fa-symbol"),o=r===null?!1:r===""?!0:r;return n.symbol=o,n}}}},li=[or,Br,Gr,qr,Qr,ei,ni,ai,ii,oi,si];xr(li,{mixoutsTo:O});O.noAuto;O.config;O.library;O.dom;O.parse;O.findIconDefinition;O.toHtml;O.icon;O.layer;O.text;O.counter;var fi=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},ci={exports:{}};(function(t){(function(e){var n=function(h,g,y){if(!f(g)||u(g)||b(g)||p(g)||l(g))return g;var A,P=0,L=0;if(c(g))for(A=[],L=g.length;P<L;P++)A.push(n(h,g[P],y));else{A={};for(var N in g)Object.prototype.hasOwnProperty.call(g,N)&&(A[h(N,y)]=n(h,g[N],y))}return A},a=function(h,g){g=g||{};var y=g.separator||"_",A=g.split||/(?=[A-Z])/;return h.split(A).join(y)},r=function(h){return k(h)?h:(h=h.replace(/[\-_\s]+(.)?/g,function(g,y){return y?y.toUpperCase():""}),h.substr(0,1).toLowerCase()+h.substr(1))},o=function(h){var g=r(h);return g.substr(0,1).toUpperCase()+g.substr(1)},i=function(h,g){return a(h,g).toLowerCase()},s=Object.prototype.toString,l=function(h){return typeof h=="function"},f=function(h){return h===Object(h)},c=function(h){return s.call(h)=="[object Array]"},u=function(h){return s.call(h)=="[object Date]"},b=function(h){return s.call(h)=="[object RegExp]"},p=function(h){return s.call(h)=="[object Boolean]"},k=function(h){return h=h-0,h===h},M=function(h,g){var y=g&&"process"in g?g.process:g;return typeof y!="function"?h:function(A,P){return y(A,h,P)}},C={camelize:r,decamelize:i,pascalize:o,depascalize:i,camelizeKeys:function(h,g){return n(M(r,g),h)},decamelizeKeys:function(h,g){return n(M(i,g),h,g)},pascalizeKeys:function(h,g){return n(M(o,g),h)},depascalizeKeys:function(){return this.decamelizeKeys.apply(this,arguments)}};t.exports?t.exports=C:e.humps=C})(fi)})(ci);var ui=!1;try{ui=!0}catch{}const mi={data(){return{isLoading:!0,paginatedList:[],searchQuery:"",selectedType:"",selectedMode:"",selectedStatus:"",startDate:"",endDate:""}},methods:{navigateToPayer(){this.$router.push({name:"CreatePaiement"})},formatDate(t){const e={day:"2-digit",month:"2-digit",year:"numeric"};return new Date(t).toLocaleDateString("en-GB",e)},async payPayment(t){if(t.reste===0){alert("This payment is already completed.");return}const e={avance:t.montant,reste:0,status:"Completed"};try{const n=await gt.put(`/comptable/update-payment/${t.id}`,e),a=this.paginatedList.findIndex(r=>r.id===t.id);a!==-1&&(this.paginatedList[a]=n.data),alert("Payment completed successfully.")}catch(n){console.error("Error completing payment:",n)}},printInvoice(t){const e=new En,n=14,a=n*1.25,r=n*1.5,o=n*1.2;e.setFontSize(n),e.setFontSize(r*1.25),e.setTextColor("#f8ce03"),e.text("Payment Receipt",105,15,{align:"center"});let i=40;e.setTextColor("#0096cb"),e.setFontSize(r),e.text("Payment Details",15,i),i+=a,e.setTextColor("#000000"),e.setFontSize(o),e.text(`Type de service: ${t.type}`,15,i),i+=a,e.setFontSize(o),e.text("Services:",15,i),i+=a,t.services.forEach(s=>{e.text(`${s.service} - ${s.pivot.price}`,20,i),i+=a}),e.setFontSize(o),e.text(`Price: ${t.montant}`,15,i),i+=a,e.setFontSize(o),e.text(`Avance: ${t.avance}`,15,i),i+=a,e.setFontSize(o),e.text(`Reste: ${t.reste}`,15,i),i+=a,e.setFontSize(o),e.text(`Mode de paiement: ${t.mode}`,15,i),i+=a,e.setFontSize(o),e.text(`Month: ${t.mois}`,15,i),i+=a,e.setFontSize(o),e.text(`Comment: ${t.comment}`,15,i),i+=a,e.setFontSize(o),e.text(`Status: ${t.status}`,15,i),i+=a,e.save(`payment_receipt_${t.id}.pdf`)},formatHumanDate(t){return Oa(new Date(t),{addSuffix:!0})},getStatusClass(t){return t.reste===0?"bg-green-200 text-green-800 rounded-full py-1 px-3  text-center":"bg-yellow-200 text-yellow-800 rounded-full py-1 px-3 text-center"},async fetchPayments(){try{this.isLoading=!0;const t=await gt.get("/comptable/paiements");this.paginatedList=t.data}catch(t){console.error("Error fetching payments:",t)}finally{this.isLoading=!1}},editPayment(t){},deletePayment(t){},performSearch(){this.searchQuery.trim()===""?this.fetchPayments():(this.isLoading=!0,gt.get("/comptable/paiements",{params:{search:this.searchQuery}}).then(t=>{this.paginatedList=t.data}).catch(t=>{console.error("Error searching payments:",t)}).finally(()=>{this.isLoading=!1}))},performFilter(){this.isLoading=!0;const t={type:this.selectedType,mode:this.selectedMode,status:this.selectedStatus};gt.get("/comptable/paiements",{params:{...t,search:this.searchQuery}}).then(e=>{this.paginatedList=e.data}).catch(e=>{console.error("Error filtering payments:",e)}).finally(()=>{this.isLoading=!1})},clearFilters(){this.searchQuery="",this.selectedType="",this.selectedMode="",this.selectedStatus="",this.fetchPayments()},isDateInRange(t){if(!this.startDate||!this.endDate)return!0;const e=new Date(t),n=new Date(this.startDate),a=new Date(this.endDate);return e>=n&&e<=a}},computed:{filteredPayments(){return this.paginatedList.filter(e=>{const n=!this.selectedStatus||e.status===this.selectedStatus,a=e.eleve.prenom.toLowerCase().includes(this.searchQuery.toLowerCase())||e.eleve.nom.toLowerCase().includes(this.searchQuery.toLowerCase()),r=this.isDateInRange(e.created_at);return n&&a&&r})}},mounted(){this.fetchPayments()}},di={class:"antialiased bg-gray-100 text-gray-600 my-16 px-4"},vi={class:"flex flex-col justify-center h-full"},hi={class:"w-full max-w-6xlxl mx-auto bg-white shadow-lg rounded-sm border border-gray-200"},gi=d("header",{class:"px-5 py-4 border-b border-gray-100"},[d("h2",{class:"font-semibold text-gray-800"},"Paiements")],-1),pi={class:"p-3"},bi={class:"flex items-center justify-between mb-4"},yi={class:"flex space-x-4"},wi=d("option",{value:""},"All Status",-1),xi=d("option",{value:"Completed"},"Completed",-1),ki=d("option",{value:"Not completed"},"Non completed",-1),Si=[wi,xi,ki],Ai={class:"overflow-x-auto"},Pi={key:0,class:"table-auto w-full"},_i=d("thead",{class:"text-xs font-semibold uppercase text-gray-400 bg-gray-50"},[d("tr",null,[d("th",{class:"p-4 whitespace-nowrap"},[d("div",{class:"font-semibold text-left"},"Date")]),d("th",{class:"p-4 whitespace-nowrap"},[d("div",{class:"font-semibold text-left"},"Eleve")]),d("th",{class:"p-4 whitespace-nowrap"},[d("div",{class:"font-semibold text-left"},"Montant")]),d("th",{class:"p-4 whitespace-nowrap"},[d("div",{class:"font-semibold text-left"},"Avance")]),d("th",{class:"p-4 whitespace-nowrap"},[d("div",{class:"font-semibold text-left"},"Reste")]),d("th",{class:"p-4 whitespace-nowrap"},[d("div",{class:"font-semibold text-left"},"Mode Paiement")]),d("th",{class:"p-4 whitespace-nowrap"},[d("div",{class:"font-semibold text-left"},"Status")]),d("th",{class:"p-4 whitespace-nowrap"},[d("div",{class:"font-semibold text-left"},"Pending")]),d("th",{class:"p-4 whitespace-nowrap"},[d("div",{class:"font-semibold text-left"},"Services")]),d("th",{class:"p-4 whitespace-nowrap"},[d("div",{class:"font-semibold text-left"},"Comment")]),d("th",{class:"p-4 whitespace-nowrap"},[d("div",{class:"font-semibold text-center"},"Actions")])])],-1),Mi={class:"text-sm divide-y divide-gray-100"},Ci={class:"p-4 whitespace-nowrap"},Ei={class:"text-left"},Oi={class:"p-4 whitespace-nowrap"},Ti={class:"font-medium text-gray-800"},Ni={class:"p-4 whitespace-nowrap"},Di={class:"text-left"},Ii={class:"p-4 whitespace-nowrap"},Li={class:"text-left"},Fi={class:"p-4 whitespace-nowrap"},zi={class:"text-left"},Ri={class:"p-4 whitespace-nowrap"},ji={class:"text-left"},Yi={class:"p-4 whitespace-nowrap"},Wi={class:"p-4 whitespace-nowrap"},Ui={class:"text-left"},$i={class:"p-4 whitespace-nowrap"},Xi={class:"text-left"},Hi={class:"p-4 whitespace-nowrap"},Vi={class:"text-left"},Bi={class:"p-4 whitespace-nowrap"},Gi={class:"flex flex-col items-center space-y-2"},qi=["onClick"],Qi={key:1,class:"flex justify-center items-center h-32"},Ki=d("div",{class:"w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"},null,-1),Ji=[Ki];function Zi(t,e,n,a,r,o){const i=An("font-awesome-icon");return U(),$("section",di,[d("div",vi,[d("div",hi,[gi,d("div",pi,[d("div",bi,[d("div",yi,[pt(d("input",{"onUpdate:modelValue":e[0]||(e[0]=s=>r.searchQuery=s),onInput:e[1]||(e[1]=(...s)=>o.performSearch&&o.performSearch(...s)),placeholder:"Search",class:"block w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"},null,544),[[Rt,r.searchQuery]]),pt(d("input",{type:"date","onUpdate:modelValue":e[2]||(e[2]=s=>r.startDate=s),class:"block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"},null,512),[[Rt,r.startDate]]),pt(d("input",{type:"date","onUpdate:modelValue":e[3]||(e[3]=s=>r.endDate=s),class:"block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"},null,512),[[Rt,r.endDate]]),pt(d("select",{"onUpdate:modelValue":e[4]||(e[4]=s=>r.selectedStatus=s),onChange:e[5]||(e[5]=(...s)=>o.performFilter&&o.performFilter(...s)),class:"px-2 py-1 border rounded-md focus:outline-none"},Si,544),[[Pn,r.selectedStatus]])]),d("button",{onClick:e[6]||(e[6]=(...s)=>o.clearFilters&&o.clearFilters(...s)),class:"px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none"}," Clear Filters ")]),d("div",Ai,[r.isLoading?(U(),$("div",Qi,Ji)):(U(),$("table",Pi,[_i,d("tbody",Mi,[(U(!0),$(he,null,ge(o.filteredPayments,(s,l)=>(U(),$("tr",{key:l},[d("td",Ci,[d("div",Ei,T(o.formatDate(s.created_at)),1)]),d("td",Oi,[d("div",Ti,T(s.eleve.prenom)+" "+T(s.eleve.nom),1)]),d("td",Ni,[d("div",Di,T(s.montant),1)]),d("td",Ii,[d("div",Li,T(s.avance),1)]),d("td",Fi,[d("div",zi,T(s.reste),1)]),d("td",Ri,[d("div",ji,T(s.mode),1)]),d("td",Yi,[d("div",{class:_n(o.getStatusClass(s))},T(s.status),3)]),d("td",Wi,[d("div",Ui,T(s.pending==1),1)]),d("td",$i,[d("div",Xi,[d("ul",null,[(U(!0),$(he,null,ge(s.services,f=>(U(),$("li",{key:f.id},T(f.service)+" - "+T(f.pivot.price),1))),128))])])]),d("td",Hi,[d("div",Vi,T(s.comment),1)]),d("td",Bi,[d("div",Gi,[d("button",{onClick:f=>o.printInvoice(s),class:"flex items-center justify-center px-4 py-2 rounded-md text-blue-500 bg-white hover:bg-blue-50 transition duration-300 focus:outline-none focus:ring focus:ring-blue-200"},[pe(i,{icon:["fas","print"],class:"h-5 w-5 mr-1"}),be(" Print ")],8,qi),s.reste!==0?(U(),$("button",{key:0,onClick:e[7]||(e[7]=(...f)=>o.navigateToPayer&&o.navigateToPayer(...f)),class:"flex items-center justify-center px-4 py-2 rounded-md text-green-500 bg-white hover:bg-green-50 transition duration-300 focus:outline-none focus:ring focus:ring-green-200"},[pe(i,{icon:["fas","dollar-sign"],class:"h-5 w-5 mr-1"}),be(" Pay ")])):Mn("",!0)])])]))),128))])]))])])])])])}const no=Sn(mi,[["render",Zi]]);export{no as default};
