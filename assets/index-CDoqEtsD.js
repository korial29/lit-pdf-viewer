(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=globalThis,t=e.ShadowRoot&&(e.ShadyCSS===void 0||e.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap,i=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,n=this.t;if(t&&e===void 0){let t=n!==void 0&&n.length===1;t&&(e=r.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(n,e))}return e}toString(){return this.cssText}},a=e=>new i(typeof e==`string`?e:e+``,void 0,n),o=(e,...t)=>new i(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,n),s=(n,r)=>{if(t)n.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let t of r){let r=document.createElement(`style`),i=e.litNonce;i!==void 0&&r.setAttribute(`nonce`,i),r.textContent=t.cssText,n.appendChild(r)}},c=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return a(t)})(e):e,{is:l,defineProperty:u,getOwnPropertyDescriptor:d,getOwnPropertyNames:ee,getOwnPropertySymbols:te,getPrototypeOf:ne}=Object,f=globalThis,re=f.trustedTypes,ie=re?re.emptyScript:``,ae=f.reactiveElementPolyfillSupport,p=(e,t)=>e,m={toAttribute(e,t){switch(t){case Boolean:e=e?ie:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},h=(e,t)=>!l(e,t),oe={attribute:!0,type:String,converter:m,reflect:!1,useDefault:!1,hasChanged:h};Symbol.metadata??=Symbol(`metadata`),f.litPropertyMetadata??=new WeakMap;var g=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=oe){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&u(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??oe}static _$Ei(){if(this.hasOwnProperty(p(`elementProperties`)))return;let e=ne(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(p(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(p(`properties`))){let e=this.properties,t=[...ee(e),...te(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(c(e))}else e!==void 0&&t.push(c(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return s(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?m:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?m:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??h)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};g.elementStyles=[],g.shadowRootOptions={mode:`open`},g[p(`elementProperties`)]=new Map,g[p(`finalized`)]=new Map,ae?.({ReactiveElement:g}),(f.reactiveElementVersions??=[]).push(`2.1.2`);var _=globalThis,se=e=>e,v=_.trustedTypes,ce=v?v.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,le=`$lit$`,y=`lit$${Math.random().toFixed(9).slice(2)}$`,ue=`?`+y,de=`<${ue}>`,b=document,x=()=>b.createComment(``),S=e=>e===null||typeof e!=`object`&&typeof e!=`function`,C=Array.isArray,fe=e=>C(e)||typeof e?.[Symbol.iterator]==`function`,w=`[ 	
\f\r]`,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pe=/-->/g,me=/>/g,E=RegExp(`>|${w}(?:([^\\s"'>=/]+)(${w}*=${w}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),he=/'/g,ge=/"/g,_e=/^(?:script|style|textarea|title)$/i,D=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),O=Symbol.for(`lit-noChange`),k=Symbol.for(`lit-nothing`),ve=new WeakMap,A=b.createTreeWalker(b,129);function ye(e,t){if(!C(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return ce===void 0?t:ce.createHTML(t)}var be=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=T;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===T?c[1]===`!--`?o=pe:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=E):(_e.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=E):o=me:o===E?c[0]===`>`?(o=i??T,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?E:c[3]===`"`?ge:he):o===ge||o===he?o=E:o===pe||o===me?o=T:(o=E,i=void 0);let d=o===E&&e[t+1].startsWith(`/>`)?` `:``;a+=o===T?n+de:l>=0?(r.push(s),n.slice(0,l)+le+n.slice(l)+y+d):n+y+(l===-2?t:d)}return[ye(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},j=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=be(t,n);if(this.el=e.createElement(l,r),A.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=A.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(le)){let t=u[o++],n=i.getAttribute(e).split(y),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?Se:r[1]===`?`?Ce:r[1]===`@`?we:P}),i.removeAttribute(e)}else e.startsWith(y)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(_e.test(i.tagName)){let e=i.textContent.split(y),t=e.length-1;if(t>0){i.textContent=v?v.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],x()),A.nextNode(),c.push({type:2,index:++a});i.append(e[t],x())}}}else if(i.nodeType===8)if(i.data===ue)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(y,e+1))!==-1;)c.push({type:7,index:a}),e+=y.length-1}a++}}static createElement(e,t){let n=b.createElement(`template`);return n.innerHTML=e,n}};function M(e,t,n=e,r){if(t===O)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=S(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=M(e,i._$AS(e,t.values),i,r)),t}var xe=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??b).importNode(t,!0);A.currentNode=r;let i=A.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new N(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new Te(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=A.nextNode(),a++)}return A.currentNode=b,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},N=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=k,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=M(this,e,t),S(e)?e===k||e==null||e===``?(this._$AH!==k&&this._$AR(),this._$AH=k):e!==this._$AH&&e!==O&&this._(e):e._$litType$===void 0?e.nodeType===void 0?fe(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==k&&S(this._$AH)?this._$AA.nextSibling.data=e:this.T(b.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=j.createElement(ye(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new xe(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=ve.get(e.strings);return t===void 0&&ve.set(e.strings,t=new j(e)),t}k(t){C(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(x()),this.O(x()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=se(e).nextSibling;se(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},P=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=k,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=k}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=M(this,e,t,0),a=!S(e)||e!==this._$AH&&e!==O,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=M(this,r[n+o],t,o),s===O&&(s=this._$AH[o]),a||=!S(s)||s!==this._$AH[o],s===k?e=k:e!==k&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===k?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},Se=class extends P{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===k?void 0:e}},Ce=class extends P{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==k)}},we=class extends P{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=M(this,e,t,0)??k)===O)return;let n=this._$AH,r=e===k&&n!==k||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==k&&(n===k||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Te=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){M(this,e)}},Ee=_.litHtmlPolyfillSupport;Ee?.(j,N),(_.litHtmlVersions??=[]).push(`3.3.3`);var De=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new N(t.insertBefore(x(),e),e,void 0,n??{})}return i._$AI(e),i},F=globalThis,I=class extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=De(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return O}};I._$litElement$=!0,I.finalized=!0,F.litElementHydrateSupport?.({LitElement:I});var Oe=F.litElementPolyfillSupport;Oe?.({LitElement:I}),(F.litElementVersions??=[]).push(`4.2.2`);var L=e=>(t,n)=>{n===void 0?customElements.define(e,t):n.addInitializer(()=>{customElements.define(e,t)})},ke={attribute:!0,type:String,converter:m,reflect:!1,hasChanged:h},Ae=(e=ke,t,n)=>{let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function R(e){return(t,n)=>typeof n==`object`?Ae(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function z(e){return R({...e,state:!0,attribute:!1})}var je=(e,t,n)=>(n.configurable=!0,n.enumerable=!0,Reflect.decorate&&typeof t!=`object`&&Object.defineProperty(e,t,n),n);function B(e,t){return(n,r,i)=>{let a=t=>t.renderRoot?.querySelector(e)??null;if(t){let{get:e,set:t}=typeof r==`object`?n:i??(()=>{let e=Symbol();return{get(){return this[e]},set(t){this[e]=t}}})();return je(n,r,{get(){let n=e.call(this);return n===void 0&&(n=a(this),(n!==null||this.hasUpdated)&&t.call(this,n)),n}})}return je(n,r,{get(){return a(this)}})}}var Me={a:`á|à|ã|â|À|Á|Ã|Â`,e:`é|è|ê|É|È|Ê`,i:`í|ì|î|Í|Ì|Î`,o:`ó|ò|ô|õ|Ó|Ò|Ô|Õ`,u:`ú|ù|û|ü|Ú|Ù|Û|Ü`,c:`ç|Ç`,n:`ñ|Ñ`},Ne=e=>Object.keys(Me).reduce((e,t)=>e.replace(new RegExp(Me[t],`g`),t),e),Pe=`modulepreload`,Fe=function(e){return`/lit-pdf-viewer/`+e},Ie={},Le=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,new URL(`../../../src/node/plugins/importAnalysisBuild.ts`,import.meta.url)).href}r=o(t.map(t=>{if(t=Fe(t,n),t=s(t),t in Ie)return;Ie[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:Pe,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Re=null,ze=null;function Be(){return Re||=Le(()=>import(`./pdf-dRUDNWJV.js`).then(e=>(e.GlobalWorkerOptions.workerSrc=`pdfjs-dist/build/pdf.worker.min.mjs`,e)),[]),Re}function Ve(){return ze||=Be().then(()=>Le(()=>import(`./pdf_viewer-CtJviFgR.js`),[])),ze}var He=o`:host {
  --icon-size: 16px;
  --icon-display: block;
  --icon-weight: normal;
  height: var(--icon-size);
  display: var(--icon-display);
  font-family: "lit-icon";
  font-variant-ligatures: discretionary-ligatures;
  font-feature-settings: "dlig";
  white-space: nowrap;
  font-size: var(--icon-size);
  font-weight: var(--icon-weight);
}
:host .icon {
  color: inherit;
}

:host(.small) {
  --icon-size: 14px;
}`;function V(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var H=class extends I{constructor(...e){super(...e),this.icon=``,this.alt=``}static get styles(){return[He]}render(){return this.alt?D`<span class="icon" role="img" aria-label=${this.alt}>${this.icon}</span>`:D`<span class="icon" aria-hidden="true">${this.icon}</span>`}};V([R({type:String})],H.prototype,`icon`,void 0),V([R({type:String})],H.prototype,`alt`,void 0),H=V([L(`lit-icon`)],H);var Ue=o`:host {
  position: relative;
  display: inline-flex;
}

.anchor {
  display: inline-flex;
}

.content {
  position: absolute;
  top: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: none;
  padding: 4px 8px;
  white-space: nowrap;
  font-size: 0.75rem;
  color: var(--litpdf-tooltip-color, #fff);
  background-color: var(--litpdf-tooltip-background, #222222);
  border-radius: 4px;
  pointer-events: none;
}

.content[data-visible] {
  display: block;
}`,We=0,U=class extends I{constructor(...e){super(...e),this.text=``,this._visible=!1,this._id=`lit-tooltip-${We++}`,this._show=()=>{this._visible=!0},this._hide=()=>{this._visible=!1},this._handleKeydown=e=>{e.key===`Escape`&&(this._visible=!1)}}static get styles(){return[Ue]}render(){return D`
      <div
        class="anchor"
        @mouseenter=${this._show}
        @mouseleave=${this._hide}
        @focusin=${this._show}
        @focusout=${this._hide}
        @click=${this._hide}
        @keydown=${this._handleKeydown}
      >
        <slot></slot>
      </div>
      <div
        class="content"
        role="tooltip"
        id=${this._id}
        aria-label=${this.text}
        ?data-visible=${this._visible}
      >
        ${this.text}
      </div>
    `}firstUpdated(){(this._slot?.assignedElements()[0])?.setAttribute(`aria-describedby`,this._id)}};V([R({type:String})],U.prototype,`text`,void 0),V([z()],U.prototype,`_visible`,void 0),V([B(`slot`)],U.prototype,`_slot`,void 0),U=V([L(`lit-tooltip`)],U);var Ge=o`:host {
  position: relative;
  display: inline-flex;
}

.anchor {
  display: inline-flex;
}

.content {
  position: absolute;
  top: calc(100% + 4px);
  z-index: 10;
  display: none;
  flex-direction: column;
  padding: 4px;
  background-color: var(--litpdf-surface-background, #fff);
  border-radius: 4px;
  box-shadow: var(--litpdf-surface-shadow, 0 2px 8px rgba(0, 0, 0, 0.15));
}

.content[data-align=left] {
  left: 0;
}

.content[data-align=right] {
  right: 0;
}

.content[data-open] {
  display: flex;
}`,W=class extends I{constructor(...e){super(...e),this.align=`left`,this.open=!1,this._handleOutsideClick=e=>{this.open&&!e.composedPath().includes(this)&&(this.open=!1,this._syncAnchorExpanded())},this._handleKeydown=e=>{this.open&&e.key===`Escape`&&(this.open=!1,this._syncAnchorExpanded(),this._focusAnchor())}}static get styles(){return[Ge]}connectedCallback(){super.connectedCallback(),window.addEventListener(`click`,this._handleOutsideClick,!0),window.addEventListener(`keydown`,this._handleKeydown,!0)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(`click`,this._handleOutsideClick,!0),window.removeEventListener(`keydown`,this._handleKeydown,!0)}render(){return D`
      <div class="anchor" @click=${this._toggle}>
        <slot name="anchor"></slot>
      </div>
      <div class="content" role="menu" data-align=${this.align} ?data-open=${this.open}>
        <slot></slot>
      </div>
    `}close(){this.open=!1,this._syncAnchorExpanded()}firstUpdated(){this._syncAnchorExpanded()}_toggle(){this.open=!this.open,this._syncAnchorExpanded(),this.open&&this.updateComplete.then(()=>this._focusFirstItem())}_syncAnchorExpanded(){(this._anchorSlot?.assignedElements()[0])?.setAttribute(`aria-expanded`,String(this.open))}_focusFirstItem(){let[e]=this.querySelectorAll(`:scope > :not([slot])`);e?.focus()}_focusAnchor(){(this._anchorSlot?.assignedElements()[0])?.focus()}};V([R({type:String})],W.prototype,`align`,void 0),V([R({type:Boolean,reflect:!0})],W.prototype,`open`,void 0),V([B(`slot[name="anchor"]`)],W.prototype,`_anchorSlot`,void 0),W=V([L(`lit-popover`)],W);var G={en:{toolbar:{toolbarLabel:`PDF toolbar`,sidebarControls:`Sidebar controls`,toggleSidebar:`Toggle page thumbnails`,zoomControls:`Zoom controls`,zoomOut:`Zoom Out`,zoomIn:`Zoom In`,documentActions:`Document actions`,rotateCounterClockwise:`Rotate counter clockwise`,rotateClockwise:`Rotate clockwise`,print:`Print`,download:`Download`,search:`Search in document`,fullscreen:`Enter fullscreen`,exitFullscreen:`Exit fullscreen`,zoomPercent:`Zoom percentage`,more:`More`},pagination:{paginationLabel:`Page navigation`,previousPage:`Previous Page`,nextPage:`Next Page`,pageNumber:`Page number`},thumbnails:{thumbnailsLabel:`Page thumbnails`,pageLabel:`Page {number}`},search:{searchLabel:`Search in document`,inputLabel:`Search in document`,placeholder:`Search...`,noResults:`No results`,previous:`Previous`,next:`Next`,close:`Close`},error:{moreInfo:`more info`,lessInfo:`less info`,closeError:`close error`,invalidPdf:`Invalid or corrupted PDF file.`,missingPdf:`Missing PDF file.`,unexpectedResponse:`Unexpected server response.`,genericError:`An error occurred while loading the PDF.`,messageLabel:`Message`,stackLabel:`Stack`,fileLabel:`File`,lineLabel:`Line`},viewer:{loading:`Loading: {percent}%`}},fr:{toolbar:{toolbarLabel:`Barre d'outils PDF`,sidebarControls:`Contrôles du panneau latéral`,toggleSidebar:`Afficher/masquer les miniatures des pages`,zoomControls:`Contrôles de zoom`,zoomOut:`Zoom arrière`,zoomIn:`Zoom avant`,documentActions:`Actions du document`,rotateCounterClockwise:`Rotation antihoraire`,rotateClockwise:`Rotation horaire`,print:`Imprimer`,download:`Télécharger`,search:`Rechercher dans le document`,fullscreen:`Passer en plein écran`,exitFullscreen:`Quitter le plein écran`,zoomPercent:`Pourcentage de zoom`,more:`Plus`},pagination:{paginationLabel:`Navigation des pages`,previousPage:`Page précédente`,nextPage:`Page suivante`,pageNumber:`Numéro de page`},thumbnails:{thumbnailsLabel:`Miniatures des pages`,pageLabel:`Page {number}`},search:{searchLabel:`Recherche dans le document`,inputLabel:`Rechercher dans le document`,placeholder:`Rechercher...`,noResults:`Aucun résultat`,previous:`Précédent`,next:`Suivant`,close:`Fermer`},error:{moreInfo:`plus d'informations`,lessInfo:`moins d'informations`,closeError:`fermer l'erreur`,invalidPdf:`Fichier PDF invalide ou corrompu.`,missingPdf:`Fichier PDF manquant.`,unexpectedResponse:`Réponse du serveur inattendue.`,genericError:`Une erreur est survenue lors du chargement du PDF.`,messageLabel:`Message`,stackLabel:`Pile`,fileLabel:`Fichier`,lineLabel:`Ligne`},viewer:{loading:`Chargement : {percent}%`}},es:{toolbar:{toolbarLabel:`Barra de herramientas PDF`,sidebarControls:`Controles del panel lateral`,toggleSidebar:`Mostrar/ocultar miniaturas de páginas`,zoomControls:`Controles de zoom`,zoomOut:`Alejar`,zoomIn:`Acercar`,documentActions:`Acciones del documento`,rotateCounterClockwise:`Girar en sentido antihorario`,rotateClockwise:`Girar en sentido horario`,print:`Imprimir`,download:`Descargar`,search:`Buscar en el documento`,fullscreen:`Pantalla completa`,exitFullscreen:`Salir de pantalla completa`,zoomPercent:`Porcentaje de zoom`,more:`Más`},pagination:{paginationLabel:`Navegación de páginas`,previousPage:`Página anterior`,nextPage:`Página siguiente`,pageNumber:`Número de página`},thumbnails:{thumbnailsLabel:`Miniaturas de páginas`,pageLabel:`Página {number}`},search:{searchLabel:`Buscar en el documento`,inputLabel:`Buscar en el documento`,placeholder:`Buscar...`,noResults:`Sin resultados`,previous:`Anterior`,next:`Siguiente`,close:`Cerrar`},error:{moreInfo:`más información`,lessInfo:`menos información`,closeError:`cerrar error`,invalidPdf:`Archivo PDF inválido o dañado.`,missingPdf:`Archivo PDF no encontrado.`,unexpectedResponse:`Respuesta inesperada del servidor.`,genericError:`Se produjo un error al cargar el PDF.`,messageLabel:`Mensaje`,stackLabel:`Pila`,fileLabel:`Archivo`,lineLabel:`Línea`},viewer:{loading:`Cargando: {percent}%`}},de:{toolbar:{toolbarLabel:`PDF-Werkzeugleiste`,sidebarControls:`Seitenleisten-Steuerung`,toggleSidebar:`Seitenminiaturen ein-/ausblenden`,zoomControls:`Zoomsteuerung`,zoomOut:`Verkleinern`,zoomIn:`Vergrößern`,documentActions:`Dokumentaktionen`,rotateCounterClockwise:`Gegen den Uhrzeigersinn drehen`,rotateClockwise:`Im Uhrzeigersinn drehen`,print:`Drucken`,download:`Herunterladen`,search:`Im Dokument suchen`,fullscreen:`Vollbild`,exitFullscreen:`Vollbild beenden`,zoomPercent:`Zoomprozentsatz`,more:`Mehr`},pagination:{paginationLabel:`Seitennavigation`,previousPage:`Vorherige Seite`,nextPage:`Nächste Seite`,pageNumber:`Seitenzahl`},thumbnails:{thumbnailsLabel:`Seitenminiaturen`,pageLabel:`Seite {number}`},search:{searchLabel:`Im Dokument suchen`,inputLabel:`Im Dokument suchen`,placeholder:`Suchen...`,noResults:`Keine Ergebnisse`,previous:`Zurück`,next:`Weiter`,close:`Schließen`},error:{moreInfo:`mehr Info`,lessInfo:`weniger Info`,closeError:`Fehler schließen`,invalidPdf:`Ungültige oder beschädigte PDF-Datei.`,missingPdf:`PDF-Datei fehlt.`,unexpectedResponse:`Unerwartete Serverantwort.`,genericError:`Beim Laden der PDF ist ein Fehler aufgetreten.`,messageLabel:`Nachricht`,stackLabel:`Stapel`,fileLabel:`Datei`,lineLabel:`Zeile`},viewer:{loading:`Lädt: {percent}%`}}};function Ke(){let e=(typeof navigator<`u`?navigator.language:void 0)?.split(`-`)[0].toLowerCase();return e&&G[e]?e:`en`}function K(e,t){let n=G[e&&G[e]?e:Ke()];if(!t)return n;let r={};return Object.keys(n).forEach(e=>{r[e]={...n[e],...t[e]}}),r}var qe=o`:host {
  --button-width: 28px;
  --button-height: 28px;
  --button-radius: var(--litpdf-button-radius, 4px);
  --button-color: var(--litpdf-button-background, transparent);
  --button-color-hover: var(--litpdf-icon-color-hover, #737373);
  --button-border-hover: var(--litpdf-button-border-hover, #5f49d1);
  --button-background-hover: var(
    --litpdf-button-background-hover,
    color-mix(in srgb, #5f49d1 12%, transparent)
  );
  --button-focus-ring: var(--litpdf-focus-ring-color, #5f49d1);
  --input-border: var(--litpdf-border-color, #cccccc);
  --input-border-hover: var(--litpdf-border-color-hover, #737373);
  --separator-height: 21px;
  --toolbar-color: var(--litpdf-toolbar-background, #fff);
  --toolbar-shadow: var(--litpdf-toolbar-shadow, 0 1px 3px rgba(30, 16, 106, 0.15));
  color: var(--litpdf-icon-color, #222222);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  height: 42px;
  background-color: var(--toolbar-color);
  box-shadow: var(--toolbar-shadow);
  position: relative;
  z-index: 1;
  box-sizing: border-box;
}
:host .container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
:host .moreWrapper {
  display: none;
}
:host .moreIcon {
  font-size: 20px;
  line-height: 1;
  letter-spacing: 1px;
}
:host .sidebarIcon,
:host .searchIcon,
:host .fullscreenIcon {
  width: 16px;
  height: 16px;
}
:host .zoomPercent {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 12px;
  color: inherit;
}
:host .zoomPercentInput {
  width: 36px;
  padding: 2px 4px;
  border: 1px solid var(--input-border);
  border-radius: var(--button-radius);
  background-color: var(--litpdf-surface-background, #fff);
  color: inherit;
  font: inherit;
  font-size: 12px;
  text-align: right;
  box-sizing: border-box;
  transition: border-color 120ms, box-shadow 120ms;
  -moz-appearance: textfield;
}
:host .zoomPercentInput::-webkit-outer-spin-button, :host .zoomPercentInput::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
:host .zoomPercentInput:hover {
  border-color: var(--input-border-hover);
}
:host .zoomPercentInput:focus-visible {
  outline: 0;
  border-color: var(--button-focus-ring);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--button-focus-ring) 30%, transparent);
}
:host .separator {
  align-self: center;
  height: var(--separator-height);
  width: 1px;
  background-color: var(--litpdf-border-color, #cccccc);
}
:host .toolbarButton {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--button-width);
  height: var(--button-height);
  border: 1px solid transparent;
  outline: 0;
  border-radius: var(--button-radius);
  background-color: var(--button-color);
  color: inherit;
  box-sizing: border-box;
  cursor: pointer;
}
:host .toolbarButton:disabled {
  opacity: 0.5;
  pointer-events: none;
}
:host .toolbarButton:hover {
  border-color: var(--button-border-hover);
  background-color: var(--button-background-hover);
}
:host .toolbarButton:hover lit-icon,
:host .toolbarButton:hover .sidebarIcon {
  color: var(--button-color-hover);
}
:host .toolbarButton:focus-visible {
  box-shadow: 0 0 0 2px var(--button-focus-ring);
}
:host .toolbarButton[aria-expanded=true], :host .toolbarButton[aria-pressed=true] {
  border-color: var(--button-border-hover);
  background-color: var(--button-background-hover);
}
@media (max-width: 600px) {
  :host {
    --button-width: 44px;
    --button-height: 44px;
    gap: 4px;
    height: 48px;
    --separator-height: 24px;
  }
  :host .container {
    gap: 4px;
  }
  :host .inlineOnly {
    display: none;
  }
  :host .moreWrapper {
    display: inline-flex;
  }
  :host .zoomPercentInput {
    width: 32px;
    font-size: 14px;
  }
  :host .zoomPercent span {
    display: none;
  }
}
@media (max-width: 359px) {
  :host {
    --button-width: 40px;
    --button-height: 40px;
    height: 44px;
    --separator-height: 22px;
  }
  :host .zoomPercentInput {
    width: 30px;
  }
}`,q=class extends I{constructor(...e){super(...e),this.zoomPercent=100,this.translations={}}static get styles(){return[qe]}get _t(){return K(this.locale,{toolbar:this.translations}).toolbar}connectedCallback(){super.connectedCallback(),this.setAttribute(`role`,`toolbar`),this.setAttribute(`aria-label`,this._t.toolbarLabel)}render(){let e=this._t;return D`
      <section class="container" role="group" aria-label=${e.sidebarControls}>
        <lit-tooltip text=${e.toggleSidebar}>
          <button
            class="toolbarButton sidebarToggle"
            aria-label=${e.toggleSidebar}
            aria-expanded=${this.isSidebarOpen?`true`:`false`}
            @click=${this._handleToggleSidebar}
          >
            <svg
              class="sidebarIcon"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2"></rect>
              <path d="M9 3v18"></path>
            </svg>
          </button>
        </lit-tooltip>
      </section>

      <span class="separator" role="separator" aria-orientation="vertical"></span>

      <section class="container" role="group" aria-label=${e.zoomControls}>
        <div class="zoomPercent">
          <input
            type="number"
            class="zoomPercentInput"
            aria-label=${e.zoomPercent}
            min="25"
            max="1000"
            step="1"
            .value=${String(this.zoomPercent)}
            @change=${this._handleZoomPercentChange}
            @keydown=${this._handleZoomPercentKeydown}
          />
          <span aria-hidden="true">%</span>
        </div>
        <lit-tooltip text=${e.zoomOut}>
          <button
            class="toolbarButton zoomOut"
            aria-label=${e.zoomOut}
            id="zoomOut"
            @click=${this._handleZoomOut}
          >
            <lit-icon icon="minus"></lit-icon>
          </button>
        </lit-tooltip>
        <lit-tooltip text=${e.zoomIn}>
          <button
            class="toolbarButton zoomIn"
            aria-label=${e.zoomIn}
            id="zoomIn"
            @click=${this._handleZoomIn}
          >
            <lit-icon icon="plus"></lit-icon>
          </button>
        </lit-tooltip>
      </section>

      <span class="separator" role="separator" aria-orientation="vertical"></span>

      <section class="container actions" role="group" aria-label=${e.documentActions}>
        <!-- Secondary actions: inline on desktop, hidden on small screens where
             they move into the "..." overflow menu below. -->
        <lit-tooltip class="inlineOnly" text=${e.rotateCounterClockwise}>
          <button
            class="toolbarButton rotateCcw"
            aria-label=${e.rotateCounterClockwise}
            @click=${this._handleRotateCcw}
          >
            <lit-icon icon="rotate-ccw"></lit-icon>
          </button>
        </lit-tooltip>
        <lit-tooltip class="inlineOnly" text=${e.rotateClockwise}>
          <button
            class="toolbarButton rotateCw"
            aria-label=${e.rotateClockwise}
            @click=${this._handleRotateCw}
          >
            <lit-icon icon="rotate-cw"></lit-icon>
          </button>
        </lit-tooltip>

        <span class="separator inlineOnly" role="separator" aria-orientation="vertical"></span>

        <lit-tooltip text=${e.print}>
          <button
            class="toolbarButton print"
            aria-label=${e.print}
            @click=${!this.isPrintDisabled&&this._handlePrint}
            ?disabled=${this.isPrintDisabled}
          >
            <lit-icon icon="print"></lit-icon>
          </button>
        </lit-tooltip>

        <lit-tooltip text=${e.download}>
          <button
            class="toolbarButton download"
            aria-label=${e.download}
            @click=${!this.isDownloadDisabled&&this._handleDownload}
            ?disabled=${this.isDownloadDisabled}
          >
            <lit-icon icon="download"></lit-icon>
          </button>
        </lit-tooltip>

        <lit-tooltip text=${e.search}>
          <button
            class="toolbarButton search"
            aria-label=${e.search}
            @click=${this._handleToggleSearch}
          >
            <svg
              class="searchIcon"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </lit-tooltip>

        <lit-tooltip class="inlineOnly" text=${this.isFullscreen?e.exitFullscreen:e.fullscreen}>
          <button
            class="toolbarButton fullscreen"
            aria-label=${this.isFullscreen?e.exitFullscreen:e.fullscreen}
            aria-pressed=${this.isFullscreen?`true`:`false`}
            @click=${this._handleToggleFullscreen}
          >
            ${this._renderFullscreenIcon()}
          </button>
        </lit-tooltip>

        <!-- On small screens the rotate and fullscreen buttons collapse into
             this "..." overflow menu, pinned to the far right. It is hidden
             on desktop. -->
        <lit-tooltip class="moreWrapper" text=${e.more}>
          <lit-popover class="morePopover" align="right">
            <button
              slot="anchor"
              class="toolbarButton more"
              aria-label=${e.more}
              aria-haspopup="menu"
            >
              <span class="moreIcon" aria-hidden="true">⋯</span>
            </button>

            <button
              class="toolbarButton rotateCcw"
              title=${e.rotateCounterClockwise}
              aria-label=${e.rotateCounterClockwise}
              role="menuitem"
              @click=${this._handleRotateCcw}
            >
              <lit-icon icon="rotate-ccw"></lit-icon>
            </button>
            <button
              class="toolbarButton rotateCw"
              title=${e.rotateClockwise}
              aria-label=${e.rotateClockwise}
              role="menuitem"
              @click=${this._handleRotateCw}
            >
              <lit-icon icon="rotate-cw"></lit-icon>
            </button>
            <button
              class="toolbarButton fullscreen"
              title=${this.isFullscreen?e.exitFullscreen:e.fullscreen}
              aria-label=${this.isFullscreen?e.exitFullscreen:e.fullscreen}
              role="menuitem"
              @click=${this._handleToggleFullscreen}
            >
              ${this._renderFullscreenIcon()}
            </button>
          </lit-popover>
        </lit-tooltip>
      </section>
    `}_renderFullscreenIcon(){return this.isFullscreen?D`
          <svg
            class="fullscreenIcon"
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M8 3v3a2 2 0 0 1-2 2H3"></path>
            <path d="M21 8h-3a2 2 0 0 1-2-2V3"></path>
            <path d="M3 16h3a2 2 0 0 1 2 2v3"></path>
            <path d="M16 21v-3a2 2 0 0 1 2-2h3"></path>
          </svg>
        `:D`
          <svg
            class="fullscreenIcon"
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M8 3H5a2 2 0 0 0-2 2v3"></path>
            <path d="M21 8V5a2 2 0 0 0-2-2h-3"></path>
            <path d="M3 16v3a2 2 0 0 0 2 2h3"></path>
            <path d="M16 21h3a2 2 0 0 0 2-2v-3"></path>
          </svg>
        `}updated(e){(e.has(`locale`)||e.has(`translations`))&&this.setAttribute(`aria-label`,this._t.toolbarLabel)}firstUpdated(){this.dispatchEvent(new CustomEvent(`toolbarConnected`,{bubbles:!0}))}_handleToggleSidebar(){this.dispatchEvent(new CustomEvent(`toggleSidebar`,{bubbles:!0}))}_handleZoomIn(){this.dispatchEvent(new CustomEvent(`zoomIn`,{bubbles:!0}))}_handleZoomOut(){this.dispatchEvent(new CustomEvent(`zoomOut`,{bubbles:!0}))}_handleRotateCw(){this.dispatchEvent(new CustomEvent(`rotateCw`,{bubbles:!0}))}_handleRotateCcw(){this.dispatchEvent(new CustomEvent(`rotateCcw`,{bubbles:!0}))}_handleToggleSearch(){this.dispatchEvent(new CustomEvent(`toggleSearch`,{bubbles:!0}))}_handleToggleFullscreen(){this.dispatchEvent(new CustomEvent(`toggleFullscreen`,{bubbles:!0}))}_handleZoomPercentChange(e){let t=Number(e.target.value);t&&this.dispatchEvent(new CustomEvent(`zoomChange`,{bubbles:!0,detail:{value:t}}))}_handleZoomPercentKeydown(e){e.key===`Enter`&&e.target.blur()}_handlePrint(){this.dispatchEvent(new CustomEvent(`print`,{bubbles:!0}))}_handleDownload(){this.dispatchEvent(new CustomEvent(`download`,{bubbles:!0}))}};V([R({type:Boolean})],q.prototype,`isPrintDisabled`,void 0),V([R({type:Boolean})],q.prototype,`isDownloadDisabled`,void 0),V([R({type:Boolean})],q.prototype,`isSidebarOpen`,void 0),V([R({type:Boolean})],q.prototype,`isFullscreen`,void 0),V([R({type:Number})],q.prototype,`zoomPercent`,void 0),V([R({type:String})],q.prototype,`locale`,void 0),V([R({type:Object})],q.prototype,`translations`,void 0),q=V([L(`lit-pdf-toolbar`)],q);var Je=o`:host {
  --button-width: 28px;
  --button-height: 28px;
  --button-radius: var(--litpdf-button-radius, 4px);
  --button-color: var(--litpdf-button-background, transparent);
  --button-color-hover: var(--litpdf-icon-color-hover, #737373);
  --button-border-hover: var(--litpdf-button-border-hover, #5f49d1);
  --button-background-hover: var(
    --litpdf-button-background-hover,
    color-mix(in srgb, #5f49d1 12%, transparent)
  );
  --button-focus-ring: var(--litpdf-focus-ring-color, #5f49d1);
  color: var(--litpdf-icon-color, #222222);
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  height: 42px;
  padding: 0 10px;
  box-sizing: border-box;
  background-color: var(--litpdf-surface-background, #fff);
  border-radius: 999px;
  box-shadow: var(--litpdf-surface-shadow, 2px 2px 3px rgba(30, 16, 106, 0.2509803922));
  z-index: 500;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 200ms ease, visibility 0s linear 200ms;
}

:host([visible]) {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transition: opacity 200ms ease;
}

.toolbarButton {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--button-width);
  height: var(--button-height);
  border: 1px solid transparent;
  outline: 0;
  border-radius: var(--button-radius);
  background-color: var(--button-color);
  color: inherit;
  box-sizing: border-box;
  cursor: pointer;
}
.toolbarButton:disabled {
  opacity: 0.5;
  pointer-events: none;
}
.toolbarButton:hover {
  border-color: var(--button-border-hover);
  background-color: var(--button-background-hover);
}
.toolbarButton:hover lit-icon {
  color: var(--button-color-hover);
}
.toolbarButton:focus-visible {
  box-shadow: 0 0 0 2px var(--button-focus-ring);
}

.pageNumber {
  outline: none;
  border: 1px solid var(--litpdf-border-color, #cccccc);
  border-radius: var(--button-radius);
  box-sizing: border-box;
  padding: 0 6px;
  height: 18px;
  width: 44px;
  text-align: center;
  transition: border-color 120ms, box-shadow 120ms;
}
.pageNumber:hover:not(:disabled) {
  border-color: var(--litpdf-border-color-hover, #737373);
}
.pageNumber:focus-visible {
  border-color: var(--button-focus-ring);
  box-shadow: 0 0 0 2px var(--button-focus-ring);
}

.pageCount {
  font-size: 0.8rem;
  color: var(--litpdf-text-color-muted, #737373);
  white-space: nowrap;
}

@media (max-width: 600px) {
  :host {
    --button-width: 44px;
    --button-height: 44px;
    bottom: 12px;
    gap: 6px;
    height: 48px;
  }
  .pageNumber {
    height: 34px;
    width: 44px;
    font-size: 1rem;
  }
  .pageCount {
    font-size: 1rem;
  }
}`,J=class extends I{constructor(...e){super(...e),this.visible=!1,this.translations={}}static get styles(){return[Je]}get _t(){return K(this.locale,{pagination:this.translations}).pagination}connectedCallback(){super.connectedCallback(),this.setAttribute(`role`,`group`),this.setAttribute(`aria-label`,this._t.paginationLabel)}render(){let e=this._t;return D`
      <lit-tooltip text=${e.previousPage}>
        <button
          class="toolbarButton pageUp"
          aria-label=${e.previousPage}
          id="previous"
          disabled
          @click=${this._handlePrevious}
        >
          <lit-icon icon="arrow-up"></lit-icon>
        </button>
      </lit-tooltip>
      <lit-tooltip text=${e.nextPage}>
        <button
          class="toolbarButton pageDown"
          aria-label=${e.nextPage}
          id="next"
          @click=${this._handleNext}
        >
          <lit-icon icon="arrow-down"></lit-icon>
        </button>
      </lit-tooltip>

      <input
        type="number"
        id="pageNumber"
        class="toolbarField pageNumber"
        value="1"
        size="4"
        min="1"
        aria-label=${e.pageNumber}
        aria-describedby="pageCount"
        @change=${this._handlePageChange}
      />
      <span class="pageCount" id="pageCount"> / ${this.pageCount}</span>
    `}updated(e){(e.has(`locale`)||e.has(`translations`))&&this.setAttribute(`aria-label`,this._t.paginationLabel)}firstUpdated(){this.dispatchEvent(new CustomEvent(`paginationConnected`,{bubbles:!0,detail:{previousPageEl:this._previousPageEl,nextPageEl:this._nextPageEl,pageNumberEl:this._pageNumberEl}}))}_handlePrevious(){this.dispatchEvent(new CustomEvent(`previousPage`,{bubbles:!0}))}_handleNext(){this.dispatchEvent(new CustomEvent(`nextPage`,{bubbles:!0}))}_handlePageChange(){this.dispatchEvent(new CustomEvent(`pageChange`,{bubbles:!0}))}};V([R({type:Number})],J.prototype,`pageCount`,void 0),V([R({type:Boolean,reflect:!0})],J.prototype,`visible`,void 0),V([R({type:String})],J.prototype,`locale`,void 0),V([R({type:Object})],J.prototype,`translations`,void 0),V([B(`#previous`)],J.prototype,`_previousPageEl`,void 0),V([B(`#next`)],J.prototype,`_nextPageEl`,void 0),V([B(`#pageNumber`)],J.prototype,`_pageNumberEl`,void 0),J=V([L(`lit-pdf-pagination`)],J);var Ye=o`:host {
  --thumbnail-border-radius: 4px;
  --sidebar-width: 160px;
  --sidebar-transition-duration: 240ms;
  --sidebar-transition-easing: cubic-bezier(0.65, 0, 0.35, 1);
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  width: 0;
  box-sizing: border-box;
  overflow: hidden;
  padding: 12px 0;
  background-color: var(--litpdf-surface-background, #fff);
  border-right: 1px solid transparent;
  opacity: 0;
  transform: translateX(-12px);
  pointer-events: none;
  transition: width var(--sidebar-transition-duration) var(--sidebar-transition-easing), padding var(--sidebar-transition-duration) var(--sidebar-transition-easing), opacity var(--sidebar-transition-duration) var(--sidebar-transition-easing), transform var(--sidebar-transition-duration) var(--sidebar-transition-easing);
}

:host([open]) {
  width: var(--sidebar-width);
  padding: 12px 8px;
  overflow-y: auto;
  border-right-color: var(--litpdf-border-color, #cccccc);
  opacity: 1;
  transform: translateX(0);
  pointer-events: auto;
}

.list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  list-style: none;
  padding: 0;
  margin: 0;
}
.list li {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.thumbnail {
  display: flex;
  padding: 4px;
  border: 2px solid transparent;
  border-radius: var(--thumbnail-border-radius);
  background: transparent;
  cursor: pointer;
  box-sizing: border-box;
  outline: 0;
}
.thumbnail:hover {
  border-color: var(--litpdf-button-border-hover, #5f49d1);
}
.thumbnail:focus-visible {
  box-shadow: 0 0 0 2px var(--litpdf-focus-ring-color, #5f49d1);
}
.thumbnail[data-current] {
  border-color: var(--litpdf-accent-color, #5f49d1);
}

.canvas {
  display: block;
  background-color: #fff;
  box-shadow: var(--litpdf-surface-shadow, 2px 2px 3px rgba(30, 16, 106, 0.2509803922));
}

.pageNumber {
  font-size: 0.7rem;
  color: var(--litpdf-text-color-muted, #737373);
}

@media (max-width: 600px) {
  :host {
    position: absolute;
    inset: 0 auto 0 0;
    z-index: 600;
    width: 75vw;
    max-width: 260px;
    padding: 12px 8px;
    overflow-y: auto;
    box-shadow: var(--litpdf-surface-shadow, 2px 2px 3px rgba(30, 16, 106, 0.2509803922));
  }
  :host([open]) {
    width: 75vw;
    max-width: 260px;
  }
}`,Xe=110,Y=class extends I{constructor(...e){super(...e),this.pdfDocument=null,this.open=!1,this.currentPage=1,this.translations={},this._renderedPages=new Set,this._renderTasks=new Map}static get styles(){return[Ye]}get _t(){return K(this.locale,{thumbnails:this.translations}).thumbnails}get _pageCount(){return this.pdfDocument?.numPages??0}connectedCallback(){super.connectedCallback(),this.setAttribute(`role`,`navigation`),this.setAttribute(`aria-label`,this._t.thumbnailsLabel)}disconnectedCallback(){super.disconnectedCallback(),this._cancelPendingRenders()}render(){let e=this._t;return this._pageCount?D`
      <ul class="list">
        ${Array.from({length:this._pageCount},(e,t)=>t+1).map(t=>D`
            <li>
              <button
                class="thumbnail"
                ?data-current=${t===this.currentPage}
                aria-current=${t===this.currentPage?`page`:k}
                aria-label=${e.pageLabel.replace(`{number}`,`${t}`)}
                data-page=${t}
                @click=${()=>this._handleSelect(t)}
              >
                <canvas class="canvas"></canvas>
              </button>
              <span class="pageNumber" aria-hidden="true">${t}</span>
            </li>
          `)}
      </ul>
    `:D``}updated(e){e.has(`pdfDocument`)&&(this._cancelPendingRenders(),this._renderedPages.clear()),(e.has(`pdfDocument`)||e.has(`open`))&&this.open&&this._renderThumbnails(),e.has(`currentPage`)&&this._scrollCurrentIntoView(),(e.has(`locale`)||e.has(`translations`))&&this.setAttribute(`aria-label`,this._t.thumbnailsLabel)}_renderThumbnails(){this.renderRoot.querySelectorAll(`.thumbnail`).forEach(e=>{this._renderThumbnail(Number(e.dataset.page))})}async _renderThumbnail(e){if(this._renderedPages.has(e)||!this.pdfDocument)return;this._renderedPages.add(e);let t=this.renderRoot.querySelector(`.thumbnail[data-page="${e}"] canvas`),n=t?.getContext(`2d`);if(!t||!n){this._renderedPages.delete(e);return}let r=await this.pdfDocument.getPage(e),i=Xe/r.getViewport({scale:1}).width,a=r.getViewport({scale:i});t.width=a.width,t.height=a.height;let o=r.render({canvas:t,canvasContext:n,viewport:a});this._renderTasks.set(e,o);try{await o.promise}catch{this._renderedPages.delete(e)}finally{this._renderTasks.delete(e)}}_cancelPendingRenders(){this._renderTasks.forEach(e=>e.cancel()),this._renderTasks.clear()}_scrollCurrentIntoView(){this.renderRoot.querySelector(`.thumbnail[data-current]`)?.scrollIntoView({block:`nearest`})}_handleSelect(e){this.dispatchEvent(new CustomEvent(`thumbnailSelect`,{bubbles:!0,detail:{pageNumber:e}}))}};V([R({attribute:!1})],Y.prototype,`pdfDocument`,void 0),V([R({type:Boolean,reflect:!0})],Y.prototype,`open`,void 0),V([R({type:Number})],Y.prototype,`currentPage`,void 0),V([R({type:String})],Y.prototype,`locale`,void 0),V([R({type:Object})],Y.prototype,`translations`,void 0),Y=V([L(`lit-pdf-thumbnails`)],Y);var Ze=o`:host .errorWrapper {
  background: none repeat scroll 0 0 var(--litpdf-error-background, rgb(255, 85, 85));
  color: var(--litpdf-error-color, rgb(255, 255, 255));
  left: 0;
  position: absolute;
  right: 0;
  top: 3.2rem;
  z-index: 1000;
  padding: 0.6rem;
  font-size: 0.8rem;
  margin: 0.5rem;
}
:host .errorMessageLeft,
:host .errorMessageRight {
  display: flex;
  align-items: center;
}
:host .errorMessageContent {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
:host .errorMoreInfo {
  background-color: var(--litpdf-surface-background, rgb(255, 255, 255));
  color: var(--litpdf-text-color, rgb(0, 0, 0));
  padding: 0.3rem;
  margin-top: 0.6rem;
  width: 100%;
  min-height: 200px;
  box-sizing: border-box;
}
:host .errorButton {
  width: 16px;
  height: 16px;
  border: 0;
  outline: 0;
  margin: 0 4px;
  background: transparent;
  cursor: pointer;
}
:host .errorButton lit-icon {
  color: var(--litpdf-error-color, #fff);
}
:host .hidden {
  display: none;
}
:host [hidden] {
  display: none;
}`,X=class extends I{constructor(...e){super(...e),this.translations={}}static get styles(){return[Ze]}get _t(){return K(this.locale,{error:this.translations}).error}render(){let e=this._t;return D`
      <div id="errorWrapper" class="errorWrapper">
        <div class="errorMessageContent">
          <section class="errorMessageLeft">
            <span id="errorMessage">${this.errorMessage}</span>
            <button class="errorButton" id="errorShowMore" @click=${this._handleErrorMoreInfo}>
              <lit-icon icon="chevron-down" alt=${e.moreInfo}></lit-icon>
            </button>
            <button
              class="errorButton"
              id="errorShowLess"
              hidden
              @click=${this._handleErrorLessInfo}
            >
              <lit-icon icon="chevron-up" alt=${e.lessInfo}></lit-icon>
            </button>
          </section>
          <section class="errorMessageRight">
            <button class="errorButton" id="errorClose" @click=${this._handleCloseError}>
              <lit-icon icon="cross" alt=${e.closeError}></lit-icon>
            </button>
          </section>
        </div>
        <textarea class="errorMoreInfo" id="errorMoreInfo" hidden="true" readonly="readonly">
${this.errorMoreInfo}</textarea>
      </div>
    `}_handleErrorMoreInfo(){this._errorMoreInfo.hidden=!1,this._moreInfoButton.hidden=!0,this._lessInfoButton.hidden=!1,this._errorMoreInfo.style.height=`${this._errorMoreInfo.scrollHeight}px`}_handleErrorLessInfo(){this._errorMoreInfo.hidden=!0,this._moreInfoButton.hidden=!1,this._lessInfoButton.hidden=!0}_handleCloseError(){this.dispatchEvent(new CustomEvent(`close`,{bubbles:!0}))}};V([R({type:String})],X.prototype,`locale`,void 0),V([R({type:Object})],X.prototype,`translations`,void 0),V([R({type:String})],X.prototype,`errorMessage`,void 0),V([R({type:String})],X.prototype,`errorMoreInfo`,void 0),V([B(`#errorMoreInfo`)],X.prototype,`_errorMoreInfo`,void 0),V([B(`#errorShowMore`)],X.prototype,`_moreInfoButton`,void 0),V([B(`#errorShowLess`)],X.prototype,`_lessInfoButton`,void 0),X=V([L(`lit-pdf-error`)],X);var Qe=o`:host {
  --input-height: 32px;
  --input-radius: 6px;
  --input-border: var(--litpdf-border-color, #cccccc);
  --input-border-hover: var(--litpdf-border-color-hover, #737373);
  --input-focus-ring: var(--litpdf-focus-ring-color, #5f49d1);
  --input-color: var(--litpdf-text-color, #222222);
  --input-placeholder-color: var(--litpdf-text-color-muted, #737373);
  display: block;
}

.visuallyHidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

input {
  height: var(--input-height);
  width: 100%;
  box-sizing: border-box;
  padding: 0 14px;
  border: 1px solid var(--input-border);
  border-radius: var(--input-radius);
  outline: none;
  font-size: 0.85rem;
  color: var(--input-color);
  background-color: var(--litpdf-surface-background, #fff);
  transition: border-color 120ms, box-shadow 120ms;
}
input::placeholder {
  color: var(--input-placeholder-color);
}
input:hover:not(:disabled) {
  border-color: var(--input-border-hover);
}
input:focus-visible {
  border-color: var(--input-focus-ring);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--input-focus-ring) 30%, transparent);
}
input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.wrapper:has(.clearButton) input {
  padding-right: 32px;
}

.clearButton {
  position: absolute;
  right: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border: 0;
  outline: 0;
  border-radius: 50%;
  background-color: transparent;
  color: var(--input-placeholder-color);
  cursor: pointer;
}
.clearButton lit-icon {
  --icon-size: 10px;
}
.clearButton:hover {
  background-color: var(--litpdf-surface-background-hover, #eeeeee);
  color: var(--input-color);
}
.clearButton:focus-visible {
  box-shadow: 0 0 0 2px var(--input-focus-ring);
}`,$e=0,Z=class extends I{constructor(...e){super(...e),this.value=``,this.label=``,this.placeholder=``,this.disabled=!1,this.clearable=!1,this._id=`lit-input-${++$e}`}static get styles(){return[Qe]}render(){return D`
      <label class="visuallyHidden" for=${this._id}>${this.label}</label>
      <div class="wrapper">
        <input
          id=${this._id}
          type="text"
          .value=${this.value}
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          autocomplete="off"
          spellcheck="false"
          @input=${this._handleInput}
        />
        ${this.clearable&&this.value?D`
                <button
                  type="button"
                  class="clearButton"
                  aria-label="Effacer"
                  @click=${this._handleClear}
                >
                  <lit-icon icon="cross" alt="Effacer"></lit-icon>
                </button>
              `:k}
      </div>
    `}focus(e){this._inputEl?.focus(e)}select(){this._inputEl?.select()}_handleInput(e){this.value=e.target.value}_handleClear(){this.value=``,this._inputEl.value=``,this._inputEl.focus(),this._inputEl.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0}))}};V([R({type:String})],Z.prototype,`value`,void 0),V([R({type:String})],Z.prototype,`label`,void 0),V([R({type:String})],Z.prototype,`placeholder`,void 0),V([R({type:Boolean})],Z.prototype,`disabled`,void 0),V([R({type:Boolean})],Z.prototype,`clearable`,void 0),V([B(`input`)],Z.prototype,`_inputEl`,void 0),Z=V([L(`lit-input`)],Z);var et=o`:host {
  --button-width: 26px;
  --button-height: 26px;
  --button-border-hover: var(--litpdf-button-border-hover, #5f49d1);
  --button-background-hover: var(
    --litpdf-button-background-hover,
    color-mix(in srgb, #5f49d1 12%, transparent)
  );
  --button-focus-ring: var(--litpdf-focus-ring-color, #5f49d1);
  display: none;
  position: absolute;
  top: 100%;
  right: 12px;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  margin-top: 6px;
  background-color: var(--litpdf-surface-background, #fff);
  border-radius: 6px;
  box-shadow: var(--litpdf-surface-shadow, 2px 2px 3px rgba(30, 16, 106, 0.2509803922));
  z-index: 500;
  box-sizing: border-box;
  color: var(--litpdf-icon-color, #222222);
}

:host([open]) {
  display: flex;
}

lit-input {
  --input-height: 30px;
  width: 170px;
}

.matchCount {
  font-size: 0.75rem;
  color: var(--litpdf-text-color-muted, #737373);
  white-space: nowrap;
}

.searchButton {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--button-width);
  height: var(--button-height);
  border: 1px solid transparent;
  outline: 0;
  border-radius: 4px;
  background-color: transparent;
  color: inherit;
  box-sizing: border-box;
  cursor: pointer;
}
.searchButton:disabled {
  opacity: 0.5;
  pointer-events: none;
}
.searchButton:hover {
  border-color: var(--button-border-hover);
  background-color: var(--button-background-hover);
}
.searchButton:hover lit-icon {
  color: var(--litpdf-icon-color-hover, #5f49d1);
}
.searchButton:focus-visible {
  box-shadow: 0 0 0 2px var(--button-focus-ring);
}

@media (max-width: 600px) {
  :host {
    right: 6px;
    left: 6px;
  }
  lit-input {
    width: auto;
    flex: 1 1 auto;
  }
}`,tt=300,Q=class extends I{constructor(...e){super(...e),this.open=!1,this.matchCount=0,this.currentMatch=0,this.notFound=!1,this.query=``,this.translations={},this._query=``,this._handleKeydown=e=>{e.key===`Enter`?(e.preventDefault(),e.shiftKey?this._handlePrevious():this._handleNext()):e.key===`Escape`&&(e.preventDefault(),this._handleClose())}}static get styles(){return[et]}get _t(){return K(this.locale,{search:this.translations}).search}connectedCallback(){super.connectedCallback(),this.setAttribute(`role`,`search`),this.setAttribute(`aria-label`,this._t.searchLabel),this.addEventListener(`keydown`,this._handleKeydown),this.query&&(this._query=this.query)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`keydown`,this._handleKeydown)}render(){let e=this._query.length>0,t=this._t;return D`
      <lit-input
        label=${t.inputLabel}
        placeholder=${t.placeholder}
        .value=${this._query}
        clearable
        @input=${this._handleInput}
      ></lit-input>
      <span
        class="matchCount"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        ?hidden=${!e}
      >
        ${this.notFound?t.noResults:`${this.currentMatch} / ${this.matchCount}`}
      </span>
      <button
        class="searchButton"
        title=${t.previous}
        aria-label=${t.previous}
        ?disabled=${!e||!this.matchCount}
        @click=${this._handlePrevious}
      >
        <lit-icon icon="chevron-up"></lit-icon>
      </button>
      <button
        class="searchButton"
        title=${t.next}
        aria-label=${t.next}
        ?disabled=${!e||!this.matchCount}
        @click=${this._handleNext}
      >
        <lit-icon icon="chevron-down"></lit-icon>
      </button>
      <button
        class="searchButton"
        title=${t.close}
        aria-label=${t.close}
        @click=${this._handleClose}
      >
        <lit-icon icon="cross"></lit-icon>
      </button>
    `}updated(e){e.has(`query`)&&this.query&&!this._query&&(this._query=this.query),e.has(`open`)&&this.open&&(this._inputEl?.focus(),this._inputEl?.select()),(e.has(`locale`)||e.has(`translations`))&&this.setAttribute(`aria-label`,this._t.searchLabel)}_handleInput(e){this._query=e.target.value,clearTimeout(this._debounceTimeout),this._debounceTimeout=setTimeout(()=>{this.dispatchEvent(new CustomEvent(`searchQuery`,{bubbles:!0,detail:{query:this._query}}))},tt)}_handleNext(){this._query&&this.dispatchEvent(new CustomEvent(`searchNext`,{bubbles:!0}))}_handlePrevious(){this._query&&this.dispatchEvent(new CustomEvent(`searchPrevious`,{bubbles:!0}))}_handleClose(){clearTimeout(this._debounceTimeout),this.dispatchEvent(new CustomEvent(`searchClose`,{bubbles:!0}))}};V([R({type:Boolean,reflect:!0})],Q.prototype,`open`,void 0),V([R({type:Number})],Q.prototype,`matchCount`,void 0),V([R({type:Number})],Q.prototype,`currentMatch`,void 0),V([R({type:Boolean})],Q.prototype,`notFound`,void 0),V([R({type:String})],Q.prototype,`query`,void 0),V([R({type:String})],Q.prototype,`locale`,void 0),V([R({type:Object})],Q.prototype,`translations`,void 0),V([B(`lit-input`)],Q.prototype,`_inputEl`,void 0),V([z()],Q.prototype,`_query`,void 0),Q=V([L(`lit-pdf-search`)],Q);var nt=o`@media print {
  body {
    background: rgba(0, 0, 0, 0) none;
  }
  #printPageContainer {
    height: 100%;
  }
  /* wrapper around (scaled) print canvas elements */
  #printPageContainer > .printedPage {
    page-break-after: always;
    page-break-inside: avoid;
    /* The wrapper always cover the whole page. */
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  #printPageContainer > .printedPage canvas {
    /* The intrinsic canvas / image size will make sure that we fit the page. */
    max-width: 100%;
    max-height: 100%;
    direction: ltr;
    display: block;
  }
}`,rt=class e{constructor(){this._abort=()=>{this._url=void 0,this._aborted=!0}}static getInstance(){return e._instance||=new e,e._instance}onProgress(e){return null}async print({printSrc:e,token:t,pdfDocument:n}){this._pdfjsLib=await Be();let r=this._hasChanged(e,n);if(this._url=e,this._pdfDocument=n,this._aborted=!1,e||n){let i=document.getElementById(`printPage`),a;this._printContainer=document.createElement(`div`),this._printContainer.setAttribute(`id`,`printPageContainer`),a=i||this._createIframe(),r?(this._reinitProgress(),await this._renderPdf({printSrc:e,token:t,pdfDocument:n}),this._copyCanvasInIframe(a),await this._print(a)):await this._print(a)}}async _renderPdf({printSrc:e,token:t,pdfDocument:n}){try{let r=n;if(!r){let n=t?{Authorization:`Bearer ${t}`}:{};r=await this._pdfjsLib.getDocument({url:e,httpHeaders:n}).promise}let i=r.numPages;this._aborted||await this._renderPages(n,i)}catch(e){throw this._abort(),e}}_renderPages(e,t){let n=(r,i)=>{if(++this._currentPage>=t){this.onProgress({loaded:t,total:t}),r();return}let a=this._currentPage;this.onProgress({loaded:a,total:t}),this._renderPage(e,a+1,{width:640,height:840}).then(()=>{n(r,i)},i)};return new Promise(n)}async _renderPage(e,t,n){if(!this._aborted){let r=document.createElement(`canvas`),i=document.createElement(`div`);i.className=`printedPage`,i.appendChild(r),this._printContainer.appendChild(i);let a=124/this._pdfjsLib.PixelsPerInch.PDF;r.width=Math.floor(n.width*a),r.height=Math.floor(n.height*a);let o=r.getContext(`2d`);o.save(),o.fillStyle=`rgb(255, 255, 255)`,o.fillRect(0,0,r.width,r.height),o.restore();let s=await e.getPage(t),c={canvas:r,canvasContext:o,transform:[a,0,0,a,0,0],viewport:s.getViewport({scale:1}),intent:`print`};await s.render(c).promise}}_reinitProgress(){this.onProgress({loaded:0,total:1}),this._currentPage=-1}_hasChanged(e,t){return this._pdfDocument!==t||this._url!==e}_createIframe(){let e=document.createElement(`iframe`);return e.style.position=`absolute`,e.style.top=`-10000px`,e.setAttribute(`sandbox`,`allow-modals allow-same-origin allow-scripts`),e.setAttribute(`id`,`printPage`),document.body.appendChild(e),this._setIframeStyle(e),e}_setIframeStyle(e){let t=e.contentDocument||e.contentWindow.document,n=document.createElement(`style`);n.textContent=nt.cssText,t.head.appendChild(n)}_copyCanvasInIframe(e){let t=(e.contentDocument||e.contentWindow.document).documentElement.querySelector(`body`);t.innerHTML=``,t.appendChild(this._printContainer)}_print(e){return new Promise((t,n)=>{this._aborted?n():setTimeout(()=>{window.frames.printPage.print?(window.frames.printPage.focus(),window.frames.printPage.print()):(e.contentWindow.__container__=e,e.contentWindow.focus(),e.contentWindow.print()),t()},500)})}},it=o`:host {
  --page-margin: 1px auto -8px;
  --page-border: 9px solid transparent;
  --highlight-color: var(--litpdf-highlight-color, rgb(255 247 0 / 0.4));
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
:host *:not(lit-pdf-toolbar):not(lit-pdf-pagination):not(lit-pdf-thumbnails):not(lit-pdf-search):not(lit-pdf-error) {
  padding: 0;
  margin: 0;
}
:host header {
  position: relative;
  flex: 0 0 auto;
}
:host section {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: 2rem;
}
:host .contentWrapper {
  position: relative;
  display: flex;
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
}
:host .viewerWrapper {
  position: relative;
  flex: 1 1 auto;
  min-width: 0;
}
:host #viewerContainer {
  position: absolute;
  inset: 0;
  overflow: auto;
}
:host .pdfViewer {
  --scale-factor: 1;
}
:host .page {
  --user-unit: 1;
  --total-scale-factor: calc(var(--scale-factor) * var(--user-unit));
  --scale-round-x: 1px;
  --scale-round-y: 1px;
  direction: ltr;
  width: 816px;
  height: 1056px;
  margin: var(--page-margin);
  position: relative;
  overflow: visible;
  border: var(--page-border);
  background-clip: content-box;
  background-color: rgb(255, 255, 255);
}
:host .canvasWrapper {
  overflow: hidden;
  width: 100%;
  height: 100%;
}
:host .canvasWrapper canvas {
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  display: block;
  width: 100%;
  height: 100%;
}
:host .textLayer {
  position: absolute;
  text-align: initial;
  inset: 0;
  overflow: clip;
  opacity: 1;
  line-height: 1;
  letter-spacing: normal;
  word-spacing: normal;
  -webkit-text-size-adjust: none;
  -moz-text-size-adjust: none;
  text-size-adjust: none;
  forced-color-adjust: none;
  transform-origin: 0 0;
  z-index: 0;
  --min-font-size: 1;
  --text-scale-factor: calc(var(--total-scale-factor) * var(--min-font-size));
  --min-font-size-inv: calc(1 / var(--min-font-size));
}
:host .textLayer span,
:host .textLayer br {
  color: transparent;
  position: absolute;
  white-space: pre;
  cursor: text;
  transform-origin: 0% 0%;
  -webkit-user-select: text;
  -moz-user-select: text;
  user-select: text;
}
:host .textLayer > :not(.markedContent),
:host .textLayer .markedContent span:not(.markedContent) {
  z-index: 1;
  --font-height: 0;
  font-size: calc(var(--text-scale-factor) * var(--font-height));
  --scale-x: 1;
  --rotate: 0deg;
  transform: rotate(var(--rotate)) scaleX(var(--scale-x)) scale(var(--min-font-size-inv));
}
:host .textLayer .markedContent {
  display: contents;
}
:host .textLayer .highlight {
  --highlight-bg-color: var(--highlight-color, rgb(180 0 170 / 0.25));
  --highlight-selected-bg-color: rgb(0 100 0 / 0.25);
  margin: -1px;
  padding: 1px;
  background-color: var(--highlight-bg-color);
  border-radius: 4px;
}
:host .textLayer .highlight.appended {
  position: initial;
}
:host .textLayer .highlight.begin {
  border-radius: 4px 0 0 4px;
}
:host .textLayer .highlight.end {
  border-radius: 0 4px 4px 0;
}
:host .textLayer .highlight.middle {
  border-radius: 0;
}
:host .textLayer .highlight.selected {
  background-color: var(--highlight-selected-bg-color);
  scroll-margin-top: 50px;
}
:host .textLayer ::-moz-selection {
  background: rgba(0, 0, 255, 0.25);
  color: transparent;
}
:host .textLayer ::selection {
  background: rgba(0, 0, 255, 0.25);
  color: transparent;
}
:host .textLayer br::-moz-selection {
  background: transparent;
}
:host .textLayer br::selection {
  background: transparent;
}
:host .textLayer .endOfContent {
  display: block;
  position: absolute;
  inset: 100% 0 0;
  z-index: 0;
  cursor: default;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
:host .textLayer.selecting .endOfContent {
  top: 0;
}
:host .pdfViewer.removePageBorders .page {
  margin: 0 auto 10px;
  border: none;
}
:host .pdfViewer.removePageBorders .page:last-of-type {
  margin-bottom: 0;
}
@keyframes moveDefault {
  from {
    background-position: 0 top;
  }
  to {
    background-position: -39rem top;
  }
}
:host .modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-self: center;
}
:host .modal .modalContent {
  padding: 24px;
  box-shadow: var(--litpdf-surface-shadow, 2px 2px 3px rgba(30, 16, 106, 0.2509803922));
  background-color: var(--litpdf-surface-background, #fff);
  border-radius: 8px;
  margin: 0 auto;
}
:host .loadingText {
  display: block;
  text-align: center;
  font-size: 0.8rem;
  margin-bottom: 8px;
}
:host .loadingBar {
  display: flex;
  align-items: center;
  justify-self: center;
  width: 200px;
}
:host .loadingBar .progress {
  text-align: center;
  color: #fff;
  padding: 4px;
  border-radius: 12px;
  font-size: 0.6rem;
  background-color: var(--litpdf-accent-color, #5f49d1);
  transition: width 200ms;
}
:host .hidden {
  display: none;
}
:host [hidden] {
  display: none;
}

:host(:fullscreen) {
  width: 100%;
  height: 100%;
  background-color: var(--litpdf-surface-background, #fff);
}

:host([loaded]) .pdfViewer .page .loadingIcon {
  display: none;
}
:host([loaded]) .modal {
  display: none;
}`,at=1.1,ot=.25,st=10,ct=1024*1024,lt=`pdfjs-dist/cmaps/`,ut=!0,dt=5e3,$=class extends I{constructor(...e){super(...e),this.searchQueries=[],this.entireWord=!1,this.scale=`auto`,this.scaleUpdateDelay=300,this.isSearchBarDisplayed=!1,this.translations={},this._loadingPercent=0,this._searchOpen=!1,this._searchMatchCount=0,this._searchCurrentMatch=0,this._searchNotFound=!1,this._initialSearchQuery=``,this._searchQuery=``,this._paginationVisible=!1,this._sidebarOpen=!1,this._isFullscreen=!1,this._zoomPercent=100,this._currentPage=1,this._handleViewerScroll=()=>{this._paginationVisible=!0,clearTimeout(this._paginationHideTimeout),this._paginationHideTimeout=setTimeout(()=>{this._paginationVisible=!1},dt)},this._handleGlobalKeydown=e=>{(e.metaKey||e.ctrlKey)&&e.key.toLowerCase()===`f`&&(e.preventDefault(),this._searchOpen=!0)},this._handleFullscreenChange=()=>{this._isFullscreen=document.fullscreenElement===this}}static get styles(){return[it]}get pagesCount(){return this._pdfDocument.numPages}get page(){return this._pdfViewer.currentPageNumber}get _t(){return K(this.locale,this.translations)}set page(e){this._pdfViewer.currentPageNumber=e}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this._searchOpen=this._shouldDisplaySearchBar(),this._searchQuery=this._initialSearchQuery=this._joinedSearchQueries(),window.addEventListener(`resize`,this._handleWindowResise),window.addEventListener(`keydown`,this._handleGlobalKeydown),this.addEventListener(`fullscreenchange`,this._handleFullscreenChange)}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),window.removeEventListener(`resize`,this._handleWindowResise),window.removeEventListener(`keydown`,this._handleGlobalKeydown),this.removeEventListener(`fullscreenchange`,this._handleFullscreenChange),this._viewerContainer?.removeEventListener(`scroll`,this._handleViewerScroll),clearTimeout(this._paginationHideTimeout)}render(){let e=this._t;return D`<header>
        <slot
          name="toolbar"
          @toolbarConnected=${this._handleToolbarConnected}
          @toggleSidebar=${this._handleToggleSidebar}
          @zoomIn=${this._handleZoomIn}
          @zoomOut=${this._handleZoomOut}
          @rotateCw=${this._handleRotateCw}
          @rotateCcw=${this._handleRotateCcw}
          @print=${this._handlePrint}
          @download=${this._handleDownload}
          @toggleSearch=${this._handleToggleSearch}
          @toggleFullscreen=${this._handleToggleFullscreen}
          @zoomChange=${this._handleZoomChange}
        >
          <lit-pdf-toolbar
            isDownloadDisabled
            isPrintDisabled
            ?isSidebarOpen=${this._sidebarOpen}
            ?isFullscreen=${this._isFullscreen}
            zoomPercent=${this._zoomPercent}
            locale=${this.locale}
            .translations=${this.translations?.toolbar}
          ></lit-pdf-toolbar
        ></slot>

        <slot
          name="search"
          @searchQuery=${this._handleSearchQuery}
          @searchNext=${this._handleSearchNext}
          @searchPrevious=${this._handleSearchPrevious}
          @searchClose=${this._handleSearchClose}
        >
          <lit-pdf-search
            ?open=${this._searchOpen}
            query=${this._initialSearchQuery}
            matchCount=${this._searchMatchCount}
            currentMatch=${this._searchCurrentMatch}
            ?notFound=${this._searchNotFound}
            locale=${this.locale}
            .translations=${this.translations?.search}
          ></lit-pdf-search
        ></slot>
      </header>

      <div class="contentWrapper">
        <lit-pdf-thumbnails
          ?open=${this._sidebarOpen}
          .pdfDocument=${this._pdfDocument}
          .currentPage=${this._currentPage}
          locale=${this.locale}
          .translations=${this.translations?.thumbnails}
          @thumbnailSelect=${this._handleThumbnailSelect}
        ></lit-pdf-thumbnails>

        <div class="viewerWrapper">
          <div id="viewerContainer">
            <div id="viewer" class="pdfViewer"></div>
          </div>

          <lit-pdf-pagination
            ?visible=${this._paginationVisible}
            locale=${this.locale}
            .translations=${this.translations?.pagination}
            @paginationConnected=${this._handlePaginationConnected}
            @previousPage=${this._handlePrevious}
            @nextPage=${this._handleNext}
            @pageChange=${this._handlePageChange}
          ></lit-pdf-pagination>
        </div>
      </div>

      <slot name="loading">
        <div class="modal">
          <div class="modalContent">
            <span class="loadingText"
              >${e.viewer.loading.replace(`{percent}`,`${this._loadingPercent}`)}</span
            >
            <div id="loadingBar" class="loadingBar">
              <div class="progress" style="width: ${this._loadingPercent}%"></div>
            </div>
          </div>
        </div>
      </slot>

      <section ?hidden=${!this._openErrorPanel}>
        <slot name="error" @close=${()=>this._toggleErrorPanel({open:!1})}>
          <lit-pdf-error
            errorMessage=${this._errorMessage}
            errorMoreInfo=${this._errorMoreInfo}
            locale=${this.locale}
            .translations=${this.translations?.error}
          ></lit-pdf-error>
        </slot>
      </section> `}firstUpdated(){this._viewerContainer.addEventListener(`scroll`,this._handleViewerScroll)}updated(e){e.has(`src`)&&(this._loadingTaskPromise=this._open({url:this.src})),e.has(`searchQueries`)&&this.searchQueries?.length&&(this._removeAccents(),this._searchWords(),this._searchQuery=this._initialSearchQuery=this._joinedSearchQueries()),e.has(`scale`)&&this.scale&&this._viewerReadyPromise&&setTimeout(async()=>{await this._viewerReadyPromise,this._eventBus.dispatch(`scalechanged`,{value:this.scale})},this.scaleUpdateDelay),(e.has(`isSearchBarDisplayed`)||e.has(`searchQueries`))&&(this._searchOpen=this._shouldDisplaySearchBar())}_shouldDisplaySearchBar(){return this.isSearchBarDisplayed||this.searchQueries?.length>0}_joinedSearchQueries(){return this.searchQueries?.length?this.searchQueries.join(`, `):``}async _open(e){if(await this._ensureViewerReady(),this._pdfLoadingTask)return this.close().then(()=>this._open(e));let{url:t}=e;this.loaded=!1,this._pdfLoadingTask=this._pdfjsLib.getDocument({url:t,maxImageSize:ct,cMapUrl:lt,cMapPacked:ut}),this._pdfLoadingTask.onProgress=e=>{this.progress(e.loaded/e.total)};try{this._pdfDocument=await this._pdfLoadingTask.promise,this._pdfViewer.setDocument(this._pdfDocument),this._pdfLinkService.setDocument(this._pdfDocument),this._pdfFindController.setDocument(this._pdfDocument),this._paginationEl.setAttribute(`pageCount`,`${this.pagesCount}`),this._toolbarEl.toggleAttribute(`isDownloadDisabled`,!1),this._toolbarEl.toggleAttribute(`isPrintDisabled`,!1),this.loaded=!0}catch(e){this._handleError(e),this.loaded=!0}return this._pdfDocument}_handleError(e){let t=e?.message,n=this._t.error,r;r=e instanceof this._pdfjsLib.InvalidPDFException?n.invalidPdf:e instanceof this._pdfjsLib.ResponseException&&e.missing?n.missingPdf:e instanceof this._pdfjsLib.ResponseException?n.unexpectedResponse:n.genericError,this.error(r,{message:t})}error(e,t){let n=this._t.error,r=[`PDF.js v${this._pdfjsLib.version||`?`} (build: ${this._pdfjsLib.build||`?`})`];this._errorMessage=e,this._toggleErrorPanel({open:!0}),t&&(r.push(`${n.messageLabel}: ${t.message}`),t.stack?r.push(`${n.stackLabel}: ${t.stack}`):(t.filename&&r.push(`${n.fileLabel}: ${t.filename}`),t.lineNumber&&r.push(`${n.lineLabel}: ${t.lineNumber}`))),this._errorMoreInfo=r.join(`
`)}_toggleErrorPanel({open:e}){this._openErrorPanel=e}close(){if(this._toggleErrorPanel({open:!1}),!this._pdfLoadingTask)return Promise.resolve();let e=this._pdfLoadingTask.destroy();return this._pdfLoadingTask=null,this._pdfDocument&&(this._pdfDocument=null,this._pdfViewer.setDocument(null),this._pdfLinkService.setDocument(null,null)),e}progress(e){let t=Math.round(e*100);(t>this._loadingPercent||Number.isNaN(t))&&(this._loadingPercent=t)}_ensureViewerReady(){return this._viewerReadyPromise||=this.initViewer(),this._viewerReadyPromise}async initViewer(){let[e,t]=await Promise.all([Be(),Ve()]),{EventBus:n,PDFLinkService:r,PDFViewer:i,PDFFindController:a,DownloadManager:o,FindState:s}=t;this._pdfjsLib=e,this._eventBus=new n,this._pdfLinkService=new r({eventBus:this._eventBus}),this._pdfFindController=new a({linkService:this._pdfLinkService,eventBus:this._eventBus}),this._downloadManager=new o,this._pdfViewer=new i({container:this._viewerContainer,removePageBorders:!0,eventBus:this._eventBus,linkService:this._pdfLinkService,findController:this._pdfFindController,downloadManager:this._downloadManager}),this._pdfLinkService.setViewer(this._pdfViewer),this._eventBus.on(`pagechanging`,e=>{let t=e.pageNumber;this._pageNumberEl.value=t,this._previousPageEl.disabled=t<=1,this._nextPageEl.disabled=t>=this.pagesCount,this._currentPage=t},!0),this._eventBus.on(`pagesinit`,()=>{this._pdfViewer.currentScaleValue=this.scale}),this._eventBus.on(`scalechanging`,({scale:e})=>{this._zoomPercent=Math.round(e*100)}),this._eventBus.on(`updatefindmatchescount`,({matchesCount:e})=>{this._searchMatchCount=e.total,this._searchCurrentMatch=e.current}),this._eventBus.on(`updatefindcontrolstate`,({state:e,matchesCount:t})=>{this._searchMatchCount=t.total,this._searchCurrentMatch=t.current,this._searchNotFound=e===s.NOT_FOUND})}_handleZoomIn(e){let t=this._pdfViewer.currentScale;do t=Number((t*at).toFixed(2)),t=Math.ceil(t*10)/10,t=Math.min(st,t);while(--e&&t<st);this._pdfViewer.currentScaleValue=t.toString()}_handleZoomOut(e){let t=this._pdfViewer.currentScale;do t=Number((t/at).toFixed(2)),t=Math.floor(t*10)/10,t=Math.max(ot,t);while(--e&&t>ot);this._pdfViewer.currentScaleValue=t.toString()}_handleZoomChange(e){let t=Math.min(st*100,Math.max(ot*100,e.detail.value));this._pdfViewer.currentScaleValue=(t/100).toString()}_handleRotateCw(){this._pdfViewer.pagesRotation+=90}_handleRotateCcw(){this._pdfViewer.pagesRotation-=90}_handleToggleSidebar(){this._sidebarOpen=!this._sidebarOpen}_handleThumbnailSelect(e){this.page=e.detail.pageNumber,window.matchMedia(`(max-width: 600px)`).matches&&(this._sidebarOpen=!1)}_handlePrevious(){--this.page}_handleNext(){this.page+=1}_handlePageChange(){let e=this._pageNumberEl;this.page=e.value===void 0?0:Number(e.value),e.value!==this.page.toString()&&(e.value=this.page.toString())}async _handlePrint(e){let t=e.target;t.toggleAttribute(`isPrintDisabled`,!0);let n=rt.getInstance();await n.print({printSrc:this.printSrc,token:this.token,pdfDocument:this._pdfDocument}),n.onProgress=e=>{let t=e.loaded/e.total;this.progress(t),this.loaded=t===1},t.toggleAttribute(`isPrintDisabled`,!1)}async _handleDownload(e){let t=e.target;t.toggleAttribute(`isDownloadDisabled`,!0);let n=await this._pdfDocument.getData();this._downloadManager.download(n,this.src,this._pdfjsLib.getFilenameFromUrl(this.src)),t.toggleAttribute(`isDownloadDisabled`,!1)}_handleToolbarConnected(e){this._toolbarEl=e.target}_handlePaginationConnected(e){this._paginationEl=e.target,this._pageNumberEl=e.detail.pageNumberEl,this._previousPageEl=e.detail.previousPageEl,this._nextPageEl=e.detail.nextPageEl}_handleToggleSearch(){this._searchOpen?this._handleSearchClose():this._searchOpen=!0}async _handleToggleFullscreen(){document.fullscreenElement?await document.exitFullscreen():await this.requestFullscreen()}_handleSearchQuery(e){this._searchQuery=e.detail.query,this._dispatchFind({type:``,findPrevious:!1})}_handleSearchNext(){this._dispatchFind({type:`again`,findPrevious:!1})}_handleSearchPrevious(){this._dispatchFind({type:`again`,findPrevious:!0})}_handleSearchClose(){this._searchOpen=!1,this._searchQuery=``,this._searchMatchCount=0,this._searchCurrentMatch=0,this._searchNotFound=!1,this._eventBus.dispatch(`findbarclose`,{source:this})}_dispatchFind({type:e,findPrevious:t}){let n=this._searchQuery.split(`,`).map(e=>Ne(e.trim())).filter(Boolean);n.length&&this._eventBus.dispatch(`find`,{source:this,type:e,query:n,caseSensitive:!1,entireWord:!1,findPrevious:t,highlightAll:!0,matchDiacritics:!1})}_handleWindowResise(){let{currentScaleValue:e}=this._pdfViewer;(e===`auto`||e===`page-fit`||e===`page-width`)&&(this._pdfViewer.currentScaleValue=e),this._pdfViewer.update()}async _searchWords(){await this._loadingTaskPromise,await this.updateComplete,setTimeout(()=>{this._eventBus.dispatch(`find`,{source:this,type:``,query:this._searchQueriesNormalized,caseSensitive:!1,entireWord:this.entireWord,findPrevious:!1,highlightAll:!0,matchDiacritics:!1})},500)}_removeAccents(){this._searchQueriesNormalized=this.searchQueries.map(e=>Ne(e))}};V([R({type:String})],$.prototype,`src`,void 0),V([R({type:String})],$.prototype,`printSrc`,void 0),V([R({type:String})],$.prototype,`token`,void 0),V([R({type:Array})],$.prototype,`searchQueries`,void 0),V([R({type:Boolean})],$.prototype,`entireWord`,void 0),V([R({type:String})],$.prototype,`scale`,void 0),V([R({type:Number})],$.prototype,`scaleUpdateDelay`,void 0),V([R({type:String})],$.prototype,`authorization`,void 0),V([R({type:Boolean,reflect:!0})],$.prototype,`loaded`,void 0),V([R({type:Boolean,reflect:!0})],$.prototype,`isSearchBarDisplayed`,void 0),V([R({type:String})],$.prototype,`locale`,void 0),V([R({type:Object})],$.prototype,`translations`,void 0),V([B(`#viewerContainer`)],$.prototype,`_viewerContainer`,void 0),V([z()],$.prototype,`_loadingPercent`,void 0),V([z()],$.prototype,`_searchOpen`,void 0),V([z()],$.prototype,`_searchMatchCount`,void 0),V([z()],$.prototype,`_searchCurrentMatch`,void 0),V([z()],$.prototype,`_searchNotFound`,void 0),V([z()],$.prototype,`_initialSearchQuery`,void 0),V([z()],$.prototype,`_errorMessage`,void 0),V([z()],$.prototype,`_errorMoreInfo`,void 0),V([z()],$.prototype,`_openErrorPanel`,void 0),V([z()],$.prototype,`_paginationVisible`,void 0),V([z()],$.prototype,`_sidebarOpen`,void 0),V([z()],$.prototype,`_isFullscreen`,void 0),V([z()],$.prototype,`_zoomPercent`,void 0),V([z()],$.prototype,`_currentPage`,void 0),$=V([L(`lit-pdf-viewer`)],$);var ft=class extends I{static get styles(){return[o`
        :host {
          display: block;
          height: 100vh;
          /* Use the dynamic viewport height on mobile so the viewer isn't
             clipped by the browser's collapsing address bar. */
          height: 100dvh;
        }
      `]}render(){return D` <lit-pdf-viewer
      src="pdf-example.pdf"
      .searchQueries=${[`java`,`loop`,`Dynamic Languages`,`native code`]}
    >
    </lit-pdf-viewer>`}};ft=V([L(`lit-app`)],ft);export{Le as t};