function t(t,e,r,i){var a,s=arguments.length,o=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,r,i);else for(var n=t.length-1;n>=0;n--)(a=t[n])&&(o=(s<3?a(o):s>3?a(e,r,o):a(e,r))||o);return s>3&&o&&Object.defineProperty(e,r,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,r=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),a=new WeakMap;let s=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(r&&void 0===t){const r=void 0!==e&&1===e.length;r&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&a.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const r=1===t.length?t[0]:e.reduce((e,r,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+t[i+1],t[0]);return new s(r,t,i)},n=r?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:d,defineProperty:h,getOwnPropertyDescriptor:c,getOwnPropertyNames:l,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,f=g.trustedTypes,m=f?f.emptyScript:"",_=g.reactiveElementPolyfillSupport,b=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=null!==t;break;case Number:r=null===t?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch(t){r=null}}return r}},$=(t,e)=>!d(t,e),y={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const r=Symbol(),i=this.getPropertyDescriptor(t,r,e);void 0!==i&&h(this.prototype,t,i)}}static getPropertyDescriptor(t,e,r){const{get:i,set:a}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const s=i?.call(this);a?.call(this,e),this.requestUpdate(t,s,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...l(t),...p(t)];for(const r of e)this.createProperty(r,t[r])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,r]of e)this.elementProperties.set(t,r)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const r=this._$Eu(t,e);void 0!==r&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const t of r)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const r=e.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(r)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const r of i){const i=document.createElement("style"),a=e.litNonce;void 0!==a&&i.setAttribute("nonce",a),i.textContent=r.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){const r=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,r);if(void 0!==i&&!0===r.reflect){const a=(void 0!==r.converter?.toAttribute?r.converter:v).toAttribute(e,r.type);this._$Em=t,null==a?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(t,e){const r=this.constructor,i=r._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=r.getPropertyOptions(i),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=i;const s=a.fromAttribute(e,t.type);this[i]=s??this._$Ej?.get(i)??s,this._$Em=null}}requestUpdate(t,e,r,i=!1,a){if(void 0!==t){const s=this.constructor;if(!1===i&&(a=this[t]),r??=s.getPropertyOptions(t),!((r.hasChanged??$)(a,e)||r.useDefault&&r.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,r))))return;this.C(t,e,r)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:i,wrapped:a},s){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==a||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,r]of t){const{wrapped:t}=r,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,r,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[b("elementProperties")]=new Map,w[b("finalized")]=new Map,_?.({ReactiveElement:w}),(g.reactiveElementVersions??=[]).push("2.1.2");const A=globalThis,x=t=>t,S=A.trustedTypes,E=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,k="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,O=`<${P}>`,T=document,U=()=>T.createComment(""),N=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,R="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,j=/-->/g,z=/>/g,q=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,I=/"/g,L=/^(?:script|style|textarea|title)$/i,V=(t=>(e,...r)=>({_$litType$:t,strings:e,values:r}))(1),B=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),Y=new WeakMap,G=T.createTreeWalker(T,129);function F(t,e){if(!H(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const X=(t,e)=>{const r=t.length-1,i=[];let a,s=2===e?"<svg>":3===e?"<math>":"",o=M;for(let e=0;e<r;e++){const r=t[e];let n,d,h=-1,c=0;for(;c<r.length&&(o.lastIndex=c,d=o.exec(r),null!==d);)c=o.lastIndex,o===M?"!--"===d[1]?o=j:void 0!==d[1]?o=z:void 0!==d[2]?(L.test(d[2])&&(a=RegExp("</"+d[2],"g")),o=q):void 0!==d[3]&&(o=q):o===q?">"===d[0]?(o=a??M,h=-1):void 0===d[1]?h=-2:(h=o.lastIndex-d[2].length,n=d[1],o=void 0===d[3]?q:'"'===d[3]?I:D):o===I||o===D?o=q:o===j||o===z?o=M:(o=q,a=void 0);const l=o===q&&t[e+1].startsWith("/>")?" ":"";s+=o===M?r+O:h>=0?(i.push(n),r.slice(0,h)+k+r.slice(h)+C+l):r+C+(-2===h?e:l)}return[F(t,s+(t[r]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class J{constructor({strings:t,_$litType$:e},r){let i;this.parts=[];let a=0,s=0;const o=t.length-1,n=this.parts,[d,h]=X(t,e);if(this.el=J.createElement(d,r),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=G.nextNode())&&n.length<o;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(k)){const e=h[s++],r=i.getAttribute(t).split(C),o=/([.?@])?(.*)/.exec(e);n.push({type:1,index:a,name:o[2],strings:r,ctor:"."===o[1]?et:"?"===o[1]?rt:"@"===o[1]?it:tt}),i.removeAttribute(t)}else t.startsWith(C)&&(n.push({type:6,index:a}),i.removeAttribute(t));if(L.test(i.tagName)){const t=i.textContent.split(C),e=t.length-1;if(e>0){i.textContent=S?S.emptyScript:"";for(let r=0;r<e;r++)i.append(t[r],U()),G.nextNode(),n.push({type:2,index:++a});i.append(t[e],U())}}}else if(8===i.nodeType)if(i.data===P)n.push({type:2,index:a});else{let t=-1;for(;-1!==(t=i.data.indexOf(C,t+1));)n.push({type:7,index:a}),t+=C.length-1}a++}}static createElement(t,e){const r=T.createElement("template");return r.innerHTML=t,r}}function K(t,e,r=t,i){if(e===B)return e;let a=void 0!==i?r._$Co?.[i]:r._$Cl;const s=N(e)?void 0:e._$litDirective$;return a?.constructor!==s&&(a?._$AO?.(!1),void 0===s?a=void 0:(a=new s(t),a._$AT(t,r,i)),void 0!==i?(r._$Co??=[])[i]=a:r._$Cl=a),void 0!==a&&(e=K(t,a._$AS(t,e.values),a,i)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:r}=this._$AD,i=(t?.creationScope??T).importNode(e,!0);G.currentNode=i;let a=G.nextNode(),s=0,o=0,n=r[0];for(;void 0!==n;){if(s===n.index){let e;2===n.type?e=new Q(a,a.nextSibling,this,t):1===n.type?e=new n.ctor(a,n.name,n.strings,this,t):6===n.type&&(e=new at(a,this,t)),this._$AV.push(e),n=r[++o]}s!==n?.index&&(a=G.nextNode(),s++)}return G.currentNode=T,i}p(t){let e=0;for(const r of this._$AV)void 0!==r&&(void 0!==r.strings?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,i){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),N(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>H(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:r}=t,i="number"==typeof r?this._$AC(t):(void 0===r.el&&(r.el=J.createElement(F(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Z(i,this),r=t.u(this.options);t.p(e),this.T(r),this._$AH=t}}_$AC(t){let e=Y.get(t.strings);return void 0===e&&Y.set(t.strings,e=new J(t)),e}k(t){H(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,i=0;for(const a of t)i===e.length?e.push(r=new Q(this.O(U()),this.O(U()),this,this.options)):r=e[i],r._$AI(a),i++;i<e.length&&(this._$AR(r&&r._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,i,a){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=a,r.length>2||""!==r[0]||""!==r[1]?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=W}_$AI(t,e=this,r,i){const a=this.strings;let s=!1;if(void 0===a)t=K(this,t,e,0),s=!N(t)||t!==this._$AH&&t!==B,s&&(this._$AH=t);else{const i=t;let o,n;for(t=a[0],o=0;o<a.length-1;o++)n=K(this,i[r+o],e,o),n===B&&(n=this._$AH[o]),s||=!N(n)||n!==this._$AH[o],n===W?t=W:t!==W&&(t+=(n??"")+a[o+1]),this._$AH[o]=n}s&&!i&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class rt extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class it extends tt{constructor(t,e,r,i,a){super(t,e,r,i,a),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??W)===B)return;const r=this._$AH,i=t===W&&r!==W||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,a=t!==W&&(r===W||i);i&&this.element.removeEventListener(this.name,this,r),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class at{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const st=A.litHtmlPolyfillSupport;st?.(J,Q),(A.litHtmlVersions??=[]).push("3.3.3");const ot=globalThis;class nt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,r)=>{const i=r?.renderBefore??e;let a=i._$litPart$;if(void 0===a){const t=r?.renderBefore??null;i._$litPart$=a=new Q(e.insertBefore(U(),t),t,void 0,r??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}nt._$litElement$=!0,nt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:nt});const dt=ot.litElementPolyfillSupport;dt?.({LitElement:nt}),(ot.litElementVersions??=[]).push("4.2.2");const ht={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:$},ct=(t=ht,e,r)=>{const{kind:i,metadata:a}=r;let s=globalThis.litPropertyMetadata.get(a);if(void 0===s&&globalThis.litPropertyMetadata.set(a,s=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),s.set(r.name,t),"accessor"===i){const{name:i}=r;return{set(r){const a=e.get.call(this);e.set.call(this,r),this.requestUpdate(i,a,t,!0,r)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=r;return function(r){const a=this[i];e.call(this,r),this.requestUpdate(i,a,t,!0,r)}}throw Error("Unsupported decorator location: "+i)};function lt(t){return(e,r)=>"object"==typeof r?ct(t,e,r):((t,e,r)=>{const i=e.hasOwnProperty(r);return e.constructor.createProperty(r,t),i?Object.getOwnPropertyDescriptor(e,r):void 0})(t,e,r)}function pt(t){return lt({...t,state:!0,attribute:!1})}const ut=o`
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
`,gt=o`
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
`,ft="0.2.0";console.info(`%c HA-RADIO-CARD %c ${ft} `,"color:#fff;background:#03a9f4","color:#03a9f4;background:#fff");let mt=class extends nt{constructor(){super(...arguments),this._volume=.35,this._phases=[],this._touchedVolume=!1}setConfig(t){if(!t)throw new Error("Invalid configuration");"theme"in t&&console.warn("ha-radio-card: `theme` is not a card option. Set the theme in the HA Radio integration (Settings → Devices & Services → HA Radio → Configure); it applies to every HA Radio card."),this._config=t,t.target&&(this._target=t.target),this._phases=[]}getCardSize(){return 3}getGridOptions(){return{columns:12,rows:3,min_columns:6,min_rows:3}}connectedCallback(){super.connectedCallback(),this._load()}disconnectedCallback(){super.disconnectedCallback(),this._unsub?.then(t=>t()).catch(()=>{}),this._unsub=void 0}async _load(){if(this.hass&&!this._unsub)try{await this._fetch(),this._unsub=this.hass.connection.subscribeMessage(()=>{this._fetch()},{type:"ha_radio/subscribe"})}catch(t){this._error=`Could not reach the HA Radio integration: ${t}`}}willUpdate(){const t=this._radio?.theme??"classic";this.getAttribute("data-theme")!==t&&this.setAttribute("data-theme",t)}async _fetch(){if(this.hass)try{const t=await this.hass.callWS({type:"ha_radio/config"});this._radio=t,this._error=void 0;const e=t=>(t||"0").split(".")[0];e(t.version)!==e(ft)&&console.warn(`ha-radio-card: card is ${ft} but the integration is ${t.version} — major versions differ, so they may be incompatible. Update both, then hard-reload to clear the cached bundle.`),void 0===this._target&&(this._target=t.current_target??t.targets[0]?.entity_id),void 0===t.default_volume||this._touchedVolume||(this._volume=t.default_volume)}catch(t){this._error=String(t)}}get _stationName(){const t=this._radio?.select_entity;return(t?this.hass?.states[t]?.state:void 0)??this._radio?.current_station??this._radio?.stations[0]?.name}get _station(){const t=this._stationName;return this._radio?.stations.find(e=>e.name===t)}get _targetObj(){return this._radio?.targets.find(t=>t.entity_id===this._target)}get _isPlaying(){if(!this._target||!this.hass)return!1;const t=this.hass.states[this._target];if(!t)return!1;if("playing"!==t.state&&"buffering"!==t.state)return!1;const e=this._station?.url,r=t.attributes.media_content_id;return e&&"string"==typeof r?r===e:"playing"===t.state}get _tickerText(){const t=this._stationName??"—";if(!this._isPlaying)return`Stopped — ${t}`;const e=this._target?this.hass?.states[this._target]?.attributes:void 0,r=e?.media_title,i=e?.media_artist;let a="";return"string"==typeof r&&r&&r!==t&&(a="string"==typeof i&&i&&"Live radio"!==i?` — ${i} · ${r}`:` — ${r}`),`Playing: ${t}${a}`}_call(t,e={}){this.hass?.callService("ha_radio",t,e)}_play(){this._call("play",{station:this._stationName,target:this._target,volume:this._volume})}_stop(){this._call("stop",{target:this._target})}_step(t){const e=this._radio?.stations??[];if(!e.length)return;const r=e.findIndex(t=>t.name===this._stationName),i=e[(Math.max(r,0)+t+e.length)%e.length];this._selectStation(i.name)}_selectStation(t){const e=this._radio?.select_entity;e&&this.hass?.callService("select","select_option",{entity_id:e,option:t}),this._isPlaying&&this._call("play",{station:t,target:this._target,volume:this._volume})}_onVolume(t){this._touchedVolume=!0,this._volume=Number(t.target.value),this._isPlaying&&this._targetObj?.supports_volume&&this.hass?.callService("media_player","volume_set",{entity_id:this._target,volume_level:this._volume})}render(){if(!this._config||!this.hass)return W;const t=this._isPlaying;return V`
      <ha-card style=${"--rad-eq-state:"+(t?"running":"paused")}>
        ${this._error?V`<div class="err">${this._error}</div>`:W}
        ${this._radio&&!this._radio.ready?V`<div class="err">HA Radio integration is not ready yet.</div>`:W}

        <div class="top">
          ${this._station?.logo?V`<img class="logo" src=${this._station.logo} alt="" />`:W}
          <div class="titles">
            <div class="station">${this._stationName??"No stations configured"}</div>
            <div class="sub">
              ${this._targetObj?`${this._targetObj.name}${this._targetObj.is_group?" · group":""}`:"No target available"}
            </div>
          </div>
          ${this._showEqualizer?this._renderEqualizer():W}
        </div>

        ${!1===this._config.show_ticker?W:V`
              <div class="ticker">
                <div class=${"ticker-track"+(t?" run":"")}>
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
            ${(this._radio?.stations??[]).map(t=>V`<option value=${t.name} ?selected=${t.name===this._stationName}>${t.name}</option>`)}
          </select>
        </div>

        ${!1===this._config.show_target_picker?W:V`
              <div class="row">
                <select
                  aria-label="Target"
                  @change=${t=>{this._target=t.target.value}}
                >
                  ${(this._radio?.targets??[]).map(t=>V`<option value=${t.entity_id} ?selected=${t.entity_id===this._target}>
                      ${t.name}${t.is_group?" (group)":""}
                    </option>`)}
                </select>
              </div>
            `}

        <div class="row">
          <span aria-hidden="true">🔈</span>
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
    `}get _showEqualizer(){return!1!==this._config?.show_equalizer}_renderEqualizer(){const t=Math.max(3,Math.min(24,this._config?.bars??7));this._phases.length!==t&&(this._phases=Array.from({length:t},(t,e)=>137.508*e%100));const e=.35+.65*this._volume;return V`
      <div class="eq" aria-hidden="true">
        ${this._phases.map((t,r)=>V`<i
            style=${`animation-delay:-${12*t}ms;animation-duration:calc(var(--rad-bar-period) * ${(.7+7*r%10/14).toFixed(2)});max-height:${(100*e).toFixed(0)}%`}
          ></i>`)}
      </div>
    `}};mt.styles=[ut,gt,o`
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
        will-change: transform;
      }
      .ticker-track.run {
        animation: rad-marquee var(--rad-ticker-period, 14s) linear infinite;
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
    `],t([lt({attribute:!1})],mt.prototype,"hass",void 0),t([pt()],mt.prototype,"_config",void 0),t([pt()],mt.prototype,"_radio",void 0),t([pt()],mt.prototype,"_target",void 0),t([pt()],mt.prototype,"_volume",void 0),t([pt()],mt.prototype,"_error",void 0),mt=t([(t=>(e,r)=>{void 0!==r?r.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})("ha-radio-card")],mt);const _t=window;_t.customCards=_t.customCards||[],_t.customCards.push({type:"ha-radio-card",name:"HA Radio",description:"Internet radio with themed equalizer (companion to the HA Radio integration)",preview:!0,documentationURL:"http://192.168.2.6:3001/padlefot/ha_radio_card",getEntitySuggestion:(t,e)=>"select.ha_radio_station"===e?{config:{type:"custom:ha-radio-card"}}:null});export{mt as HaRadioCard};
