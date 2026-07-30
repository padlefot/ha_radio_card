function t(t,e,r,a){var i,s=arguments.length,n=s<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,r):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,r,a);else for(var o=t.length-1;o>=0;o--)(i=t[o])&&(n=(s<3?i(n):s>3?i(e,r,n):i(e,r))||n);return s>3&&n&&Object.defineProperty(e,r,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,r=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),i=new WeakMap;let s=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(r&&void 0===t){const r=void 0!==e&&1===e.length;r&&(t=i.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&i.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const r=1===t.length?t[0]:e.reduce((e,r,a)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+t[a+1],t[0]);return new s(r,t,a)},o=r?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,a))(e)})(t):t,{is:d,defineProperty:h,getOwnPropertyDescriptor:c,getOwnPropertyNames:l,getOwnPropertySymbols:p,getPrototypeOf:g}=Object,u=globalThis,f=u.trustedTypes,m=f?f.emptyScript:"",b=u.reactiveElementPolyfillSupport,_=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=null!==t;break;case Number:r=null===t?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch(t){r=null}}return r}},x=(t,e)=>!d(t,e),y={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:x};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const r=Symbol(),a=this.getPropertyDescriptor(t,r,e);void 0!==a&&h(this.prototype,t,a)}}static getPropertyDescriptor(t,e,r){const{get:a,set:i}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:a,set(e){const s=a?.call(this);i?.call(this,e),this.requestUpdate(t,s,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...l(t),...p(t)];for(const r of e)this.createProperty(r,t[r])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,r]of e)this.elementProperties.set(t,r)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const r=this._$Eu(t,e);void 0!==r&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const t of r)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const r=e.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,a)=>{if(r)t.adoptedStyleSheets=a.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const r of a){const a=document.createElement("style"),i=e.litNonce;void 0!==i&&a.setAttribute("nonce",i),a.textContent=r.cssText,t.appendChild(a)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){const r=this.constructor.elementProperties.get(t),a=this.constructor._$Eu(t,r);if(void 0!==a&&!0===r.reflect){const i=(void 0!==r.converter?.toAttribute?r.converter:v).toAttribute(e,r.type);this._$Em=t,null==i?this.removeAttribute(a):this.setAttribute(a,i),this._$Em=null}}_$AK(t,e){const r=this.constructor,a=r._$Eh.get(t);if(void 0!==a&&this._$Em!==a){const t=r.getPropertyOptions(a),i="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=a;const s=i.fromAttribute(e,t.type);this[a]=s??this._$Ej?.get(a)??s,this._$Em=null}}requestUpdate(t,e,r,a=!1,i){if(void 0!==t){const s=this.constructor;if(!1===a&&(i=this[t]),r??=s.getPropertyOptions(t),!((r.hasChanged??x)(i,e)||r.useDefault&&r.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,r))))return;this.C(t,e,r)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:a,wrapped:i},s){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==i||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),!0===a&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,r]of t){const{wrapped:t}=r,a=this[e];!0!==t||this._$AL.has(e)||void 0===a||this.C(e,void 0,r,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[_("elementProperties")]=new Map,$[_("finalized")]=new Map,b?.({ReactiveElement:$}),(u.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,A=t=>t,k=w.trustedTypes,E=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+S,M=`<${P}>`,O=document,z=()=>O.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,R="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,j=/>/g,q=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,D=/"/g,L=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...r)=>({_$litType$:t,strings:e,values:r}))(1),V=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),G=new WeakMap,Y=O.createTreeWalker(O,129);function F(t,e){if(!H(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const X=(t,e)=>{const r=t.length-1,a=[];let i,s=2===e?"<svg>":3===e?"<math>":"",n=U;for(let e=0;e<r;e++){const r=t[e];let o,d,h=-1,c=0;for(;c<r.length&&(n.lastIndex=c,d=n.exec(r),null!==d);)c=n.lastIndex,n===U?"!--"===d[1]?n=N:void 0!==d[1]?n=j:void 0!==d[2]?(L.test(d[2])&&(i=RegExp("</"+d[2],"g")),n=q):void 0!==d[3]&&(n=q):n===q?">"===d[0]?(n=i??U,h=-1):void 0===d[1]?h=-2:(h=n.lastIndex-d[2].length,o=d[1],n=void 0===d[3]?q:'"'===d[3]?D:I):n===D||n===I?n=q:n===N||n===j?n=U:(n=q,i=void 0);const l=n===q&&t[e+1].startsWith("/>")?" ":"";s+=n===U?r+M:h>=0?(a.push(o),r.slice(0,h)+C+r.slice(h)+S+l):r+S+(-2===h?e:l)}return[F(t,s+(t[r]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),a]};class J{constructor({strings:t,_$litType$:e},r){let a;this.parts=[];let i=0,s=0;const n=t.length-1,o=this.parts,[d,h]=X(t,e);if(this.el=J.createElement(d,r),Y.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(a=Y.nextNode())&&o.length<n;){if(1===a.nodeType){if(a.hasAttributes())for(const t of a.getAttributeNames())if(t.endsWith(C)){const e=h[s++],r=a.getAttribute(t).split(S),n=/([.?@])?(.*)/.exec(e);o.push({type:1,index:i,name:n[2],strings:r,ctor:"."===n[1]?et:"?"===n[1]?rt:"@"===n[1]?at:tt}),a.removeAttribute(t)}else t.startsWith(S)&&(o.push({type:6,index:i}),a.removeAttribute(t));if(L.test(a.tagName)){const t=a.textContent.split(S),e=t.length-1;if(e>0){a.textContent=k?k.emptyScript:"";for(let r=0;r<e;r++)a.append(t[r],z()),Y.nextNode(),o.push({type:2,index:++i});a.append(t[e],z())}}}else if(8===a.nodeType)if(a.data===P)o.push({type:2,index:i});else{let t=-1;for(;-1!==(t=a.data.indexOf(S,t+1));)o.push({type:7,index:i}),t+=S.length-1}i++}}static createElement(t,e){const r=O.createElement("template");return r.innerHTML=t,r}}function K(t,e,r=t,a){if(e===V)return e;let i=void 0!==a?r._$Co?.[a]:r._$Cl;const s=T(e)?void 0:e._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(!1),void 0===s?i=void 0:(i=new s(t),i._$AT(t,r,a)),void 0!==a?(r._$Co??=[])[a]=i:r._$Cl=i),void 0!==i&&(e=K(t,i._$AS(t,e.values),i,a)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:r}=this._$AD,a=(t?.creationScope??O).importNode(e,!0);Y.currentNode=a;let i=Y.nextNode(),s=0,n=0,o=r[0];for(;void 0!==o;){if(s===o.index){let e;2===o.type?e=new Q(i,i.nextSibling,this,t):1===o.type?e=new o.ctor(i,o.name,o.strings,this,t):6===o.type&&(e=new it(i,this,t)),this._$AV.push(e),o=r[++n]}s!==o?.index&&(i=Y.nextNode(),s++)}return Y.currentNode=O,a}p(t){let e=0;for(const r of this._$AV)void 0!==r&&(void 0!==r.strings?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,a){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),T(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>H(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:r}=t,a="number"==typeof r?this._$AC(t):(void 0===r.el&&(r.el=J.createElement(F(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===a)this._$AH.p(e);else{const t=new Z(a,this),r=t.u(this.options);t.p(e),this.T(r),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new J(t)),e}k(t){H(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,a=0;for(const i of t)a===e.length?e.push(r=new Q(this.O(z()),this.O(z()),this,this.options)):r=e[a],r._$AI(i),a++;a<e.length&&(this._$AR(r&&r._$AB.nextSibling,a),e.length=a)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,a,i){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=a,this.options=i,r.length>2||""!==r[0]||""!==r[1]?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=W}_$AI(t,e=this,r,a){const i=this.strings;let s=!1;if(void 0===i)t=K(this,t,e,0),s=!T(t)||t!==this._$AH&&t!==V,s&&(this._$AH=t);else{const a=t;let n,o;for(t=i[0],n=0;n<i.length-1;n++)o=K(this,a[r+n],e,n),o===V&&(o=this._$AH[n]),s||=!T(o)||o!==this._$AH[n],o===W?t=W:t!==W&&(t+=(o??"")+i[n+1]),this._$AH[n]=o}s&&!a&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class rt extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class at extends tt{constructor(t,e,r,a,i){super(t,e,r,a,i),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??W)===V)return;const r=this._$AH,a=t===W&&r!==W||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,i=t!==W&&(r===W||a);a&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const st=w.litHtmlPolyfillSupport;st?.(J,Q),(w.litHtmlVersions??=[]).push("3.3.3");const nt=globalThis;class ot extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,r)=>{const a=r?.renderBefore??e;let i=a._$litPart$;if(void 0===i){const t=r?.renderBefore??null;a._$litPart$=i=new Q(e.insertBefore(z(),t),t,void 0,r??{})}return i._$AI(t),i})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}ot._$litElement$=!0,ot.finalized=!0,nt.litElementHydrateSupport?.({LitElement:ot});const dt=nt.litElementPolyfillSupport;dt?.({LitElement:ot}),(nt.litElementVersions??=[]).push("4.2.2");const ht={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:x},ct=(t=ht,e,r)=>{const{kind:a,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===a&&((t=Object.create(t)).wrapped=!0),s.set(r.name,t),"accessor"===a){const{name:a}=r;return{set(r){const i=e.get.call(this);e.set.call(this,r),this.requestUpdate(a,i,t,!0,r)},init(e){return void 0!==e&&this.C(a,void 0,t,e),e}}}if("setter"===a){const{name:a}=r;return function(r){const i=this[a];e.call(this,r),this.requestUpdate(a,i,t,!0,r)}}throw Error("Unsupported decorator location: "+a)};function lt(t){return(e,r)=>"object"==typeof r?ct(t,e,r):((t,e,r)=>{const a=e.hasOwnProperty(r);return e.constructor.createProperty(r,t),a?Object.getOwnPropertyDescriptor(e,r):void 0})(t,e,r)}function pt(t){return lt({...t,state:!0,attribute:!1})}const gt=n`
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
    --rad-btn-bg: rgba(var(--rad-accent-rgb), 0.14);
    --rad-btn-fg: rgb(var(--rad-accent-rgb));
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
    --rad-font: "Courier New", Courier, monospace;
    --rad-title-transform: uppercase;
    --rad-title-spacing: 0.08em;
    --rad-bar-radius: 0;
    --rad-bar-period: 1100ms;
    --rad-ticker-period: 17s;
    --rad-border: 1px solid rgba(58, 44, 26, 0.25);
    --rad-btn-bg: rgba(178, 88, 34, 0.16);
  }

  /* --- 80s: neon on deep violet, fast and glowing ------------------------- */
  :host([data-theme="eighties"]) {
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
    --rad-btn-fg: #ffffff;
    --rad-btn-bg: rgba(255, 255, 255, 0.16);
    --rad-text-shadow: 0 1px 3px rgba(0, 0, 0, 0.65);
  }

  /* --- Ancient: parchment and faded ink ---------------------------------- */
  :host([data-theme="ancient"]) {
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
    --rad-bg: linear-gradient(150deg, #ff8a5c 0%, #ff5f7e 45%, #7a4bd6 100%);
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
`,ft=n`
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

  /* ---- Retro: a tabletop radio ----------------------------------------
     Perforated speaker grille on the left, tuning-dial scale with tick marks
     across the top, warm wood vignette. */
  :host([data-theme="retro"]) ha-card::before {
    background-image:
      /* dial ticks */
      repeating-linear-gradient(
        90deg,
        rgba(58, 44, 26, 0.55) 0 1px,
        transparent 1px 9px
      ),
      /* grille perforations */
        radial-gradient(
          circle at center,
          rgba(58, 44, 26, 0.32) 1.1px,
          transparent 1.6px
        ),
      /* warm wood edge */
        linear-gradient(
          90deg,
          rgba(92, 58, 26, 0.35),
          transparent 18%,
          transparent 82%,
          rgba(92, 58, 26, 0.35)
        );
    background-size:
      100% 12px,
      7px 7px,
      100% 100%;
    background-position:
      left 10px,
      left 34px,
      center;
    background-repeat: no-repeat, repeat, no-repeat;
    opacity: 0.55;
  }
  /* Glass reflection across the dial. */
  :host([data-theme="retro"]) ha-card::after {
    background-image: linear-gradient(
      118deg,
      rgba(255, 255, 255, 0.28) 0 22%,
      transparent 42%
    );
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
      100% 46%,
      100% 46%,
      70% 46%,
      70% 46%;
    background-position:
      bottom,
      bottom,
      bottom center,
      bottom center;
    opacity: 0.5;
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
      radial-gradient(circle at 12% 22%, #ffffff 0.9px, transparent 1.2px),
      radial-gradient(circle at 31% 66%, #ffffff 0.7px, transparent 1px),
      radial-gradient(circle at 58% 14%, #ffffff 1px, transparent 1.3px),
      radial-gradient(circle at 76% 48%, #ffffff 0.8px, transparent 1.1px),
      radial-gradient(circle at 88% 78%, #ffffff 0.9px, transparent 1.2px),
      radial-gradient(circle at 44% 88%, #ffffff 0.7px, transparent 1px),
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
      26px 26px,
      100% 100%,
      100% 100%,
      100% 100%;
    background-position:
      bottom left,
      center,
      center,
      center;
    background-repeat: repeat-x, no-repeat, no-repeat, no-repeat;
    opacity: 0.5;
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
      92px 92px,
      22px 22px,
      100% 100%,
      100% 100%,
      100% 100%;
    background-position:
      right -18px bottom -18px,
      left 5px top,
      left,
      right,
      center;
    background-repeat: no-repeat, repeat-y, no-repeat, no-repeat, repeat;
    opacity: 0.62;
  }

  /* ---- Tropical: sun, palms and a monstera leaf ------------------------ */
  :host([data-theme="tropical"]) ha-card::before {
    background-image:
      /* palms, bottom left */
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 150'%3E%3Cg fill='%23123b2a'%3E%3Cpath d='M62 150c1-42 5-72 12-100l7 2c-8 28-12 58-13 98z'/%3E%3Cpath d='M76 48c-16-13-36-12-48 0 15-4 31-2 42 7z'/%3E%3Cpath d='M76 48c15-13 37-10 47 3-15-6-32-6-42 2z'/%3E%3Cpath d='M76 48c-10-18-29-27-46-24 15 7 29 17 37 30z'/%3E%3Cpath d='M76 48c11-17 32-22 49-15-16 2-32 8-41 20z'/%3E%3Cpath d='M76 48c-4-20 4-37 19-45-8 14-13 29-12 46z'/%3E%3Cpath d='M118 150c1-30 4-52 9-72l6 2c-6 20-9 42-10 70z'/%3E%3Cpath d='M129 80c-12-10-27-9-36 0 11-3 23-1 31 5z'/%3E%3Cpath d='M129 80c11-10 27-8 35 2-11-4-24-4-31 2z'/%3E%3Cpath d='M129 80c-3-15 3-27 14-33-6 10-10 21-9 34z'/%3E%3C/g%3E%3C/svg%3E"),
      /* monstera leaf, top right */
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'%3E%3Cg fill='%23145c3a'%3E%3Cpath d='M60 8c30 0 52 24 52 54 0 28-22 50-52 50S8 90 8 62C8 32 30 8 60 8zm0 10c-8 12-8 26-8 44 0 18 0 32 8 44 8-12 8-26 8-44 0-18 0-32-8-44z'/%3E%3C/g%3E%3C/svg%3E"),
      /* sun */
        radial-gradient(
          circle at 82% 16%,
          rgba(255, 233, 130, 0.85) 0 6%,
          rgba(255, 233, 130, 0.35) 7% 12%,
          transparent 13%
        ),
      /* water shimmer */
        repeating-linear-gradient(
          0deg,
          rgba(255, 255, 255, 0.1) 0 1px,
          transparent 1px 7px
        );
    background-size:
      140px 140px,
      86px 86px,
      100% 100%,
      100% 100%;
    background-position:
      left -14px bottom -10px,
      right -22px top -26px,
      center,
      bottom;
    background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
    opacity: 0.5;
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
`,mt="0.3.0";console.info(`%c HA-RADIO-CARD %c ${mt} `,"color:#fff;background:#03a9f4","color:#03a9f4;background:#fff");let bt=class extends ot{constructor(){super(...arguments),this._volume=.35,this._tickerOverflows=!1,this._phases=[],this._touchedVolume=!1}setConfig(t){if(!t)throw new Error("Invalid configuration");"theme"in t&&console.warn("ha-radio-card: `theme` is not a card option. Set the theme in the HA Radio integration (Settings → Devices & Services → HA Radio → Configure); it applies to every HA Radio card."),this._config=t,t.target&&(this._target=t.target),this._phases=[]}getCardSize(){return 3}getGridOptions(){return{columns:12,rows:"auto",min_columns:6}}connectedCallback(){super.connectedCallback(),this._load()}disconnectedCallback(){super.disconnectedCallback(),this._unsub?.then(t=>t()).catch(()=>{}),this._unsub=void 0}async _load(){if(this.hass&&!this._unsub)try{await this._fetch(),this._unsub=this.hass.connection.subscribeMessage(()=>{this._fetch()},{type:"ha_radio/subscribe"})}catch(t){this._error=`Could not reach the HA Radio integration: ${t}`}}willUpdate(){const t=this._radio?.theme??"classic";this.getAttribute("data-theme")!==t&&this.setAttribute("data-theme",t)}updated(){this._measureTicker()}_measureTicker(){const t=this.renderRoot.querySelector(".ticker"),e=this.renderRoot.querySelector(".ticker-track span");if(!t||!e)return;const r=parseFloat(getComputedStyle(e).paddingRight)||0,a=e.scrollWidth-r>t.clientWidth;a!==this._tickerOverflows&&(this._tickerOverflows=a)}async _fetch(){if(this.hass)try{const t=await this.hass.callWS({type:"ha_radio/config"});this._radio=t,this._error=void 0;const e=t=>(t||"0").split(".")[0];e(t.version)!==e(mt)&&console.warn(`ha-radio-card: card is ${mt} but the integration is ${t.version} — major versions differ, so they may be incompatible. Update both, then hard-reload to clear the cached bundle.`),void 0===this._target&&(this._target=t.current_target??t.targets[0]?.entity_id),void 0===t.default_volume||this._touchedVolume||(this._volume=t.default_volume)}catch(t){this._error=String(t)}}get _stationName(){const t=this._radio?.select_entity;return(t?this.hass?.states[t]?.state:void 0)??this._radio?.current_station??this._radio?.stations[0]?.name}get _station(){const t=this._stationName;return this._radio?.stations.find(e=>e.name===t)}get _targetObj(){return this._radio?.targets.find(t=>t.entity_id===this._target)}get _isPlaying(){if(!this._target||!this.hass)return!1;const t=this.hass.states[this._target];if(!t)return!1;if("playing"!==t.state&&"buffering"!==t.state)return!1;const e=this._station?.url,r=t.attributes.media_content_id;return e&&"string"==typeof r?r===e:"playing"===t.state}get _tickerText(){const t=this._stationName??"—";if(!this._isPlaying)return`Stopped — ${t}`;const e=this._target?this.hass?.states[this._target]?.attributes:void 0,r=e?.media_title,a=e?.media_artist;let i="";return"string"==typeof r&&r&&r!==t&&(i="string"==typeof a&&a&&"Live radio"!==a?` — ${a} · ${r}`:` — ${r}`),`Playing: ${t}${i}`}_call(t,e={}){this.hass?.callService("ha_radio",t,e)}_play(){this._call("play",{station:this._stationName,target:this._target,volume:this._volume})}_stop(){this._call("stop",{target:this._target})}_step(t){const e=this._radio?.stations??[];if(!e.length)return;const r=e.findIndex(t=>t.name===this._stationName),a=e[(Math.max(r,0)+t+e.length)%e.length];this._selectStation(a.name)}_selectStation(t){const e=this._radio?.select_entity;e&&this.hass?.callService("select","select_option",{entity_id:e,option:t}),this._isPlaying&&this._call("play",{station:t,target:this._target,volume:this._volume})}_onVolume(t){this._touchedVolume=!0,this._volume=Number(t.target.value),this._isPlaying&&this._targetObj?.supports_volume&&this.hass?.callService("media_player","volume_set",{entity_id:this._target,volume_level:this._volume})}render(){if(!this._config||!this.hass)return W;const t=this._isPlaying;return B`
      <ha-card style=${"--rad-eq-state:"+(t?"running":"paused")}>
        ${this._error?B`<div class="err">${this._error}</div>`:W}
        ${this._radio&&!this._radio.ready?B`<div class="err">HA Radio integration is not ready yet.</div>`:W}

        <div class="top">
          ${this._station?.logo?B`<img class="logo" src=${this._station.logo} alt="" />`:W}
          <div class="titles">
            <div class="station">${this._stationName??"No stations configured"}</div>
            <div class="sub">
              ${this._targetObj?`${this._targetObj.name}${this._targetObj.is_group?" · group":""}`:"No target available"}
            </div>
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

        <div class="row">
          <button
            class="icon"
            title="Previous station"
            ?disabled=${!this._radio?.stations.length}
            @click=${()=>this._step(-1)}
          >
            ⏮
          </button>
          <button
            class="icon wide"
            title=${t?"Stop":"Play"}
            ?disabled=${!this._target||!this._station}
            @click=${t?this._stop:this._play}
          >
            ${t?"■":"▶"}
          </button>
          <button
            class="icon"
            title="Next station"
            ?disabled=${!this._radio?.stations.length}
            @click=${()=>this._step(1)}
          >
            ⏭
          </button>
          <select
            aria-label="Station"
            .value=${this._stationName??""}
            @change=${t=>this._selectStation(t.target.value)}
          >
            ${(this._radio?.stations??[]).map(t=>B`<option value=${t.name} ?selected=${t.name===this._stationName}>${t.name}</option>`)}
          </select>
        </div>

        ${!1===this._config.show_target_picker?W:B`
              <div class="row">
                <select
                  aria-label="Target"
                  @change=${t=>{this._target=t.target.value}}
                >
                  ${(this._radio?.targets??[]).map(t=>B`<option value=${t.entity_id} ?selected=${t.entity_id===this._target}>
                      ${t.name}${t.is_group?" (group)":""}
                    </option>`)}
                </select>
              </div>
            `}

        <div class="row">
          <!-- Inline SVG rather than an emoji: renders identically everywhere and
               occupies a known width, so the slider lines up with the rows above. -->
          <span class="volicon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M3 10v4h3l4 4V6L6 10H3zm11.5 2a3.5 3.5 0 0 0-2-3.16v6.32A3.5 3.5 0 0 0 14.5 12z" />
            </svg>
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            aria-label="Volume"
            .value=${String(this._volume)}
            ?disabled=${!!this._targetObj&&!this._targetObj.supports_volume}
            @input=${this._onVolume}
          />
          <span class="vol">${Math.round(100*this._volume)}%</span>
        </div>
      </ha-card>
    `}get _showEqualizer(){return!1!==this._config?.show_equalizer}_renderEqualizer(){const t=Math.max(3,Math.min(24,this._config?.bars??7));this._phases.length!==t&&(this._phases=Array.from({length:t},(t,e)=>137.508*e%100));const e=.35+.65*this._volume;return B`
      <div class=${"eq"+(this._isPlaying?" on":"")} aria-hidden="true">
        ${this._phases.map((t,r)=>B`<i
            style=${`animation-delay:-${12*t}ms;animation-duration:calc(var(--rad-bar-period) * ${(.7+7*r%10/14).toFixed(2)});max-height:${(100*e).toFixed(0)}%`}
          ></i>`)}
      </div>
    `}};bt.styles=[gt,ut,ft,n`
      ha-card {
        background: var(--rad-bg);
        color: var(--rad-fg);
        font-family: var(--rad-font);
        border: var(--rad-border);
        border-radius: var(--rad-radius);
        box-shadow: var(--rad-shadow);
        padding: 14px 16px;
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

      .titles {
        min-width: 0;
        flex: 1 1 auto;
      }

      .station {
        font-family: var(--rad-title-font);
        font-weight: var(--rad-title-weight);
        letter-spacing: var(--rad-title-spacing);
        text-transform: var(--rad-title-transform);
        font-size: 1.05rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .sub {
        color: var(--rad-dim);
        font-size: 0.78rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      /* --- equalizer --- */
      .eq {
        display: flex;
        align-items: flex-end;
        gap: var(--rad-bar-gap);
        height: 30px;
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
        width: 4px;
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
        background: var(--rad-surface);
        border: var(--rad-border);
        border-radius: 6px;
        padding: 5px 0;
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
        font-size: 0.82rem;
        letter-spacing: var(--rad-title-spacing);
        color: var(--rad-fg);
        /* Separator lives in the text, so the two copies are exactly equal
           width and translateX(-50%) loops without a jump. */
        padding-right: 3.5rem;
      }
      .ticker-track:not(.run) span + span {
        /* The duplicate is only needed for the seamless loop. */
        display: none;
      }

      /* --- controls --- */
      .row {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      button.icon {
        border: none;
        cursor: pointer;
        background: var(--rad-btn-bg);
        color: var(--rad-btn-fg);
        border-radius: 999px;
        width: 40px;
        height: 40px;
        font-size: 1.1rem;
        line-height: 1;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
        transition: filter 150ms;
      }
      button.icon:hover:not(:disabled) {
        filter: brightness(1.15);
      }
      button.icon:disabled {
        opacity: 0.4;
        cursor: default;
      }
      button.icon.wide {
        width: auto;
        padding: 0 16px;
        gap: 6px;
      }

      select,
      input[type="range"] {
        font-family: inherit;
        color: inherit;
        accent-color: rgb(var(--rad-accent-rgb));
      }
      select {
        flex: 1 1 auto;
        min-width: 0;
        background: var(--rad-surface);
        color: var(--rad-fg);
        border: var(--rad-border);
        border-radius: 8px;
        padding: 8px 10px;
        font-size: 0.9rem;
      }
      input[type="range"] {
        flex: 1 1 auto;
        min-width: 0;
        /* Browsers give range inputs their own inline margins, which pushed the
           track out of line with the selects above it. */
        margin: 0;
      }
      /* Fixed-width icon box. An emoji glyph's advance width varies by platform
         font, so letting it size itself made the slider start at a different x
         than every other row. */
      .volicon {
        flex: 0 0 24px;
        width: 24px;
        text-align: center;
        line-height: 1;
        color: var(--rad-dim);
        font-size: 1rem;
      }
      .vol {
        font-variant-numeric: tabular-nums;
        color: var(--rad-dim);
        font-size: 0.78rem;
        min-width: 2.5em;
        text-align: right;
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
    `],t([lt({attribute:!1})],bt.prototype,"hass",void 0),t([pt()],bt.prototype,"_config",void 0),t([pt()],bt.prototype,"_radio",void 0),t([pt()],bt.prototype,"_target",void 0),t([pt()],bt.prototype,"_volume",void 0),t([pt()],bt.prototype,"_error",void 0),t([pt()],bt.prototype,"_tickerOverflows",void 0),bt=t([(t=>(e,r)=>{void 0!==r?r.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})("ha-radio-card")],bt);const _t=window;_t.customCards=_t.customCards||[],_t.customCards.push({type:"ha-radio-card",name:"HA Radio",description:"Internet radio with themed equalizer (companion to the HA Radio integration)",preview:!0,documentationURL:"https://github.com/padlefot/ha_radio_card",getEntitySuggestion:(t,e)=>"select.ha_radio_station"===e?{config:{type:"custom:ha-radio-card"}}:null});export{bt as HaRadioCard};
