function t(t,e,a,r){var i,s=arguments.length,n=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,a):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,a,r);else for(var o=t.length-1;o>=0;o--)(i=t[o])&&(n=(s<3?i(n):s>3?i(e,a,n):i(e,a))||n);return s>3&&n&&Object.defineProperty(e,a,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,a=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),i=new WeakMap;let s=class{constructor(t,e,a){if(this._$cssResult$=!0,a!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(a&&void 0===t){const a=void 0!==e&&1===e.length;a&&(t=i.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),a&&i.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const a=1===t.length?t[0]:e.reduce((e,a,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+t[r+1],t[0]);return new s(a,t,r)},o=a?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const a of t.cssRules)e+=a.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,r))(e)})(t):t,{is:d,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:g}=Object,u=globalThis,b=u.trustedTypes,f=b?b.emptyScript:"",m=u.reactiveElementPolyfillSupport,x=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let a=t;switch(e){case Boolean:a=null!==t;break;case Number:a=null===t?null:Number(t);break;case Object:case Array:try{a=JSON.parse(t)}catch(t){a=null}}return a}},y=(t,e)=>!d(t,e),w={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let _=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const a=Symbol(),r=this.getPropertyDescriptor(t,a,e);void 0!==r&&c(this.prototype,t,r)}}static getPropertyDescriptor(t,e,a){const{get:r,set:i}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const s=r?.call(this);i?.call(this,e),this.requestUpdate(t,s,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const a of e)this.createProperty(a,t[a])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,a]of e)this.elementProperties.set(t,a)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const a=this._$Eu(t,e);void 0!==a&&this._$Eh.set(a,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const a=new Set(t.flat(1/0).reverse());for(const t of a)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const a=e.attribute;return!1===a?void 0:"string"==typeof a?a:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const a of e.keys())this.hasOwnProperty(a)&&(t.set(a,this[a]),delete this[a]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,r)=>{if(a)t.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const a of r){const r=document.createElement("style"),i=e.litNonce;void 0!==i&&r.setAttribute("nonce",i),r.textContent=a.cssText,t.appendChild(r)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,a){this._$AK(t,a)}_$ET(t,e){const a=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,a);if(void 0!==r&&!0===a.reflect){const i=(void 0!==a.converter?.toAttribute?a.converter:v).toAttribute(e,a.type);this._$Em=t,null==i?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(t,e){const a=this.constructor,r=a._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=a.getPropertyOptions(r),i="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=r;const s=i.fromAttribute(e,t.type);this[r]=s??this._$Ej?.get(r)??s,this._$Em=null}}requestUpdate(t,e,a,r=!1,i){if(void 0!==t){const s=this.constructor;if(!1===r&&(i=this[t]),a??=s.getPropertyOptions(t),!((a.hasChanged??y)(i,e)||a.useDefault&&a.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,a))))return;this.C(t,e,a)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:a,reflect:r,wrapped:i},s){a&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==i||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||a||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,a]of t){const{wrapped:t}=a,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,a,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[x("elementProperties")]=new Map,_[x("finalized")]=new Map,m?.({ReactiveElement:_}),(u.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,$=t=>t,A=k.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+S,z=`<${T}>`,M=document,P=()=>M.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,R="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,j=/>/g,q=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,D=/"/g,L=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...a)=>({_$litType$:t,strings:e,values:a}))(1),V=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),F=new WeakMap,G=M.createTreeWalker(M,129);function Y(t,e){if(!H(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const X=(t,e)=>{const a=t.length-1,r=[];let i,s=2===e?"<svg>":3===e?"<math>":"",n=U;for(let e=0;e<a;e++){const a=t[e];let o,d,c=-1,l=0;for(;l<a.length&&(n.lastIndex=l,d=n.exec(a),null!==d);)l=n.lastIndex,n===U?"!--"===d[1]?n=N:void 0!==d[1]?n=j:void 0!==d[2]?(L.test(d[2])&&(i=RegExp("</"+d[2],"g")),n=q):void 0!==d[3]&&(n=q):n===q?">"===d[0]?(n=i??U,c=-1):void 0===d[1]?c=-2:(c=n.lastIndex-d[2].length,o=d[1],n=void 0===d[3]?q:'"'===d[3]?D:I):n===D||n===I?n=q:n===N||n===j?n=U:(n=q,i=void 0);const h=n===q&&t[e+1].startsWith("/>")?" ":"";s+=n===U?a+z:c>=0?(r.push(o),a.slice(0,c)+C+a.slice(c)+S+h):a+S+(-2===c?e:h)}return[Y(t,s+(t[a]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class J{constructor({strings:t,_$litType$:e},a){let r;this.parts=[];let i=0,s=0;const n=t.length-1,o=this.parts,[d,c]=X(t,e);if(this.el=J.createElement(d,a),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=G.nextNode())&&o.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(C)){const e=c[s++],a=r.getAttribute(t).split(S),n=/([.?@])?(.*)/.exec(e);o.push({type:1,index:i,name:n[2],strings:a,ctor:"."===n[1]?et:"?"===n[1]?at:"@"===n[1]?rt:tt}),r.removeAttribute(t)}else t.startsWith(S)&&(o.push({type:6,index:i}),r.removeAttribute(t));if(L.test(r.tagName)){const t=r.textContent.split(S),e=t.length-1;if(e>0){r.textContent=A?A.emptyScript:"";for(let a=0;a<e;a++)r.append(t[a],P()),G.nextNode(),o.push({type:2,index:++i});r.append(t[e],P())}}}else if(8===r.nodeType)if(r.data===T)o.push({type:2,index:i});else{let t=-1;for(;-1!==(t=r.data.indexOf(S,t+1));)o.push({type:7,index:i}),t+=S.length-1}i++}}static createElement(t,e){const a=M.createElement("template");return a.innerHTML=t,a}}function K(t,e,a=t,r){if(e===V)return e;let i=void 0!==r?a._$Co?.[r]:a._$Cl;const s=O(e)?void 0:e._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(!1),void 0===s?i=void 0:(i=new s(t),i._$AT(t,a,r)),void 0!==r?(a._$Co??=[])[r]=i:a._$Cl=i),void 0!==i&&(e=K(t,i._$AS(t,e.values),i,r)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:a}=this._$AD,r=(t?.creationScope??M).importNode(e,!0);G.currentNode=r;let i=G.nextNode(),s=0,n=0,o=a[0];for(;void 0!==o;){if(s===o.index){let e;2===o.type?e=new Q(i,i.nextSibling,this,t):1===o.type?e=new o.ctor(i,o.name,o.strings,this,t):6===o.type&&(e=new it(i,this,t)),this._$AV.push(e),o=a[++n]}s!==o?.index&&(i=G.nextNode(),s++)}return G.currentNode=M,r}p(t){let e=0;for(const a of this._$AV)void 0!==a&&(void 0!==a.strings?(a._$AI(t,a,e),e+=a.strings.length-2):a._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,a,r){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=a,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),O(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>H(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:a}=t,r="number"==typeof a?this._$AC(t):(void 0===a.el&&(a.el=J.createElement(Y(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new Z(r,this),a=t.u(this.options);t.p(e),this.T(a),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new J(t)),e}k(t){H(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let a,r=0;for(const i of t)r===e.length?e.push(a=new Q(this.O(P()),this.O(P()),this,this.options)):a=e[r],a._$AI(i),r++;r<e.length&&(this._$AR(a&&a._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=$(t).nextSibling;$(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,a,r,i){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=i,a.length>2||""!==a[0]||""!==a[1]?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=W}_$AI(t,e=this,a,r){const i=this.strings;let s=!1;if(void 0===i)t=K(this,t,e,0),s=!O(t)||t!==this._$AH&&t!==V,s&&(this._$AH=t);else{const r=t;let n,o;for(t=i[0],n=0;n<i.length-1;n++)o=K(this,r[a+n],e,n),o===V&&(o=this._$AH[n]),s||=!O(o)||o!==this._$AH[n],o===W?t=W:t!==W&&(t+=(o??"")+i[n+1]),this._$AH[n]=o}s&&!r&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class at extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class rt extends tt{constructor(t,e,a,r,i){super(t,e,a,r,i),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??W)===V)return;const a=this._$AH,r=t===W&&a!==W||t.capture!==a.capture||t.once!==a.once||t.passive!==a.passive,i=t!==W&&(a===W||r);r&&this.element.removeEventListener(this.name,this,a),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,a){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const st=k.litHtmlPolyfillSupport;st?.(J,Q),(k.litHtmlVersions??=[]).push("3.3.3");const nt=globalThis;class ot extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,a)=>{const r=a?.renderBefore??e;let i=r._$litPart$;if(void 0===i){const t=a?.renderBefore??null;r._$litPart$=i=new Q(e.insertBefore(P(),t),t,void 0,a??{})}return i._$AI(t),i})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}ot._$litElement$=!0,ot.finalized=!0,nt.litElementHydrateSupport?.({LitElement:ot});const dt=nt.litElementPolyfillSupport;dt?.({LitElement:ot}),(nt.litElementVersions??=[]).push("4.2.2");const ct={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:y},lt=(t=ct,e,a)=>{const{kind:r,metadata:i}=a;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===r&&((t=Object.create(t)).wrapped=!0),s.set(a.name,t),"accessor"===r){const{name:r}=a;return{set(a){const i=e.get.call(this);e.set.call(this,a),this.requestUpdate(r,i,t,!0,a)},init(e){return void 0!==e&&this.C(r,void 0,t,e),e}}}if("setter"===r){const{name:r}=a;return function(a){const i=this[r];e.call(this,a),this.requestUpdate(r,i,t,!0,a)}}throw Error("Unsupported decorator location: "+r)};function ht(t){return(e,a)=>"object"==typeof a?lt(t,e,a):((t,e,a)=>{const r=e.hasOwnProperty(a);return e.constructor.createProperty(a,t),r?Object.getOwnPropertyDescriptor(e,a):void 0})(t,e,a)}function pt(t){return ht({...t,state:!0,attribute:!1})}const gt=n`
  :host {
    /* Classic — inherits the user's HA theme so it fits any dashboard. */
    --rad-bg: var(--ha-card-background, var(--card-background-color, #fff));
    --rad-fg: var(--primary-text-color, #212121);
    --rad-dim: var(--secondary-text-color, #727272);
    --rad-accent-rgb: var(--rgb-accent-color, 3, 169, 244);
    --rad-surface: rgba(var(--rad-accent-rgb), 0.08);
    --rad-radius: var(--ha-card-border-radius, 12px);
    --rad-font: inherit;
    --rad-title-font: inherit;
    --rad-title-weight: 600;
    --rad-title-spacing: normal;
    --rad-title-transform: none;
    --rad-glow: none;
    --rad-bar-radius: 2px;
    --rad-bar-period: 900ms;
    --rad-bar-ease: cubic-bezier(0.4, 0, 0.2, 1);
    --rad-bar-gap: 3px;
    --rad-eq-anim: rad-bounce;
    --rad-ticker-period: 14s;

    /* --- surfaces, lines and depth -------------------------------------
       A small elevation system rather than ad-hoc shadows. Shadows are tinted
       toward the theme's own darkness instead of pure black, and the light
       source is consistently top-left, which is what makes layered depth read
       as deliberate rather than muddy. Two shadows, not five. */
    --rad-well: rgba(0, 0, 0, 0.07);
    --rad-line: rgba(0, 0, 0, 0.13);
    --rad-line-strong: rgba(0, 0, 0, 0.26);
    --rad-inset: inset 0 1px 2px rgba(0, 0, 0, 0.16),
      inset 0 -1px 0 rgba(255, 255, 255, 0.5);
    --rad-shadow-sm: 0 1px 2px rgba(16, 20, 28, 0.18);
    --rad-shadow-md: 0 2px 4px rgba(16, 20, 28, 0.14),
      0 8px 18px rgba(16, 20, 28, 0.12);
    --rad-thumb: #ffffff;
    --rad-menu-bg: #ffffff;
    --rad-menu-fg: #1d2027;
    --rad-btn-bg: rgba(var(--rad-accent-rgb), 0.14);
    --rad-btn-fg: rgb(var(--rad-accent-rgb));
    /* Text/icon colour on a SOLID accent fill (the primary play button).
       Overridden per theme wherever the accent is light enough that white
       would be unreadable on it. */
    --rad-on-accent: #ffffff;
    /* Bands reserved for themes whose artwork runs along an edge, so a motif
       never collides with a control. */
    --rad-pad-bottom: 18px;
    --rad-pad-x: 18px;
    /* The ticker is a *display*, not a label — a monospaced, letter-spaced
       stack reads as one on every theme, the way a real tuner does. */
    --rad-ticker-font: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
    --rad-border: none;
    --rad-shadow: none;
  }

  /* --- Retro: warm paper, slab type, square bars -------------------------- */
  :host([data-theme="retro"]) {
    --rad-bg: linear-gradient(170deg, #e8d9b5 0%, #d4c19a 100%);
    --rad-fg: #3a2c1a;
    --rad-dim: #7a6647;
    --rad-accent-rgb: 178, 88, 34;
    --rad-surface: rgba(58, 44, 26, 0.08);
    /* Dial faces were set in geometric sans, not typewriter type — Courier
       read as "terminal", which is the wrong decade entirely. */
    --rad-font: Optima, "Gill Sans", "Trebuchet MS", sans-serif;
    --rad-title-font: Futura, "Century Gothic", "Trebuchet MS", sans-serif;
    --rad-title-transform: uppercase;
    --rad-title-spacing: 0.14em;
    --rad-title-weight: 500;
    --rad-pad-x: 28px;
    --rad-pad-bottom: 32px;
    --rad-bar-radius: 0;
    --rad-bar-period: 1100ms;
    --rad-ticker-period: 17s;
    --rad-border: 1px solid rgba(58, 44, 26, 0.25);
    --rad-btn-bg: rgba(178, 88, 34, 0.16);
  }

  /* --- 80s: neon on deep violet, fast and glowing ------------------------- */
  :host([data-theme="eighties"]) {
    --rad-pad-bottom: 34px;
    --rad-well: rgba(0,0,0,0.36);
    --rad-line: rgba(255,47,208,0.34);
    --rad-line-strong: rgba(255,47,208,0.7);
    --rad-inset: inset 0 1px 2px rgba(0, 0, 0, 0.42),
      inset 0 -1px 0 rgba(255, 255, 255, 0.1);
    --rad-menu-bg: #2a0148;
    --rad-menu-fg: #ffe9ff;
    --rad-thumb: #ffe9ff;
    --rad-bg: linear-gradient(160deg, #1a0033 0%, #35006b 60%, #4a007d 100%);
    --rad-fg: #ffe9ff;
    --rad-dim: #c39bd8;
    --rad-accent-rgb: 255, 47, 208;
    --rad-surface: rgba(255, 47, 208, 0.12);
    --rad-glow: 0 0 6px rgba(var(--rad-accent-rgb), 0.9),
      0 0 16px rgba(var(--rad-accent-rgb), 0.45);
    --rad-bar-period: 620ms;
    --rad-ticker-period: 9s;
    --rad-bar-radius: 1px;
    --rad-title-transform: uppercase;
    --rad-title-spacing: 0.12em;
    --rad-shadow: inset 0 0 40px rgba(255, 47, 208, 0.12);
  }

  /* --- Space Age: cold blue, slow drifting bars --------------------------- */
  :host([data-theme="spaceage"]) {
    --rad-on-accent: #04121f;
    --rad-well: rgba(0,0,0,0.34);
    --rad-line: rgba(96,205,255,0.26);
    --rad-line-strong: rgba(96,205,255,0.6);
    --rad-inset: inset 0 1px 2px rgba(0, 0, 0, 0.42),
      inset 0 -1px 0 rgba(255, 255, 255, 0.1);
    --rad-menu-bg: #0d1726;
    --rad-menu-fg: #d9ecff;
    --rad-thumb: #d9ecff;
    --rad-bg: radial-gradient(circle at 25% 15%, #16283f 0%, #070d17 70%);
    --rad-fg: #d9ecff;
    --rad-dim: #7b93ad;
    --rad-accent-rgb: 96, 205, 255;
    --rad-surface: rgba(96, 205, 255, 0.1);
    --rad-glow: 0 0 10px rgba(var(--rad-accent-rgb), 0.7);
    --rad-bar-period: 1500ms;
    --rad-ticker-period: 20s;
    --rad-bar-ease: ease-in-out;
    --rad-bar-radius: 6px;
    --rad-eq-anim: rad-drift;
  }

  /* --- Transparent pair --------------------------------------------------- */
  /* The classic failure here is unreadable text over an unknown background, so
     the dark variant sets an EXPLICIT colour rather than inheriting
     --primary-text-color, which flips with the user's HA theme. */
  :host([data-theme="transparent"]),
  :host([data-theme="transparent_dark"]) {
    --rad-well: rgba(255,255,255,0.14);
    --rad-line: rgba(255,255,255,0.24);
    --rad-line-strong: rgba(255,255,255,0.5);
    --rad-inset: inset 0 1px 2px rgba(0, 0, 0, 0.42),
      inset 0 -1px 0 rgba(255, 255, 255, 0.1);
    --rad-menu-bg: #1d2027;
    --rad-menu-fg: #f0f2f6;
    --rad-thumb: #ffffff;
    --ha-card-background: transparent;
    --ha-card-box-shadow: none;
    --ha-card-border-width: 0;
    --rad-bg: transparent;
    --rad-surface: rgba(128, 128, 128, 0.12);
    --rad-shadow: none;
  }
  :host([data-theme="transparent_dark"]) {
    --rad-fg: #ffffff;
    --rad-dim: rgba(255, 255, 255, 0.72);
    --rad-accent-rgb: 255, 255, 255;
    /* Accent IS white here, so the solid primary button needs dark content. */
    --rad-on-accent: #14181f;
    --rad-btn-fg: #ffffff;
    --rad-btn-bg: rgba(255, 255, 255, 0.16);
    --rad-text-shadow: 0 1px 3px rgba(0, 0, 0, 0.65);
  }

  /* --- Ancient: parchment and faded ink ---------------------------------- */
  :host([data-theme="ancient"]) {
    --rad-pad-bottom: 34px;
    --rad-bg: linear-gradient(175deg, #efe4cc 0%, #ddcdab 100%);
    --rad-fg: #4a3a22;
    --rad-dim: #8a7550;
    --rad-accent-rgb: 140, 100, 45;
    --rad-surface: rgba(74, 58, 34, 0.09);
    --rad-font: Georgia, "Times New Roman", serif;
    --rad-title-font: Georgia, "Times New Roman", serif;
    --rad-title-spacing: 0.06em;
    --rad-bar-period: 1700ms;
    --rad-ticker-period: 24s;
    --rad-bar-radius: 1px;
    --rad-border: 1px solid rgba(74, 58, 34, 0.3);
    --rad-eq-anim: rad-drift;
  }

  /* --- Steampunk: brass on leather --------------------------------------- */
  :host([data-theme="steampunk"]) {
    --rad-pad-x: 30px;
    --rad-pad-bottom: 24px;
    --rad-on-accent: #2a1a08;
    --rad-well: rgba(0,0,0,0.4);
    --rad-line: rgba(205,152,72,0.34);
    --rad-line-strong: rgba(205,152,72,0.7);
    --rad-inset: inset 0 1px 2px rgba(0, 0, 0, 0.42),
      inset 0 -1px 0 rgba(255, 255, 255, 0.1);
    --rad-menu-bg: #2a1c12;
    --rad-menu-fg: #e8c88a;
    --rad-thumb: #f2dcae;
    --rad-bg: linear-gradient(165deg, #3a2a1c 0%, #241811 100%);
    --rad-fg: #e8c88a;
    --rad-dim: #a8845a;
    --rad-accent-rgb: 205, 152, 72;
    --rad-surface: rgba(205, 152, 72, 0.12);
    --rad-font: Georgia, serif;
    --rad-title-transform: uppercase;
    --rad-title-spacing: 0.1em;
    --rad-glow: 0 0 6px rgba(var(--rad-accent-rgb), 0.5);
    --rad-bar-period: 1300ms;
    --rad-bar-radius: 0;
    --rad-border: 1px solid rgba(205, 152, 72, 0.35);
    --rad-shadow: inset 0 0 30px rgba(0, 0, 0, 0.5);
  }

  /* --- Tropical: sunset coral / teal ------------------------------------- */
  :host([data-theme="tropical"]) {
    --rad-pad-bottom: 36px;
    --rad-on-accent: #3d2410;
    --rad-well: rgba(0,0,0,0.28);
    --rad-line: rgba(255, 233, 130, 0.28);
    --rad-line-strong: rgba(255, 233, 130, 0.6);
    --rad-inset: inset 0 1px 2px rgba(0, 0, 0, 0.42),
      inset 0 -1px 0 rgba(255, 255, 255, 0.1);
    --rad-menu-bg: #0f3340;
    --rad-menu-fg: #fff8f0;
    --rad-thumb: #fff8f0;
    /* Dusk over water rather than a hot magenta ramp: it stays dark enough for
       white text everywhere, and gives the palm silhouettes something to be a
       silhouette *against*. The sunset is a glow in the artwork layer. */
    --rad-bg: linear-gradient(
      180deg,
      #0e2c39 0%,
      #16495a 48%,
      #35757f 76%,
      #cf7350 92%,
      #ffb066 100%
    );
    --rad-fg: #fff8f0;
    --rad-dim: rgba(255, 248, 240, 0.78);
    --rad-accent-rgb: 255, 233, 130;
    --rad-surface: rgba(255, 255, 255, 0.16);
    --rad-glow: 0 0 8px rgba(var(--rad-accent-rgb), 0.6);
    --rad-bar-period: 750ms;
    --rad-ticker-period: 11s;
    --rad-bar-radius: 999px;
    --rad-btn-bg: rgba(255, 255, 255, 0.22);
    --rad-btn-fg: #fff8f0;
    --rad-text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  }

  /* --- Arctic: pale ice, crisp and quiet --------------------------------- */
  :host([data-theme="arctic"]) {
    --rad-bg: linear-gradient(170deg, #f2f8fc 0%, #d8e9f4 100%);
    --rad-fg: #17394f;
    --rad-dim: #5b7b90;
    --rad-accent-rgb: 60, 150, 200;
    --rad-surface: rgba(23, 57, 79, 0.07);
    --rad-bar-period: 1600ms;
    --rad-bar-ease: ease-in-out;
    --rad-bar-radius: 999px;
    --rad-border: 1px solid rgba(23, 57, 79, 0.14);
    --rad-eq-anim: rad-drift;
  }
`,ut=n`
  @keyframes rad-bounce {
    from {
      transform: scaleY(0.12);
    }
    to {
      transform: scaleY(1);
    }
  }

  /* Ticker. Translating a track that holds two identical copies of the text by
     exactly -50% loops seamlessly with no jump. transform only, so it stays
     GPU-composited like the bars. */
  @keyframes rad-marquee {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }

  /* Gentler, less metronomic — used by the calmer themes. */
  @keyframes rad-drift {
    0% {
      transform: scaleY(0.25);
    }
    40% {
      transform: scaleY(0.85);
    }
    70% {
      transform: scaleY(0.45);
    }
    100% {
      transform: scaleY(1);
    }
  }
`,bt=n`
  ha-card {
    position: relative;
    isolation: isolate;
  }
  /* Content above artwork. */
  ha-card > * {
    position: relative;
    z-index: 1;
  }
  ha-card::before,
  ha-card::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background-repeat: no-repeat;
  }
  /* Artwork is held back where the content sits and allowed to be strong at the
     edges. This is one mask instead of ten hand-tuned positions, and it is what
     stops motifs from competing with the text they sit behind — the difference
     between "illustrated" and "cluttered". Themes that ARE their background
     (the base gradient, scanlines) are unaffected: this only masks ::before. */
  ha-card::before {
    -webkit-mask-image: radial-gradient(
      115% 90% at 50% 48%,
      rgba(0, 0, 0, 0.22) 0%,
      rgba(0, 0, 0, 0.45) 38%,
      rgba(0, 0, 0, 0.85) 72%,
      #000 100%
    );
    mask-image: radial-gradient(
      115% 90% at 50% 48%,
      rgba(0, 0, 0, 0.22) 0%,
      rgba(0, 0, 0, 0.45) 38%,
      rgba(0, 0, 0, 0.85) 72%,
      #000 100%
    );
  }

  /* ---- Classic: deliberately bare -------------------------------------
     It inherits the user's HA theme so it drops into any dashboard; artwork
     would defeat that. A whisper of a sheen only. */
  :host([data-theme="classic"]) ha-card::before {
    background-image: radial-gradient(
      120% 80% at 50% -20%,
      rgba(var(--rad-accent-rgb), 0.1),
      transparent 60%
    );
  }

  /* ---- Retro: an actual tabletop radio ---------------------------------
     The card IS the set: wooden cabinet sides, a tuning-dial scale with major
     and minor ticks across the top, and a perforated speaker grille along the
     bottom. Both bands sit in padding reserved by --rad-pad-x/--rad-pad-bottom,
     so they read as cabinet rather than as clutter behind the controls. */
  :host([data-theme="retro"]) ha-card::before {
    background-image:
      /* major dial ticks */
      repeating-linear-gradient(
        90deg,
        rgba(58, 44, 26, 0.6) 0 1.5px,
        transparent 1.5px 44px
      ),
      /* minor dial ticks */
        repeating-linear-gradient(
          90deg,
          rgba(58, 44, 26, 0.3) 0 1px,
          transparent 1px 11px
        ),
      /* perforated speaker grille, staggered like a real one */
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='9' height='27'%3E%3Cg fill='%233a2c1a' fill-opacity='0.42'%3E%3Ccircle cx='2.2' cy='4' r='1.5'/%3E%3Ccircle cx='6.7' cy='8.5' r='1.5'/%3E%3Ccircle cx='2.2' cy='13' r='1.5'/%3E%3Ccircle cx='6.7' cy='17.5' r='1.5'/%3E%3Ccircle cx='2.2' cy='22' r='1.5'/%3E%3C/g%3E%3C/svg%3E"),
      /* cabinet sides */
        linear-gradient(
          90deg,
          #5c3a1c 0 13px,
          rgba(120, 78, 38, 0.55) 13px 20px,
          transparent 20px
        ),
      linear-gradient(
        270deg,
        #5c3a1c 0 13px,
        rgba(120, 78, 38, 0.55) 13px 20px,
        transparent 20px
      ),
      /* paper grain */
        repeating-linear-gradient(
          96deg,
          rgba(58, 44, 26, 0.05) 0 1px,
          transparent 1px 5px
        );
    background-size:
      100% 15px,
      100% 9px,
      9px 27px,
      100% 100%,
      100% 100%,
      100% 100%;
    background-position:
      left top 7px,
      left top 7px,
      left 24px bottom 5px,
      left,
      right,
      center;
    background-repeat: no-repeat, no-repeat, repeat-x, no-repeat, no-repeat,
      repeat;
    opacity: 0.85;
  }
  /* Red tuning needle on the dial, plus glass sheen. On ::after so the needle
     stays crisp — ::before is masked back where the content sits. */
  :host([data-theme="retro"]) ha-card::after {
    background-image: linear-gradient(
        90deg,
        transparent calc(63% - 1px),
        rgba(178, 38, 30, 0.9) calc(63% - 1px) calc(63% + 1px),
        transparent calc(63% + 1px)
      ),
      linear-gradient(118deg, rgba(255, 255, 255, 0.22) 0 20%, transparent 40%);
    background-size:
      100% 21px,
      100% 100%;
    background-position:
      left top 4px,
      center;
    background-repeat: no-repeat, no-repeat;
  }

  /* ---- 80s: synthwave sun + perspective grid + scanlines --------------- */
  :host([data-theme="eighties"]) ha-card::before {
    background-image:
      /* horizon grid */
      repeating-linear-gradient(
        90deg,
        rgba(255, 47, 208, 0.5) 0 1px,
        transparent 1px 26px
      ),
      repeating-linear-gradient(
        0deg,
        rgba(94, 234, 255, 0.42) 0 1px,
        transparent 1px 14px
      ),
      /* banded sun */
        repeating-linear-gradient(
          0deg,
          transparent 0 6px,
          rgba(26, 0, 51, 0.85) 6px 9px
        ),
      radial-gradient(
        circle at 50% 100%,
        #ffe066 0 8%,
        #ff2fd0 9% 34%,
        transparent 35%
      );
    background-size:
      100% 44%,
      100% 44%,
      64% 40%,
      64% 40%;
    background-position:
      bottom,
      bottom,
      bottom 6px center,
      bottom 6px center;
    opacity: 0.75;
  }
  /* Synthwave is an edge composition — the horizon must stay saturated. The
     default centre-mask would mute exactly the part that carries the theme, so
     it is replaced with a top-down one: dim behind the title, full at the sun. */
  :host([data-theme="eighties"]) ha-card::before {
    -webkit-mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.25) 0 34%,
      #000 78%
    );
    mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.25) 0 34%,
      #000 78%
    );
  }
  :host([data-theme="eighties"]) ha-card::after {
    background-image: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.16) 0 1px,
      transparent 1px 3px
    );
  }

  /* ---- Space Age: starfield, nebula, planet limb ----------------------- */
  :host([data-theme="spaceage"]) ha-card::before {
    background-image:
      /* A tiled field of ~20 stars at mixed sizes and brightnesses. Six lone
         radial-gradients read as dust specks on the glass; a field reads as
         sky. */
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='140'%3E%3Cg fill='%23ffffff'%3E%3Ccircle cx='14' cy='22' r='1.1' opacity='.9'/%3E%3Ccircle cx='47' cy='9' r='.6' opacity='.55'/%3E%3Ccircle cx='78' cy='31' r='1.4' opacity='.95'/%3E%3Ccircle cx='112' cy='16' r='.7' opacity='.6'/%3E%3Ccircle cx='150' cy='27' r='1' opacity='.8'/%3E%3Ccircle cx='168' cy='55' r='.6' opacity='.5'/%3E%3Ccircle cx='131' cy='63' r='1.2' opacity='.85'/%3E%3Ccircle cx='96' cy='72' r='.6' opacity='.5'/%3E%3Ccircle cx='60' cy='58' r='.9' opacity='.7'/%3E%3Ccircle cx='24' cy='69' r='1.3' opacity='.9'/%3E%3Ccircle cx='8' cy='104' r='.7' opacity='.6'/%3E%3Ccircle cx='42' cy='118' r='1.1' opacity='.8'/%3E%3Ccircle cx='73' cy='99' r='.6' opacity='.45'/%3E%3Ccircle cx='104' cy='126' r='1' opacity='.75'/%3E%3Ccircle cx='139' cy='108' r='.7' opacity='.55'/%3E%3Ccircle cx='163' cy='131' r='1.2' opacity='.85'/%3E%3Ccircle cx='88' cy='46' r='.5' opacity='.4'/%3E%3Ccircle cx='30' cy='42' r='.5' opacity='.4'/%3E%3Ccircle cx='120' cy='88' r='.5' opacity='.4'/%3E%3Ccircle cx='55' cy='134' r='.6' opacity='.5'/%3E%3C/g%3E%3C/svg%3E"),
      /* nebula */
        radial-gradient(
          60% 50% at 78% 18%,
          rgba(96, 205, 255, 0.28),
          transparent 70%
        ),
      radial-gradient(
        55% 45% at 18% 82%,
        rgba(168, 96, 255, 0.24),
        transparent 70%
      ),
      /* planet limb, bottom right */
        radial-gradient(
          circle at 118% 128%,
          rgba(96, 205, 255, 0.5) 0 22%,
          rgba(10, 20, 40, 0.9) 22.6% 30%,
          transparent 31%
        );
    background-size:
      180px 140px,
      100% 100%,
      100% 100%,
      100% 100%;
    background-repeat: repeat, no-repeat, no-repeat, no-repeat;
  }

  /* ---- Transparent pair: nothing, by definition ------------------------ */
  :host([data-theme="transparent"]) ha-card::before,
  :host([data-theme="transparent"]) ha-card::after,
  :host([data-theme="transparent_dark"]) ha-card::before,
  :host([data-theme="transparent_dark"]) ha-card::after {
    background-image: none;
  }

  /* ---- Ancient: parchment mottling + Greek key border ------------------ */
  :host([data-theme="ancient"]) ha-card::before {
    background-image:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Cpath d='M4 34V10h26v18H14v-9h11' fill='none' stroke='%234a3a22' stroke-width='3'/%3E%3C/svg%3E"),
      radial-gradient(
        45% 40% at 20% 25%,
        rgba(140, 100, 45, 0.22),
        transparent 70%
      ),
      radial-gradient(
        50% 45% at 82% 70%,
        rgba(120, 84, 38, 0.2),
        transparent 70%
      ),
      radial-gradient(
        35% 30% at 60% 12%,
        rgba(90, 62, 28, 0.16),
        transparent 70%
      );
    background-size:
      19px 19px,
      100% 100%,
      100% 100%,
      100% 100%;
    background-position:
      bottom 7px left 6px,
      center,
      center,
      center;
    background-repeat: repeat-x, no-repeat, no-repeat, no-repeat;
    opacity: 0.55;
  }
  /* The key is a border band, not a centre motif — keep the bottom edge crisp
     and hold the mottling back behind the text instead. */
  :host([data-theme="ancient"]) ha-card::before {
    -webkit-mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.5) 0 60%,
      #000 88%
    );
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0 60%, #000 88%);
  }

  /* ---- Steampunk: brass pipes, rivets and a gear ----------------------- */
  :host([data-theme="steampunk"]) ha-card::before {
    background-image:
      /* gear, bottom right */
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cg fill='%23cd9848'%3E%3Crect x='45' y='1' width='10' height='16' rx='2'/%3E%3Crect x='45' y='83' width='10' height='16' rx='2'/%3E%3Crect x='1' y='45' width='16' height='10' rx='2'/%3E%3Crect x='83' y='45' width='16' height='10' rx='2'/%3E%3Crect x='45' y='1' width='10' height='16' rx='2' transform='rotate(45 50 50)'/%3E%3Crect x='45' y='83' width='10' height='16' rx='2' transform='rotate(45 50 50)'/%3E%3Crect x='1' y='45' width='16' height='10' rx='2' transform='rotate(45 50 50)'/%3E%3Crect x='83' y='45' width='16' height='10' rx='2' transform='rotate(45 50 50)'/%3E%3C/g%3E%3Ccircle cx='50' cy='50' r='33' fill='none' stroke='%23cd9848' stroke-width='8'/%3E%3Ccircle cx='50' cy='50' r='11' fill='none' stroke='%23cd9848' stroke-width='7'/%3E%3C/svg%3E"),
      /* rivets down both pipes */
        radial-gradient(
          circle,
          rgba(232, 200, 138, 0.55) 1.6px,
          transparent 2.1px
        ),
      /* left + right pipes with brass sheen */
        linear-gradient(
          90deg,
          rgba(80, 54, 28, 0.9) 0 4px,
          rgba(205, 152, 72, 0.85) 4px 9px,
          rgba(247, 222, 170, 0.9) 9px 12px,
          rgba(150, 104, 46, 0.85) 12px 18px,
          rgba(70, 46, 24, 0.9) 18px 22px,
          transparent 22px
        ),
      linear-gradient(
        270deg,
        rgba(80, 54, 28, 0.9) 0 4px,
        rgba(205, 152, 72, 0.85) 4px 9px,
        rgba(247, 222, 170, 0.9) 9px 12px,
        rgba(150, 104, 46, 0.85) 12px 18px,
        rgba(70, 46, 24, 0.9) 18px 22px,
        transparent 22px
      ),
      /* leather grain */
        repeating-linear-gradient(
          32deg,
          rgba(0, 0, 0, 0.12) 0 2px,
          transparent 2px 6px
        );
    background-size:
      118px 118px,
      22px 22px,
      100% 100%,
      100% 100%,
      100% 100%;
    background-position:
      right -46px bottom -40px,
      left 6px top,
      left,
      right,
      center;
    background-repeat: no-repeat, repeat-y, no-repeat, no-repeat, repeat;
    opacity: 0.7;
  }
  /* Pipes and gear are edge furniture; the leather in the middle is all that
     should show through behind the controls. */
  :host([data-theme="steampunk"]) ha-card::before {
    -webkit-mask-image: radial-gradient(
      100% 85% at 50% 50%,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.6) 55%,
      #000 92%
    );
    mask-image: radial-gradient(
      100% 85% at 50% 50%,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.6) 55%,
      #000 92%
    );
  }

  /* ---- Tropical: dusk over water --------------------------------------
     Two palms in near-black silhouette along the bottom edge, a low sun and
     its reflection on the right. Silhouette-against-glow is what makes this
     read as a place; the previous version painted mid-green leaves on hot
     magenta, which read as a smudge. */
  :host([data-theme="tropical"]) ha-card::before {
    background-image:
      /* palms, bottom left — trunks curve out of the corner */
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='170' height='150' viewBox='0 0 170 150'%3E%3Cg fill='%2306181d'%3E%3Cpath d='M40 150c2-40 9-68 26-96l8 4c-16 27-24 55-26 92z'/%3E%3Cpath d='M74 52C60 36 38 32 22 42c17-2 34 3 45 15z'/%3E%3Cpath d='M74 52c17-14 41-11 53 4-17-7-37-7-48 1z'/%3E%3Cpath d='M74 52C68 30 49 14 28 12c17 12 32 26 39 44z'/%3E%3Cpath d='M74 52c8-21 30-33 51-29-19 5-36 14-44 32z'/%3E%3Cpath d='M74 52c-4-22 6-41 24-49-11 15-18 31-16 50z'/%3E%3Cpath d='M126 150c1-28 5-48 13-66l6 3c-8 18-11 37-12 64z'/%3E%3Cpath d='M143 82c-11-11-27-12-38-4 12-2 25 1 32 8z'/%3E%3Cpath d='M143 82c10-11 27-11 36-2-12-3-26-2-33 4z'/%3E%3Cpath d='M143 82c-2-16 5-28 17-33-8 10-13 21-12 34z'/%3E%3C/g%3E%3C/svg%3E"),
      /* shimmer, confined to the water at the very bottom */
        repeating-linear-gradient(
          0deg,
          rgba(255, 236, 200, 0.22) 0 1px,
          transparent 1px 6px
        ),
      /* low sun, sitting on the horizon */
        radial-gradient(
          circle at 76% 92%,
          rgba(255, 246, 214, 0.95) 0 5%,
          rgba(255, 196, 122, 0.7) 5.5% 11%,
          rgba(255, 150, 96, 0.3) 12% 24%,
          transparent 28%
        );
    background-size:
      168px 148px,
      100% 15%,
      100% 100%;
    background-position:
      left -14px bottom -6px,
      bottom,
      center;
    background-repeat: no-repeat, repeat-x, no-repeat;
    opacity: 0.95;
  }
  /* Everything here is horizon composition, so hold the mask back only across
     the band of sky where the title and ticker sit. */
  :host([data-theme="tropical"]) ha-card::before {
    -webkit-mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3) 0 42%,
      #000 80%
    );
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0 42%, #000 80%);
  }

  /* ---- Arctic: snowflakes, frost and aurora ---------------------------- */
  :host([data-theme="arctic"]) ha-card::before {
    background-image:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60' stroke='%23ffffff' stroke-width='2.4' stroke-linecap='round' fill='none'%3E%3Cpath d='M30 8v44M11 19l38 22M49 19L11 41'/%3E%3Cpath d='M30 15l-5 5m5-5l5 5m-5 30l-5-5m5 5l5-5M17 22l1 7m-1-7l-7 1m36 15l-1-7m1 7l7-1M17 38l-7-1m7 1l1 7m26-23l7 1m-7-1l-1-7'/%3E%3C/svg%3E"),
      /* aurora */
        radial-gradient(
          70% 40% at 25% -8%,
          rgba(120, 230, 200, 0.32),
          transparent 70%
        ),
      radial-gradient(
        60% 38% at 78% -4%,
        rgba(140, 180, 255, 0.3),
        transparent 70%
      ),
      /* frost at the corners */
        radial-gradient(
          40% 40% at 0% 100%,
          rgba(255, 255, 255, 0.55),
          transparent 70%
        ),
      radial-gradient(
        35% 35% at 100% 0%,
        rgba(255, 255, 255, 0.5),
        transparent 70%
      );
    background-size:
      54px 54px,
      100% 100%,
      100% 100%,
      100% 100%,
      100% 100%;
    background-position:
      right 12px top 10px,
      center,
      center,
      center,
      center;
    background-repeat: no-repeat, no-repeat, no-repeat, no-repeat, no-repeat;
    opacity: 0.6;
  }
`,ft="0.4.0";console.info(`%c HA-RADIO-CARD %c ${ft} `,"color:#fff;background:#03a9f4","color:#03a9f4;background:#fff");const mt=t=>B`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d=${t} />
  </svg>`,xt=mt("M8 5.5v13l11-6.5z"),vt=mt("M7 7h10v10H7z"),yt=mt("M7 6h2.2v12H7zm10 0v12l-8.2-6z"),wt=mt("M17 6h-2.2v12H17zM7 6v12l8.2-6z"),_t=mt("M3 10v4h3.2L11 18V6L6.2 10zm11.6 2a3.4 3.4 0 0 0-1.9-3.06v6.12A3.4 3.4 0 0 0 14.6 12z"),kt=mt("M2 17.5v3h3a3 3 0 0 0-3-3zm0-4v1.8a5.2 5.2 0 0 1 5.2 5.2H9A7 7 0 0 0 2 13.5zm0-4v1.8a9.2 9.2 0 0 1 9.2 9.2H13A11 11 0 0 0 2 9.5zM20 3H4a2 2 0 0 0-2 2v2h2V5h16v14h-6v2h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z");let $t=class extends ot{constructor(){super(...arguments),this._volume=.35,this._tickerOverflows=!1,this._phases=[],this._touchedVolume=!1}setConfig(t){if(!t)throw new Error("Invalid configuration");"theme"in t&&console.warn("ha-radio-card: `theme` is not a card option. Set the theme in the HA Radio integration (Settings → Devices & Services → HA Radio → Configure); it applies to every HA Radio card."),this._config=t,t.target&&(this._target=t.target),this._phases=[]}getCardSize(){return 3}getGridOptions(){return{columns:12,rows:"auto",min_columns:6}}connectedCallback(){super.connectedCallback(),this._load()}disconnectedCallback(){super.disconnectedCallback(),this._unsub?.then(t=>t()).catch(()=>{}),this._unsub=void 0}async _load(){if(this.hass&&!this._unsub)try{await this._fetch(),this._unsub=this.hass.connection.subscribeMessage(()=>{this._fetch()},{type:"ha_radio/subscribe"})}catch(t){this._error=`Could not reach the HA Radio integration: ${t}`}}willUpdate(){const t=this._radio?.theme??"classic";this.getAttribute("data-theme")!==t&&this.setAttribute("data-theme",t)}updated(){this._measureTicker()}_measureTicker(){const t=this.renderRoot.querySelector(".ticker"),e=this.renderRoot.querySelector(".ticker-track span");if(!t||!e)return;const a=parseFloat(getComputedStyle(e).paddingRight)||0,r=e.scrollWidth-a>t.clientWidth;r!==this._tickerOverflows&&(this._tickerOverflows=r)}async _fetch(){if(this.hass)try{const t=await this.hass.callWS({type:"ha_radio/config"});this._radio=t,this._error=void 0;const e=t=>(t||"0").split(".")[0];e(t.version)!==e(ft)&&console.warn(`ha-radio-card: card is ${ft} but the integration is ${t.version} — major versions differ, so they may be incompatible. Update both, then hard-reload to clear the cached bundle.`),void 0===this._target&&(this._target=t.current_target??t.targets[0]?.entity_id),void 0===t.default_volume||this._touchedVolume||(this._volume=t.default_volume)}catch(t){this._error=String(t)}}get _stationName(){const t=this._radio?.select_entity;return(t?this.hass?.states[t]?.state:void 0)??this._radio?.current_station??this._radio?.stations[0]?.name}get _station(){const t=this._stationName;return this._radio?.stations.find(e=>e.name===t)}get _targetObj(){return this._radio?.targets.find(t=>t.entity_id===this._target)}get _isPlaying(){if(!this._target||!this.hass)return!1;const t=this.hass.states[this._target];if(!t)return!1;if("playing"!==t.state&&"buffering"!==t.state)return!1;const e=this._station?.url,a=t.attributes.media_content_id;return e&&"string"==typeof a?a===e:"playing"===t.state}get _tickerText(){const t=this._stationName??"—";if(!this._isPlaying)return`Stopped — ${t}`;const e=this._target?this.hass?.states[this._target]?.attributes:void 0,a=e?.media_title,r=e?.media_artist;let i="";return"string"==typeof a&&a&&a!==t&&(i="string"==typeof r&&r&&"Live radio"!==r?` — ${r} · ${a}`:` — ${a}`),`Playing: ${t}${i}`}_call(t,e={}){this.hass?.callService("ha_radio",t,e)}_play(){this._call("play",{station:this._stationName,target:this._target,volume:this._volume})}_stop(){this._call("stop",{target:this._target})}_step(t){const e=this._radio?.stations??[];if(!e.length)return;const a=e.findIndex(t=>t.name===this._stationName),r=e[(Math.max(a,0)+t+e.length)%e.length];this._selectStation(r.name)}_selectStation(t){const e=this._radio?.select_entity;e&&this.hass?.callService("select","select_option",{entity_id:e,option:t}),this._isPlaying&&this._call("play",{station:t,target:this._target,volume:this._volume})}_onVolume(t){this._touchedVolume=!0,this._volume=Number(t.target.value),this._isPlaying&&this._targetObj?.supports_volume&&this.hass?.callService("media_player","volume_set",{entity_id:this._target,volume_level:this._volume})}render(){if(!this._config||!this.hass)return W;const t=this._isPlaying;return B`
      <ha-card style=${"--rad-eq-state:"+(t?"running":"paused")}>
        ${this._error?B`<div class="err">${this._error}</div>`:W}
        ${this._radio&&!this._radio.ready?B`<div class="err">HA Radio integration is not ready yet.</div>`:W}

        <div class="top">
          ${this._station?.logo?B`<img class="logo" src=${this._station.logo} alt="" />`:W}
          <!-- The station name IS the picker. A full-width <select> for
               something the card already displays in full is pure duplication;
               overlaying a transparent native select keeps the OS dropdown
               (and its keyboard/mobile behaviour) while the visible control is
               just the title with a caret. -->
          <div class="pick">
            <div class="station">
              <span class="station-name"
                >${this._stationName??"No stations configured"}</span
              >
              <svg class="caret" viewBox="0 0 10 6" aria-hidden="true">
                <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6" />
              </svg>
            </div>
            <div class="sub">${t?"On air":"Ready"}</div>
            <select
              class="overlay"
              aria-label="Station"
              .value=${this._stationName??""}
              @change=${t=>this._selectStation(t.target.value)}
            >
              ${(this._radio?.stations??[]).map(t=>B`<option value=${t.name} ?selected=${t.name===this._stationName}>${t.name}</option>`)}
            </select>
          </div>
          ${this._showEqualizer?this._renderEqualizer():W}
        </div>

        ${!1===this._config.show_ticker?W:B`
              <div class="ticker">
                <div class=${"ticker-track"+(t&&this._tickerOverflows?" run":"")}>
                  <span>${this._tickerText}</span>
                  <span aria-hidden="true">${this._tickerText}</span>
                </div>
              </div>
            `}

        <!-- Transport is the anchor: a large solid primary flanked by two ghost
             skip buttons, with volume on the same line so the card reads as one
             control cluster rather than a stack of equal-weight form rows. -->
        <div class="transport">
          <button
            class="icon"
            title="Previous station"
            ?disabled=${!this._radio?.stations.length}
            @click=${()=>this._step(-1)}
          >
            ${yt}
          </button>
          <button
            class="icon primary"
            title=${t?"Stop":"Play"}
            ?disabled=${!this._target||!this._station}
            @click=${t?this._stop:this._play}
          >
            ${t?vt:xt}
          </button>
          <button
            class="icon"
            title="Next station"
            ?disabled=${!this._radio?.stations.length}
            @click=${()=>this._step(1)}
          >
            ${wt}
          </button>

          <div class="vol">
            <!-- Inline SVG rather than an emoji: renders identically everywhere
                 and occupies a known width, so the slider always lines up. -->
            <span class="volicon" aria-hidden="true">${_t}</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              aria-label="Volume"
              .value=${String(this._volume)}
              style=${`--rad-fill:${(100*this._volume).toFixed(1)}%`}
              ?disabled=${!!this._targetObj&&!this._targetObj.supports_volume}
              @input=${this._onVolume}
            />
            <span class="volval">${Math.round(100*this._volume)}%</span>
          </div>
        </div>

        <!-- Where it plays is a setting, not a transport control, so it sits at
             the bottom as a borderless line rather than a second full-width
             dropdown competing with the station. -->
        ${!1===this._config.show_target_picker?W:B`
              <div class="foot">
                <span class="foot-icon" aria-hidden="true">${kt}</span>
                <select
                  class="ghost"
                  aria-label="Target"
                  @change=${t=>{this._target=t.target.value}}
                >
                  ${(this._radio?.targets??[]).map(t=>B`<option value=${t.entity_id} ?selected=${t.entity_id===this._target}>
                      ${t.name}${t.is_group?" (group)":""}
                    </option>`)}
                </select>
              </div>
            `}
      </ha-card>
    `}get _showEqualizer(){return!1!==this._config?.show_equalizer}_renderEqualizer(){const t=Math.max(3,Math.min(24,this._config?.bars??7));this._phases.length!==t&&(this._phases=Array.from({length:t},(t,e)=>137.508*e%100));const e=.35+.65*this._volume;return B`
      <div class=${"eq"+(this._isPlaying?" on":"")} aria-hidden="true">
        ${this._phases.map((t,a)=>B`<i
            style=${`animation-delay:-${12*t}ms;animation-duration:calc(var(--rad-bar-period) * ${(.7+7*a%10/14).toFixed(2)});max-height:${(100*e).toFixed(0)}%`}
          ></i>`)}
      </div>
    `}};$t.styles=[gt,ut,bt,n`
      ha-card {
        background: var(--rad-bg);
        color: var(--rad-fg);
        font-family: var(--rad-font);
        border: var(--rad-border);
        border-radius: var(--rad-radius);
        /* Theme accent glow (if any) layered over a shared elevation shadow,
           rather than each theme inventing its own. */
        box-shadow: var(--rad-shadow), var(--rad-shadow-md);
        /* Bottom padding is a token: themes whose artwork runs along the bottom
           edge widen it so a motif never sits under a control. */
        padding: 16px var(--rad-pad-x, 18px) var(--rad-pad-bottom, 18px);
        display: flex;
        flex-direction: column;
        gap: 12px;
        overflow: hidden;
        text-shadow: var(--rad-text-shadow, none);
      }

      .top {
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 0;
      }

      .logo {
        width: 44px;
        height: 44px;
        border-radius: 8px;
        object-fit: cover;
        flex: 0 0 auto;
        background: var(--rad-surface);
      }

      /* --- hero: the station name doubles as the station picker ----------- */
      .pick {
        position: relative;
        min-width: 0;
        flex: 1 1 auto;
        border-radius: 8px;
        padding: 2px 4px;
        margin: -2px -4px;
        transition: background-color 140ms;
      }
      .pick:hover {
        background: var(--rad-well);
      }
      /* The real focus ring belongs on the overlay select, but the select is
         invisible — so surface its focus state on the thing the user sees. */
      .pick:has(select:focus-visible) {
        outline: 2px solid rgb(var(--rad-accent-rgb));
        outline-offset: 1px;
      }
      .station {
        display: flex;
        align-items: baseline;
        gap: 8px;
        min-width: 0;
        font-family: var(--rad-title-font);
        font-weight: var(--rad-title-weight);
        letter-spacing: var(--rad-title-spacing);
        text-transform: var(--rad-title-transform);
        font-size: 1.35rem;
        line-height: 1.2;
      }
      .station-name {
        min-width: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .caret {
        width: 10px;
        height: 6px;
        flex: 0 0 auto;
        color: var(--rad-dim);
        transition: transform 140ms;
      }
      .pick:hover .caret {
        transform: translateY(1px);
      }

      .sub {
        color: var(--rad-dim);
        font-size: 0.68rem;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      /* Transparent, full-bleed native select: keeps the OS dropdown and all of
         its keyboard/touch behaviour while the visible affordance is the title
         itself. Nothing is drawn, so it can't fight the theme. */
      select.overlay {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
        border: none;
        padding: 0;
        background: none;
        box-shadow: none;
      }

      /* --- equalizer --- */
      .eq {
        display: flex;
        align-items: flex-end;
        gap: var(--rad-bar-gap);
        height: 34px;
        flex: 0 0 auto;
        /* Hidden unless playing. The element stays mounted and keeps its box,
           so starting or stopping playback doesn't reflow the header — the
           title just never jumps sideways. */
        opacity: 0;
        transition: opacity 240ms ease;
      }
      .eq.on {
        opacity: 1;
      }
      .eq i {
        display: block;
        width: 5px;
        height: 100%;
        background: rgb(var(--rad-accent-rgb));
        box-shadow: var(--rad-glow);
        border-radius: var(--rad-bar-radius);
        transform-origin: bottom;
        transform: scaleY(0.18);
        animation-name: var(--rad-eq-anim);
        animation-duration: var(--rad-bar-period);
        animation-timing-function: var(--rad-bar-ease);
        animation-iteration-count: infinite;
        animation-direction: alternate;
        /* Pausing (rather than removing the animation) keeps the bars where
           they are and costs no reflow when toggling. */
        animation-play-state: var(--rad-eq-state, paused);
      }

      /* --- ticker --- */
      .ticker {
        overflow: hidden;
        white-space: nowrap;
        /* A recessed well — inset shadow plus a top highlight — so it reads as
           a display panel rather than a disabled text input. */
        background: var(--rad-well);
        border: 1px solid var(--rad-line);
        border-radius: 8px;
        box-shadow: var(--rad-inset);
        padding: 6px 0;
        /* Fade both edges so text enters and leaves rather than being chopped. */
        -webkit-mask-image: linear-gradient(
          to right,
          transparent 0,
          #000 5%,
          #000 95%,
          transparent 100%
        );
        mask-image: linear-gradient(
          to right,
          transparent 0,
          #000 5%,
          #000 95%,
          transparent 100%
        );
      }
      .ticker-track {
        display: flex;
        width: max-content;
      }
      .ticker-track.run {
        animation: rad-marquee var(--rad-ticker-period, 14s) linear infinite;
        /* Only while actually animating: will-change permanently allocates a
           GPU layer, which is wasteful on a card that is usually idle. */
        will-change: transform;
      }
      /* Idle: no animation at all, and a little inset so the text isn't jammed
         against the fade. Freezing the animation mid-scroll instead would often
         leave the text visibly cut in half. */
      .ticker-track:not(.run) {
        transform: none;
        padding-left: 10px;
      }
      .ticker-track span {
        font-family: var(--rad-ticker-font);
        font-size: 0.76rem;
        letter-spacing: 0.06em;
        color: var(--rad-fg);
        /* Separator lives in the text, so the two copies are exactly equal
           width and translateX(-50%) loops without a jump. */
        padding-right: 3.5rem;
      }
      .ticker-track:not(.run) span + span {
        /* The duplicate is only needed for the seamless loop. */
        display: none;
      }

      /* --- transport ------------------------------------------------------
         One control cluster: skip / play / skip, then volume on the same line.
         Wraps rather than crushing the slider on a narrow card. */
      .transport {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
        row-gap: 12px;
      }
      button.icon {
        border: 1px solid transparent;
        cursor: pointer;
        background: var(--rad-btn-bg);
        color: var(--rad-btn-fg);
        border-radius: 999px;
        width: 38px;
        height: 38px;
        padding: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
        transition: filter 150ms, transform 120ms, box-shadow 150ms;
      }
      button.icon svg {
        width: 20px;
        height: 20px;
      }
      /* The primary is deliberately bigger, solid and elevated — it is the one
         thing on the card you always want to hit first. */
      button.icon.primary {
        width: 52px;
        height: 52px;
        margin-right: 2px;
        background: rgb(var(--rad-accent-rgb));
        color: var(--rad-on-accent, #fff);
        box-shadow: var(--rad-shadow-md), var(--rad-glow);
      }
      button.icon.primary svg {
        width: 24px;
        height: 24px;
      }
      button.icon:hover:not(:disabled) {
        filter: brightness(1.12);
        border-color: var(--rad-line-strong);
      }
      button.icon.primary:hover:not(:disabled) {
        transform: scale(1.04);
        border-color: transparent;
      }
      button.icon:active:not(:disabled) {
        transform: scale(0.95);
      }
      button.icon:focus-visible {
        outline: 2px solid rgb(var(--rad-accent-rgb));
        outline-offset: 2px;
      }
      button.icon:disabled {
        opacity: 0.4;
        cursor: default;
      }

      .vol {
        display: flex;
        align-items: center;
        gap: 8px;
        /* Takes the rest of the transport line, but drops to its own row
           before the slider gets too short to be usable. */
        flex: 1 1 150px;
        min-width: 130px;
        margin-left: 4px;
      }
      .volicon {
        display: inline-flex;
        color: var(--rad-dim);
        flex: 0 0 auto;
      }
      .volicon svg {
        width: 18px;
        height: 18px;
      }
      .volval {
        font-size: 0.72rem;
        font-variant-numeric: tabular-nums;
        color: var(--rad-dim);
        flex: 0 0 auto;
        min-width: 2.4em;
        text-align: right;
      }

      /* --- footer: where it plays ----------------------------------------- */
      .foot {
        display: flex;
        align-items: center;
        gap: 6px;
        color: var(--rad-dim);
        margin-top: -2px;
      }
      .foot-icon {
        display: inline-flex;
        flex: 0 0 auto;
      }
      .foot-icon svg {
        width: 15px;
        height: 15px;
      }

      /* --- controls -------------------------------------------------------
         Native <select> and <input type=range> are the single biggest reason a
         themed card still reads as "an HTML form with a picture behind it":
         they bring OS chrome, a grey UA background and — on macOS — a system
         blue slider that fights every palette. Both are reset with
         appearance:none and rebuilt from theme tokens. */
      select {
        appearance: none;
        -webkit-appearance: none;
        flex: 1 1 auto;
        min-width: 0;
        font: inherit;
        font-size: 0.88rem;
        color: var(--rad-fg);
        background-color: var(--rad-well);
        /* Custom chevron, so no UA arrow. currentColor can't be used inside a
           data-URI, so it's drawn with a theme-independent stroke and tinted by
           opacity instead. */
        background-image: linear-gradient(
            45deg,
            transparent 50%,
            currentColor 50%
          ),
          linear-gradient(135deg, currentColor 50%, transparent 50%);
        background-position:
          right 15px top 52%,
          right 10px top 52%;
        background-size:
          5px 5px,
          5px 5px;
        background-repeat: no-repeat;
        border: 1px solid var(--rad-line);
        border-radius: 10px;
        padding: 9px 30px 9px 12px;
        cursor: pointer;
        box-shadow: var(--rad-inset);
        transition: border-color 140ms, box-shadow 140ms;
      }
      select:hover {
        border-color: var(--rad-line-strong);
      }
      select:focus-visible {
        outline: none;
        border-color: rgb(var(--rad-accent-rgb));
        box-shadow: var(--rad-inset), 0 0 0 3px rgba(var(--rad-accent-rgb), 0.28);
      }
      /* The dropdown list itself is OS-rendered and cannot inherit the theme,
         so give it explicit legible colours rather than leaving it to chance. */
      select option {
        background: var(--rad-menu-bg, #1d2027);
        color: var(--rad-menu-fg, #f0f2f6);
      }

      /* Footer target picker: a line of text with a caret, not a second boxed
         dropdown. Two stacked full-width selects were the main reason the card
         read as a settings form. */
      select.ghost {
        background-color: transparent;
        border-color: transparent;
        box-shadow: none;
        color: var(--rad-dim);
        font-size: 0.78rem;
        padding: 3px 20px 3px 4px;
        background-position:
          right 9px top 55%,
          right 4px top 55%;
        background-size:
          4px 4px,
          4px 4px;
        flex: 0 1 auto;
        width: auto;
        max-width: 100%;
      }
      select.ghost:hover {
        color: var(--rad-fg);
        background-color: var(--rad-well);
        border-color: transparent;
      }

      input[type="range"] {
        appearance: none;
        -webkit-appearance: none;
        flex: 1 1 auto;
        min-width: 0;
        margin: 0;
        height: 22px;
        background: transparent;
        cursor: pointer;
      }
      /* Filled portion is painted with a gradient stop driven by --rad-fill,
         set inline from the current value — a track that only fills to the
         thumb is what makes it read as a real control. */
      input[type="range"]::-webkit-slider-runnable-track {
        height: 6px;
        border-radius: 999px;
        background: linear-gradient(
          90deg,
          rgb(var(--rad-accent-rgb)) 0 var(--rad-fill, 35%),
          var(--rad-well) var(--rad-fill, 35%) 100%
        );
        box-shadow: var(--rad-inset);
      }
      input[type="range"]::-moz-range-track {
        height: 6px;
        border-radius: 999px;
        background: linear-gradient(
          90deg,
          rgb(var(--rad-accent-rgb)) 0 var(--rad-fill, 35%),
          var(--rad-well) var(--rad-fill, 35%) 100%
        );
        box-shadow: var(--rad-inset);
      }
      input[type="range"]::-webkit-slider-thumb {
        appearance: none;
        -webkit-appearance: none;
        width: 16px;
        height: 16px;
        margin-top: -5px;
        border-radius: 50%;
        background: var(--rad-thumb, #fff);
        border: 2px solid rgb(var(--rad-accent-rgb));
        box-shadow: var(--rad-shadow-sm);
        transition: transform 120ms;
      }
      input[type="range"]::-moz-range-thumb {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--rad-thumb, #fff);
        border: 2px solid rgb(var(--rad-accent-rgb));
        box-shadow: var(--rad-shadow-sm);
      }
      input[type="range"]:hover::-webkit-slider-thumb {
        transform: scale(1.12);
      }
      input[type="range"]:focus-visible::-webkit-slider-thumb {
        box-shadow: 0 0 0 4px rgba(var(--rad-accent-rgb), 0.3);
      }
      input[type="range"]:disabled {
        cursor: default;
        opacity: 0.45;
      }

      .err {
        color: var(--error-color, #db4437);
        font-size: 0.8rem;
      }

      /* The bars are decoration; motion-sensitive users get a static shape.
         HA provides no reduced-motion helper, so this is handled here. */
      @media (prefers-reduced-motion: reduce) {
        .eq {
          transition: none;
        }
        .eq i {
          animation: none;
          transform: scaleY(0.4);
        }
        /* Ticker text must stay readable, so stop scrolling and let it truncate
           rather than leaving it parked at an arbitrary offset. */
        .ticker-track.run {
          animation: none;
          padding-left: 10px;
        }
        .ticker-track.run span + span {
          display: none;
        }
        .ticker-track.run span {
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    `],t([ht({attribute:!1})],$t.prototype,"hass",void 0),t([pt()],$t.prototype,"_config",void 0),t([pt()],$t.prototype,"_radio",void 0),t([pt()],$t.prototype,"_target",void 0),t([pt()],$t.prototype,"_volume",void 0),t([pt()],$t.prototype,"_error",void 0),t([pt()],$t.prototype,"_tickerOverflows",void 0),$t=t([(t=>(e,a)=>{void 0!==a?a.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})("ha-radio-card")],$t);const At=window;At.customCards=At.customCards||[],At.customCards.push({type:"ha-radio-card",name:"HA Radio",description:"Internet radio with themed equalizer (companion to the HA Radio integration)",preview:!0,documentationURL:"https://github.com/padlefot/ha_radio_card",getEntitySuggestion:(t,e)=>"select.ha_radio_station"===e?{config:{type:"custom:ha-radio-card"}}:null});export{$t as HaRadioCard};
