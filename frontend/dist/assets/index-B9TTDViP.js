(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const o of l.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerPolicy&&(l.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?l.credentials="include":i.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(i){if(i.ep)return;i.ep=!0;const l=t(i);fetch(i.href,l)}})();function dc(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Js={exports:{}},si={},ea={exports:{}},R={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Jt=Symbol.for("react.element"),fc=Symbol.for("react.portal"),pc=Symbol.for("react.fragment"),mc=Symbol.for("react.strict_mode"),gc=Symbol.for("react.profiler"),hc=Symbol.for("react.provider"),vc=Symbol.for("react.context"),xc=Symbol.for("react.forward_ref"),yc=Symbol.for("react.suspense"),wc=Symbol.for("react.memo"),kc=Symbol.for("react.lazy"),Wo=Symbol.iterator;function jc(e){return e===null||typeof e!="object"?null:(e=Wo&&e[Wo]||e["@@iterator"],typeof e=="function"?e:null)}var na={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},ta=Object.assign,ra={};function ft(e,n,t){this.props=e,this.context=n,this.refs=ra,this.updater=t||na}ft.prototype.isReactComponent={};ft.prototype.setState=function(e,n){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,n,"setState")};ft.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function ia(){}ia.prototype=ft.prototype;function Gl(e,n,t){this.props=e,this.context=n,this.refs=ra,this.updater=t||na}var Kl=Gl.prototype=new ia;Kl.constructor=Gl;ta(Kl,ft.prototype);Kl.isPureReactComponent=!0;var Bo=Array.isArray,la=Object.prototype.hasOwnProperty,Yl={current:null},oa={key:!0,ref:!0,__self:!0,__source:!0};function sa(e,n,t){var r,i={},l=null,o=null;if(n!=null)for(r in n.ref!==void 0&&(o=n.ref),n.key!==void 0&&(l=""+n.key),n)la.call(n,r)&&!oa.hasOwnProperty(r)&&(i[r]=n[r]);var a=arguments.length-2;if(a===1)i.children=t;else if(1<a){for(var u=Array(a),d=0;d<a;d++)u[d]=arguments[d+2];i.children=u}if(e&&e.defaultProps)for(r in a=e.defaultProps,a)i[r]===void 0&&(i[r]=a[r]);return{$$typeof:Jt,type:e,key:l,ref:o,props:i,_owner:Yl.current}}function Nc(e,n){return{$$typeof:Jt,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}function Xl(e){return typeof e=="object"&&e!==null&&e.$$typeof===Jt}function Sc(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(t){return n[t]})}var Ho=/\/+/g;function _i(e,n){return typeof e=="object"&&e!==null&&e.key!=null?Sc(""+e.key):n.toString(36)}function Sr(e,n,t,r,i){var l=typeof e;(l==="undefined"||l==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(l){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case Jt:case fc:o=!0}}if(o)return o=e,i=i(o),e=r===""?"."+_i(o,0):r,Bo(i)?(t="",e!=null&&(t=e.replace(Ho,"$&/")+"/"),Sr(i,n,t,"",function(d){return d})):i!=null&&(Xl(i)&&(i=Nc(i,t+(!i.key||o&&o.key===i.key?"":(""+i.key).replace(Ho,"$&/")+"/")+e)),n.push(i)),1;if(o=0,r=r===""?".":r+":",Bo(e))for(var a=0;a<e.length;a++){l=e[a];var u=r+_i(l,a);o+=Sr(l,n,t,u,i)}else if(u=jc(e),typeof u=="function")for(e=u.call(e),a=0;!(l=e.next()).done;)l=l.value,u=r+_i(l,a++),o+=Sr(l,n,t,u,i);else if(l==="object")throw n=String(e),Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.");return o}function sr(e,n,t){if(e==null)return e;var r=[],i=0;return Sr(e,r,"","",function(l){return n.call(t,l,i++)}),r}function _c(e){if(e._status===-1){var n=e._result;n=n(),n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var fe={current:null},_r={transition:null},bc={ReactCurrentDispatcher:fe,ReactCurrentBatchConfig:_r,ReactCurrentOwner:Yl};function aa(){throw Error("act(...) is not supported in production builds of React.")}R.Children={map:sr,forEach:function(e,n,t){sr(e,function(){n.apply(this,arguments)},t)},count:function(e){var n=0;return sr(e,function(){n++}),n},toArray:function(e){return sr(e,function(n){return n})||[]},only:function(e){if(!Xl(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};R.Component=ft;R.Fragment=pc;R.Profiler=gc;R.PureComponent=Gl;R.StrictMode=mc;R.Suspense=yc;R.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=bc;R.act=aa;R.cloneElement=function(e,n,t){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=ta({},e.props),i=e.key,l=e.ref,o=e._owner;if(n!=null){if(n.ref!==void 0&&(l=n.ref,o=Yl.current),n.key!==void 0&&(i=""+n.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(u in n)la.call(n,u)&&!oa.hasOwnProperty(u)&&(r[u]=n[u]===void 0&&a!==void 0?a[u]:n[u])}var u=arguments.length-2;if(u===1)r.children=t;else if(1<u){a=Array(u);for(var d=0;d<u;d++)a[d]=arguments[d+2];r.children=a}return{$$typeof:Jt,type:e.type,key:i,ref:l,props:r,_owner:o}};R.createContext=function(e){return e={$$typeof:vc,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:hc,_context:e},e.Consumer=e};R.createElement=sa;R.createFactory=function(e){var n=sa.bind(null,e);return n.type=e,n};R.createRef=function(){return{current:null}};R.forwardRef=function(e){return{$$typeof:xc,render:e}};R.isValidElement=Xl;R.lazy=function(e){return{$$typeof:kc,_payload:{_status:-1,_result:e},_init:_c}};R.memo=function(e,n){return{$$typeof:wc,type:e,compare:n===void 0?null:n}};R.startTransition=function(e){var n=_r.transition;_r.transition={};try{e()}finally{_r.transition=n}};R.unstable_act=aa;R.useCallback=function(e,n){return fe.current.useCallback(e,n)};R.useContext=function(e){return fe.current.useContext(e)};R.useDebugValue=function(){};R.useDeferredValue=function(e){return fe.current.useDeferredValue(e)};R.useEffect=function(e,n){return fe.current.useEffect(e,n)};R.useId=function(){return fe.current.useId()};R.useImperativeHandle=function(e,n,t){return fe.current.useImperativeHandle(e,n,t)};R.useInsertionEffect=function(e,n){return fe.current.useInsertionEffect(e,n)};R.useLayoutEffect=function(e,n){return fe.current.useLayoutEffect(e,n)};R.useMemo=function(e,n){return fe.current.useMemo(e,n)};R.useReducer=function(e,n,t){return fe.current.useReducer(e,n,t)};R.useRef=function(e){return fe.current.useRef(e)};R.useState=function(e){return fe.current.useState(e)};R.useSyncExternalStore=function(e,n,t){return fe.current.useSyncExternalStore(e,n,t)};R.useTransition=function(){return fe.current.useTransition()};R.version="18.3.1";ea.exports=R;var L=ea.exports;const Ec=dc(L);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Cc=L,zc=Symbol.for("react.element"),Pc=Symbol.for("react.fragment"),Tc=Object.prototype.hasOwnProperty,Lc=Cc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Rc={key:!0,ref:!0,__self:!0,__source:!0};function ua(e,n,t){var r,i={},l=null,o=null;t!==void 0&&(l=""+t),n.key!==void 0&&(l=""+n.key),n.ref!==void 0&&(o=n.ref);for(r in n)Tc.call(n,r)&&!Rc.hasOwnProperty(r)&&(i[r]=n[r]);if(e&&e.defaultProps)for(r in n=e.defaultProps,n)i[r]===void 0&&(i[r]=n[r]);return{$$typeof:zc,type:e,key:l,ref:o,props:i,_owner:Lc.current}}si.Fragment=Pc;si.jsx=ua;si.jsxs=ua;Js.exports=si;var s=Js.exports,el={},ca={exports:{}},Ne={},da={exports:{}},fa={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function n(k,_){var C=k.length;k.push(_);e:for(;0<C;){var O=C-1>>>1,K=k[O];if(0<i(K,_))k[O]=_,k[C]=K,C=O;else break e}}function t(k){return k.length===0?null:k[0]}function r(k){if(k.length===0)return null;var _=k[0],C=k.pop();if(C!==_){k[0]=C;e:for(var O=0,K=k.length,lr=K>>>1;O<lr;){var Sn=2*(O+1)-1,Si=k[Sn],_n=Sn+1,or=k[_n];if(0>i(Si,C))_n<K&&0>i(or,Si)?(k[O]=or,k[_n]=C,O=_n):(k[O]=Si,k[Sn]=C,O=Sn);else if(_n<K&&0>i(or,C))k[O]=or,k[_n]=C,O=_n;else break e}}return _}function i(k,_){var C=k.sortIndex-_.sortIndex;return C!==0?C:k.id-_.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;e.unstable_now=function(){return l.now()}}else{var o=Date,a=o.now();e.unstable_now=function(){return o.now()-a}}var u=[],d=[],g=1,h=null,p=3,v=!1,y=!1,j=!1,D=typeof setTimeout=="function"?setTimeout:null,f=typeof clearTimeout=="function"?clearTimeout:null,c=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function m(k){for(var _=t(d);_!==null;){if(_.callback===null)r(d);else if(_.startTime<=k)r(d),_.sortIndex=_.expirationTime,n(u,_);else break;_=t(d)}}function x(k){if(j=!1,m(k),!y)if(t(u)!==null)y=!0,ir(N);else{var _=t(d);_!==null&&$(x,_.startTime-k)}}function N(k,_){y=!1,j&&(j=!1,f(z),z=-1),v=!0;var C=p;try{for(m(_),h=t(u);h!==null&&(!(h.expirationTime>_)||k&&!le());){var O=h.callback;if(typeof O=="function"){h.callback=null,p=h.priorityLevel;var K=O(h.expirationTime<=_);_=e.unstable_now(),typeof K=="function"?h.callback=K:h===t(u)&&r(u),m(_)}else r(u);h=t(u)}if(h!==null)var lr=!0;else{var Sn=t(d);Sn!==null&&$(x,Sn.startTime-_),lr=!1}return lr}finally{h=null,p=C,v=!1}}var b=!1,E=null,z=-1,M=5,T=-1;function le(){return!(e.unstable_now()-T<M)}function en(){if(E!==null){var k=e.unstable_now();T=k;var _=!0;try{_=E(!0,k)}finally{_?nn():(b=!1,E=null)}}else b=!1}var nn;if(typeof c=="function")nn=function(){c(en)};else if(typeof MessageChannel<"u"){var Ni=new MessageChannel,Vo=Ni.port2;Ni.port1.onmessage=en,nn=function(){Vo.postMessage(null)}}else nn=function(){D(en,0)};function ir(k){E=k,b||(b=!0,nn())}function $(k,_){z=D(function(){k(e.unstable_now())},_)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(k){k.callback=null},e.unstable_continueExecution=function(){y||v||(y=!0,ir(N))},e.unstable_forceFrameRate=function(k){0>k||125<k?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):M=0<k?Math.floor(1e3/k):5},e.unstable_getCurrentPriorityLevel=function(){return p},e.unstable_getFirstCallbackNode=function(){return t(u)},e.unstable_next=function(k){switch(p){case 1:case 2:case 3:var _=3;break;default:_=p}var C=p;p=_;try{return k()}finally{p=C}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(k,_){switch(k){case 1:case 2:case 3:case 4:case 5:break;default:k=3}var C=p;p=k;try{return _()}finally{p=C}},e.unstable_scheduleCallback=function(k,_,C){var O=e.unstable_now();switch(typeof C=="object"&&C!==null?(C=C.delay,C=typeof C=="number"&&0<C?O+C:O):C=O,k){case 1:var K=-1;break;case 2:K=250;break;case 5:K=1073741823;break;case 4:K=1e4;break;default:K=5e3}return K=C+K,k={id:g++,callback:_,priorityLevel:k,startTime:C,expirationTime:K,sortIndex:-1},C>O?(k.sortIndex=C,n(d,k),t(u)===null&&k===t(d)&&(j?(f(z),z=-1):j=!0,$(x,C-O))):(k.sortIndex=K,n(u,k),y||v||(y=!0,ir(N))),k},e.unstable_shouldYield=le,e.unstable_wrapCallback=function(k){var _=p;return function(){var C=p;p=_;try{return k.apply(this,arguments)}finally{p=C}}}})(fa);da.exports=fa;var Dc=da.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Oc=L,je=Dc;function w(e){for(var n="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var pa=new Set,At={};function Mn(e,n){lt(e,n),lt(e+"Capture",n)}function lt(e,n){for(At[e]=n,e=0;e<n.length;e++)pa.add(n[e])}var Ke=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),nl=Object.prototype.hasOwnProperty,Ac=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Qo={},Go={};function Ic(e){return nl.call(Go,e)?!0:nl.call(Qo,e)?!1:Ac.test(e)?Go[e]=!0:(Qo[e]=!0,!1)}function Mc(e,n,t,r){if(t!==null&&t.type===0)return!1;switch(typeof n){case"function":case"symbol":return!0;case"boolean":return r?!1:t!==null?!t.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Fc(e,n,t,r){if(n===null||typeof n>"u"||Mc(e,n,t,r))return!0;if(r)return!1;if(t!==null)switch(t.type){case 3:return!n;case 4:return n===!1;case 5:return isNaN(n);case 6:return isNaN(n)||1>n}return!1}function pe(e,n,t,r,i,l,o){this.acceptsBooleans=n===2||n===3||n===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=t,this.propertyName=e,this.type=n,this.sanitizeURL=l,this.removeEmptyString=o}var ie={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ie[e]=new pe(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var n=e[0];ie[n]=new pe(n,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){ie[e]=new pe(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ie[e]=new pe(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ie[e]=new pe(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){ie[e]=new pe(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){ie[e]=new pe(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){ie[e]=new pe(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){ie[e]=new pe(e,5,!1,e.toLowerCase(),null,!1,!1)});var Zl=/[\-:]([a-z])/g;function Jl(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var n=e.replace(Zl,Jl);ie[n]=new pe(n,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var n=e.replace(Zl,Jl);ie[n]=new pe(n,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var n=e.replace(Zl,Jl);ie[n]=new pe(n,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){ie[e]=new pe(e,1,!1,e.toLowerCase(),null,!1,!1)});ie.xlinkHref=new pe("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){ie[e]=new pe(e,1,!1,e.toLowerCase(),null,!0,!0)});function eo(e,n,t,r){var i=ie.hasOwnProperty(n)?ie[n]:null;(i!==null?i.type!==0:r||!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(Fc(n,t,i,r)&&(t=null),r||i===null?Ic(n)&&(t===null?e.removeAttribute(n):e.setAttribute(n,""+t)):i.mustUseProperty?e[i.propertyName]=t===null?i.type===3?!1:"":t:(n=i.attributeName,r=i.attributeNamespace,t===null?e.removeAttribute(n):(i=i.type,t=i===3||i===4&&t===!0?"":""+t,r?e.setAttributeNS(r,n,t):e.setAttribute(n,t))))}var Je=Oc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ar=Symbol.for("react.element"),Un=Symbol.for("react.portal"),qn=Symbol.for("react.fragment"),no=Symbol.for("react.strict_mode"),tl=Symbol.for("react.profiler"),ma=Symbol.for("react.provider"),ga=Symbol.for("react.context"),to=Symbol.for("react.forward_ref"),rl=Symbol.for("react.suspense"),il=Symbol.for("react.suspense_list"),ro=Symbol.for("react.memo"),ln=Symbol.for("react.lazy"),ha=Symbol.for("react.offscreen"),Ko=Symbol.iterator;function gt(e){return e===null||typeof e!="object"?null:(e=Ko&&e[Ko]||e["@@iterator"],typeof e=="function"?e:null)}var H=Object.assign,bi;function Nt(e){if(bi===void 0)try{throw Error()}catch(t){var n=t.stack.trim().match(/\n( *(at )?)/);bi=n&&n[1]||""}return`
`+bi+e}var Ei=!1;function Ci(e,n){if(!e||Ei)return"";Ei=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(n)if(n=function(){throw Error()},Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(n,[])}catch(d){var r=d}Reflect.construct(e,[],n)}else{try{n.call()}catch(d){r=d}e.call(n.prototype)}else{try{throw Error()}catch(d){r=d}e()}}catch(d){if(d&&r&&typeof d.stack=="string"){for(var i=d.stack.split(`
`),l=r.stack.split(`
`),o=i.length-1,a=l.length-1;1<=o&&0<=a&&i[o]!==l[a];)a--;for(;1<=o&&0<=a;o--,a--)if(i[o]!==l[a]){if(o!==1||a!==1)do if(o--,a--,0>a||i[o]!==l[a]){var u=`
`+i[o].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=o&&0<=a);break}}}finally{Ei=!1,Error.prepareStackTrace=t}return(e=e?e.displayName||e.name:"")?Nt(e):""}function $c(e){switch(e.tag){case 5:return Nt(e.type);case 16:return Nt("Lazy");case 13:return Nt("Suspense");case 19:return Nt("SuspenseList");case 0:case 2:case 15:return e=Ci(e.type,!1),e;case 11:return e=Ci(e.type.render,!1),e;case 1:return e=Ci(e.type,!0),e;default:return""}}function ll(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case qn:return"Fragment";case Un:return"Portal";case tl:return"Profiler";case no:return"StrictMode";case rl:return"Suspense";case il:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case ga:return(e.displayName||"Context")+".Consumer";case ma:return(e._context.displayName||"Context")+".Provider";case to:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case ro:return n=e.displayName||null,n!==null?n:ll(e.type)||"Memo";case ln:n=e._payload,e=e._init;try{return ll(e(n))}catch{}}return null}function Uc(e){var n=e.type;switch(e.tag){case 24:return"Cache";case 9:return(n.displayName||"Context")+".Consumer";case 10:return(n._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=n.render,e=e.displayName||e.name||"",n.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return n;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ll(n);case 8:return n===no?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n}return null}function yn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function va(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function qc(e){var n=va(e)?"checked":"value",t=Object.getOwnPropertyDescriptor(e.constructor.prototype,n),r=""+e[n];if(!e.hasOwnProperty(n)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var i=t.get,l=t.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return i.call(this)},set:function(o){r=""+o,l.call(this,o)}}),Object.defineProperty(e,n,{enumerable:t.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function ur(e){e._valueTracker||(e._valueTracker=qc(e))}function xa(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var t=n.getValue(),r="";return e&&(r=va(e)?e.checked?"true":"false":e.value),e=r,e!==t?(n.setValue(e),!0):!1}function Ir(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function ol(e,n){var t=n.checked;return H({},n,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??e._wrapperState.initialChecked})}function Yo(e,n){var t=n.defaultValue==null?"":n.defaultValue,r=n.checked!=null?n.checked:n.defaultChecked;t=yn(n.value!=null?n.value:t),e._wrapperState={initialChecked:r,initialValue:t,controlled:n.type==="checkbox"||n.type==="radio"?n.checked!=null:n.value!=null}}function ya(e,n){n=n.checked,n!=null&&eo(e,"checked",n,!1)}function sl(e,n){ya(e,n);var t=yn(n.value),r=n.type;if(t!=null)r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+t):e.value!==""+t&&(e.value=""+t);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}n.hasOwnProperty("value")?al(e,n.type,t):n.hasOwnProperty("defaultValue")&&al(e,n.type,yn(n.defaultValue)),n.checked==null&&n.defaultChecked!=null&&(e.defaultChecked=!!n.defaultChecked)}function Xo(e,n,t){if(n.hasOwnProperty("value")||n.hasOwnProperty("defaultValue")){var r=n.type;if(!(r!=="submit"&&r!=="reset"||n.value!==void 0&&n.value!==null))return;n=""+e._wrapperState.initialValue,t||n===e.value||(e.value=n),e.defaultValue=n}t=e.name,t!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,t!==""&&(e.name=t)}function al(e,n,t){(n!=="number"||Ir(e.ownerDocument)!==e)&&(t==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+t&&(e.defaultValue=""+t))}var St=Array.isArray;function Jn(e,n,t,r){if(e=e.options,n){n={};for(var i=0;i<t.length;i++)n["$"+t[i]]=!0;for(t=0;t<e.length;t++)i=n.hasOwnProperty("$"+e[t].value),e[t].selected!==i&&(e[t].selected=i),i&&r&&(e[t].defaultSelected=!0)}else{for(t=""+yn(t),n=null,i=0;i<e.length;i++){if(e[i].value===t){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}n!==null||e[i].disabled||(n=e[i])}n!==null&&(n.selected=!0)}}function ul(e,n){if(n.dangerouslySetInnerHTML!=null)throw Error(w(91));return H({},n,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Zo(e,n){var t=n.value;if(t==null){if(t=n.children,n=n.defaultValue,t!=null){if(n!=null)throw Error(w(92));if(St(t)){if(1<t.length)throw Error(w(93));t=t[0]}n=t}n==null&&(n=""),t=n}e._wrapperState={initialValue:yn(t)}}function wa(e,n){var t=yn(n.value),r=yn(n.defaultValue);t!=null&&(t=""+t,t!==e.value&&(e.value=t),n.defaultValue==null&&e.defaultValue!==t&&(e.defaultValue=t)),r!=null&&(e.defaultValue=""+r)}function Jo(e){var n=e.textContent;n===e._wrapperState.initialValue&&n!==""&&n!==null&&(e.value=n)}function ka(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function cl(e,n){return e==null||e==="http://www.w3.org/1999/xhtml"?ka(n):e==="http://www.w3.org/2000/svg"&&n==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var cr,ja=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(n,t,r,i){MSApp.execUnsafeLocalFunction(function(){return e(n,t,r,i)})}:e}(function(e,n){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=n;else{for(cr=cr||document.createElement("div"),cr.innerHTML="<svg>"+n.valueOf().toString()+"</svg>",n=cr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;n.firstChild;)e.appendChild(n.firstChild)}});function It(e,n){if(n){var t=e.firstChild;if(t&&t===e.lastChild&&t.nodeType===3){t.nodeValue=n;return}}e.textContent=n}var Et={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Vc=["Webkit","ms","Moz","O"];Object.keys(Et).forEach(function(e){Vc.forEach(function(n){n=n+e.charAt(0).toUpperCase()+e.substring(1),Et[n]=Et[e]})});function Na(e,n,t){return n==null||typeof n=="boolean"||n===""?"":t||typeof n!="number"||n===0||Et.hasOwnProperty(e)&&Et[e]?(""+n).trim():n+"px"}function Sa(e,n){e=e.style;for(var t in n)if(n.hasOwnProperty(t)){var r=t.indexOf("--")===0,i=Na(t,n[t],r);t==="float"&&(t="cssFloat"),r?e.setProperty(t,i):e[t]=i}}var Wc=H({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function dl(e,n){if(n){if(Wc[e]&&(n.children!=null||n.dangerouslySetInnerHTML!=null))throw Error(w(137,e));if(n.dangerouslySetInnerHTML!=null){if(n.children!=null)throw Error(w(60));if(typeof n.dangerouslySetInnerHTML!="object"||!("__html"in n.dangerouslySetInnerHTML))throw Error(w(61))}if(n.style!=null&&typeof n.style!="object")throw Error(w(62))}}function fl(e,n){if(e.indexOf("-")===-1)return typeof n.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var pl=null;function io(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ml=null,et=null,nt=null;function es(e){if(e=tr(e)){if(typeof ml!="function")throw Error(w(280));var n=e.stateNode;n&&(n=fi(n),ml(e.stateNode,e.type,n))}}function _a(e){et?nt?nt.push(e):nt=[e]:et=e}function ba(){if(et){var e=et,n=nt;if(nt=et=null,es(e),n)for(e=0;e<n.length;e++)es(n[e])}}function Ea(e,n){return e(n)}function Ca(){}var zi=!1;function za(e,n,t){if(zi)return e(n,t);zi=!0;try{return Ea(e,n,t)}finally{zi=!1,(et!==null||nt!==null)&&(Ca(),ba())}}function Mt(e,n){var t=e.stateNode;if(t===null)return null;var r=fi(t);if(r===null)return null;t=r[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(t&&typeof t!="function")throw Error(w(231,n,typeof t));return t}var gl=!1;if(Ke)try{var ht={};Object.defineProperty(ht,"passive",{get:function(){gl=!0}}),window.addEventListener("test",ht,ht),window.removeEventListener("test",ht,ht)}catch{gl=!1}function Bc(e,n,t,r,i,l,o,a,u){var d=Array.prototype.slice.call(arguments,3);try{n.apply(t,d)}catch(g){this.onError(g)}}var Ct=!1,Mr=null,Fr=!1,hl=null,Hc={onError:function(e){Ct=!0,Mr=e}};function Qc(e,n,t,r,i,l,o,a,u){Ct=!1,Mr=null,Bc.apply(Hc,arguments)}function Gc(e,n,t,r,i,l,o,a,u){if(Qc.apply(this,arguments),Ct){if(Ct){var d=Mr;Ct=!1,Mr=null}else throw Error(w(198));Fr||(Fr=!0,hl=d)}}function Fn(e){var n=e,t=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,n.flags&4098&&(t=n.return),e=n.return;while(e)}return n.tag===3?t:null}function Pa(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function ns(e){if(Fn(e)!==e)throw Error(w(188))}function Kc(e){var n=e.alternate;if(!n){if(n=Fn(e),n===null)throw Error(w(188));return n!==e?null:e}for(var t=e,r=n;;){var i=t.return;if(i===null)break;var l=i.alternate;if(l===null){if(r=i.return,r!==null){t=r;continue}break}if(i.child===l.child){for(l=i.child;l;){if(l===t)return ns(i),e;if(l===r)return ns(i),n;l=l.sibling}throw Error(w(188))}if(t.return!==r.return)t=i,r=l;else{for(var o=!1,a=i.child;a;){if(a===t){o=!0,t=i,r=l;break}if(a===r){o=!0,r=i,t=l;break}a=a.sibling}if(!o){for(a=l.child;a;){if(a===t){o=!0,t=l,r=i;break}if(a===r){o=!0,r=l,t=i;break}a=a.sibling}if(!o)throw Error(w(189))}}if(t.alternate!==r)throw Error(w(190))}if(t.tag!==3)throw Error(w(188));return t.stateNode.current===t?e:n}function Ta(e){return e=Kc(e),e!==null?La(e):null}function La(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var n=La(e);if(n!==null)return n;e=e.sibling}return null}var Ra=je.unstable_scheduleCallback,ts=je.unstable_cancelCallback,Yc=je.unstable_shouldYield,Xc=je.unstable_requestPaint,G=je.unstable_now,Zc=je.unstable_getCurrentPriorityLevel,lo=je.unstable_ImmediatePriority,Da=je.unstable_UserBlockingPriority,$r=je.unstable_NormalPriority,Jc=je.unstable_LowPriority,Oa=je.unstable_IdlePriority,ai=null,Ue=null;function ed(e){if(Ue&&typeof Ue.onCommitFiberRoot=="function")try{Ue.onCommitFiberRoot(ai,e,void 0,(e.current.flags&128)===128)}catch{}}var Oe=Math.clz32?Math.clz32:rd,nd=Math.log,td=Math.LN2;function rd(e){return e>>>=0,e===0?32:31-(nd(e)/td|0)|0}var dr=64,fr=4194304;function _t(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Ur(e,n){var t=e.pendingLanes;if(t===0)return 0;var r=0,i=e.suspendedLanes,l=e.pingedLanes,o=t&268435455;if(o!==0){var a=o&~i;a!==0?r=_t(a):(l&=o,l!==0&&(r=_t(l)))}else o=t&~i,o!==0?r=_t(o):l!==0&&(r=_t(l));if(r===0)return 0;if(n!==0&&n!==r&&!(n&i)&&(i=r&-r,l=n&-n,i>=l||i===16&&(l&4194240)!==0))return n;if(r&4&&(r|=t&16),n=e.entangledLanes,n!==0)for(e=e.entanglements,n&=r;0<n;)t=31-Oe(n),i=1<<t,r|=e[t],n&=~i;return r}function id(e,n){switch(e){case 1:case 2:case 4:return n+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ld(e,n){for(var t=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,l=e.pendingLanes;0<l;){var o=31-Oe(l),a=1<<o,u=i[o];u===-1?(!(a&t)||a&r)&&(i[o]=id(a,n)):u<=n&&(e.expiredLanes|=a),l&=~a}}function vl(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Aa(){var e=dr;return dr<<=1,!(dr&4194240)&&(dr=64),e}function Pi(e){for(var n=[],t=0;31>t;t++)n.push(e);return n}function er(e,n,t){e.pendingLanes|=n,n!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,n=31-Oe(n),e[n]=t}function od(e,n){var t=e.pendingLanes&~n;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=n,e.mutableReadLanes&=n,e.entangledLanes&=n,n=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<t;){var i=31-Oe(t),l=1<<i;n[i]=0,r[i]=-1,e[i]=-1,t&=~l}}function oo(e,n){var t=e.entangledLanes|=n;for(e=e.entanglements;t;){var r=31-Oe(t),i=1<<r;i&n|e[r]&n&&(e[r]|=n),t&=~i}}var I=0;function Ia(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Ma,so,Fa,$a,Ua,xl=!1,pr=[],dn=null,fn=null,pn=null,Ft=new Map,$t=new Map,sn=[],sd="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function rs(e,n){switch(e){case"focusin":case"focusout":dn=null;break;case"dragenter":case"dragleave":fn=null;break;case"mouseover":case"mouseout":pn=null;break;case"pointerover":case"pointerout":Ft.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":$t.delete(n.pointerId)}}function vt(e,n,t,r,i,l){return e===null||e.nativeEvent!==l?(e={blockedOn:n,domEventName:t,eventSystemFlags:r,nativeEvent:l,targetContainers:[i]},n!==null&&(n=tr(n),n!==null&&so(n)),e):(e.eventSystemFlags|=r,n=e.targetContainers,i!==null&&n.indexOf(i)===-1&&n.push(i),e)}function ad(e,n,t,r,i){switch(n){case"focusin":return dn=vt(dn,e,n,t,r,i),!0;case"dragenter":return fn=vt(fn,e,n,t,r,i),!0;case"mouseover":return pn=vt(pn,e,n,t,r,i),!0;case"pointerover":var l=i.pointerId;return Ft.set(l,vt(Ft.get(l)||null,e,n,t,r,i)),!0;case"gotpointercapture":return l=i.pointerId,$t.set(l,vt($t.get(l)||null,e,n,t,r,i)),!0}return!1}function qa(e){var n=Cn(e.target);if(n!==null){var t=Fn(n);if(t!==null){if(n=t.tag,n===13){if(n=Pa(t),n!==null){e.blockedOn=n,Ua(e.priority,function(){Fa(t)});return}}else if(n===3&&t.stateNode.current.memoizedState.isDehydrated){e.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}e.blockedOn=null}function br(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var t=yl(e.domEventName,e.eventSystemFlags,n[0],e.nativeEvent);if(t===null){t=e.nativeEvent;var r=new t.constructor(t.type,t);pl=r,t.target.dispatchEvent(r),pl=null}else return n=tr(t),n!==null&&so(n),e.blockedOn=t,!1;n.shift()}return!0}function is(e,n,t){br(e)&&t.delete(n)}function ud(){xl=!1,dn!==null&&br(dn)&&(dn=null),fn!==null&&br(fn)&&(fn=null),pn!==null&&br(pn)&&(pn=null),Ft.forEach(is),$t.forEach(is)}function xt(e,n){e.blockedOn===n&&(e.blockedOn=null,xl||(xl=!0,je.unstable_scheduleCallback(je.unstable_NormalPriority,ud)))}function Ut(e){function n(i){return xt(i,e)}if(0<pr.length){xt(pr[0],e);for(var t=1;t<pr.length;t++){var r=pr[t];r.blockedOn===e&&(r.blockedOn=null)}}for(dn!==null&&xt(dn,e),fn!==null&&xt(fn,e),pn!==null&&xt(pn,e),Ft.forEach(n),$t.forEach(n),t=0;t<sn.length;t++)r=sn[t],r.blockedOn===e&&(r.blockedOn=null);for(;0<sn.length&&(t=sn[0],t.blockedOn===null);)qa(t),t.blockedOn===null&&sn.shift()}var tt=Je.ReactCurrentBatchConfig,qr=!0;function cd(e,n,t,r){var i=I,l=tt.transition;tt.transition=null;try{I=1,ao(e,n,t,r)}finally{I=i,tt.transition=l}}function dd(e,n,t,r){var i=I,l=tt.transition;tt.transition=null;try{I=4,ao(e,n,t,r)}finally{I=i,tt.transition=l}}function ao(e,n,t,r){if(qr){var i=yl(e,n,t,r);if(i===null)$i(e,n,r,Vr,t),rs(e,r);else if(ad(i,e,n,t,r))r.stopPropagation();else if(rs(e,r),n&4&&-1<sd.indexOf(e)){for(;i!==null;){var l=tr(i);if(l!==null&&Ma(l),l=yl(e,n,t,r),l===null&&$i(e,n,r,Vr,t),l===i)break;i=l}i!==null&&r.stopPropagation()}else $i(e,n,r,null,t)}}var Vr=null;function yl(e,n,t,r){if(Vr=null,e=io(r),e=Cn(e),e!==null)if(n=Fn(e),n===null)e=null;else if(t=n.tag,t===13){if(e=Pa(n),e!==null)return e;e=null}else if(t===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null);return Vr=e,null}function Va(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Zc()){case lo:return 1;case Da:return 4;case $r:case Jc:return 16;case Oa:return 536870912;default:return 16}default:return 16}}var un=null,uo=null,Er=null;function Wa(){if(Er)return Er;var e,n=uo,t=n.length,r,i="value"in un?un.value:un.textContent,l=i.length;for(e=0;e<t&&n[e]===i[e];e++);var o=t-e;for(r=1;r<=o&&n[t-r]===i[l-r];r++);return Er=i.slice(e,1<r?1-r:void 0)}function Cr(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function mr(){return!0}function ls(){return!1}function Se(e){function n(t,r,i,l,o){this._reactName=t,this._targetInst=i,this.type=r,this.nativeEvent=l,this.target=o,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(t=e[a],this[a]=t?t(l):l[a]);return this.isDefaultPrevented=(l.defaultPrevented!=null?l.defaultPrevented:l.returnValue===!1)?mr:ls,this.isPropagationStopped=ls,this}return H(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=mr)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=mr)},persist:function(){},isPersistent:mr}),n}var pt={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},co=Se(pt),nr=H({},pt,{view:0,detail:0}),fd=Se(nr),Ti,Li,yt,ui=H({},nr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:fo,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==yt&&(yt&&e.type==="mousemove"?(Ti=e.screenX-yt.screenX,Li=e.screenY-yt.screenY):Li=Ti=0,yt=e),Ti)},movementY:function(e){return"movementY"in e?e.movementY:Li}}),os=Se(ui),pd=H({},ui,{dataTransfer:0}),md=Se(pd),gd=H({},nr,{relatedTarget:0}),Ri=Se(gd),hd=H({},pt,{animationName:0,elapsedTime:0,pseudoElement:0}),vd=Se(hd),xd=H({},pt,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),yd=Se(xd),wd=H({},pt,{data:0}),ss=Se(wd),kd={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},jd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Nd={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Sd(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=Nd[e])?!!n[e]:!1}function fo(){return Sd}var _d=H({},nr,{key:function(e){if(e.key){var n=kd[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Cr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?jd[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:fo,charCode:function(e){return e.type==="keypress"?Cr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Cr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),bd=Se(_d),Ed=H({},ui,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),as=Se(Ed),Cd=H({},nr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:fo}),zd=Se(Cd),Pd=H({},pt,{propertyName:0,elapsedTime:0,pseudoElement:0}),Td=Se(Pd),Ld=H({},ui,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Rd=Se(Ld),Dd=[9,13,27,32],po=Ke&&"CompositionEvent"in window,zt=null;Ke&&"documentMode"in document&&(zt=document.documentMode);var Od=Ke&&"TextEvent"in window&&!zt,Ba=Ke&&(!po||zt&&8<zt&&11>=zt),us=" ",cs=!1;function Ha(e,n){switch(e){case"keyup":return Dd.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Qa(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Vn=!1;function Ad(e,n){switch(e){case"compositionend":return Qa(n);case"keypress":return n.which!==32?null:(cs=!0,us);case"textInput":return e=n.data,e===us&&cs?null:e;default:return null}}function Id(e,n){if(Vn)return e==="compositionend"||!po&&Ha(e,n)?(e=Wa(),Er=uo=un=null,Vn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Ba&&n.locale!=="ko"?null:n.data;default:return null}}var Md={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ds(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!Md[e.type]:n==="textarea"}function Ga(e,n,t,r){_a(r),n=Wr(n,"onChange"),0<n.length&&(t=new co("onChange","change",null,t,r),e.push({event:t,listeners:n}))}var Pt=null,qt=null;function Fd(e){lu(e,0)}function ci(e){var n=Hn(e);if(xa(n))return e}function $d(e,n){if(e==="change")return n}var Ka=!1;if(Ke){var Di;if(Ke){var Oi="oninput"in document;if(!Oi){var fs=document.createElement("div");fs.setAttribute("oninput","return;"),Oi=typeof fs.oninput=="function"}Di=Oi}else Di=!1;Ka=Di&&(!document.documentMode||9<document.documentMode)}function ps(){Pt&&(Pt.detachEvent("onpropertychange",Ya),qt=Pt=null)}function Ya(e){if(e.propertyName==="value"&&ci(qt)){var n=[];Ga(n,qt,e,io(e)),za(Fd,n)}}function Ud(e,n,t){e==="focusin"?(ps(),Pt=n,qt=t,Pt.attachEvent("onpropertychange",Ya)):e==="focusout"&&ps()}function qd(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return ci(qt)}function Vd(e,n){if(e==="click")return ci(n)}function Wd(e,n){if(e==="input"||e==="change")return ci(n)}function Bd(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var Ie=typeof Object.is=="function"?Object.is:Bd;function Vt(e,n){if(Ie(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var t=Object.keys(e),r=Object.keys(n);if(t.length!==r.length)return!1;for(r=0;r<t.length;r++){var i=t[r];if(!nl.call(n,i)||!Ie(e[i],n[i]))return!1}return!0}function ms(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function gs(e,n){var t=ms(e);e=0;for(var r;t;){if(t.nodeType===3){if(r=e+t.textContent.length,e<=n&&r>=n)return{node:t,offset:n-e};e=r}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=ms(t)}}function Xa(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?Xa(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function Za(){for(var e=window,n=Ir();n instanceof e.HTMLIFrameElement;){try{var t=typeof n.contentWindow.location.href=="string"}catch{t=!1}if(t)e=n.contentWindow;else break;n=Ir(e.document)}return n}function mo(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}function Hd(e){var n=Za(),t=e.focusedElem,r=e.selectionRange;if(n!==t&&t&&t.ownerDocument&&Xa(t.ownerDocument.documentElement,t)){if(r!==null&&mo(t)){if(n=r.start,e=r.end,e===void 0&&(e=n),"selectionStart"in t)t.selectionStart=n,t.selectionEnd=Math.min(e,t.value.length);else if(e=(n=t.ownerDocument||document)&&n.defaultView||window,e.getSelection){e=e.getSelection();var i=t.textContent.length,l=Math.min(r.start,i);r=r.end===void 0?l:Math.min(r.end,i),!e.extend&&l>r&&(i=r,r=l,l=i),i=gs(t,l);var o=gs(t,r);i&&o&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(n=n.createRange(),n.setStart(i.node,i.offset),e.removeAllRanges(),l>r?(e.addRange(n),e.extend(o.node,o.offset)):(n.setEnd(o.node,o.offset),e.addRange(n)))}}for(n=[],e=t;e=e.parentNode;)e.nodeType===1&&n.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<n.length;t++)e=n[t],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Qd=Ke&&"documentMode"in document&&11>=document.documentMode,Wn=null,wl=null,Tt=null,kl=!1;function hs(e,n,t){var r=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;kl||Wn==null||Wn!==Ir(r)||(r=Wn,"selectionStart"in r&&mo(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Tt&&Vt(Tt,r)||(Tt=r,r=Wr(wl,"onSelect"),0<r.length&&(n=new co("onSelect","select",null,n,t),e.push({event:n,listeners:r}),n.target=Wn)))}function gr(e,n){var t={};return t[e.toLowerCase()]=n.toLowerCase(),t["Webkit"+e]="webkit"+n,t["Moz"+e]="moz"+n,t}var Bn={animationend:gr("Animation","AnimationEnd"),animationiteration:gr("Animation","AnimationIteration"),animationstart:gr("Animation","AnimationStart"),transitionend:gr("Transition","TransitionEnd")},Ai={},Ja={};Ke&&(Ja=document.createElement("div").style,"AnimationEvent"in window||(delete Bn.animationend.animation,delete Bn.animationiteration.animation,delete Bn.animationstart.animation),"TransitionEvent"in window||delete Bn.transitionend.transition);function di(e){if(Ai[e])return Ai[e];if(!Bn[e])return e;var n=Bn[e],t;for(t in n)if(n.hasOwnProperty(t)&&t in Ja)return Ai[e]=n[t];return e}var eu=di("animationend"),nu=di("animationiteration"),tu=di("animationstart"),ru=di("transitionend"),iu=new Map,vs="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function kn(e,n){iu.set(e,n),Mn(n,[e])}for(var Ii=0;Ii<vs.length;Ii++){var Mi=vs[Ii],Gd=Mi.toLowerCase(),Kd=Mi[0].toUpperCase()+Mi.slice(1);kn(Gd,"on"+Kd)}kn(eu,"onAnimationEnd");kn(nu,"onAnimationIteration");kn(tu,"onAnimationStart");kn("dblclick","onDoubleClick");kn("focusin","onFocus");kn("focusout","onBlur");kn(ru,"onTransitionEnd");lt("onMouseEnter",["mouseout","mouseover"]);lt("onMouseLeave",["mouseout","mouseover"]);lt("onPointerEnter",["pointerout","pointerover"]);lt("onPointerLeave",["pointerout","pointerover"]);Mn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Mn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Mn("onBeforeInput",["compositionend","keypress","textInput","paste"]);Mn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Mn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Mn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var bt="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Yd=new Set("cancel close invalid load scroll toggle".split(" ").concat(bt));function xs(e,n,t){var r=e.type||"unknown-event";e.currentTarget=t,Gc(r,n,void 0,e),e.currentTarget=null}function lu(e,n){n=(n&4)!==0;for(var t=0;t<e.length;t++){var r=e[t],i=r.event;r=r.listeners;e:{var l=void 0;if(n)for(var o=r.length-1;0<=o;o--){var a=r[o],u=a.instance,d=a.currentTarget;if(a=a.listener,u!==l&&i.isPropagationStopped())break e;xs(i,a,d),l=u}else for(o=0;o<r.length;o++){if(a=r[o],u=a.instance,d=a.currentTarget,a=a.listener,u!==l&&i.isPropagationStopped())break e;xs(i,a,d),l=u}}}if(Fr)throw e=hl,Fr=!1,hl=null,e}function U(e,n){var t=n[bl];t===void 0&&(t=n[bl]=new Set);var r=e+"__bubble";t.has(r)||(ou(n,e,2,!1),t.add(r))}function Fi(e,n,t){var r=0;n&&(r|=4),ou(t,e,r,n)}var hr="_reactListening"+Math.random().toString(36).slice(2);function Wt(e){if(!e[hr]){e[hr]=!0,pa.forEach(function(t){t!=="selectionchange"&&(Yd.has(t)||Fi(t,!1,e),Fi(t,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[hr]||(n[hr]=!0,Fi("selectionchange",!1,n))}}function ou(e,n,t,r){switch(Va(n)){case 1:var i=cd;break;case 4:i=dd;break;default:i=ao}t=i.bind(null,n,t,e),i=void 0,!gl||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(i=!0),r?i!==void 0?e.addEventListener(n,t,{capture:!0,passive:i}):e.addEventListener(n,t,!0):i!==void 0?e.addEventListener(n,t,{passive:i}):e.addEventListener(n,t,!1)}function $i(e,n,t,r,i){var l=r;if(!(n&1)&&!(n&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var a=r.stateNode.containerInfo;if(a===i||a.nodeType===8&&a.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var u=o.tag;if((u===3||u===4)&&(u=o.stateNode.containerInfo,u===i||u.nodeType===8&&u.parentNode===i))return;o=o.return}for(;a!==null;){if(o=Cn(a),o===null)return;if(u=o.tag,u===5||u===6){r=l=o;continue e}a=a.parentNode}}r=r.return}za(function(){var d=l,g=io(t),h=[];e:{var p=iu.get(e);if(p!==void 0){var v=co,y=e;switch(e){case"keypress":if(Cr(t)===0)break e;case"keydown":case"keyup":v=bd;break;case"focusin":y="focus",v=Ri;break;case"focusout":y="blur",v=Ri;break;case"beforeblur":case"afterblur":v=Ri;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":v=os;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":v=md;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":v=zd;break;case eu:case nu:case tu:v=vd;break;case ru:v=Td;break;case"scroll":v=fd;break;case"wheel":v=Rd;break;case"copy":case"cut":case"paste":v=yd;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":v=as}var j=(n&4)!==0,D=!j&&e==="scroll",f=j?p!==null?p+"Capture":null:p;j=[];for(var c=d,m;c!==null;){m=c;var x=m.stateNode;if(m.tag===5&&x!==null&&(m=x,f!==null&&(x=Mt(c,f),x!=null&&j.push(Bt(c,x,m)))),D)break;c=c.return}0<j.length&&(p=new v(p,y,null,t,g),h.push({event:p,listeners:j}))}}if(!(n&7)){e:{if(p=e==="mouseover"||e==="pointerover",v=e==="mouseout"||e==="pointerout",p&&t!==pl&&(y=t.relatedTarget||t.fromElement)&&(Cn(y)||y[Ye]))break e;if((v||p)&&(p=g.window===g?g:(p=g.ownerDocument)?p.defaultView||p.parentWindow:window,v?(y=t.relatedTarget||t.toElement,v=d,y=y?Cn(y):null,y!==null&&(D=Fn(y),y!==D||y.tag!==5&&y.tag!==6)&&(y=null)):(v=null,y=d),v!==y)){if(j=os,x="onMouseLeave",f="onMouseEnter",c="mouse",(e==="pointerout"||e==="pointerover")&&(j=as,x="onPointerLeave",f="onPointerEnter",c="pointer"),D=v==null?p:Hn(v),m=y==null?p:Hn(y),p=new j(x,c+"leave",v,t,g),p.target=D,p.relatedTarget=m,x=null,Cn(g)===d&&(j=new j(f,c+"enter",y,t,g),j.target=m,j.relatedTarget=D,x=j),D=x,v&&y)n:{for(j=v,f=y,c=0,m=j;m;m=$n(m))c++;for(m=0,x=f;x;x=$n(x))m++;for(;0<c-m;)j=$n(j),c--;for(;0<m-c;)f=$n(f),m--;for(;c--;){if(j===f||f!==null&&j===f.alternate)break n;j=$n(j),f=$n(f)}j=null}else j=null;v!==null&&ys(h,p,v,j,!1),y!==null&&D!==null&&ys(h,D,y,j,!0)}}e:{if(p=d?Hn(d):window,v=p.nodeName&&p.nodeName.toLowerCase(),v==="select"||v==="input"&&p.type==="file")var N=$d;else if(ds(p))if(Ka)N=Wd;else{N=qd;var b=Ud}else(v=p.nodeName)&&v.toLowerCase()==="input"&&(p.type==="checkbox"||p.type==="radio")&&(N=Vd);if(N&&(N=N(e,d))){Ga(h,N,t,g);break e}b&&b(e,p,d),e==="focusout"&&(b=p._wrapperState)&&b.controlled&&p.type==="number"&&al(p,"number",p.value)}switch(b=d?Hn(d):window,e){case"focusin":(ds(b)||b.contentEditable==="true")&&(Wn=b,wl=d,Tt=null);break;case"focusout":Tt=wl=Wn=null;break;case"mousedown":kl=!0;break;case"contextmenu":case"mouseup":case"dragend":kl=!1,hs(h,t,g);break;case"selectionchange":if(Qd)break;case"keydown":case"keyup":hs(h,t,g)}var E;if(po)e:{switch(e){case"compositionstart":var z="onCompositionStart";break e;case"compositionend":z="onCompositionEnd";break e;case"compositionupdate":z="onCompositionUpdate";break e}z=void 0}else Vn?Ha(e,t)&&(z="onCompositionEnd"):e==="keydown"&&t.keyCode===229&&(z="onCompositionStart");z&&(Ba&&t.locale!=="ko"&&(Vn||z!=="onCompositionStart"?z==="onCompositionEnd"&&Vn&&(E=Wa()):(un=g,uo="value"in un?un.value:un.textContent,Vn=!0)),b=Wr(d,z),0<b.length&&(z=new ss(z,e,null,t,g),h.push({event:z,listeners:b}),E?z.data=E:(E=Qa(t),E!==null&&(z.data=E)))),(E=Od?Ad(e,t):Id(e,t))&&(d=Wr(d,"onBeforeInput"),0<d.length&&(g=new ss("onBeforeInput","beforeinput",null,t,g),h.push({event:g,listeners:d}),g.data=E))}lu(h,n)})}function Bt(e,n,t){return{instance:e,listener:n,currentTarget:t}}function Wr(e,n){for(var t=n+"Capture",r=[];e!==null;){var i=e,l=i.stateNode;i.tag===5&&l!==null&&(i=l,l=Mt(e,t),l!=null&&r.unshift(Bt(e,l,i)),l=Mt(e,n),l!=null&&r.push(Bt(e,l,i))),e=e.return}return r}function $n(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function ys(e,n,t,r,i){for(var l=n._reactName,o=[];t!==null&&t!==r;){var a=t,u=a.alternate,d=a.stateNode;if(u!==null&&u===r)break;a.tag===5&&d!==null&&(a=d,i?(u=Mt(t,l),u!=null&&o.unshift(Bt(t,u,a))):i||(u=Mt(t,l),u!=null&&o.push(Bt(t,u,a)))),t=t.return}o.length!==0&&e.push({event:n,listeners:o})}var Xd=/\r\n?/g,Zd=/\u0000|\uFFFD/g;function ws(e){return(typeof e=="string"?e:""+e).replace(Xd,`
`).replace(Zd,"")}function vr(e,n,t){if(n=ws(n),ws(e)!==n&&t)throw Error(w(425))}function Br(){}var jl=null,Nl=null;function Sl(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var _l=typeof setTimeout=="function"?setTimeout:void 0,Jd=typeof clearTimeout=="function"?clearTimeout:void 0,ks=typeof Promise=="function"?Promise:void 0,ef=typeof queueMicrotask=="function"?queueMicrotask:typeof ks<"u"?function(e){return ks.resolve(null).then(e).catch(nf)}:_l;function nf(e){setTimeout(function(){throw e})}function Ui(e,n){var t=n,r=0;do{var i=t.nextSibling;if(e.removeChild(t),i&&i.nodeType===8)if(t=i.data,t==="/$"){if(r===0){e.removeChild(i),Ut(n);return}r--}else t!=="$"&&t!=="$?"&&t!=="$!"||r++;t=i}while(t);Ut(n)}function mn(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?")break;if(n==="/$")return null}}return e}function js(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="$"||t==="$!"||t==="$?"){if(n===0)return e;n--}else t==="/$"&&n++}e=e.previousSibling}return null}var mt=Math.random().toString(36).slice(2),$e="__reactFiber$"+mt,Ht="__reactProps$"+mt,Ye="__reactContainer$"+mt,bl="__reactEvents$"+mt,tf="__reactListeners$"+mt,rf="__reactHandles$"+mt;function Cn(e){var n=e[$e];if(n)return n;for(var t=e.parentNode;t;){if(n=t[Ye]||t[$e]){if(t=n.alternate,n.child!==null||t!==null&&t.child!==null)for(e=js(e);e!==null;){if(t=e[$e])return t;e=js(e)}return n}e=t,t=e.parentNode}return null}function tr(e){return e=e[$e]||e[Ye],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Hn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(w(33))}function fi(e){return e[Ht]||null}var El=[],Qn=-1;function jn(e){return{current:e}}function q(e){0>Qn||(e.current=El[Qn],El[Qn]=null,Qn--)}function F(e,n){Qn++,El[Qn]=e.current,e.current=n}var wn={},ue=jn(wn),he=jn(!1),Rn=wn;function ot(e,n){var t=e.type.contextTypes;if(!t)return wn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===n)return r.__reactInternalMemoizedMaskedChildContext;var i={},l;for(l in t)i[l]=n[l];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=n,e.__reactInternalMemoizedMaskedChildContext=i),i}function ve(e){return e=e.childContextTypes,e!=null}function Hr(){q(he),q(ue)}function Ns(e,n,t){if(ue.current!==wn)throw Error(w(168));F(ue,n),F(he,t)}function su(e,n,t){var r=e.stateNode;if(n=n.childContextTypes,typeof r.getChildContext!="function")return t;r=r.getChildContext();for(var i in r)if(!(i in n))throw Error(w(108,Uc(e)||"Unknown",i));return H({},t,r)}function Qr(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||wn,Rn=ue.current,F(ue,e),F(he,he.current),!0}function Ss(e,n,t){var r=e.stateNode;if(!r)throw Error(w(169));t?(e=su(e,n,Rn),r.__reactInternalMemoizedMergedChildContext=e,q(he),q(ue),F(ue,e)):q(he),F(he,t)}var Be=null,pi=!1,qi=!1;function au(e){Be===null?Be=[e]:Be.push(e)}function lf(e){pi=!0,au(e)}function Nn(){if(!qi&&Be!==null){qi=!0;var e=0,n=I;try{var t=Be;for(I=1;e<t.length;e++){var r=t[e];do r=r(!0);while(r!==null)}Be=null,pi=!1}catch(i){throw Be!==null&&(Be=Be.slice(e+1)),Ra(lo,Nn),i}finally{I=n,qi=!1}}return null}var Gn=[],Kn=0,Gr=null,Kr=0,_e=[],be=0,Dn=null,He=1,Qe="";function bn(e,n){Gn[Kn++]=Kr,Gn[Kn++]=Gr,Gr=e,Kr=n}function uu(e,n,t){_e[be++]=He,_e[be++]=Qe,_e[be++]=Dn,Dn=e;var r=He;e=Qe;var i=32-Oe(r)-1;r&=~(1<<i),t+=1;var l=32-Oe(n)+i;if(30<l){var o=i-i%5;l=(r&(1<<o)-1).toString(32),r>>=o,i-=o,He=1<<32-Oe(n)+i|t<<i|r,Qe=l+e}else He=1<<l|t<<i|r,Qe=e}function go(e){e.return!==null&&(bn(e,1),uu(e,1,0))}function ho(e){for(;e===Gr;)Gr=Gn[--Kn],Gn[Kn]=null,Kr=Gn[--Kn],Gn[Kn]=null;for(;e===Dn;)Dn=_e[--be],_e[be]=null,Qe=_e[--be],_e[be]=null,He=_e[--be],_e[be]=null}var ke=null,we=null,V=!1,De=null;function cu(e,n){var t=Ee(5,null,null,0);t.elementType="DELETED",t.stateNode=n,t.return=e,n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)}function _s(e,n){switch(e.tag){case 5:var t=e.type;return n=n.nodeType!==1||t.toLowerCase()!==n.nodeName.toLowerCase()?null:n,n!==null?(e.stateNode=n,ke=e,we=mn(n.firstChild),!0):!1;case 6:return n=e.pendingProps===""||n.nodeType!==3?null:n,n!==null?(e.stateNode=n,ke=e,we=null,!0):!1;case 13:return n=n.nodeType!==8?null:n,n!==null?(t=Dn!==null?{id:He,overflow:Qe}:null,e.memoizedState={dehydrated:n,treeContext:t,retryLane:1073741824},t=Ee(18,null,null,0),t.stateNode=n,t.return=e,e.child=t,ke=e,we=null,!0):!1;default:return!1}}function Cl(e){return(e.mode&1)!==0&&(e.flags&128)===0}function zl(e){if(V){var n=we;if(n){var t=n;if(!_s(e,n)){if(Cl(e))throw Error(w(418));n=mn(t.nextSibling);var r=ke;n&&_s(e,n)?cu(r,t):(e.flags=e.flags&-4097|2,V=!1,ke=e)}}else{if(Cl(e))throw Error(w(418));e.flags=e.flags&-4097|2,V=!1,ke=e}}}function bs(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;ke=e}function xr(e){if(e!==ke)return!1;if(!V)return bs(e),V=!0,!1;var n;if((n=e.tag!==3)&&!(n=e.tag!==5)&&(n=e.type,n=n!=="head"&&n!=="body"&&!Sl(e.type,e.memoizedProps)),n&&(n=we)){if(Cl(e))throw du(),Error(w(418));for(;n;)cu(e,n),n=mn(n.nextSibling)}if(bs(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(w(317));e:{for(e=e.nextSibling,n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="/$"){if(n===0){we=mn(e.nextSibling);break e}n--}else t!=="$"&&t!=="$!"&&t!=="$?"||n++}e=e.nextSibling}we=null}}else we=ke?mn(e.stateNode.nextSibling):null;return!0}function du(){for(var e=we;e;)e=mn(e.nextSibling)}function st(){we=ke=null,V=!1}function vo(e){De===null?De=[e]:De.push(e)}var of=Je.ReactCurrentBatchConfig;function wt(e,n,t){if(e=t.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(w(309));var r=t.stateNode}if(!r)throw Error(w(147,e));var i=r,l=""+e;return n!==null&&n.ref!==null&&typeof n.ref=="function"&&n.ref._stringRef===l?n.ref:(n=function(o){var a=i.refs;o===null?delete a[l]:a[l]=o},n._stringRef=l,n)}if(typeof e!="string")throw Error(w(284));if(!t._owner)throw Error(w(290,e))}return e}function yr(e,n){throw e=Object.prototype.toString.call(n),Error(w(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e))}function Es(e){var n=e._init;return n(e._payload)}function fu(e){function n(f,c){if(e){var m=f.deletions;m===null?(f.deletions=[c],f.flags|=16):m.push(c)}}function t(f,c){if(!e)return null;for(;c!==null;)n(f,c),c=c.sibling;return null}function r(f,c){for(f=new Map;c!==null;)c.key!==null?f.set(c.key,c):f.set(c.index,c),c=c.sibling;return f}function i(f,c){return f=xn(f,c),f.index=0,f.sibling=null,f}function l(f,c,m){return f.index=m,e?(m=f.alternate,m!==null?(m=m.index,m<c?(f.flags|=2,c):m):(f.flags|=2,c)):(f.flags|=1048576,c)}function o(f){return e&&f.alternate===null&&(f.flags|=2),f}function a(f,c,m,x){return c===null||c.tag!==6?(c=Ki(m,f.mode,x),c.return=f,c):(c=i(c,m),c.return=f,c)}function u(f,c,m,x){var N=m.type;return N===qn?g(f,c,m.props.children,x,m.key):c!==null&&(c.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===ln&&Es(N)===c.type)?(x=i(c,m.props),x.ref=wt(f,c,m),x.return=f,x):(x=Or(m.type,m.key,m.props,null,f.mode,x),x.ref=wt(f,c,m),x.return=f,x)}function d(f,c,m,x){return c===null||c.tag!==4||c.stateNode.containerInfo!==m.containerInfo||c.stateNode.implementation!==m.implementation?(c=Yi(m,f.mode,x),c.return=f,c):(c=i(c,m.children||[]),c.return=f,c)}function g(f,c,m,x,N){return c===null||c.tag!==7?(c=Ln(m,f.mode,x,N),c.return=f,c):(c=i(c,m),c.return=f,c)}function h(f,c,m){if(typeof c=="string"&&c!==""||typeof c=="number")return c=Ki(""+c,f.mode,m),c.return=f,c;if(typeof c=="object"&&c!==null){switch(c.$$typeof){case ar:return m=Or(c.type,c.key,c.props,null,f.mode,m),m.ref=wt(f,null,c),m.return=f,m;case Un:return c=Yi(c,f.mode,m),c.return=f,c;case ln:var x=c._init;return h(f,x(c._payload),m)}if(St(c)||gt(c))return c=Ln(c,f.mode,m,null),c.return=f,c;yr(f,c)}return null}function p(f,c,m,x){var N=c!==null?c.key:null;if(typeof m=="string"&&m!==""||typeof m=="number")return N!==null?null:a(f,c,""+m,x);if(typeof m=="object"&&m!==null){switch(m.$$typeof){case ar:return m.key===N?u(f,c,m,x):null;case Un:return m.key===N?d(f,c,m,x):null;case ln:return N=m._init,p(f,c,N(m._payload),x)}if(St(m)||gt(m))return N!==null?null:g(f,c,m,x,null);yr(f,m)}return null}function v(f,c,m,x,N){if(typeof x=="string"&&x!==""||typeof x=="number")return f=f.get(m)||null,a(c,f,""+x,N);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case ar:return f=f.get(x.key===null?m:x.key)||null,u(c,f,x,N);case Un:return f=f.get(x.key===null?m:x.key)||null,d(c,f,x,N);case ln:var b=x._init;return v(f,c,m,b(x._payload),N)}if(St(x)||gt(x))return f=f.get(m)||null,g(c,f,x,N,null);yr(c,x)}return null}function y(f,c,m,x){for(var N=null,b=null,E=c,z=c=0,M=null;E!==null&&z<m.length;z++){E.index>z?(M=E,E=null):M=E.sibling;var T=p(f,E,m[z],x);if(T===null){E===null&&(E=M);break}e&&E&&T.alternate===null&&n(f,E),c=l(T,c,z),b===null?N=T:b.sibling=T,b=T,E=M}if(z===m.length)return t(f,E),V&&bn(f,z),N;if(E===null){for(;z<m.length;z++)E=h(f,m[z],x),E!==null&&(c=l(E,c,z),b===null?N=E:b.sibling=E,b=E);return V&&bn(f,z),N}for(E=r(f,E);z<m.length;z++)M=v(E,f,z,m[z],x),M!==null&&(e&&M.alternate!==null&&E.delete(M.key===null?z:M.key),c=l(M,c,z),b===null?N=M:b.sibling=M,b=M);return e&&E.forEach(function(le){return n(f,le)}),V&&bn(f,z),N}function j(f,c,m,x){var N=gt(m);if(typeof N!="function")throw Error(w(150));if(m=N.call(m),m==null)throw Error(w(151));for(var b=N=null,E=c,z=c=0,M=null,T=m.next();E!==null&&!T.done;z++,T=m.next()){E.index>z?(M=E,E=null):M=E.sibling;var le=p(f,E,T.value,x);if(le===null){E===null&&(E=M);break}e&&E&&le.alternate===null&&n(f,E),c=l(le,c,z),b===null?N=le:b.sibling=le,b=le,E=M}if(T.done)return t(f,E),V&&bn(f,z),N;if(E===null){for(;!T.done;z++,T=m.next())T=h(f,T.value,x),T!==null&&(c=l(T,c,z),b===null?N=T:b.sibling=T,b=T);return V&&bn(f,z),N}for(E=r(f,E);!T.done;z++,T=m.next())T=v(E,f,z,T.value,x),T!==null&&(e&&T.alternate!==null&&E.delete(T.key===null?z:T.key),c=l(T,c,z),b===null?N=T:b.sibling=T,b=T);return e&&E.forEach(function(en){return n(f,en)}),V&&bn(f,z),N}function D(f,c,m,x){if(typeof m=="object"&&m!==null&&m.type===qn&&m.key===null&&(m=m.props.children),typeof m=="object"&&m!==null){switch(m.$$typeof){case ar:e:{for(var N=m.key,b=c;b!==null;){if(b.key===N){if(N=m.type,N===qn){if(b.tag===7){t(f,b.sibling),c=i(b,m.props.children),c.return=f,f=c;break e}}else if(b.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===ln&&Es(N)===b.type){t(f,b.sibling),c=i(b,m.props),c.ref=wt(f,b,m),c.return=f,f=c;break e}t(f,b);break}else n(f,b);b=b.sibling}m.type===qn?(c=Ln(m.props.children,f.mode,x,m.key),c.return=f,f=c):(x=Or(m.type,m.key,m.props,null,f.mode,x),x.ref=wt(f,c,m),x.return=f,f=x)}return o(f);case Un:e:{for(b=m.key;c!==null;){if(c.key===b)if(c.tag===4&&c.stateNode.containerInfo===m.containerInfo&&c.stateNode.implementation===m.implementation){t(f,c.sibling),c=i(c,m.children||[]),c.return=f,f=c;break e}else{t(f,c);break}else n(f,c);c=c.sibling}c=Yi(m,f.mode,x),c.return=f,f=c}return o(f);case ln:return b=m._init,D(f,c,b(m._payload),x)}if(St(m))return y(f,c,m,x);if(gt(m))return j(f,c,m,x);yr(f,m)}return typeof m=="string"&&m!==""||typeof m=="number"?(m=""+m,c!==null&&c.tag===6?(t(f,c.sibling),c=i(c,m),c.return=f,f=c):(t(f,c),c=Ki(m,f.mode,x),c.return=f,f=c),o(f)):t(f,c)}return D}var at=fu(!0),pu=fu(!1),Yr=jn(null),Xr=null,Yn=null,xo=null;function yo(){xo=Yn=Xr=null}function wo(e){var n=Yr.current;q(Yr),e._currentValue=n}function Pl(e,n,t){for(;e!==null;){var r=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),e===t)break;e=e.return}}function rt(e,n){Xr=e,xo=Yn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&n&&(ge=!0),e.firstContext=null)}function ze(e){var n=e._currentValue;if(xo!==e)if(e={context:e,memoizedValue:n,next:null},Yn===null){if(Xr===null)throw Error(w(308));Yn=e,Xr.dependencies={lanes:0,firstContext:e}}else Yn=Yn.next=e;return n}var zn=null;function ko(e){zn===null?zn=[e]:zn.push(e)}function mu(e,n,t,r){var i=n.interleaved;return i===null?(t.next=t,ko(n)):(t.next=i.next,i.next=t),n.interleaved=t,Xe(e,r)}function Xe(e,n){e.lanes|=n;var t=e.alternate;for(t!==null&&(t.lanes|=n),t=e,e=e.return;e!==null;)e.childLanes|=n,t=e.alternate,t!==null&&(t.childLanes|=n),t=e,e=e.return;return t.tag===3?t.stateNode:null}var on=!1;function jo(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function gu(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Ge(e,n){return{eventTime:e,lane:n,tag:0,payload:null,callback:null,next:null}}function gn(e,n,t){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,A&2){var i=r.pending;return i===null?n.next=n:(n.next=i.next,i.next=n),r.pending=n,Xe(e,t)}return i=r.interleaved,i===null?(n.next=n,ko(r)):(n.next=i.next,i.next=n),r.interleaved=n,Xe(e,t)}function zr(e,n,t){if(n=n.updateQueue,n!==null&&(n=n.shared,(t&4194240)!==0)){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,oo(e,t)}}function Cs(e,n){var t=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,t===r)){var i=null,l=null;if(t=t.firstBaseUpdate,t!==null){do{var o={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};l===null?i=l=o:l=l.next=o,t=t.next}while(t!==null);l===null?i=l=n:l=l.next=n}else i=l=n;t={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:l,shared:r.shared,effects:r.effects},e.updateQueue=t;return}e=t.lastBaseUpdate,e===null?t.firstBaseUpdate=n:e.next=n,t.lastBaseUpdate=n}function Zr(e,n,t,r){var i=e.updateQueue;on=!1;var l=i.firstBaseUpdate,o=i.lastBaseUpdate,a=i.shared.pending;if(a!==null){i.shared.pending=null;var u=a,d=u.next;u.next=null,o===null?l=d:o.next=d,o=u;var g=e.alternate;g!==null&&(g=g.updateQueue,a=g.lastBaseUpdate,a!==o&&(a===null?g.firstBaseUpdate=d:a.next=d,g.lastBaseUpdate=u))}if(l!==null){var h=i.baseState;o=0,g=d=u=null,a=l;do{var p=a.lane,v=a.eventTime;if((r&p)===p){g!==null&&(g=g.next={eventTime:v,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var y=e,j=a;switch(p=n,v=t,j.tag){case 1:if(y=j.payload,typeof y=="function"){h=y.call(v,h,p);break e}h=y;break e;case 3:y.flags=y.flags&-65537|128;case 0:if(y=j.payload,p=typeof y=="function"?y.call(v,h,p):y,p==null)break e;h=H({},h,p);break e;case 2:on=!0}}a.callback!==null&&a.lane!==0&&(e.flags|=64,p=i.effects,p===null?i.effects=[a]:p.push(a))}else v={eventTime:v,lane:p,tag:a.tag,payload:a.payload,callback:a.callback,next:null},g===null?(d=g=v,u=h):g=g.next=v,o|=p;if(a=a.next,a===null){if(a=i.shared.pending,a===null)break;p=a,a=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(!0);if(g===null&&(u=h),i.baseState=u,i.firstBaseUpdate=d,i.lastBaseUpdate=g,n=i.shared.interleaved,n!==null){i=n;do o|=i.lane,i=i.next;while(i!==n)}else l===null&&(i.shared.lanes=0);An|=o,e.lanes=o,e.memoizedState=h}}function zs(e,n,t){if(e=n.effects,n.effects=null,e!==null)for(n=0;n<e.length;n++){var r=e[n],i=r.callback;if(i!==null){if(r.callback=null,r=t,typeof i!="function")throw Error(w(191,i));i.call(r)}}}var rr={},qe=jn(rr),Qt=jn(rr),Gt=jn(rr);function Pn(e){if(e===rr)throw Error(w(174));return e}function No(e,n){switch(F(Gt,n),F(Qt,e),F(qe,rr),e=n.nodeType,e){case 9:case 11:n=(n=n.documentElement)?n.namespaceURI:cl(null,"");break;default:e=e===8?n.parentNode:n,n=e.namespaceURI||null,e=e.tagName,n=cl(n,e)}q(qe),F(qe,n)}function ut(){q(qe),q(Qt),q(Gt)}function hu(e){Pn(Gt.current);var n=Pn(qe.current),t=cl(n,e.type);n!==t&&(F(Qt,e),F(qe,t))}function So(e){Qt.current===e&&(q(qe),q(Qt))}var W=jn(0);function Jr(e){for(var n=e;n!==null;){if(n.tag===13){var t=n.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!==void 0){if(n.flags&128)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Vi=[];function _o(){for(var e=0;e<Vi.length;e++)Vi[e]._workInProgressVersionPrimary=null;Vi.length=0}var Pr=Je.ReactCurrentDispatcher,Wi=Je.ReactCurrentBatchConfig,On=0,B=null,X=null,ee=null,ei=!1,Lt=!1,Kt=0,sf=0;function oe(){throw Error(w(321))}function bo(e,n){if(n===null)return!1;for(var t=0;t<n.length&&t<e.length;t++)if(!Ie(e[t],n[t]))return!1;return!0}function Eo(e,n,t,r,i,l){if(On=l,B=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,Pr.current=e===null||e.memoizedState===null?df:ff,e=t(r,i),Lt){l=0;do{if(Lt=!1,Kt=0,25<=l)throw Error(w(301));l+=1,ee=X=null,n.updateQueue=null,Pr.current=pf,e=t(r,i)}while(Lt)}if(Pr.current=ni,n=X!==null&&X.next!==null,On=0,ee=X=B=null,ei=!1,n)throw Error(w(300));return e}function Co(){var e=Kt!==0;return Kt=0,e}function Fe(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ee===null?B.memoizedState=ee=e:ee=ee.next=e,ee}function Pe(){if(X===null){var e=B.alternate;e=e!==null?e.memoizedState:null}else e=X.next;var n=ee===null?B.memoizedState:ee.next;if(n!==null)ee=n,X=e;else{if(e===null)throw Error(w(310));X=e,e={memoizedState:X.memoizedState,baseState:X.baseState,baseQueue:X.baseQueue,queue:X.queue,next:null},ee===null?B.memoizedState=ee=e:ee=ee.next=e}return ee}function Yt(e,n){return typeof n=="function"?n(e):n}function Bi(e){var n=Pe(),t=n.queue;if(t===null)throw Error(w(311));t.lastRenderedReducer=e;var r=X,i=r.baseQueue,l=t.pending;if(l!==null){if(i!==null){var o=i.next;i.next=l.next,l.next=o}r.baseQueue=i=l,t.pending=null}if(i!==null){l=i.next,r=r.baseState;var a=o=null,u=null,d=l;do{var g=d.lane;if((On&g)===g)u!==null&&(u=u.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),r=d.hasEagerState?d.eagerState:e(r,d.action);else{var h={lane:g,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};u===null?(a=u=h,o=r):u=u.next=h,B.lanes|=g,An|=g}d=d.next}while(d!==null&&d!==l);u===null?o=r:u.next=a,Ie(r,n.memoizedState)||(ge=!0),n.memoizedState=r,n.baseState=o,n.baseQueue=u,t.lastRenderedState=r}if(e=t.interleaved,e!==null){i=e;do l=i.lane,B.lanes|=l,An|=l,i=i.next;while(i!==e)}else i===null&&(t.lanes=0);return[n.memoizedState,t.dispatch]}function Hi(e){var n=Pe(),t=n.queue;if(t===null)throw Error(w(311));t.lastRenderedReducer=e;var r=t.dispatch,i=t.pending,l=n.memoizedState;if(i!==null){t.pending=null;var o=i=i.next;do l=e(l,o.action),o=o.next;while(o!==i);Ie(l,n.memoizedState)||(ge=!0),n.memoizedState=l,n.baseQueue===null&&(n.baseState=l),t.lastRenderedState=l}return[l,r]}function vu(){}function xu(e,n){var t=B,r=Pe(),i=n(),l=!Ie(r.memoizedState,i);if(l&&(r.memoizedState=i,ge=!0),r=r.queue,zo(ku.bind(null,t,r,e),[e]),r.getSnapshot!==n||l||ee!==null&&ee.memoizedState.tag&1){if(t.flags|=2048,Xt(9,wu.bind(null,t,r,i,n),void 0,null),ne===null)throw Error(w(349));On&30||yu(t,n,i)}return i}function yu(e,n,t){e.flags|=16384,e={getSnapshot:n,value:t},n=B.updateQueue,n===null?(n={lastEffect:null,stores:null},B.updateQueue=n,n.stores=[e]):(t=n.stores,t===null?n.stores=[e]:t.push(e))}function wu(e,n,t,r){n.value=t,n.getSnapshot=r,ju(n)&&Nu(e)}function ku(e,n,t){return t(function(){ju(n)&&Nu(e)})}function ju(e){var n=e.getSnapshot;e=e.value;try{var t=n();return!Ie(e,t)}catch{return!0}}function Nu(e){var n=Xe(e,1);n!==null&&Ae(n,e,1,-1)}function Ps(e){var n=Fe();return typeof e=="function"&&(e=e()),n.memoizedState=n.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Yt,lastRenderedState:e},n.queue=e,e=e.dispatch=cf.bind(null,B,e),[n.memoizedState,e]}function Xt(e,n,t,r){return e={tag:e,create:n,destroy:t,deps:r,next:null},n=B.updateQueue,n===null?(n={lastEffect:null,stores:null},B.updateQueue=n,n.lastEffect=e.next=e):(t=n.lastEffect,t===null?n.lastEffect=e.next=e:(r=t.next,t.next=e,e.next=r,n.lastEffect=e)),e}function Su(){return Pe().memoizedState}function Tr(e,n,t,r){var i=Fe();B.flags|=e,i.memoizedState=Xt(1|n,t,void 0,r===void 0?null:r)}function mi(e,n,t,r){var i=Pe();r=r===void 0?null:r;var l=void 0;if(X!==null){var o=X.memoizedState;if(l=o.destroy,r!==null&&bo(r,o.deps)){i.memoizedState=Xt(n,t,l,r);return}}B.flags|=e,i.memoizedState=Xt(1|n,t,l,r)}function Ts(e,n){return Tr(8390656,8,e,n)}function zo(e,n){return mi(2048,8,e,n)}function _u(e,n){return mi(4,2,e,n)}function bu(e,n){return mi(4,4,e,n)}function Eu(e,n){if(typeof n=="function")return e=e(),n(e),function(){n(null)};if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Cu(e,n,t){return t=t!=null?t.concat([e]):null,mi(4,4,Eu.bind(null,n,e),t)}function Po(){}function zu(e,n){var t=Pe();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&bo(n,r[1])?r[0]:(t.memoizedState=[e,n],e)}function Pu(e,n){var t=Pe();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&bo(n,r[1])?r[0]:(e=e(),t.memoizedState=[e,n],e)}function Tu(e,n,t){return On&21?(Ie(t,n)||(t=Aa(),B.lanes|=t,An|=t,e.baseState=!0),n):(e.baseState&&(e.baseState=!1,ge=!0),e.memoizedState=t)}function af(e,n){var t=I;I=t!==0&&4>t?t:4,e(!0);var r=Wi.transition;Wi.transition={};try{e(!1),n()}finally{I=t,Wi.transition=r}}function Lu(){return Pe().memoizedState}function uf(e,n,t){var r=vn(e);if(t={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null},Ru(e))Du(n,t);else if(t=mu(e,n,t,r),t!==null){var i=de();Ae(t,e,r,i),Ou(t,n,r)}}function cf(e,n,t){var r=vn(e),i={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null};if(Ru(e))Du(n,i);else{var l=e.alternate;if(e.lanes===0&&(l===null||l.lanes===0)&&(l=n.lastRenderedReducer,l!==null))try{var o=n.lastRenderedState,a=l(o,t);if(i.hasEagerState=!0,i.eagerState=a,Ie(a,o)){var u=n.interleaved;u===null?(i.next=i,ko(n)):(i.next=u.next,u.next=i),n.interleaved=i;return}}catch{}finally{}t=mu(e,n,i,r),t!==null&&(i=de(),Ae(t,e,r,i),Ou(t,n,r))}}function Ru(e){var n=e.alternate;return e===B||n!==null&&n===B}function Du(e,n){Lt=ei=!0;var t=e.pending;t===null?n.next=n:(n.next=t.next,t.next=n),e.pending=n}function Ou(e,n,t){if(t&4194240){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,oo(e,t)}}var ni={readContext:ze,useCallback:oe,useContext:oe,useEffect:oe,useImperativeHandle:oe,useInsertionEffect:oe,useLayoutEffect:oe,useMemo:oe,useReducer:oe,useRef:oe,useState:oe,useDebugValue:oe,useDeferredValue:oe,useTransition:oe,useMutableSource:oe,useSyncExternalStore:oe,useId:oe,unstable_isNewReconciler:!1},df={readContext:ze,useCallback:function(e,n){return Fe().memoizedState=[e,n===void 0?null:n],e},useContext:ze,useEffect:Ts,useImperativeHandle:function(e,n,t){return t=t!=null?t.concat([e]):null,Tr(4194308,4,Eu.bind(null,n,e),t)},useLayoutEffect:function(e,n){return Tr(4194308,4,e,n)},useInsertionEffect:function(e,n){return Tr(4,2,e,n)},useMemo:function(e,n){var t=Fe();return n=n===void 0?null:n,e=e(),t.memoizedState=[e,n],e},useReducer:function(e,n,t){var r=Fe();return n=t!==void 0?t(n):n,r.memoizedState=r.baseState=n,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},r.queue=e,e=e.dispatch=uf.bind(null,B,e),[r.memoizedState,e]},useRef:function(e){var n=Fe();return e={current:e},n.memoizedState=e},useState:Ps,useDebugValue:Po,useDeferredValue:function(e){return Fe().memoizedState=e},useTransition:function(){var e=Ps(!1),n=e[0];return e=af.bind(null,e[1]),Fe().memoizedState=e,[n,e]},useMutableSource:function(){},useSyncExternalStore:function(e,n,t){var r=B,i=Fe();if(V){if(t===void 0)throw Error(w(407));t=t()}else{if(t=n(),ne===null)throw Error(w(349));On&30||yu(r,n,t)}i.memoizedState=t;var l={value:t,getSnapshot:n};return i.queue=l,Ts(ku.bind(null,r,l,e),[e]),r.flags|=2048,Xt(9,wu.bind(null,r,l,t,n),void 0,null),t},useId:function(){var e=Fe(),n=ne.identifierPrefix;if(V){var t=Qe,r=He;t=(r&~(1<<32-Oe(r)-1)).toString(32)+t,n=":"+n+"R"+t,t=Kt++,0<t&&(n+="H"+t.toString(32)),n+=":"}else t=sf++,n=":"+n+"r"+t.toString(32)+":";return e.memoizedState=n},unstable_isNewReconciler:!1},ff={readContext:ze,useCallback:zu,useContext:ze,useEffect:zo,useImperativeHandle:Cu,useInsertionEffect:_u,useLayoutEffect:bu,useMemo:Pu,useReducer:Bi,useRef:Su,useState:function(){return Bi(Yt)},useDebugValue:Po,useDeferredValue:function(e){var n=Pe();return Tu(n,X.memoizedState,e)},useTransition:function(){var e=Bi(Yt)[0],n=Pe().memoizedState;return[e,n]},useMutableSource:vu,useSyncExternalStore:xu,useId:Lu,unstable_isNewReconciler:!1},pf={readContext:ze,useCallback:zu,useContext:ze,useEffect:zo,useImperativeHandle:Cu,useInsertionEffect:_u,useLayoutEffect:bu,useMemo:Pu,useReducer:Hi,useRef:Su,useState:function(){return Hi(Yt)},useDebugValue:Po,useDeferredValue:function(e){var n=Pe();return X===null?n.memoizedState=e:Tu(n,X.memoizedState,e)},useTransition:function(){var e=Hi(Yt)[0],n=Pe().memoizedState;return[e,n]},useMutableSource:vu,useSyncExternalStore:xu,useId:Lu,unstable_isNewReconciler:!1};function Le(e,n){if(e&&e.defaultProps){n=H({},n),e=e.defaultProps;for(var t in e)n[t]===void 0&&(n[t]=e[t]);return n}return n}function Tl(e,n,t,r){n=e.memoizedState,t=t(r,n),t=t==null?n:H({},n,t),e.memoizedState=t,e.lanes===0&&(e.updateQueue.baseState=t)}var gi={isMounted:function(e){return(e=e._reactInternals)?Fn(e)===e:!1},enqueueSetState:function(e,n,t){e=e._reactInternals;var r=de(),i=vn(e),l=Ge(r,i);l.payload=n,t!=null&&(l.callback=t),n=gn(e,l,i),n!==null&&(Ae(n,e,i,r),zr(n,e,i))},enqueueReplaceState:function(e,n,t){e=e._reactInternals;var r=de(),i=vn(e),l=Ge(r,i);l.tag=1,l.payload=n,t!=null&&(l.callback=t),n=gn(e,l,i),n!==null&&(Ae(n,e,i,r),zr(n,e,i))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var t=de(),r=vn(e),i=Ge(t,r);i.tag=2,n!=null&&(i.callback=n),n=gn(e,i,r),n!==null&&(Ae(n,e,r,t),zr(n,e,r))}};function Ls(e,n,t,r,i,l,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,l,o):n.prototype&&n.prototype.isPureReactComponent?!Vt(t,r)||!Vt(i,l):!0}function Au(e,n,t){var r=!1,i=wn,l=n.contextType;return typeof l=="object"&&l!==null?l=ze(l):(i=ve(n)?Rn:ue.current,r=n.contextTypes,l=(r=r!=null)?ot(e,i):wn),n=new n(t,l),e.memoizedState=n.state!==null&&n.state!==void 0?n.state:null,n.updater=gi,e.stateNode=n,n._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=l),n}function Rs(e,n,t,r){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(t,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(t,r),n.state!==e&&gi.enqueueReplaceState(n,n.state,null)}function Ll(e,n,t,r){var i=e.stateNode;i.props=t,i.state=e.memoizedState,i.refs={},jo(e);var l=n.contextType;typeof l=="object"&&l!==null?i.context=ze(l):(l=ve(n)?Rn:ue.current,i.context=ot(e,l)),i.state=e.memoizedState,l=n.getDerivedStateFromProps,typeof l=="function"&&(Tl(e,n,l,t),i.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(n=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),n!==i.state&&gi.enqueueReplaceState(i,i.state,null),Zr(e,t,i,r),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function ct(e,n){try{var t="",r=n;do t+=$c(r),r=r.return;while(r);var i=t}catch(l){i=`
Error generating stack: `+l.message+`
`+l.stack}return{value:e,source:n,stack:i,digest:null}}function Qi(e,n,t){return{value:e,source:null,stack:t??null,digest:n??null}}function Rl(e,n){try{console.error(n.value)}catch(t){setTimeout(function(){throw t})}}var mf=typeof WeakMap=="function"?WeakMap:Map;function Iu(e,n,t){t=Ge(-1,t),t.tag=3,t.payload={element:null};var r=n.value;return t.callback=function(){ri||(ri=!0,Vl=r),Rl(e,n)},t}function Mu(e,n,t){t=Ge(-1,t),t.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=n.value;t.payload=function(){return r(i)},t.callback=function(){Rl(e,n)}}var l=e.stateNode;return l!==null&&typeof l.componentDidCatch=="function"&&(t.callback=function(){Rl(e,n),typeof r!="function"&&(hn===null?hn=new Set([this]):hn.add(this));var o=n.stack;this.componentDidCatch(n.value,{componentStack:o!==null?o:""})}),t}function Ds(e,n,t){var r=e.pingCache;if(r===null){r=e.pingCache=new mf;var i=new Set;r.set(n,i)}else i=r.get(n),i===void 0&&(i=new Set,r.set(n,i));i.has(t)||(i.add(t),e=Cf.bind(null,e,n,t),n.then(e,e))}function Os(e){do{var n;if((n=e.tag===13)&&(n=e.memoizedState,n=n!==null?n.dehydrated!==null:!0),n)return e;e=e.return}while(e!==null);return null}function As(e,n,t,r,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===n?e.flags|=65536:(e.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(n=Ge(-1,1),n.tag=2,gn(t,n,1))),t.lanes|=1),e)}var gf=Je.ReactCurrentOwner,ge=!1;function ce(e,n,t,r){n.child=e===null?pu(n,null,t,r):at(n,e.child,t,r)}function Is(e,n,t,r,i){t=t.render;var l=n.ref;return rt(n,i),r=Eo(e,n,t,r,l,i),t=Co(),e!==null&&!ge?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~i,Ze(e,n,i)):(V&&t&&go(n),n.flags|=1,ce(e,n,r,i),n.child)}function Ms(e,n,t,r,i){if(e===null){var l=t.type;return typeof l=="function"&&!Mo(l)&&l.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(n.tag=15,n.type=l,Fu(e,n,l,r,i)):(e=Or(t.type,null,r,n,n.mode,i),e.ref=n.ref,e.return=n,n.child=e)}if(l=e.child,!(e.lanes&i)){var o=l.memoizedProps;if(t=t.compare,t=t!==null?t:Vt,t(o,r)&&e.ref===n.ref)return Ze(e,n,i)}return n.flags|=1,e=xn(l,r),e.ref=n.ref,e.return=n,n.child=e}function Fu(e,n,t,r,i){if(e!==null){var l=e.memoizedProps;if(Vt(l,r)&&e.ref===n.ref)if(ge=!1,n.pendingProps=r=l,(e.lanes&i)!==0)e.flags&131072&&(ge=!0);else return n.lanes=e.lanes,Ze(e,n,i)}return Dl(e,n,t,r,i)}function $u(e,n,t){var r=n.pendingProps,i=r.children,l=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(n.mode&1))n.memoizedState={baseLanes:0,cachePool:null,transitions:null},F(Zn,ye),ye|=t;else{if(!(t&1073741824))return e=l!==null?l.baseLanes|t:t,n.lanes=n.childLanes=1073741824,n.memoizedState={baseLanes:e,cachePool:null,transitions:null},n.updateQueue=null,F(Zn,ye),ye|=e,null;n.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=l!==null?l.baseLanes:t,F(Zn,ye),ye|=r}else l!==null?(r=l.baseLanes|t,n.memoizedState=null):r=t,F(Zn,ye),ye|=r;return ce(e,n,i,t),n.child}function Uu(e,n){var t=n.ref;(e===null&&t!==null||e!==null&&e.ref!==t)&&(n.flags|=512,n.flags|=2097152)}function Dl(e,n,t,r,i){var l=ve(t)?Rn:ue.current;return l=ot(n,l),rt(n,i),t=Eo(e,n,t,r,l,i),r=Co(),e!==null&&!ge?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~i,Ze(e,n,i)):(V&&r&&go(n),n.flags|=1,ce(e,n,t,i),n.child)}function Fs(e,n,t,r,i){if(ve(t)){var l=!0;Qr(n)}else l=!1;if(rt(n,i),n.stateNode===null)Lr(e,n),Au(n,t,r),Ll(n,t,r,i),r=!0;else if(e===null){var o=n.stateNode,a=n.memoizedProps;o.props=a;var u=o.context,d=t.contextType;typeof d=="object"&&d!==null?d=ze(d):(d=ve(t)?Rn:ue.current,d=ot(n,d));var g=t.getDerivedStateFromProps,h=typeof g=="function"||typeof o.getSnapshotBeforeUpdate=="function";h||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==r||u!==d)&&Rs(n,o,r,d),on=!1;var p=n.memoizedState;o.state=p,Zr(n,r,o,i),u=n.memoizedState,a!==r||p!==u||he.current||on?(typeof g=="function"&&(Tl(n,t,g,r),u=n.memoizedState),(a=on||Ls(n,t,a,r,p,u,d))?(h||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(n.flags|=4194308)):(typeof o.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=u),o.props=r,o.state=u,o.context=d,r=a):(typeof o.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{o=n.stateNode,gu(e,n),a=n.memoizedProps,d=n.type===n.elementType?a:Le(n.type,a),o.props=d,h=n.pendingProps,p=o.context,u=t.contextType,typeof u=="object"&&u!==null?u=ze(u):(u=ve(t)?Rn:ue.current,u=ot(n,u));var v=t.getDerivedStateFromProps;(g=typeof v=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==h||p!==u)&&Rs(n,o,r,u),on=!1,p=n.memoizedState,o.state=p,Zr(n,r,o,i);var y=n.memoizedState;a!==h||p!==y||he.current||on?(typeof v=="function"&&(Tl(n,t,v,r),y=n.memoizedState),(d=on||Ls(n,t,d,r,p,y,u)||!1)?(g||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,y,u),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,y,u)),typeof o.componentDidUpdate=="function"&&(n.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===e.memoizedProps&&p===e.memoizedState||(n.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&p===e.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=y),o.props=r,o.state=y,o.context=u,r=d):(typeof o.componentDidUpdate!="function"||a===e.memoizedProps&&p===e.memoizedState||(n.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&p===e.memoizedState||(n.flags|=1024),r=!1)}return Ol(e,n,t,r,l,i)}function Ol(e,n,t,r,i,l){Uu(e,n);var o=(n.flags&128)!==0;if(!r&&!o)return i&&Ss(n,t,!1),Ze(e,n,l);r=n.stateNode,gf.current=n;var a=o&&typeof t.getDerivedStateFromError!="function"?null:r.render();return n.flags|=1,e!==null&&o?(n.child=at(n,e.child,null,l),n.child=at(n,null,a,l)):ce(e,n,a,l),n.memoizedState=r.state,i&&Ss(n,t,!0),n.child}function qu(e){var n=e.stateNode;n.pendingContext?Ns(e,n.pendingContext,n.pendingContext!==n.context):n.context&&Ns(e,n.context,!1),No(e,n.containerInfo)}function $s(e,n,t,r,i){return st(),vo(i),n.flags|=256,ce(e,n,t,r),n.child}var Al={dehydrated:null,treeContext:null,retryLane:0};function Il(e){return{baseLanes:e,cachePool:null,transitions:null}}function Vu(e,n,t){var r=n.pendingProps,i=W.current,l=!1,o=(n.flags&128)!==0,a;if((a=o)||(a=e!==null&&e.memoizedState===null?!1:(i&2)!==0),a?(l=!0,n.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),F(W,i&1),e===null)return zl(n),e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(n.mode&1?e.data==="$!"?n.lanes=8:n.lanes=1073741824:n.lanes=1,null):(o=r.children,e=r.fallback,l?(r=n.mode,l=n.child,o={mode:"hidden",children:o},!(r&1)&&l!==null?(l.childLanes=0,l.pendingProps=o):l=xi(o,r,0,null),e=Ln(e,r,t,null),l.return=n,e.return=n,l.sibling=e,n.child=l,n.child.memoizedState=Il(t),n.memoizedState=Al,e):To(n,o));if(i=e.memoizedState,i!==null&&(a=i.dehydrated,a!==null))return hf(e,n,o,r,a,i,t);if(l){l=r.fallback,o=n.mode,i=e.child,a=i.sibling;var u={mode:"hidden",children:r.children};return!(o&1)&&n.child!==i?(r=n.child,r.childLanes=0,r.pendingProps=u,n.deletions=null):(r=xn(i,u),r.subtreeFlags=i.subtreeFlags&14680064),a!==null?l=xn(a,l):(l=Ln(l,o,t,null),l.flags|=2),l.return=n,r.return=n,r.sibling=l,n.child=r,r=l,l=n.child,o=e.child.memoizedState,o=o===null?Il(t):{baseLanes:o.baseLanes|t,cachePool:null,transitions:o.transitions},l.memoizedState=o,l.childLanes=e.childLanes&~t,n.memoizedState=Al,r}return l=e.child,e=l.sibling,r=xn(l,{mode:"visible",children:r.children}),!(n.mode&1)&&(r.lanes=t),r.return=n,r.sibling=null,e!==null&&(t=n.deletions,t===null?(n.deletions=[e],n.flags|=16):t.push(e)),n.child=r,n.memoizedState=null,r}function To(e,n){return n=xi({mode:"visible",children:n},e.mode,0,null),n.return=e,e.child=n}function wr(e,n,t,r){return r!==null&&vo(r),at(n,e.child,null,t),e=To(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function hf(e,n,t,r,i,l,o){if(t)return n.flags&256?(n.flags&=-257,r=Qi(Error(w(422))),wr(e,n,o,r)):n.memoizedState!==null?(n.child=e.child,n.flags|=128,null):(l=r.fallback,i=n.mode,r=xi({mode:"visible",children:r.children},i,0,null),l=Ln(l,i,o,null),l.flags|=2,r.return=n,l.return=n,r.sibling=l,n.child=r,n.mode&1&&at(n,e.child,null,o),n.child.memoizedState=Il(o),n.memoizedState=Al,l);if(!(n.mode&1))return wr(e,n,o,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var a=r.dgst;return r=a,l=Error(w(419)),r=Qi(l,r,void 0),wr(e,n,o,r)}if(a=(o&e.childLanes)!==0,ge||a){if(r=ne,r!==null){switch(o&-o){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|o)?0:i,i!==0&&i!==l.retryLane&&(l.retryLane=i,Xe(e,i),Ae(r,e,i,-1))}return Io(),r=Qi(Error(w(421))),wr(e,n,o,r)}return i.data==="$?"?(n.flags|=128,n.child=e.child,n=zf.bind(null,e),i._reactRetry=n,null):(e=l.treeContext,we=mn(i.nextSibling),ke=n,V=!0,De=null,e!==null&&(_e[be++]=He,_e[be++]=Qe,_e[be++]=Dn,He=e.id,Qe=e.overflow,Dn=n),n=To(n,r.children),n.flags|=4096,n)}function Us(e,n,t){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n),Pl(e.return,n,t)}function Gi(e,n,t,r,i){var l=e.memoizedState;l===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:t,tailMode:i}:(l.isBackwards=n,l.rendering=null,l.renderingStartTime=0,l.last=r,l.tail=t,l.tailMode=i)}function Wu(e,n,t){var r=n.pendingProps,i=r.revealOrder,l=r.tail;if(ce(e,n,r.children,t),r=W.current,r&2)r=r&1|2,n.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Us(e,t,n);else if(e.tag===19)Us(e,t,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(F(W,r),!(n.mode&1))n.memoizedState=null;else switch(i){case"forwards":for(t=n.child,i=null;t!==null;)e=t.alternate,e!==null&&Jr(e)===null&&(i=t),t=t.sibling;t=i,t===null?(i=n.child,n.child=null):(i=t.sibling,t.sibling=null),Gi(n,!1,i,t,l);break;case"backwards":for(t=null,i=n.child,n.child=null;i!==null;){if(e=i.alternate,e!==null&&Jr(e)===null){n.child=i;break}e=i.sibling,i.sibling=t,t=i,i=e}Gi(n,!0,t,null,l);break;case"together":Gi(n,!1,null,null,void 0);break;default:n.memoizedState=null}return n.child}function Lr(e,n){!(n.mode&1)&&e!==null&&(e.alternate=null,n.alternate=null,n.flags|=2)}function Ze(e,n,t){if(e!==null&&(n.dependencies=e.dependencies),An|=n.lanes,!(t&n.childLanes))return null;if(e!==null&&n.child!==e.child)throw Error(w(153));if(n.child!==null){for(e=n.child,t=xn(e,e.pendingProps),n.child=t,t.return=n;e.sibling!==null;)e=e.sibling,t=t.sibling=xn(e,e.pendingProps),t.return=n;t.sibling=null}return n.child}function vf(e,n,t){switch(n.tag){case 3:qu(n),st();break;case 5:hu(n);break;case 1:ve(n.type)&&Qr(n);break;case 4:No(n,n.stateNode.containerInfo);break;case 10:var r=n.type._context,i=n.memoizedProps.value;F(Yr,r._currentValue),r._currentValue=i;break;case 13:if(r=n.memoizedState,r!==null)return r.dehydrated!==null?(F(W,W.current&1),n.flags|=128,null):t&n.child.childLanes?Vu(e,n,t):(F(W,W.current&1),e=Ze(e,n,t),e!==null?e.sibling:null);F(W,W.current&1);break;case 19:if(r=(t&n.childLanes)!==0,e.flags&128){if(r)return Wu(e,n,t);n.flags|=128}if(i=n.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),F(W,W.current),r)break;return null;case 22:case 23:return n.lanes=0,$u(e,n,t)}return Ze(e,n,t)}var Bu,Ml,Hu,Qu;Bu=function(e,n){for(var t=n.child;t!==null;){if(t.tag===5||t.tag===6)e.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break;for(;t.sibling===null;){if(t.return===null||t.return===n)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};Ml=function(){};Hu=function(e,n,t,r){var i=e.memoizedProps;if(i!==r){e=n.stateNode,Pn(qe.current);var l=null;switch(t){case"input":i=ol(e,i),r=ol(e,r),l=[];break;case"select":i=H({},i,{value:void 0}),r=H({},r,{value:void 0}),l=[];break;case"textarea":i=ul(e,i),r=ul(e,r),l=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Br)}dl(t,r);var o;t=null;for(d in i)if(!r.hasOwnProperty(d)&&i.hasOwnProperty(d)&&i[d]!=null)if(d==="style"){var a=i[d];for(o in a)a.hasOwnProperty(o)&&(t||(t={}),t[o]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(At.hasOwnProperty(d)?l||(l=[]):(l=l||[]).push(d,null));for(d in r){var u=r[d];if(a=i!=null?i[d]:void 0,r.hasOwnProperty(d)&&u!==a&&(u!=null||a!=null))if(d==="style")if(a){for(o in a)!a.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(t||(t={}),t[o]="");for(o in u)u.hasOwnProperty(o)&&a[o]!==u[o]&&(t||(t={}),t[o]=u[o])}else t||(l||(l=[]),l.push(d,t)),t=u;else d==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,a=a?a.__html:void 0,u!=null&&a!==u&&(l=l||[]).push(d,u)):d==="children"?typeof u!="string"&&typeof u!="number"||(l=l||[]).push(d,""+u):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(At.hasOwnProperty(d)?(u!=null&&d==="onScroll"&&U("scroll",e),l||a===u||(l=[])):(l=l||[]).push(d,u))}t&&(l=l||[]).push("style",t);var d=l;(n.updateQueue=d)&&(n.flags|=4)}};Qu=function(e,n,t,r){t!==r&&(n.flags|=4)};function kt(e,n){if(!V)switch(e.tailMode){case"hidden":n=e.tail;for(var t=null;n!==null;)n.alternate!==null&&(t=n),n=n.sibling;t===null?e.tail=null:t.sibling=null;break;case"collapsed":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function se(e){var n=e.alternate!==null&&e.alternate.child===e.child,t=0,r=0;if(n)for(var i=e.child;i!==null;)t|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)t|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=t,n}function xf(e,n,t){var r=n.pendingProps;switch(ho(n),n.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return se(n),null;case 1:return ve(n.type)&&Hr(),se(n),null;case 3:return r=n.stateNode,ut(),q(he),q(ue),_o(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(xr(n)?n.flags|=4:e===null||e.memoizedState.isDehydrated&&!(n.flags&256)||(n.flags|=1024,De!==null&&(Hl(De),De=null))),Ml(e,n),se(n),null;case 5:So(n);var i=Pn(Gt.current);if(t=n.type,e!==null&&n.stateNode!=null)Hu(e,n,t,r,i),e.ref!==n.ref&&(n.flags|=512,n.flags|=2097152);else{if(!r){if(n.stateNode===null)throw Error(w(166));return se(n),null}if(e=Pn(qe.current),xr(n)){r=n.stateNode,t=n.type;var l=n.memoizedProps;switch(r[$e]=n,r[Ht]=l,e=(n.mode&1)!==0,t){case"dialog":U("cancel",r),U("close",r);break;case"iframe":case"object":case"embed":U("load",r);break;case"video":case"audio":for(i=0;i<bt.length;i++)U(bt[i],r);break;case"source":U("error",r);break;case"img":case"image":case"link":U("error",r),U("load",r);break;case"details":U("toggle",r);break;case"input":Yo(r,l),U("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!l.multiple},U("invalid",r);break;case"textarea":Zo(r,l),U("invalid",r)}dl(t,l),i=null;for(var o in l)if(l.hasOwnProperty(o)){var a=l[o];o==="children"?typeof a=="string"?r.textContent!==a&&(l.suppressHydrationWarning!==!0&&vr(r.textContent,a,e),i=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(l.suppressHydrationWarning!==!0&&vr(r.textContent,a,e),i=["children",""+a]):At.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&U("scroll",r)}switch(t){case"input":ur(r),Xo(r,l,!0);break;case"textarea":ur(r),Jo(r);break;case"select":case"option":break;default:typeof l.onClick=="function"&&(r.onclick=Br)}r=i,n.updateQueue=r,r!==null&&(n.flags|=4)}else{o=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=ka(t)),e==="http://www.w3.org/1999/xhtml"?t==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(t,{is:r.is}):(e=o.createElement(t),t==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,t),e[$e]=n,e[Ht]=r,Bu(e,n,!1,!1),n.stateNode=e;e:{switch(o=fl(t,r),t){case"dialog":U("cancel",e),U("close",e),i=r;break;case"iframe":case"object":case"embed":U("load",e),i=r;break;case"video":case"audio":for(i=0;i<bt.length;i++)U(bt[i],e);i=r;break;case"source":U("error",e),i=r;break;case"img":case"image":case"link":U("error",e),U("load",e),i=r;break;case"details":U("toggle",e),i=r;break;case"input":Yo(e,r),i=ol(e,r),U("invalid",e);break;case"option":i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=H({},r,{value:void 0}),U("invalid",e);break;case"textarea":Zo(e,r),i=ul(e,r),U("invalid",e);break;default:i=r}dl(t,i),a=i;for(l in a)if(a.hasOwnProperty(l)){var u=a[l];l==="style"?Sa(e,u):l==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&ja(e,u)):l==="children"?typeof u=="string"?(t!=="textarea"||u!=="")&&It(e,u):typeof u=="number"&&It(e,""+u):l!=="suppressContentEditableWarning"&&l!=="suppressHydrationWarning"&&l!=="autoFocus"&&(At.hasOwnProperty(l)?u!=null&&l==="onScroll"&&U("scroll",e):u!=null&&eo(e,l,u,o))}switch(t){case"input":ur(e),Xo(e,r,!1);break;case"textarea":ur(e),Jo(e);break;case"option":r.value!=null&&e.setAttribute("value",""+yn(r.value));break;case"select":e.multiple=!!r.multiple,l=r.value,l!=null?Jn(e,!!r.multiple,l,!1):r.defaultValue!=null&&Jn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=Br)}switch(t){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(n.flags|=4)}n.ref!==null&&(n.flags|=512,n.flags|=2097152)}return se(n),null;case 6:if(e&&n.stateNode!=null)Qu(e,n,e.memoizedProps,r);else{if(typeof r!="string"&&n.stateNode===null)throw Error(w(166));if(t=Pn(Gt.current),Pn(qe.current),xr(n)){if(r=n.stateNode,t=n.memoizedProps,r[$e]=n,(l=r.nodeValue!==t)&&(e=ke,e!==null))switch(e.tag){case 3:vr(r.nodeValue,t,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&vr(r.nodeValue,t,(e.mode&1)!==0)}l&&(n.flags|=4)}else r=(t.nodeType===9?t:t.ownerDocument).createTextNode(r),r[$e]=n,n.stateNode=r}return se(n),null;case 13:if(q(W),r=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(V&&we!==null&&n.mode&1&&!(n.flags&128))du(),st(),n.flags|=98560,l=!1;else if(l=xr(n),r!==null&&r.dehydrated!==null){if(e===null){if(!l)throw Error(w(318));if(l=n.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(w(317));l[$e]=n}else st(),!(n.flags&128)&&(n.memoizedState=null),n.flags|=4;se(n),l=!1}else De!==null&&(Hl(De),De=null),l=!0;if(!l)return n.flags&65536?n:null}return n.flags&128?(n.lanes=t,n):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(n.child.flags|=8192,n.mode&1&&(e===null||W.current&1?J===0&&(J=3):Io())),n.updateQueue!==null&&(n.flags|=4),se(n),null);case 4:return ut(),Ml(e,n),e===null&&Wt(n.stateNode.containerInfo),se(n),null;case 10:return wo(n.type._context),se(n),null;case 17:return ve(n.type)&&Hr(),se(n),null;case 19:if(q(W),l=n.memoizedState,l===null)return se(n),null;if(r=(n.flags&128)!==0,o=l.rendering,o===null)if(r)kt(l,!1);else{if(J!==0||e!==null&&e.flags&128)for(e=n.child;e!==null;){if(o=Jr(e),o!==null){for(n.flags|=128,kt(l,!1),r=o.updateQueue,r!==null&&(n.updateQueue=r,n.flags|=4),n.subtreeFlags=0,r=t,t=n.child;t!==null;)l=t,e=r,l.flags&=14680066,o=l.alternate,o===null?(l.childLanes=0,l.lanes=e,l.child=null,l.subtreeFlags=0,l.memoizedProps=null,l.memoizedState=null,l.updateQueue=null,l.dependencies=null,l.stateNode=null):(l.childLanes=o.childLanes,l.lanes=o.lanes,l.child=o.child,l.subtreeFlags=0,l.deletions=null,l.memoizedProps=o.memoizedProps,l.memoizedState=o.memoizedState,l.updateQueue=o.updateQueue,l.type=o.type,e=o.dependencies,l.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t=t.sibling;return F(W,W.current&1|2),n.child}e=e.sibling}l.tail!==null&&G()>dt&&(n.flags|=128,r=!0,kt(l,!1),n.lanes=4194304)}else{if(!r)if(e=Jr(o),e!==null){if(n.flags|=128,r=!0,t=e.updateQueue,t!==null&&(n.updateQueue=t,n.flags|=4),kt(l,!0),l.tail===null&&l.tailMode==="hidden"&&!o.alternate&&!V)return se(n),null}else 2*G()-l.renderingStartTime>dt&&t!==1073741824&&(n.flags|=128,r=!0,kt(l,!1),n.lanes=4194304);l.isBackwards?(o.sibling=n.child,n.child=o):(t=l.last,t!==null?t.sibling=o:n.child=o,l.last=o)}return l.tail!==null?(n=l.tail,l.rendering=n,l.tail=n.sibling,l.renderingStartTime=G(),n.sibling=null,t=W.current,F(W,r?t&1|2:t&1),n):(se(n),null);case 22:case 23:return Ao(),r=n.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(n.flags|=8192),r&&n.mode&1?ye&1073741824&&(se(n),n.subtreeFlags&6&&(n.flags|=8192)):se(n),null;case 24:return null;case 25:return null}throw Error(w(156,n.tag))}function yf(e,n){switch(ho(n),n.tag){case 1:return ve(n.type)&&Hr(),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return ut(),q(he),q(ue),_o(),e=n.flags,e&65536&&!(e&128)?(n.flags=e&-65537|128,n):null;case 5:return So(n),null;case 13:if(q(W),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(w(340));st()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return q(W),null;case 4:return ut(),null;case 10:return wo(n.type._context),null;case 22:case 23:return Ao(),null;case 24:return null;default:return null}}var kr=!1,ae=!1,wf=typeof WeakSet=="function"?WeakSet:Set,S=null;function Xn(e,n){var t=e.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(r){Q(e,n,r)}else t.current=null}function Fl(e,n,t){try{t()}catch(r){Q(e,n,r)}}var qs=!1;function kf(e,n){if(jl=qr,e=Za(),mo(e)){if("selectionStart"in e)var t={start:e.selectionStart,end:e.selectionEnd};else e:{t=(t=e.ownerDocument)&&t.defaultView||window;var r=t.getSelection&&t.getSelection();if(r&&r.rangeCount!==0){t=r.anchorNode;var i=r.anchorOffset,l=r.focusNode;r=r.focusOffset;try{t.nodeType,l.nodeType}catch{t=null;break e}var o=0,a=-1,u=-1,d=0,g=0,h=e,p=null;n:for(;;){for(var v;h!==t||i!==0&&h.nodeType!==3||(a=o+i),h!==l||r!==0&&h.nodeType!==3||(u=o+r),h.nodeType===3&&(o+=h.nodeValue.length),(v=h.firstChild)!==null;)p=h,h=v;for(;;){if(h===e)break n;if(p===t&&++d===i&&(a=o),p===l&&++g===r&&(u=o),(v=h.nextSibling)!==null)break;h=p,p=h.parentNode}h=v}t=a===-1||u===-1?null:{start:a,end:u}}else t=null}t=t||{start:0,end:0}}else t=null;for(Nl={focusedElem:e,selectionRange:t},qr=!1,S=n;S!==null;)if(n=S,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,S=e;else for(;S!==null;){n=S;try{var y=n.alternate;if(n.flags&1024)switch(n.tag){case 0:case 11:case 15:break;case 1:if(y!==null){var j=y.memoizedProps,D=y.memoizedState,f=n.stateNode,c=f.getSnapshotBeforeUpdate(n.elementType===n.type?j:Le(n.type,j),D);f.__reactInternalSnapshotBeforeUpdate=c}break;case 3:var m=n.stateNode.containerInfo;m.nodeType===1?m.textContent="":m.nodeType===9&&m.documentElement&&m.removeChild(m.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(w(163))}}catch(x){Q(n,n.return,x)}if(e=n.sibling,e!==null){e.return=n.return,S=e;break}S=n.return}return y=qs,qs=!1,y}function Rt(e,n,t){var r=n.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var l=i.destroy;i.destroy=void 0,l!==void 0&&Fl(n,t,l)}i=i.next}while(i!==r)}}function hi(e,n){if(n=n.updateQueue,n=n!==null?n.lastEffect:null,n!==null){var t=n=n.next;do{if((t.tag&e)===e){var r=t.create;t.destroy=r()}t=t.next}while(t!==n)}}function $l(e){var n=e.ref;if(n!==null){var t=e.stateNode;switch(e.tag){case 5:e=t;break;default:e=t}typeof n=="function"?n(e):n.current=e}}function Gu(e){var n=e.alternate;n!==null&&(e.alternate=null,Gu(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&(delete n[$e],delete n[Ht],delete n[bl],delete n[tf],delete n[rf])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Ku(e){return e.tag===5||e.tag===3||e.tag===4}function Vs(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Ku(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ul(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.nodeType===8?t.parentNode.insertBefore(e,n):t.insertBefore(e,n):(t.nodeType===8?(n=t.parentNode,n.insertBefore(e,t)):(n=t,n.appendChild(e)),t=t._reactRootContainer,t!=null||n.onclick!==null||(n.onclick=Br));else if(r!==4&&(e=e.child,e!==null))for(Ul(e,n,t),e=e.sibling;e!==null;)Ul(e,n,t),e=e.sibling}function ql(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.insertBefore(e,n):t.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(ql(e,n,t),e=e.sibling;e!==null;)ql(e,n,t),e=e.sibling}var te=null,Re=!1;function tn(e,n,t){for(t=t.child;t!==null;)Yu(e,n,t),t=t.sibling}function Yu(e,n,t){if(Ue&&typeof Ue.onCommitFiberUnmount=="function")try{Ue.onCommitFiberUnmount(ai,t)}catch{}switch(t.tag){case 5:ae||Xn(t,n);case 6:var r=te,i=Re;te=null,tn(e,n,t),te=r,Re=i,te!==null&&(Re?(e=te,t=t.stateNode,e.nodeType===8?e.parentNode.removeChild(t):e.removeChild(t)):te.removeChild(t.stateNode));break;case 18:te!==null&&(Re?(e=te,t=t.stateNode,e.nodeType===8?Ui(e.parentNode,t):e.nodeType===1&&Ui(e,t),Ut(e)):Ui(te,t.stateNode));break;case 4:r=te,i=Re,te=t.stateNode.containerInfo,Re=!0,tn(e,n,t),te=r,Re=i;break;case 0:case 11:case 14:case 15:if(!ae&&(r=t.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var l=i,o=l.destroy;l=l.tag,o!==void 0&&(l&2||l&4)&&Fl(t,n,o),i=i.next}while(i!==r)}tn(e,n,t);break;case 1:if(!ae&&(Xn(t,n),r=t.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=t.memoizedProps,r.state=t.memoizedState,r.componentWillUnmount()}catch(a){Q(t,n,a)}tn(e,n,t);break;case 21:tn(e,n,t);break;case 22:t.mode&1?(ae=(r=ae)||t.memoizedState!==null,tn(e,n,t),ae=r):tn(e,n,t);break;default:tn(e,n,t)}}function Ws(e){var n=e.updateQueue;if(n!==null){e.updateQueue=null;var t=e.stateNode;t===null&&(t=e.stateNode=new wf),n.forEach(function(r){var i=Pf.bind(null,e,r);t.has(r)||(t.add(r),r.then(i,i))})}}function Te(e,n){var t=n.deletions;if(t!==null)for(var r=0;r<t.length;r++){var i=t[r];try{var l=e,o=n,a=o;e:for(;a!==null;){switch(a.tag){case 5:te=a.stateNode,Re=!1;break e;case 3:te=a.stateNode.containerInfo,Re=!0;break e;case 4:te=a.stateNode.containerInfo,Re=!0;break e}a=a.return}if(te===null)throw Error(w(160));Yu(l,o,i),te=null,Re=!1;var u=i.alternate;u!==null&&(u.return=null),i.return=null}catch(d){Q(i,n,d)}}if(n.subtreeFlags&12854)for(n=n.child;n!==null;)Xu(n,e),n=n.sibling}function Xu(e,n){var t=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Te(n,e),Me(e),r&4){try{Rt(3,e,e.return),hi(3,e)}catch(j){Q(e,e.return,j)}try{Rt(5,e,e.return)}catch(j){Q(e,e.return,j)}}break;case 1:Te(n,e),Me(e),r&512&&t!==null&&Xn(t,t.return);break;case 5:if(Te(n,e),Me(e),r&512&&t!==null&&Xn(t,t.return),e.flags&32){var i=e.stateNode;try{It(i,"")}catch(j){Q(e,e.return,j)}}if(r&4&&(i=e.stateNode,i!=null)){var l=e.memoizedProps,o=t!==null?t.memoizedProps:l,a=e.type,u=e.updateQueue;if(e.updateQueue=null,u!==null)try{a==="input"&&l.type==="radio"&&l.name!=null&&ya(i,l),fl(a,o);var d=fl(a,l);for(o=0;o<u.length;o+=2){var g=u[o],h=u[o+1];g==="style"?Sa(i,h):g==="dangerouslySetInnerHTML"?ja(i,h):g==="children"?It(i,h):eo(i,g,h,d)}switch(a){case"input":sl(i,l);break;case"textarea":wa(i,l);break;case"select":var p=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!l.multiple;var v=l.value;v!=null?Jn(i,!!l.multiple,v,!1):p!==!!l.multiple&&(l.defaultValue!=null?Jn(i,!!l.multiple,l.defaultValue,!0):Jn(i,!!l.multiple,l.multiple?[]:"",!1))}i[Ht]=l}catch(j){Q(e,e.return,j)}}break;case 6:if(Te(n,e),Me(e),r&4){if(e.stateNode===null)throw Error(w(162));i=e.stateNode,l=e.memoizedProps;try{i.nodeValue=l}catch(j){Q(e,e.return,j)}}break;case 3:if(Te(n,e),Me(e),r&4&&t!==null&&t.memoizedState.isDehydrated)try{Ut(n.containerInfo)}catch(j){Q(e,e.return,j)}break;case 4:Te(n,e),Me(e);break;case 13:Te(n,e),Me(e),i=e.child,i.flags&8192&&(l=i.memoizedState!==null,i.stateNode.isHidden=l,!l||i.alternate!==null&&i.alternate.memoizedState!==null||(Do=G())),r&4&&Ws(e);break;case 22:if(g=t!==null&&t.memoizedState!==null,e.mode&1?(ae=(d=ae)||g,Te(n,e),ae=d):Te(n,e),Me(e),r&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!g&&e.mode&1)for(S=e,g=e.child;g!==null;){for(h=S=g;S!==null;){switch(p=S,v=p.child,p.tag){case 0:case 11:case 14:case 15:Rt(4,p,p.return);break;case 1:Xn(p,p.return);var y=p.stateNode;if(typeof y.componentWillUnmount=="function"){r=p,t=p.return;try{n=r,y.props=n.memoizedProps,y.state=n.memoizedState,y.componentWillUnmount()}catch(j){Q(r,t,j)}}break;case 5:Xn(p,p.return);break;case 22:if(p.memoizedState!==null){Hs(h);continue}}v!==null?(v.return=p,S=v):Hs(h)}g=g.sibling}e:for(g=null,h=e;;){if(h.tag===5){if(g===null){g=h;try{i=h.stateNode,d?(l=i.style,typeof l.setProperty=="function"?l.setProperty("display","none","important"):l.display="none"):(a=h.stateNode,u=h.memoizedProps.style,o=u!=null&&u.hasOwnProperty("display")?u.display:null,a.style.display=Na("display",o))}catch(j){Q(e,e.return,j)}}}else if(h.tag===6){if(g===null)try{h.stateNode.nodeValue=d?"":h.memoizedProps}catch(j){Q(e,e.return,j)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===e)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===e)break e;for(;h.sibling===null;){if(h.return===null||h.return===e)break e;g===h&&(g=null),h=h.return}g===h&&(g=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:Te(n,e),Me(e),r&4&&Ws(e);break;case 21:break;default:Te(n,e),Me(e)}}function Me(e){var n=e.flags;if(n&2){try{e:{for(var t=e.return;t!==null;){if(Ku(t)){var r=t;break e}t=t.return}throw Error(w(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(It(i,""),r.flags&=-33);var l=Vs(e);ql(e,l,i);break;case 3:case 4:var o=r.stateNode.containerInfo,a=Vs(e);Ul(e,a,o);break;default:throw Error(w(161))}}catch(u){Q(e,e.return,u)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function jf(e,n,t){S=e,Zu(e)}function Zu(e,n,t){for(var r=(e.mode&1)!==0;S!==null;){var i=S,l=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||kr;if(!o){var a=i.alternate,u=a!==null&&a.memoizedState!==null||ae;a=kr;var d=ae;if(kr=o,(ae=u)&&!d)for(S=i;S!==null;)o=S,u=o.child,o.tag===22&&o.memoizedState!==null?Qs(i):u!==null?(u.return=o,S=u):Qs(i);for(;l!==null;)S=l,Zu(l),l=l.sibling;S=i,kr=a,ae=d}Bs(e)}else i.subtreeFlags&8772&&l!==null?(l.return=i,S=l):Bs(e)}}function Bs(e){for(;S!==null;){var n=S;if(n.flags&8772){var t=n.alternate;try{if(n.flags&8772)switch(n.tag){case 0:case 11:case 15:ae||hi(5,n);break;case 1:var r=n.stateNode;if(n.flags&4&&!ae)if(t===null)r.componentDidMount();else{var i=n.elementType===n.type?t.memoizedProps:Le(n.type,t.memoizedProps);r.componentDidUpdate(i,t.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var l=n.updateQueue;l!==null&&zs(n,l,r);break;case 3:var o=n.updateQueue;if(o!==null){if(t=null,n.child!==null)switch(n.child.tag){case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}zs(n,o,t)}break;case 5:var a=n.stateNode;if(t===null&&n.flags&4){t=a;var u=n.memoizedProps;switch(n.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&t.focus();break;case"img":u.src&&(t.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(n.memoizedState===null){var d=n.alternate;if(d!==null){var g=d.memoizedState;if(g!==null){var h=g.dehydrated;h!==null&&Ut(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(w(163))}ae||n.flags&512&&$l(n)}catch(p){Q(n,n.return,p)}}if(n===e){S=null;break}if(t=n.sibling,t!==null){t.return=n.return,S=t;break}S=n.return}}function Hs(e){for(;S!==null;){var n=S;if(n===e){S=null;break}var t=n.sibling;if(t!==null){t.return=n.return,S=t;break}S=n.return}}function Qs(e){for(;S!==null;){var n=S;try{switch(n.tag){case 0:case 11:case 15:var t=n.return;try{hi(4,n)}catch(u){Q(n,t,u)}break;case 1:var r=n.stateNode;if(typeof r.componentDidMount=="function"){var i=n.return;try{r.componentDidMount()}catch(u){Q(n,i,u)}}var l=n.return;try{$l(n)}catch(u){Q(n,l,u)}break;case 5:var o=n.return;try{$l(n)}catch(u){Q(n,o,u)}}}catch(u){Q(n,n.return,u)}if(n===e){S=null;break}var a=n.sibling;if(a!==null){a.return=n.return,S=a;break}S=n.return}}var Nf=Math.ceil,ti=Je.ReactCurrentDispatcher,Lo=Je.ReactCurrentOwner,Ce=Je.ReactCurrentBatchConfig,A=0,ne=null,Y=null,re=0,ye=0,Zn=jn(0),J=0,Zt=null,An=0,vi=0,Ro=0,Dt=null,me=null,Do=0,dt=1/0,Ve=null,ri=!1,Vl=null,hn=null,jr=!1,cn=null,ii=0,Ot=0,Wl=null,Rr=-1,Dr=0;function de(){return A&6?G():Rr!==-1?Rr:Rr=G()}function vn(e){return e.mode&1?A&2&&re!==0?re&-re:of.transition!==null?(Dr===0&&(Dr=Aa()),Dr):(e=I,e!==0||(e=window.event,e=e===void 0?16:Va(e.type)),e):1}function Ae(e,n,t,r){if(50<Ot)throw Ot=0,Wl=null,Error(w(185));er(e,t,r),(!(A&2)||e!==ne)&&(e===ne&&(!(A&2)&&(vi|=t),J===4&&an(e,re)),xe(e,r),t===1&&A===0&&!(n.mode&1)&&(dt=G()+500,pi&&Nn()))}function xe(e,n){var t=e.callbackNode;ld(e,n);var r=Ur(e,e===ne?re:0);if(r===0)t!==null&&ts(t),e.callbackNode=null,e.callbackPriority=0;else if(n=r&-r,e.callbackPriority!==n){if(t!=null&&ts(t),n===1)e.tag===0?lf(Gs.bind(null,e)):au(Gs.bind(null,e)),ef(function(){!(A&6)&&Nn()}),t=null;else{switch(Ia(r)){case 1:t=lo;break;case 4:t=Da;break;case 16:t=$r;break;case 536870912:t=Oa;break;default:t=$r}t=oc(t,Ju.bind(null,e))}e.callbackPriority=n,e.callbackNode=t}}function Ju(e,n){if(Rr=-1,Dr=0,A&6)throw Error(w(327));var t=e.callbackNode;if(it()&&e.callbackNode!==t)return null;var r=Ur(e,e===ne?re:0);if(r===0)return null;if(r&30||r&e.expiredLanes||n)n=li(e,r);else{n=r;var i=A;A|=2;var l=nc();(ne!==e||re!==n)&&(Ve=null,dt=G()+500,Tn(e,n));do try{bf();break}catch(a){ec(e,a)}while(!0);yo(),ti.current=l,A=i,Y!==null?n=0:(ne=null,re=0,n=J)}if(n!==0){if(n===2&&(i=vl(e),i!==0&&(r=i,n=Bl(e,i))),n===1)throw t=Zt,Tn(e,0),an(e,r),xe(e,G()),t;if(n===6)an(e,r);else{if(i=e.current.alternate,!(r&30)&&!Sf(i)&&(n=li(e,r),n===2&&(l=vl(e),l!==0&&(r=l,n=Bl(e,l))),n===1))throw t=Zt,Tn(e,0),an(e,r),xe(e,G()),t;switch(e.finishedWork=i,e.finishedLanes=r,n){case 0:case 1:throw Error(w(345));case 2:En(e,me,Ve);break;case 3:if(an(e,r),(r&130023424)===r&&(n=Do+500-G(),10<n)){if(Ur(e,0)!==0)break;if(i=e.suspendedLanes,(i&r)!==r){de(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=_l(En.bind(null,e,me,Ve),n);break}En(e,me,Ve);break;case 4:if(an(e,r),(r&4194240)===r)break;for(n=e.eventTimes,i=-1;0<r;){var o=31-Oe(r);l=1<<o,o=n[o],o>i&&(i=o),r&=~l}if(r=i,r=G()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Nf(r/1960))-r,10<r){e.timeoutHandle=_l(En.bind(null,e,me,Ve),r);break}En(e,me,Ve);break;case 5:En(e,me,Ve);break;default:throw Error(w(329))}}}return xe(e,G()),e.callbackNode===t?Ju.bind(null,e):null}function Bl(e,n){var t=Dt;return e.current.memoizedState.isDehydrated&&(Tn(e,n).flags|=256),e=li(e,n),e!==2&&(n=me,me=t,n!==null&&Hl(n)),e}function Hl(e){me===null?me=e:me.push.apply(me,e)}function Sf(e){for(var n=e;;){if(n.flags&16384){var t=n.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var r=0;r<t.length;r++){var i=t[r],l=i.getSnapshot;i=i.value;try{if(!Ie(l(),i))return!1}catch{return!1}}}if(t=n.child,n.subtreeFlags&16384&&t!==null)t.return=n,n=t;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function an(e,n){for(n&=~Ro,n&=~vi,e.suspendedLanes|=n,e.pingedLanes&=~n,e=e.expirationTimes;0<n;){var t=31-Oe(n),r=1<<t;e[t]=-1,n&=~r}}function Gs(e){if(A&6)throw Error(w(327));it();var n=Ur(e,0);if(!(n&1))return xe(e,G()),null;var t=li(e,n);if(e.tag!==0&&t===2){var r=vl(e);r!==0&&(n=r,t=Bl(e,r))}if(t===1)throw t=Zt,Tn(e,0),an(e,n),xe(e,G()),t;if(t===6)throw Error(w(345));return e.finishedWork=e.current.alternate,e.finishedLanes=n,En(e,me,Ve),xe(e,G()),null}function Oo(e,n){var t=A;A|=1;try{return e(n)}finally{A=t,A===0&&(dt=G()+500,pi&&Nn())}}function In(e){cn!==null&&cn.tag===0&&!(A&6)&&it();var n=A;A|=1;var t=Ce.transition,r=I;try{if(Ce.transition=null,I=1,e)return e()}finally{I=r,Ce.transition=t,A=n,!(A&6)&&Nn()}}function Ao(){ye=Zn.current,q(Zn)}function Tn(e,n){e.finishedWork=null,e.finishedLanes=0;var t=e.timeoutHandle;if(t!==-1&&(e.timeoutHandle=-1,Jd(t)),Y!==null)for(t=Y.return;t!==null;){var r=t;switch(ho(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Hr();break;case 3:ut(),q(he),q(ue),_o();break;case 5:So(r);break;case 4:ut();break;case 13:q(W);break;case 19:q(W);break;case 10:wo(r.type._context);break;case 22:case 23:Ao()}t=t.return}if(ne=e,Y=e=xn(e.current,null),re=ye=n,J=0,Zt=null,Ro=vi=An=0,me=Dt=null,zn!==null){for(n=0;n<zn.length;n++)if(t=zn[n],r=t.interleaved,r!==null){t.interleaved=null;var i=r.next,l=t.pending;if(l!==null){var o=l.next;l.next=i,r.next=o}t.pending=r}zn=null}return e}function ec(e,n){do{var t=Y;try{if(yo(),Pr.current=ni,ei){for(var r=B.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}ei=!1}if(On=0,ee=X=B=null,Lt=!1,Kt=0,Lo.current=null,t===null||t.return===null){J=1,Zt=n,Y=null;break}e:{var l=e,o=t.return,a=t,u=n;if(n=re,a.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var d=u,g=a,h=g.tag;if(!(g.mode&1)&&(h===0||h===11||h===15)){var p=g.alternate;p?(g.updateQueue=p.updateQueue,g.memoizedState=p.memoizedState,g.lanes=p.lanes):(g.updateQueue=null,g.memoizedState=null)}var v=Os(o);if(v!==null){v.flags&=-257,As(v,o,a,l,n),v.mode&1&&Ds(l,d,n),n=v,u=d;var y=n.updateQueue;if(y===null){var j=new Set;j.add(u),n.updateQueue=j}else y.add(u);break e}else{if(!(n&1)){Ds(l,d,n),Io();break e}u=Error(w(426))}}else if(V&&a.mode&1){var D=Os(o);if(D!==null){!(D.flags&65536)&&(D.flags|=256),As(D,o,a,l,n),vo(ct(u,a));break e}}l=u=ct(u,a),J!==4&&(J=2),Dt===null?Dt=[l]:Dt.push(l),l=o;do{switch(l.tag){case 3:l.flags|=65536,n&=-n,l.lanes|=n;var f=Iu(l,u,n);Cs(l,f);break e;case 1:a=u;var c=l.type,m=l.stateNode;if(!(l.flags&128)&&(typeof c.getDerivedStateFromError=="function"||m!==null&&typeof m.componentDidCatch=="function"&&(hn===null||!hn.has(m)))){l.flags|=65536,n&=-n,l.lanes|=n;var x=Mu(l,a,n);Cs(l,x);break e}}l=l.return}while(l!==null)}rc(t)}catch(N){n=N,Y===t&&t!==null&&(Y=t=t.return);continue}break}while(!0)}function nc(){var e=ti.current;return ti.current=ni,e===null?ni:e}function Io(){(J===0||J===3||J===2)&&(J=4),ne===null||!(An&268435455)&&!(vi&268435455)||an(ne,re)}function li(e,n){var t=A;A|=2;var r=nc();(ne!==e||re!==n)&&(Ve=null,Tn(e,n));do try{_f();break}catch(i){ec(e,i)}while(!0);if(yo(),A=t,ti.current=r,Y!==null)throw Error(w(261));return ne=null,re=0,J}function _f(){for(;Y!==null;)tc(Y)}function bf(){for(;Y!==null&&!Yc();)tc(Y)}function tc(e){var n=lc(e.alternate,e,ye);e.memoizedProps=e.pendingProps,n===null?rc(e):Y=n,Lo.current=null}function rc(e){var n=e;do{var t=n.alternate;if(e=n.return,n.flags&32768){if(t=yf(t,n),t!==null){t.flags&=32767,Y=t;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{J=6,Y=null;return}}else if(t=xf(t,n,ye),t!==null){Y=t;return}if(n=n.sibling,n!==null){Y=n;return}Y=n=e}while(n!==null);J===0&&(J=5)}function En(e,n,t){var r=I,i=Ce.transition;try{Ce.transition=null,I=1,Ef(e,n,t,r)}finally{Ce.transition=i,I=r}return null}function Ef(e,n,t,r){do it();while(cn!==null);if(A&6)throw Error(w(327));t=e.finishedWork;var i=e.finishedLanes;if(t===null)return null;if(e.finishedWork=null,e.finishedLanes=0,t===e.current)throw Error(w(177));e.callbackNode=null,e.callbackPriority=0;var l=t.lanes|t.childLanes;if(od(e,l),e===ne&&(Y=ne=null,re=0),!(t.subtreeFlags&2064)&&!(t.flags&2064)||jr||(jr=!0,oc($r,function(){return it(),null})),l=(t.flags&15990)!==0,t.subtreeFlags&15990||l){l=Ce.transition,Ce.transition=null;var o=I;I=1;var a=A;A|=4,Lo.current=null,kf(e,t),Xu(t,e),Hd(Nl),qr=!!jl,Nl=jl=null,e.current=t,jf(t),Xc(),A=a,I=o,Ce.transition=l}else e.current=t;if(jr&&(jr=!1,cn=e,ii=i),l=e.pendingLanes,l===0&&(hn=null),ed(t.stateNode),xe(e,G()),n!==null)for(r=e.onRecoverableError,t=0;t<n.length;t++)i=n[t],r(i.value,{componentStack:i.stack,digest:i.digest});if(ri)throw ri=!1,e=Vl,Vl=null,e;return ii&1&&e.tag!==0&&it(),l=e.pendingLanes,l&1?e===Wl?Ot++:(Ot=0,Wl=e):Ot=0,Nn(),null}function it(){if(cn!==null){var e=Ia(ii),n=Ce.transition,t=I;try{if(Ce.transition=null,I=16>e?16:e,cn===null)var r=!1;else{if(e=cn,cn=null,ii=0,A&6)throw Error(w(331));var i=A;for(A|=4,S=e.current;S!==null;){var l=S,o=l.child;if(S.flags&16){var a=l.deletions;if(a!==null){for(var u=0;u<a.length;u++){var d=a[u];for(S=d;S!==null;){var g=S;switch(g.tag){case 0:case 11:case 15:Rt(8,g,l)}var h=g.child;if(h!==null)h.return=g,S=h;else for(;S!==null;){g=S;var p=g.sibling,v=g.return;if(Gu(g),g===d){S=null;break}if(p!==null){p.return=v,S=p;break}S=v}}}var y=l.alternate;if(y!==null){var j=y.child;if(j!==null){y.child=null;do{var D=j.sibling;j.sibling=null,j=D}while(j!==null)}}S=l}}if(l.subtreeFlags&2064&&o!==null)o.return=l,S=o;else e:for(;S!==null;){if(l=S,l.flags&2048)switch(l.tag){case 0:case 11:case 15:Rt(9,l,l.return)}var f=l.sibling;if(f!==null){f.return=l.return,S=f;break e}S=l.return}}var c=e.current;for(S=c;S!==null;){o=S;var m=o.child;if(o.subtreeFlags&2064&&m!==null)m.return=o,S=m;else e:for(o=c;S!==null;){if(a=S,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:hi(9,a)}}catch(N){Q(a,a.return,N)}if(a===o){S=null;break e}var x=a.sibling;if(x!==null){x.return=a.return,S=x;break e}S=a.return}}if(A=i,Nn(),Ue&&typeof Ue.onPostCommitFiberRoot=="function")try{Ue.onPostCommitFiberRoot(ai,e)}catch{}r=!0}return r}finally{I=t,Ce.transition=n}}return!1}function Ks(e,n,t){n=ct(t,n),n=Iu(e,n,1),e=gn(e,n,1),n=de(),e!==null&&(er(e,1,n),xe(e,n))}function Q(e,n,t){if(e.tag===3)Ks(e,e,t);else for(;n!==null;){if(n.tag===3){Ks(n,e,t);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(hn===null||!hn.has(r))){e=ct(t,e),e=Mu(n,e,1),n=gn(n,e,1),e=de(),n!==null&&(er(n,1,e),xe(n,e));break}}n=n.return}}function Cf(e,n,t){var r=e.pingCache;r!==null&&r.delete(n),n=de(),e.pingedLanes|=e.suspendedLanes&t,ne===e&&(re&t)===t&&(J===4||J===3&&(re&130023424)===re&&500>G()-Do?Tn(e,0):Ro|=t),xe(e,n)}function ic(e,n){n===0&&(e.mode&1?(n=fr,fr<<=1,!(fr&130023424)&&(fr=4194304)):n=1);var t=de();e=Xe(e,n),e!==null&&(er(e,n,t),xe(e,t))}function zf(e){var n=e.memoizedState,t=0;n!==null&&(t=n.retryLane),ic(e,t)}function Pf(e,n){var t=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(t=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(w(314))}r!==null&&r.delete(n),ic(e,t)}var lc;lc=function(e,n,t){if(e!==null)if(e.memoizedProps!==n.pendingProps||he.current)ge=!0;else{if(!(e.lanes&t)&&!(n.flags&128))return ge=!1,vf(e,n,t);ge=!!(e.flags&131072)}else ge=!1,V&&n.flags&1048576&&uu(n,Kr,n.index);switch(n.lanes=0,n.tag){case 2:var r=n.type;Lr(e,n),e=n.pendingProps;var i=ot(n,ue.current);rt(n,t),i=Eo(null,n,r,e,i,t);var l=Co();return n.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(n.tag=1,n.memoizedState=null,n.updateQueue=null,ve(r)?(l=!0,Qr(n)):l=!1,n.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,jo(n),i.updater=gi,n.stateNode=i,i._reactInternals=n,Ll(n,r,e,t),n=Ol(null,n,r,!0,l,t)):(n.tag=0,V&&l&&go(n),ce(null,n,i,t),n=n.child),n;case 16:r=n.elementType;e:{switch(Lr(e,n),e=n.pendingProps,i=r._init,r=i(r._payload),n.type=r,i=n.tag=Lf(r),e=Le(r,e),i){case 0:n=Dl(null,n,r,e,t);break e;case 1:n=Fs(null,n,r,e,t);break e;case 11:n=Is(null,n,r,e,t);break e;case 14:n=Ms(null,n,r,Le(r.type,e),t);break e}throw Error(w(306,r,""))}return n;case 0:return r=n.type,i=n.pendingProps,i=n.elementType===r?i:Le(r,i),Dl(e,n,r,i,t);case 1:return r=n.type,i=n.pendingProps,i=n.elementType===r?i:Le(r,i),Fs(e,n,r,i,t);case 3:e:{if(qu(n),e===null)throw Error(w(387));r=n.pendingProps,l=n.memoizedState,i=l.element,gu(e,n),Zr(n,r,null,t);var o=n.memoizedState;if(r=o.element,l.isDehydrated)if(l={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},n.updateQueue.baseState=l,n.memoizedState=l,n.flags&256){i=ct(Error(w(423)),n),n=$s(e,n,r,t,i);break e}else if(r!==i){i=ct(Error(w(424)),n),n=$s(e,n,r,t,i);break e}else for(we=mn(n.stateNode.containerInfo.firstChild),ke=n,V=!0,De=null,t=pu(n,null,r,t),n.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(st(),r===i){n=Ze(e,n,t);break e}ce(e,n,r,t)}n=n.child}return n;case 5:return hu(n),e===null&&zl(n),r=n.type,i=n.pendingProps,l=e!==null?e.memoizedProps:null,o=i.children,Sl(r,i)?o=null:l!==null&&Sl(r,l)&&(n.flags|=32),Uu(e,n),ce(e,n,o,t),n.child;case 6:return e===null&&zl(n),null;case 13:return Vu(e,n,t);case 4:return No(n,n.stateNode.containerInfo),r=n.pendingProps,e===null?n.child=at(n,null,r,t):ce(e,n,r,t),n.child;case 11:return r=n.type,i=n.pendingProps,i=n.elementType===r?i:Le(r,i),Is(e,n,r,i,t);case 7:return ce(e,n,n.pendingProps,t),n.child;case 8:return ce(e,n,n.pendingProps.children,t),n.child;case 12:return ce(e,n,n.pendingProps.children,t),n.child;case 10:e:{if(r=n.type._context,i=n.pendingProps,l=n.memoizedProps,o=i.value,F(Yr,r._currentValue),r._currentValue=o,l!==null)if(Ie(l.value,o)){if(l.children===i.children&&!he.current){n=Ze(e,n,t);break e}}else for(l=n.child,l!==null&&(l.return=n);l!==null;){var a=l.dependencies;if(a!==null){o=l.child;for(var u=a.firstContext;u!==null;){if(u.context===r){if(l.tag===1){u=Ge(-1,t&-t),u.tag=2;var d=l.updateQueue;if(d!==null){d=d.shared;var g=d.pending;g===null?u.next=u:(u.next=g.next,g.next=u),d.pending=u}}l.lanes|=t,u=l.alternate,u!==null&&(u.lanes|=t),Pl(l.return,t,n),a.lanes|=t;break}u=u.next}}else if(l.tag===10)o=l.type===n.type?null:l.child;else if(l.tag===18){if(o=l.return,o===null)throw Error(w(341));o.lanes|=t,a=o.alternate,a!==null&&(a.lanes|=t),Pl(o,t,n),o=l.sibling}else o=l.child;if(o!==null)o.return=l;else for(o=l;o!==null;){if(o===n){o=null;break}if(l=o.sibling,l!==null){l.return=o.return,o=l;break}o=o.return}l=o}ce(e,n,i.children,t),n=n.child}return n;case 9:return i=n.type,r=n.pendingProps.children,rt(n,t),i=ze(i),r=r(i),n.flags|=1,ce(e,n,r,t),n.child;case 14:return r=n.type,i=Le(r,n.pendingProps),i=Le(r.type,i),Ms(e,n,r,i,t);case 15:return Fu(e,n,n.type,n.pendingProps,t);case 17:return r=n.type,i=n.pendingProps,i=n.elementType===r?i:Le(r,i),Lr(e,n),n.tag=1,ve(r)?(e=!0,Qr(n)):e=!1,rt(n,t),Au(n,r,i),Ll(n,r,i,t),Ol(null,n,r,!0,e,t);case 19:return Wu(e,n,t);case 22:return $u(e,n,t)}throw Error(w(156,n.tag))};function oc(e,n){return Ra(e,n)}function Tf(e,n,t,r){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ee(e,n,t,r){return new Tf(e,n,t,r)}function Mo(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Lf(e){if(typeof e=="function")return Mo(e)?1:0;if(e!=null){if(e=e.$$typeof,e===to)return 11;if(e===ro)return 14}return 2}function xn(e,n){var t=e.alternate;return t===null?(t=Ee(e.tag,n,e.key,e.mode),t.elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=n,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=e.flags&14680064,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,n=e.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t}function Or(e,n,t,r,i,l){var o=2;if(r=e,typeof e=="function")Mo(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case qn:return Ln(t.children,i,l,n);case no:o=8,i|=8;break;case tl:return e=Ee(12,t,n,i|2),e.elementType=tl,e.lanes=l,e;case rl:return e=Ee(13,t,n,i),e.elementType=rl,e.lanes=l,e;case il:return e=Ee(19,t,n,i),e.elementType=il,e.lanes=l,e;case ha:return xi(t,i,l,n);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case ma:o=10;break e;case ga:o=9;break e;case to:o=11;break e;case ro:o=14;break e;case ln:o=16,r=null;break e}throw Error(w(130,e==null?e:typeof e,""))}return n=Ee(o,t,n,i),n.elementType=e,n.type=r,n.lanes=l,n}function Ln(e,n,t,r){return e=Ee(7,e,r,n),e.lanes=t,e}function xi(e,n,t,r){return e=Ee(22,e,r,n),e.elementType=ha,e.lanes=t,e.stateNode={isHidden:!1},e}function Ki(e,n,t){return e=Ee(6,e,null,n),e.lanes=t,e}function Yi(e,n,t){return n=Ee(4,e.children!==null?e.children:[],e.key,n),n.lanes=t,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}function Rf(e,n,t,r,i){this.tag=n,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Pi(0),this.expirationTimes=Pi(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Pi(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Fo(e,n,t,r,i,l,o,a,u){return e=new Rf(e,n,t,a,u),n===1?(n=1,l===!0&&(n|=8)):n=0,l=Ee(3,null,null,n),e.current=l,l.stateNode=e,l.memoizedState={element:r,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},jo(l),e}function Df(e,n,t){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Un,key:r==null?null:""+r,children:e,containerInfo:n,implementation:t}}function sc(e){if(!e)return wn;e=e._reactInternals;e:{if(Fn(e)!==e||e.tag!==1)throw Error(w(170));var n=e;do{switch(n.tag){case 3:n=n.stateNode.context;break e;case 1:if(ve(n.type)){n=n.stateNode.__reactInternalMemoizedMergedChildContext;break e}}n=n.return}while(n!==null);throw Error(w(171))}if(e.tag===1){var t=e.type;if(ve(t))return su(e,t,n)}return n}function ac(e,n,t,r,i,l,o,a,u){return e=Fo(t,r,!0,e,i,l,o,a,u),e.context=sc(null),t=e.current,r=de(),i=vn(t),l=Ge(r,i),l.callback=n??null,gn(t,l,i),e.current.lanes=i,er(e,i,r),xe(e,r),e}function yi(e,n,t,r){var i=n.current,l=de(),o=vn(i);return t=sc(t),n.context===null?n.context=t:n.pendingContext=t,n=Ge(l,o),n.payload={element:e},r=r===void 0?null:r,r!==null&&(n.callback=r),e=gn(i,n,o),e!==null&&(Ae(e,i,o,l),zr(e,i,o)),o}function oi(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Ys(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var t=e.retryLane;e.retryLane=t!==0&&t<n?t:n}}function $o(e,n){Ys(e,n),(e=e.alternate)&&Ys(e,n)}function Of(){return null}var uc=typeof reportError=="function"?reportError:function(e){console.error(e)};function Uo(e){this._internalRoot=e}wi.prototype.render=Uo.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(w(409));yi(e,n,null,null)};wi.prototype.unmount=Uo.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;In(function(){yi(null,e,null,null)}),n[Ye]=null}};function wi(e){this._internalRoot=e}wi.prototype.unstable_scheduleHydration=function(e){if(e){var n=$a();e={blockedOn:null,target:e,priority:n};for(var t=0;t<sn.length&&n!==0&&n<sn[t].priority;t++);sn.splice(t,0,e),t===0&&qa(e)}};function qo(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function ki(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Xs(){}function Af(e,n,t,r,i){if(i){if(typeof r=="function"){var l=r;r=function(){var d=oi(o);l.call(d)}}var o=ac(n,r,e,0,null,!1,!1,"",Xs);return e._reactRootContainer=o,e[Ye]=o.current,Wt(e.nodeType===8?e.parentNode:e),In(),o}for(;i=e.lastChild;)e.removeChild(i);if(typeof r=="function"){var a=r;r=function(){var d=oi(u);a.call(d)}}var u=Fo(e,0,!1,null,null,!1,!1,"",Xs);return e._reactRootContainer=u,e[Ye]=u.current,Wt(e.nodeType===8?e.parentNode:e),In(function(){yi(n,u,t,r)}),u}function ji(e,n,t,r,i){var l=t._reactRootContainer;if(l){var o=l;if(typeof i=="function"){var a=i;i=function(){var u=oi(o);a.call(u)}}yi(n,o,e,i)}else o=Af(t,n,e,i,r);return oi(o)}Ma=function(e){switch(e.tag){case 3:var n=e.stateNode;if(n.current.memoizedState.isDehydrated){var t=_t(n.pendingLanes);t!==0&&(oo(n,t|1),xe(n,G()),!(A&6)&&(dt=G()+500,Nn()))}break;case 13:In(function(){var r=Xe(e,1);if(r!==null){var i=de();Ae(r,e,1,i)}}),$o(e,1)}};so=function(e){if(e.tag===13){var n=Xe(e,134217728);if(n!==null){var t=de();Ae(n,e,134217728,t)}$o(e,134217728)}};Fa=function(e){if(e.tag===13){var n=vn(e),t=Xe(e,n);if(t!==null){var r=de();Ae(t,e,n,r)}$o(e,n)}};$a=function(){return I};Ua=function(e,n){var t=I;try{return I=e,n()}finally{I=t}};ml=function(e,n,t){switch(n){case"input":if(sl(e,t),n=t.name,t.type==="radio"&&n!=null){for(t=e;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+n)+'][type="radio"]'),n=0;n<t.length;n++){var r=t[n];if(r!==e&&r.form===e.form){var i=fi(r);if(!i)throw Error(w(90));xa(r),sl(r,i)}}}break;case"textarea":wa(e,t);break;case"select":n=t.value,n!=null&&Jn(e,!!t.multiple,n,!1)}};Ea=Oo;Ca=In;var If={usingClientEntryPoint:!1,Events:[tr,Hn,fi,_a,ba,Oo]},jt={findFiberByHostInstance:Cn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Mf={bundleType:jt.bundleType,version:jt.version,rendererPackageName:jt.rendererPackageName,rendererConfig:jt.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Je.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Ta(e),e===null?null:e.stateNode},findFiberByHostInstance:jt.findFiberByHostInstance||Of,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Nr=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Nr.isDisabled&&Nr.supportsFiber)try{ai=Nr.inject(Mf),Ue=Nr}catch{}}Ne.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=If;Ne.createPortal=function(e,n){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!qo(n))throw Error(w(200));return Df(e,n,null,t)};Ne.createRoot=function(e,n){if(!qo(e))throw Error(w(299));var t=!1,r="",i=uc;return n!=null&&(n.unstable_strictMode===!0&&(t=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onRecoverableError!==void 0&&(i=n.onRecoverableError)),n=Fo(e,1,!1,null,null,t,!1,r,i),e[Ye]=n.current,Wt(e.nodeType===8?e.parentNode:e),new Uo(n)};Ne.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(w(188)):(e=Object.keys(e).join(","),Error(w(268,e)));return e=Ta(n),e=e===null?null:e.stateNode,e};Ne.flushSync=function(e){return In(e)};Ne.hydrate=function(e,n,t){if(!ki(n))throw Error(w(200));return ji(null,e,n,!0,t)};Ne.hydrateRoot=function(e,n,t){if(!qo(e))throw Error(w(405));var r=t!=null&&t.hydratedSources||null,i=!1,l="",o=uc;if(t!=null&&(t.unstable_strictMode===!0&&(i=!0),t.identifierPrefix!==void 0&&(l=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),n=ac(n,null,e,1,t??null,i,!1,l,o),e[Ye]=n.current,Wt(e),r)for(e=0;e<r.length;e++)t=r[e],i=t._getVersion,i=i(t._source),n.mutableSourceEagerHydrationData==null?n.mutableSourceEagerHydrationData=[t,i]:n.mutableSourceEagerHydrationData.push(t,i);return new wi(n)};Ne.render=function(e,n,t){if(!ki(n))throw Error(w(200));return ji(null,e,n,!1,t)};Ne.unmountComponentAtNode=function(e){if(!ki(e))throw Error(w(40));return e._reactRootContainer?(In(function(){ji(null,null,e,!1,function(){e._reactRootContainer=null,e[Ye]=null})}),!0):!1};Ne.unstable_batchedUpdates=Oo;Ne.unstable_renderSubtreeIntoContainer=function(e,n,t,r){if(!ki(t))throw Error(w(200));if(e==null||e._reactInternals===void 0)throw Error(w(38));return ji(e,n,t,!1,r)};Ne.version="18.3.1-next-f1338f8080-20240426";function cc(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(cc)}catch(e){console.error(e)}}cc(),ca.exports=Ne;var Ff=ca.exports,Zs=Ff;el.createRoot=Zs.createRoot,el.hydrateRoot=Zs.hydrateRoot;function $f({systemStatus:e,activeProvider:n,taskId:t}){const[r,i]=L.useState(!1),l=()=>{t&&navigator.clipboard.writeText(t).then(()=>{i(!0),setTimeout(()=>i(!1),1500)})},o=()=>e==="healthy"?"sdot ok":e==="connecting"?"sdot warn":"sdot err",a=()=>e==="healthy"?"Backend online":e==="connecting"?"Connecting to backend…":"Backend offline";return s.jsxs("header",{className:"topbar",children:[s.jsxs("div",{className:"logo",children:[s.jsx("span",{className:"logo-symbol",children:"⟡"}),"ArcPilot ",s.jsx("span",{className:"logo-sub",children:"/ Orchestrator"}),s.jsx("span",{className:"logo-tag",children:"v2.0 LangGraph"})]}),s.jsx("div",{className:"vdiv"}),s.jsxs("div",{className:"top-status",children:[s.jsx("span",{className:o()}),s.jsx("span",{className:"status-text",children:a()})]}),t&&s.jsxs("div",{className:"tid-bar",children:[s.jsx("span",{className:"tid-label",children:"SESSION"}),s.jsx("span",{className:"tid-val",children:t}),s.jsx("button",{className:"tid-copy-btn",onClick:l,title:"Copy Session ID",children:r?"✓ COPIED":"copy"})]}),s.jsx("style",{children:`
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
      `})]})}const Uf=[{id:"requirements",label:"Requirements",desc:"Decomposition & Spec",type:"input"},{id:"user_stories",label:"User Stories",desc:"Agile Stories & Matrix",type:"automated"},{id:"product_owner_review",label:"Product Owner Review",desc:"Review & Approval Gate",type:"human_review"},{id:"design",label:"Architecture & Design",desc:"Functional & Tech Specs",type:"automated"},{id:"design_review",label:"Design Review",desc:"Architecture Signoff Gate",type:"human_review"},{id:"code_generation",label:"Code Generation",desc:"Multi-File Backend & AST",type:"automated"},{id:"code_review",label:"Code Review",desc:"Quality & AST Review Gate",type:"human_review"},{id:"security_review",label:"Security Review",desc:"SAST & Secret Audit Gate",type:"human_review"},{id:"test_generation",label:"Test Case Generation",desc:"Unit & API Test Suite",type:"automated"},{id:"test_cases_review",label:"Test Cases Review",desc:"Coverage & Test Gate",type:"human_review"},{id:"qa_testing",label:"QA Testing & Repair",desc:"Subprocess Execution & Fix",type:"automated"},{id:"qa_testing_review",label:"QA Testing Review",desc:"Quality Gate Signoff",type:"human_review"},{id:"deployment",label:"Deployment & Packaging",desc:"Docker & ZIP Archive",type:"automated"}],qf={product_owner_review:{title:"Product Owner Review Gate",icon:"👤",stage:"product_owner_review",desc:"Review the generated requirements and agile user stories before architecture design begins.",approveLabel:"Approve & Continue",rejectLabel:"Reject / Request Changes",nextStageLabel:"Architecture & Design",feedbackPlaceholder:"Enter feedback or requested revisions (e.g. The user stories should include acceptance criteria for budget validation and weather-based recommendations)...",primaryTab:"user_stories"},design_review:{title:"Architecture & Design Review Gate",icon:"🏗️",stage:"design_review",desc:"Review the Functional Design (FDD) and Technical Architecture (TDD) before code implementation.",approveLabel:"Approve & Continue",rejectLabel:"Reject / Request Changes",nextStageLabel:"Code Generation",feedbackPlaceholder:"Enter architecture feedback or schema changes required...",primaryTab:"design"},code_review:{title:"Code Review & Quality Gate",icon:"💻",stage:"code_review",desc:"Review the multi-file implementation and automated AST/static syntax analysis report.",approveLabel:"Approve & Continue",rejectLabel:"Reject / Request Changes",nextStageLabel:"Security Review",feedbackPlaceholder:"Enter code quality revision notes or refactoring requests...",primaryTab:"code"},security_review:{title:"Security & Vulnerability Review Gate",icon:"🔒",stage:"security_review",desc:"Review Bandit SAST scan findings, secret audit logs, and security recommendations.",approveLabel:"Approve & Continue",rejectLabel:"Reject / Request Changes",nextStageLabel:"Test Generation",feedbackPlaceholder:"Enter security remediation requirements...",primaryTab:"security"},test_cases_review:{title:"Test Cases Review Gate",icon:"🧪",stage:"test_cases_review",desc:"Review the generated test suite covering functional requirements and integration points.",approveLabel:"Approve & Continue",rejectLabel:"Reject / Request Changes",nextStageLabel:"QA Testing",feedbackPlaceholder:"Enter missing edge cases or additional test scenarios required...",primaryTab:"qa"},qa_testing_review:{title:"QA Testing Review & Signoff",icon:"🚦",stage:"qa_testing_review",desc:"Review test execution outputs, assertion outcomes, and automated repair attempt history.",approveLabel:"Approve & Continue",rejectLabel:"Reject / Request Changes",nextStageLabel:"Deployment & Packaging",feedbackPlaceholder:"Enter QA feedback or unresolved test failures to repair...",primaryTab:"qa"}},Xi={Ollama:["qwen3.5","qwen3.8:27b"],Groq:["qwen/qwen3.8-27b","openai/gpt-oss-120b","llama-3.3-70b-versatile","llama-3.1-70b-versatile","mixtral-8x7b-32768","gemma2-9b-it"],OpenAI:["gpt-4o","gpt-4o-mini","gpt-4-turbo","gpt-3.5-turbo"],Gemini:["gemini-3.8-flash","gemini-1.5-pro","gemini-1.5-flash"]};function Zi(e,n,t="text/plain"){const r=new Blob([e],{type:t}),i=URL.createObjectURL(r),l=document.createElement("a");l.href=i,l.download=n,document.body.appendChild(l),l.click(),document.body.removeChild(l),URL.revokeObjectURL(i)}function Ar(e,n,t,r="task"){if(!t)return;const i=new Date().toISOString().replace(/[:.]/g,"-"),l=`ArcPilot-${e}-${i}`;if(n==="json"){const o=JSON.stringify(t,null,2);Zi(o,`${l}.json`,"application/json")}else if(n==="txt"){const o=typeof t=="string"?t:JSON.stringify(t,null,2);Zi(o,`${l}.txt`,"text/plain")}else if(n==="html"){const o=typeof t=="string"?t:JSON.stringify(t,null,2),a=`<!DOCTYPE html>
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
</html>`;Zi(a,`${l}.html`,"text/html")}}class Ji extends Error{constructor(n,t,r){super(n),this.status=t,this.detail=r,this.name="ApiError"}}async function rn(e,n={}){const t={"Content-Type":"application/json",...n.headers||{}};try{const r=await fetch(e,{...n,headers:t});let i;if((r.headers.get("content-type")||"").includes("application/json")?i=await r.json():i=await r.text(),!r.ok){const o=i&&i.detail||i&&i.message||r.statusText||"API request failed";throw new Ji(o,r.status,i)}return i}catch(r){throw r instanceof Ji?r:new Ji(r.message||"Network connection failed",0,null)}}const We={async checkHealth(e=""){return rn(`${e}/health`)},async getLLMConfig(e=""){return rn(`${e}/config/llm`)},async configureLLM(e="",n){return rn(`${e}/config/llm`,{method:"POST",body:JSON.stringify(n)})},async startWorkflow(e="",n,t={}){return rn(`${e}/workflow/start`,{method:"POST",body:JSON.stringify({project_name:n,initial_context:t})})},async submitRequirements(e="",n,t){return rn(`${e}/workflow/${n}/requirements`,{method:"POST",body:JSON.stringify({task:t})})},async submitReview(e="",n,t){const r={workflow_id:n,stage:t.stage,decision:t.decision,feedback:t.feedback||"",review_status:t.decision==="approve"?"approved":"needs_revision",feedback_reason:t.feedback||""};return rn(`${e}/workflow/${n}/review`,{method:"POST",body:JSON.stringify(r)})},async getState(e="",n){return rn(`${e}/workflow/${n}/state`)},async listArtifacts(e="",n){return rn(`${e}/workflow/${n}/artifacts`)},getDownloadZipUrl(e="",n){return`${e}/workflow/${n}/download`}},Ql=()=>{const e="https://arcpilot-ke68.onrender.com";if(e.trim())return e.trim().replace(/\/+$/,"");if(typeof window<"u"&&window.location){const n=window.location.origin;if(n&&n.includes(":5173"))return"http://localhost:8000";if(n&&n.startsWith("http"))return n}return"https://arcpilot-ke68.onrender.com"};function Vf(e=Ql()){const[n,t]=L.useState(e),[r,i]=L.useState("connecting"),[l,o]=L.useState(""),[a,u]=L.useState({provider:"Groq",model:"llama-3.3-70b-versatile"}),[d,g]=L.useState(!1),[h,p]=L.useState(null),[v,y]=L.useState(null),[j,D]=L.useState(!1),[f,c]=L.useState(!1),[m,x]=L.useState(""),[N,b]=L.useState(""),[E,z]=L.useState("user_stories"),M=L.useRef(null),T=L.useCallback(()=>{M.current&&(clearInterval(M.current),M.current=null)},[]),le=L.useCallback($=>{var O;if(!$)return;const k=$.data||$.state||$,_=$.workflow||$,C={...k,..._,user_stories:k.user_stories||_.user_stories,structured_requirements:k.structured_requirements||_.structured_requirements,traceability_matrix:k.traceability_matrix||_.traceability_matrix,design_documents:k.design_documents||_.design_documents,generated_files:k.generated_files||_.generated_files,security_report:k.security_report||_.security_report,qa_report:k.qa_report||_.qa_report,test_cases:k.test_cases||_.test_cases,deployment_result:k.deployment_result||_.deployment_result};y(C),C.next_required_input==="product_owner_review"&&((O=C.user_stories)!=null&&O.length)&&z(K=>K||"user_stories")},[]),en=L.useCallback($=>{T(),M.current=setInterval(async()=>{var k;try{const _=await We.getState(n,$);le(_);const C=_.status||((k=_.workflow)==null?void 0:k.status);(C==="waiting_for_input"||C==="completed"||C==="error")&&T()}catch{}},2e3)},[n,T,le]),nn=L.useCallback(async()=>{try{const $=await We.checkHealth(n);if($&&($.status==="ok"||$.status==="healthy"))i("healthy"),$.active_provider&&o($.active_provider);else{i("offline");return}try{const k=await We.getLLMConfig(n);k&&k.provider&&(u(k),o(k.provider))}catch(k){console.warn("LLM configuration probe failed:",k)}}catch{i("offline")}},[n]);return L.useEffect(()=>(nn(),()=>T()),[nn,T]),{baseUrl:n,setBaseUrl:t,systemStatus:r,activeProvider:l,llmConfig:a,isApplyingConfig:d,handleApplyConfig:async({provider:$,model:k,apiKey:_,url:C})=>{g(!0),C&&C!==n&&t(C);try{const O=await We.configureLLM(C||n,{provider:$,model:k,api_key:_||null});O.status==="ok"&&(u({provider:O.provider,model:O.model}),o(O.provider),i("healthy"))}catch(O){alert(`LLM Configuration error: ${O.message}`)}finally{g(!1)}},taskId:h,workflowState:v,isWorkflowStarting:j,handleStartWorkflow:async({projectName:$,requirementsText:k})=>{D(!0),x(""),b("");try{const C=(await We.startWorkflow(n,$)).task_id;p(C);const O=await We.submitRequirements(n,C,k);le(O),en(C)}catch(_){x(_.message||"Failed to start workflow")}finally{D(!1)}},handleSubmitReview:async({stage:$,decision:k,feedback:_})=>{if(!(!h||f)){c(!0),x("");try{b(k==="approve"?"✓ Review approved. Resuming LangGraph and advancing stage…":"✓ Review submitted. Regenerating artifacts according to your feedback…");const C=await We.submitReview(n,h,{stage:$,decision:k,feedback:_});le(C),en(h),setTimeout(()=>{b("")},4e3)}catch(C){b(""),x(C.message||"Failed to submit review")}finally{c(!1)}}},isReviewSubmitting:f,reviewError:m,reviewSuccessMessage:N,onClearReviewError:()=>x(""),activeTab:E,setActiveTab:z}}function Wf({baseUrl:e,setBaseUrl:n,llmConfig:t,onApplyConfig:r,isApplyingConfig:i,state:l,taskId:o}){const[a,u]=L.useState(t.provider||"Groq"),[d,g]=L.useState(t.model||"llama-3.3-70b-versatile"),[h,p]=L.useState(""),[v,y]=L.useState(e);L.useEffect(()=>{t.provider&&u(t.provider),t.model&&g(t.model)},[t]),L.useEffect(()=>{e&&y(e)},[e]);const j=c=>{const m=c.target.value;u(m);const x=Xi[m]||[];x.length>0&&g(x[0])},D=()=>{const c=Ql(),m=(v||"").trim().replace(/\/+$/,"")||c;r({provider:a,model:d,apiKey:h.trim()||void 0,url:m})},f=[];return(l!=null&&l.requirements||l!=null&&l.structured_requirements)&&f.push({id:"requirements",name:"Requirements Spec",data:l.structured_requirements||l.requirements}),l!=null&&l.user_stories&&l.user_stories.length>0&&f.push({id:"user_stories",name:"User Stories & Backlog",data:l.user_stories}),l!=null&&l.traceability_matrix&&l.traceability_matrix.length>0&&f.push({id:"traceability",name:"Traceability Matrix",data:l.traceability_matrix}),l!=null&&l.design_documents&&f.push({id:"design",name:"Architecture & Design",data:l.design_documents}),l!=null&&l.generated_files&&Object.keys(l.generated_files).length>0&&f.push({id:"code",name:"Code Files",data:l.generated_files}),(l!=null&&l.security_report||l!=null&&l.security_review_comments)&&f.push({id:"security",name:"Security Audit Report",data:l.security_report||l.security_review_comments}),(l!=null&&l.test_cases||l!=null&&l.qa_report)&&f.push({id:"qa",name:"Test Suite & QA Report",data:{tests:l.test_cases,qa:l.qa_report}}),(l!=null&&l.deployment_result||(l==null?void 0:l.deployment_status)==="success")&&f.push({id:"deployment",name:"Deployment Package",data:l.deployment_result}),s.jsxs("aside",{className:"sb-left",children:[s.jsxs("div",{className:"sb-section",children:[s.jsx("div",{className:"sb-title",children:"LLM Configuration"}),s.jsxs("div",{className:"sb-form",children:[s.jsxs("div",{className:"fld",children:[s.jsx("label",{children:"Provider"}),s.jsx("select",{value:a,onChange:j,children:Object.keys(Xi).map(c=>s.jsx("option",{value:c,children:c},c))})]}),s.jsxs("div",{className:"fld",children:[s.jsx("label",{htmlFor:"input-sidebar-model",children:"Model"}),s.jsx("input",{id:"input-sidebar-model",type:"text",list:"sidebar-model-suggestions",value:d,onChange:c=>g(c.target.value),placeholder:"e.g. gemini-3.8-flash, qwen/qwen3.8-27b",autoComplete:"off"}),s.jsx("datalist",{id:"sidebar-model-suggestions",children:(Xi[a]||[]).map(c=>s.jsx("option",{value:c,children:c},c))})]}),s.jsxs("div",{className:"fld",children:[s.jsxs("label",{children:["API Key ",a==="Ollama"&&s.jsx("span",{style:{opacity:.6,fontSize:"0.85em"},children:"(Not required for local)"})]}),s.jsx("input",{type:"password",value:h,onChange:c=>p(c.target.value),placeholder:a==="Ollama"?"Not required for local Ollama":"Enter API key…",disabled:a==="Ollama"})]}),s.jsxs("div",{className:"fld",children:[s.jsx("label",{children:"Backend URL"}),s.jsx("input",{type:"text",value:v,onChange:c=>y(c.target.value),placeholder:Ql()})]}),s.jsx("button",{className:"btn btn-accent",onClick:D,disabled:i,children:i?s.jsxs(s.Fragment,{children:[s.jsx("span",{className:"spin"})," Applying…"]}):"Apply Configuration"}),s.jsxs("div",{className:`pill ${t.provider?"ok":"warn"}`,children:[s.jsx("span",{className:"dot"}),t.provider?`Connected: ${t.provider} / ${t.model||"active"}`:"Auto-configured via .env"]})]})]}),s.jsxs("div",{className:"sb-section",children:[s.jsx("div",{className:"sb-title",children:"Project Exports & Artifacts"}),s.jsx("div",{className:"dl-list",children:f.length===0?s.jsx("div",{className:"dl-empty",children:"Generated artifacts appear here as stages complete."}):f.map(c=>s.jsxs("div",{className:"dl-item",children:[s.jsx("div",{className:"dl-item-name",children:c.name}),s.jsxs("div",{className:"dl-btns",children:[s.jsx("button",{className:"dl-btn",onClick:()=>Ar(c.id,"txt",c.data,o),title:"Export as TXT",children:"TXT"}),s.jsx("button",{className:"dl-btn",onClick:()=>Ar(c.id,"json",c.data,o),title:"Export as JSON",children:"JSON"}),s.jsx("button",{className:"dl-btn",onClick:()=>Ar(c.id,"html",c.data,o),title:"Export as HTML",children:"HTML"}),c.id==="deployment"&&o&&s.jsx("a",{href:We.getDownloadZipUrl(e,o),className:"dl-btn dl-btn-zip",download:!0,title:"Download Package ZIP",children:"ZIP"})]})]},c.id))})]}),s.jsx("style",{children:`
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
      `})]})}function Bf({progress:e=0,currentNode:n,nextRequiredInput:t,currentStageLabel:r,stages:i=[],workflowStatus:l="idle"}){const o={};Array.isArray(i)&&i.forEach(u=>{o[u.id]=u});const a=Math.min(100,Math.max(0,parseInt(e,10)||0));return s.jsxs("aside",{className:"sb-right",children:[s.jsx("div",{className:"sb-title",children:"Workflow Progress"}),s.jsxs("div",{className:"prog-card",children:[s.jsx("div",{className:"prog-bar",children:s.jsx("div",{className:"prog-fill",style:{width:`${a}%`}})}),s.jsxs("div",{className:"prog-row",children:[s.jsx("span",{className:"prog-label",children:r||"Initialized"}),s.jsxs("span",{className:"prog-pct",children:[a,"%"]})]})]}),s.jsxs("div",{className:"node-status-group",children:[n&&s.jsxs("div",{className:"info-box node-box",children:[s.jsx("div",{className:"info-box-label",children:"CURRENT PROCESSING NODE"}),s.jsx("div",{className:"info-box-val",children:n})]}),t&&t!=="end"&&s.jsxs("div",{className:"info-box next-box",children:[s.jsx("div",{className:"info-box-label",children:"WAITING FOR HUMAN INPUT"}),s.jsx("div",{className:"info-box-val next-val",children:t})]})]}),s.jsx("div",{className:"stages-track",children:Uf.map((u,d)=>{let h=(o[u.id]||{}).status||(d===0?"active":"locked"),p=d+1,v=u.desc;return h==="completed"?(p="✓",v="Completed"):h==="waiting_for_input"?(p="⏳",v="Waiting for decision"):h==="active"&&(p="⟳",v="In Progress…"),s.jsxs("div",{className:`stage-item ${h}`,children:[s.jsx("div",{className:"stage-node",children:p}),s.jsxs("div",{className:"stage-info",children:[s.jsx("div",{className:"stage-name",children:u.label}),s.jsx("div",{className:"stage-desc",children:v})]})]},u.id)})}),s.jsx("style",{children:`
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
      `})]})}function Hf({taskId:e,workflowState:n,isWorkflowStarting:t,onStartWorkflow:r}){const[i,l]=L.useState("AI Trip Planner"),[o,a]=L.useState("Build an intelligent travel planning application where a user provides destination, duration, budget and interests. The system should retrieve relevant weather, currency and travel information and generate a personalized day-by-day itinerary."),[u,d]=L.useState(""),[g,h]=L.useState(!1),p=!!(e&&(n!=null&&n.requirements||n!=null&&n.structured_requirements||n!=null&&n.progress&&n.progress>10)),v=y=>{if(y.preventDefault(),!i.trim()){d("Please enter a project name.");return}if(!o.trim()){d("Please enter your project requirements description.");return}d(""),r({projectName:i.trim(),requirementsText:o.trim()})};return s.jsxs("div",{className:`init-card ${p?"card-completed":"card-active"}`,id:"workflow-stage-card",children:[s.jsxs("div",{className:"card-head",children:[s.jsx("div",{className:`card-badge ${p?"done":"active"}`,children:p?"✓":"01"}),s.jsxs("div",{className:"card-title-group",children:[s.jsx("div",{className:"card-title",children:p?`Project: ${i}`:"Project Requirements Specification"}),s.jsx("div",{className:"card-sub",children:p?"Requirements decomposed & structured with LLM":"Define requirements in natural language to initiate SDLC workflow"})]}),p&&s.jsx("button",{type:"button",className:"btn-toggle-expand",onClick:()=>h(!g),title:"Toggle prompt details",children:g?"Hide Details ▲":"Show Details ▼"})]}),(!p||g)&&s.jsxs("div",{className:"init-body",children:[u&&s.jsxs("div",{className:"init-error-banner",children:[s.jsx("span",{children:"✕"})," ",u]}),s.jsxs("div",{className:"fld",children:[s.jsx("label",{htmlFor:"input-project-name",children:"Project Name"}),s.jsx("input",{id:"input-project-name",type:"text",value:i,onChange:y=>l(y.target.value),disabled:p||t,placeholder:"e.g. AI Trip Planner"})]}),s.jsxs("div",{className:"fld",children:[s.jsx("label",{htmlFor:"input-requirements-text",children:"Natural-Language Requirements"}),s.jsx("textarea",{id:"input-requirements-text",className:"init-ta",value:o,onChange:y=>a(y.target.value),disabled:p||t,rows:3,placeholder:"Describe software requirements..."})]}),s.jsxs("div",{className:"init-actions",children:[!p&&s.jsx("button",{type:"button",className:"btn btn-accent btn-start-workflow",onClick:v,disabled:t,id:"btn-start-sdlc-workflow",children:t?s.jsxs(s.Fragment,{children:[s.jsx("span",{className:"spin"}),s.jsx("span",{children:"Decomposing Requirements…"})]}):s.jsxs(s.Fragment,{children:[s.jsx("span",{children:"Start SDLC Workflow"}),s.jsx("span",{children:"→"})]})}),p&&s.jsxs("div",{className:"status-locked-pill",children:[s.jsx("span",{className:"pill-dot",children:"✓"}),s.jsx("span",{children:"Requirements Active in Workflow"})]})]})]}),s.jsx("style",{children:`
        .init-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          flex-shrink: 0;
          transition: all 0.2s ease;
        }
        .init-card.card-active {
          border-color: rgba(99, 102, 241, 0.4);
        }
        .init-card.card-completed {
          opacity: 0.95;
        }
        .card-head {
          padding: 10px 16px;
          background: var(--bg3);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .card-badge {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--bg4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-family: var(--mono);
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
          font-size: 13px;
          font-weight: 700;
          color: var(--ink);
        }
        .card-sub {
          font-size: 11px;
          color: var(--ink3);
        }
        .btn-toggle-expand {
          background: var(--bg4);
          border: 1px solid var(--border);
          color: var(--ink2);
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          font-size: 11px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .btn-toggle-expand:hover {
          color: var(--ink);
          border-color: var(--accent);
        }
        .init-body {
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-top: 1px solid var(--border);
        }
        .init-error-banner {
          background: var(--red-bg);
          border: 1px solid var(--red-border);
          color: var(--red-light);
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          font-size: 11.5px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .init-ta {
          width: 100%;
          background: var(--bg3);
          border: 1px solid var(--border);
          color: var(--ink);
          border-radius: var(--radius-sm);
          padding: 8px 12px;
          font-family: var(--font);
          font-size: 12px;
          line-height: 1.5;
          resize: vertical;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s;
        }
        .init-ta:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 2px var(--accent-bg);
        }
        .init-ta:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .init-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
        }
        .btn-start-workflow {
          padding: 8px 18px;
          font-size: 12px;
        }
        .status-locked-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          color: var(--green-light);
          background: var(--green-bg);
          border: 1px solid var(--green-border);
          padding: 4px 10px;
          border-radius: 12px;
          font-weight: 500;
        }
        .pill-dot {
          font-weight: bold;
        }
      `})]})}function Qf({stageKey:e,onSubmitReview:n,isSubmitting:t,error:r,successMessage:i,onClearError:l}){const o=qf[e]||{title:"Human Review Gate",icon:"👤",desc:"Review the generated artifacts and provide your approval or revision decision.",approveLabel:"Approve & Continue",rejectLabel:"Reject / Request Changes",nextStageLabel:"Next Stage",feedbackPlaceholder:"Enter feedback or requested revisions..."},[a,u]=L.useState(!1),[d,g]=L.useState(""),[h,p]=L.useState(""),v=L.useRef(t);L.useEffect(()=>{u(!1),g(""),p("")},[e]),L.useEffect(()=>{v.current&&!t&&!r&&(u(!1),g(""),p("")),v.current=t},[t,r]);const y=c=>{c==null||c.preventDefault(),!t&&(p(""),l&&l(),n({stage:e,decision:"approve",feedback:""}))},j=()=>{t||(u(!0),p(""),l&&l())},D=()=>{t||(u(!1),p(""),l&&l())},f=c=>{if(c==null||c.preventDefault(),!t){if(!d.trim()){p("Feedback comments are required when requesting revisions so the AI agent knows what to fix.");return}p(""),n({stage:e,decision:"request_changes",feedback:d.trim()})}};return s.jsxs("div",{className:"review-panel",id:"review-panel",children:[s.jsxs("div",{className:"rp-header",children:[s.jsx("div",{className:"rp-icon",children:o.icon}),s.jsxs("div",{className:"rp-title-wrap",children:[s.jsxs("div",{className:"rp-title",children:[s.jsx("span",{children:o.title}),s.jsx("span",{className:"rp-status-tag",children:"Waiting for Decision"})]}),s.jsx("div",{className:"rp-desc",children:o.desc})]})]}),s.jsxs("div",{className:"rp-body",children:[i&&s.jsxs("div",{className:"review-banner review-banner-success",children:[s.jsx("span",{className:"banner-icon",children:"✓"}),s.jsx("span",{children:i})]}),(r||h)&&s.jsxs("div",{className:"review-banner review-banner-error",children:[s.jsx("span",{className:"banner-icon",children:"✕"}),s.jsx("span",{className:"banner-text",children:h||r}),r&&s.jsx("button",{type:"button",className:"banner-retry-btn",onClick:a?f:y,disabled:t,children:"Retry"})]}),a?s.jsxs("div",{className:"rp-feedback-view",id:"feedback-form-container",children:[s.jsxs("div",{className:"feedback-view-header",children:[s.jsxs("label",{htmlFor:"review-feedback-textarea",className:"feedback-view-title",children:["Review Feedback & Revision Notes ",s.jsx("span",{className:"required-tag",children:"(Required)"})]}),s.jsx("div",{className:"feedback-view-sub",children:"Describe the specific changes or additions needed. The AI agent will revise the current stage artifacts."})]}),s.jsx("textarea",{id:"review-feedback-textarea",className:`feedback-ta ${h&&!d.trim()?"has-error":""}`,value:d,onChange:c=>{g(c.target.value),h&&p("")},placeholder:o.feedbackPlaceholder||"Enter detailed feedback or requested revisions (e.g. 'Add user story for interactive budget calculator')...",disabled:t,rows:4,autoFocus:!0}),s.jsxs("div",{className:"feedback-actions-row",children:[s.jsx("button",{type:"button",className:"btn btn-submit-feedback",onClick:f,disabled:t,id:"btn-submit-review",children:t?s.jsxs(s.Fragment,{children:[s.jsx("span",{className:"spin"}),s.jsx("span",{children:"Submitting feedback & generating revision…"})]}):s.jsx(s.Fragment,{children:s.jsx("span",{children:"✎ Submit Feedback"})})}),s.jsx("button",{type:"button",className:"btn btn-cancel-feedback",onClick:D,disabled:t,children:"Cancel / Back"})]})]}):s.jsxs("div",{className:"rp-initial-actions",children:[s.jsx("button",{type:"button",className:"btn-review-card btn-action-approve",onClick:y,disabled:t,id:"btn-select-approve",children:t?s.jsxs("div",{className:"btn-loading-state",children:[s.jsx("span",{className:"spin"}),s.jsx("span",{className:"btn-main-title",children:"Submitting approval…"})]}):s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"btn-icon-box",children:"✓"}),s.jsxs("div",{className:"btn-text-wrap",children:[s.jsx("div",{className:"btn-main-title",children:o.approveLabel||"Approve & Continue"}),s.jsxs("div",{className:"btn-sub-title",children:["Accept artifacts and advance to ",o.nextStageLabel||"next stage"]})]})]})}),s.jsxs("button",{type:"button",className:"btn-review-card btn-action-reject",onClick:j,disabled:t,id:"btn-select-reject",children:[s.jsx("div",{className:"btn-icon-box",children:"✎"}),s.jsxs("div",{className:"btn-text-wrap",children:[s.jsx("div",{className:"btn-main-title",children:o.rejectLabel||"Reject / Request Changes"}),s.jsx("div",{className:"btn-sub-title",children:"Provide feedback to trigger artifact revision"})]})]})]})]}),s.jsx("style",{children:`
        .review-panel {
          background: var(--bg2);
          border: 2px solid rgba(99, 102, 241, 0.45);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          animation: fadeIn 0.25s ease;
          flex-shrink: 0;
        }
        .rp-header {
          padding: 12px 18px;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.18), rgba(16, 185, 129, 0.08));
          border-bottom: 1px solid var(--border2);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .rp-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(99, 102, 241, 0.25);
          border: 1px solid rgba(129, 140, 248, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }
        .rp-title-wrap {
          flex: 1;
        }
        .rp-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--ink);
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .rp-status-tag {
          font-size: 9.5px;
          font-family: var(--mono);
          padding: 2px 8px;
          border-radius: 10px;
          background: var(--yellow-bg);
          color: var(--yellow);
          border: 1px solid var(--yellow-border);
          text-transform: uppercase;
          font-weight: 600;
        }
        .rp-desc {
          font-size: 11px;
          color: var(--ink2);
          margin-top: 2px;
        }
        .rp-body {
          padding: 14px 18px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .review-banner {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          font-size: 12px;
          line-height: 1.4;
        }
        .review-banner-success {
          background: var(--green-bg);
          border: 1px solid var(--green-border);
          color: var(--green-light);
        }
        .review-banner-error {
          background: var(--red-bg);
          border: 1px solid var(--red-border);
          color: var(--red-light);
        }
        .banner-icon {
          font-weight: bold;
          flex-shrink: 0;
        }
        .banner-text {
          flex: 1;
        }
        .banner-retry-btn {
          background: transparent;
          border: 1px solid currentColor;
          color: inherit;
          padding: 3px 8px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 10.5px;
          font-weight: 600;
        }
        .banner-retry-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .rp-initial-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 640px) {
          .rp-initial-actions {
            grid-template-columns: 1fr;
          }
        }
        .btn-review-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          cursor: pointer;
          text-align: left;
          background: var(--bg3);
          transition: all 0.18s ease;
        }
        .btn-action-approve {
          border-color: rgba(16, 185, 129, 0.4);
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.12), var(--bg3));
        }
        .btn-action-approve:hover:not(:disabled) {
          border-color: var(--green);
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.22), var(--bg3));
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(16, 185, 129, 0.2);
        }
        .btn-action-reject {
          border-color: rgba(244, 63, 94, 0.35);
          background: linear-gradient(135deg, rgba(244, 63, 94, 0.1), var(--bg3));
        }
        .btn-action-reject:hover:not(:disabled) {
          border-color: var(--red);
          background: linear-gradient(135deg, rgba(244, 63, 94, 0.2), var(--bg3));
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(244, 63, 94, 0.2);
        }
        .btn-review-card:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        .btn-icon-box {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          font-weight: 700;
          flex-shrink: 0;
        }
        .btn-action-approve .btn-icon-box {
          background: rgba(16, 185, 129, 0.25);
          color: var(--green-light);
          border: 1px solid var(--green-border);
        }
        .btn-action-reject .btn-icon-box {
          background: rgba(244, 63, 94, 0.2);
          color: var(--red-light);
          border: 1px solid var(--red-border);
        }
        .btn-text-wrap {
          flex: 1;
        }
        .btn-main-title {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--ink);
        }
        .btn-action-approve .btn-main-title {
          color: #a7f3d0;
        }
        .btn-action-reject .btn-main-title {
          color: #fecdd3;
        }
        .btn-sub-title {
          font-size: 11px;
          color: var(--ink3);
          margin-top: 2px;
        }
        .btn-loading-state {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 4px;
        }
        .rp-feedback-view {
          display: flex;
          flex-direction: column;
          gap: 10px;
          animation: fadeIn 0.2s ease;
        }
        .feedback-view-header {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .feedback-view-title {
          font-size: 12.5px;
          font-weight: 700;
          color: var(--ink);
        }
        .required-tag {
          color: var(--red);
          font-size: 11px;
          font-weight: 500;
        }
        .feedback-view-sub {
          font-size: 11px;
          color: var(--ink3);
        }
        .feedback-ta {
          width: 100%;
          min-height: 110px;
          max-height: 220px;
          background: var(--bg3);
          border: 1px solid var(--border2);
          color: var(--ink);
          border-radius: var(--radius-sm);
          padding: 10px 12px;
          font-family: var(--font);
          font-size: 12.5px;
          line-height: 1.5;
          resize: vertical;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s;
        }
        .feedback-ta:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 2px var(--accent-bg);
        }
        .feedback-ta.has-error {
          border-color: var(--red);
          background: rgba(244, 63, 94, 0.05);
        }
        .feedback-ta:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .feedback-actions-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .btn-submit-feedback {
          background: var(--accent);
          color: #fff;
          padding: 9px 18px;
          font-weight: 600;
          font-size: 12.5px;
        }
        .btn-submit-feedback:hover:not(:disabled) {
          box-shadow: 0 4px 14px var(--accent-glow);
        }
        .btn-cancel-feedback {
          background: transparent;
          color: var(--ink3);
          border: 1px solid var(--border);
          padding: 9px 14px;
          font-size: 12px;
        }
        .btn-cancel-feedback:hover:not(:disabled) {
          color: var(--ink);
          border-color: var(--border2);
        }
      `})]})}function Gf({tabs:e=[],activeTab:n,onTabChange:t,onExport:r}){return s.jsxs("div",{className:"inspector-head",id:"artifact-tabs-bar",children:[s.jsx("div",{className:"inspector-tabs",children:e.map(i=>s.jsxs("button",{id:`tab-btn-${i.id}`,className:`insp-tab ${i.id===n?"active":""}`,onClick:()=>t(i.id),children:[s.jsx("span",{children:i.label}),i.count!==void 0&&s.jsx("span",{className:"badge badge-blue",children:i.count})]},i.id))}),s.jsxs("div",{className:"insp-actions",children:[s.jsx("button",{className:"dl-mini-btn",onClick:()=>r("txt"),title:"Export Active Artifact as TXT",id:"btn-export-active-txt",children:"TXT"}),s.jsx("button",{className:"dl-mini-btn",onClick:()=>r("json"),title:"Export Active Artifact as JSON",id:"btn-export-active-json",children:"JSON"}),s.jsx("button",{className:"dl-mini-btn",onClick:()=>r("html"),title:"Export Active Artifact as HTML",id:"btn-export-active-html",children:"HTML"})]}),s.jsx("style",{children:`
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
          gap: 6px;
          overflow-x: auto;
          padding-bottom: 2px;
          max-width: 100%;
        }
        .insp-tab {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid transparent;
          background: transparent;
          color: var(--ink2);
          font-family: var(--font);
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
          gap: 6px;
        }
        .dl-mini-btn {
          padding: 4px 8px;
          background: var(--bg4);
          border: 1px solid var(--border);
          color: var(--ink3);
          font-family: var(--mono);
          font-size: 10.5px;
          font-weight: 600;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .dl-mini-btn:hover {
          color: var(--accent2);
          border-color: var(--accent);
        }
      `})]})}function P(e,n=""){if(e==null)return n;if(typeof e=="string")return e;if(typeof e=="number"||typeof e=="boolean")return String(e);if(Array.isArray(e))return e.map(t=>P(t)).filter(Boolean).join(", ");if(typeof e=="object"){if(typeof e.description=="string")return e.description;if(typeof e.title=="string")return e.title;if(typeof e.name=="string")return e.name;if(typeof e.summary=="string")return e.summary;if(typeof e.text=="string")return e.text;if(typeof e.content=="string")return e.content;if(typeof e.message=="string")return e.message;if(typeof e.value=="string")return e.value;try{return JSON.stringify(e,null,2)}catch{return n}}return String(e)}function Z(e){return e?Array.isArray(e)?e:typeof e=="string"?e.split(`
`).map(n=>n.trim()).filter(Boolean):[e]:[]}function Kf({stories:e=[]}){const n=Z(e);if(n.length===0)return s.jsxs("div",{className:"empty-panel-state",children:[s.jsx("span",{className:"empty-icon",children:"📋"}),s.jsx("div",{children:"User stories are pending generation. Submit requirements to generate stories."})]});const t=r=>{const i=String(r||"HIGH").toUpperCase();return i==="HIGH"||i==="CRITICAL"?"badge badge-red":i==="MEDIUM"?"badge badge-yellow":"badge badge-blue"};return s.jsxs("div",{className:"stories-view-container",id:"user-stories-viewer",children:[s.jsxs("div",{className:"stories-header-meta",children:[s.jsxs("span",{className:"stories-count-label",children:["Agile User Stories (",n.length,")"]}),s.jsx("span",{className:"stories-sub-label",children:"Decomposed from structured functional requirements"})]}),s.jsx("div",{className:"stories-list",children:n.map((r,i)=>{const l=P(r.story_id,`US-${String(i+1).padStart(2,"0")}`),o=P(r.title,`User Story ${i+1}`),a=P(r.priority,"High"),u=P(r.status,"To Do"),d=P(r.description),g=Z(r.acceptance_criteria),h=Z(r.requirement_reference);return s.jsxs("div",{className:"story-card",children:[s.jsxs("div",{className:"story-header",children:[s.jsx("span",{className:"story-id",children:l}),s.jsx("span",{className:"story-title",children:o}),s.jsx("span",{className:t(a),children:a}),s.jsx("span",{className:"badge badge-blue",children:u}),h.map((p,v)=>s.jsx("span",{className:"badge badge-green",children:P(p)},v))]}),d&&s.jsx("div",{className:"story-desc",children:d}),g.length>0&&s.jsxs("div",{className:"criteria-section",children:[s.jsx("div",{className:"criteria-heading",children:"Acceptance Criteria"}),s.jsx("ul",{className:"criteria-list",children:g.map((p,v)=>s.jsxs("li",{className:"criteria-item",children:[s.jsx("span",{className:"criteria-check",children:"✓"}),s.jsx("span",{children:P(p)})]},v))})]})]},l)})}),s.jsx("style",{children:`
        .stories-view-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }
        .stories-header-meta {
          display: flex;
          align-items: baseline;
          gap: 10px;
          padding-bottom: 8px;
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
          border-radius: var(--radius-sm);
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: border-color 0.15s;
        }
        .story-card:hover {
          border-color: var(--border2);
        }
        .story-header {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .story-id {
          font-family: var(--mono);
          font-size: 11.5px;
          font-weight: 700;
          color: var(--accent2);
        }
        .story-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink);
          flex: 1;
        }
        .story-desc {
          font-size: 12.5px;
          color: var(--ink2);
          line-height: 1.5;
        }
        .criteria-section {
          margin-top: 4px;
          padding-top: 8px;
          border-top: 1px solid var(--border);
        }
        .criteria-heading {
          font-size: 10px;
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
          gap: 4px;
        }
        .criteria-item {
          font-size: 12px;
          color: var(--ink2);
          display: flex;
          align-items: baseline;
          gap: 6px;
        }
        .criteria-check {
          color: var(--green);
          font-size: 11px;
          font-weight: bold;
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
      `})]})}function Yf({structured:e,legacyList:n}){if(e&&typeof e=="object"){const r=Z(e.functional_requirements),i=Z(e.non_functional_requirements),l=Z(e.external_integrations),o=Z(e.user_roles),a=P(e.summary);return s.jsxs("div",{className:"reqs-view-container",id:"requirements-viewer",children:[a&&s.jsxs("div",{className:"summary-card",children:[s.jsx("div",{className:"section-label",children:"Executive Summary"}),s.jsx("div",{className:"summary-text",children:a})]}),r.length>0&&s.jsxs("div",{className:"req-group",children:[s.jsxs("div",{className:"section-heading",children:["Functional Requirements (",r.length,")"]}),s.jsx("div",{className:"req-items-list",children:r.map((u,d)=>{const g=P(u.id,`FR-${d+1}`),h=P(u.title,"Functional Requirement"),p=P(u.priority,"High"),v=P(u.description),y=Z(u.acceptance_criteria);return s.jsxs("div",{className:"req-card",children:[s.jsxs("div",{className:"req-header",children:[s.jsx("span",{className:"badge badge-blue",children:g}),s.jsx("span",{className:"req-title",children:h}),s.jsx("span",{className:"badge badge-yellow",children:p})]}),v&&s.jsx("div",{className:"req-desc",children:v}),y.length>0&&s.jsxs("div",{className:"sub-criteria",children:[s.jsx("div",{className:"sub-criteria-heading",children:"Acceptance Criteria:"}),s.jsx("ul",{className:"sub-criteria-list",children:y.map((j,D)=>s.jsxs("li",{className:"sub-criteria-item",children:[s.jsx("span",{className:"sub-criteria-check",children:"✓"}),s.jsx("span",{children:P(j)})]},D))})]})]},g||d)})})]}),i.length>0&&s.jsxs("div",{className:"req-group",children:[s.jsxs("div",{className:"section-heading",children:["Non-Functional Requirements (",i.length,")"]}),s.jsx("div",{className:"req-items-list",children:i.map((u,d)=>{const g=P(u.id,`NFR-${d+1}`),h=P(u.category,"Quality Attribute"),p=P(u.metric_target),v=P(u.description);return s.jsxs("div",{className:"req-card",children:[s.jsxs("div",{className:"req-header",children:[s.jsx("span",{className:"badge badge-yellow",children:g}),s.jsx("span",{className:"req-title",children:h}),p&&s.jsx("span",{className:"badge badge-green",children:p})]}),v&&s.jsx("div",{className:"req-desc",children:v})]},g||d)})})]}),l.length>0&&s.jsxs("div",{className:"req-group",children:[s.jsxs("div",{className:"section-heading",children:["External Integrations (",l.length,")"]}),s.jsx("div",{className:"req-items-list",children:l.map((u,d)=>{const g=P(u.name,`Integration ${d+1}`),h=P(u.api_type,"REST"),p=P(u.purpose),v=Z(u.env_var_keys);return s.jsxs("div",{className:"req-card",children:[s.jsxs("div",{className:"req-header",children:[s.jsx("span",{className:"req-title",style:{fontWeight:700},children:g}),s.jsx("span",{className:"badge badge-blue",children:h})]}),p&&s.jsx("div",{className:"req-desc",children:p}),v.length>0&&s.jsxs("div",{className:"env-keys-box",children:[s.jsx("span",{className:"env-label",children:"Environment Keys:"})," ",v.map((y,j)=>s.jsx("code",{className:"env-key-tag",children:P(y)},j))]})]},g||d)})})]}),o.length>0&&s.jsxs("div",{className:"req-group",children:[s.jsxs("div",{className:"section-heading",children:["User Roles & Permissions (",o.length,")"]}),s.jsx("div",{className:"req-items-list",children:o.map((u,d)=>{const g=P(u.role_name,`Role ${d+1}`),h=P(u.description),p=Z(u.permissions);return s.jsxs("div",{className:"req-card",children:[s.jsx("div",{className:"req-header",children:s.jsx("span",{className:"req-title",style:{fontWeight:700},children:g})}),h&&s.jsx("div",{className:"req-desc",children:h}),p.length>0&&s.jsxs("div",{className:"sub-criteria",children:[s.jsx("div",{className:"sub-criteria-heading",children:"Permissions:"}),s.jsx("div",{className:"perms-flow",children:p.map((v,y)=>s.jsx("span",{className:"badge badge-blue",children:P(v)},y))})]})]},g||d)})})]}),s.jsx("style",{children:`
          .reqs-view-container {
            display: flex;
            flex-direction: column;
            gap: 16px;
            width: 100%;
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
            font-size: 11.5px;
            color: var(--ink2);
            display: flex;
            align-items: baseline;
            gap: 6px;
          }
          .sub-criteria-check {
            color: var(--green);
            font-size: 11px;
            font-weight: bold;
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
          .env-label {
            font-size: 10px;
            color: var(--ink3);
            text-transform: uppercase;
            font-weight: 600;
          }
          .env-key-tag {
            background: var(--bg4);
            padding: 2px 6px;
            border-radius: 4px;
            color: var(--accent-light);
            font-family: var(--mono);
            font-size: 11px;
          }
          .perms-flow {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
          }
        `})]})}const t=Z(n);return t.length>0?s.jsxs("div",{className:"legacy-reqs-list",children:[t.map((r,i)=>s.jsxs("div",{className:"legacy-item",children:["• ",P(r)]},i)),s.jsx("style",{children:`
          .legacy-reqs-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
            background: var(--bg3);
            border: 1px solid var(--border);
            border-radius: var(--radius-sm);
            padding: 14px;
            width: 100%;
          }
          .legacy-item {
            font-size: 12px;
            color: var(--ink2);
            line-height: 1.6;
          }
        `})]}):s.jsx("div",{style:{color:"var(--ink3)",textAlign:"center",padding:"30px"},children:"No requirements specifications recorded yet."})}function Xf({matrix:e=[]}){const n=Z(e);if(n.length===0)return s.jsxs("div",{className:"empty-matrix-state",children:[s.jsx("span",{className:"empty-matrix-icon",children:"🔗"}),s.jsx("div",{children:"Traceability matrix will be generated after requirements and user stories are analyzed."})]});const t=r=>{const i=String(r||"PENDING").toUpperCase();return i==="PASS"||i==="PASSED"?"badge badge-green":i==="FAIL"||i==="FAILED"?"badge badge-red":"badge badge-yellow"};return s.jsxs("div",{className:"traceability-container",id:"traceability-matrix",children:[s.jsxs("div",{className:"traceability-meta",children:[s.jsxs("div",{className:"meta-left",children:[s.jsx("span",{className:"meta-title",children:"Traceability & Verification Matrix"}),s.jsxs("span",{className:"badge badge-blue",children:[n.length," Mapped Links"]})]}),s.jsx("div",{className:"meta-hint",children:"Scroll horizontally for extended columns or vertically to inspect all mapped lifecycle artifacts."})]}),s.jsx("div",{className:"matrix-scroll-wrapper",children:s.jsxs("table",{className:"matrix-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{style:{minWidth:"180px"},children:"Requirement"}),s.jsx("th",{style:{minWidth:"130px"},children:"User Stories"}),s.jsx("th",{style:{minWidth:"160px"},children:"Design Sections"}),s.jsx("th",{style:{minWidth:"180px"},children:"Code Files"}),s.jsx("th",{style:{minWidth:"130px"},children:"Test Cases"}),s.jsx("th",{style:{minWidth:"100px",textAlign:"center"},children:"Status"})]})}),s.jsx("tbody",{children:n.map((r,i)=>{const l=P(r.requirement_id,`REQ-${i+1}`),o=P(r.requirement_title),a=Z(r.user_story_ids),u=Z(r.design_sections),d=Z(r.code_files),g=Z(r.test_case_ids),h=P(r.test_status,"PENDING");return s.jsxs("tr",{children:[s.jsx("td",{children:s.jsxs("div",{className:"req-cell",children:[s.jsx("span",{className:"req-id",children:l}),o&&s.jsx("span",{className:"req-title",children:o})]})}),s.jsx("td",{children:s.jsx("div",{className:"badge-flow",children:a.length>0?a.map((p,v)=>s.jsx("span",{className:"badge badge-blue",children:P(p)},v)):s.jsx("span",{className:"cell-muted",children:"—"})})}),s.jsx("td",{children:s.jsx("div",{className:"badge-flow",children:u.length>0?u.map((p,v)=>s.jsx("span",{className:"badge badge-yellow",title:P(p),children:P(p)},v)):s.jsx("span",{className:"cell-muted",children:"—"})})}),s.jsx("td",{children:s.jsx("div",{className:"badge-flow",children:d.length>0?d.map((p,v)=>s.jsx("span",{className:"badge badge-green",title:P(p),children:P(p)},v)):s.jsx("span",{className:"cell-muted",children:"—"})})}),s.jsx("td",{children:s.jsx("div",{className:"badge-flow",children:g.length>0?g.map((p,v)=>s.jsx("span",{className:"badge badge-blue",children:P(p)},v)):s.jsx("span",{className:"cell-muted",children:"—"})})}),s.jsx("td",{style:{textAlign:"center"},children:s.jsx("span",{className:t(h),children:h})})]},`${l}-${i}`)})})]})}),s.jsx("style",{children:`
        .traceability-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }
        .traceability-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          padding: 2px 0;
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
          overflow-y: visible;
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
        }
        .matrix-table {
          min-width: 900px;
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
      `})]})}function Zf({designDocuments:e,technicalDocuments:n}){if(!e&&!n)return s.jsxs("div",{className:"empty-panel-state",children:[s.jsx("span",{className:"empty-icon",children:"🏗️"}),s.jsx("div",{children:"Architecture and design specifications will appear here once generated."})]});const t=P(e&&(e.functional||e.architecture_overview),"Functional design document pending generation."),r=P(n||e&&e.technical,"Technical design document pending generation."),i=P(e&&e.architecture_overview,"Modular Service-Oriented Architecture with FastAPI"),l=P(e&&e.database_schema,"Relational / SQLite data schema with migration support");return s.jsxs("div",{className:"architecture-view-container",id:"architecture-viewer",children:[s.jsxs("div",{className:"design-grid",children:[s.jsxs("div",{className:"design-card",children:[s.jsx("div",{className:"design-label",children:"Architecture Style"}),s.jsx("div",{className:"design-val",children:i})]}),s.jsxs("div",{className:"design-card",children:[s.jsx("div",{className:"design-label",children:"Database & Data Model"}),s.jsx("div",{className:"design-val",children:l})]})]}),s.jsxs("div",{className:"doc-section",children:[s.jsxs("div",{className:"doc-section-header",children:[s.jsx("div",{className:"doc-section-title",children:"Functional Design Specification (FDD)"}),s.jsx("span",{className:"badge badge-blue",children:"Complete Markdown"})]}),s.jsx("pre",{className:"code-viewer-block",children:t})]}),s.jsxs("div",{className:"doc-section",children:[s.jsxs("div",{className:"doc-section-header",children:[s.jsx("div",{className:"doc-section-title",children:"Technical Design Document (TDD)"}),s.jsx("span",{className:"badge badge-yellow",children:"Technical Architecture"})]}),s.jsx("pre",{className:"code-viewer-block",children:r})]}),s.jsx("style",{children:`
        .architecture-view-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
        }
        .design-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 768px) {
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
          margin-bottom: 4px;
        }
        .design-val {
          font-size: 12.5px;
          color: var(--ink);
          font-weight: 500;
        }
        .doc-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .doc-section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .doc-section-title {
          font-size: 12px;
          font-weight: 700;
          color: var(--ink2);
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }
        .code-viewer-block {
          font-family: var(--mono);
          font-size: 11.5px;
          line-height: 1.65;
          color: var(--ink);
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 16px;
          white-space: pre-wrap;
          word-break: break-word;
          overflow-x: auto;
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
      `})]})}function Jf({generatedFiles:e,staticAnalysis:n,comments:t}){const[r,i]=L.useState(""),l=e||{},o=Object.keys(l);if(L.useEffect(()=>{o.length>0&&(!r||!l[r])&&i(o[0])},[o,r,l]),o.length===0)return s.jsxs("div",{className:"empty-panel-state",children:[s.jsx("span",{className:"empty-icon",children:"💻"}),s.jsx("div",{children:"Code generation in progress or pending."})]});const a=P(t);return s.jsxs("div",{className:"code-view-container",id:"code-viewer",children:[n&&s.jsxs("div",{className:"metrics-row",children:[s.jsxs("div",{className:"metric-box",children:[s.jsx("div",{className:"metric-lbl",children:"Analysis Status"}),s.jsx("div",{className:"metric-num",style:{color:n.passed?"var(--green)":"var(--red)",fontSize:"13px"},children:n.passed?"PASSED ✅":"NEEDS REVISION ⚠️"})]}),s.jsxs("div",{className:"metric-box",children:[s.jsx("div",{className:"metric-lbl",children:"Total Issues"}),s.jsx("div",{className:"metric-num",children:n.total_issues||0})]}),s.jsxs("div",{className:"metric-box",children:[s.jsx("div",{className:"metric-lbl",children:"Errors"}),s.jsx("div",{className:"metric-num",style:{color:"var(--red)"},children:n.errors||0})]}),s.jsxs("div",{className:"metric-box",children:[s.jsx("div",{className:"metric-lbl",children:"Warnings"}),s.jsx("div",{className:"metric-num",style:{color:"var(--yellow)"},children:n.warnings||0})]})]}),s.jsx("div",{className:"file-tabs-strip",children:o.map(u=>s.jsx("button",{className:`file-tab-btn ${u===r?"active":""}`,onClick:()=>i(u),children:u},u))}),s.jsxs("div",{className:"code-file-container",children:[s.jsxs("div",{className:"code-file-header",children:[s.jsx("span",{className:"code-file-name",children:r}),s.jsx("span",{className:"badge badge-blue",children:r?`${P(l[r]).split(`
`).length} lines`:""})]}),s.jsx("pre",{className:"code-viewer-block",children:r?P(l[r]):"Select a file to inspect."})]}),a&&s.jsxs("div",{className:"review-notes-box",children:[s.jsx("div",{className:"notes-heading",children:"Automated Code Review Notes"}),s.jsx("pre",{className:"code-viewer-block",children:a})]}),s.jsx("style",{children:`
        .code-view-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
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
        .metric-lbl {
          font-size: 9.5px;
          color: var(--ink3);
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }
        .metric-num {
          font-family: var(--mono);
          font-size: 16px;
          font-weight: 700;
          margin-top: 2px;
        }
        .file-tabs-strip {
          display: flex;
          gap: 6px;
          overflow-x: auto;
          padding-bottom: 4px;
        }
        .file-tab-btn {
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          background: var(--bg3);
          border: 1px solid var(--border);
          font-family: var(--mono);
          font-size: 11.5px;
          color: var(--ink2);
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.15s;
        }
        .file-tab-btn:hover {
          color: var(--ink);
          border-color: var(--border2);
        }
        .file-tab-btn.active {
          background: var(--bg4);
          border-color: var(--accent);
          color: var(--accent2);
          font-weight: 600;
        }
        .code-file-container {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        .code-file-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 14px;
          background: var(--bg4);
          border-bottom: 1px solid var(--border);
        }
        .code-file-name {
          font-family: var(--mono);
          font-size: 12px;
          color: var(--ink);
          font-weight: 600;
        }
        .code-viewer-block {
          font-family: var(--mono);
          font-size: 12px;
          line-height: 1.65;
          color: var(--ink);
          padding: 16px;
          white-space: pre;
          overflow-x: auto;
          margin: 0;
        }
        .review-notes-box {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 14px;
        }
        .notes-heading {
          font-size: 11px;
          font-weight: 700;
          color: var(--yellow);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 8px;
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
      `})]})}function ep({securityReport:e,reviewComments:n}){if(!e&&!n)return s.jsxs("div",{className:"empty-panel-state",children:[s.jsx("span",{className:"empty-icon",children:"🔒"}),s.jsx("div",{children:"Security audit pending code generation."})]});const t=Z(e==null?void 0:e.findings),r=P(e==null?void 0:e.status,"PASSED"),i=P(n,"Bandit SAST scan and secret audit completed successfully. No critical vulnerabilities identified.");return s.jsxs("div",{className:"security-view-container",id:"security-viewer",children:[e&&s.jsxs("div",{className:"metrics-row",children:[s.jsxs("div",{className:"metric-box",children:[s.jsx("div",{className:"metric-lbl",children:"Security Gate"}),s.jsx("div",{className:"metric-num",style:{color:r==="PASSED"?"var(--green)":"var(--red)",fontSize:"14px"},children:r})]}),s.jsxs("div",{className:"metric-box",children:[s.jsx("div",{className:"metric-lbl",children:"Critical"}),s.jsx("div",{className:"metric-num",style:{color:"var(--red)"},children:e.critical_count||0})]}),s.jsxs("div",{className:"metric-box",children:[s.jsx("div",{className:"metric-lbl",children:"High"}),s.jsx("div",{className:"metric-num",style:{color:"var(--red)"},children:e.high_count||0})]}),s.jsxs("div",{className:"metric-box",children:[s.jsx("div",{className:"metric-lbl",children:"Medium"}),s.jsx("div",{className:"metric-num",style:{color:"var(--yellow)"},children:e.medium_count||0})]}),s.jsxs("div",{className:"metric-box",children:[s.jsx("div",{className:"metric-lbl",children:"Low/Info"}),s.jsx("div",{className:"metric-num",style:{color:"var(--green)"},children:(e.low_count||0)+(e.info_count||0)})]})]}),t.length>0&&s.jsxs("div",{className:"findings-section",children:[s.jsxs("div",{className:"findings-title",children:["Identified Security Findings (",t.length,")"]}),s.jsx("div",{className:"findings-list",children:t.map((l,o)=>s.jsxs("div",{className:"finding-card",children:[s.jsxs("div",{className:"finding-head",children:[s.jsx("span",{className:`badge ${l.severity==="CRITICAL"||l.severity==="HIGH"?"badge-red":"badge-yellow"}`,children:P(l.severity,"MEDIUM")}),s.jsx("span",{className:"finding-title",children:P(l.title,"Security Finding")}),l.file_path&&s.jsxs("span",{className:"finding-file",children:[P(l.file_path),l.line_number?`:${l.line_number}`:""]})]}),s.jsx("div",{className:"finding-desc",children:P(l.description)}),l.mitigation&&s.jsxs("div",{className:"finding-mitigation",children:[s.jsx("strong",{children:"Mitigation:"})," ",P(l.mitigation)]})]},o))})]}),s.jsxs("div",{className:"report-box",children:[s.jsx("div",{className:"report-title",children:"Bandit SAST & Security Audit Report"}),s.jsx("pre",{className:"code-viewer-block",children:i})]}),s.jsx("style",{children:`
        .security-view-container {
          display: flex;
          flex-direction: column;
          gap: 14px;
          width: 100%;
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
        .metric-lbl {
          font-size: 9.5px;
          color: var(--ink3);
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }
        .metric-num {
          font-family: var(--mono);
          font-size: 16px;
          font-weight: 700;
          margin-top: 2px;
        }
        .findings-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .findings-title {
          font-size: 11px;
          font-weight: 700;
          color: var(--ink3);
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }
        .findings-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .finding-card {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .finding-head {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .finding-title {
          font-size: 12.5px;
          font-weight: 600;
          color: var(--ink);
        }
        .finding-file {
          font-family: var(--mono);
          font-size: 11px;
          color: var(--ink3);
        }
        .finding-desc {
          font-size: 12px;
          color: var(--ink2);
        }
        .finding-mitigation {
          font-size: 11.5px;
          color: var(--green-light);
          background: rgba(16, 185, 129, 0.08);
          padding: 6px 10px;
          border-radius: 4px;
        }
        .report-box {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 14px;
        }
        .report-title {
          font-size: 11px;
          font-weight: 700;
          color: var(--ink3);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 8px;
        }
        .code-viewer-block {
          font-family: var(--mono);
          font-size: 11.5px;
          line-height: 1.65;
          color: var(--ink);
          white-space: pre-wrap;
          word-break: break-word;
          overflow-x: auto;
          margin: 0;
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
      `})]})}function np({qaReport:e,testCases:n,repairAttempts:t}){const r=Z(t),i=P(n,"Test cases generation in progress…");return s.jsxs("div",{className:"qa-view-container",id:"qa-viewer",children:[e&&s.jsxs("div",{className:"metrics-row",children:[s.jsxs("div",{className:"metric-box",children:[s.jsx("div",{className:"metric-lbl",children:"Quality Gate"}),s.jsx("div",{className:"metric-num",style:{color:e.quality_gate_passed?"var(--green)":"var(--red)",fontSize:"14px"},children:e.quality_gate_passed?"PASSED ✅":"FAILED ❌"})]}),s.jsxs("div",{className:"metric-box",children:[s.jsx("div",{className:"metric-lbl",children:"Total Tests"}),s.jsx("div",{className:"metric-num",children:e.total_tests||0})]}),s.jsxs("div",{className:"metric-box",children:[s.jsx("div",{className:"metric-lbl",children:"Passed"}),s.jsx("div",{className:"metric-num",style:{color:"var(--green)"},children:e.passed_tests||e.passed||0})]}),s.jsxs("div",{className:"metric-box",children:[s.jsx("div",{className:"metric-lbl",children:"Failed"}),s.jsx("div",{className:"metric-num",style:{color:"var(--red)"},children:e.failed_tests||e.failed||0})]})]}),r.length>0&&s.jsxs("div",{className:"repair-card",children:[s.jsxs("div",{className:"repair-title",children:["Automated Debug & Repair History (",r.length," Attempts)"]}),r.map((l,o)=>{const a=Z(l.patched_files);return s.jsxs("div",{className:"repair-entry",children:["• Attempt #",P(l.attempt_number,o+1),": ",P(l.changes_summary)," ",a.length>0?`(${a.map(u=>P(u)).join(", ")})`:""]},o)})]}),s.jsxs("div",{className:"doc-section",children:[s.jsxs("div",{className:"doc-section-header",children:[s.jsx("div",{className:"doc-section-title",children:"Generated Test Suite Preview"}),s.jsx("span",{className:"badge badge-blue",children:"Pytest Suite"})]}),s.jsx("pre",{className:"code-viewer-block",children:i})]}),s.jsx("style",{children:`
        .qa-view-container {
          display: flex;
          flex-direction: column;
          gap: 14px;
          width: 100%;
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
        .metric-lbl {
          font-size: 9.5px;
          color: var(--ink3);
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }
        .metric-num {
          font-family: var(--mono);
          font-size: 16px;
          font-weight: 700;
          margin-top: 2px;
        }
        .repair-card {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 12px 14px;
        }
        .repair-title {
          font-size: 11px;
          font-weight: 700;
          color: var(--yellow);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 6px;
        }
        .repair-entry {
          font-size: 11.5px;
          color: var(--ink2);
          margin-top: 4px;
        }
        .doc-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .doc-section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .doc-section-title {
          font-size: 12px;
          font-weight: 700;
          color: var(--ink2);
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }
        .code-viewer-block {
          font-family: var(--mono);
          font-size: 11.5px;
          line-height: 1.65;
          color: var(--ink);
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 16px;
          white-space: pre-wrap;
          word-break: break-word;
          overflow-x: auto;
          margin: 0;
        }
      `})]})}function tp({deploymentResult:e,deploymentFeedback:n,taskId:t,baseUrl:r}){const i=e&&(e.status==="success"||e.build_successful),l=P(n||(e==null?void 0:e.message),"Deployment packaging and smoke test verification completed successfully.");return s.jsxs("div",{className:"deployment-view-container",id:"deployment-viewer",children:[s.jsxs("div",{className:"deploy-box",children:[s.jsxs("div",{className:"deploy-info",children:[s.jsx("div",{className:"deploy-title",children:i?"DEPLOYMENT PACKAGE READY ✅":"DEPLOYMENT COMPLETED 🚀"}),s.jsx("div",{className:"deploy-desc",children:"Verified standalone production package with FastAPI, Docker containerization & automated test coverage."})]}),t&&s.jsx("a",{href:We.getDownloadZipUrl(r,t),className:"btn btn-green deploy-download-btn",download:!0,id:"btn-download-deployment-zip",children:s.jsx("span",{children:"↓ Download .ZIP Archive"})})]}),s.jsxs("div",{className:"deployment-report-box",children:[s.jsx("div",{className:"report-title",children:"Deployment Verification & Packaging Log"}),s.jsx("pre",{className:"code-viewer-block",children:l})]}),s.jsx("style",{children:`
        .deployment-view-container {
          display: flex;
          flex-direction: column;
          gap: 14px;
          width: 100%;
        }
        .deploy-box {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 16px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
        }
        .deploy-info {
          flex: 1;
        }
        .deploy-title {
          font-size: 14.5px;
          font-weight: 700;
          color: var(--green);
        }
        .deploy-desc {
          font-size: 12px;
          color: var(--ink2);
          margin-top: 4px;
          line-height: 1.45;
        }
        .deploy-download-btn {
          padding: 10px 20px;
          font-size: 12.5px;
          text-decoration: none;
        }
        .deployment-report-box {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 14px;
        }
        .report-title {
          font-size: 11px;
          font-weight: 700;
          color: var(--ink3);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 8px;
        }
        .code-viewer-block {
          font-family: var(--mono);
          font-size: 11.5px;
          line-height: 1.65;
          color: var(--ink);
          white-space: pre-wrap;
          word-break: break-word;
          overflow-x: auto;
          margin: 0;
        }
      `})]})}function rp({state:e,activeTab:n,onTabChange:t,taskId:r,baseUrl:i}){const l=[];if(e!=null&&e.user_stories&&e.user_stories.length>0&&l.push({id:"user_stories",label:"📋 User Stories",count:e.user_stories.length}),(e!=null&&e.structured_requirements||e!=null&&e.requirements)&&l.push({id:"requirements",label:"📄 Requirements Spec"}),e!=null&&e.traceability_matrix&&e.traceability_matrix.length>0&&l.push({id:"traceability",label:"🔗 Traceability Matrix",count:e.traceability_matrix.length}),e!=null&&e.design_documents&&l.push({id:"design",label:"🏗️ Architecture Design"}),e!=null&&e.generated_files&&Object.keys(e.generated_files).length>0&&l.push({id:"code",label:"💻 Code Implementation",count:Object.keys(e.generated_files).length}),(e!=null&&e.security_report||e!=null&&e.security_review_comments)&&l.push({id:"security",label:"🔒 Security Audit"}),(e!=null&&e.test_cases||e!=null&&e.qa_report||e!=null&&e.test_execution_results)&&l.push({id:"qa",label:"🧪 Tests & QA Report"}),(e!=null&&e.deployment_result||(e==null?void 0:e.deployment_status)==="success")&&l.push({id:"deployment",label:"🚀 Deployment Package"}),L.useEffect(()=>{l.length>0&&!l.some(d=>d.id===n)&&t(l[0].id)},[l,n,t]),l.length===0)return s.jsxs("div",{className:"content-inspector empty-inspector",id:"artifact-inspector-empty",children:[s.jsx("span",{className:"empty-insp-icon",children:"📂"}),s.jsx("div",{className:"empty-insp-title",children:"No Artifacts Generated Yet"}),s.jsx("div",{className:"empty-insp-desc",children:"Artifacts such as requirements, user stories, architecture specs, and code files will appear here automatically as SDLC workflow stages advance."}),s.jsx("style",{children:`
          .content-inspector {
            flex: 1;
            min-height: 0;
            display: flex;
            flex-direction: column;
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
            justify-content: center;
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
            line-height: 1.5;
          }
        `})]});const a=(l.find(d=>d.id===n)||l[0]).id,u=d=>{let g=e;a==="user_stories"?g=e==null?void 0:e.user_stories:a==="requirements"?g=(e==null?void 0:e.structured_requirements)||(e==null?void 0:e.requirements):a==="traceability"?g=e==null?void 0:e.traceability_matrix:a==="design"?g=e==null?void 0:e.design_documents:a==="code"?g=e==null?void 0:e.generated_files:a==="security"?g=(e==null?void 0:e.security_report)||(e==null?void 0:e.security_review_comments):a==="qa"?g={report:e==null?void 0:e.qa_report,tests:e==null?void 0:e.test_cases}:a==="deployment"&&(g=e==null?void 0:e.deployment_result),Ar(a,d,g,r)};return s.jsxs("div",{className:"content-inspector",id:"content-inspector",children:[s.jsx(Gf,{tabs:l,activeTab:a,onTabChange:t,onExport:u}),s.jsxs("div",{className:"inspector-body",id:"inspector-body",children:[a==="user_stories"&&s.jsx(Kf,{stories:e==null?void 0:e.user_stories}),a==="requirements"&&s.jsx(Yf,{structured:e==null?void 0:e.structured_requirements,legacyList:e==null?void 0:e.requirements}),a==="traceability"&&s.jsx(Xf,{matrix:e==null?void 0:e.traceability_matrix}),a==="design"&&s.jsx(Zf,{designDocuments:e==null?void 0:e.design_documents,technicalDocuments:e==null?void 0:e.technical_documents}),a==="code"&&s.jsx(Jf,{generatedFiles:e==null?void 0:e.generated_files,staticAnalysis:e==null?void 0:e.static_analysis,comments:e==null?void 0:e.code_review_comments}),a==="security"&&s.jsx(ep,{securityReport:e==null?void 0:e.security_report,reviewComments:e==null?void 0:e.security_review_comments}),a==="qa"&&s.jsx(np,{qaReport:e==null?void 0:e.qa_report,testCases:e==null?void 0:e.test_cases,repairAttempts:e==null?void 0:e.repair_attempts}),a==="deployment"&&s.jsx(tp,{deploymentResult:e==null?void 0:e.deployment_result,deploymentFeedback:e==null?void 0:e.deployment_feedback,taskId:r,baseUrl:i})]}),s.jsx("style",{children:`
        .content-inspector {
          flex: 1;
          min-height: 0;
          display: flex;
          flex-direction: column;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-md);
        }
        .inspector-body {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 20px;
        }
      `})]})}function ip({message:e="Processing workflow stage…"}){return s.jsxs("div",{className:"loading-state-box",children:[s.jsx("div",{className:"loading-spinner-ring"}),s.jsx("div",{className:"loading-msg",children:e}),s.jsx("style",{children:`
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
      `})]})}function lp({taskId:e,workflowState:n,isWorkflowStarting:t,onStartWorkflow:r,onSubmitReview:i,isReviewSubmitting:l,reviewError:o,reviewSuccessMessage:a,onClearReviewError:u,activeTab:d,onTabChange:g,baseUrl:h}){const p=n==null?void 0:n.next_required_input,v=!!(p&&p!=="requirements"&&p!=="end"&&p!=="completed"&&p!=="none");return s.jsxs("main",{className:"main-workspace",id:"main-content",children:[s.jsx(Hf,{taskId:e,workflowState:n,isWorkflowStarting:t,onStartWorkflow:r}),v&&s.jsx(Qf,{stageKey:p,onSubmitReview:i,isSubmitting:l,error:o,successMessage:a,onClearError:u}),(n==null?void 0:n.status)==="in_progress"&&!v&&!t&&s.jsx(ip,{message:`Executing ${(n==null?void 0:n.current_node)||"stage"}… Analyzing and generating artifacts.`}),s.jsx(rp,{state:n,activeTab:d,onTabChange:g,taskId:e,baseUrl:h}),s.jsx("style",{children:`
        .main-workspace {
          grid-column: 2;
          grid-row: 2;
          min-height: 0;
          height: 100%;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          background: var(--bg);
          overflow: hidden;
        }
        @media (max-height: 680px) {
          .main-workspace {
            overflow-y: auto;
          }
        }
      `})]})}function op(){const{baseUrl:e,setBaseUrl:n,systemStatus:t,activeProvider:r,llmConfig:i,isApplyingConfig:l,handleApplyConfig:o,taskId:a,workflowState:u,isWorkflowStarting:d,handleStartWorkflow:g,handleSubmitReview:h,isReviewSubmitting:p,reviewError:v,reviewSuccessMessage:y,onClearReviewError:j,activeTab:D,setActiveTab:f}=Vf();return s.jsxs("div",{className:"app-container",children:[s.jsx($f,{systemStatus:t,activeProvider:r,taskId:a}),s.jsx(Wf,{baseUrl:e,setBaseUrl:n,llmConfig:i,onApplyConfig:o,isApplyingConfig:l,state:u,taskId:a}),s.jsx(lp,{taskId:a,workflowState:u,isWorkflowStarting:d,onStartWorkflow:g,onSubmitReview:h,isReviewSubmitting:p,reviewError:v,reviewSuccessMessage:y,onClearReviewError:j,activeTab:D,onTabChange:f,baseUrl:e}),s.jsx(Bf,{progress:(u==null?void 0:u.progress)||0,currentNode:u==null?void 0:u.current_node,nextRequiredInput:u==null?void 0:u.next_required_input,currentStageLabel:u==null?void 0:u.current_stage_label,stages:u==null?void 0:u.stages,workflowStatus:u==null?void 0:u.status})]})}el.createRoot(document.getElementById("root")).render(s.jsx(Ec.StrictMode,{children:s.jsx(op,{})}));
