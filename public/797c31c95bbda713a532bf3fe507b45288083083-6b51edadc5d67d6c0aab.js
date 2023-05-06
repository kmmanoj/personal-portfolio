/*! For license information please see 797c31c95bbda713a532bf3fe507b45288083083-6b51edadc5d67d6c0aab.js.LICENSE.txt */
(self.webpackChunkkmmanoj_portfolio=self.webpackChunkkmmanoj_portfolio||[]).push([[887],{5900:function(e,t){var n;!function(){"use strict";var i={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var l=typeof n;if("string"===l||"number"===l)e.push(n);else if(Array.isArray(n)){if(n.length){var o=r.apply(null,n);o&&e.push(o)}}else if("object"===l)if(n.toString===Object.prototype.toString)for(var a in n)i.call(n,a)&&n[a]&&e.push(a);else e.push(n.toString())}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(n=function(){return r}.apply(t,[]))||(e.exports=n)}()},1046:function(e,t,n){"use strict";n.d(t,{w_:function(){return c}});var i=n(7294),r={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},l=i.createContext&&i.createContext(r),o=function(){return o=Object.assign||function(e){for(var t,n=1,i=arguments.length;n<i;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e},o.apply(this,arguments)},a=function(e,t){var n={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(n[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(i=Object.getOwnPropertySymbols(e);r<i.length;r++)t.indexOf(i[r])<0&&Object.prototype.propertyIsEnumerable.call(e,i[r])&&(n[i[r]]=e[i[r]])}return n};function s(e){return e&&e.map((function(e,t){return i.createElement(e.tag,o({key:t},e.attr),s(e.child))}))}function c(e){return function(t){return i.createElement(u,o({attr:o({},e.attr)},t),s(e.child))}}function u(e){var t=function(t){var n,r=e.attr,l=e.size,s=e.title,c=a(e,["attr","size","title"]),u=l||t.size||"1em";return t.className&&(n=t.className),e.className&&(n=(n?n+" ":"")+e.className),i.createElement("svg",o({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,r,c,{className:n,style:o(o({color:e.color||t.color},t.style),e.style),height:u,width:u,xmlns:"http://www.w3.org/2000/svg"}),s&&i.createElement("title",null,s),e.children)};return void 0!==l?i.createElement(l.Consumer,null,(function(e){return t(e)})):t(r)}},660:function(e,t,n){"use strict";n.r(t),n.d(t,{InView:function(){return h},default:function(){return h},defaultFallbackInView:function(){return u},observe:function(){return m},useInView:function(){return v}});var i=n(7294);function r(){return r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},r.apply(this,arguments)}function l(e,t){return l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},l(e,t)}var o=new Map,a=new WeakMap,s=0,c=void 0;function u(e){c=e}function d(e){return Object.keys(e).sort().filter((function(t){return void 0!==e[t]})).map((function(t){return t+"_"+("root"===t?(n=e.root)?(a.has(n)||(s+=1,a.set(n,s.toString())),a.get(n)):"0":e[t]);var n})).toString()}function m(e,t,n,i){if(void 0===n&&(n={}),void 0===i&&(i=c),void 0===window.IntersectionObserver&&void 0!==i){var r=e.getBoundingClientRect();return t(i,{isIntersecting:i,target:e,intersectionRatio:"number"==typeof n.threshold?n.threshold:0,time:0,boundingClientRect:r,intersectionRect:r,rootBounds:r}),function(){}}var l=function(e){var t=d(e),n=o.get(t);if(!n){var i,r=new Map,l=new IntersectionObserver((function(t){t.forEach((function(t){var n,l=t.isIntersecting&&i.some((function(e){return t.intersectionRatio>=e}));e.trackVisibility&&void 0===t.isVisible&&(t.isVisible=l),null==(n=r.get(t.target))||n.forEach((function(e){e(l,t)}))}))}),e);i=l.thresholds||(Array.isArray(e.threshold)?e.threshold:[e.threshold||0]),n={id:t,observer:l,elements:r},o.set(t,n)}return n}(n),a=l.id,s=l.observer,u=l.elements,m=u.get(e)||[];return u.has(e)||u.set(e,m),m.push(t),s.observe(e),function(){m.splice(m.indexOf(t),1),0===m.length&&(u.delete(e),s.unobserve(e)),0===u.size&&(s.disconnect(),o.delete(a))}}var f=["children","as","tag","triggerOnce","threshold","root","rootMargin","onChange","skip","trackVisibility","delay","initialInView","fallbackInView"];function p(e){return"function"!=typeof e.children}var h=function(e){var t,n;function o(t){var n;return(n=e.call(this,t)||this).node=null,n._unobserveCb=null,n.handleNode=function(e){n.node&&(n.unobserve(),e||n.props.triggerOnce||n.props.skip||n.setState({inView:!!n.props.initialInView,entry:void 0})),n.node=e||null,n.observeNode()},n.handleChange=function(e,t){e&&n.props.triggerOnce&&n.unobserve(),p(n.props)||n.setState({inView:e,entry:t}),n.props.onChange&&n.props.onChange(e,t)},n.state={inView:!!t.initialInView,entry:void 0},n}n=e,(t=o).prototype=Object.create(n.prototype),t.prototype.constructor=t,l(t,n);var a=o.prototype;return a.componentDidUpdate=function(e){e.rootMargin===this.props.rootMargin&&e.root===this.props.root&&e.threshold===this.props.threshold&&e.skip===this.props.skip&&e.trackVisibility===this.props.trackVisibility&&e.delay===this.props.delay||(this.unobserve(),this.observeNode())},a.componentWillUnmount=function(){this.unobserve(),this.node=null},a.observeNode=function(){if(this.node&&!this.props.skip){var e=this.props,t=e.threshold,n=e.root,i=e.rootMargin,r=e.trackVisibility,l=e.delay,o=e.fallbackInView;this._unobserveCb=m(this.node,this.handleChange,{threshold:t,root:n,rootMargin:i,trackVisibility:r,delay:l},o)}},a.unobserve=function(){this._unobserveCb&&(this._unobserveCb(),this._unobserveCb=null)},a.render=function(){if(!p(this.props)){var e=this.state,t=e.inView,n=e.entry;return this.props.children({inView:t,entry:n,ref:this.handleNode})}var l=this.props,o=l.children,a=l.as,s=l.tag,c=function(e,t){if(null==e)return{};var n,i,r={},l=Object.keys(e);for(i=0;i<l.length;i++)n=l[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}(l,f);return i.createElement(a||s||"div",r({ref:this.handleNode},c),o)},o}(i.Component);function v(e){var t=void 0===e?{}:e,n=t.threshold,r=t.delay,l=t.trackVisibility,o=t.rootMargin,a=t.root,s=t.triggerOnce,c=t.skip,u=t.initialInView,d=t.fallbackInView,f=i.useRef(),p=i.useState({inView:!!u}),h=p[0],v=p[1],y=i.useCallback((function(e){void 0!==f.current&&(f.current(),f.current=void 0),c||e&&(f.current=m(e,(function(e,t){v({inView:e,entry:t}),t.isIntersecting&&s&&f.current&&(f.current(),f.current=void 0)}),{root:a,rootMargin:o,threshold:n,trackVisibility:l,delay:r},d))}),[Array.isArray(n)?n.toString():n,a,o,s,c,l,d,r]);(0,i.useEffect)((function(){f.current||!h.entry||s||c||v({inView:!!u})}));var b=[y,h.inView,h.entry];return b.ref=b[0],b.inView=b[1],b.entry=b[2],b}h.displayName="InView",h.defaultProps={threshold:0,triggerOnce:!1,initialInView:!1}},5238:function(e,t,n){"use strict";t.Z=void 0;var i=o(n(7294)),r=o(n(5697)),l=o(n(5900));function o(e){return e&&e.__esModule?e:{default:e}}var a=function(e){var t=e.animate,n=e.className,r=e.layout,o=e.lineColor,a=e.children;return"object"==typeof window&&document.documentElement.style.setProperty("--line-color",o),i.default.createElement("div",{className:(0,l.default)(n,"vertical-timeline",{"vertical-timeline--animate":t,"vertical-timeline--two-columns":"2-columns"===r,"vertical-timeline--one-column-left":"1-column"===r||"1-column-left"===r,"vertical-timeline--one-column-right":"1-column-right"===r})},a)};a.propTypes={children:r.default.oneOfType([r.default.arrayOf(r.default.node),r.default.node]).isRequired,className:r.default.string,animate:r.default.bool,layout:r.default.oneOf(["1-column-left","1-column","2-columns","1-column-right"]),lineColor:r.default.string},a.defaultProps={animate:!0,className:"",layout:"2-columns",lineColor:"#FFF"};var s=a;t.Z=s},7038:function(e,t,n){"use strict";t.Z=void 0;var i=a(n(7294)),r=a(n(5697)),l=a(n(5900)),o=n(660);function a(e){return e&&e.__esModule?e:{default:e}}var s=function(e){var t=e.children,n=e.className,r=e.contentArrowStyle,a=e.contentStyle,s=e.date,c=e.dateClassName,u=e.icon,d=e.iconClassName,m=e.iconOnClick,f=e.onTimelineElementClick,p=e.iconStyle,h=e.id,v=e.position,y=e.style,b=e.textClassName,g=e.intersectionObserverProps,w=e.visible;return i.default.createElement(o.InView,g,(function(e){var o=e.inView,g=e.ref;return i.default.createElement("div",{ref:g,id:h,className:(0,l.default)(n,"vertical-timeline-element",{"vertical-timeline-element--left":"left"===v,"vertical-timeline-element--right":"right"===v,"vertical-timeline-element--no-children":""===t}),style:y},i.default.createElement(i.default.Fragment,null,i.default.createElement("span",{style:p,onClick:m,className:(0,l.default)(d,"vertical-timeline-element-icon",{"bounce-in":o||w,"is-hidden":!(o||w)})},u),i.default.createElement("div",{style:a,onClick:f,className:(0,l.default)(b,"vertical-timeline-element-content",{"bounce-in":o||w,"is-hidden":!(o||w)})},i.default.createElement("div",{style:r,className:"vertical-timeline-element-content-arrow"}),t,i.default.createElement("span",{className:(0,l.default)(c,"vertical-timeline-element-date")},s))))}))};s.propTypes={children:r.default.oneOfType([r.default.arrayOf(r.default.node),r.default.node]),className:r.default.string,contentArrowStyle:r.default.shape({}),contentStyle:r.default.shape({}),date:r.default.node,dateClassName:r.default.string,icon:r.default.element,iconClassName:r.default.string,iconStyle:r.default.shape({}),iconOnClick:r.default.func,onTimelineElementClick:r.default.func,id:r.default.string,position:r.default.string,style:r.default.shape({}),textClassName:r.default.string,visible:r.default.bool,intersectionObserverProps:r.default.shape({root:r.default.object,rootMargin:r.default.string,threshold:r.default.number,triggerOnce:r.default.bool})},s.defaultProps={children:"",className:"",contentArrowStyle:null,contentStyle:null,icon:null,iconClassName:"",iconOnClick:null,onTimelineElementClick:null,iconStyle:null,id:"",style:null,date:"",dateClassName:"",position:"",textClassName:"",visible:!1,intersectionObserverProps:{rootMargin:"0px 0px -40px 0px",triggerOnce:!0}};var c=s;t.Z=c},7772:function(e,t,n){"use strict";e.exports={VerticalTimeline:n(5238).Z,VerticalTimelineElement:n(7038).Z}},1171:function(e,t,n){"use strict";var i=n(7294),r=n(14),l=n.n(r),o=n(5444);t.Z=function(e){var t=(0,i.useState)(!1),n=t[0],r=t[1],a=e.active;return i.createElement("nav",{className:"bg-black opacity-90 sticky top-0 z-50"},i.createElement("div",{className:"max-w-7xl mx-auto px-8 py-5"},i.createElement("div",{className:"flex items-center justify-between h-16"},i.createElement(l(),{top:!0,cascade:!0},i.createElement("div",{className:"w-full justify-between flex items-center"},i.createElement("a",{className:"text-white text-2xl md:text-4xl flex-shrink-0",href:"/"},"Manoj Vignesh K M"),i.createElement("div",{className:"hidden md:block"},i.createElement("div",{className:"ml-10 flex items-baseline space-x-4"},i.createElement(o.Link,{className:"text-white py-2 text-base font-medium "+("home"===a?"link-underline-active":"link-underline"),to:"/"},"Home"),i.createElement(o.Link,{className:"text-white py-2 text-base font-medium "+("about"===a?"link-underline-active":"link-underline"),to:"/about"},"About"),i.createElement(o.Link,{className:"text-white py-2 text-base font-medium "+("resume"===a?"link-underline-active":"link-underline"),to:"/resume"},"Resume"),i.createElement(o.Link,{className:"text-white py-2 text-base font-medium "+("my-works"===a?"link-underline-active":"link-underline"),to:"/my-works"},"My Works"))))),i.createElement("div",{className:"-mr-2 flex md:hidden"},i.createElement("button",{onClick:function(){return r(!n)},className:"text-white hover:text-primary inline-flex items-center justify-center p-2 rounded-md focus:outline-none"},i.createElement("svg",{width:"20",height:"20",fill:"white",className:"h-8 w-8",viewBox:"0 0 1792 1792",xmlns:"http://www.w3.org/2000/svg"},i.createElement("path",{d:"M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"})))))),n&&i.createElement("div",{className:"md:hidden"},i.createElement("div",{className:"md-px-2 pt-2 pb-3 space-y-1 flex flex-col sm:px-3"},i.createElement(o.Link,{className:"text-white mx-3 py-2 w-2/12 text-base font-medium "+("home"===a?"link-underline-active":"link-underline"),to:"/"},"Home"),i.createElement(o.Link,{className:"text-white mx-3 py-2 w-2/12 text-base font-medium "+("about"===a?"link-underline-active":"link-underline"),to:"/about"},"About"),i.createElement(o.Link,{className:"text-white mx-3 py-2 w-2/12 text-base font-medium "+("resume"===a?"link-underline-active":"link-underline"),to:"/resume"},"Resume"),i.createElement(o.Link,{className:"text-white mx-3 py-2 w-4/12 text-base font-medium "+("my-works"===a?"link-underline-active":"link-underline"),to:"/my-works"},"My Works"))))}}}]);
//# sourceMappingURL=797c31c95bbda713a532bf3fe507b45288083083-6b51edadc5d67d6c0aab.js.map