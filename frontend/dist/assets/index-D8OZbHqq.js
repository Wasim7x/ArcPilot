(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const i of l)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(l){const i={};return l.integrity&&(i.integrity=l.integrity),l.referrerPolicy&&(i.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?i.credentials="include":l.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(l){if(l.ep)return;l.ep=!0;const i=t(l);fetch(l.href,i)}})();function ac(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Ys={exports:{}},il={},Xs={exports:{}},L={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Xt=Symbol.for("react.element"),uc=Symbol.for("react.portal"),cc=Symbol.for("react.fragment"),dc=Symbol.for("react.strict_mode"),fc=Symbol.for("react.profiler"),pc=Symbol.for("react.provider"),mc=Symbol.for("react.context"),gc=Symbol.for("react.forward_ref"),hc=Symbol.for("react.suspense"),vc=Symbol.for("react.memo"),yc=Symbol.for("react.lazy"),$o=Symbol.iterator;function xc(e){return e===null||typeof e!="object"?null:(e=$o&&e[$o]||e["@@iterator"],typeof e=="function"?e:null)}var Zs={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Js=Object.assign,ea={};function ct(e,n,t){this.props=e,this.context=n,this.refs=ea,this.updater=t||Zs}ct.prototype.isReactComponent={};ct.prototype.setState=function(e,n){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,n,"setState")};ct.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function na(){}na.prototype=ct.prototype;function Vi(e,n,t){this.props=e,this.context=n,this.refs=ea,this.updater=t||Zs}var Hi=Vi.prototype=new na;Hi.constructor=Vi;Js(Hi,ct.prototype);Hi.isPureReactComponent=!0;var qo=Array.isArray,ta=Object.prototype.hasOwnProperty,Qi={current:null},ra={key:!0,ref:!0,__self:!0,__source:!0};function la(e,n,t){var r,l={},i=null,o=null;if(n!=null)for(r in n.ref!==void 0&&(o=n.ref),n.key!==void 0&&(i=""+n.key),n)ta.call(n,r)&&!ra.hasOwnProperty(r)&&(l[r]=n[r]);var a=arguments.length-2;if(a===1)l.children=t;else if(1<a){for(var u=Array(a),d=0;d<a;d++)u[d]=arguments[d+2];l.children=u}if(e&&e.defaultProps)for(r in a=e.defaultProps,a)l[r]===void 0&&(l[r]=a[r]);return{$$typeof:Xt,type:e,key:i,ref:o,props:l,_owner:Qi.current}}function wc(e,n){return{$$typeof:Xt,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}function Gi(e){return typeof e=="object"&&e!==null&&e.$$typeof===Xt}function kc(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(t){return n[t]})}var Wo=/\/+/g;function _l(e,n){return typeof e=="object"&&e!==null&&e.key!=null?kc(""+e.key):n.toString(36)}function Sr(e,n,t,r,l){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case Xt:case uc:o=!0}}if(o)return o=e,l=l(o),e=r===""?"."+_l(o,0):r,qo(l)?(t="",e!=null&&(t=e.replace(Wo,"$&/")+"/"),Sr(l,n,t,"",function(d){return d})):l!=null&&(Gi(l)&&(l=wc(l,t+(!l.key||o&&o.key===l.key?"":(""+l.key).replace(Wo,"$&/")+"/")+e)),n.push(l)),1;if(o=0,r=r===""?".":r+":",qo(e))for(var a=0;a<e.length;a++){i=e[a];var u=r+_l(i,a);o+=Sr(i,n,t,u,l)}else if(u=xc(e),typeof u=="function")for(e=u.call(e),a=0;!(i=e.next()).done;)i=i.value,u=r+_l(i,a++),o+=Sr(i,n,t,u,l);else if(i==="object")throw n=String(e),Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.");return o}function ir(e,n,t){if(e==null)return e;var r=[],l=0;return Sr(e,r,"","",function(i){return n.call(t,i,l++)}),r}function Sc(e){if(e._status===-1){var n=e._result;n=n(),n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var ce={current:null},_r={transition:null},_c={ReactCurrentDispatcher:ce,ReactCurrentBatchConfig:_r,ReactCurrentOwner:Qi};function ia(){throw Error("act(...) is not supported in production builds of React.")}L.Children={map:ir,forEach:function(e,n,t){ir(e,function(){n.apply(this,arguments)},t)},count:function(e){var n=0;return ir(e,function(){n++}),n},toArray:function(e){return ir(e,function(n){return n})||[]},only:function(e){if(!Gi(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};L.Component=ct;L.Fragment=cc;L.Profiler=fc;L.PureComponent=Vi;L.StrictMode=dc;L.Suspense=hc;L.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=_c;L.act=ia;L.cloneElement=function(e,n,t){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Js({},e.props),l=e.key,i=e.ref,o=e._owner;if(n!=null){if(n.ref!==void 0&&(i=n.ref,o=Qi.current),n.key!==void 0&&(l=""+n.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(u in n)ta.call(n,u)&&!ra.hasOwnProperty(u)&&(r[u]=n[u]===void 0&&a!==void 0?a[u]:n[u])}var u=arguments.length-2;if(u===1)r.children=t;else if(1<u){a=Array(u);for(var d=0;d<u;d++)a[d]=arguments[d+2];r.children=a}return{$$typeof:Xt,type:e.type,key:l,ref:i,props:r,_owner:o}};L.createContext=function(e){return e={$$typeof:mc,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:pc,_context:e},e.Consumer=e};L.createElement=la;L.createFactory=function(e){var n=la.bind(null,e);return n.type=e,n};L.createRef=function(){return{current:null}};L.forwardRef=function(e){return{$$typeof:gc,render:e}};L.isValidElement=Gi;L.lazy=function(e){return{$$typeof:yc,_payload:{_status:-1,_result:e},_init:Sc}};L.memo=function(e,n){return{$$typeof:vc,type:e,compare:n===void 0?null:n}};L.startTransition=function(e){var n=_r.transition;_r.transition={};try{e()}finally{_r.transition=n}};L.unstable_act=ia;L.useCallback=function(e,n){return ce.current.useCallback(e,n)};L.useContext=function(e){return ce.current.useContext(e)};L.useDebugValue=function(){};L.useDeferredValue=function(e){return ce.current.useDeferredValue(e)};L.useEffect=function(e,n){return ce.current.useEffect(e,n)};L.useId=function(){return ce.current.useId()};L.useImperativeHandle=function(e,n,t){return ce.current.useImperativeHandle(e,n,t)};L.useInsertionEffect=function(e,n){return ce.current.useInsertionEffect(e,n)};L.useLayoutEffect=function(e,n){return ce.current.useLayoutEffect(e,n)};L.useMemo=function(e,n){return ce.current.useMemo(e,n)};L.useReducer=function(e,n,t){return ce.current.useReducer(e,n,t)};L.useRef=function(e){return ce.current.useRef(e)};L.useState=function(e){return ce.current.useState(e)};L.useSyncExternalStore=function(e,n,t){return ce.current.useSyncExternalStore(e,n,t)};L.useTransition=function(){return ce.current.useTransition()};L.version="18.3.1";Xs.exports=L;var R=Xs.exports;const Nc=ac(R);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var jc=R,Ec=Symbol.for("react.element"),Cc=Symbol.for("react.fragment"),bc=Object.prototype.hasOwnProperty,zc=jc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Pc={key:!0,ref:!0,__self:!0,__source:!0};function oa(e,n,t){var r,l={},i=null,o=null;t!==void 0&&(i=""+t),n.key!==void 0&&(i=""+n.key),n.ref!==void 0&&(o=n.ref);for(r in n)bc.call(n,r)&&!Pc.hasOwnProperty(r)&&(l[r]=n[r]);if(e&&e.defaultProps)for(r in n=e.defaultProps,n)l[r]===void 0&&(l[r]=n[r]);return{$$typeof:Ec,type:e,key:i,ref:o,props:l,_owner:zc.current}}il.Fragment=Cc;il.jsx=oa;il.jsxs=oa;Ys.exports=il;var s=Ys.exports,Zl={},sa={exports:{}},ke={},aa={exports:{}},ua={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function n(w,j){var b=w.length;w.push(j);e:for(;0<b;){var A=b-1>>>1,G=w[A];if(0<l(G,j))w[A]=j,w[b]=G,b=A;else break e}}function t(w){return w.length===0?null:w[0]}function r(w){if(w.length===0)return null;var j=w[0],b=w.pop();if(b!==j){w[0]=b;e:for(var A=0,G=w.length,rr=G>>>1;A<rr;){var Sn=2*(A+1)-1,Sl=w[Sn],_n=Sn+1,lr=w[_n];if(0>l(Sl,b))_n<G&&0>l(lr,Sl)?(w[A]=lr,w[_n]=b,A=_n):(w[A]=Sl,w[Sn]=b,A=Sn);else if(_n<G&&0>l(lr,b))w[A]=lr,w[_n]=b,A=_n;else break e}}return j}function l(w,j){var b=w.sortIndex-j.sortIndex;return b!==0?b:w.id-j.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var o=Date,a=o.now();e.unstable_now=function(){return o.now()-a}}var u=[],d=[],h=1,p=null,g=3,y=!1,k=!1,S=!1,T=typeof setTimeout=="function"?setTimeout:null,f=typeof clearTimeout=="function"?clearTimeout:null,c=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function m(w){for(var j=t(d);j!==null;){if(j.callback===null)r(d);else if(j.startTime<=w)r(d),j.sortIndex=j.expirationTime,n(u,j);else break;j=t(d)}}function v(w){if(S=!1,m(w),!k)if(t(u)!==null)k=!0,tr(_);else{var j=t(d);j!==null&&H(v,j.startTime-w)}}function _(w,j){k=!1,S&&(S=!1,f(z),z=-1),y=!0;var b=g;try{for(m(j),p=t(u);p!==null&&(!(p.expirationTime>j)||w&&!re());){var A=p.callback;if(typeof A=="function"){p.callback=null,g=p.priorityLevel;var G=A(p.expirationTime<=j);j=e.unstable_now(),typeof G=="function"?p.callback=G:p===t(u)&&r(u),m(j)}else r(u);p=t(u)}if(p!==null)var rr=!0;else{var Sn=t(d);Sn!==null&&H(v,Sn.startTime-j),rr=!1}return rr}finally{p=null,g=b,y=!1}}var E=!1,C=null,z=-1,M=5,P=-1;function re(){return!(e.unstable_now()-P<M)}function Ze(){if(C!==null){var w=e.unstable_now();P=w;var j=!0;try{j=C(!0,w)}finally{j?Je():(E=!1,C=null)}}else E=!1}var Je;if(typeof c=="function")Je=function(){c(Ze)};else if(typeof MessageChannel<"u"){var kl=new MessageChannel,Uo=kl.port2;kl.port1.onmessage=Ze,Je=function(){Uo.postMessage(null)}}else Je=function(){T(Ze,0)};function tr(w){C=w,E||(E=!0,Je())}function H(w,j){z=T(function(){w(e.unstable_now())},j)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(w){w.callback=null},e.unstable_continueExecution=function(){k||y||(k=!0,tr(_))},e.unstable_forceFrameRate=function(w){0>w||125<w?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):M=0<w?Math.floor(1e3/w):5},e.unstable_getCurrentPriorityLevel=function(){return g},e.unstable_getFirstCallbackNode=function(){return t(u)},e.unstable_next=function(w){switch(g){case 1:case 2:case 3:var j=3;break;default:j=g}var b=g;g=j;try{return w()}finally{g=b}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(w,j){switch(w){case 1:case 2:case 3:case 4:case 5:break;default:w=3}var b=g;g=w;try{return j()}finally{g=b}},e.unstable_scheduleCallback=function(w,j,b){var A=e.unstable_now();switch(typeof b=="object"&&b!==null?(b=b.delay,b=typeof b=="number"&&0<b?A+b:A):b=A,w){case 1:var G=-1;break;case 2:G=250;break;case 5:G=1073741823;break;case 4:G=1e4;break;default:G=5e3}return G=b+G,w={id:h++,callback:j,priorityLevel:w,startTime:b,expirationTime:G,sortIndex:-1},b>A?(w.sortIndex=b,n(d,w),t(u)===null&&w===t(d)&&(S?(f(z),z=-1):S=!0,H(v,b-A))):(w.sortIndex=G,n(u,w),k||y||(k=!0,tr(_))),w},e.unstable_shouldYield=re,e.unstable_wrapCallback=function(w){var j=g;return function(){var b=g;g=j;try{return w.apply(this,arguments)}finally{g=b}}}})(ua);aa.exports=ua;var Tc=aa.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Rc=R,we=Tc;function x(e){for(var n="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var ca=new Set,At={};function On(e,n){rt(e,n),rt(e+"Capture",n)}function rt(e,n){for(At[e]=n,e=0;e<n.length;e++)ca.add(n[e])}var Qe=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Jl=Object.prototype.hasOwnProperty,Lc=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Bo={},Vo={};function Ac(e){return Jl.call(Vo,e)?!0:Jl.call(Bo,e)?!1:Lc.test(e)?Vo[e]=!0:(Bo[e]=!0,!1)}function Dc(e,n,t,r){if(t!==null&&t.type===0)return!1;switch(typeof n){case"function":case"symbol":return!0;case"boolean":return r?!1:t!==null?!t.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Oc(e,n,t,r){if(n===null||typeof n>"u"||Dc(e,n,t,r))return!0;if(r)return!1;if(t!==null)switch(t.type){case 3:return!n;case 4:return n===!1;case 5:return isNaN(n);case 6:return isNaN(n)||1>n}return!1}function de(e,n,t,r,l,i,o){this.acceptsBooleans=n===2||n===3||n===4,this.attributeName=r,this.attributeNamespace=l,this.mustUseProperty=t,this.propertyName=e,this.type=n,this.sanitizeURL=i,this.removeEmptyString=o}var te={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){te[e]=new de(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var n=e[0];te[n]=new de(n,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){te[e]=new de(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){te[e]=new de(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){te[e]=new de(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){te[e]=new de(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){te[e]=new de(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){te[e]=new de(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){te[e]=new de(e,5,!1,e.toLowerCase(),null,!1,!1)});var Ki=/[\-:]([a-z])/g;function Yi(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var n=e.replace(Ki,Yi);te[n]=new de(n,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var n=e.replace(Ki,Yi);te[n]=new de(n,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var n=e.replace(Ki,Yi);te[n]=new de(n,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){te[e]=new de(e,1,!1,e.toLowerCase(),null,!1,!1)});te.xlinkHref=new de("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){te[e]=new de(e,1,!1,e.toLowerCase(),null,!0,!0)});function Xi(e,n,t,r){var l=te.hasOwnProperty(n)?te[n]:null;(l!==null?l.type!==0:r||!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(Oc(n,t,l,r)&&(t=null),r||l===null?Ac(n)&&(t===null?e.removeAttribute(n):e.setAttribute(n,""+t)):l.mustUseProperty?e[l.propertyName]=t===null?l.type===3?!1:"":t:(n=l.attributeName,r=l.attributeNamespace,t===null?e.removeAttribute(n):(l=l.type,t=l===3||l===4&&t===!0?"":""+t,r?e.setAttributeNS(r,n,t):e.setAttribute(n,t))))}var Xe=Rc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,or=Symbol.for("react.element"),Fn=Symbol.for("react.portal"),Un=Symbol.for("react.fragment"),Zi=Symbol.for("react.strict_mode"),ei=Symbol.for("react.profiler"),da=Symbol.for("react.provider"),fa=Symbol.for("react.context"),Ji=Symbol.for("react.forward_ref"),ni=Symbol.for("react.suspense"),ti=Symbol.for("react.suspense_list"),eo=Symbol.for("react.memo"),tn=Symbol.for("react.lazy"),pa=Symbol.for("react.offscreen"),Ho=Symbol.iterator;function pt(e){return e===null||typeof e!="object"?null:(e=Ho&&e[Ho]||e["@@iterator"],typeof e=="function"?e:null)}var B=Object.assign,Nl;function kt(e){if(Nl===void 0)try{throw Error()}catch(t){var n=t.stack.trim().match(/\n( *(at )?)/);Nl=n&&n[1]||""}return`
`+Nl+e}var jl=!1;function El(e,n){if(!e||jl)return"";jl=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(n)if(n=function(){throw Error()},Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(n,[])}catch(d){var r=d}Reflect.construct(e,[],n)}else{try{n.call()}catch(d){r=d}e.call(n.prototype)}else{try{throw Error()}catch(d){r=d}e()}}catch(d){if(d&&r&&typeof d.stack=="string"){for(var l=d.stack.split(`
`),i=r.stack.split(`
`),o=l.length-1,a=i.length-1;1<=o&&0<=a&&l[o]!==i[a];)a--;for(;1<=o&&0<=a;o--,a--)if(l[o]!==i[a]){if(o!==1||a!==1)do if(o--,a--,0>a||l[o]!==i[a]){var u=`
`+l[o].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=o&&0<=a);break}}}finally{jl=!1,Error.prepareStackTrace=t}return(e=e?e.displayName||e.name:"")?kt(e):""}function Mc(e){switch(e.tag){case 5:return kt(e.type);case 16:return kt("Lazy");case 13:return kt("Suspense");case 19:return kt("SuspenseList");case 0:case 2:case 15:return e=El(e.type,!1),e;case 11:return e=El(e.type.render,!1),e;case 1:return e=El(e.type,!0),e;default:return""}}function ri(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Un:return"Fragment";case Fn:return"Portal";case ei:return"Profiler";case Zi:return"StrictMode";case ni:return"Suspense";case ti:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case fa:return(e.displayName||"Context")+".Consumer";case da:return(e._context.displayName||"Context")+".Provider";case Ji:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case eo:return n=e.displayName||null,n!==null?n:ri(e.type)||"Memo";case tn:n=e._payload,e=e._init;try{return ri(e(n))}catch{}}return null}function Ic(e){var n=e.type;switch(e.tag){case 24:return"Cache";case 9:return(n.displayName||"Context")+".Consumer";case 10:return(n._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=n.render,e=e.displayName||e.name||"",n.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return n;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ri(n);case 8:return n===Zi?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n}return null}function vn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ma(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Fc(e){var n=ma(e)?"checked":"value",t=Object.getOwnPropertyDescriptor(e.constructor.prototype,n),r=""+e[n];if(!e.hasOwnProperty(n)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var l=t.get,i=t.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return l.call(this)},set:function(o){r=""+o,i.call(this,o)}}),Object.defineProperty(e,n,{enumerable:t.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function sr(e){e._valueTracker||(e._valueTracker=Fc(e))}function ga(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var t=n.getValue(),r="";return e&&(r=ma(e)?e.checked?"true":"false":e.value),e=r,e!==t?(n.setValue(e),!0):!1}function Dr(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function li(e,n){var t=n.checked;return B({},n,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??e._wrapperState.initialChecked})}function Qo(e,n){var t=n.defaultValue==null?"":n.defaultValue,r=n.checked!=null?n.checked:n.defaultChecked;t=vn(n.value!=null?n.value:t),e._wrapperState={initialChecked:r,initialValue:t,controlled:n.type==="checkbox"||n.type==="radio"?n.checked!=null:n.value!=null}}function ha(e,n){n=n.checked,n!=null&&Xi(e,"checked",n,!1)}function ii(e,n){ha(e,n);var t=vn(n.value),r=n.type;if(t!=null)r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+t):e.value!==""+t&&(e.value=""+t);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}n.hasOwnProperty("value")?oi(e,n.type,t):n.hasOwnProperty("defaultValue")&&oi(e,n.type,vn(n.defaultValue)),n.checked==null&&n.defaultChecked!=null&&(e.defaultChecked=!!n.defaultChecked)}function Go(e,n,t){if(n.hasOwnProperty("value")||n.hasOwnProperty("defaultValue")){var r=n.type;if(!(r!=="submit"&&r!=="reset"||n.value!==void 0&&n.value!==null))return;n=""+e._wrapperState.initialValue,t||n===e.value||(e.value=n),e.defaultValue=n}t=e.name,t!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,t!==""&&(e.name=t)}function oi(e,n,t){(n!=="number"||Dr(e.ownerDocument)!==e)&&(t==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+t&&(e.defaultValue=""+t))}var St=Array.isArray;function Xn(e,n,t,r){if(e=e.options,n){n={};for(var l=0;l<t.length;l++)n["$"+t[l]]=!0;for(t=0;t<e.length;t++)l=n.hasOwnProperty("$"+e[t].value),e[t].selected!==l&&(e[t].selected=l),l&&r&&(e[t].defaultSelected=!0)}else{for(t=""+vn(t),n=null,l=0;l<e.length;l++){if(e[l].value===t){e[l].selected=!0,r&&(e[l].defaultSelected=!0);return}n!==null||e[l].disabled||(n=e[l])}n!==null&&(n.selected=!0)}}function si(e,n){if(n.dangerouslySetInnerHTML!=null)throw Error(x(91));return B({},n,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Ko(e,n){var t=n.value;if(t==null){if(t=n.children,n=n.defaultValue,t!=null){if(n!=null)throw Error(x(92));if(St(t)){if(1<t.length)throw Error(x(93));t=t[0]}n=t}n==null&&(n=""),t=n}e._wrapperState={initialValue:vn(t)}}function va(e,n){var t=vn(n.value),r=vn(n.defaultValue);t!=null&&(t=""+t,t!==e.value&&(e.value=t),n.defaultValue==null&&e.defaultValue!==t&&(e.defaultValue=t)),r!=null&&(e.defaultValue=""+r)}function Yo(e){var n=e.textContent;n===e._wrapperState.initialValue&&n!==""&&n!==null&&(e.value=n)}function ya(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ai(e,n){return e==null||e==="http://www.w3.org/1999/xhtml"?ya(n):e==="http://www.w3.org/2000/svg"&&n==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var ar,xa=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(n,t,r,l){MSApp.execUnsafeLocalFunction(function(){return e(n,t,r,l)})}:e}(function(e,n){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=n;else{for(ar=ar||document.createElement("div"),ar.innerHTML="<svg>"+n.valueOf().toString()+"</svg>",n=ar.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;n.firstChild;)e.appendChild(n.firstChild)}});function Dt(e,n){if(n){var t=e.firstChild;if(t&&t===e.lastChild&&t.nodeType===3){t.nodeValue=n;return}}e.textContent=n}var jt={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Uc=["Webkit","ms","Moz","O"];Object.keys(jt).forEach(function(e){Uc.forEach(function(n){n=n+e.charAt(0).toUpperCase()+e.substring(1),jt[n]=jt[e]})});function wa(e,n,t){return n==null||typeof n=="boolean"||n===""?"":t||typeof n!="number"||n===0||jt.hasOwnProperty(e)&&jt[e]?(""+n).trim():n+"px"}function ka(e,n){e=e.style;for(var t in n)if(n.hasOwnProperty(t)){var r=t.indexOf("--")===0,l=wa(t,n[t],r);t==="float"&&(t="cssFloat"),r?e.setProperty(t,l):e[t]=l}}var $c=B({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ui(e,n){if(n){if($c[e]&&(n.children!=null||n.dangerouslySetInnerHTML!=null))throw Error(x(137,e));if(n.dangerouslySetInnerHTML!=null){if(n.children!=null)throw Error(x(60));if(typeof n.dangerouslySetInnerHTML!="object"||!("__html"in n.dangerouslySetInnerHTML))throw Error(x(61))}if(n.style!=null&&typeof n.style!="object")throw Error(x(62))}}function ci(e,n){if(e.indexOf("-")===-1)return typeof n.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var di=null;function no(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var fi=null,Zn=null,Jn=null;function Xo(e){if(e=er(e)){if(typeof fi!="function")throw Error(x(280));var n=e.stateNode;n&&(n=cl(n),fi(e.stateNode,e.type,n))}}function Sa(e){Zn?Jn?Jn.push(e):Jn=[e]:Zn=e}function _a(){if(Zn){var e=Zn,n=Jn;if(Jn=Zn=null,Xo(e),n)for(e=0;e<n.length;e++)Xo(n[e])}}function Na(e,n){return e(n)}function ja(){}var Cl=!1;function Ea(e,n,t){if(Cl)return e(n,t);Cl=!0;try{return Na(e,n,t)}finally{Cl=!1,(Zn!==null||Jn!==null)&&(ja(),_a())}}function Ot(e,n){var t=e.stateNode;if(t===null)return null;var r=cl(t);if(r===null)return null;t=r[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(t&&typeof t!="function")throw Error(x(231,n,typeof t));return t}var pi=!1;if(Qe)try{var mt={};Object.defineProperty(mt,"passive",{get:function(){pi=!0}}),window.addEventListener("test",mt,mt),window.removeEventListener("test",mt,mt)}catch{pi=!1}function qc(e,n,t,r,l,i,o,a,u){var d=Array.prototype.slice.call(arguments,3);try{n.apply(t,d)}catch(h){this.onError(h)}}var Et=!1,Or=null,Mr=!1,mi=null,Wc={onError:function(e){Et=!0,Or=e}};function Bc(e,n,t,r,l,i,o,a,u){Et=!1,Or=null,qc.apply(Wc,arguments)}function Vc(e,n,t,r,l,i,o,a,u){if(Bc.apply(this,arguments),Et){if(Et){var d=Or;Et=!1,Or=null}else throw Error(x(198));Mr||(Mr=!0,mi=d)}}function Mn(e){var n=e,t=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,n.flags&4098&&(t=n.return),e=n.return;while(e)}return n.tag===3?t:null}function Ca(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function Zo(e){if(Mn(e)!==e)throw Error(x(188))}function Hc(e){var n=e.alternate;if(!n){if(n=Mn(e),n===null)throw Error(x(188));return n!==e?null:e}for(var t=e,r=n;;){var l=t.return;if(l===null)break;var i=l.alternate;if(i===null){if(r=l.return,r!==null){t=r;continue}break}if(l.child===i.child){for(i=l.child;i;){if(i===t)return Zo(l),e;if(i===r)return Zo(l),n;i=i.sibling}throw Error(x(188))}if(t.return!==r.return)t=l,r=i;else{for(var o=!1,a=l.child;a;){if(a===t){o=!0,t=l,r=i;break}if(a===r){o=!0,r=l,t=i;break}a=a.sibling}if(!o){for(a=i.child;a;){if(a===t){o=!0,t=i,r=l;break}if(a===r){o=!0,r=i,t=l;break}a=a.sibling}if(!o)throw Error(x(189))}}if(t.alternate!==r)throw Error(x(190))}if(t.tag!==3)throw Error(x(188));return t.stateNode.current===t?e:n}function ba(e){return e=Hc(e),e!==null?za(e):null}function za(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var n=za(e);if(n!==null)return n;e=e.sibling}return null}var Pa=we.unstable_scheduleCallback,Jo=we.unstable_cancelCallback,Qc=we.unstable_shouldYield,Gc=we.unstable_requestPaint,Q=we.unstable_now,Kc=we.unstable_getCurrentPriorityLevel,to=we.unstable_ImmediatePriority,Ta=we.unstable_UserBlockingPriority,Ir=we.unstable_NormalPriority,Yc=we.unstable_LowPriority,Ra=we.unstable_IdlePriority,ol=null,Fe=null;function Xc(e){if(Fe&&typeof Fe.onCommitFiberRoot=="function")try{Fe.onCommitFiberRoot(ol,e,void 0,(e.current.flags&128)===128)}catch{}}var Le=Math.clz32?Math.clz32:ed,Zc=Math.log,Jc=Math.LN2;function ed(e){return e>>>=0,e===0?32:31-(Zc(e)/Jc|0)|0}var ur=64,cr=4194304;function _t(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Fr(e,n){var t=e.pendingLanes;if(t===0)return 0;var r=0,l=e.suspendedLanes,i=e.pingedLanes,o=t&268435455;if(o!==0){var a=o&~l;a!==0?r=_t(a):(i&=o,i!==0&&(r=_t(i)))}else o=t&~l,o!==0?r=_t(o):i!==0&&(r=_t(i));if(r===0)return 0;if(n!==0&&n!==r&&!(n&l)&&(l=r&-r,i=n&-n,l>=i||l===16&&(i&4194240)!==0))return n;if(r&4&&(r|=t&16),n=e.entangledLanes,n!==0)for(e=e.entanglements,n&=r;0<n;)t=31-Le(n),l=1<<t,r|=e[t],n&=~l;return r}function nd(e,n){switch(e){case 1:case 2:case 4:return n+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function td(e,n){for(var t=e.suspendedLanes,r=e.pingedLanes,l=e.expirationTimes,i=e.pendingLanes;0<i;){var o=31-Le(i),a=1<<o,u=l[o];u===-1?(!(a&t)||a&r)&&(l[o]=nd(a,n)):u<=n&&(e.expiredLanes|=a),i&=~a}}function gi(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function La(){var e=ur;return ur<<=1,!(ur&4194240)&&(ur=64),e}function bl(e){for(var n=[],t=0;31>t;t++)n.push(e);return n}function Zt(e,n,t){e.pendingLanes|=n,n!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,n=31-Le(n),e[n]=t}function rd(e,n){var t=e.pendingLanes&~n;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=n,e.mutableReadLanes&=n,e.entangledLanes&=n,n=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<t;){var l=31-Le(t),i=1<<l;n[l]=0,r[l]=-1,e[l]=-1,t&=~i}}function ro(e,n){var t=e.entangledLanes|=n;for(e=e.entanglements;t;){var r=31-Le(t),l=1<<r;l&n|e[r]&n&&(e[r]|=n),t&=~l}}var O=0;function Aa(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Da,lo,Oa,Ma,Ia,hi=!1,dr=[],un=null,cn=null,dn=null,Mt=new Map,It=new Map,ln=[],ld="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function es(e,n){switch(e){case"focusin":case"focusout":un=null;break;case"dragenter":case"dragleave":cn=null;break;case"mouseover":case"mouseout":dn=null;break;case"pointerover":case"pointerout":Mt.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":It.delete(n.pointerId)}}function gt(e,n,t,r,l,i){return e===null||e.nativeEvent!==i?(e={blockedOn:n,domEventName:t,eventSystemFlags:r,nativeEvent:i,targetContainers:[l]},n!==null&&(n=er(n),n!==null&&lo(n)),e):(e.eventSystemFlags|=r,n=e.targetContainers,l!==null&&n.indexOf(l)===-1&&n.push(l),e)}function id(e,n,t,r,l){switch(n){case"focusin":return un=gt(un,e,n,t,r,l),!0;case"dragenter":return cn=gt(cn,e,n,t,r,l),!0;case"mouseover":return dn=gt(dn,e,n,t,r,l),!0;case"pointerover":var i=l.pointerId;return Mt.set(i,gt(Mt.get(i)||null,e,n,t,r,l)),!0;case"gotpointercapture":return i=l.pointerId,It.set(i,gt(It.get(i)||null,e,n,t,r,l)),!0}return!1}function Fa(e){var n=En(e.target);if(n!==null){var t=Mn(n);if(t!==null){if(n=t.tag,n===13){if(n=Ca(t),n!==null){e.blockedOn=n,Ia(e.priority,function(){Oa(t)});return}}else if(n===3&&t.stateNode.current.memoizedState.isDehydrated){e.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Nr(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var t=vi(e.domEventName,e.eventSystemFlags,n[0],e.nativeEvent);if(t===null){t=e.nativeEvent;var r=new t.constructor(t.type,t);di=r,t.target.dispatchEvent(r),di=null}else return n=er(t),n!==null&&lo(n),e.blockedOn=t,!1;n.shift()}return!0}function ns(e,n,t){Nr(e)&&t.delete(n)}function od(){hi=!1,un!==null&&Nr(un)&&(un=null),cn!==null&&Nr(cn)&&(cn=null),dn!==null&&Nr(dn)&&(dn=null),Mt.forEach(ns),It.forEach(ns)}function ht(e,n){e.blockedOn===n&&(e.blockedOn=null,hi||(hi=!0,we.unstable_scheduleCallback(we.unstable_NormalPriority,od)))}function Ft(e){function n(l){return ht(l,e)}if(0<dr.length){ht(dr[0],e);for(var t=1;t<dr.length;t++){var r=dr[t];r.blockedOn===e&&(r.blockedOn=null)}}for(un!==null&&ht(un,e),cn!==null&&ht(cn,e),dn!==null&&ht(dn,e),Mt.forEach(n),It.forEach(n),t=0;t<ln.length;t++)r=ln[t],r.blockedOn===e&&(r.blockedOn=null);for(;0<ln.length&&(t=ln[0],t.blockedOn===null);)Fa(t),t.blockedOn===null&&ln.shift()}var et=Xe.ReactCurrentBatchConfig,Ur=!0;function sd(e,n,t,r){var l=O,i=et.transition;et.transition=null;try{O=1,io(e,n,t,r)}finally{O=l,et.transition=i}}function ad(e,n,t,r){var l=O,i=et.transition;et.transition=null;try{O=4,io(e,n,t,r)}finally{O=l,et.transition=i}}function io(e,n,t,r){if(Ur){var l=vi(e,n,t,r);if(l===null)Il(e,n,r,$r,t),es(e,r);else if(id(l,e,n,t,r))r.stopPropagation();else if(es(e,r),n&4&&-1<ld.indexOf(e)){for(;l!==null;){var i=er(l);if(i!==null&&Da(i),i=vi(e,n,t,r),i===null&&Il(e,n,r,$r,t),i===l)break;l=i}l!==null&&r.stopPropagation()}else Il(e,n,r,null,t)}}var $r=null;function vi(e,n,t,r){if($r=null,e=no(r),e=En(e),e!==null)if(n=Mn(e),n===null)e=null;else if(t=n.tag,t===13){if(e=Ca(n),e!==null)return e;e=null}else if(t===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null);return $r=e,null}function Ua(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Kc()){case to:return 1;case Ta:return 4;case Ir:case Yc:return 16;case Ra:return 536870912;default:return 16}default:return 16}}var sn=null,oo=null,jr=null;function $a(){if(jr)return jr;var e,n=oo,t=n.length,r,l="value"in sn?sn.value:sn.textContent,i=l.length;for(e=0;e<t&&n[e]===l[e];e++);var o=t-e;for(r=1;r<=o&&n[t-r]===l[i-r];r++);return jr=l.slice(e,1<r?1-r:void 0)}function Er(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function fr(){return!0}function ts(){return!1}function Se(e){function n(t,r,l,i,o){this._reactName=t,this._targetInst=l,this.type=r,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(t=e[a],this[a]=t?t(i):i[a]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?fr:ts,this.isPropagationStopped=ts,this}return B(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=fr)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=fr)},persist:function(){},isPersistent:fr}),n}var dt={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},so=Se(dt),Jt=B({},dt,{view:0,detail:0}),ud=Se(Jt),zl,Pl,vt,sl=B({},Jt,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ao,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==vt&&(vt&&e.type==="mousemove"?(zl=e.screenX-vt.screenX,Pl=e.screenY-vt.screenY):Pl=zl=0,vt=e),zl)},movementY:function(e){return"movementY"in e?e.movementY:Pl}}),rs=Se(sl),cd=B({},sl,{dataTransfer:0}),dd=Se(cd),fd=B({},Jt,{relatedTarget:0}),Tl=Se(fd),pd=B({},dt,{animationName:0,elapsedTime:0,pseudoElement:0}),md=Se(pd),gd=B({},dt,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),hd=Se(gd),vd=B({},dt,{data:0}),ls=Se(vd),yd={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},xd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},wd={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function kd(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=wd[e])?!!n[e]:!1}function ao(){return kd}var Sd=B({},Jt,{key:function(e){if(e.key){var n=yd[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Er(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?xd[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ao,charCode:function(e){return e.type==="keypress"?Er(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Er(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),_d=Se(Sd),Nd=B({},sl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),is=Se(Nd),jd=B({},Jt,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ao}),Ed=Se(jd),Cd=B({},dt,{propertyName:0,elapsedTime:0,pseudoElement:0}),bd=Se(Cd),zd=B({},sl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Pd=Se(zd),Td=[9,13,27,32],uo=Qe&&"CompositionEvent"in window,Ct=null;Qe&&"documentMode"in document&&(Ct=document.documentMode);var Rd=Qe&&"TextEvent"in window&&!Ct,qa=Qe&&(!uo||Ct&&8<Ct&&11>=Ct),os=" ",ss=!1;function Wa(e,n){switch(e){case"keyup":return Td.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Ba(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var $n=!1;function Ld(e,n){switch(e){case"compositionend":return Ba(n);case"keypress":return n.which!==32?null:(ss=!0,os);case"textInput":return e=n.data,e===os&&ss?null:e;default:return null}}function Ad(e,n){if($n)return e==="compositionend"||!uo&&Wa(e,n)?(e=$a(),jr=oo=sn=null,$n=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return qa&&n.locale!=="ko"?null:n.data;default:return null}}var Dd={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function as(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!Dd[e.type]:n==="textarea"}function Va(e,n,t,r){Sa(r),n=qr(n,"onChange"),0<n.length&&(t=new so("onChange","change",null,t,r),e.push({event:t,listeners:n}))}var bt=null,Ut=null;function Od(e){tu(e,0)}function al(e){var n=Bn(e);if(ga(n))return e}function Md(e,n){if(e==="change")return n}var Ha=!1;if(Qe){var Rl;if(Qe){var Ll="oninput"in document;if(!Ll){var us=document.createElement("div");us.setAttribute("oninput","return;"),Ll=typeof us.oninput=="function"}Rl=Ll}else Rl=!1;Ha=Rl&&(!document.documentMode||9<document.documentMode)}function cs(){bt&&(bt.detachEvent("onpropertychange",Qa),Ut=bt=null)}function Qa(e){if(e.propertyName==="value"&&al(Ut)){var n=[];Va(n,Ut,e,no(e)),Ea(Od,n)}}function Id(e,n,t){e==="focusin"?(cs(),bt=n,Ut=t,bt.attachEvent("onpropertychange",Qa)):e==="focusout"&&cs()}function Fd(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return al(Ut)}function Ud(e,n){if(e==="click")return al(n)}function $d(e,n){if(e==="input"||e==="change")return al(n)}function qd(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var De=typeof Object.is=="function"?Object.is:qd;function $t(e,n){if(De(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var t=Object.keys(e),r=Object.keys(n);if(t.length!==r.length)return!1;for(r=0;r<t.length;r++){var l=t[r];if(!Jl.call(n,l)||!De(e[l],n[l]))return!1}return!0}function ds(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function fs(e,n){var t=ds(e);e=0;for(var r;t;){if(t.nodeType===3){if(r=e+t.textContent.length,e<=n&&r>=n)return{node:t,offset:n-e};e=r}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=ds(t)}}function Ga(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?Ga(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function Ka(){for(var e=window,n=Dr();n instanceof e.HTMLIFrameElement;){try{var t=typeof n.contentWindow.location.href=="string"}catch{t=!1}if(t)e=n.contentWindow;else break;n=Dr(e.document)}return n}function co(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}function Wd(e){var n=Ka(),t=e.focusedElem,r=e.selectionRange;if(n!==t&&t&&t.ownerDocument&&Ga(t.ownerDocument.documentElement,t)){if(r!==null&&co(t)){if(n=r.start,e=r.end,e===void 0&&(e=n),"selectionStart"in t)t.selectionStart=n,t.selectionEnd=Math.min(e,t.value.length);else if(e=(n=t.ownerDocument||document)&&n.defaultView||window,e.getSelection){e=e.getSelection();var l=t.textContent.length,i=Math.min(r.start,l);r=r.end===void 0?i:Math.min(r.end,l),!e.extend&&i>r&&(l=r,r=i,i=l),l=fs(t,i);var o=fs(t,r);l&&o&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(n=n.createRange(),n.setStart(l.node,l.offset),e.removeAllRanges(),i>r?(e.addRange(n),e.extend(o.node,o.offset)):(n.setEnd(o.node,o.offset),e.addRange(n)))}}for(n=[],e=t;e=e.parentNode;)e.nodeType===1&&n.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<n.length;t++)e=n[t],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Bd=Qe&&"documentMode"in document&&11>=document.documentMode,qn=null,yi=null,zt=null,xi=!1;function ps(e,n,t){var r=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;xi||qn==null||qn!==Dr(r)||(r=qn,"selectionStart"in r&&co(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),zt&&$t(zt,r)||(zt=r,r=qr(yi,"onSelect"),0<r.length&&(n=new so("onSelect","select",null,n,t),e.push({event:n,listeners:r}),n.target=qn)))}function pr(e,n){var t={};return t[e.toLowerCase()]=n.toLowerCase(),t["Webkit"+e]="webkit"+n,t["Moz"+e]="moz"+n,t}var Wn={animationend:pr("Animation","AnimationEnd"),animationiteration:pr("Animation","AnimationIteration"),animationstart:pr("Animation","AnimationStart"),transitionend:pr("Transition","TransitionEnd")},Al={},Ya={};Qe&&(Ya=document.createElement("div").style,"AnimationEvent"in window||(delete Wn.animationend.animation,delete Wn.animationiteration.animation,delete Wn.animationstart.animation),"TransitionEvent"in window||delete Wn.transitionend.transition);function ul(e){if(Al[e])return Al[e];if(!Wn[e])return e;var n=Wn[e],t;for(t in n)if(n.hasOwnProperty(t)&&t in Ya)return Al[e]=n[t];return e}var Xa=ul("animationend"),Za=ul("animationiteration"),Ja=ul("animationstart"),eu=ul("transitionend"),nu=new Map,ms="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function xn(e,n){nu.set(e,n),On(n,[e])}for(var Dl=0;Dl<ms.length;Dl++){var Ol=ms[Dl],Vd=Ol.toLowerCase(),Hd=Ol[0].toUpperCase()+Ol.slice(1);xn(Vd,"on"+Hd)}xn(Xa,"onAnimationEnd");xn(Za,"onAnimationIteration");xn(Ja,"onAnimationStart");xn("dblclick","onDoubleClick");xn("focusin","onFocus");xn("focusout","onBlur");xn(eu,"onTransitionEnd");rt("onMouseEnter",["mouseout","mouseover"]);rt("onMouseLeave",["mouseout","mouseover"]);rt("onPointerEnter",["pointerout","pointerover"]);rt("onPointerLeave",["pointerout","pointerover"]);On("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));On("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));On("onBeforeInput",["compositionend","keypress","textInput","paste"]);On("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));On("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));On("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Nt="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Qd=new Set("cancel close invalid load scroll toggle".split(" ").concat(Nt));function gs(e,n,t){var r=e.type||"unknown-event";e.currentTarget=t,Vc(r,n,void 0,e),e.currentTarget=null}function tu(e,n){n=(n&4)!==0;for(var t=0;t<e.length;t++){var r=e[t],l=r.event;r=r.listeners;e:{var i=void 0;if(n)for(var o=r.length-1;0<=o;o--){var a=r[o],u=a.instance,d=a.currentTarget;if(a=a.listener,u!==i&&l.isPropagationStopped())break e;gs(l,a,d),i=u}else for(o=0;o<r.length;o++){if(a=r[o],u=a.instance,d=a.currentTarget,a=a.listener,u!==i&&l.isPropagationStopped())break e;gs(l,a,d),i=u}}}if(Mr)throw e=mi,Mr=!1,mi=null,e}function F(e,n){var t=n[Ni];t===void 0&&(t=n[Ni]=new Set);var r=e+"__bubble";t.has(r)||(ru(n,e,2,!1),t.add(r))}function Ml(e,n,t){var r=0;n&&(r|=4),ru(t,e,r,n)}var mr="_reactListening"+Math.random().toString(36).slice(2);function qt(e){if(!e[mr]){e[mr]=!0,ca.forEach(function(t){t!=="selectionchange"&&(Qd.has(t)||Ml(t,!1,e),Ml(t,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[mr]||(n[mr]=!0,Ml("selectionchange",!1,n))}}function ru(e,n,t,r){switch(Ua(n)){case 1:var l=sd;break;case 4:l=ad;break;default:l=io}t=l.bind(null,n,t,e),l=void 0,!pi||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(l=!0),r?l!==void 0?e.addEventListener(n,t,{capture:!0,passive:l}):e.addEventListener(n,t,!0):l!==void 0?e.addEventListener(n,t,{passive:l}):e.addEventListener(n,t,!1)}function Il(e,n,t,r,l){var i=r;if(!(n&1)&&!(n&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var a=r.stateNode.containerInfo;if(a===l||a.nodeType===8&&a.parentNode===l)break;if(o===4)for(o=r.return;o!==null;){var u=o.tag;if((u===3||u===4)&&(u=o.stateNode.containerInfo,u===l||u.nodeType===8&&u.parentNode===l))return;o=o.return}for(;a!==null;){if(o=En(a),o===null)return;if(u=o.tag,u===5||u===6){r=i=o;continue e}a=a.parentNode}}r=r.return}Ea(function(){var d=i,h=no(t),p=[];e:{var g=nu.get(e);if(g!==void 0){var y=so,k=e;switch(e){case"keypress":if(Er(t)===0)break e;case"keydown":case"keyup":y=_d;break;case"focusin":k="focus",y=Tl;break;case"focusout":k="blur",y=Tl;break;case"beforeblur":case"afterblur":y=Tl;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=rs;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=dd;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=Ed;break;case Xa:case Za:case Ja:y=md;break;case eu:y=bd;break;case"scroll":y=ud;break;case"wheel":y=Pd;break;case"copy":case"cut":case"paste":y=hd;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=is}var S=(n&4)!==0,T=!S&&e==="scroll",f=S?g!==null?g+"Capture":null:g;S=[];for(var c=d,m;c!==null;){m=c;var v=m.stateNode;if(m.tag===5&&v!==null&&(m=v,f!==null&&(v=Ot(c,f),v!=null&&S.push(Wt(c,v,m)))),T)break;c=c.return}0<S.length&&(g=new y(g,k,null,t,h),p.push({event:g,listeners:S}))}}if(!(n&7)){e:{if(g=e==="mouseover"||e==="pointerover",y=e==="mouseout"||e==="pointerout",g&&t!==di&&(k=t.relatedTarget||t.fromElement)&&(En(k)||k[Ge]))break e;if((y||g)&&(g=h.window===h?h:(g=h.ownerDocument)?g.defaultView||g.parentWindow:window,y?(k=t.relatedTarget||t.toElement,y=d,k=k?En(k):null,k!==null&&(T=Mn(k),k!==T||k.tag!==5&&k.tag!==6)&&(k=null)):(y=null,k=d),y!==k)){if(S=rs,v="onMouseLeave",f="onMouseEnter",c="mouse",(e==="pointerout"||e==="pointerover")&&(S=is,v="onPointerLeave",f="onPointerEnter",c="pointer"),T=y==null?g:Bn(y),m=k==null?g:Bn(k),g=new S(v,c+"leave",y,t,h),g.target=T,g.relatedTarget=m,v=null,En(h)===d&&(S=new S(f,c+"enter",k,t,h),S.target=m,S.relatedTarget=T,v=S),T=v,y&&k)n:{for(S=y,f=k,c=0,m=S;m;m=In(m))c++;for(m=0,v=f;v;v=In(v))m++;for(;0<c-m;)S=In(S),c--;for(;0<m-c;)f=In(f),m--;for(;c--;){if(S===f||f!==null&&S===f.alternate)break n;S=In(S),f=In(f)}S=null}else S=null;y!==null&&hs(p,g,y,S,!1),k!==null&&T!==null&&hs(p,T,k,S,!0)}}e:{if(g=d?Bn(d):window,y=g.nodeName&&g.nodeName.toLowerCase(),y==="select"||y==="input"&&g.type==="file")var _=Md;else if(as(g))if(Ha)_=$d;else{_=Fd;var E=Id}else(y=g.nodeName)&&y.toLowerCase()==="input"&&(g.type==="checkbox"||g.type==="radio")&&(_=Ud);if(_&&(_=_(e,d))){Va(p,_,t,h);break e}E&&E(e,g,d),e==="focusout"&&(E=g._wrapperState)&&E.controlled&&g.type==="number"&&oi(g,"number",g.value)}switch(E=d?Bn(d):window,e){case"focusin":(as(E)||E.contentEditable==="true")&&(qn=E,yi=d,zt=null);break;case"focusout":zt=yi=qn=null;break;case"mousedown":xi=!0;break;case"contextmenu":case"mouseup":case"dragend":xi=!1,ps(p,t,h);break;case"selectionchange":if(Bd)break;case"keydown":case"keyup":ps(p,t,h)}var C;if(uo)e:{switch(e){case"compositionstart":var z="onCompositionStart";break e;case"compositionend":z="onCompositionEnd";break e;case"compositionupdate":z="onCompositionUpdate";break e}z=void 0}else $n?Wa(e,t)&&(z="onCompositionEnd"):e==="keydown"&&t.keyCode===229&&(z="onCompositionStart");z&&(qa&&t.locale!=="ko"&&($n||z!=="onCompositionStart"?z==="onCompositionEnd"&&$n&&(C=$a()):(sn=h,oo="value"in sn?sn.value:sn.textContent,$n=!0)),E=qr(d,z),0<E.length&&(z=new ls(z,e,null,t,h),p.push({event:z,listeners:E}),C?z.data=C:(C=Ba(t),C!==null&&(z.data=C)))),(C=Rd?Ld(e,t):Ad(e,t))&&(d=qr(d,"onBeforeInput"),0<d.length&&(h=new ls("onBeforeInput","beforeinput",null,t,h),p.push({event:h,listeners:d}),h.data=C))}tu(p,n)})}function Wt(e,n,t){return{instance:e,listener:n,currentTarget:t}}function qr(e,n){for(var t=n+"Capture",r=[];e!==null;){var l=e,i=l.stateNode;l.tag===5&&i!==null&&(l=i,i=Ot(e,t),i!=null&&r.unshift(Wt(e,i,l)),i=Ot(e,n),i!=null&&r.push(Wt(e,i,l))),e=e.return}return r}function In(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function hs(e,n,t,r,l){for(var i=n._reactName,o=[];t!==null&&t!==r;){var a=t,u=a.alternate,d=a.stateNode;if(u!==null&&u===r)break;a.tag===5&&d!==null&&(a=d,l?(u=Ot(t,i),u!=null&&o.unshift(Wt(t,u,a))):l||(u=Ot(t,i),u!=null&&o.push(Wt(t,u,a)))),t=t.return}o.length!==0&&e.push({event:n,listeners:o})}var Gd=/\r\n?/g,Kd=/\u0000|\uFFFD/g;function vs(e){return(typeof e=="string"?e:""+e).replace(Gd,`
`).replace(Kd,"")}function gr(e,n,t){if(n=vs(n),vs(e)!==n&&t)throw Error(x(425))}function Wr(){}var wi=null,ki=null;function Si(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var _i=typeof setTimeout=="function"?setTimeout:void 0,Yd=typeof clearTimeout=="function"?clearTimeout:void 0,ys=typeof Promise=="function"?Promise:void 0,Xd=typeof queueMicrotask=="function"?queueMicrotask:typeof ys<"u"?function(e){return ys.resolve(null).then(e).catch(Zd)}:_i;function Zd(e){setTimeout(function(){throw e})}function Fl(e,n){var t=n,r=0;do{var l=t.nextSibling;if(e.removeChild(t),l&&l.nodeType===8)if(t=l.data,t==="/$"){if(r===0){e.removeChild(l),Ft(n);return}r--}else t!=="$"&&t!=="$?"&&t!=="$!"||r++;t=l}while(t);Ft(n)}function fn(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?")break;if(n==="/$")return null}}return e}function xs(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="$"||t==="$!"||t==="$?"){if(n===0)return e;n--}else t==="/$"&&n++}e=e.previousSibling}return null}var ft=Math.random().toString(36).slice(2),Ie="__reactFiber$"+ft,Bt="__reactProps$"+ft,Ge="__reactContainer$"+ft,Ni="__reactEvents$"+ft,Jd="__reactListeners$"+ft,ef="__reactHandles$"+ft;function En(e){var n=e[Ie];if(n)return n;for(var t=e.parentNode;t;){if(n=t[Ge]||t[Ie]){if(t=n.alternate,n.child!==null||t!==null&&t.child!==null)for(e=xs(e);e!==null;){if(t=e[Ie])return t;e=xs(e)}return n}e=t,t=e.parentNode}return null}function er(e){return e=e[Ie]||e[Ge],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Bn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(x(33))}function cl(e){return e[Bt]||null}var ji=[],Vn=-1;function wn(e){return{current:e}}function U(e){0>Vn||(e.current=ji[Vn],ji[Vn]=null,Vn--)}function I(e,n){Vn++,ji[Vn]=e.current,e.current=n}var yn={},se=wn(yn),me=wn(!1),Tn=yn;function lt(e,n){var t=e.type.contextTypes;if(!t)return yn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===n)return r.__reactInternalMemoizedMaskedChildContext;var l={},i;for(i in t)l[i]=n[i];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=n,e.__reactInternalMemoizedMaskedChildContext=l),l}function ge(e){return e=e.childContextTypes,e!=null}function Br(){U(me),U(se)}function ws(e,n,t){if(se.current!==yn)throw Error(x(168));I(se,n),I(me,t)}function lu(e,n,t){var r=e.stateNode;if(n=n.childContextTypes,typeof r.getChildContext!="function")return t;r=r.getChildContext();for(var l in r)if(!(l in n))throw Error(x(108,Ic(e)||"Unknown",l));return B({},t,r)}function Vr(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||yn,Tn=se.current,I(se,e),I(me,me.current),!0}function ks(e,n,t){var r=e.stateNode;if(!r)throw Error(x(169));t?(e=lu(e,n,Tn),r.__reactInternalMemoizedMergedChildContext=e,U(me),U(se),I(se,e)):U(me),I(me,t)}var We=null,dl=!1,Ul=!1;function iu(e){We===null?We=[e]:We.push(e)}function nf(e){dl=!0,iu(e)}function kn(){if(!Ul&&We!==null){Ul=!0;var e=0,n=O;try{var t=We;for(O=1;e<t.length;e++){var r=t[e];do r=r(!0);while(r!==null)}We=null,dl=!1}catch(l){throw We!==null&&(We=We.slice(e+1)),Pa(to,kn),l}finally{O=n,Ul=!1}}return null}var Hn=[],Qn=0,Hr=null,Qr=0,_e=[],Ne=0,Rn=null,Be=1,Ve="";function Nn(e,n){Hn[Qn++]=Qr,Hn[Qn++]=Hr,Hr=e,Qr=n}function ou(e,n,t){_e[Ne++]=Be,_e[Ne++]=Ve,_e[Ne++]=Rn,Rn=e;var r=Be;e=Ve;var l=32-Le(r)-1;r&=~(1<<l),t+=1;var i=32-Le(n)+l;if(30<i){var o=l-l%5;i=(r&(1<<o)-1).toString(32),r>>=o,l-=o,Be=1<<32-Le(n)+l|t<<l|r,Ve=i+e}else Be=1<<i|t<<l|r,Ve=e}function fo(e){e.return!==null&&(Nn(e,1),ou(e,1,0))}function po(e){for(;e===Hr;)Hr=Hn[--Qn],Hn[Qn]=null,Qr=Hn[--Qn],Hn[Qn]=null;for(;e===Rn;)Rn=_e[--Ne],_e[Ne]=null,Ve=_e[--Ne],_e[Ne]=null,Be=_e[--Ne],_e[Ne]=null}var xe=null,ye=null,$=!1,Re=null;function su(e,n){var t=je(5,null,null,0);t.elementType="DELETED",t.stateNode=n,t.return=e,n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)}function Ss(e,n){switch(e.tag){case 5:var t=e.type;return n=n.nodeType!==1||t.toLowerCase()!==n.nodeName.toLowerCase()?null:n,n!==null?(e.stateNode=n,xe=e,ye=fn(n.firstChild),!0):!1;case 6:return n=e.pendingProps===""||n.nodeType!==3?null:n,n!==null?(e.stateNode=n,xe=e,ye=null,!0):!1;case 13:return n=n.nodeType!==8?null:n,n!==null?(t=Rn!==null?{id:Be,overflow:Ve}:null,e.memoizedState={dehydrated:n,treeContext:t,retryLane:1073741824},t=je(18,null,null,0),t.stateNode=n,t.return=e,e.child=t,xe=e,ye=null,!0):!1;default:return!1}}function Ei(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Ci(e){if($){var n=ye;if(n){var t=n;if(!Ss(e,n)){if(Ei(e))throw Error(x(418));n=fn(t.nextSibling);var r=xe;n&&Ss(e,n)?su(r,t):(e.flags=e.flags&-4097|2,$=!1,xe=e)}}else{if(Ei(e))throw Error(x(418));e.flags=e.flags&-4097|2,$=!1,xe=e}}}function _s(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;xe=e}function hr(e){if(e!==xe)return!1;if(!$)return _s(e),$=!0,!1;var n;if((n=e.tag!==3)&&!(n=e.tag!==5)&&(n=e.type,n=n!=="head"&&n!=="body"&&!Si(e.type,e.memoizedProps)),n&&(n=ye)){if(Ei(e))throw au(),Error(x(418));for(;n;)su(e,n),n=fn(n.nextSibling)}if(_s(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(x(317));e:{for(e=e.nextSibling,n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="/$"){if(n===0){ye=fn(e.nextSibling);break e}n--}else t!=="$"&&t!=="$!"&&t!=="$?"||n++}e=e.nextSibling}ye=null}}else ye=xe?fn(e.stateNode.nextSibling):null;return!0}function au(){for(var e=ye;e;)e=fn(e.nextSibling)}function it(){ye=xe=null,$=!1}function mo(e){Re===null?Re=[e]:Re.push(e)}var tf=Xe.ReactCurrentBatchConfig;function yt(e,n,t){if(e=t.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(x(309));var r=t.stateNode}if(!r)throw Error(x(147,e));var l=r,i=""+e;return n!==null&&n.ref!==null&&typeof n.ref=="function"&&n.ref._stringRef===i?n.ref:(n=function(o){var a=l.refs;o===null?delete a[i]:a[i]=o},n._stringRef=i,n)}if(typeof e!="string")throw Error(x(284));if(!t._owner)throw Error(x(290,e))}return e}function vr(e,n){throw e=Object.prototype.toString.call(n),Error(x(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e))}function Ns(e){var n=e._init;return n(e._payload)}function uu(e){function n(f,c){if(e){var m=f.deletions;m===null?(f.deletions=[c],f.flags|=16):m.push(c)}}function t(f,c){if(!e)return null;for(;c!==null;)n(f,c),c=c.sibling;return null}function r(f,c){for(f=new Map;c!==null;)c.key!==null?f.set(c.key,c):f.set(c.index,c),c=c.sibling;return f}function l(f,c){return f=hn(f,c),f.index=0,f.sibling=null,f}function i(f,c,m){return f.index=m,e?(m=f.alternate,m!==null?(m=m.index,m<c?(f.flags|=2,c):m):(f.flags|=2,c)):(f.flags|=1048576,c)}function o(f){return e&&f.alternate===null&&(f.flags|=2),f}function a(f,c,m,v){return c===null||c.tag!==6?(c=Ql(m,f.mode,v),c.return=f,c):(c=l(c,m),c.return=f,c)}function u(f,c,m,v){var _=m.type;return _===Un?h(f,c,m.props.children,v,m.key):c!==null&&(c.elementType===_||typeof _=="object"&&_!==null&&_.$$typeof===tn&&Ns(_)===c.type)?(v=l(c,m.props),v.ref=yt(f,c,m),v.return=f,v):(v=Lr(m.type,m.key,m.props,null,f.mode,v),v.ref=yt(f,c,m),v.return=f,v)}function d(f,c,m,v){return c===null||c.tag!==4||c.stateNode.containerInfo!==m.containerInfo||c.stateNode.implementation!==m.implementation?(c=Gl(m,f.mode,v),c.return=f,c):(c=l(c,m.children||[]),c.return=f,c)}function h(f,c,m,v,_){return c===null||c.tag!==7?(c=Pn(m,f.mode,v,_),c.return=f,c):(c=l(c,m),c.return=f,c)}function p(f,c,m){if(typeof c=="string"&&c!==""||typeof c=="number")return c=Ql(""+c,f.mode,m),c.return=f,c;if(typeof c=="object"&&c!==null){switch(c.$$typeof){case or:return m=Lr(c.type,c.key,c.props,null,f.mode,m),m.ref=yt(f,null,c),m.return=f,m;case Fn:return c=Gl(c,f.mode,m),c.return=f,c;case tn:var v=c._init;return p(f,v(c._payload),m)}if(St(c)||pt(c))return c=Pn(c,f.mode,m,null),c.return=f,c;vr(f,c)}return null}function g(f,c,m,v){var _=c!==null?c.key:null;if(typeof m=="string"&&m!==""||typeof m=="number")return _!==null?null:a(f,c,""+m,v);if(typeof m=="object"&&m!==null){switch(m.$$typeof){case or:return m.key===_?u(f,c,m,v):null;case Fn:return m.key===_?d(f,c,m,v):null;case tn:return _=m._init,g(f,c,_(m._payload),v)}if(St(m)||pt(m))return _!==null?null:h(f,c,m,v,null);vr(f,m)}return null}function y(f,c,m,v,_){if(typeof v=="string"&&v!==""||typeof v=="number")return f=f.get(m)||null,a(c,f,""+v,_);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case or:return f=f.get(v.key===null?m:v.key)||null,u(c,f,v,_);case Fn:return f=f.get(v.key===null?m:v.key)||null,d(c,f,v,_);case tn:var E=v._init;return y(f,c,m,E(v._payload),_)}if(St(v)||pt(v))return f=f.get(m)||null,h(c,f,v,_,null);vr(c,v)}return null}function k(f,c,m,v){for(var _=null,E=null,C=c,z=c=0,M=null;C!==null&&z<m.length;z++){C.index>z?(M=C,C=null):M=C.sibling;var P=g(f,C,m[z],v);if(P===null){C===null&&(C=M);break}e&&C&&P.alternate===null&&n(f,C),c=i(P,c,z),E===null?_=P:E.sibling=P,E=P,C=M}if(z===m.length)return t(f,C),$&&Nn(f,z),_;if(C===null){for(;z<m.length;z++)C=p(f,m[z],v),C!==null&&(c=i(C,c,z),E===null?_=C:E.sibling=C,E=C);return $&&Nn(f,z),_}for(C=r(f,C);z<m.length;z++)M=y(C,f,z,m[z],v),M!==null&&(e&&M.alternate!==null&&C.delete(M.key===null?z:M.key),c=i(M,c,z),E===null?_=M:E.sibling=M,E=M);return e&&C.forEach(function(re){return n(f,re)}),$&&Nn(f,z),_}function S(f,c,m,v){var _=pt(m);if(typeof _!="function")throw Error(x(150));if(m=_.call(m),m==null)throw Error(x(151));for(var E=_=null,C=c,z=c=0,M=null,P=m.next();C!==null&&!P.done;z++,P=m.next()){C.index>z?(M=C,C=null):M=C.sibling;var re=g(f,C,P.value,v);if(re===null){C===null&&(C=M);break}e&&C&&re.alternate===null&&n(f,C),c=i(re,c,z),E===null?_=re:E.sibling=re,E=re,C=M}if(P.done)return t(f,C),$&&Nn(f,z),_;if(C===null){for(;!P.done;z++,P=m.next())P=p(f,P.value,v),P!==null&&(c=i(P,c,z),E===null?_=P:E.sibling=P,E=P);return $&&Nn(f,z),_}for(C=r(f,C);!P.done;z++,P=m.next())P=y(C,f,z,P.value,v),P!==null&&(e&&P.alternate!==null&&C.delete(P.key===null?z:P.key),c=i(P,c,z),E===null?_=P:E.sibling=P,E=P);return e&&C.forEach(function(Ze){return n(f,Ze)}),$&&Nn(f,z),_}function T(f,c,m,v){if(typeof m=="object"&&m!==null&&m.type===Un&&m.key===null&&(m=m.props.children),typeof m=="object"&&m!==null){switch(m.$$typeof){case or:e:{for(var _=m.key,E=c;E!==null;){if(E.key===_){if(_=m.type,_===Un){if(E.tag===7){t(f,E.sibling),c=l(E,m.props.children),c.return=f,f=c;break e}}else if(E.elementType===_||typeof _=="object"&&_!==null&&_.$$typeof===tn&&Ns(_)===E.type){t(f,E.sibling),c=l(E,m.props),c.ref=yt(f,E,m),c.return=f,f=c;break e}t(f,E);break}else n(f,E);E=E.sibling}m.type===Un?(c=Pn(m.props.children,f.mode,v,m.key),c.return=f,f=c):(v=Lr(m.type,m.key,m.props,null,f.mode,v),v.ref=yt(f,c,m),v.return=f,f=v)}return o(f);case Fn:e:{for(E=m.key;c!==null;){if(c.key===E)if(c.tag===4&&c.stateNode.containerInfo===m.containerInfo&&c.stateNode.implementation===m.implementation){t(f,c.sibling),c=l(c,m.children||[]),c.return=f,f=c;break e}else{t(f,c);break}else n(f,c);c=c.sibling}c=Gl(m,f.mode,v),c.return=f,f=c}return o(f);case tn:return E=m._init,T(f,c,E(m._payload),v)}if(St(m))return k(f,c,m,v);if(pt(m))return S(f,c,m,v);vr(f,m)}return typeof m=="string"&&m!==""||typeof m=="number"?(m=""+m,c!==null&&c.tag===6?(t(f,c.sibling),c=l(c,m),c.return=f,f=c):(t(f,c),c=Ql(m,f.mode,v),c.return=f,f=c),o(f)):t(f,c)}return T}var ot=uu(!0),cu=uu(!1),Gr=wn(null),Kr=null,Gn=null,go=null;function ho(){go=Gn=Kr=null}function vo(e){var n=Gr.current;U(Gr),e._currentValue=n}function bi(e,n,t){for(;e!==null;){var r=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),e===t)break;e=e.return}}function nt(e,n){Kr=e,go=Gn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&n&&(pe=!0),e.firstContext=null)}function Ce(e){var n=e._currentValue;if(go!==e)if(e={context:e,memoizedValue:n,next:null},Gn===null){if(Kr===null)throw Error(x(308));Gn=e,Kr.dependencies={lanes:0,firstContext:e}}else Gn=Gn.next=e;return n}var Cn=null;function yo(e){Cn===null?Cn=[e]:Cn.push(e)}function du(e,n,t,r){var l=n.interleaved;return l===null?(t.next=t,yo(n)):(t.next=l.next,l.next=t),n.interleaved=t,Ke(e,r)}function Ke(e,n){e.lanes|=n;var t=e.alternate;for(t!==null&&(t.lanes|=n),t=e,e=e.return;e!==null;)e.childLanes|=n,t=e.alternate,t!==null&&(t.childLanes|=n),t=e,e=e.return;return t.tag===3?t.stateNode:null}var rn=!1;function xo(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function fu(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function He(e,n){return{eventTime:e,lane:n,tag:0,payload:null,callback:null,next:null}}function pn(e,n,t){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,D&2){var l=r.pending;return l===null?n.next=n:(n.next=l.next,l.next=n),r.pending=n,Ke(e,t)}return l=r.interleaved,l===null?(n.next=n,yo(r)):(n.next=l.next,l.next=n),r.interleaved=n,Ke(e,t)}function Cr(e,n,t){if(n=n.updateQueue,n!==null&&(n=n.shared,(t&4194240)!==0)){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,ro(e,t)}}function js(e,n){var t=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,t===r)){var l=null,i=null;if(t=t.firstBaseUpdate,t!==null){do{var o={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};i===null?l=i=o:i=i.next=o,t=t.next}while(t!==null);i===null?l=i=n:i=i.next=n}else l=i=n;t={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:i,shared:r.shared,effects:r.effects},e.updateQueue=t;return}e=t.lastBaseUpdate,e===null?t.firstBaseUpdate=n:e.next=n,t.lastBaseUpdate=n}function Yr(e,n,t,r){var l=e.updateQueue;rn=!1;var i=l.firstBaseUpdate,o=l.lastBaseUpdate,a=l.shared.pending;if(a!==null){l.shared.pending=null;var u=a,d=u.next;u.next=null,o===null?i=d:o.next=d,o=u;var h=e.alternate;h!==null&&(h=h.updateQueue,a=h.lastBaseUpdate,a!==o&&(a===null?h.firstBaseUpdate=d:a.next=d,h.lastBaseUpdate=u))}if(i!==null){var p=l.baseState;o=0,h=d=u=null,a=i;do{var g=a.lane,y=a.eventTime;if((r&g)===g){h!==null&&(h=h.next={eventTime:y,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var k=e,S=a;switch(g=n,y=t,S.tag){case 1:if(k=S.payload,typeof k=="function"){p=k.call(y,p,g);break e}p=k;break e;case 3:k.flags=k.flags&-65537|128;case 0:if(k=S.payload,g=typeof k=="function"?k.call(y,p,g):k,g==null)break e;p=B({},p,g);break e;case 2:rn=!0}}a.callback!==null&&a.lane!==0&&(e.flags|=64,g=l.effects,g===null?l.effects=[a]:g.push(a))}else y={eventTime:y,lane:g,tag:a.tag,payload:a.payload,callback:a.callback,next:null},h===null?(d=h=y,u=p):h=h.next=y,o|=g;if(a=a.next,a===null){if(a=l.shared.pending,a===null)break;g=a,a=g.next,g.next=null,l.lastBaseUpdate=g,l.shared.pending=null}}while(!0);if(h===null&&(u=p),l.baseState=u,l.firstBaseUpdate=d,l.lastBaseUpdate=h,n=l.shared.interleaved,n!==null){l=n;do o|=l.lane,l=l.next;while(l!==n)}else i===null&&(l.shared.lanes=0);An|=o,e.lanes=o,e.memoizedState=p}}function Es(e,n,t){if(e=n.effects,n.effects=null,e!==null)for(n=0;n<e.length;n++){var r=e[n],l=r.callback;if(l!==null){if(r.callback=null,r=t,typeof l!="function")throw Error(x(191,l));l.call(r)}}}var nr={},Ue=wn(nr),Vt=wn(nr),Ht=wn(nr);function bn(e){if(e===nr)throw Error(x(174));return e}function wo(e,n){switch(I(Ht,n),I(Vt,e),I(Ue,nr),e=n.nodeType,e){case 9:case 11:n=(n=n.documentElement)?n.namespaceURI:ai(null,"");break;default:e=e===8?n.parentNode:n,n=e.namespaceURI||null,e=e.tagName,n=ai(n,e)}U(Ue),I(Ue,n)}function st(){U(Ue),U(Vt),U(Ht)}function pu(e){bn(Ht.current);var n=bn(Ue.current),t=ai(n,e.type);n!==t&&(I(Vt,e),I(Ue,t))}function ko(e){Vt.current===e&&(U(Ue),U(Vt))}var q=wn(0);function Xr(e){for(var n=e;n!==null;){if(n.tag===13){var t=n.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!==void 0){if(n.flags&128)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var $l=[];function So(){for(var e=0;e<$l.length;e++)$l[e]._workInProgressVersionPrimary=null;$l.length=0}var br=Xe.ReactCurrentDispatcher,ql=Xe.ReactCurrentBatchConfig,Ln=0,W=null,Y=null,Z=null,Zr=!1,Pt=!1,Qt=0,rf=0;function le(){throw Error(x(321))}function _o(e,n){if(n===null)return!1;for(var t=0;t<n.length&&t<e.length;t++)if(!De(e[t],n[t]))return!1;return!0}function No(e,n,t,r,l,i){if(Ln=i,W=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,br.current=e===null||e.memoizedState===null?af:uf,e=t(r,l),Pt){i=0;do{if(Pt=!1,Qt=0,25<=i)throw Error(x(301));i+=1,Z=Y=null,n.updateQueue=null,br.current=cf,e=t(r,l)}while(Pt)}if(br.current=Jr,n=Y!==null&&Y.next!==null,Ln=0,Z=Y=W=null,Zr=!1,n)throw Error(x(300));return e}function jo(){var e=Qt!==0;return Qt=0,e}function Me(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Z===null?W.memoizedState=Z=e:Z=Z.next=e,Z}function be(){if(Y===null){var e=W.alternate;e=e!==null?e.memoizedState:null}else e=Y.next;var n=Z===null?W.memoizedState:Z.next;if(n!==null)Z=n,Y=e;else{if(e===null)throw Error(x(310));Y=e,e={memoizedState:Y.memoizedState,baseState:Y.baseState,baseQueue:Y.baseQueue,queue:Y.queue,next:null},Z===null?W.memoizedState=Z=e:Z=Z.next=e}return Z}function Gt(e,n){return typeof n=="function"?n(e):n}function Wl(e){var n=be(),t=n.queue;if(t===null)throw Error(x(311));t.lastRenderedReducer=e;var r=Y,l=r.baseQueue,i=t.pending;if(i!==null){if(l!==null){var o=l.next;l.next=i.next,i.next=o}r.baseQueue=l=i,t.pending=null}if(l!==null){i=l.next,r=r.baseState;var a=o=null,u=null,d=i;do{var h=d.lane;if((Ln&h)===h)u!==null&&(u=u.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),r=d.hasEagerState?d.eagerState:e(r,d.action);else{var p={lane:h,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};u===null?(a=u=p,o=r):u=u.next=p,W.lanes|=h,An|=h}d=d.next}while(d!==null&&d!==i);u===null?o=r:u.next=a,De(r,n.memoizedState)||(pe=!0),n.memoizedState=r,n.baseState=o,n.baseQueue=u,t.lastRenderedState=r}if(e=t.interleaved,e!==null){l=e;do i=l.lane,W.lanes|=i,An|=i,l=l.next;while(l!==e)}else l===null&&(t.lanes=0);return[n.memoizedState,t.dispatch]}function Bl(e){var n=be(),t=n.queue;if(t===null)throw Error(x(311));t.lastRenderedReducer=e;var r=t.dispatch,l=t.pending,i=n.memoizedState;if(l!==null){t.pending=null;var o=l=l.next;do i=e(i,o.action),o=o.next;while(o!==l);De(i,n.memoizedState)||(pe=!0),n.memoizedState=i,n.baseQueue===null&&(n.baseState=i),t.lastRenderedState=i}return[i,r]}function mu(){}function gu(e,n){var t=W,r=be(),l=n(),i=!De(r.memoizedState,l);if(i&&(r.memoizedState=l,pe=!0),r=r.queue,Eo(yu.bind(null,t,r,e),[e]),r.getSnapshot!==n||i||Z!==null&&Z.memoizedState.tag&1){if(t.flags|=2048,Kt(9,vu.bind(null,t,r,l,n),void 0,null),J===null)throw Error(x(349));Ln&30||hu(t,n,l)}return l}function hu(e,n,t){e.flags|=16384,e={getSnapshot:n,value:t},n=W.updateQueue,n===null?(n={lastEffect:null,stores:null},W.updateQueue=n,n.stores=[e]):(t=n.stores,t===null?n.stores=[e]:t.push(e))}function vu(e,n,t,r){n.value=t,n.getSnapshot=r,xu(n)&&wu(e)}function yu(e,n,t){return t(function(){xu(n)&&wu(e)})}function xu(e){var n=e.getSnapshot;e=e.value;try{var t=n();return!De(e,t)}catch{return!0}}function wu(e){var n=Ke(e,1);n!==null&&Ae(n,e,1,-1)}function Cs(e){var n=Me();return typeof e=="function"&&(e=e()),n.memoizedState=n.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Gt,lastRenderedState:e},n.queue=e,e=e.dispatch=sf.bind(null,W,e),[n.memoizedState,e]}function Kt(e,n,t,r){return e={tag:e,create:n,destroy:t,deps:r,next:null},n=W.updateQueue,n===null?(n={lastEffect:null,stores:null},W.updateQueue=n,n.lastEffect=e.next=e):(t=n.lastEffect,t===null?n.lastEffect=e.next=e:(r=t.next,t.next=e,e.next=r,n.lastEffect=e)),e}function ku(){return be().memoizedState}function zr(e,n,t,r){var l=Me();W.flags|=e,l.memoizedState=Kt(1|n,t,void 0,r===void 0?null:r)}function fl(e,n,t,r){var l=be();r=r===void 0?null:r;var i=void 0;if(Y!==null){var o=Y.memoizedState;if(i=o.destroy,r!==null&&_o(r,o.deps)){l.memoizedState=Kt(n,t,i,r);return}}W.flags|=e,l.memoizedState=Kt(1|n,t,i,r)}function bs(e,n){return zr(8390656,8,e,n)}function Eo(e,n){return fl(2048,8,e,n)}function Su(e,n){return fl(4,2,e,n)}function _u(e,n){return fl(4,4,e,n)}function Nu(e,n){if(typeof n=="function")return e=e(),n(e),function(){n(null)};if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function ju(e,n,t){return t=t!=null?t.concat([e]):null,fl(4,4,Nu.bind(null,n,e),t)}function Co(){}function Eu(e,n){var t=be();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&_o(n,r[1])?r[0]:(t.memoizedState=[e,n],e)}function Cu(e,n){var t=be();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&_o(n,r[1])?r[0]:(e=e(),t.memoizedState=[e,n],e)}function bu(e,n,t){return Ln&21?(De(t,n)||(t=La(),W.lanes|=t,An|=t,e.baseState=!0),n):(e.baseState&&(e.baseState=!1,pe=!0),e.memoizedState=t)}function lf(e,n){var t=O;O=t!==0&&4>t?t:4,e(!0);var r=ql.transition;ql.transition={};try{e(!1),n()}finally{O=t,ql.transition=r}}function zu(){return be().memoizedState}function of(e,n,t){var r=gn(e);if(t={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null},Pu(e))Tu(n,t);else if(t=du(e,n,t,r),t!==null){var l=ue();Ae(t,e,r,l),Ru(t,n,r)}}function sf(e,n,t){var r=gn(e),l={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null};if(Pu(e))Tu(n,l);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=n.lastRenderedReducer,i!==null))try{var o=n.lastRenderedState,a=i(o,t);if(l.hasEagerState=!0,l.eagerState=a,De(a,o)){var u=n.interleaved;u===null?(l.next=l,yo(n)):(l.next=u.next,u.next=l),n.interleaved=l;return}}catch{}finally{}t=du(e,n,l,r),t!==null&&(l=ue(),Ae(t,e,r,l),Ru(t,n,r))}}function Pu(e){var n=e.alternate;return e===W||n!==null&&n===W}function Tu(e,n){Pt=Zr=!0;var t=e.pending;t===null?n.next=n:(n.next=t.next,t.next=n),e.pending=n}function Ru(e,n,t){if(t&4194240){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,ro(e,t)}}var Jr={readContext:Ce,useCallback:le,useContext:le,useEffect:le,useImperativeHandle:le,useInsertionEffect:le,useLayoutEffect:le,useMemo:le,useReducer:le,useRef:le,useState:le,useDebugValue:le,useDeferredValue:le,useTransition:le,useMutableSource:le,useSyncExternalStore:le,useId:le,unstable_isNewReconciler:!1},af={readContext:Ce,useCallback:function(e,n){return Me().memoizedState=[e,n===void 0?null:n],e},useContext:Ce,useEffect:bs,useImperativeHandle:function(e,n,t){return t=t!=null?t.concat([e]):null,zr(4194308,4,Nu.bind(null,n,e),t)},useLayoutEffect:function(e,n){return zr(4194308,4,e,n)},useInsertionEffect:function(e,n){return zr(4,2,e,n)},useMemo:function(e,n){var t=Me();return n=n===void 0?null:n,e=e(),t.memoizedState=[e,n],e},useReducer:function(e,n,t){var r=Me();return n=t!==void 0?t(n):n,r.memoizedState=r.baseState=n,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},r.queue=e,e=e.dispatch=of.bind(null,W,e),[r.memoizedState,e]},useRef:function(e){var n=Me();return e={current:e},n.memoizedState=e},useState:Cs,useDebugValue:Co,useDeferredValue:function(e){return Me().memoizedState=e},useTransition:function(){var e=Cs(!1),n=e[0];return e=lf.bind(null,e[1]),Me().memoizedState=e,[n,e]},useMutableSource:function(){},useSyncExternalStore:function(e,n,t){var r=W,l=Me();if($){if(t===void 0)throw Error(x(407));t=t()}else{if(t=n(),J===null)throw Error(x(349));Ln&30||hu(r,n,t)}l.memoizedState=t;var i={value:t,getSnapshot:n};return l.queue=i,bs(yu.bind(null,r,i,e),[e]),r.flags|=2048,Kt(9,vu.bind(null,r,i,t,n),void 0,null),t},useId:function(){var e=Me(),n=J.identifierPrefix;if($){var t=Ve,r=Be;t=(r&~(1<<32-Le(r)-1)).toString(32)+t,n=":"+n+"R"+t,t=Qt++,0<t&&(n+="H"+t.toString(32)),n+=":"}else t=rf++,n=":"+n+"r"+t.toString(32)+":";return e.memoizedState=n},unstable_isNewReconciler:!1},uf={readContext:Ce,useCallback:Eu,useContext:Ce,useEffect:Eo,useImperativeHandle:ju,useInsertionEffect:Su,useLayoutEffect:_u,useMemo:Cu,useReducer:Wl,useRef:ku,useState:function(){return Wl(Gt)},useDebugValue:Co,useDeferredValue:function(e){var n=be();return bu(n,Y.memoizedState,e)},useTransition:function(){var e=Wl(Gt)[0],n=be().memoizedState;return[e,n]},useMutableSource:mu,useSyncExternalStore:gu,useId:zu,unstable_isNewReconciler:!1},cf={readContext:Ce,useCallback:Eu,useContext:Ce,useEffect:Eo,useImperativeHandle:ju,useInsertionEffect:Su,useLayoutEffect:_u,useMemo:Cu,useReducer:Bl,useRef:ku,useState:function(){return Bl(Gt)},useDebugValue:Co,useDeferredValue:function(e){var n=be();return Y===null?n.memoizedState=e:bu(n,Y.memoizedState,e)},useTransition:function(){var e=Bl(Gt)[0],n=be().memoizedState;return[e,n]},useMutableSource:mu,useSyncExternalStore:gu,useId:zu,unstable_isNewReconciler:!1};function Pe(e,n){if(e&&e.defaultProps){n=B({},n),e=e.defaultProps;for(var t in e)n[t]===void 0&&(n[t]=e[t]);return n}return n}function zi(e,n,t,r){n=e.memoizedState,t=t(r,n),t=t==null?n:B({},n,t),e.memoizedState=t,e.lanes===0&&(e.updateQueue.baseState=t)}var pl={isMounted:function(e){return(e=e._reactInternals)?Mn(e)===e:!1},enqueueSetState:function(e,n,t){e=e._reactInternals;var r=ue(),l=gn(e),i=He(r,l);i.payload=n,t!=null&&(i.callback=t),n=pn(e,i,l),n!==null&&(Ae(n,e,l,r),Cr(n,e,l))},enqueueReplaceState:function(e,n,t){e=e._reactInternals;var r=ue(),l=gn(e),i=He(r,l);i.tag=1,i.payload=n,t!=null&&(i.callback=t),n=pn(e,i,l),n!==null&&(Ae(n,e,l,r),Cr(n,e,l))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var t=ue(),r=gn(e),l=He(t,r);l.tag=2,n!=null&&(l.callback=n),n=pn(e,l,r),n!==null&&(Ae(n,e,r,t),Cr(n,e,r))}};function zs(e,n,t,r,l,i,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,i,o):n.prototype&&n.prototype.isPureReactComponent?!$t(t,r)||!$t(l,i):!0}function Lu(e,n,t){var r=!1,l=yn,i=n.contextType;return typeof i=="object"&&i!==null?i=Ce(i):(l=ge(n)?Tn:se.current,r=n.contextTypes,i=(r=r!=null)?lt(e,l):yn),n=new n(t,i),e.memoizedState=n.state!==null&&n.state!==void 0?n.state:null,n.updater=pl,e.stateNode=n,n._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=i),n}function Ps(e,n,t,r){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(t,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(t,r),n.state!==e&&pl.enqueueReplaceState(n,n.state,null)}function Pi(e,n,t,r){var l=e.stateNode;l.props=t,l.state=e.memoizedState,l.refs={},xo(e);var i=n.contextType;typeof i=="object"&&i!==null?l.context=Ce(i):(i=ge(n)?Tn:se.current,l.context=lt(e,i)),l.state=e.memoizedState,i=n.getDerivedStateFromProps,typeof i=="function"&&(zi(e,n,i,t),l.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(n=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),n!==l.state&&pl.enqueueReplaceState(l,l.state,null),Yr(e,t,l,r),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308)}function at(e,n){try{var t="",r=n;do t+=Mc(r),r=r.return;while(r);var l=t}catch(i){l=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:n,stack:l,digest:null}}function Vl(e,n,t){return{value:e,source:null,stack:t??null,digest:n??null}}function Ti(e,n){try{console.error(n.value)}catch(t){setTimeout(function(){throw t})}}var df=typeof WeakMap=="function"?WeakMap:Map;function Au(e,n,t){t=He(-1,t),t.tag=3,t.payload={element:null};var r=n.value;return t.callback=function(){nl||(nl=!0,$i=r),Ti(e,n)},t}function Du(e,n,t){t=He(-1,t),t.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var l=n.value;t.payload=function(){return r(l)},t.callback=function(){Ti(e,n)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(t.callback=function(){Ti(e,n),typeof r!="function"&&(mn===null?mn=new Set([this]):mn.add(this));var o=n.stack;this.componentDidCatch(n.value,{componentStack:o!==null?o:""})}),t}function Ts(e,n,t){var r=e.pingCache;if(r===null){r=e.pingCache=new df;var l=new Set;r.set(n,l)}else l=r.get(n),l===void 0&&(l=new Set,r.set(n,l));l.has(t)||(l.add(t),e=jf.bind(null,e,n,t),n.then(e,e))}function Rs(e){do{var n;if((n=e.tag===13)&&(n=e.memoizedState,n=n!==null?n.dehydrated!==null:!0),n)return e;e=e.return}while(e!==null);return null}function Ls(e,n,t,r,l){return e.mode&1?(e.flags|=65536,e.lanes=l,e):(e===n?e.flags|=65536:(e.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(n=He(-1,1),n.tag=2,pn(t,n,1))),t.lanes|=1),e)}var ff=Xe.ReactCurrentOwner,pe=!1;function ae(e,n,t,r){n.child=e===null?cu(n,null,t,r):ot(n,e.child,t,r)}function As(e,n,t,r,l){t=t.render;var i=n.ref;return nt(n,l),r=No(e,n,t,r,i,l),t=jo(),e!==null&&!pe?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~l,Ye(e,n,l)):($&&t&&fo(n),n.flags|=1,ae(e,n,r,l),n.child)}function Ds(e,n,t,r,l){if(e===null){var i=t.type;return typeof i=="function"&&!Do(i)&&i.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(n.tag=15,n.type=i,Ou(e,n,i,r,l)):(e=Lr(t.type,null,r,n,n.mode,l),e.ref=n.ref,e.return=n,n.child=e)}if(i=e.child,!(e.lanes&l)){var o=i.memoizedProps;if(t=t.compare,t=t!==null?t:$t,t(o,r)&&e.ref===n.ref)return Ye(e,n,l)}return n.flags|=1,e=hn(i,r),e.ref=n.ref,e.return=n,n.child=e}function Ou(e,n,t,r,l){if(e!==null){var i=e.memoizedProps;if($t(i,r)&&e.ref===n.ref)if(pe=!1,n.pendingProps=r=i,(e.lanes&l)!==0)e.flags&131072&&(pe=!0);else return n.lanes=e.lanes,Ye(e,n,l)}return Ri(e,n,t,r,l)}function Mu(e,n,t){var r=n.pendingProps,l=r.children,i=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(n.mode&1))n.memoizedState={baseLanes:0,cachePool:null,transitions:null},I(Yn,ve),ve|=t;else{if(!(t&1073741824))return e=i!==null?i.baseLanes|t:t,n.lanes=n.childLanes=1073741824,n.memoizedState={baseLanes:e,cachePool:null,transitions:null},n.updateQueue=null,I(Yn,ve),ve|=e,null;n.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:t,I(Yn,ve),ve|=r}else i!==null?(r=i.baseLanes|t,n.memoizedState=null):r=t,I(Yn,ve),ve|=r;return ae(e,n,l,t),n.child}function Iu(e,n){var t=n.ref;(e===null&&t!==null||e!==null&&e.ref!==t)&&(n.flags|=512,n.flags|=2097152)}function Ri(e,n,t,r,l){var i=ge(t)?Tn:se.current;return i=lt(n,i),nt(n,l),t=No(e,n,t,r,i,l),r=jo(),e!==null&&!pe?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~l,Ye(e,n,l)):($&&r&&fo(n),n.flags|=1,ae(e,n,t,l),n.child)}function Os(e,n,t,r,l){if(ge(t)){var i=!0;Vr(n)}else i=!1;if(nt(n,l),n.stateNode===null)Pr(e,n),Lu(n,t,r),Pi(n,t,r,l),r=!0;else if(e===null){var o=n.stateNode,a=n.memoizedProps;o.props=a;var u=o.context,d=t.contextType;typeof d=="object"&&d!==null?d=Ce(d):(d=ge(t)?Tn:se.current,d=lt(n,d));var h=t.getDerivedStateFromProps,p=typeof h=="function"||typeof o.getSnapshotBeforeUpdate=="function";p||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==r||u!==d)&&Ps(n,o,r,d),rn=!1;var g=n.memoizedState;o.state=g,Yr(n,r,o,l),u=n.memoizedState,a!==r||g!==u||me.current||rn?(typeof h=="function"&&(zi(n,t,h,r),u=n.memoizedState),(a=rn||zs(n,t,a,r,g,u,d))?(p||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(n.flags|=4194308)):(typeof o.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=u),o.props=r,o.state=u,o.context=d,r=a):(typeof o.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{o=n.stateNode,fu(e,n),a=n.memoizedProps,d=n.type===n.elementType?a:Pe(n.type,a),o.props=d,p=n.pendingProps,g=o.context,u=t.contextType,typeof u=="object"&&u!==null?u=Ce(u):(u=ge(t)?Tn:se.current,u=lt(n,u));var y=t.getDerivedStateFromProps;(h=typeof y=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==p||g!==u)&&Ps(n,o,r,u),rn=!1,g=n.memoizedState,o.state=g,Yr(n,r,o,l);var k=n.memoizedState;a!==p||g!==k||me.current||rn?(typeof y=="function"&&(zi(n,t,y,r),k=n.memoizedState),(d=rn||zs(n,t,d,r,g,k,u)||!1)?(h||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,k,u),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,k,u)),typeof o.componentDidUpdate=="function"&&(n.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===e.memoizedProps&&g===e.memoizedState||(n.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&g===e.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=k),o.props=r,o.state=k,o.context=u,r=d):(typeof o.componentDidUpdate!="function"||a===e.memoizedProps&&g===e.memoizedState||(n.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&g===e.memoizedState||(n.flags|=1024),r=!1)}return Li(e,n,t,r,i,l)}function Li(e,n,t,r,l,i){Iu(e,n);var o=(n.flags&128)!==0;if(!r&&!o)return l&&ks(n,t,!1),Ye(e,n,i);r=n.stateNode,ff.current=n;var a=o&&typeof t.getDerivedStateFromError!="function"?null:r.render();return n.flags|=1,e!==null&&o?(n.child=ot(n,e.child,null,i),n.child=ot(n,null,a,i)):ae(e,n,a,i),n.memoizedState=r.state,l&&ks(n,t,!0),n.child}function Fu(e){var n=e.stateNode;n.pendingContext?ws(e,n.pendingContext,n.pendingContext!==n.context):n.context&&ws(e,n.context,!1),wo(e,n.containerInfo)}function Ms(e,n,t,r,l){return it(),mo(l),n.flags|=256,ae(e,n,t,r),n.child}var Ai={dehydrated:null,treeContext:null,retryLane:0};function Di(e){return{baseLanes:e,cachePool:null,transitions:null}}function Uu(e,n,t){var r=n.pendingProps,l=q.current,i=!1,o=(n.flags&128)!==0,a;if((a=o)||(a=e!==null&&e.memoizedState===null?!1:(l&2)!==0),a?(i=!0,n.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1),I(q,l&1),e===null)return Ci(n),e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(n.mode&1?e.data==="$!"?n.lanes=8:n.lanes=1073741824:n.lanes=1,null):(o=r.children,e=r.fallback,i?(r=n.mode,i=n.child,o={mode:"hidden",children:o},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=o):i=hl(o,r,0,null),e=Pn(e,r,t,null),i.return=n,e.return=n,i.sibling=e,n.child=i,n.child.memoizedState=Di(t),n.memoizedState=Ai,e):bo(n,o));if(l=e.memoizedState,l!==null&&(a=l.dehydrated,a!==null))return pf(e,n,o,r,a,l,t);if(i){i=r.fallback,o=n.mode,l=e.child,a=l.sibling;var u={mode:"hidden",children:r.children};return!(o&1)&&n.child!==l?(r=n.child,r.childLanes=0,r.pendingProps=u,n.deletions=null):(r=hn(l,u),r.subtreeFlags=l.subtreeFlags&14680064),a!==null?i=hn(a,i):(i=Pn(i,o,t,null),i.flags|=2),i.return=n,r.return=n,r.sibling=i,n.child=r,r=i,i=n.child,o=e.child.memoizedState,o=o===null?Di(t):{baseLanes:o.baseLanes|t,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=e.childLanes&~t,n.memoizedState=Ai,r}return i=e.child,e=i.sibling,r=hn(i,{mode:"visible",children:r.children}),!(n.mode&1)&&(r.lanes=t),r.return=n,r.sibling=null,e!==null&&(t=n.deletions,t===null?(n.deletions=[e],n.flags|=16):t.push(e)),n.child=r,n.memoizedState=null,r}function bo(e,n){return n=hl({mode:"visible",children:n},e.mode,0,null),n.return=e,e.child=n}function yr(e,n,t,r){return r!==null&&mo(r),ot(n,e.child,null,t),e=bo(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function pf(e,n,t,r,l,i,o){if(t)return n.flags&256?(n.flags&=-257,r=Vl(Error(x(422))),yr(e,n,o,r)):n.memoizedState!==null?(n.child=e.child,n.flags|=128,null):(i=r.fallback,l=n.mode,r=hl({mode:"visible",children:r.children},l,0,null),i=Pn(i,l,o,null),i.flags|=2,r.return=n,i.return=n,r.sibling=i,n.child=r,n.mode&1&&ot(n,e.child,null,o),n.child.memoizedState=Di(o),n.memoizedState=Ai,i);if(!(n.mode&1))return yr(e,n,o,null);if(l.data==="$!"){if(r=l.nextSibling&&l.nextSibling.dataset,r)var a=r.dgst;return r=a,i=Error(x(419)),r=Vl(i,r,void 0),yr(e,n,o,r)}if(a=(o&e.childLanes)!==0,pe||a){if(r=J,r!==null){switch(o&-o){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=l&(r.suspendedLanes|o)?0:l,l!==0&&l!==i.retryLane&&(i.retryLane=l,Ke(e,l),Ae(r,e,l,-1))}return Ao(),r=Vl(Error(x(421))),yr(e,n,o,r)}return l.data==="$?"?(n.flags|=128,n.child=e.child,n=Ef.bind(null,e),l._reactRetry=n,null):(e=i.treeContext,ye=fn(l.nextSibling),xe=n,$=!0,Re=null,e!==null&&(_e[Ne++]=Be,_e[Ne++]=Ve,_e[Ne++]=Rn,Be=e.id,Ve=e.overflow,Rn=n),n=bo(n,r.children),n.flags|=4096,n)}function Is(e,n,t){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n),bi(e.return,n,t)}function Hl(e,n,t,r,l){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:t,tailMode:l}:(i.isBackwards=n,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=t,i.tailMode=l)}function $u(e,n,t){var r=n.pendingProps,l=r.revealOrder,i=r.tail;if(ae(e,n,r.children,t),r=q.current,r&2)r=r&1|2,n.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Is(e,t,n);else if(e.tag===19)Is(e,t,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(I(q,r),!(n.mode&1))n.memoizedState=null;else switch(l){case"forwards":for(t=n.child,l=null;t!==null;)e=t.alternate,e!==null&&Xr(e)===null&&(l=t),t=t.sibling;t=l,t===null?(l=n.child,n.child=null):(l=t.sibling,t.sibling=null),Hl(n,!1,l,t,i);break;case"backwards":for(t=null,l=n.child,n.child=null;l!==null;){if(e=l.alternate,e!==null&&Xr(e)===null){n.child=l;break}e=l.sibling,l.sibling=t,t=l,l=e}Hl(n,!0,t,null,i);break;case"together":Hl(n,!1,null,null,void 0);break;default:n.memoizedState=null}return n.child}function Pr(e,n){!(n.mode&1)&&e!==null&&(e.alternate=null,n.alternate=null,n.flags|=2)}function Ye(e,n,t){if(e!==null&&(n.dependencies=e.dependencies),An|=n.lanes,!(t&n.childLanes))return null;if(e!==null&&n.child!==e.child)throw Error(x(153));if(n.child!==null){for(e=n.child,t=hn(e,e.pendingProps),n.child=t,t.return=n;e.sibling!==null;)e=e.sibling,t=t.sibling=hn(e,e.pendingProps),t.return=n;t.sibling=null}return n.child}function mf(e,n,t){switch(n.tag){case 3:Fu(n),it();break;case 5:pu(n);break;case 1:ge(n.type)&&Vr(n);break;case 4:wo(n,n.stateNode.containerInfo);break;case 10:var r=n.type._context,l=n.memoizedProps.value;I(Gr,r._currentValue),r._currentValue=l;break;case 13:if(r=n.memoizedState,r!==null)return r.dehydrated!==null?(I(q,q.current&1),n.flags|=128,null):t&n.child.childLanes?Uu(e,n,t):(I(q,q.current&1),e=Ye(e,n,t),e!==null?e.sibling:null);I(q,q.current&1);break;case 19:if(r=(t&n.childLanes)!==0,e.flags&128){if(r)return $u(e,n,t);n.flags|=128}if(l=n.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),I(q,q.current),r)break;return null;case 22:case 23:return n.lanes=0,Mu(e,n,t)}return Ye(e,n,t)}var qu,Oi,Wu,Bu;qu=function(e,n){for(var t=n.child;t!==null;){if(t.tag===5||t.tag===6)e.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break;for(;t.sibling===null;){if(t.return===null||t.return===n)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};Oi=function(){};Wu=function(e,n,t,r){var l=e.memoizedProps;if(l!==r){e=n.stateNode,bn(Ue.current);var i=null;switch(t){case"input":l=li(e,l),r=li(e,r),i=[];break;case"select":l=B({},l,{value:void 0}),r=B({},r,{value:void 0}),i=[];break;case"textarea":l=si(e,l),r=si(e,r),i=[];break;default:typeof l.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Wr)}ui(t,r);var o;t=null;for(d in l)if(!r.hasOwnProperty(d)&&l.hasOwnProperty(d)&&l[d]!=null)if(d==="style"){var a=l[d];for(o in a)a.hasOwnProperty(o)&&(t||(t={}),t[o]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(At.hasOwnProperty(d)?i||(i=[]):(i=i||[]).push(d,null));for(d in r){var u=r[d];if(a=l!=null?l[d]:void 0,r.hasOwnProperty(d)&&u!==a&&(u!=null||a!=null))if(d==="style")if(a){for(o in a)!a.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(t||(t={}),t[o]="");for(o in u)u.hasOwnProperty(o)&&a[o]!==u[o]&&(t||(t={}),t[o]=u[o])}else t||(i||(i=[]),i.push(d,t)),t=u;else d==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,a=a?a.__html:void 0,u!=null&&a!==u&&(i=i||[]).push(d,u)):d==="children"?typeof u!="string"&&typeof u!="number"||(i=i||[]).push(d,""+u):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(At.hasOwnProperty(d)?(u!=null&&d==="onScroll"&&F("scroll",e),i||a===u||(i=[])):(i=i||[]).push(d,u))}t&&(i=i||[]).push("style",t);var d=i;(n.updateQueue=d)&&(n.flags|=4)}};Bu=function(e,n,t,r){t!==r&&(n.flags|=4)};function xt(e,n){if(!$)switch(e.tailMode){case"hidden":n=e.tail;for(var t=null;n!==null;)n.alternate!==null&&(t=n),n=n.sibling;t===null?e.tail=null:t.sibling=null;break;case"collapsed":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function ie(e){var n=e.alternate!==null&&e.alternate.child===e.child,t=0,r=0;if(n)for(var l=e.child;l!==null;)t|=l.lanes|l.childLanes,r|=l.subtreeFlags&14680064,r|=l.flags&14680064,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)t|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=r,e.childLanes=t,n}function gf(e,n,t){var r=n.pendingProps;switch(po(n),n.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ie(n),null;case 1:return ge(n.type)&&Br(),ie(n),null;case 3:return r=n.stateNode,st(),U(me),U(se),So(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(hr(n)?n.flags|=4:e===null||e.memoizedState.isDehydrated&&!(n.flags&256)||(n.flags|=1024,Re!==null&&(Bi(Re),Re=null))),Oi(e,n),ie(n),null;case 5:ko(n);var l=bn(Ht.current);if(t=n.type,e!==null&&n.stateNode!=null)Wu(e,n,t,r,l),e.ref!==n.ref&&(n.flags|=512,n.flags|=2097152);else{if(!r){if(n.stateNode===null)throw Error(x(166));return ie(n),null}if(e=bn(Ue.current),hr(n)){r=n.stateNode,t=n.type;var i=n.memoizedProps;switch(r[Ie]=n,r[Bt]=i,e=(n.mode&1)!==0,t){case"dialog":F("cancel",r),F("close",r);break;case"iframe":case"object":case"embed":F("load",r);break;case"video":case"audio":for(l=0;l<Nt.length;l++)F(Nt[l],r);break;case"source":F("error",r);break;case"img":case"image":case"link":F("error",r),F("load",r);break;case"details":F("toggle",r);break;case"input":Qo(r,i),F("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},F("invalid",r);break;case"textarea":Ko(r,i),F("invalid",r)}ui(t,i),l=null;for(var o in i)if(i.hasOwnProperty(o)){var a=i[o];o==="children"?typeof a=="string"?r.textContent!==a&&(i.suppressHydrationWarning!==!0&&gr(r.textContent,a,e),l=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(i.suppressHydrationWarning!==!0&&gr(r.textContent,a,e),l=["children",""+a]):At.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&F("scroll",r)}switch(t){case"input":sr(r),Go(r,i,!0);break;case"textarea":sr(r),Yo(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=Wr)}r=l,n.updateQueue=r,r!==null&&(n.flags|=4)}else{o=l.nodeType===9?l:l.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=ya(t)),e==="http://www.w3.org/1999/xhtml"?t==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(t,{is:r.is}):(e=o.createElement(t),t==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,t),e[Ie]=n,e[Bt]=r,qu(e,n,!1,!1),n.stateNode=e;e:{switch(o=ci(t,r),t){case"dialog":F("cancel",e),F("close",e),l=r;break;case"iframe":case"object":case"embed":F("load",e),l=r;break;case"video":case"audio":for(l=0;l<Nt.length;l++)F(Nt[l],e);l=r;break;case"source":F("error",e),l=r;break;case"img":case"image":case"link":F("error",e),F("load",e),l=r;break;case"details":F("toggle",e),l=r;break;case"input":Qo(e,r),l=li(e,r),F("invalid",e);break;case"option":l=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},l=B({},r,{value:void 0}),F("invalid",e);break;case"textarea":Ko(e,r),l=si(e,r),F("invalid",e);break;default:l=r}ui(t,l),a=l;for(i in a)if(a.hasOwnProperty(i)){var u=a[i];i==="style"?ka(e,u):i==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&xa(e,u)):i==="children"?typeof u=="string"?(t!=="textarea"||u!=="")&&Dt(e,u):typeof u=="number"&&Dt(e,""+u):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(At.hasOwnProperty(i)?u!=null&&i==="onScroll"&&F("scroll",e):u!=null&&Xi(e,i,u,o))}switch(t){case"input":sr(e),Go(e,r,!1);break;case"textarea":sr(e),Yo(e);break;case"option":r.value!=null&&e.setAttribute("value",""+vn(r.value));break;case"select":e.multiple=!!r.multiple,i=r.value,i!=null?Xn(e,!!r.multiple,i,!1):r.defaultValue!=null&&Xn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof l.onClick=="function"&&(e.onclick=Wr)}switch(t){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(n.flags|=4)}n.ref!==null&&(n.flags|=512,n.flags|=2097152)}return ie(n),null;case 6:if(e&&n.stateNode!=null)Bu(e,n,e.memoizedProps,r);else{if(typeof r!="string"&&n.stateNode===null)throw Error(x(166));if(t=bn(Ht.current),bn(Ue.current),hr(n)){if(r=n.stateNode,t=n.memoizedProps,r[Ie]=n,(i=r.nodeValue!==t)&&(e=xe,e!==null))switch(e.tag){case 3:gr(r.nodeValue,t,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&gr(r.nodeValue,t,(e.mode&1)!==0)}i&&(n.flags|=4)}else r=(t.nodeType===9?t:t.ownerDocument).createTextNode(r),r[Ie]=n,n.stateNode=r}return ie(n),null;case 13:if(U(q),r=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if($&&ye!==null&&n.mode&1&&!(n.flags&128))au(),it(),n.flags|=98560,i=!1;else if(i=hr(n),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(x(318));if(i=n.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(x(317));i[Ie]=n}else it(),!(n.flags&128)&&(n.memoizedState=null),n.flags|=4;ie(n),i=!1}else Re!==null&&(Bi(Re),Re=null),i=!0;if(!i)return n.flags&65536?n:null}return n.flags&128?(n.lanes=t,n):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(n.child.flags|=8192,n.mode&1&&(e===null||q.current&1?X===0&&(X=3):Ao())),n.updateQueue!==null&&(n.flags|=4),ie(n),null);case 4:return st(),Oi(e,n),e===null&&qt(n.stateNode.containerInfo),ie(n),null;case 10:return vo(n.type._context),ie(n),null;case 17:return ge(n.type)&&Br(),ie(n),null;case 19:if(U(q),i=n.memoizedState,i===null)return ie(n),null;if(r=(n.flags&128)!==0,o=i.rendering,o===null)if(r)xt(i,!1);else{if(X!==0||e!==null&&e.flags&128)for(e=n.child;e!==null;){if(o=Xr(e),o!==null){for(n.flags|=128,xt(i,!1),r=o.updateQueue,r!==null&&(n.updateQueue=r,n.flags|=4),n.subtreeFlags=0,r=t,t=n.child;t!==null;)i=t,e=r,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,e=o.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t=t.sibling;return I(q,q.current&1|2),n.child}e=e.sibling}i.tail!==null&&Q()>ut&&(n.flags|=128,r=!0,xt(i,!1),n.lanes=4194304)}else{if(!r)if(e=Xr(o),e!==null){if(n.flags|=128,r=!0,t=e.updateQueue,t!==null&&(n.updateQueue=t,n.flags|=4),xt(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!$)return ie(n),null}else 2*Q()-i.renderingStartTime>ut&&t!==1073741824&&(n.flags|=128,r=!0,xt(i,!1),n.lanes=4194304);i.isBackwards?(o.sibling=n.child,n.child=o):(t=i.last,t!==null?t.sibling=o:n.child=o,i.last=o)}return i.tail!==null?(n=i.tail,i.rendering=n,i.tail=n.sibling,i.renderingStartTime=Q(),n.sibling=null,t=q.current,I(q,r?t&1|2:t&1),n):(ie(n),null);case 22:case 23:return Lo(),r=n.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(n.flags|=8192),r&&n.mode&1?ve&1073741824&&(ie(n),n.subtreeFlags&6&&(n.flags|=8192)):ie(n),null;case 24:return null;case 25:return null}throw Error(x(156,n.tag))}function hf(e,n){switch(po(n),n.tag){case 1:return ge(n.type)&&Br(),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return st(),U(me),U(se),So(),e=n.flags,e&65536&&!(e&128)?(n.flags=e&-65537|128,n):null;case 5:return ko(n),null;case 13:if(U(q),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(x(340));it()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return U(q),null;case 4:return st(),null;case 10:return vo(n.type._context),null;case 22:case 23:return Lo(),null;case 24:return null;default:return null}}var xr=!1,oe=!1,vf=typeof WeakSet=="function"?WeakSet:Set,N=null;function Kn(e,n){var t=e.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(r){V(e,n,r)}else t.current=null}function Mi(e,n,t){try{t()}catch(r){V(e,n,r)}}var Fs=!1;function yf(e,n){if(wi=Ur,e=Ka(),co(e)){if("selectionStart"in e)var t={start:e.selectionStart,end:e.selectionEnd};else e:{t=(t=e.ownerDocument)&&t.defaultView||window;var r=t.getSelection&&t.getSelection();if(r&&r.rangeCount!==0){t=r.anchorNode;var l=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{t.nodeType,i.nodeType}catch{t=null;break e}var o=0,a=-1,u=-1,d=0,h=0,p=e,g=null;n:for(;;){for(var y;p!==t||l!==0&&p.nodeType!==3||(a=o+l),p!==i||r!==0&&p.nodeType!==3||(u=o+r),p.nodeType===3&&(o+=p.nodeValue.length),(y=p.firstChild)!==null;)g=p,p=y;for(;;){if(p===e)break n;if(g===t&&++d===l&&(a=o),g===i&&++h===r&&(u=o),(y=p.nextSibling)!==null)break;p=g,g=p.parentNode}p=y}t=a===-1||u===-1?null:{start:a,end:u}}else t=null}t=t||{start:0,end:0}}else t=null;for(ki={focusedElem:e,selectionRange:t},Ur=!1,N=n;N!==null;)if(n=N,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,N=e;else for(;N!==null;){n=N;try{var k=n.alternate;if(n.flags&1024)switch(n.tag){case 0:case 11:case 15:break;case 1:if(k!==null){var S=k.memoizedProps,T=k.memoizedState,f=n.stateNode,c=f.getSnapshotBeforeUpdate(n.elementType===n.type?S:Pe(n.type,S),T);f.__reactInternalSnapshotBeforeUpdate=c}break;case 3:var m=n.stateNode.containerInfo;m.nodeType===1?m.textContent="":m.nodeType===9&&m.documentElement&&m.removeChild(m.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(x(163))}}catch(v){V(n,n.return,v)}if(e=n.sibling,e!==null){e.return=n.return,N=e;break}N=n.return}return k=Fs,Fs=!1,k}function Tt(e,n,t){var r=n.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var l=r=r.next;do{if((l.tag&e)===e){var i=l.destroy;l.destroy=void 0,i!==void 0&&Mi(n,t,i)}l=l.next}while(l!==r)}}function ml(e,n){if(n=n.updateQueue,n=n!==null?n.lastEffect:null,n!==null){var t=n=n.next;do{if((t.tag&e)===e){var r=t.create;t.destroy=r()}t=t.next}while(t!==n)}}function Ii(e){var n=e.ref;if(n!==null){var t=e.stateNode;switch(e.tag){case 5:e=t;break;default:e=t}typeof n=="function"?n(e):n.current=e}}function Vu(e){var n=e.alternate;n!==null&&(e.alternate=null,Vu(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&(delete n[Ie],delete n[Bt],delete n[Ni],delete n[Jd],delete n[ef])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Hu(e){return e.tag===5||e.tag===3||e.tag===4}function Us(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Hu(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Fi(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.nodeType===8?t.parentNode.insertBefore(e,n):t.insertBefore(e,n):(t.nodeType===8?(n=t.parentNode,n.insertBefore(e,t)):(n=t,n.appendChild(e)),t=t._reactRootContainer,t!=null||n.onclick!==null||(n.onclick=Wr));else if(r!==4&&(e=e.child,e!==null))for(Fi(e,n,t),e=e.sibling;e!==null;)Fi(e,n,t),e=e.sibling}function Ui(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.insertBefore(e,n):t.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Ui(e,n,t),e=e.sibling;e!==null;)Ui(e,n,t),e=e.sibling}var ee=null,Te=!1;function en(e,n,t){for(t=t.child;t!==null;)Qu(e,n,t),t=t.sibling}function Qu(e,n,t){if(Fe&&typeof Fe.onCommitFiberUnmount=="function")try{Fe.onCommitFiberUnmount(ol,t)}catch{}switch(t.tag){case 5:oe||Kn(t,n);case 6:var r=ee,l=Te;ee=null,en(e,n,t),ee=r,Te=l,ee!==null&&(Te?(e=ee,t=t.stateNode,e.nodeType===8?e.parentNode.removeChild(t):e.removeChild(t)):ee.removeChild(t.stateNode));break;case 18:ee!==null&&(Te?(e=ee,t=t.stateNode,e.nodeType===8?Fl(e.parentNode,t):e.nodeType===1&&Fl(e,t),Ft(e)):Fl(ee,t.stateNode));break;case 4:r=ee,l=Te,ee=t.stateNode.containerInfo,Te=!0,en(e,n,t),ee=r,Te=l;break;case 0:case 11:case 14:case 15:if(!oe&&(r=t.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){l=r=r.next;do{var i=l,o=i.destroy;i=i.tag,o!==void 0&&(i&2||i&4)&&Mi(t,n,o),l=l.next}while(l!==r)}en(e,n,t);break;case 1:if(!oe&&(Kn(t,n),r=t.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=t.memoizedProps,r.state=t.memoizedState,r.componentWillUnmount()}catch(a){V(t,n,a)}en(e,n,t);break;case 21:en(e,n,t);break;case 22:t.mode&1?(oe=(r=oe)||t.memoizedState!==null,en(e,n,t),oe=r):en(e,n,t);break;default:en(e,n,t)}}function $s(e){var n=e.updateQueue;if(n!==null){e.updateQueue=null;var t=e.stateNode;t===null&&(t=e.stateNode=new vf),n.forEach(function(r){var l=Cf.bind(null,e,r);t.has(r)||(t.add(r),r.then(l,l))})}}function ze(e,n){var t=n.deletions;if(t!==null)for(var r=0;r<t.length;r++){var l=t[r];try{var i=e,o=n,a=o;e:for(;a!==null;){switch(a.tag){case 5:ee=a.stateNode,Te=!1;break e;case 3:ee=a.stateNode.containerInfo,Te=!0;break e;case 4:ee=a.stateNode.containerInfo,Te=!0;break e}a=a.return}if(ee===null)throw Error(x(160));Qu(i,o,l),ee=null,Te=!1;var u=l.alternate;u!==null&&(u.return=null),l.return=null}catch(d){V(l,n,d)}}if(n.subtreeFlags&12854)for(n=n.child;n!==null;)Gu(n,e),n=n.sibling}function Gu(e,n){var t=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(ze(n,e),Oe(e),r&4){try{Tt(3,e,e.return),ml(3,e)}catch(S){V(e,e.return,S)}try{Tt(5,e,e.return)}catch(S){V(e,e.return,S)}}break;case 1:ze(n,e),Oe(e),r&512&&t!==null&&Kn(t,t.return);break;case 5:if(ze(n,e),Oe(e),r&512&&t!==null&&Kn(t,t.return),e.flags&32){var l=e.stateNode;try{Dt(l,"")}catch(S){V(e,e.return,S)}}if(r&4&&(l=e.stateNode,l!=null)){var i=e.memoizedProps,o=t!==null?t.memoizedProps:i,a=e.type,u=e.updateQueue;if(e.updateQueue=null,u!==null)try{a==="input"&&i.type==="radio"&&i.name!=null&&ha(l,i),ci(a,o);var d=ci(a,i);for(o=0;o<u.length;o+=2){var h=u[o],p=u[o+1];h==="style"?ka(l,p):h==="dangerouslySetInnerHTML"?xa(l,p):h==="children"?Dt(l,p):Xi(l,h,p,d)}switch(a){case"input":ii(l,i);break;case"textarea":va(l,i);break;case"select":var g=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!i.multiple;var y=i.value;y!=null?Xn(l,!!i.multiple,y,!1):g!==!!i.multiple&&(i.defaultValue!=null?Xn(l,!!i.multiple,i.defaultValue,!0):Xn(l,!!i.multiple,i.multiple?[]:"",!1))}l[Bt]=i}catch(S){V(e,e.return,S)}}break;case 6:if(ze(n,e),Oe(e),r&4){if(e.stateNode===null)throw Error(x(162));l=e.stateNode,i=e.memoizedProps;try{l.nodeValue=i}catch(S){V(e,e.return,S)}}break;case 3:if(ze(n,e),Oe(e),r&4&&t!==null&&t.memoizedState.isDehydrated)try{Ft(n.containerInfo)}catch(S){V(e,e.return,S)}break;case 4:ze(n,e),Oe(e);break;case 13:ze(n,e),Oe(e),l=e.child,l.flags&8192&&(i=l.memoizedState!==null,l.stateNode.isHidden=i,!i||l.alternate!==null&&l.alternate.memoizedState!==null||(To=Q())),r&4&&$s(e);break;case 22:if(h=t!==null&&t.memoizedState!==null,e.mode&1?(oe=(d=oe)||h,ze(n,e),oe=d):ze(n,e),Oe(e),r&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!h&&e.mode&1)for(N=e,h=e.child;h!==null;){for(p=N=h;N!==null;){switch(g=N,y=g.child,g.tag){case 0:case 11:case 14:case 15:Tt(4,g,g.return);break;case 1:Kn(g,g.return);var k=g.stateNode;if(typeof k.componentWillUnmount=="function"){r=g,t=g.return;try{n=r,k.props=n.memoizedProps,k.state=n.memoizedState,k.componentWillUnmount()}catch(S){V(r,t,S)}}break;case 5:Kn(g,g.return);break;case 22:if(g.memoizedState!==null){Ws(p);continue}}y!==null?(y.return=g,N=y):Ws(p)}h=h.sibling}e:for(h=null,p=e;;){if(p.tag===5){if(h===null){h=p;try{l=p.stateNode,d?(i=l.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(a=p.stateNode,u=p.memoizedProps.style,o=u!=null&&u.hasOwnProperty("display")?u.display:null,a.style.display=wa("display",o))}catch(S){V(e,e.return,S)}}}else if(p.tag===6){if(h===null)try{p.stateNode.nodeValue=d?"":p.memoizedProps}catch(S){V(e,e.return,S)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===e)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===e)break e;for(;p.sibling===null;){if(p.return===null||p.return===e)break e;h===p&&(h=null),p=p.return}h===p&&(h=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:ze(n,e),Oe(e),r&4&&$s(e);break;case 21:break;default:ze(n,e),Oe(e)}}function Oe(e){var n=e.flags;if(n&2){try{e:{for(var t=e.return;t!==null;){if(Hu(t)){var r=t;break e}t=t.return}throw Error(x(160))}switch(r.tag){case 5:var l=r.stateNode;r.flags&32&&(Dt(l,""),r.flags&=-33);var i=Us(e);Ui(e,i,l);break;case 3:case 4:var o=r.stateNode.containerInfo,a=Us(e);Fi(e,a,o);break;default:throw Error(x(161))}}catch(u){V(e,e.return,u)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function xf(e,n,t){N=e,Ku(e)}function Ku(e,n,t){for(var r=(e.mode&1)!==0;N!==null;){var l=N,i=l.child;if(l.tag===22&&r){var o=l.memoizedState!==null||xr;if(!o){var a=l.alternate,u=a!==null&&a.memoizedState!==null||oe;a=xr;var d=oe;if(xr=o,(oe=u)&&!d)for(N=l;N!==null;)o=N,u=o.child,o.tag===22&&o.memoizedState!==null?Bs(l):u!==null?(u.return=o,N=u):Bs(l);for(;i!==null;)N=i,Ku(i),i=i.sibling;N=l,xr=a,oe=d}qs(e)}else l.subtreeFlags&8772&&i!==null?(i.return=l,N=i):qs(e)}}function qs(e){for(;N!==null;){var n=N;if(n.flags&8772){var t=n.alternate;try{if(n.flags&8772)switch(n.tag){case 0:case 11:case 15:oe||ml(5,n);break;case 1:var r=n.stateNode;if(n.flags&4&&!oe)if(t===null)r.componentDidMount();else{var l=n.elementType===n.type?t.memoizedProps:Pe(n.type,t.memoizedProps);r.componentDidUpdate(l,t.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=n.updateQueue;i!==null&&Es(n,i,r);break;case 3:var o=n.updateQueue;if(o!==null){if(t=null,n.child!==null)switch(n.child.tag){case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}Es(n,o,t)}break;case 5:var a=n.stateNode;if(t===null&&n.flags&4){t=a;var u=n.memoizedProps;switch(n.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&t.focus();break;case"img":u.src&&(t.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(n.memoizedState===null){var d=n.alternate;if(d!==null){var h=d.memoizedState;if(h!==null){var p=h.dehydrated;p!==null&&Ft(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(x(163))}oe||n.flags&512&&Ii(n)}catch(g){V(n,n.return,g)}}if(n===e){N=null;break}if(t=n.sibling,t!==null){t.return=n.return,N=t;break}N=n.return}}function Ws(e){for(;N!==null;){var n=N;if(n===e){N=null;break}var t=n.sibling;if(t!==null){t.return=n.return,N=t;break}N=n.return}}function Bs(e){for(;N!==null;){var n=N;try{switch(n.tag){case 0:case 11:case 15:var t=n.return;try{ml(4,n)}catch(u){V(n,t,u)}break;case 1:var r=n.stateNode;if(typeof r.componentDidMount=="function"){var l=n.return;try{r.componentDidMount()}catch(u){V(n,l,u)}}var i=n.return;try{Ii(n)}catch(u){V(n,i,u)}break;case 5:var o=n.return;try{Ii(n)}catch(u){V(n,o,u)}}}catch(u){V(n,n.return,u)}if(n===e){N=null;break}var a=n.sibling;if(a!==null){a.return=n.return,N=a;break}N=n.return}}var wf=Math.ceil,el=Xe.ReactCurrentDispatcher,zo=Xe.ReactCurrentOwner,Ee=Xe.ReactCurrentBatchConfig,D=0,J=null,K=null,ne=0,ve=0,Yn=wn(0),X=0,Yt=null,An=0,gl=0,Po=0,Rt=null,fe=null,To=0,ut=1/0,$e=null,nl=!1,$i=null,mn=null,wr=!1,an=null,tl=0,Lt=0,qi=null,Tr=-1,Rr=0;function ue(){return D&6?Q():Tr!==-1?Tr:Tr=Q()}function gn(e){return e.mode&1?D&2&&ne!==0?ne&-ne:tf.transition!==null?(Rr===0&&(Rr=La()),Rr):(e=O,e!==0||(e=window.event,e=e===void 0?16:Ua(e.type)),e):1}function Ae(e,n,t,r){if(50<Lt)throw Lt=0,qi=null,Error(x(185));Zt(e,t,r),(!(D&2)||e!==J)&&(e===J&&(!(D&2)&&(gl|=t),X===4&&on(e,ne)),he(e,r),t===1&&D===0&&!(n.mode&1)&&(ut=Q()+500,dl&&kn()))}function he(e,n){var t=e.callbackNode;td(e,n);var r=Fr(e,e===J?ne:0);if(r===0)t!==null&&Jo(t),e.callbackNode=null,e.callbackPriority=0;else if(n=r&-r,e.callbackPriority!==n){if(t!=null&&Jo(t),n===1)e.tag===0?nf(Vs.bind(null,e)):iu(Vs.bind(null,e)),Xd(function(){!(D&6)&&kn()}),t=null;else{switch(Aa(r)){case 1:t=to;break;case 4:t=Ta;break;case 16:t=Ir;break;case 536870912:t=Ra;break;default:t=Ir}t=rc(t,Yu.bind(null,e))}e.callbackPriority=n,e.callbackNode=t}}function Yu(e,n){if(Tr=-1,Rr=0,D&6)throw Error(x(327));var t=e.callbackNode;if(tt()&&e.callbackNode!==t)return null;var r=Fr(e,e===J?ne:0);if(r===0)return null;if(r&30||r&e.expiredLanes||n)n=rl(e,r);else{n=r;var l=D;D|=2;var i=Zu();(J!==e||ne!==n)&&($e=null,ut=Q()+500,zn(e,n));do try{_f();break}catch(a){Xu(e,a)}while(!0);ho(),el.current=i,D=l,K!==null?n=0:(J=null,ne=0,n=X)}if(n!==0){if(n===2&&(l=gi(e),l!==0&&(r=l,n=Wi(e,l))),n===1)throw t=Yt,zn(e,0),on(e,r),he(e,Q()),t;if(n===6)on(e,r);else{if(l=e.current.alternate,!(r&30)&&!kf(l)&&(n=rl(e,r),n===2&&(i=gi(e),i!==0&&(r=i,n=Wi(e,i))),n===1))throw t=Yt,zn(e,0),on(e,r),he(e,Q()),t;switch(e.finishedWork=l,e.finishedLanes=r,n){case 0:case 1:throw Error(x(345));case 2:jn(e,fe,$e);break;case 3:if(on(e,r),(r&130023424)===r&&(n=To+500-Q(),10<n)){if(Fr(e,0)!==0)break;if(l=e.suspendedLanes,(l&r)!==r){ue(),e.pingedLanes|=e.suspendedLanes&l;break}e.timeoutHandle=_i(jn.bind(null,e,fe,$e),n);break}jn(e,fe,$e);break;case 4:if(on(e,r),(r&4194240)===r)break;for(n=e.eventTimes,l=-1;0<r;){var o=31-Le(r);i=1<<o,o=n[o],o>l&&(l=o),r&=~i}if(r=l,r=Q()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*wf(r/1960))-r,10<r){e.timeoutHandle=_i(jn.bind(null,e,fe,$e),r);break}jn(e,fe,$e);break;case 5:jn(e,fe,$e);break;default:throw Error(x(329))}}}return he(e,Q()),e.callbackNode===t?Yu.bind(null,e):null}function Wi(e,n){var t=Rt;return e.current.memoizedState.isDehydrated&&(zn(e,n).flags|=256),e=rl(e,n),e!==2&&(n=fe,fe=t,n!==null&&Bi(n)),e}function Bi(e){fe===null?fe=e:fe.push.apply(fe,e)}function kf(e){for(var n=e;;){if(n.flags&16384){var t=n.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var r=0;r<t.length;r++){var l=t[r],i=l.getSnapshot;l=l.value;try{if(!De(i(),l))return!1}catch{return!1}}}if(t=n.child,n.subtreeFlags&16384&&t!==null)t.return=n,n=t;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function on(e,n){for(n&=~Po,n&=~gl,e.suspendedLanes|=n,e.pingedLanes&=~n,e=e.expirationTimes;0<n;){var t=31-Le(n),r=1<<t;e[t]=-1,n&=~r}}function Vs(e){if(D&6)throw Error(x(327));tt();var n=Fr(e,0);if(!(n&1))return he(e,Q()),null;var t=rl(e,n);if(e.tag!==0&&t===2){var r=gi(e);r!==0&&(n=r,t=Wi(e,r))}if(t===1)throw t=Yt,zn(e,0),on(e,n),he(e,Q()),t;if(t===6)throw Error(x(345));return e.finishedWork=e.current.alternate,e.finishedLanes=n,jn(e,fe,$e),he(e,Q()),null}function Ro(e,n){var t=D;D|=1;try{return e(n)}finally{D=t,D===0&&(ut=Q()+500,dl&&kn())}}function Dn(e){an!==null&&an.tag===0&&!(D&6)&&tt();var n=D;D|=1;var t=Ee.transition,r=O;try{if(Ee.transition=null,O=1,e)return e()}finally{O=r,Ee.transition=t,D=n,!(D&6)&&kn()}}function Lo(){ve=Yn.current,U(Yn)}function zn(e,n){e.finishedWork=null,e.finishedLanes=0;var t=e.timeoutHandle;if(t!==-1&&(e.timeoutHandle=-1,Yd(t)),K!==null)for(t=K.return;t!==null;){var r=t;switch(po(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Br();break;case 3:st(),U(me),U(se),So();break;case 5:ko(r);break;case 4:st();break;case 13:U(q);break;case 19:U(q);break;case 10:vo(r.type._context);break;case 22:case 23:Lo()}t=t.return}if(J=e,K=e=hn(e.current,null),ne=ve=n,X=0,Yt=null,Po=gl=An=0,fe=Rt=null,Cn!==null){for(n=0;n<Cn.length;n++)if(t=Cn[n],r=t.interleaved,r!==null){t.interleaved=null;var l=r.next,i=t.pending;if(i!==null){var o=i.next;i.next=l,r.next=o}t.pending=r}Cn=null}return e}function Xu(e,n){do{var t=K;try{if(ho(),br.current=Jr,Zr){for(var r=W.memoizedState;r!==null;){var l=r.queue;l!==null&&(l.pending=null),r=r.next}Zr=!1}if(Ln=0,Z=Y=W=null,Pt=!1,Qt=0,zo.current=null,t===null||t.return===null){X=1,Yt=n,K=null;break}e:{var i=e,o=t.return,a=t,u=n;if(n=ne,a.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var d=u,h=a,p=h.tag;if(!(h.mode&1)&&(p===0||p===11||p===15)){var g=h.alternate;g?(h.updateQueue=g.updateQueue,h.memoizedState=g.memoizedState,h.lanes=g.lanes):(h.updateQueue=null,h.memoizedState=null)}var y=Rs(o);if(y!==null){y.flags&=-257,Ls(y,o,a,i,n),y.mode&1&&Ts(i,d,n),n=y,u=d;var k=n.updateQueue;if(k===null){var S=new Set;S.add(u),n.updateQueue=S}else k.add(u);break e}else{if(!(n&1)){Ts(i,d,n),Ao();break e}u=Error(x(426))}}else if($&&a.mode&1){var T=Rs(o);if(T!==null){!(T.flags&65536)&&(T.flags|=256),Ls(T,o,a,i,n),mo(at(u,a));break e}}i=u=at(u,a),X!==4&&(X=2),Rt===null?Rt=[i]:Rt.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,n&=-n,i.lanes|=n;var f=Au(i,u,n);js(i,f);break e;case 1:a=u;var c=i.type,m=i.stateNode;if(!(i.flags&128)&&(typeof c.getDerivedStateFromError=="function"||m!==null&&typeof m.componentDidCatch=="function"&&(mn===null||!mn.has(m)))){i.flags|=65536,n&=-n,i.lanes|=n;var v=Du(i,a,n);js(i,v);break e}}i=i.return}while(i!==null)}ec(t)}catch(_){n=_,K===t&&t!==null&&(K=t=t.return);continue}break}while(!0)}function Zu(){var e=el.current;return el.current=Jr,e===null?Jr:e}function Ao(){(X===0||X===3||X===2)&&(X=4),J===null||!(An&268435455)&&!(gl&268435455)||on(J,ne)}function rl(e,n){var t=D;D|=2;var r=Zu();(J!==e||ne!==n)&&($e=null,zn(e,n));do try{Sf();break}catch(l){Xu(e,l)}while(!0);if(ho(),D=t,el.current=r,K!==null)throw Error(x(261));return J=null,ne=0,X}function Sf(){for(;K!==null;)Ju(K)}function _f(){for(;K!==null&&!Qc();)Ju(K)}function Ju(e){var n=tc(e.alternate,e,ve);e.memoizedProps=e.pendingProps,n===null?ec(e):K=n,zo.current=null}function ec(e){var n=e;do{var t=n.alternate;if(e=n.return,n.flags&32768){if(t=hf(t,n),t!==null){t.flags&=32767,K=t;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{X=6,K=null;return}}else if(t=gf(t,n,ve),t!==null){K=t;return}if(n=n.sibling,n!==null){K=n;return}K=n=e}while(n!==null);X===0&&(X=5)}function jn(e,n,t){var r=O,l=Ee.transition;try{Ee.transition=null,O=1,Nf(e,n,t,r)}finally{Ee.transition=l,O=r}return null}function Nf(e,n,t,r){do tt();while(an!==null);if(D&6)throw Error(x(327));t=e.finishedWork;var l=e.finishedLanes;if(t===null)return null;if(e.finishedWork=null,e.finishedLanes=0,t===e.current)throw Error(x(177));e.callbackNode=null,e.callbackPriority=0;var i=t.lanes|t.childLanes;if(rd(e,i),e===J&&(K=J=null,ne=0),!(t.subtreeFlags&2064)&&!(t.flags&2064)||wr||(wr=!0,rc(Ir,function(){return tt(),null})),i=(t.flags&15990)!==0,t.subtreeFlags&15990||i){i=Ee.transition,Ee.transition=null;var o=O;O=1;var a=D;D|=4,zo.current=null,yf(e,t),Gu(t,e),Wd(ki),Ur=!!wi,ki=wi=null,e.current=t,xf(t),Gc(),D=a,O=o,Ee.transition=i}else e.current=t;if(wr&&(wr=!1,an=e,tl=l),i=e.pendingLanes,i===0&&(mn=null),Xc(t.stateNode),he(e,Q()),n!==null)for(r=e.onRecoverableError,t=0;t<n.length;t++)l=n[t],r(l.value,{componentStack:l.stack,digest:l.digest});if(nl)throw nl=!1,e=$i,$i=null,e;return tl&1&&e.tag!==0&&tt(),i=e.pendingLanes,i&1?e===qi?Lt++:(Lt=0,qi=e):Lt=0,kn(),null}function tt(){if(an!==null){var e=Aa(tl),n=Ee.transition,t=O;try{if(Ee.transition=null,O=16>e?16:e,an===null)var r=!1;else{if(e=an,an=null,tl=0,D&6)throw Error(x(331));var l=D;for(D|=4,N=e.current;N!==null;){var i=N,o=i.child;if(N.flags&16){var a=i.deletions;if(a!==null){for(var u=0;u<a.length;u++){var d=a[u];for(N=d;N!==null;){var h=N;switch(h.tag){case 0:case 11:case 15:Tt(8,h,i)}var p=h.child;if(p!==null)p.return=h,N=p;else for(;N!==null;){h=N;var g=h.sibling,y=h.return;if(Vu(h),h===d){N=null;break}if(g!==null){g.return=y,N=g;break}N=y}}}var k=i.alternate;if(k!==null){var S=k.child;if(S!==null){k.child=null;do{var T=S.sibling;S.sibling=null,S=T}while(S!==null)}}N=i}}if(i.subtreeFlags&2064&&o!==null)o.return=i,N=o;else e:for(;N!==null;){if(i=N,i.flags&2048)switch(i.tag){case 0:case 11:case 15:Tt(9,i,i.return)}var f=i.sibling;if(f!==null){f.return=i.return,N=f;break e}N=i.return}}var c=e.current;for(N=c;N!==null;){o=N;var m=o.child;if(o.subtreeFlags&2064&&m!==null)m.return=o,N=m;else e:for(o=c;N!==null;){if(a=N,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:ml(9,a)}}catch(_){V(a,a.return,_)}if(a===o){N=null;break e}var v=a.sibling;if(v!==null){v.return=a.return,N=v;break e}N=a.return}}if(D=l,kn(),Fe&&typeof Fe.onPostCommitFiberRoot=="function")try{Fe.onPostCommitFiberRoot(ol,e)}catch{}r=!0}return r}finally{O=t,Ee.transition=n}}return!1}function Hs(e,n,t){n=at(t,n),n=Au(e,n,1),e=pn(e,n,1),n=ue(),e!==null&&(Zt(e,1,n),he(e,n))}function V(e,n,t){if(e.tag===3)Hs(e,e,t);else for(;n!==null;){if(n.tag===3){Hs(n,e,t);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(mn===null||!mn.has(r))){e=at(t,e),e=Du(n,e,1),n=pn(n,e,1),e=ue(),n!==null&&(Zt(n,1,e),he(n,e));break}}n=n.return}}function jf(e,n,t){var r=e.pingCache;r!==null&&r.delete(n),n=ue(),e.pingedLanes|=e.suspendedLanes&t,J===e&&(ne&t)===t&&(X===4||X===3&&(ne&130023424)===ne&&500>Q()-To?zn(e,0):Po|=t),he(e,n)}function nc(e,n){n===0&&(e.mode&1?(n=cr,cr<<=1,!(cr&130023424)&&(cr=4194304)):n=1);var t=ue();e=Ke(e,n),e!==null&&(Zt(e,n,t),he(e,t))}function Ef(e){var n=e.memoizedState,t=0;n!==null&&(t=n.retryLane),nc(e,t)}function Cf(e,n){var t=0;switch(e.tag){case 13:var r=e.stateNode,l=e.memoizedState;l!==null&&(t=l.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(x(314))}r!==null&&r.delete(n),nc(e,t)}var tc;tc=function(e,n,t){if(e!==null)if(e.memoizedProps!==n.pendingProps||me.current)pe=!0;else{if(!(e.lanes&t)&&!(n.flags&128))return pe=!1,mf(e,n,t);pe=!!(e.flags&131072)}else pe=!1,$&&n.flags&1048576&&ou(n,Qr,n.index);switch(n.lanes=0,n.tag){case 2:var r=n.type;Pr(e,n),e=n.pendingProps;var l=lt(n,se.current);nt(n,t),l=No(null,n,r,e,l,t);var i=jo();return n.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$$typeof===void 0?(n.tag=1,n.memoizedState=null,n.updateQueue=null,ge(r)?(i=!0,Vr(n)):i=!1,n.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,xo(n),l.updater=pl,n.stateNode=l,l._reactInternals=n,Pi(n,r,e,t),n=Li(null,n,r,!0,i,t)):(n.tag=0,$&&i&&fo(n),ae(null,n,l,t),n=n.child),n;case 16:r=n.elementType;e:{switch(Pr(e,n),e=n.pendingProps,l=r._init,r=l(r._payload),n.type=r,l=n.tag=zf(r),e=Pe(r,e),l){case 0:n=Ri(null,n,r,e,t);break e;case 1:n=Os(null,n,r,e,t);break e;case 11:n=As(null,n,r,e,t);break e;case 14:n=Ds(null,n,r,Pe(r.type,e),t);break e}throw Error(x(306,r,""))}return n;case 0:return r=n.type,l=n.pendingProps,l=n.elementType===r?l:Pe(r,l),Ri(e,n,r,l,t);case 1:return r=n.type,l=n.pendingProps,l=n.elementType===r?l:Pe(r,l),Os(e,n,r,l,t);case 3:e:{if(Fu(n),e===null)throw Error(x(387));r=n.pendingProps,i=n.memoizedState,l=i.element,fu(e,n),Yr(n,r,null,t);var o=n.memoizedState;if(r=o.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},n.updateQueue.baseState=i,n.memoizedState=i,n.flags&256){l=at(Error(x(423)),n),n=Ms(e,n,r,t,l);break e}else if(r!==l){l=at(Error(x(424)),n),n=Ms(e,n,r,t,l);break e}else for(ye=fn(n.stateNode.containerInfo.firstChild),xe=n,$=!0,Re=null,t=cu(n,null,r,t),n.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(it(),r===l){n=Ye(e,n,t);break e}ae(e,n,r,t)}n=n.child}return n;case 5:return pu(n),e===null&&Ci(n),r=n.type,l=n.pendingProps,i=e!==null?e.memoizedProps:null,o=l.children,Si(r,l)?o=null:i!==null&&Si(r,i)&&(n.flags|=32),Iu(e,n),ae(e,n,o,t),n.child;case 6:return e===null&&Ci(n),null;case 13:return Uu(e,n,t);case 4:return wo(n,n.stateNode.containerInfo),r=n.pendingProps,e===null?n.child=ot(n,null,r,t):ae(e,n,r,t),n.child;case 11:return r=n.type,l=n.pendingProps,l=n.elementType===r?l:Pe(r,l),As(e,n,r,l,t);case 7:return ae(e,n,n.pendingProps,t),n.child;case 8:return ae(e,n,n.pendingProps.children,t),n.child;case 12:return ae(e,n,n.pendingProps.children,t),n.child;case 10:e:{if(r=n.type._context,l=n.pendingProps,i=n.memoizedProps,o=l.value,I(Gr,r._currentValue),r._currentValue=o,i!==null)if(De(i.value,o)){if(i.children===l.children&&!me.current){n=Ye(e,n,t);break e}}else for(i=n.child,i!==null&&(i.return=n);i!==null;){var a=i.dependencies;if(a!==null){o=i.child;for(var u=a.firstContext;u!==null;){if(u.context===r){if(i.tag===1){u=He(-1,t&-t),u.tag=2;var d=i.updateQueue;if(d!==null){d=d.shared;var h=d.pending;h===null?u.next=u:(u.next=h.next,h.next=u),d.pending=u}}i.lanes|=t,u=i.alternate,u!==null&&(u.lanes|=t),bi(i.return,t,n),a.lanes|=t;break}u=u.next}}else if(i.tag===10)o=i.type===n.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(x(341));o.lanes|=t,a=o.alternate,a!==null&&(a.lanes|=t),bi(o,t,n),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===n){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}ae(e,n,l.children,t),n=n.child}return n;case 9:return l=n.type,r=n.pendingProps.children,nt(n,t),l=Ce(l),r=r(l),n.flags|=1,ae(e,n,r,t),n.child;case 14:return r=n.type,l=Pe(r,n.pendingProps),l=Pe(r.type,l),Ds(e,n,r,l,t);case 15:return Ou(e,n,n.type,n.pendingProps,t);case 17:return r=n.type,l=n.pendingProps,l=n.elementType===r?l:Pe(r,l),Pr(e,n),n.tag=1,ge(r)?(e=!0,Vr(n)):e=!1,nt(n,t),Lu(n,r,l),Pi(n,r,l,t),Li(null,n,r,!0,e,t);case 19:return $u(e,n,t);case 22:return Mu(e,n,t)}throw Error(x(156,n.tag))};function rc(e,n){return Pa(e,n)}function bf(e,n,t,r){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function je(e,n,t,r){return new bf(e,n,t,r)}function Do(e){return e=e.prototype,!(!e||!e.isReactComponent)}function zf(e){if(typeof e=="function")return Do(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Ji)return 11;if(e===eo)return 14}return 2}function hn(e,n){var t=e.alternate;return t===null?(t=je(e.tag,n,e.key,e.mode),t.elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=n,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=e.flags&14680064,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,n=e.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t}function Lr(e,n,t,r,l,i){var o=2;if(r=e,typeof e=="function")Do(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case Un:return Pn(t.children,l,i,n);case Zi:o=8,l|=8;break;case ei:return e=je(12,t,n,l|2),e.elementType=ei,e.lanes=i,e;case ni:return e=je(13,t,n,l),e.elementType=ni,e.lanes=i,e;case ti:return e=je(19,t,n,l),e.elementType=ti,e.lanes=i,e;case pa:return hl(t,l,i,n);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case da:o=10;break e;case fa:o=9;break e;case Ji:o=11;break e;case eo:o=14;break e;case tn:o=16,r=null;break e}throw Error(x(130,e==null?e:typeof e,""))}return n=je(o,t,n,l),n.elementType=e,n.type=r,n.lanes=i,n}function Pn(e,n,t,r){return e=je(7,e,r,n),e.lanes=t,e}function hl(e,n,t,r){return e=je(22,e,r,n),e.elementType=pa,e.lanes=t,e.stateNode={isHidden:!1},e}function Ql(e,n,t){return e=je(6,e,null,n),e.lanes=t,e}function Gl(e,n,t){return n=je(4,e.children!==null?e.children:[],e.key,n),n.lanes=t,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}function Pf(e,n,t,r,l){this.tag=n,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=bl(0),this.expirationTimes=bl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=bl(0),this.identifierPrefix=r,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function Oo(e,n,t,r,l,i,o,a,u){return e=new Pf(e,n,t,a,u),n===1?(n=1,i===!0&&(n|=8)):n=0,i=je(3,null,null,n),e.current=i,i.stateNode=e,i.memoizedState={element:r,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},xo(i),e}function Tf(e,n,t){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Fn,key:r==null?null:""+r,children:e,containerInfo:n,implementation:t}}function lc(e){if(!e)return yn;e=e._reactInternals;e:{if(Mn(e)!==e||e.tag!==1)throw Error(x(170));var n=e;do{switch(n.tag){case 3:n=n.stateNode.context;break e;case 1:if(ge(n.type)){n=n.stateNode.__reactInternalMemoizedMergedChildContext;break e}}n=n.return}while(n!==null);throw Error(x(171))}if(e.tag===1){var t=e.type;if(ge(t))return lu(e,t,n)}return n}function ic(e,n,t,r,l,i,o,a,u){return e=Oo(t,r,!0,e,l,i,o,a,u),e.context=lc(null),t=e.current,r=ue(),l=gn(t),i=He(r,l),i.callback=n??null,pn(t,i,l),e.current.lanes=l,Zt(e,l,r),he(e,r),e}function vl(e,n,t,r){var l=n.current,i=ue(),o=gn(l);return t=lc(t),n.context===null?n.context=t:n.pendingContext=t,n=He(i,o),n.payload={element:e},r=r===void 0?null:r,r!==null&&(n.callback=r),e=pn(l,n,o),e!==null&&(Ae(e,l,o,i),Cr(e,l,o)),o}function ll(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Qs(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var t=e.retryLane;e.retryLane=t!==0&&t<n?t:n}}function Mo(e,n){Qs(e,n),(e=e.alternate)&&Qs(e,n)}function Rf(){return null}var oc=typeof reportError=="function"?reportError:function(e){console.error(e)};function Io(e){this._internalRoot=e}yl.prototype.render=Io.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(x(409));vl(e,n,null,null)};yl.prototype.unmount=Io.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;Dn(function(){vl(null,e,null,null)}),n[Ge]=null}};function yl(e){this._internalRoot=e}yl.prototype.unstable_scheduleHydration=function(e){if(e){var n=Ma();e={blockedOn:null,target:e,priority:n};for(var t=0;t<ln.length&&n!==0&&n<ln[t].priority;t++);ln.splice(t,0,e),t===0&&Fa(e)}};function Fo(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function xl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Gs(){}function Lf(e,n,t,r,l){if(l){if(typeof r=="function"){var i=r;r=function(){var d=ll(o);i.call(d)}}var o=ic(n,r,e,0,null,!1,!1,"",Gs);return e._reactRootContainer=o,e[Ge]=o.current,qt(e.nodeType===8?e.parentNode:e),Dn(),o}for(;l=e.lastChild;)e.removeChild(l);if(typeof r=="function"){var a=r;r=function(){var d=ll(u);a.call(d)}}var u=Oo(e,0,!1,null,null,!1,!1,"",Gs);return e._reactRootContainer=u,e[Ge]=u.current,qt(e.nodeType===8?e.parentNode:e),Dn(function(){vl(n,u,t,r)}),u}function wl(e,n,t,r,l){var i=t._reactRootContainer;if(i){var o=i;if(typeof l=="function"){var a=l;l=function(){var u=ll(o);a.call(u)}}vl(n,o,e,l)}else o=Lf(t,n,e,l,r);return ll(o)}Da=function(e){switch(e.tag){case 3:var n=e.stateNode;if(n.current.memoizedState.isDehydrated){var t=_t(n.pendingLanes);t!==0&&(ro(n,t|1),he(n,Q()),!(D&6)&&(ut=Q()+500,kn()))}break;case 13:Dn(function(){var r=Ke(e,1);if(r!==null){var l=ue();Ae(r,e,1,l)}}),Mo(e,1)}};lo=function(e){if(e.tag===13){var n=Ke(e,134217728);if(n!==null){var t=ue();Ae(n,e,134217728,t)}Mo(e,134217728)}};Oa=function(e){if(e.tag===13){var n=gn(e),t=Ke(e,n);if(t!==null){var r=ue();Ae(t,e,n,r)}Mo(e,n)}};Ma=function(){return O};Ia=function(e,n){var t=O;try{return O=e,n()}finally{O=t}};fi=function(e,n,t){switch(n){case"input":if(ii(e,t),n=t.name,t.type==="radio"&&n!=null){for(t=e;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+n)+'][type="radio"]'),n=0;n<t.length;n++){var r=t[n];if(r!==e&&r.form===e.form){var l=cl(r);if(!l)throw Error(x(90));ga(r),ii(r,l)}}}break;case"textarea":va(e,t);break;case"select":n=t.value,n!=null&&Xn(e,!!t.multiple,n,!1)}};Na=Ro;ja=Dn;var Af={usingClientEntryPoint:!1,Events:[er,Bn,cl,Sa,_a,Ro]},wt={findFiberByHostInstance:En,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Df={bundleType:wt.bundleType,version:wt.version,rendererPackageName:wt.rendererPackageName,rendererConfig:wt.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Xe.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=ba(e),e===null?null:e.stateNode},findFiberByHostInstance:wt.findFiberByHostInstance||Rf,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var kr=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!kr.isDisabled&&kr.supportsFiber)try{ol=kr.inject(Df),Fe=kr}catch{}}ke.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Af;ke.createPortal=function(e,n){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Fo(n))throw Error(x(200));return Tf(e,n,null,t)};ke.createRoot=function(e,n){if(!Fo(e))throw Error(x(299));var t=!1,r="",l=oc;return n!=null&&(n.unstable_strictMode===!0&&(t=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onRecoverableError!==void 0&&(l=n.onRecoverableError)),n=Oo(e,1,!1,null,null,t,!1,r,l),e[Ge]=n.current,qt(e.nodeType===8?e.parentNode:e),new Io(n)};ke.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(x(188)):(e=Object.keys(e).join(","),Error(x(268,e)));return e=ba(n),e=e===null?null:e.stateNode,e};ke.flushSync=function(e){return Dn(e)};ke.hydrate=function(e,n,t){if(!xl(n))throw Error(x(200));return wl(null,e,n,!0,t)};ke.hydrateRoot=function(e,n,t){if(!Fo(e))throw Error(x(405));var r=t!=null&&t.hydratedSources||null,l=!1,i="",o=oc;if(t!=null&&(t.unstable_strictMode===!0&&(l=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),n=ic(n,null,e,1,t??null,l,!1,i,o),e[Ge]=n.current,qt(e),r)for(e=0;e<r.length;e++)t=r[e],l=t._getVersion,l=l(t._source),n.mutableSourceEagerHydrationData==null?n.mutableSourceEagerHydrationData=[t,l]:n.mutableSourceEagerHydrationData.push(t,l);return new yl(n)};ke.render=function(e,n,t){if(!xl(n))throw Error(x(200));return wl(null,e,n,!1,t)};ke.unmountComponentAtNode=function(e){if(!xl(e))throw Error(x(40));return e._reactRootContainer?(Dn(function(){wl(null,null,e,!1,function(){e._reactRootContainer=null,e[Ge]=null})}),!0):!1};ke.unstable_batchedUpdates=Ro;ke.unstable_renderSubtreeIntoContainer=function(e,n,t,r){if(!xl(t))throw Error(x(200));if(e==null||e._reactInternals===void 0)throw Error(x(38));return wl(e,n,t,!1,r)};ke.version="18.3.1-next-f1338f8080-20240426";function sc(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(sc)}catch(e){console.error(e)}}sc(),sa.exports=ke;var Of=sa.exports,Ks=Of;Zl.createRoot=Ks.createRoot,Zl.hydrateRoot=Ks.hydrateRoot;function Mf({systemStatus:e,activeProvider:n,taskId:t}){const[r,l]=R.useState(!1),i=()=>{t&&navigator.clipboard.writeText(t).then(()=>{l(!0),setTimeout(()=>l(!1),1500)})},o=()=>e==="healthy"?"sdot ok":e==="connecting"?"sdot warn":"sdot err",a=()=>e==="healthy"?`Online · ${n||"Auto-configured"}`:e==="connecting"?"Connecting to backend…":"Backend offline";return s.jsxs("header",{className:"topbar",children:[s.jsxs("div",{className:"logo",children:[s.jsx("span",{className:"logo-symbol",children:"⟡"}),"ArcPilot ",s.jsx("span",{className:"logo-sub",children:"/ Orchestrator"}),s.jsx("span",{className:"logo-tag",children:"v2.0 LangGraph"})]}),s.jsx("div",{className:"vdiv"}),s.jsxs("div",{className:"top-status",children:[s.jsx("span",{className:o()}),s.jsx("span",{className:"status-text",children:a()})]}),t&&s.jsxs("div",{className:"tid-bar",children:[s.jsx("span",{className:"tid-label",children:"SESSION"}),s.jsx("span",{className:"tid-val",children:t}),s.jsx("button",{className:"tid-copy-btn",onClick:i,title:"Copy Session ID",children:r?"✓ COPIED":"copy"})]}),s.jsx("style",{children:`
        .topbar {
          grid-column: 1 / -1;
          background: var(--bg2);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 0 20px;
          z-index: 20;
          height: 52px;
        }
        .logo {
          font-family: var(--mono);
          font-size: 13px;
          font-weight: 700;
          color: var(--accent2);
          letter-spacing: 2px;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .logo-symbol {
          color: var(--accent);
          font-size: 16px;
        }
        .logo-sub {
          color: var(--ink3);
          font-weight: 400;
        }
        .logo-tag {
          font-size: 9.5px;
          background: var(--accent-bg);
          color: var(--accent2);
          padding: 2px 7px;
          border-radius: 12px;
          border: 1px solid rgba(129, 140, 248, 0.3);
          letter-spacing: 0.5px;
        }
        .vdiv {
          width: 1px;
          height: 18px;
          background: var(--border2);
        }
        .top-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11.5px;
          color: var(--ink3);
        }
        .sdot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--ink3);
          flex-shrink: 0;
        }
        .sdot.ok {
          background: var(--green);
          box-shadow: 0 0 8px var(--green);
        }
        .sdot.warn {
          background: var(--yellow);
          box-shadow: 0 0 8px var(--yellow);
        }
        .sdot.err {
          background: var(--red);
          box-shadow: 0 0 8px var(--red);
        }
        .tid-bar {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--mono);
          font-size: 11px;
          color: var(--ink3);
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 4px 10px;
        }
        .tid-label {
          font-size: 9.5px;
          color: var(--ink3);
          font-weight: 700;
          letter-spacing: 0.8px;
        }
        .tid-val {
          color: var(--accent2);
          font-weight: 600;
        }
        .tid-copy-btn {
          background: none;
          border: none;
          color: var(--ink3);
          cursor: pointer;
          font-size: 10px;
          font-family: var(--font);
          padding: 2px 4px;
          border-radius: 4px;
          transition: all 0.15s;
        }
        .tid-copy-btn:hover {
          color: var(--accent2);
          background: var(--bg4);
        }
      `})]})}const If=[{id:"requirements",label:"Requirements",desc:"Decomposition & Spec",type:"input"},{id:"user_stories",label:"User Stories",desc:"Agile Stories & Matrix",type:"automated"},{id:"product_owner_review",label:"Product Owner Review",desc:"Review & Approval Gate",type:"human_review"},{id:"design",label:"Architecture & Design",desc:"Functional & Tech Specs",type:"automated"},{id:"design_review",label:"Design Review",desc:"Architecture Signoff Gate",type:"human_review"},{id:"code_generation",label:"Code Generation",desc:"Multi-File Backend & AST",type:"automated"},{id:"code_review",label:"Code Review",desc:"Quality & AST Review Gate",type:"human_review"},{id:"security_review",label:"Security Review",desc:"SAST & Secret Audit Gate",type:"human_review"},{id:"test_generation",label:"Test Case Generation",desc:"Unit & API Test Suite",type:"automated"},{id:"test_cases_review",label:"Test Cases Review",desc:"Coverage & Test Gate",type:"human_review"},{id:"qa_testing",label:"QA Testing & Repair",desc:"Subprocess Execution & Fix",type:"automated"},{id:"qa_testing_review",label:"QA Testing Review",desc:"Quality Gate Signoff",type:"human_review"},{id:"deployment",label:"Deployment & Packaging",desc:"Docker & ZIP Archive",type:"automated"}],Ff={product_owner_review:{title:"Product Owner Review Gate",icon:"👤",stage:"product_owner_review",desc:"Review the generated requirements and agile user stories before architecture design begins.",approveLabel:"Approve & Continue",rejectLabel:"Reject / Request Changes",nextStageLabel:"Architecture & Design",feedbackPlaceholder:"Enter feedback or requested revisions (e.g. The user stories should include acceptance criteria for budget validation and weather-based recommendations)...",primaryTab:"user_stories"},design_review:{title:"Architecture & Design Review Gate",icon:"🏗️",stage:"design_review",desc:"Review the Functional Design (FDD) and Technical Architecture (TDD) before code implementation.",approveLabel:"Approve & Continue",rejectLabel:"Reject / Request Changes",nextStageLabel:"Code Generation",feedbackPlaceholder:"Enter architecture feedback or schema changes required...",primaryTab:"design"},code_review:{title:"Code Review & Quality Gate",icon:"💻",stage:"code_review",desc:"Review the multi-file implementation and automated AST/static syntax analysis report.",approveLabel:"Approve & Continue",rejectLabel:"Reject / Request Changes",nextStageLabel:"Security Review",feedbackPlaceholder:"Enter code quality revision notes or refactoring requests...",primaryTab:"code"},security_review:{title:"Security & Vulnerability Review Gate",icon:"🔒",stage:"security_review",desc:"Review Bandit SAST scan findings, secret audit logs, and security recommendations.",approveLabel:"Approve & Continue",rejectLabel:"Reject / Request Changes",nextStageLabel:"Test Generation",feedbackPlaceholder:"Enter security remediation requirements...",primaryTab:"security"},test_cases_review:{title:"Test Cases Review Gate",icon:"🧪",stage:"test_cases_review",desc:"Review the generated test suite covering functional requirements and integration points.",approveLabel:"Approve & Continue",rejectLabel:"Reject / Request Changes",nextStageLabel:"QA Testing",feedbackPlaceholder:"Enter missing edge cases or additional test scenarios required...",primaryTab:"qa"},qa_testing_review:{title:"QA Testing Review & Signoff",icon:"🚦",stage:"qa_testing_review",desc:"Review test execution outputs, assertion outcomes, and automated repair attempt history.",approveLabel:"Approve & Continue",rejectLabel:"Reject / Request Changes",nextStageLabel:"Deployment & Packaging",feedbackPlaceholder:"Enter QA feedback or unresolved test failures to repair...",primaryTab:"qa"}},Kl={Groq:["qwen/qwen3.8-27b","openai/gpt-oss-120b","llama-3.3-70b-versatile","llama-3.1-70b-versatile","mixtral-8x7b-32768","gemma2-9b-it"],OpenAI:["gpt-4o","gpt-4o-mini","gpt-4-turbo","gpt-3.5-turbo"],Gemini:["gemini-3.8-flash","gemini-1.5-pro","gemini-1.5-flash"]};function Yl(e,n,t="text/plain"){const r=new Blob([e],{type:t}),l=URL.createObjectURL(r),i=document.createElement("a");i.href=l,i.download=n,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(l)}function Ar(e,n,t,r="task"){if(!t)return;const l=new Date().toISOString().replace(/[:.]/g,"-"),i=`ArcPilot-${e}-${l}`;if(n==="json"){const o=JSON.stringify(t,null,2);Yl(o,`${i}.json`,"application/json")}else if(n==="txt"){const o=typeof t=="string"?t:JSON.stringify(t,null,2);Yl(o,`${i}.txt`,"text/plain")}else if(n==="html"){const o=typeof t=="string"?t:JSON.stringify(t,null,2),a=`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>ArcPilot Export: ${e.toUpperCase()}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 32px; background: #f8fafc; color: #1e293b; line-height: 1.6; }
    .header { margin-bottom: 24px; padding-bottom: 16px; border-bottom: 2px solid #e2e8f0; }
    h1 { margin: 0 0 8px 0; font-size: 24px; color: #0f172a; }
    .meta { font-size: 13px; color: #64748b; font-family: monospace; }
    pre { background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #cbd5e1; overflow-x: auto; font-size: 13px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>ArcPilot SDLC Export — ${e.replace(/_/g," ").toUpperCase()}</h1>
    <div class="meta">Workflow Task ID: ${r} | Exported: ${new Date().toLocaleString()}</div>
  </div>
  <pre>${o.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</pre>
</body>
</html>`;Yl(a,`${i}.html`,"text/html")}}class Xl extends Error{constructor(n,t,r){super(n),this.status=t,this.detail=r,this.name="ApiError"}}async function nn(e,n={}){const t={"Content-Type":"application/json",...n.headers||{}};try{const r=await fetch(e,{...n,headers:t});let l;if((r.headers.get("content-type")||"").includes("application/json")?l=await r.json():l=await r.text(),!r.ok){const o=l&&l.detail||l&&l.message||r.statusText||"API request failed";throw new Xl(o,r.status,l)}return l}catch(r){throw r instanceof Xl?r:new Xl(r.message||"Network connection failed",0,null)}}const qe={async checkHealth(e=""){return nn(`${e}/health`)},async getLLMConfig(e=""){return nn(`${e}/config/llm`)},async configureLLM(e="",n){return nn(`${e}/config/llm`,{method:"POST",body:JSON.stringify(n)})},async startWorkflow(e="",n,t={}){return nn(`${e}/workflow/start`,{method:"POST",body:JSON.stringify({project_name:n,initial_context:t})})},async submitRequirements(e="",n,t){return nn(`${e}/workflow/${n}/requirements`,{method:"POST",body:JSON.stringify({task:t})})},async submitReview(e="",n,t){const r={workflow_id:n,stage:t.stage,decision:t.decision,feedback:t.feedback||"",review_status:t.decision==="approve"?"approved":"needs_revision",feedback_reason:t.feedback||""};return nn(`${e}/workflow/${n}/review`,{method:"POST",body:JSON.stringify(r)})},async getState(e="",n){return nn(`${e}/workflow/${n}/state`)},async listArtifacts(e="",n){return nn(`${e}/workflow/${n}/artifacts`)},getDownloadZipUrl(e="",n){return`${e}/workflow/${n}/download`}};function Uf({baseUrl:e,setBaseUrl:n,llmConfig:t,onApplyConfig:r,isApplyingConfig:l,state:i,taskId:o}){const[a,u]=R.useState(t.provider||"Groq"),[d,h]=R.useState(t.model||"llama-3.3-70b-versatile"),[p,g]=R.useState(""),[y,k]=R.useState(e);R.useEffect(()=>{t.provider&&u(t.provider),t.model&&h(t.model)},[t]);const S=c=>{const m=c.target.value;u(m);const v=Kl[m]||[];v.length>0&&h(v[0])},T=()=>{r({provider:a,model:d,apiKey:p.trim()||void 0,url:y.trim().replace(/\/+$/,"")||"http://localhost:8000"})},f=[];return(i!=null&&i.requirements||i!=null&&i.structured_requirements)&&f.push({id:"requirements",name:"Requirements Spec",data:i.structured_requirements||i.requirements}),i!=null&&i.user_stories&&i.user_stories.length>0&&f.push({id:"user_stories",name:"User Stories & Backlog",data:i.user_stories}),i!=null&&i.traceability_matrix&&i.traceability_matrix.length>0&&f.push({id:"traceability",name:"Traceability Matrix",data:i.traceability_matrix}),i!=null&&i.design_documents&&f.push({id:"design",name:"Architecture & Design",data:i.design_documents}),i!=null&&i.generated_files&&Object.keys(i.generated_files).length>0&&f.push({id:"code",name:"Code Files",data:i.generated_files}),(i!=null&&i.security_report||i!=null&&i.security_review_comments)&&f.push({id:"security",name:"Security Audit Report",data:i.security_report||i.security_review_comments}),(i!=null&&i.test_cases||i!=null&&i.qa_report)&&f.push({id:"qa",name:"Test Suite & QA Report",data:{tests:i.test_cases,qa:i.qa_report}}),(i!=null&&i.deployment_result||(i==null?void 0:i.deployment_status)==="success")&&f.push({id:"deployment",name:"Deployment Package",data:i.deployment_result}),s.jsxs("aside",{className:"sb-left",children:[s.jsxs("div",{className:"sb-section",children:[s.jsx("div",{className:"sb-title",children:"LLM Configuration"}),s.jsxs("div",{className:"sb-form",children:[s.jsxs("div",{className:"fld",children:[s.jsx("label",{children:"Provider"}),s.jsx("select",{value:a,onChange:S,children:Object.keys(Kl).map(c=>s.jsx("option",{value:c,children:c},c))})]}),s.jsxs("div",{className:"fld",children:[s.jsx("label",{htmlFor:"input-sidebar-model",children:"Model"}),s.jsx("input",{id:"input-sidebar-model",type:"text",list:"sidebar-model-suggestions",value:d,onChange:c=>h(c.target.value),placeholder:"e.g. gemini-3.8-flash, qwen/qwen3.8-27b",autoComplete:"off"}),s.jsx("datalist",{id:"sidebar-model-suggestions",children:(Kl[a]||[]).map(c=>s.jsx("option",{value:c,children:c},c))})]}),s.jsxs("div",{className:"fld",children:[s.jsx("label",{children:"API Key"}),s.jsx("input",{type:"password",value:p,onChange:c=>g(c.target.value),placeholder:"Enter API key…"})]}),s.jsxs("div",{className:"fld",children:[s.jsx("label",{children:"Backend URL"}),s.jsx("input",{type:"text",value:y,onChange:c=>k(c.target.value),placeholder:"http://localhost:8000"})]}),s.jsx("button",{className:"btn btn-accent",onClick:T,disabled:l,children:l?s.jsxs(s.Fragment,{children:[s.jsx("span",{className:"spin"})," Applying…"]}):"Apply Configuration"}),s.jsxs("div",{className:`pill ${t.provider?"ok":"warn"}`,children:[s.jsx("span",{className:"dot"}),t.provider?`Connected: ${t.provider} / ${t.model||"active"}`:"Auto-configured via .env"]})]})]}),s.jsxs("div",{className:"sb-section",children:[s.jsx("div",{className:"sb-title",children:"Project Exports & Artifacts"}),s.jsx("div",{className:"dl-list",children:f.length===0?s.jsx("div",{className:"dl-empty",children:"Generated artifacts appear here as stages complete."}):f.map(c=>s.jsxs("div",{className:"dl-item",children:[s.jsx("div",{className:"dl-item-name",children:c.name}),s.jsxs("div",{className:"dl-btns",children:[s.jsx("button",{className:"dl-btn",onClick:()=>Ar(c.id,"txt",c.data,o),title:"Export as TXT",children:"TXT"}),s.jsx("button",{className:"dl-btn",onClick:()=>Ar(c.id,"json",c.data,o),title:"Export as JSON",children:"JSON"}),s.jsx("button",{className:"dl-btn",onClick:()=>Ar(c.id,"html",c.data,o),title:"Export as HTML",children:"HTML"}),c.id==="deployment"&&o&&s.jsx("a",{href:qe.getDownloadZipUrl(e,o),className:"dl-btn dl-btn-zip",download:!0,title:"Download Package ZIP",children:"ZIP"})]})]},c.id))})]}),s.jsx("style",{children:`
        .sb-left {
          background: var(--bg2);
          border-right: 1px solid var(--border);
          padding: 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .sb-section {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .sb-title {
          font-size: 9.5px;
          font-weight: 700;
          color: var(--ink3);
          letter-spacing: 2px;
          text-transform: uppercase;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border);
        }
        .sb-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .dl-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .dl-item {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 8px 10px;
        }
        .dl-item-name {
          font-size: 11.5px;
          color: var(--ink2);
          font-weight: 500;
          margin-bottom: 6px;
        }
        .dl-btns {
          display: flex;
          gap: 4px;
        }
        .dl-btn {
          flex: 1;
          padding: 4px 0;
          border-radius: 4px;
          border: 1px solid var(--border);
          background: var(--bg4);
          color: var(--ink3);
          font-size: 10px;
          font-weight: 600;
          cursor: pointer;
          font-family: var(--mono);
          text-align: center;
          text-decoration: none;
          transition: all 0.15s;
        }
        .dl-btn:hover {
          border-color: var(--accent);
          color: var(--accent2);
        }
        .dl-btn-zip {
          color: var(--green);
          font-weight: 700;
          border-color: var(--green-border);
        }
        .dl-btn-zip:hover {
          background: var(--green-bg);
          color: var(--green);
        }
        .dl-empty {
          font-size: 11px;
          color: var(--ink3);
          text-align: center;
          padding: 16px 0;
        }
      `})]})}function $f({progress:e=0,currentNode:n,nextRequiredInput:t,currentStageLabel:r,stages:l=[],workflowStatus:i="idle"}){const o={};Array.isArray(l)&&l.forEach(u=>{o[u.id]=u});const a=Math.min(100,Math.max(0,parseInt(e,10)||0));return s.jsxs("aside",{className:"sb-right",children:[s.jsx("div",{className:"sb-title",children:"Workflow Progress"}),s.jsxs("div",{className:"prog-card",children:[s.jsx("div",{className:"prog-bar",children:s.jsx("div",{className:"prog-fill",style:{width:`${a}%`}})}),s.jsxs("div",{className:"prog-row",children:[s.jsx("span",{className:"prog-label",children:r||"Initialized"}),s.jsxs("span",{className:"prog-pct",children:[a,"%"]})]})]}),s.jsxs("div",{className:"node-status-group",children:[n&&s.jsxs("div",{className:"info-box node-box",children:[s.jsx("div",{className:"info-box-label",children:"CURRENT PROCESSING NODE"}),s.jsx("div",{className:"info-box-val",children:n})]}),t&&t!=="end"&&s.jsxs("div",{className:"info-box next-box",children:[s.jsx("div",{className:"info-box-label",children:"WAITING FOR HUMAN INPUT"}),s.jsx("div",{className:"info-box-val next-val",children:t})]})]}),s.jsx("div",{className:"stages-track",children:If.map((u,d)=>{let p=(o[u.id]||{}).status||(d===0?"active":"locked"),g=d+1,y=u.desc;return p==="completed"?(g="✓",y="Completed"):p==="waiting_for_input"?(g="⏳",y="Waiting for decision"):p==="active"&&(g="⟳",y="In Progress…"),s.jsxs("div",{className:`stage-item ${p}`,children:[s.jsx("div",{className:"stage-node",children:g}),s.jsxs("div",{className:"stage-info",children:[s.jsx("div",{className:"stage-name",children:u.label}),s.jsx("div",{className:"stage-desc",children:y})]})]},u.id)})}),s.jsx("style",{children:`
        .sb-right {
          background: var(--bg2);
          border-left: 1px solid var(--border);
          padding: 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .prog-card {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 14px;
        }
        .prog-bar {
          height: 6px;
          background: var(--bg4);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 8px;
        }
        .prog-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent), var(--green));
          border-radius: 4px;
          transition: width 0.45s ease;
        }
        .prog-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .prog-label {
          font-size: 11.5px;
          font-weight: 600;
          color: var(--ink2);
        }
        .prog-pct {
          font-size: 13.5px;
          font-family: var(--mono);
          font-weight: 700;
          color: var(--green);
        }
        .node-status-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .info-box {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 9px 12px;
        }
        .info-box-label {
          font-size: 9px;
          color: var(--ink3);
          text-transform: uppercase;
          letter-spacing: 1.2px;
          margin-bottom: 3px;
          font-weight: 700;
        }
        .info-box-val {
          font-size: 11.5px;
          font-family: var(--mono);
          color: var(--accent2);
          word-break: break-all;
        }
        .next-box {
          border-color: rgba(245, 158, 11, 0.3);
          background: rgba(245, 158, 11, 0.06);
        }
        .next-box .info-box-label {
          color: var(--yellow);
        }
        .next-box .next-val {
          color: var(--yellow);
          font-weight: 700;
        }
        .stages-track {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .stage-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 8px 10px;
          border-radius: var(--radius-sm);
          border: 1px solid transparent;
          transition: all 0.18s;
        }
        .stage-item.completed {
          opacity: 1;
        }
        .stage-item.completed .stage-node {
          background: var(--green);
          border-color: var(--green);
          color: #081c15;
          font-weight: 700;
        }
        .stage-item.completed .stage-name {
          color: var(--green);
          font-weight: 600;
        }
        .stage-item.waiting_for_input {
          background: rgba(245, 158, 11, 0.08);
          border-color: rgba(245, 158, 11, 0.3);
          opacity: 1;
        }
        .stage-item.waiting_for_input .stage-node {
          background: var(--yellow);
          border-color: var(--yellow);
          color: #1c1305;
          box-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
          animation: pulse 1.8s infinite;
        }
        .stage-item.waiting_for_input .stage-name {
          color: var(--yellow);
          font-weight: 700;
        }
        .stage-item.active {
          background: rgba(99, 102, 241, 0.08);
          border-color: rgba(99, 102, 241, 0.3);
          opacity: 1;
        }
        .stage-item.active .stage-node {
          background: var(--accent);
          border-color: var(--accent);
          color: #fff;
          animation: pulse 1.8s infinite;
        }
        .stage-item.active .stage-name {
          color: var(--accent2);
          font-weight: 700;
        }
        .stage-item.locked {
          opacity: 0.38;
        }
        .stage-node {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--bg4);
          border: 1.5px solid var(--border2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-family: var(--mono);
          font-weight: 700;
          color: var(--ink3);
          flex-shrink: 0;
          margin-top: 1px;
        }
        .stage-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .stage-name {
          font-size: 12px;
          color: var(--ink);
        }
        .stage-desc {
          font-size: 10px;
          color: var(--ink3);
          font-family: var(--mono);
          margin-top: 1px;
        }
      `})]})}function qf({taskId:e,workflowState:n,isWorkflowStarting:t,onStartWorkflow:r}){const[l,i]=R.useState("AI Trip Planner"),[o,a]=R.useState("Build an intelligent travel planning application where a user provides destination, duration, budget and interests. The system should retrieve relevant weather, currency and travel information and generate a personalized day-by-day itinerary."),[u,d]=R.useState(""),h=!!(e&&(n!=null&&n.requirements||n!=null&&n.structured_requirements||n!=null&&n.progress&&n.progress>10)),p=g=>{if(g.preventDefault(),!l.trim()){d("Please enter a project name.");return}if(!o.trim()){d("Please enter your project requirements description.");return}d(""),r({projectName:l.trim(),requirementsText:o.trim()})};return s.jsxs("div",{className:`init-card ${h?"card-completed":"card-active"}`,id:"workflow-stage-card",children:[s.jsxs("div",{className:"card-head",children:[s.jsx("div",{className:`card-badge ${h?"done":"active"}`,children:h?"✓":"01"}),s.jsxs("div",{className:"card-title-group",children:[s.jsx("div",{className:"card-title",children:"Project Requirements Specification"}),s.jsx("div",{className:"card-sub",children:h?"Requirements submitted and decomposed with LLM":"Define requirements in natural language to initiate SDLC workflow"})]})]}),s.jsxs("div",{className:"init-body",children:[u&&s.jsxs("div",{className:"init-error-banner",children:[s.jsx("span",{children:"✕"})," ",u]}),s.jsxs("div",{className:"fld",children:[s.jsx("label",{htmlFor:"input-project-name",children:"Project Name"}),s.jsx("input",{id:"input-project-name",type:"text",value:l,onChange:g=>i(g.target.value),disabled:h||t,placeholder:"e.g. AI Trip Planner"})]}),s.jsxs("div",{className:"fld",children:[s.jsx("label",{htmlFor:"input-requirements-text",children:"Natural-Language Requirements"}),s.jsx("textarea",{id:"input-requirements-text",className:"init-ta",value:o,onChange:g=>a(g.target.value),disabled:h||t,rows:4,placeholder:"Describe software requirements..."})]}),s.jsxs("div",{className:"init-actions",children:[!h&&s.jsx("button",{type:"button",className:"btn btn-accent btn-start-workflow",onClick:p,disabled:t,id:"btn-start-sdlc-workflow",children:t?s.jsxs(s.Fragment,{children:[s.jsx("span",{className:"spin"}),s.jsx("span",{children:"Decomposing Requirements…"})]}):s.jsxs(s.Fragment,{children:[s.jsx("span",{children:"Start SDLC Workflow"}),s.jsx("span",{children:"→"})]})}),h&&s.jsxs("div",{className:"status-locked-pill",children:[s.jsx("span",{className:"pill-dot",children:"✓"}),s.jsx("span",{children:"Requirements Active in Workflow"})]})]})]}),s.jsx("style",{children:`
        .init-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }
        .init-card.card-active {
          border-color: rgba(99, 102, 241, 0.4);
        }
        .init-card.card-completed {
          opacity: 0.95;
        }
        .card-head {
          padding: 14px 18px;
          background: var(--bg3);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .card-badge {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: var(--bg4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--mono);
          font-size: 11px;
          font-weight: 700;
          color: var(--ink3);
          flex-shrink: 0;
        }
        .card-badge.active {
          background: var(--accent);
          color: #fff;
        }
        .card-badge.done {
          background: var(--green);
          color: #081c15;
        }
        .card-title-group {
          flex: 1;
        }
        .card-title {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--ink);
        }
        .card-sub {
          font-size: 11.5px;
          color: var(--ink3);
          margin-top: 1px;
        }
        .init-body {
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .init-error-banner {
          background: var(--red-bg);
          color: var(--red-light);
          border: 1px solid var(--red-border);
          border-radius: var(--radius-sm);
          padding: 8px 12px;
          font-size: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .init-ta {
          background: var(--bg3);
          border: 1px solid var(--border);
          color: var(--ink);
          border-radius: var(--radius-sm);
          padding: 11px 13px;
          font-family: var(--font);
          font-size: 12.5px;
          width: 100%;
          min-height: 90px;
          resize: vertical;
          outline: none;
          line-height: 1.6;
          transition: border-color 0.18s;
        }
        .init-ta:focus {
          border-color: var(--accent);
        }
        .init-actions {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-top: 4px;
        }
        .btn-start-workflow {
          padding: 11px 22px;
          font-size: 13px;
          border-radius: var(--radius-sm);
        }
        .status-locked-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          color: var(--green);
          background: var(--green-bg);
          border: 1px solid var(--green-border);
          padding: 6px 12px;
          border-radius: 20px;
        }
        .pill-dot {
          font-weight: 700;
        }
      `})]})}function Wf({stageKey:e,onSubmitReview:n,isSubmitting:t,error:r,successMessage:l,onClearError:i}){const o=Ff[e]||{title:"Human Review Gate",icon:"👤",desc:"Review the generated artifacts and provide your approval or revision decision.",approveLabel:"Approve & Continue",rejectLabel:"Reject / Request Changes",nextStageLabel:"Next Stage",feedbackPlaceholder:"Enter feedback or requested revisions..."},[a,u]=R.useState("approve"),[d,h]=R.useState(""),[p,g]=R.useState("");R.useEffect(()=>{u("approve"),h(""),g("")},[e]);const y=f=>{u(f),g(""),i&&i()},k=f=>{if(f==null||f.preventDefault(),!t){if(!a){g('Please select either "Approve & Continue" or "Reject / Request Changes".');return}if(a==="request_changes"&&!d.trim()){g("Feedback comments are required when requesting revisions so the AI agent knows what to fix.");return}g(""),n({stage:e,decision:a,feedback:d.trim()})}},S=a==="approve",T=a==="request_changes";return s.jsxs("div",{className:"review-panel",id:"review-panel",children:[s.jsxs("div",{className:"rp-header",children:[s.jsx("div",{className:"rp-icon",children:o.icon}),s.jsxs("div",{className:"rp-title-wrap",children:[s.jsxs("div",{className:"rp-title",children:[s.jsx("span",{children:o.title}),s.jsx("span",{className:"rp-status-tag",children:"Waiting for Decision"})]}),s.jsx("div",{className:"rp-desc",children:o.desc})]})]}),s.jsxs("div",{className:"rp-body",children:[l&&s.jsxs("div",{className:"review-banner review-banner-success",children:[s.jsx("span",{className:"banner-icon",children:"✓"}),s.jsx("span",{children:l})]}),(r||p)&&s.jsxs("div",{className:"review-banner review-banner-error",children:[s.jsx("span",{className:"banner-icon",children:"✕"}),s.jsx("span",{className:"banner-text",children:p||r}),r&&s.jsx("button",{type:"button",className:"banner-retry-btn",onClick:k,disabled:t,children:"Retry"})]}),s.jsxs("div",{className:"decision-group",children:[s.jsxs("button",{type:"button",className:`decision-btn decision-btn-approve ${S?"selected":""}`,onClick:()=>y("approve"),disabled:t,id:"btn-select-approve",children:[s.jsx("div",{className:"dec-icon-box",children:"✓"}),s.jsxs("div",{className:"dec-txt-box",children:[s.jsx("div",{className:"dec-title",children:o.approveLabel||"Approve & Continue"}),s.jsxs("div",{className:"dec-sub",children:["Accept artifacts and advance to ",o.nextStageLabel]})]}),S&&s.jsx("div",{className:"dec-check-mark",children:"SELECTED"})]}),s.jsxs("button",{type:"button",className:`decision-btn decision-btn-reject ${T?"selected":""}`,onClick:()=>y("request_changes"),disabled:t,id:"btn-select-reject",children:[s.jsx("div",{className:"dec-icon-box",children:"✎"}),s.jsxs("div",{className:"dec-txt-box",children:[s.jsx("div",{className:"dec-title",children:o.rejectLabel||"Reject / Request Changes"}),s.jsx("div",{className:"dec-sub",children:"Provide feedback to trigger regeneration"})]}),T&&s.jsx("div",{className:"dec-check-mark",children:"SELECTED"})]})]}),s.jsxs("div",{className:"feedback-box",children:[s.jsxs("div",{className:"feedback-label",children:[s.jsx("label",{htmlFor:"review-feedback-textarea",children:"Review Feedback & Revision Notes"}),s.jsx("span",{className:`feedback-hint ${T?"required-hint":""}`,children:T?"(Required for revisions)":"(Optional feedback)"})]}),s.jsx("textarea",{id:"review-feedback-textarea",className:`feedback-ta ${T&&!d.trim()&&p?"has-error":""}`,value:d,onChange:f=>{h(f.target.value),p&&g("")},placeholder:o.feedbackPlaceholder,disabled:t,rows:5})]}),s.jsx("div",{className:"rp-actions",children:s.jsx("button",{type:"button",className:`btn-submit-decision ${S?"btn-submit-approve":"btn-submit-reject"}`,onClick:k,disabled:t,id:"btn-submit-review",children:t?s.jsxs(s.Fragment,{children:[s.jsx("span",{className:"spin"}),s.jsx("span",{children:"Submitting review to LangGraph…"})]}):S?s.jsx(s.Fragment,{children:s.jsx("span",{children:"✓ Submit Approval & Continue →"})}):s.jsx(s.Fragment,{children:s.jsx("span",{children:"✎ Submit Feedback & Regenerate →"})})})})]}),s.jsx("style",{children:`
        .review-panel {
          background: var(--bg2);
          border: 2px solid rgba(99, 102, 241, 0.4);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          animation: fadeIn 0.25s ease;
          margin-bottom: 20px;
        }
        .rp-header {
          padding: 16px 20px;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(16, 185, 129, 0.08));
          border-bottom: 1px solid var(--border2);
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .rp-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: rgba(99, 102, 241, 0.25);
          border: 1px solid rgba(129, 140, 248, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
        }
        .rp-title-wrap {
          flex: 1;
        }
        .rp-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--ink);
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .rp-status-tag {
          font-size: 10px;
          font-family: var(--mono);
          padding: 3px 9px;
          border-radius: 12px;
          background: var(--yellow-bg);
          color: var(--yellow);
          border: 1px solid var(--yellow-border);
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }
        .rp-desc {
          font-size: 12px;
          color: var(--ink2);
          margin-top: 4px;
          line-height: 1.5;
        }
        .rp-body {
          padding: 20px;
        }
        .review-banner {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          font-size: 12px;
          margin-bottom: 16px;
          animation: fadeIn 0.2s ease;
        }
        .review-banner-success {
          background: var(--green-bg);
          color: var(--green-light);
          border: 1px solid var(--green-border);
        }
        .review-banner-error {
          background: var(--red-bg);
          color: var(--red-light);
          border: 1px solid var(--red-border);
        }
        .banner-icon {
          font-weight: 700;
          font-size: 14px;
        }
        .banner-text {
          flex: 1;
        }
        .banner-retry-btn {
          background: rgba(244, 63, 94, 0.2);
          border: 1px solid var(--red-border);
          color: var(--ink);
          border-radius: 4px;
          padding: 3px 8px;
          font-size: 11px;
          cursor: pointer;
          font-weight: 600;
        }
        .banner-retry-btn:hover {
          background: rgba(244, 63, 94, 0.4);
        }
        .decision-group {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 18px;
        }
        @media (max-width: 680px) {
          .decision-group {
            grid-template-columns: 1fr;
          }
        }
        .decision-btn {
          padding: 16px;
          border-radius: var(--radius-md);
          background: var(--bg3);
          border: 2px solid transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 14px;
          transition: all 0.2s;
          font-family: var(--font);
          position: relative;
        }
        .decision-btn:hover:not(:disabled) {
          transform: translateY(-2px);
        }
        .decision-btn-approve {
          border-color: rgba(16, 185, 129, 0.25);
          color: var(--green);
        }
        .decision-btn-approve:hover:not(:disabled) {
          background: rgba(16, 185, 129, 0.08);
          border-color: var(--green);
        }
        .decision-btn-approve.selected {
          background: rgba(16, 185, 129, 0.16);
          border-color: var(--green);
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.25);
        }
        .decision-btn-reject {
          border-color: rgba(244, 63, 94, 0.25);
          color: var(--red);
        }
        .decision-btn-reject:hover:not(:disabled) {
          background: rgba(244, 63, 94, 0.08);
          border-color: var(--red);
        }
        .decision-btn-reject.selected {
          background: rgba(244, 63, 94, 0.16);
          border-color: var(--red);
          box-shadow: 0 0 20px rgba(244, 63, 94, 0.25);
        }
        .dec-icon-box {
          font-size: 22px;
          line-height: 1;
        }
        .dec-txt-box {
          display: flex;
          flex-direction: column;
          gap: 3px;
          text-align: left;
        }
        .dec-title {
          font-size: 13.5px;
          font-weight: 700;
        }
        .dec-sub {
          font-size: 11px;
          opacity: 0.8;
          font-weight: 400;
        }
        .dec-check-mark {
          margin-left: auto;
          font-size: 9px;
          font-family: var(--mono);
          font-weight: 700;
          letter-spacing: 0.8px;
          padding: 2px 6px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.1);
        }
        .feedback-box {
          margin-bottom: 18px;
        }
        .feedback-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--ink2);
          margin-bottom: 7px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .feedback-hint {
          font-size: 11px;
          color: var(--ink3);
          font-weight: 400;
        }
        .feedback-hint.required-hint {
          color: var(--yellow);
          font-weight: 600;
        }
        .feedback-ta {
          width: 100%;
          min-height: 140px;
          max-height: 260px;
          background: var(--bg3);
          border: 1px solid var(--border2);
          color: var(--ink);
          border-radius: var(--radius-sm);
          padding: 12px 14px;
          font-family: var(--font);
          font-size: 12.5px;
          line-height: 1.6;
          resize: vertical;
          overflow-y: auto;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s;
        }
        .feedback-ta:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 2px var(--accent-bg);
        }
        .feedback-ta.has-error {
          border-color: var(--red);
          background: rgba(244, 63, 94, 0.04);
        }
        .rp-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .btn-submit-decision {
          width: 100%;
          padding: 13px 20px;
          border: none;
          border-radius: var(--radius-md);
          color: #fff;
          font-family: var(--font);
          font-size: 13.5px;
          font-weight: 700;
          letter-spacing: 0.3px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .btn-submit-approve {
          background: linear-gradient(135deg, var(--green), #059669);
          color: #042f2e;
        }
        .btn-submit-approve:hover:not(:disabled) {
          box-shadow: 0 4px 16px rgba(16, 185, 129, 0.35);
          transform: translateY(-1px);
        }
        .btn-submit-reject {
          background: linear-gradient(135deg, var(--red), #be123c);
          color: #fff;
        }
        .btn-submit-reject:hover:not(:disabled) {
          box-shadow: 0 4px 16px rgba(244, 63, 94, 0.35);
          transform: translateY(-1px);
        }
        .btn-submit-decision:disabled {
          opacity: 0.45;
          cursor: not-allowed;
          transform: none;
        }
      `})]})}function Bf({stories:e=[]}){if(!Array.isArray(e)||e.length===0)return s.jsxs("div",{className:"empty-panel-state",children:[s.jsx("span",{className:"empty-icon",children:"📋"}),s.jsx("div",{children:"User stories are pending generation. Submit requirements to generate stories."})]});const n=t=>{const r=String(t).toUpperCase();return r==="HIGH"||r==="CRITICAL"?"badge badge-red":r==="MEDIUM"?"badge badge-yellow":"badge badge-blue"};return s.jsxs("div",{className:"stories-container",children:[s.jsxs("div",{className:"stories-header-meta",children:[s.jsxs("span",{className:"stories-count-label",children:["Agile User Stories (",e.length,")"]}),s.jsx("span",{className:"stories-sub-label",children:"Decomposed from structured functional requirements"})]}),s.jsx("div",{className:"stories-list",children:e.map((t,r)=>{const l=t.story_id||`US-${String(r+1).padStart(2,"0")}`,i=t.title||`User Story ${r+1}`,o=t.priority||"High",a=t.status||"To Do",u=t.description||"",d=Array.isArray(t.acceptance_criteria)?t.acceptance_criteria:[],h=Array.isArray(t.requirement_reference)?t.requirement_reference:t.requirement_reference?[t.requirement_reference]:[];return s.jsxs("div",{className:"story-card",children:[s.jsxs("div",{className:"story-header",children:[s.jsx("span",{className:"story-id",children:l}),s.jsx("span",{className:"story-title",children:i}),s.jsx("span",{className:n(o),children:o}),s.jsx("span",{className:"badge badge-blue",children:a}),h.map(p=>s.jsx("span",{className:"badge badge-green",children:p},p))]}),u&&s.jsx("div",{className:"story-desc",children:u}),d.length>0&&s.jsxs("div",{className:"criteria-section",children:[s.jsx("div",{className:"criteria-heading",children:"Acceptance Criteria"}),s.jsx("ul",{className:"criteria-list",children:d.map((p,g)=>s.jsxs("li",{className:"criteria-item",children:[s.jsx("span",{className:"criteria-check",children:"✓"}),s.jsx("span",{children:typeof p=="string"?p:JSON.stringify(p)})]},g))})]})]},l)})}),s.jsx("style",{children:`
        .stories-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .stories-header-meta {
          display: flex;
          align-items: baseline;
          gap: 10px;
          padding-bottom: 6px;
          border-bottom: 1px solid var(--border);
        }
        .stories-count-label {
          font-size: 13px;
          font-weight: 700;
          color: var(--ink);
        }
        .stories-sub-label {
          font-size: 11px;
          color: var(--ink3);
        }
        .stories-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .story-card {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 14px 16px;
          transition: border-color 0.18s;
        }
        .story-card:hover {
          border-color: var(--border2);
        }
        .story-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          flex-wrap: wrap;
        }
        .story-id {
          font-family: var(--mono);
          font-weight: 700;
          color: var(--accent2);
          font-size: 11.5px;
        }
        .story-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink);
          flex: 1;
        }
        .story-desc {
          font-size: 12px;
          color: var(--ink2);
          line-height: 1.6;
          margin-bottom: 10px;
        }
        .criteria-section {
          background: var(--bg4);
          border-radius: var(--radius-sm);
          padding: 10px 12px;
          margin-top: 6px;
        }
        .criteria-heading {
          font-size: 10.5px;
          font-weight: 700;
          color: var(--ink3);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 6px;
        }
        .criteria-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .criteria-item {
          font-size: 11.5px;
          color: var(--ink2);
          display: flex;
          align-items: flex-start;
          gap: 8px;
          line-height: 1.45;
        }
        .criteria-check {
          color: var(--green);
          font-weight: 700;
          font-size: 11px;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .empty-panel-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 40px 20px;
          color: var(--ink3);
          font-size: 12.5px;
          text-align: center;
        }
        .empty-icon {
          font-size: 28px;
          opacity: 0.5;
        }
      `})]})}function Vf({structured:e,legacyList:n}){if(e&&typeof e=="object"){const t=Array.isArray(e.functional_requirements)?e.functional_requirements:[],r=Array.isArray(e.non_functional_requirements)?e.non_functional_requirements:[],l=Array.isArray(e.external_integrations)?e.external_integrations:[],i=e.summary||"";return s.jsxs("div",{className:"reqs-container",children:[i&&s.jsxs("div",{className:"summary-card",children:[s.jsx("div",{className:"section-label",children:"Executive Summary"}),s.jsx("div",{className:"summary-text",children:i})]}),t.length>0&&s.jsxs("div",{className:"req-group",children:[s.jsxs("div",{className:"section-heading",children:["Functional Requirements (",t.length,")"]}),s.jsx("div",{className:"req-items-list",children:t.map((o,a)=>s.jsxs("div",{className:"req-card",children:[s.jsxs("div",{className:"req-header",children:[s.jsx("span",{className:"badge badge-blue",children:o.id||`FR-${a+1}`}),s.jsx("span",{className:"req-title",children:o.title||"Functional Requirement"}),o.priority&&s.jsx("span",{className:"badge badge-yellow",children:o.priority})]}),s.jsx("div",{className:"req-desc",children:o.description}),Array.isArray(o.acceptance_criteria)&&o.acceptance_criteria.length>0&&s.jsxs("div",{className:"sub-criteria",children:[s.jsx("div",{className:"sub-criteria-heading",children:"Criteria:"}),s.jsx("ul",{className:"sub-criteria-list",children:o.acceptance_criteria.map((u,d)=>s.jsxs("li",{className:"sub-criteria-item",children:["✓ ",u]},d))})]})]},o.id||a))})]}),r.length>0&&s.jsxs("div",{className:"req-group",children:[s.jsxs("div",{className:"section-heading",children:["Non-Functional Requirements (",r.length,")"]}),s.jsx("div",{className:"req-items-list",children:r.map((o,a)=>s.jsxs("div",{className:"req-card",children:[s.jsxs("div",{className:"req-header",children:[s.jsx("span",{className:"badge badge-yellow",children:o.id||`NFR-${a+1}`}),s.jsx("span",{className:"req-title",children:o.category||"Quality Attribute"}),o.metric_target&&s.jsx("span",{className:"badge badge-green",children:o.metric_target})]}),s.jsx("div",{className:"req-desc",children:o.description})]},o.id||a))})]}),l.length>0&&s.jsxs("div",{className:"req-group",children:[s.jsxs("div",{className:"section-heading",children:["External Integrations (",l.length,")"]}),s.jsx("div",{className:"req-items-list",children:l.map((o,a)=>s.jsxs("div",{className:"req-card",children:[s.jsxs("div",{className:"req-header",children:[s.jsx("span",{className:"req-title",style:{fontWeight:700},children:o.name}),s.jsx("span",{className:"badge badge-blue",children:o.api_type||"REST"})]}),s.jsx("div",{className:"req-desc",children:o.purpose}),Array.isArray(o.env_var_keys)&&o.env_var_keys.length>0&&s.jsxs("div",{className:"env-keys-box",children:[s.jsx("span",{className:"env-label",children:"Env Keys:"})," ",o.env_var_keys.map(u=>s.jsx("code",{className:"env-key-tag",children:u},u))]})]},o.name||a))})]}),s.jsx("style",{children:`
          .reqs-container {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          .summary-card {
            background: var(--bg3);
            border: 1px solid var(--border);
            border-radius: var(--radius-md);
            padding: 14px 16px;
          }
          .section-label {
            font-size: 10px;
            font-weight: 700;
            color: var(--accent2);
            text-transform: uppercase;
            letter-spacing: 1.2px;
            margin-bottom: 6px;
          }
          .summary-text {
            font-size: 13px;
            color: var(--ink);
            line-height: 1.6;
          }
          .req-group {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .section-heading {
            font-size: 11.5px;
            font-weight: 700;
            color: var(--ink3);
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .req-items-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .req-card {
            background: var(--bg3);
            border: 1px solid var(--border);
            border-radius: var(--radius-sm);
            padding: 12px 14px;
          }
          .req-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 6px;
          }
          .req-title {
            font-size: 12.5px;
            font-weight: 600;
            color: var(--ink);
            flex: 1;
          }
          .req-desc {
            font-size: 12px;
            color: var(--ink2);
            line-height: 1.5;
          }
          .sub-criteria {
            margin-top: 8px;
            padding-top: 8px;
            border-top: 1px solid var(--border);
          }
          .sub-criteria-heading {
            font-size: 10px;
            color: var(--ink3);
            text-transform: uppercase;
            margin-bottom: 4px;
            font-weight: 600;
          }
          .sub-criteria-list {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 3px;
          }
          .sub-criteria-item {
            font-size: 11px;
            color: var(--ink2);
          }
          .env-keys-box {
            margin-top: 6px;
            font-size: 11px;
            color: var(--ink3);
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 6px;
          }
          .env-key-tag {
            background: var(--bg4);
            padding: 2px 6px;
            border-radius: 4px;
            color: var(--accent-light);
            font-family: var(--mono);
          }
        `})]})}return Array.isArray(n)&&n.length>0?s.jsxs("div",{className:"legacy-reqs-list",children:[n.map((t,r)=>s.jsxs("div",{className:"legacy-item",children:["• ",t]},r)),s.jsx("style",{children:`
          .legacy-reqs-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
            background: var(--bg3);
            border: 1px solid var(--border);
            border-radius: var(--radius-sm);
            padding: 14px;
          }
          .legacy-item {
            font-size: 12px;
            color: var(--ink2);
            line-height: 1.6;
          }
        `})]}):s.jsx("div",{style:{color:"var(--ink3)",textAlign:"center",padding:"30px"},children:"No requirements specifications recorded yet."})}function Hf({matrix:e=[]}){if(!Array.isArray(e)||e.length===0)return s.jsxs("div",{className:"empty-matrix-state",children:[s.jsx("span",{className:"empty-matrix-icon",children:"🔗"}),s.jsx("div",{children:"Traceability matrix will be generated after requirements and user stories are analyzed."})]});const n=t=>{const r=String(t).toUpperCase();return r==="PASS"||r==="PASSED"?"badge badge-green":r==="FAIL"||r==="FAILED"?"badge badge-red":"badge badge-yellow"};return s.jsxs("div",{className:"traceability-container",children:[s.jsxs("div",{className:"traceability-meta",children:[s.jsxs("div",{className:"meta-left",children:[s.jsx("span",{className:"meta-title",children:"Traceability & Verification Matrix"}),s.jsxs("span",{className:"badge badge-blue",children:[e.length," Mapped Links"]})]}),s.jsx("div",{className:"meta-hint",children:"Scroll horizontally for extended columns or vertically to view all requirement mappings."})]}),s.jsx("div",{className:"matrix-scroll-wrapper",children:s.jsxs("table",{className:"matrix-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{style:{minWidth:"180px"},children:"Requirement"}),s.jsx("th",{style:{minWidth:"130px"},children:"User Stories"}),s.jsx("th",{style:{minWidth:"140px"},children:"Design Sections"}),s.jsx("th",{style:{minWidth:"150px"},children:"Code Files"}),s.jsx("th",{style:{minWidth:"130px"},children:"Test Cases"}),s.jsx("th",{style:{minWidth:"100px",textAlign:"center"},children:"Status"})]})}),s.jsx("tbody",{children:e.map((t,r)=>{const l=t.requirement_id||`REQ-${r+1}`,i=t.requirement_title||"",o=Array.isArray(t.user_story_ids)?t.user_story_ids:[],a=Array.isArray(t.design_sections)?t.design_sections:[],u=Array.isArray(t.code_files)?t.code_files:[],d=Array.isArray(t.test_case_ids)?t.test_case_ids:[],h=t.test_status||"PENDING";return s.jsxs("tr",{children:[s.jsx("td",{children:s.jsxs("div",{className:"req-cell",children:[s.jsx("span",{className:"req-id",children:l}),i&&s.jsx("span",{className:"req-title",children:i})]})}),s.jsx("td",{children:s.jsx("div",{className:"badge-flow",children:o.length>0?o.map(p=>s.jsx("span",{className:"badge badge-blue",children:p},p)):s.jsx("span",{className:"cell-muted",children:"—"})})}),s.jsx("td",{children:s.jsx("div",{className:"badge-flow",children:a.length>0?a.map(p=>s.jsx("span",{className:"badge badge-yellow",children:p},p)):s.jsx("span",{className:"cell-muted",children:"—"})})}),s.jsx("td",{children:s.jsx("div",{className:"badge-flow",children:u.length>0?u.slice(0,4).map(p=>s.jsx("span",{className:"badge badge-green",title:p,children:p},p)):s.jsx("span",{className:"cell-muted",children:"—"})})}),s.jsx("td",{children:s.jsx("div",{className:"badge-flow",children:d.length>0?d.map(p=>s.jsx("span",{className:"badge badge-blue",children:p},p)):s.jsx("span",{className:"cell-muted",children:"—"})})}),s.jsx("td",{style:{textAlign:"center"},children:s.jsx("span",{className:n(h),children:h})})]},`${l}-${r}`)})})]})}),s.jsx("style",{children:`
        .traceability-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
        }
        .traceability-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          padding: 4px 2px;
        }
        .meta-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .meta-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--ink);
        }
        .meta-hint {
          font-size: 11px;
          color: var(--ink3);
        }
        .matrix-scroll-wrapper {
          width: 100%;
          overflow-x: auto;
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
        }
        .matrix-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
          text-align: left;
        }
        .matrix-table thead {
          position: sticky;
          top: 0;
          z-index: 5;
          background: var(--bg4);
        }
        .matrix-table th {
          padding: 10px 14px;
          color: var(--ink2);
          text-transform: uppercase;
          font-size: 10px;
          letter-spacing: 1px;
          font-weight: 700;
          border-bottom: 2px solid var(--border2);
          white-space: nowrap;
        }
        .matrix-table td {
          padding: 10px 14px;
          border-bottom: 1px solid var(--border);
          color: var(--ink2);
          vertical-align: top;
        }
        .matrix-table tbody tr:hover td {
          background: rgba(255, 255, 255, 0.02);
        }
        .req-cell {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .req-id {
          font-family: var(--mono);
          font-weight: 700;
          color: var(--accent2);
          font-size: 12px;
        }
        .req-title {
          font-size: 11px;
          color: var(--ink3);
          line-height: 1.4;
          word-break: break-word;
        }
        .badge-flow {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }
        .cell-muted {
          color: var(--ink3);
          font-size: 12px;
        }
        .empty-matrix-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 40px 20px;
          color: var(--ink3);
          font-size: 12.5px;
          text-align: center;
        }
        .empty-matrix-icon {
          font-size: 28px;
          opacity: 0.5;
        }
      `})]})}function Qf({state:e,activeTab:n,onTabChange:t,taskId:r,baseUrl:l}){var y,k,S,T,f,c,m;const[i,o]=R.useState(""),a=[];e!=null&&e.user_stories&&e.user_stories.length>0&&a.push({id:"user_stories",label:"📋 User Stories",count:e.user_stories.length}),(e!=null&&e.structured_requirements||e!=null&&e.requirements)&&a.push({id:"requirements",label:"📄 Requirements Spec"}),e!=null&&e.traceability_matrix&&e.traceability_matrix.length>0&&a.push({id:"traceability",label:"🔗 Traceability Matrix",count:e.traceability_matrix.length}),e!=null&&e.design_documents&&a.push({id:"design",label:"🏗️ Architecture Design"}),e!=null&&e.generated_files&&Object.keys(e.generated_files).length>0&&a.push({id:"code",label:"💻 Code Implementation",count:Object.keys(e.generated_files).length}),(e!=null&&e.security_report||e!=null&&e.security_review_comments)&&a.push({id:"security",label:"🔒 Security Audit"}),(e!=null&&e.test_cases||e!=null&&e.qa_report||e!=null&&e.test_execution_results)&&a.push({id:"qa",label:"🧪 Tests & QA Report"}),(e!=null&&e.deployment_result||(e==null?void 0:e.deployment_status)==="success")&&a.push({id:"deployment",label:"🚀 Deployment Package"}),R.useEffect(()=>{a.length>0&&!a.some(v=>v.id===n)&&t(a[0].id)},[a,n,t]);const u=(e==null?void 0:e.generated_files)||{},d=Object.keys(u);if(R.useEffect(()=>{d.length>0&&(!i||!u[i])&&o(d[0])},[d,i,u]),a.length===0)return s.jsxs("div",{className:"content-inspector empty-inspector",children:[s.jsx("span",{className:"empty-insp-icon",children:"📂"}),s.jsx("div",{className:"empty-insp-title",children:"No Artifacts Generated Yet"}),s.jsx("div",{className:"empty-insp-desc",children:"Artifacts such as requirements, user stories, architecture specs, and code files will appear here automatically as SDLC workflow stages advance."})]});const p=(a.find(v=>v.id===n)||a[0]).id,g=v=>{let _=e;p==="user_stories"?_=e==null?void 0:e.user_stories:p==="requirements"?_=(e==null?void 0:e.structured_requirements)||(e==null?void 0:e.requirements):p==="traceability"?_=e==null?void 0:e.traceability_matrix:p==="design"?_=e==null?void 0:e.design_documents:p==="code"?_=e==null?void 0:e.generated_files:p==="security"?_=(e==null?void 0:e.security_report)||(e==null?void 0:e.security_review_comments):p==="qa"?_={report:e==null?void 0:e.qa_report,tests:e==null?void 0:e.test_cases}:p==="deployment"&&(_=e==null?void 0:e.deployment_result),Ar(p,v,_,r)};return s.jsxs("div",{className:"content-inspector",children:[s.jsxs("div",{className:"inspector-head",children:[s.jsx("div",{className:"inspector-tabs",children:a.map(v=>s.jsxs("button",{className:`insp-tab ${v.id===p?"active":""}`,onClick:()=>t(v.id),children:[s.jsx("span",{children:v.label}),v.count!==void 0&&s.jsx("span",{className:"badge badge-blue",children:v.count})]},v.id))}),s.jsxs("div",{className:"insp-actions",children:[s.jsx("button",{className:"dl-mini-btn",onClick:()=>g("txt"),title:"Export TXT",children:"TXT"}),s.jsx("button",{className:"dl-mini-btn",onClick:()=>g("json"),title:"Export JSON",children:"JSON"}),s.jsx("button",{className:"dl-mini-btn",onClick:()=>g("html"),title:"Export HTML",children:"HTML"})]})]}),s.jsxs("div",{className:"inspector-body",children:[p==="user_stories"&&s.jsx(Bf,{stories:e==null?void 0:e.user_stories}),p==="requirements"&&s.jsx(Vf,{structured:e==null?void 0:e.structured_requirements,legacyList:e==null?void 0:e.requirements}),p==="traceability"&&s.jsx(Hf,{matrix:e==null?void 0:e.traceability_matrix}),p==="design"&&s.jsxs("div",{className:"design-panel",children:[s.jsxs("div",{className:"design-grid",children:[s.jsxs("div",{className:"design-card",children:[s.jsx("div",{className:"design-label",children:"Architecture Style"}),s.jsx("div",{className:"design-val",children:((y=e==null?void 0:e.design_documents)==null?void 0:y.architecture_overview)||"Modular Clean Architecture"})]}),s.jsxs("div",{className:"design-card",children:[s.jsx("div",{className:"design-label",children:"Database & Data Model"}),s.jsx("div",{className:"design-val",children:((k=e==null?void 0:e.design_documents)==null?void 0:k.database_schema)||"SQLite / Relational Schema"})]})]}),s.jsxs("div",{className:"doc-section",children:[s.jsx("div",{className:"doc-section-title",children:"Functional Design Specification (FDD)"}),s.jsx("pre",{className:"code-viewer-block",children:((S=e==null?void 0:e.design_documents)==null?void 0:S.functional)||((T=e==null?void 0:e.design_documents)==null?void 0:T.architecture_overview)||"Functional design document pending generation."})]}),s.jsxs("div",{className:"doc-section",children:[s.jsx("div",{className:"doc-section-title",children:"Technical Design Document (TDD)"}),s.jsx("pre",{className:"code-viewer-block",children:((f=e==null?void 0:e.design_documents)==null?void 0:f.technical)||"Technical design document pending generation."})]})]}),p==="code"&&s.jsxs("div",{className:"code-browser",children:[(e==null?void 0:e.static_analysis)&&s.jsxs("div",{className:"metrics-row",children:[s.jsxs("div",{className:"metric-box",children:[s.jsx("div",{className:"metric-lbl",children:"Analysis Status"}),s.jsx("div",{className:"metric-num",style:{color:e.static_analysis.passed?"var(--green)":"var(--red)",fontSize:"13px"},children:e.static_analysis.passed?"PASSED ✅":"NEEDS REVISION ⚠️"})]}),s.jsxs("div",{className:"metric-box",children:[s.jsx("div",{className:"metric-lbl",children:"Total Issues"}),s.jsx("div",{className:"metric-num",children:e.static_analysis.total_issues||0})]}),s.jsxs("div",{className:"metric-box",children:[s.jsx("div",{className:"metric-lbl",children:"Errors"}),s.jsx("div",{className:"metric-num",style:{color:"var(--red)"},children:e.static_analysis.errors||0})]}),s.jsxs("div",{className:"metric-box",children:[s.jsx("div",{className:"metric-lbl",children:"Warnings"}),s.jsx("div",{className:"metric-num",style:{color:"var(--yellow)"},children:e.static_analysis.warnings||0})]})]}),s.jsx("div",{className:"file-tabs-strip",children:d.map(v=>s.jsx("button",{className:`file-tab-btn ${v===i?"active":""}`,onClick:()=>o(v),children:v},v))}),s.jsx("pre",{className:"code-viewer-block",children:i?u[i]:"Select a file to inspect."}),(e==null?void 0:e.code_review_comments)&&s.jsxs("div",{className:"review-notes-box",children:[s.jsx("div",{className:"doc-section-title",children:"Automated Code Review Notes"}),s.jsx("pre",{className:"code-viewer-block",children:e.code_review_comments})]})]}),p==="security"&&s.jsxs("div",{className:"security-panel",children:[(e==null?void 0:e.security_report)&&s.jsxs("div",{className:"metrics-row",children:[s.jsxs("div",{className:"metric-box",children:[s.jsx("div",{className:"metric-lbl",children:"Security Gate"}),s.jsx("div",{className:"metric-num",style:{color:e.security_report.status==="PASSED"?"var(--green)":"var(--red)",fontSize:"14px"},children:e.security_report.status||"PASSED"})]}),s.jsxs("div",{className:"metric-box",children:[s.jsx("div",{className:"metric-lbl",children:"Critical"}),s.jsx("div",{className:"metric-num",style:{color:"var(--red)"},children:e.security_report.critical_count||0})]}),s.jsxs("div",{className:"metric-box",children:[s.jsx("div",{className:"metric-lbl",children:"High"}),s.jsx("div",{className:"metric-num",style:{color:"var(--red)"},children:e.security_report.high_count||0})]}),s.jsxs("div",{className:"metric-box",children:[s.jsx("div",{className:"metric-lbl",children:"Medium"}),s.jsx("div",{className:"metric-num",style:{color:"var(--yellow)"},children:e.security_report.medium_count||0})]}),s.jsxs("div",{className:"metric-box",children:[s.jsx("div",{className:"metric-lbl",children:"Low/Info"}),s.jsx("div",{className:"metric-num",style:{color:"var(--green)"},children:(e.security_report.low_count||0)+(e.security_report.info_count||0)})]})]}),s.jsx("pre",{className:"code-viewer-block",children:(e==null?void 0:e.security_review_comments)||"Security scan completed successfully. No critical vulnerabilities reported."})]}),p==="qa"&&s.jsxs("div",{className:"qa-panel",children:[(e==null?void 0:e.qa_report)&&s.jsxs("div",{className:"metrics-row",children:[s.jsxs("div",{className:"metric-box",children:[s.jsx("div",{className:"metric-lbl",children:"Quality Gate"}),s.jsx("div",{className:"metric-num",style:{color:e.qa_report.quality_gate_passed?"var(--green)":"var(--red)",fontSize:"14px"},children:e.qa_report.quality_gate_passed?"PASSED ✅":"FAILED ❌"})]}),s.jsxs("div",{className:"metric-box",children:[s.jsx("div",{className:"metric-lbl",children:"Total Tests"}),s.jsx("div",{className:"metric-num",children:e.qa_report.total_tests||0})]}),s.jsxs("div",{className:"metric-box",children:[s.jsx("div",{className:"metric-lbl",children:"Passed"}),s.jsx("div",{className:"metric-num",style:{color:"var(--green)"},children:e.qa_report.passed_tests||0})]}),s.jsxs("div",{className:"metric-box",children:[s.jsx("div",{className:"metric-lbl",children:"Failed"}),s.jsx("div",{className:"metric-num",style:{color:"var(--red)"},children:e.qa_report.failed_tests||0})]})]}),Array.isArray(e==null?void 0:e.repair_attempts)&&e.repair_attempts.length>0&&s.jsxs("div",{className:"repair-card",children:[s.jsxs("div",{className:"repair-title",children:["Automated Debug & Repair History (",e.repair_attempts.length," Attempts)"]}),e.repair_attempts.map((v,_)=>s.jsxs("div",{className:"repair-entry",children:["• Attempt #",v.attempt_number,": ",v.changes_summary," (",Array.isArray(v.patched_files)?v.patched_files.join(", "):"",")"]},_))]}),s.jsxs("div",{className:"doc-section",children:[s.jsx("div",{className:"doc-section-title",children:"Generated Test Suite"}),s.jsx("pre",{className:"code-viewer-block",children:(e==null?void 0:e.test_cases)||"Test cases generation in progress…"})]})]}),p==="deployment"&&s.jsxs("div",{className:"deployment-panel",children:[s.jsxs("div",{className:"deploy-box",children:[s.jsxs("div",{children:[s.jsx("div",{className:"deploy-title",children:(e==null?void 0:e.deployment_status)==="success"||(c=e==null?void 0:e.deployment_result)!=null&&c.build_successful?"DEPLOYMENT PACKAGE READY ✅":"DEPLOYMENT COMPLETED 🚀"}),s.jsx("div",{className:"deploy-desc",children:"Verified standalone package ready for containerization and production execution."})]}),r&&s.jsx("a",{href:qe.getDownloadZipUrl(l,r),className:"btn btn-green deploy-download-btn",download:!0,children:"↓ Download .ZIP Archive"})]}),s.jsx("pre",{className:"code-viewer-block",children:(e==null?void 0:e.deployment_feedback)||((m=e==null?void 0:e.deployment_result)==null?void 0:m.message)||"Deployment verification completed successfully."})]})]}),s.jsx("style",{children:`
        .content-inspector {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-md);
        }
        .empty-inspector {
          padding: 40px 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .empty-insp-icon {
          font-size: 32px;
          opacity: 0.5;
        }
        .empty-insp-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--ink);
        }
        .empty-insp-desc {
          font-size: 12px;
          color: var(--ink3);
          max-width: 480px;
          line-height: 1.6;
        }
        .inspector-head {
          padding: 10px 16px;
          background: var(--bg3);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        }
        .inspector-tabs {
          display: flex;
          align-items: center;
          gap: 6px;
          overflow-x: auto;
          padding-bottom: 2px;
        }
        .insp-tab {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid transparent;
          background: transparent;
          color: var(--ink2);
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.15s;
        }
        .insp-tab:hover {
          background: var(--bg4);
          color: var(--ink);
        }
        .insp-tab.active {
          background: var(--bg4);
          border-color: var(--border2);
          color: var(--accent2);
          font-weight: 700;
        }
        .insp-actions {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .dl-mini-btn {
          padding: 3px 8px;
          border-radius: 4px;
          border: 1px solid var(--border);
          background: var(--bg4);
          color: var(--ink3);
          font-size: 10px;
          font-weight: 600;
          cursor: pointer;
          font-family: var(--mono);
          transition: all 0.14s;
        }
        .dl-mini-btn:hover {
          border-color: var(--accent);
          color: var(--accent2);
        }
        .inspector-body {
          padding: 18px 20px;
        }
        .design-panel, .code-browser, .security-panel, .qa-panel, .deployment-panel {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .design-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 640px) {
          .design-grid {
            grid-template-columns: 1fr;
          }
        }
        .design-card {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 12px 14px;
        }
        .design-label {
          font-size: 10px;
          font-weight: 700;
          color: var(--accent2);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .design-val {
          font-size: 12.5px;
          color: var(--ink);
          margin-top: 4px;
        }
        .doc-section {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .doc-section-title {
          font-size: 11px;
          font-weight: 700;
          color: var(--ink3);
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }
        .code-viewer-block {
          font-family: var(--mono);
          font-size: 12px;
          color: var(--ink);
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 14px;
          white-space: pre-wrap;
          line-height: 1.6;
          overflow-x: auto;
          max-height: 480px;
          overflow-y: auto;
        }
        .metrics-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
          gap: 10px;
        }
        .metric-box {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 10px;
          text-align: center;
        }
        .metric-num {
          font-family: var(--mono);
          font-size: 18px;
          font-weight: 700;
          margin-top: 3px;
        }
        .metric-lbl {
          font-size: 9.5px;
          color: var(--ink3);
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }
        .file-tabs-strip {
          display: flex;
          gap: 5px;
          overflow-x: auto;
          padding-bottom: 4px;
        }
        .file-tab-btn {
          padding: 5px 12px;
          border-radius: var(--radius-sm);
          background: var(--bg3);
          border: 1px solid var(--border);
          font-family: var(--mono);
          font-size: 11px;
          color: var(--ink3);
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.15s;
        }
        .file-tab-btn:hover {
          color: var(--ink);
        }
        .file-tab-btn.active {
          background: var(--bg4);
          border-color: var(--accent);
          color: var(--accent2);
          font-weight: 600;
        }
        .repair-card {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 12px 14px;
        }
        .repair-title {
          font-size: 10.5px;
          font-weight: 700;
          color: var(--yellow);
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .repair-entry {
          font-size: 11.5px;
          color: var(--ink2);
          margin-top: 4px;
        }
        .deploy-box {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .deploy-title {
          font-size: 14.5px;
          font-weight: 700;
          color: var(--green);
        }
        .deploy-desc {
          font-size: 12px;
          color: var(--ink2);
          margin-top: 3px;
        }
        .deploy-download-btn {
          text-decoration: none;
          padding: 10px 18px;
        }
      `})]})}function Gf({message:e="Processing workflow stage…"}){return s.jsxs("div",{className:"loading-state-box",children:[s.jsx("div",{className:"loading-spinner-ring"}),s.jsx("div",{className:"loading-msg",children:e}),s.jsx("style",{children:`
        .loading-state-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          padding: 30px;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
        }
        .loading-spinner-ring {
          width: 32px;
          height: 32px;
          border: 3px solid rgba(99, 102, 241, 0.2);
          border-top-color: var(--accent2);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        .loading-msg {
          font-size: 13px;
          color: var(--ink2);
          font-weight: 500;
        }
      `})]})}function Kf({taskId:e,workflowState:n,isWorkflowStarting:t,onStartWorkflow:r,onSubmitReview:l,isReviewSubmitting:i,reviewError:o,reviewSuccessMessage:a,onClearReviewError:u,activeTab:d,onTabChange:h,baseUrl:p}){const g=n==null?void 0:n.next_required_input,y=!!(g&&g!=="requirements"&&g!=="end"&&g!=="completed"&&g!=="none");return s.jsxs("main",{className:"main-workspace",id:"main-content",children:[s.jsx(qf,{taskId:e,workflowState:n,isWorkflowStarting:t,onStartWorkflow:r}),y&&s.jsx(Wf,{stageKey:g,onSubmitReview:l,isSubmitting:i,error:o,successMessage:a,onClearError:u}),(n==null?void 0:n.status)==="in_progress"&&!y&&!t&&s.jsx(Gf,{message:`Executing ${(n==null?void 0:n.current_node)||"stage"}… Analyzing and generating artifacts.`}),s.jsx(Qf,{state:n,activeTab:d,onTabChange:h,taskId:e,baseUrl:p}),s.jsx("style",{children:`
        .main-workspace {
          grid-column: 2;
          grid-row: 2;
          overflow-y: auto;
          min-height: 0;
          height: 100%;
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          background: var(--bg);
        }
      `})]})}function Yf(e="http://localhost:8000"){const[n,t]=R.useState(e),[r,l]=R.useState("connecting"),[i,o]=R.useState(""),[a,u]=R.useState({provider:"Groq",model:"llama-3.3-70b-versatile"}),[d,h]=R.useState(!1),[p,g]=R.useState(null),[y,k]=R.useState(null),[S,T]=R.useState(!1),[f,c]=R.useState(!1),[m,v]=R.useState(""),[_,E]=R.useState(""),[C,z]=R.useState("user_stories"),M=R.useRef(null),P=R.useCallback(()=>{M.current&&(clearInterval(M.current),M.current=null)},[]),re=R.useCallback(H=>{var A;if(!H)return;const w=H.data||H.state||H,j=H.workflow||H,b={...w,...j,user_stories:w.user_stories||j.user_stories,structured_requirements:w.structured_requirements||j.structured_requirements,traceability_matrix:w.traceability_matrix||j.traceability_matrix,design_documents:w.design_documents||j.design_documents,generated_files:w.generated_files||j.generated_files,security_report:w.security_report||j.security_report,qa_report:w.qa_report||j.qa_report,test_cases:w.test_cases||j.test_cases,deployment_result:w.deployment_result||j.deployment_result};k(b),b.next_required_input==="product_owner_review"&&((A=b.user_stories)!=null&&A.length)&&z(G=>G||"user_stories")},[]),Ze=R.useCallback(H=>{P(),M.current=setInterval(async()=>{var w;try{const j=await qe.getState(n,H);re(j);const b=j.status||((w=j.workflow)==null?void 0:w.status);(b==="waiting_for_input"||b==="completed"||b==="error")&&P()}catch{}},2e3)},[n,P,re]),Je=R.useCallback(async()=>{try{const H=await qe.checkHealth(n);l("healthy"),o(H.active_provider||"Groq");const w=await qe.getLLMConfig(n);w&&u(w)}catch{l("offline")}},[n]);return R.useEffect(()=>(Je(),()=>P()),[Je,P]),{baseUrl:n,setBaseUrl:t,systemStatus:r,activeProvider:i,llmConfig:a,isApplyingConfig:d,handleApplyConfig:async({provider:H,model:w,apiKey:j,url:b})=>{h(!0),b&&b!==n&&t(b);try{const A=await qe.configureLLM(b||n,{provider:H,model:w,api_key:j||null});A.status==="ok"&&(u({provider:A.provider,model:A.model}),o(A.provider),l("healthy"))}catch(A){alert(`LLM Configuration error: ${A.message}`)}finally{h(!1)}},taskId:p,workflowState:y,isWorkflowStarting:S,handleStartWorkflow:async({projectName:H,requirementsText:w})=>{T(!0),v(""),E("");try{const b=(await qe.startWorkflow(n,H)).task_id;g(b);const A=await qe.submitRequirements(n,b,w);re(A),Ze(b)}catch(j){v(j.message||"Failed to start workflow")}finally{T(!1)}},handleSubmitReview:async({stage:H,decision:w,feedback:j})=>{if(!(!p||f)){c(!0),v("");try{E(w==="approve"?"✓ Review approved. Resuming LangGraph and advancing stage…":"✓ Review submitted. Regenerating artifacts according to your feedback…");const b=await qe.submitReview(n,p,{stage:H,decision:w,feedback:j});re(b),Ze(p),setTimeout(()=>{E("")},4e3)}catch(b){E(""),v(b.message||"Failed to submit review")}finally{c(!1)}}},isReviewSubmitting:f,reviewError:m,reviewSuccessMessage:_,onClearReviewError:()=>v(""),activeTab:C,setActiveTab:z}}function Xf(){const{baseUrl:e,setBaseUrl:n,systemStatus:t,activeProvider:r,llmConfig:l,isApplyingConfig:i,handleApplyConfig:o,taskId:a,workflowState:u,isWorkflowStarting:d,handleStartWorkflow:h,handleSubmitReview:p,isReviewSubmitting:g,reviewError:y,reviewSuccessMessage:k,onClearReviewError:S,activeTab:T,setActiveTab:f}=Yf();return s.jsxs("div",{className:"app-container",children:[s.jsx(Mf,{systemStatus:t,activeProvider:r,taskId:a}),s.jsx(Uf,{baseUrl:e,setBaseUrl:n,llmConfig:l,onApplyConfig:o,isApplyingConfig:i,state:u,taskId:a}),s.jsx(Kf,{taskId:a,workflowState:u,isWorkflowStarting:d,onStartWorkflow:h,onSubmitReview:p,isReviewSubmitting:g,reviewError:y,reviewSuccessMessage:k,onClearReviewError:S,activeTab:T,onTabChange:f,baseUrl:e}),s.jsx($f,{progress:(u==null?void 0:u.progress)||0,currentNode:u==null?void 0:u.current_node,nextRequiredInput:u==null?void 0:u.next_required_input,currentStageLabel:u==null?void 0:u.current_stage_label,stages:u==null?void 0:u.stages,workflowStatus:u==null?void 0:u.status})]})}Zl.createRoot(document.getElementById("root")).render(s.jsx(Nc.StrictMode,{children:s.jsx(Xf,{})}));
