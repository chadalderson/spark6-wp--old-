/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-inlinesvg-svg-svgclippaths-touch-cssclasses-teststyles-testprop-testallprops-prefixes-domprefixes
 */
;window.Modernizr=function(a,b,c){function A(a){j.cssText=a}function B(a,b){return A(m.join(a+";")+(b||""))}function C(a,b){return typeof a===b}function D(a,b){return!!~(""+a).indexOf(b)}function E(a,b){for(var d in a){var e=a[d];if(!D(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function F(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:C(f,"function")?f.bind(d||b):f}return!1}function G(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return C(b,"string")||C(b,"undefined")?E(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),F(e,b,c))}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={svg:"http://www.w3.org/2000/svg"},r={},s={},t={},u=[],v=u.slice,w,x=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},y={}.hasOwnProperty,z;!C(y,"undefined")&&!C(y.call,"undefined")?z=function(a,b){return y.call(a,b)}:z=function(a,b){return b in a&&C(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=v.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(v.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(v.call(arguments)))};return e}),r.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:x(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},r.svg=function(){return!!b.createElementNS&&!!b.createElementNS(q.svg,"svg").createSVGRect},r.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==q.svg},r.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(l.call(b.createElementNS(q.svg,"clipPath")))};for(var H in r)z(r,H)&&(w=H.toLowerCase(),e[w]=r[H](),u.push((e[w]?"":"no-")+w));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)z(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},A(""),i=k=null,e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.testProp=function(a){return E([a])},e.testAllProps=G,e.testStyles=x,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+u.join(" "):""),e}(this,this.document);

/* jQuery Stick 'em
/**
 * @name jQuery Stick 'em
 * @author Trevor Davis
 * @version 1.4
 *
 *	$('.container').stickem({
 *	 	item: '.stickem',
 *		container: '.stickem-container',
 *		stickClass: 'stickit',
 *		endStickClass: 'stickit-end',
 *		offset: 0,
 *		onStick: null,
 *		onUnstick: null
 *	});
 */

;(function($, window, document, undefined) {

	var Stickem = function(elem, options) {
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data("stickem-options");
		this.$win = $(window);
	};

	Stickem.prototype = {
		defaults: {
			item: '.stickem',
			container: '.stickem-container',
			stickClass: 'stickit',
			endStickClass: 'stickit-end',
			offset: 0,
			start: 0,
			onStick: null,
			onUnstick: null
		},

		init: function() {
			var _self = this;

			//Merge options
			_self.config = $.extend({}, _self.defaults, _self.options, _self.metadata);

			_self.setWindowHeight();
			_self.getItems();
			_self.bindEvents();

			return _self;
		},

		bindEvents: function() {
			var _self = this;
			
			_self.$win.on('scroll.stickem', $.proxy(_self.handleScroll, _self));
			_self.$win.on('resize.stickem', $.proxy(_self.handleResize, _self));
		},

		destroy: function() {
			var _self = this;

			_self.$win.off('scroll.stickem');
			_self.$win.off('resize.stickem');
		},

		getItem: function(index, element) {
			var _self = this;
			var $this = $(element);
			var item = {
				$elem: $this,
				elemHeight: $this.height(),
				$container: $this.parents(_self.config.container),
				isStuck: false
			};

			//If the element is smaller than the window
			if(_self.windowHeight > item.elemHeight) {
				item.containerHeight = item.$container.outerHeight();
				item.containerInner = {
					border: {
						bottom: parseInt(item.$container.css('border-bottom'), 10) || 0,
						top: parseInt(item.$container.css('border-top'), 10) || 0
					},
					padding: {
						bottom: parseInt(item.$container.css('padding-bottom'), 10) || 0,
						top: parseInt(item.$container.css('padding-top'), 10) || 0
					}
				};

				item.containerInnerHeight = item.$container.height();
				item.containerStart = item.$container.offset().top - _self.config.offset + _self.config.start + /*item.containerInner.padding.top*/ + item.containerInner.border.top;
				item.scrollFinish = item.containerStart - _self.config.start + (item.containerInnerHeight /*- item.elemHeight*/ );

				//If the element is smaller than the container
				if(item.containerInnerHeight > item.elemHeight) {
					_self.items.push(item);
				}
			} else {
				item.$elem.removeClass(_self.config.stickClass + ' ' + _self.config.endStickClass);
				item.$container.removeClass(_self.config.stickClass + ' ' + _self.config.endStickClass);
			}
		},

		getItems: function() {
			var _self = this;

			_self.items = [];

			_self.$elem.find(_self.config.item).each($.proxy(_self.getItem, _self));
		},

		handleResize: function() {
			var _self = this;

			_self.getItems();
			_self.setWindowHeight();
		},

		handleScroll: function() {
			var _self = this;

			if(_self.items.length > 0) {
				var pos = _self.$win.scrollTop();

				for(var i = 0, len = _self.items.length; i < len; i++) {
					var item = _self.items[i];

					//If it's stuck, and we need to unstick it
					if(item.isStuck && (pos < item.containerStart || pos > item.scrollFinish)) {
						item.$elem.removeClass(_self.config.stickClass);
						item.$container.removeClass(_self.config.stickClass);

						//only at the bottom
						if(pos > item.scrollFinish) {
							item.$elem.addClass(_self.config.endStickClass);
							item.$container.addClass(_self.config.endStickClass);
						}

						item.isStuck = false;

						//if supplied fire the onUnstick callback
						if(_self.config.onUnstick) {
							_self.config.onUnstick(item);
						}

					//If we need to stick it
					} else if(item.isStuck === false && pos > item.containerStart && pos < item.scrollFinish) {
							//console.log('pos: '+pos);
							//console.log('item.containerStart: ' + item.containerStart );
							//console.log('item.scrollFinish: ' + item.scrollFinish );
							item.$elem.removeClass(_self.config.endStickClass).addClass(_self.config.stickClass);
							item.$container.removeClass(_self.config.endStickClass).addClass(_self.config.stickClass);
							item.isStuck = true;

							//if supplied fire the onStick callback
							if(_self.config.onStick) {
								_self.config.onStick(item);
							}
					}
				}
			}
		},

		setWindowHeight: function() {
			var _self = this;

			_self.windowHeight = _self.$win.height() - _self.config.offset;
		}
	};

	Stickem.defaults = Stickem.prototype.defaults;

	$.fn.stickem = function(options) {
		//Create a destroy method so that you can kill it and call it again.
		this.destroy = function() {
			this.each(function() {
				new Stickem(this, options).destroy();
			});
		};

		return this.each(function() {
			new Stickem(this, options).init();
		});
	};

})(jQuery, window , document);

/*! jQuery Color v@2.1.2 http://github.com/jquery/jquery-color | jquery.org/license */
(function(a,b){function m(a,b,c){var d=h[b.type]||{};return a==null?c||!b.def?null:b.def:(a=d.floor?~~a:parseFloat(a),isNaN(a)?b.def:d.mod?(a+d.mod)%d.mod:0>a?0:d.max<a?d.max:a)}function n(b){var c=f(),d=c._rgba=[];return b=b.toLowerCase(),l(e,function(a,e){var f,h=e.re.exec(b),i=h&&e.parse(h),j=e.space||"rgba";if(i)return f=c[j](i),c[g[j].cache]=f[g[j].cache],d=c._rgba=f._rgba,!1}),d.length?(d.join()==="0,0,0,0"&&a.extend(d,k.transparent),c):k[b]}function o(a,b,c){return c=(c+1)%1,c*6<1?a+(b-a)*c*6:c*2<1?b:c*3<2?a+(b-a)*(2/3-c)*6:a}var c="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",d=/^([\-+])=\s*(\d+\.?\d*)/,e=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(a){return[a[1],a[2],a[3],a[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(a){return[a[1]*2.55,a[2]*2.55,a[3]*2.55,a[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(a){return[parseInt(a[1],16),parseInt(a[2],16),parseInt(a[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(a){return[parseInt(a[1]+a[1],16),parseInt(a[2]+a[2],16),parseInt(a[3]+a[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(a){return[a[1],a[2]/100,a[3]/100,a[4]]}}],f=a.Color=function(b,c,d,e){return new a.Color.fn.parse(b,c,d,e)},g={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},h={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},i=f.support={},j=a("<p>")[0],k,l=a.each;j.style.cssText="background-color:rgba(1,1,1,.5)",i.rgba=j.style.backgroundColor.indexOf("rgba")>-1,l(g,function(a,b){b.cache="_"+a,b.props.alpha={idx:3,type:"percent",def:1}}),f.fn=a.extend(f.prototype,{parse:function(c,d,e,h){if(c===b)return this._rgba=[null,null,null,null],this;if(c.jquery||c.nodeType)c=a(c).css(d),d=b;var i=this,j=a.type(c),o=this._rgba=[];d!==b&&(c=[c,d,e,h],j="array");if(j==="string")return this.parse(n(c)||k._default);if(j==="array")return l(g.rgba.props,function(a,b){o[b.idx]=m(c[b.idx],b)}),this;if(j==="object")return c instanceof f?l(g,function(a,b){c[b.cache]&&(i[b.cache]=c[b.cache].slice())}):l(g,function(b,d){var e=d.cache;l(d.props,function(a,b){if(!i[e]&&d.to){if(a==="alpha"||c[a]==null)return;i[e]=d.to(i._rgba)}i[e][b.idx]=m(c[a],b,!0)}),i[e]&&a.inArray(null,i[e].slice(0,3))<0&&(i[e][3]=1,d.from&&(i._rgba=d.from(i[e])))}),this},is:function(a){var b=f(a),c=!0,d=this;return l(g,function(a,e){var f,g=b[e.cache];return g&&(f=d[e.cache]||e.to&&e.to(d._rgba)||[],l(e.props,function(a,b){if(g[b.idx]!=null)return c=g[b.idx]===f[b.idx],c})),c}),c},_space:function(){var a=[],b=this;return l(g,function(c,d){b[d.cache]&&a.push(c)}),a.pop()},transition:function(a,b){var c=f(a),d=c._space(),e=g[d],i=this.alpha()===0?f("transparent"):this,j=i[e.cache]||e.to(i._rgba),k=j.slice();return c=c[e.cache],l(e.props,function(a,d){var e=d.idx,f=j[e],g=c[e],i=h[d.type]||{};if(g===null)return;f===null?k[e]=g:(i.mod&&(g-f>i.mod/2?f+=i.mod:f-g>i.mod/2&&(f-=i.mod)),k[e]=m((g-f)*b+f,d))}),this[d](k)},blend:function(b){if(this._rgba[3]===1)return this;var c=this._rgba.slice(),d=c.pop(),e=f(b)._rgba;return f(a.map(c,function(a,b){return(1-d)*e[b]+d*a}))},toRgbaString:function(){var b="rgba(",c=a.map(this._rgba,function(a,b){return a==null?b>2?1:0:a});return c[3]===1&&(c.pop(),b="rgb("),b+c.join()+")"},toHslaString:function(){var b="hsla(",c=a.map(this.hsla(),function(a,b){return a==null&&(a=b>2?1:0),b&&b<3&&(a=Math.round(a*100)+"%"),a});return c[3]===1&&(c.pop(),b="hsl("),b+c.join()+")"},toHexString:function(b){var c=this._rgba.slice(),d=c.pop();return b&&c.push(~~(d*255)),"#"+a.map(c,function(a){return a=(a||0).toString(16),a.length===1?"0"+a:a}).join("")},toString:function(){return this._rgba[3]===0?"transparent":this.toRgbaString()}}),f.fn.parse.prototype=f.fn,g.hsla.to=function(a){if(a[0]==null||a[1]==null||a[2]==null)return[null,null,null,a[3]];var b=a[0]/255,c=a[1]/255,d=a[2]/255,e=a[3],f=Math.max(b,c,d),g=Math.min(b,c,d),h=f-g,i=f+g,j=i*.5,k,l;return g===f?k=0:b===f?k=60*(c-d)/h+360:c===f?k=60*(d-b)/h+120:k=60*(b-c)/h+240,h===0?l=0:j<=.5?l=h/i:l=h/(2-i),[Math.round(k)%360,l,j,e==null?1:e]},g.hsla.from=function(a){if(a[0]==null||a[1]==null||a[2]==null)return[null,null,null,a[3]];var b=a[0]/360,c=a[1],d=a[2],e=a[3],f=d<=.5?d*(1+c):d+c-d*c,g=2*d-f;return[Math.round(o(g,f,b+1/3)*255),Math.round(o(g,f,b)*255),Math.round(o(g,f,b-1/3)*255),e]},l(g,function(c,e){var g=e.props,h=e.cache,i=e.to,j=e.from;f.fn[c]=function(c){i&&!this[h]&&(this[h]=i(this._rgba));if(c===b)return this[h].slice();var d,e=a.type(c),k=e==="array"||e==="object"?c:arguments,n=this[h].slice();return l(g,function(a,b){var c=k[e==="object"?a:b.idx];c==null&&(c=n[b.idx]),n[b.idx]=m(c,b)}),j?(d=f(j(n)),d[h]=n,d):f(n)},l(g,function(b,e){if(f.fn[b])return;f.fn[b]=function(f){var g=a.type(f),h=b==="alpha"?this._hsla?"hsla":"rgba":c,i=this[h](),j=i[e.idx],k;return g==="undefined"?j:(g==="function"&&(f=f.call(this,j),g=a.type(f)),f==null&&e.empty?this:(g==="string"&&(k=d.exec(f),k&&(f=j+parseFloat(k[2])*(k[1]==="+"?1:-1))),i[e.idx]=f,this[h](i)))}})}),f.hook=function(b){var c=b.split(" ");l(c,function(b,c){a.cssHooks[c]={set:function(b,d){var e,g,h="";if(d!=="transparent"&&(a.type(d)!=="string"||(e=n(d)))){d=f(e||d);if(!i.rgba&&d._rgba[3]!==1){g=c==="backgroundColor"?b.parentNode:b;while((h===""||h==="transparent")&&g&&g.style)try{h=a.css(g,"backgroundColor"),g=g.parentNode}catch(j){}d=d.blend(h&&h!=="transparent"?h:"_default")}d=d.toRgbaString()}try{b.style[c]=d}catch(j){}}},a.fx.step[c]=function(b){b.colorInit||(b.start=f(b.elem,c),b.end=f(b.end),b.colorInit=!0),a.cssHooks[c].set(b.elem,b.start.transition(b.end,b.pos))}})},f.hook(c),a.cssHooks.borderColor={expand:function(a){var b={};return l(["Top","Right","Bottom","Left"],function(c,d){b["border"+d+"Color"]=a}),b}},k=a.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}})(jQuery);

/*
 * SVGeezy.js 1.0
*/
var svgeezy=function(){return{init:function(a,b){this.avoid=a||!1,this.filetype=b||"png",this.svgSupport=this.supportsSvg(),this.svgSupport||(this.images=document.getElementsByTagName("img"),this.imgL=this.images.length,this.fallbacks())},fallbacks:function(){for(;this.imgL--;)if(!this.hasClass(this.images[this.imgL],this.avoid)||!this.avoid){var a=this.images[this.imgL].getAttribute("src");if(null===a)continue;if("svg"==this.getFileExt(a)){var b=a.replace(".svg","."+this.filetype);this.images[this.imgL].setAttribute("src",b)}}},getFileExt:function(a){var b=a.split(".").pop();return-1!==b.indexOf("?")&&(b=b.split("?")[0]),b},hasClass:function(a,b){return(" "+a.className+" ").indexOf(" "+b+" ")>-1},supportsSvg:function(){return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")}}}();

/*!
 *  GMAP3 Plugin for JQuery 5.1.1 - 2013-05-25
 *  Web site  : http://gmap3.net
 */
(function(y,t){var z,i=0;function J(){if(!z){z={verbose:false,queryLimit:{attempt:5,delay:250,random:250},classes:{Map:google.maps.Map,Marker:google.maps.Marker,InfoWindow:google.maps.InfoWindow,Circle:google.maps.Circle,Rectangle:google.maps.Rectangle,OverlayView:google.maps.OverlayView,StreetViewPanorama:google.maps.StreetViewPanorama,KmlLayer:google.maps.KmlLayer,TrafficLayer:google.maps.TrafficLayer,BicyclingLayer:google.maps.BicyclingLayer,GroundOverlay:google.maps.GroundOverlay,StyledMapType:google.maps.StyledMapType,ImageMapType:google.maps.ImageMapType},map:{mapTypeId:google.maps.MapTypeId.ROADMAP,center:[46.578498,2.457275],zoom:2},overlay:{pane:"floatPane",content:"",offset:{x:0,y:0}},geoloc:{getCurrentPosition:{maximumAge:60000,timeout:5000}}}}}function k(M,L){return M!==t?M:"gmap3_"+(L?i+1:++i)}function d(L){var O=function(P){return parseInt(P,10)},N=google.maps.version.split(".").map(O),M;L=L.split(".").map(O);for(M=0;M<L.length;M++){if(N.hasOwnProperty(M)){if(N[M]<L[M]){return false}}else{return false}}return true}function n(P,L,N,Q,O){if(L.todo.events||L.todo.onces){var M={id:Q,data:L.todo.data,tag:L.todo.tag};if(L.todo.events){y.each(L.todo.events,function(R,U){var T=P,S=U;if(y.isArray(U)){T=U[0];S=U[1]}google.maps.event.addListener(N,R,function(V){S.apply(T,[O?O:N,V,M])})})}if(L.todo.onces){y.each(L.todo.onces,function(R,U){var T=P,S=U;if(y.isArray(U)){T=U[0];S=U[1]}google.maps.event.addListenerOnce(N,R,function(V){S.apply(T,[O?O:N,V,M])})})}}}function l(){var L=[];this.empty=function(){return !L.length};this.add=function(M){L.push(M)};this.get=function(){return L.length?L[0]:false};this.ack=function(){L.shift()}}function w(T,L,N){var R={},P=this,Q,S={latLng:{map:false,marker:false,infowindow:false,circle:false,overlay:false,getlatlng:false,getmaxzoom:false,getelevation:false,streetviewpanorama:false,getaddress:true},geoloc:{getgeoloc:true}};if(typeof N==="string"){N=M(N)}function M(V){var U={};U[V]={};return U}function O(){var U;for(U in N){if(U in R){continue}return U}}this.run=function(){var U,V;while(U=O()){if(typeof T[U]==="function"){Q=U;V=y.extend(true,{},z[U]||{},N[U].options||{});if(U in S.latLng){if(N[U].values){x(N[U].values,T,T[U],{todo:N[U],opts:V,session:R})}else{v(T,T[U],S.latLng[U],{todo:N[U],opts:V,session:R})}}else{if(U in S.geoloc){o(T,T[U],{todo:N[U],opts:V,session:R})}else{T[U].apply(T,[{todo:N[U],opts:V,session:R}])}}return}else{R[U]=null}}L.apply(T,[N,R])};this.ack=function(U){R[Q]=U;P.run.apply(P,[])}}function c(N){var L,M=[];for(L in N){M.push(L)}return M}function b(N,Q){var L={};if(N.todo){for(var M in N.todo){if((M!=="options")&&(M!=="values")){L[M]=N.todo[M]}}}var O,P=["data","tag","id","events","onces"];for(O=0;O<P.length;O++){A(L,P[O],Q,N.todo)}L.options=y.extend({},N.opts||{},Q.options||{});return L}function A(N,M){for(var L=2;L<arguments.length;L++){if(M in arguments[L]){N[M]=arguments[L][M];return}}}function r(){var L=[];this.get=function(S){if(L.length){var P,O,N,R,M,Q=c(S);for(P=0;P<L.length;P++){R=L[P];M=Q.length==R.keys.length;for(O=0;(O<Q.length)&&M;O++){N=Q[O];M=N in R.request;if(M){if((typeof S[N]==="object")&&("equals" in S[N])&&(typeof S[N]==="function")){M=S[N].equals(R.request[N])}else{M=S[N]===R.request[N]}}}if(M){return R.results}}}};this.store=function(N,M){L.push({request:N,keys:c(N),results:M})}}function e(Q,P,O,L){var N=this,M=[];z.classes.OverlayView.call(this);this.setMap(Q);this.onAdd=function(){var R=this.getPanes();if(P.pane in R){y(R[P.pane]).append(L)}y.each("dblclick click mouseover mousemove mouseout mouseup mousedown".split(" "),function(T,S){M.push(google.maps.event.addDomListener(L[0],S,function(U){y.Event(U).stopPropagation();google.maps.event.trigger(N,S,[U]);N.draw()}))});M.push(google.maps.event.addDomListener(L[0],"contextmenu",function(S){y.Event(S).stopPropagation();google.maps.event.trigger(N,"rightclick",[S]);N.draw()}))};this.getPosition=function(){return O};this.draw=function(){var R=this.getProjection().fromLatLngToDivPixel(O);L.css("left",(R.x+P.offset.x)+"px").css("top",(R.y+P.offset.y)+"px")};this.onRemove=function(){for(var R=0;R<M.length;R++){google.maps.event.removeListener(M[R])}L.remove()};this.hide=function(){L.hide()};this.show=function(){L.show()};this.toggle=function(){if(L){if(L.is(":visible")){this.show()}else{this.hide()}}};this.toggleDOM=function(){if(this.getMap()){this.setMap(null)}else{this.setMap(Q)}};this.getDOMElement=function(){return L[0]}}function f(O,L){function M(){this.onAdd=function(){};this.onRemove=function(){};this.draw=function(){};return z.classes.OverlayView.apply(this,[])}M.prototype=z.classes.OverlayView.prototype;var N=new M();N.setMap(O);return N}function F(ae,ao,aa){var an=false,ai=false,af=false,Z=false,W=true,V=this,N=[],T={},ad={},U={},aj=[],ah=[],O=[],ak=f(ao,aa.radius),Y,ap,am,P,Q;S();function L(aq){if(!aj[aq]){delete ah[aq].options.map;aj[aq]=new z.classes.Marker(ah[aq].options);n(ae,{todo:ah[aq]},aj[aq],ah[aq].id)}}this.getById=function(aq){if(aq in ad){L(ad[aq]);return aj[ad[aq]]}return false};this.rm=function(ar){var aq=ad[ar];if(aj[aq]){aj[aq].setMap(null)}delete aj[aq];aj[aq]=false;delete ah[aq];ah[aq]=false;delete O[aq];O[aq]=false;delete ad[ar];delete U[aq];ai=true};this.clearById=function(aq){if(aq in ad){this.rm(aq);return true}};this.clear=function(az,av,aA){var ar,ay,at,aw,au,ax=[],aq=C(aA);if(az){ar=ah.length-1;ay=-1;at=-1}else{ar=0;ay=ah.length;at=1}for(aw=ar;aw!=ay;aw+=at){if(ah[aw]){if(!aq||aq(ah[aw].tag)){ax.push(U[aw]);if(av||az){break}}}}for(au=0;au<ax.length;au++){this.rm(ax[au])}};this.add=function(aq,ar){aq.id=k(aq.id);this.clearById(aq.id);ad[aq.id]=aj.length;U[aj.length]=aq.id;aj.push(null);ah.push(aq);O.push(ar);ai=true};this.addMarker=function(ar,aq){aq=aq||{};aq.id=k(aq.id);this.clearById(aq.id);if(!aq.options){aq.options={}}aq.options.position=ar.getPosition();n(ae,{todo:aq},ar,aq.id);ad[aq.id]=aj.length;U[aj.length]=aq.id;aj.push(ar);ah.push(aq);O.push(aq.data||{});ai=true};this.todo=function(aq){return ah[aq]};this.value=function(aq){return O[aq]};this.marker=function(aq){if(aq in aj){L(aq);return aj[aq]}return false};this.markerIsSet=function(aq){return Boolean(aj[aq])};this.setMarker=function(ar,aq){aj[ar]=aq};this.store=function(aq,ar,at){T[aq.ref]={obj:ar,shadow:at}};this.free=function(){for(var aq=0;aq<N.length;aq++){google.maps.event.removeListener(N[aq])}N=[];y.each(T,function(ar){ac(ar)});T={};y.each(ah,function(ar){ah[ar]=null});ah=[];y.each(aj,function(ar){if(aj[ar]){aj[ar].setMap(null);delete aj[ar]}});aj=[];y.each(O,function(ar){delete O[ar]});O=[];ad={};U={}};this.filter=function(aq){am=aq;ag()};this.enable=function(aq){if(W!=aq){W=aq;ag()}};this.display=function(aq){P=aq};this.error=function(aq){Q=aq};this.beginUpdate=function(){an=true};this.endUpdate=function(){an=false;if(ai){ag()}};this.autofit=function(ar){for(var aq=0;aq<ah.length;aq++){if(ah[aq]){ar.extend(ah[aq].options.position)}}};function S(){ap=ak.getProjection();if(!ap){setTimeout(function(){S.apply(V,[])},25);return}Z=true;N.push(google.maps.event.addListener(ao,"zoom_changed",function(){al()}));N.push(google.maps.event.addListener(ao,"bounds_changed",function(){al()}));ag()}function ac(aq){if(typeof T[aq]==="object"){if(typeof(T[aq].obj.setMap)==="function"){T[aq].obj.setMap(null)}if(typeof(T[aq].obj.remove)==="function"){T[aq].obj.remove()}if(typeof(T[aq].shadow.remove)==="function"){T[aq].obj.remove()}if(typeof(T[aq].shadow.setMap)==="function"){T[aq].shadow.setMap(null)}delete T[aq].obj;delete T[aq].shadow}else{if(aj[aq]){aj[aq].setMap(null)}}delete T[aq]}function M(){var ay,ax,aw,au,av,at,ar,aq;if(arguments[0] instanceof google.maps.LatLng){ay=arguments[0].lat();aw=arguments[0].lng();if(arguments[1] instanceof google.maps.LatLng){ax=arguments[1].lat();au=arguments[1].lng()}else{ax=arguments[1];au=arguments[2]}}else{ay=arguments[0];aw=arguments[1];if(arguments[2] instanceof google.maps.LatLng){ax=arguments[2].lat();au=arguments[2].lng()}else{ax=arguments[2];au=arguments[3]}}av=Math.PI*ay/180;at=Math.PI*aw/180;ar=Math.PI*ax/180;aq=Math.PI*au/180;return 1000*6371*Math.acos(Math.min(Math.cos(av)*Math.cos(ar)*Math.cos(at)*Math.cos(aq)+Math.cos(av)*Math.sin(at)*Math.cos(ar)*Math.sin(aq)+Math.sin(av)*Math.sin(ar),1))}function R(){var aq=M(ao.getCenter(),ao.getBounds().getNorthEast()),ar=new google.maps.Circle({center:ao.getCenter(),radius:1.25*aq});return ar.getBounds()}function X(){var ar={},aq;for(aq in T){ar[aq]=true}return ar}function al(){clearTimeout(Y);Y=setTimeout(function(){ag()},25)}function ab(ar){var au=ap.fromLatLngToDivPixel(ar),at=ap.fromDivPixelToLatLng(new google.maps.Point(au.x+aa.radius,au.y-aa.radius)),aq=ap.fromDivPixelToLatLng(new google.maps.Point(au.x-aa.radius,au.y+aa.radius));return new google.maps.LatLngBounds(aq,at)}function ag(){if(an||af||!Z){return}var aE=[],aG={},aF=ao.getZoom(),aH=("maxZoom" in aa)&&(aF>aa.maxZoom),aw=X(),av,au,at,aA,ar=false,aq,aD,ay,az,aB,aC,ax;ai=false;if(aF>3){aq=R();ar=aq.getSouthWest().lng()<aq.getNorthEast().lng()}for(av=0;av<ah.length;av++){if(ah[av]&&(!ar||aq.contains(ah[av].options.position))&&(!am||am(O[av]))){aE.push(av)}}while(1){av=0;while(aG[av]&&(av<aE.length)){av++}if(av==aE.length){break}aA=[];if(W&&!aH){ax=10;do{az=aA;aA=[];ax--;if(az.length){ay=aq.getCenter()}else{ay=ah[aE[av]].options.position}aq=ab(ay);for(au=av;au<aE.length;au++){if(aG[au]){continue}if(aq.contains(ah[aE[au]].options.position)){aA.push(au)}}}while((az.length<aA.length)&&(aA.length>1)&&ax)}else{for(au=av;au<aE.length;au++){if(aG[au]){continue}aA.push(au);break}}aD={indexes:[],ref:[]};aB=aC=0;for(at=0;at<aA.length;at++){aG[aA[at]]=true;aD.indexes.push(aE[aA[at]]);aD.ref.push(aE[aA[at]]);aB+=ah[aE[aA[at]]].options.position.lat();aC+=ah[aE[aA[at]]].options.position.lng()}aB/=aA.length;aC/=aA.length;aD.latLng=new google.maps.LatLng(aB,aC);aD.ref=aD.ref.join("-");if(aD.ref in aw){delete aw[aD.ref]}else{if(aA.length===1){T[aD.ref]=true}P(aD)}}y.each(aw,function(aI){ac(aI)});af=false}}function a(M,L){this.id=function(){return M};this.filter=function(N){L.filter(N)};this.enable=function(){L.enable(true)};this.disable=function(){L.enable(false)};this.add=function(O,N,P){if(!P){L.beginUpdate()}L.addMarker(O,N);if(!P){L.endUpdate()}};this.getById=function(N){return L.getById(N)};this.clearById=function(P,O){var N;if(!O){L.beginUpdate()}N=L.clearById(P);if(!O){L.endUpdate()}return N};this.clear=function(P,Q,N,O){if(!O){L.beginUpdate()}L.clear(P,Q,N);if(!O){L.endUpdate()}}}function D(){var M={},N={};function L(P){return{id:P.id,name:P.name,object:P.obj,tag:P.tag,data:P.data}}this.add=function(R,Q,T,S){var P=R.todo||{},U=k(P.id);if(!M[Q]){M[Q]=[]}if(U in N){this.clearById(U)}N[U]={obj:T,sub:S,name:Q,id:U,tag:P.tag,data:P.data};M[Q].push(U);return U};this.getById=function(R,Q,P){if(R in N){if(Q){return N[R].sub}else{if(P){return L(N[R])}}return N[R].obj}return false};this.get=function(R,T,P,S){var V,U,Q=C(P);if(!M[R]||!M[R].length){return null}V=M[R].length;while(V){V--;U=M[R][T?V:M[R].length-V-1];if(U&&N[U]){if(Q&&!Q(N[U].tag)){continue}return S?L(N[U]):N[U].obj}}return null};this.all=function(S,Q,T){var P=[],R=C(Q),U=function(X){var V,W;for(V=0;V<M[X].length;V++){W=M[X][V];if(W&&N[W]){if(R&&!R(N[W].tag)){continue}P.push(T?L(N[W]):N[W].obj)}}};if(S in M){U(S)}else{if(S===t){for(S in M){U(S)}}}return P};function O(P){if(typeof(P.setMap)==="function"){P.setMap(null)}if(typeof(P.remove)==="function"){P.remove()}if(typeof(P.free)==="function"){P.free()}P=null}this.rm=function(S,Q,R){var P,T;if(!M[S]){return false}if(Q){if(R){for(P=M[S].length-1;P>=0;P--){T=M[S][P];if(Q(N[T].tag)){break}}}else{for(P=0;P<M[S].length;P++){T=M[S][P];if(Q(N[T].tag)){break}}}}else{P=R?M[S].length-1:0}if(!(P in M[S])){return false}return this.clearById(M[S][P],P)};this.clearById=function(S,P){if(S in N){var R,Q=N[S].name;for(R=0;P===t&&R<M[Q].length;R++){if(S===M[Q][R]){P=R}}O(N[S].obj);if(N[S].sub){O(N[S].sub)}delete N[S];M[Q].splice(P,1);return true}return false};this.objGetById=function(R){var Q;if(M.clusterer){for(var P in M.clusterer){if((Q=N[M.clusterer[P]].obj.getById(R))!==false){return Q}}}return false};this.objClearById=function(Q){if(M.clusterer){for(var P in M.clusterer){if(N[M.clusterer[P]].obj.clearById(Q)){return true}}}return null};this.clear=function(V,U,W,P){var R,T,S,Q=C(P);if(!V||!V.length){V=[];for(R in M){V.push(R)}}else{V=g(V)}for(T=0;T<V.length;T++){S=V[T];if(U){this.rm(S,Q,true)}else{if(W){this.rm(S,Q,false)}else{while(this.rm(S,Q,false)){}}}}};this.objClear=function(S,R,T,Q){if(M.clusterer&&(y.inArray("marker",S)>=0||!S.length)){for(var P in M.clusterer){N[M.clusterer[P]].obj.clear(R,T,Q)}}}}var m={},H=new r();function p(){if(!m.geocoder){m.geocoder=new google.maps.Geocoder()}return m.geocoder}function G(){if(!m.directionsService){m.directionsService=new google.maps.DirectionsService()}return m.directionsService}function h(){if(!m.elevationService){m.elevationService=new google.maps.ElevationService()}return m.elevationService}function q(){if(!m.maxZoomService){m.maxZoomService=new google.maps.MaxZoomService()}return m.maxZoomService}function B(){if(!m.distanceMatrixService){m.distanceMatrixService=new google.maps.DistanceMatrixService()}return m.distanceMatrixService}function u(){if(z.verbose){var L,M=[];if(window.console&&(typeof console.error==="function")){for(L=0;L<arguments.length;L++){M.push(arguments[L])}console.error.apply(console,M)}else{M="";for(L=0;L<arguments.length;L++){M+=arguments[L].toString()+" "}alert(M)}}}function E(L){return(typeof(L)==="number"||typeof(L)==="string")&&L!==""&&!isNaN(L)}function g(N){var M,L=[];if(N!==t){if(typeof(N)==="object"){if(typeof(N.length)==="number"){L=N}else{for(M in N){L.push(N[M])}}}else{L.push(N)}}return L}function C(L){if(L){if(typeof L==="function"){return L}L=g(L);return function(N){if(N===t){return false}if(typeof N==="object"){for(var M=0;M<N.length;M++){if(y.inArray(N[M],L)>=0){return true}}return false}return y.inArray(N,L)>=0}}}function I(M,O,L){var N=O?M:null;if(!M||(typeof M==="string")){return N}if(M.latLng){return I(M.latLng)}if(M instanceof google.maps.LatLng){return M}else{if(E(M.lat)){return new google.maps.LatLng(M.lat,M.lng)}else{if(!L&&y.isArray(M)){if(!E(M[0])||!E(M[1])){return N}return new google.maps.LatLng(M[0],M[1])}}}return N}function j(M){var N,L;if(!M||M instanceof google.maps.LatLngBounds){return M||null}if(y.isArray(M)){if(M.length==2){N=I(M[0]);L=I(M[1])}else{if(M.length==4){N=I([M[0],M[1]]);L=I([M[2],M[3]])}}}else{if(("ne" in M)&&("sw" in M)){N=I(M.ne);L=I(M.sw)}else{if(("n" in M)&&("e" in M)&&("s" in M)&&("w" in M)){N=I([M.n,M.e]);L=I([M.s,M.w])}}}if(N&&L){return new google.maps.LatLngBounds(L,N)}return null}function v(T,L,O,S,P){var N=O?I(S.todo,false,true):false,R=N?{latLng:N}:(S.todo.address?(typeof(S.todo.address)==="string"?{address:S.todo.address}:S.todo.address):false),M=R?H.get(R):false,Q=this;if(R){P=P||0;if(M){S.latLng=M.results[0].geometry.location;S.results=M.results;S.status=M.status;L.apply(T,[S])}else{if(R.location){R.location=I(R.location)}if(R.bounds){R.bounds=j(R.bounds)}p().geocode(R,function(V,U){if(U===google.maps.GeocoderStatus.OK){H.store(R,{results:V,status:U});S.latLng=V[0].geometry.location;S.results=V;S.status=U;L.apply(T,[S])}else{if((U===google.maps.GeocoderStatus.OVER_QUERY_LIMIT)&&(P<z.queryLimit.attempt)){setTimeout(function(){v.apply(Q,[T,L,O,S,P+1])},z.queryLimit.delay+Math.floor(Math.random()*z.queryLimit.random))}else{u("geocode failed",U,R);S.latLng=S.results=false;S.status=U;L.apply(T,[S])}}})}}else{S.latLng=I(S.todo,false,true);L.apply(T,[S])}}function x(Q,L,R,M){var O=this,N=-1;function P(){do{N++}while((N<Q.length)&&!("address" in Q[N]));if(N>=Q.length){R.apply(L,[M]);return}v(O,function(S){delete S.todo;y.extend(Q[N],S);P.apply(O,[])},true,{todo:Q[N]})}P()}function o(L,O,M){var N=false;if(navigator&&navigator.geolocation){navigator.geolocation.getCurrentPosition(function(P){if(N){return}N=true;M.latLng=new google.maps.LatLng(P.coords.latitude,P.coords.longitude);O.apply(L,[M])},function(){if(N){return}N=true;M.latLng=false;O.apply(L,[M])},M.opts.getCurrentPosition)}else{M.latLng=false;O.apply(L,[M])}}function K(T){var S=this,U=new l(),V=new D(),N=null,P;this._plan=function(Z){for(var Y=0;Y<Z.length;Y++){U.add(new w(S,R,Z[Y]))}Q()};function Q(){if(!P&&(P=U.get())){P.run()}}function R(){P=null;U.ack();Q.call(S)}function X(Y){if(Y.todo.callback){var Z=Array.prototype.slice.call(arguments,1);if(typeof Y.todo.callback==="function"){Y.todo.callback.apply(T,Z)}else{if(y.isArray(Y.todo.callback)){if(typeof Y.todo.callback[1]==="function"){Y.todo.callback[1].apply(Y.todo.callback[0],Z)}}}}}function O(Y,Z,aa){if(aa){n(T,Y,Z,aa)}X(Y,Z);P.ack(Z)}function L(aa,Y){Y=Y||{};if(N){if(Y.todo&&Y.todo.options){if(Y.todo.options.center){Y.todo.options.center=I(Y.todo.options.center)}N.setOptions(Y.todo.options)}}else{var Z=Y.opts||y.extend(true,{},z.map,Y.todo&&Y.todo.options?Y.todo.options:{});Z.center=aa||I(Z.center);N=new z.classes.Map(T.get(0),Z)}}this.map=function(Y){L(Y.latLng,Y);n(T,Y,N);O(Y,N)};this.destroy=function(Y){V.clear();T.empty();if(N){N=null}O(Y,true)};this.infowindow=function(Z){var aa=[],Y="values" in Z.todo;if(!Y){if(Z.latLng){Z.opts.position=Z.latLng}Z.todo.values=[{options:Z.opts}]}y.each(Z.todo.values,function(ac,ad){var af,ae,ab=b(Z,ad);ab.options.position=ab.options.position?I(ab.options.position):I(ad.latLng);if(!N){L(ab.options.position)}ae=new z.classes.InfoWindow(ab.options);if(ae&&((ab.open===t)||ab.open)){if(Y){ae.open(N,ab.anchor?ab.anchor:t)}else{ae.open(N,ab.anchor?ab.anchor:(Z.latLng?t:(Z.session.marker?Z.session.marker:t)))}}aa.push(ae);af=V.add({todo:ab},"infowindow",ae);n(T,{todo:ab},ae,af)});O(Z,Y?aa:aa[0])};this.circle=function(Z){var aa=[],Y="values" in Z.todo;if(!Y){Z.opts.center=Z.latLng||I(Z.opts.center);Z.todo.values=[{options:Z.opts}]}if(!Z.todo.values.length){O(Z,false);return}y.each(Z.todo.values,function(ac,ad){var af,ae,ab=b(Z,ad);ab.options.center=ab.options.center?I(ab.options.center):I(ad);if(!N){L(ab.options.center)}ab.options.map=N;ae=new z.classes.Circle(ab.options);aa.push(ae);af=V.add({todo:ab},"circle",ae);n(T,{todo:ab},ae,af)});O(Z,Y?aa:aa[0])};this.overlay=function(aa,Z){var ab=[],Y="values" in aa.todo;if(!Y){aa.todo.values=[{latLng:aa.latLng,options:aa.opts}]}if(!aa.todo.values.length){O(aa,false);return}if(!e.__initialised){e.prototype=new z.classes.OverlayView();e.__initialised=true}y.each(aa.todo.values,function(ae,af){var ah,ag,ac=b(aa,af),ad=y(document.createElement("div")).css({border:"none",borderWidth:"0px",position:"absolute"});ad.append(ac.options.content);ag=new e(N,ac.options,I(ac)||I(af),ad);ab.push(ag);ad=null;if(!Z){ah=V.add(aa,"overlay",ag);n(T,{todo:ac},ag,ah)}});if(Z){return ab[0]}O(aa,Y?ab:ab[0])};this.getaddress=function(Y){X(Y,Y.results,Y.status);P.ack()};this.getlatlng=function(Y){X(Y,Y.results,Y.status);P.ack()};this.getmaxzoom=function(Y){q().getMaxZoomAtLatLng(Y.latLng,function(Z){X(Y,Z.status===google.maps.MaxZoomStatus.OK?Z.zoom:false,status);P.ack()})};this.getelevation=function(Z){var aa,Y=[],ab=function(ad,ac){X(Z,ac===google.maps.ElevationStatus.OK?ad:false,ac);P.ack()};if(Z.latLng){Y.push(Z.latLng)}else{Y=g(Z.todo.locations||[]);for(aa=0;aa<Y.length;aa++){Y[aa]=I(Y[aa])}}if(Y.length){h().getElevationForLocations({locations:Y},ab)}else{if(Z.todo.path&&Z.todo.path.length){for(aa=0;aa<Z.todo.path.length;aa++){Y.push(I(Z.todo.path[aa]))}}if(Y.length){h().getElevationAlongPath({path:Y,samples:Z.todo.samples},ab)}else{P.ack()}}};this.defaults=function(Y){y.each(Y.todo,function(Z,aa){if(typeof z[Z]==="object"){z[Z]=y.extend({},z[Z],aa)}else{z[Z]=aa}});P.ack(true)};this.rectangle=function(Z){var aa=[],Y="values" in Z.todo;if(!Y){Z.todo.values=[{options:Z.opts}]}if(!Z.todo.values.length){O(Z,false);return}y.each(Z.todo.values,function(ac,ad){var af,ae,ab=b(Z,ad);ab.options.bounds=ab.options.bounds?j(ab.options.bounds):j(ad);if(!N){L(ab.options.bounds.getCenter())}ab.options.map=N;ae=new z.classes.Rectangle(ab.options);aa.push(ae);af=V.add({todo:ab},"rectangle",ae);n(T,{todo:ab},ae,af)});O(Z,Y?aa:aa[0])};function M(Z,aa,ab){var ac=[],Y="values" in Z.todo;if(!Y){Z.todo.values=[{options:Z.opts}]}if(!Z.todo.values.length){O(Z,false);return}L();y.each(Z.todo.values,function(af,ah){var aj,ag,ae,ai,ad=b(Z,ah);if(ad.options[ab]){if(ad.options[ab][0][0]&&y.isArray(ad.options[ab][0][0])){for(ag=0;ag<ad.options[ab].length;ag++){for(ae=0;ae<ad.options[ab][ag].length;ae++){ad.options[ab][ag][ae]=I(ad.options[ab][ag][ae])}}}else{for(ag=0;ag<ad.options[ab].length;ag++){ad.options[ab][ag]=I(ad.options[ab][ag])}}}ad.options.map=N;ai=new google.maps[aa](ad.options);ac.push(ai);aj=V.add({todo:ad},aa.toLowerCase(),ai);n(T,{todo:ad},ai,aj)});O(Z,Y?ac:ac[0])}this.polyline=function(Y){M(Y,"Polyline","path")};this.polygon=function(Y){M(Y,"Polygon","paths")};this.trafficlayer=function(Y){L();var Z=V.get("trafficlayer");if(!Z){Z=new z.classes.TrafficLayer();Z.setMap(N);V.add(Y,"trafficlayer",Z)}O(Y,Z)};this.bicyclinglayer=function(Y){L();var Z=V.get("bicyclinglayer");if(!Z){Z=new z.classes.BicyclingLayer();Z.setMap(N);V.add(Y,"bicyclinglayer",Z)}O(Y,Z)};this.groundoverlay=function(Y){Y.opts.bounds=j(Y.opts.bounds);if(Y.opts.bounds){L(Y.opts.bounds.getCenter())}var aa,Z=new z.classes.GroundOverlay(Y.opts.url,Y.opts.bounds,Y.opts.opts);Z.setMap(N);aa=V.add(Y,"groundoverlay",Z);O(Y,Z,aa)};this.streetviewpanorama=function(Y){if(!Y.opts.opts){Y.opts.opts={}}if(Y.latLng){Y.opts.opts.position=Y.latLng}else{if(Y.opts.opts.position){Y.opts.opts.position=I(Y.opts.opts.position)}}if(Y.todo.divId){Y.opts.container=document.getElementById(Y.todo.divId)}else{if(Y.opts.container){Y.opts.container=y(Y.opts.container).get(0)}}var aa,Z=new z.classes.StreetViewPanorama(Y.opts.container,Y.opts.opts);if(Z){N.setStreetView(Z)}aa=V.add(Y,"streetviewpanorama",Z);O(Y,Z,aa)};this.kmllayer=function(Z){var aa=[],Y="values" in Z.todo;if(!Y){Z.todo.values=[{options:Z.opts}]}if(!Z.todo.values.length){O(Z,false);return}y.each(Z.todo.values,function(ad,ae){var ag,af,ac,ab=b(Z,ae);if(!N){L()}ac=ab.options;if(ab.options.opts){ac=ab.options.opts;if(ab.options.url){ac.url=ab.options.url}}ac.map=N;if(d("3.10")){af=new z.classes.KmlLayer(ac)}else{af=new z.classes.KmlLayer(ac.url,ac)}aa.push(af);ag=V.add({todo:ab},"kmllayer",af);n(T,{todo:ab},af,ag)});O(Z,Y?aa:aa[0])};this.panel=function(ab){L();var ad,Y=0,ac=0,aa,Z=y(document.createElement("div"));Z.css({position:"absolute",zIndex:1000,visibility:"hidden"});if(ab.opts.content){aa=y(ab.opts.content);Z.append(aa);T.first().prepend(Z);if(ab.opts.left!==t){Y=ab.opts.left}else{if(ab.opts.right!==t){Y=T.width()-aa.width()-ab.opts.right}else{if(ab.opts.center){Y=(T.width()-aa.width())/2}}}if(ab.opts.top!==t){ac=ab.opts.top}else{if(ab.opts.bottom!==t){ac=T.height()-aa.height()-ab.opts.bottom}else{if(ab.opts.middle){ac=(T.height()-aa.height())/2}}}Z.css({top:ac,left:Y,visibility:"visible"})}ad=V.add(ab,"panel",Z);O(ab,Z,ad);Z=null};function W(aa){var af=new F(T,N,aa),Y={},ab={},ae=[],ad=/^[0-9]+$/,ac,Z;for(Z in aa){if(ad.test(Z)){ae.push(1*Z);ab[Z]=aa[Z];ab[Z].width=ab[Z].width||0;ab[Z].height=ab[Z].height||0}else{Y[Z]=aa[Z]}}ae.sort(function(ah,ag){return ah>ag});if(Y.calculator){ac=function(ag){var ah=[];y.each(ag,function(aj,ai){ah.push(af.value(ai))});return Y.calculator.apply(T,[ah])}}else{ac=function(ag){return ag.length}}af.error(function(){u.apply(S,arguments)});af.display(function(ag){var ai,aj,am,ak,al,ah=ac(ag.indexes);if(aa.force||ah>1){for(ai=0;ai<ae.length;ai++){if(ae[ai]<=ah){aj=ab[ae[ai]]}}}if(aj){al=aj.offset||[-aj.width/2,-aj.height/2];am=y.extend({},Y);am.options=y.extend({pane:"overlayLayer",content:aj.content?aj.content.replace("CLUSTER_COUNT",ah):"",offset:{x:("x" in al?al.x:al[0])||0,y:("y" in al?al.y:al[1])||0}},Y.options||{});ak=S.overlay({todo:am,opts:am.options,latLng:I(ag)},true);am.options.pane="floatShadow";am.options.content=y(document.createElement("div")).width(aj.width+"px").height(aj.height+"px").css({cursor:"pointer"});shadow=S.overlay({todo:am,opts:am.options,latLng:I(ag)},true);Y.data={latLng:I(ag),markers:[]};y.each(ag.indexes,function(ao,an){Y.data.markers.push(af.value(an));if(af.markerIsSet(an)){af.marker(an).setMap(null)}});n(T,{todo:Y},shadow,t,{main:ak,shadow:shadow});af.store(ag,ak,shadow)}else{y.each(ag.indexes,function(ao,an){af.marker(an).setMap(N)})}});return af}this.marker=function(aa){var Y="values" in aa.todo,ad=!N;if(!Y){aa.opts.position=aa.latLng||I(aa.opts.position);aa.todo.values=[{options:aa.opts}]}if(!aa.todo.values.length){O(aa,false);return}if(ad){L()}if(aa.todo.cluster&&!N.getBounds()){google.maps.event.addListenerOnce(N,"bounds_changed",function(){S.marker.apply(S,[aa])});return}if(aa.todo.cluster){var Z,ab;if(aa.todo.cluster instanceof a){Z=aa.todo.cluster;ab=V.getById(Z.id(),true)}else{ab=W(aa.todo.cluster);Z=new a(k(aa.todo.id,true),ab);V.add(aa,"clusterer",Z,ab)}ab.beginUpdate();y.each(aa.todo.values,function(af,ag){var ae=b(aa,ag);ae.options.position=ae.options.position?I(ae.options.position):I(ag);ae.options.map=N;if(ad){N.setCenter(ae.options.position);ad=false}ab.add(ae,ag)});ab.endUpdate();O(aa,Z)}else{var ac=[];y.each(aa.todo.values,function(af,ag){var ai,ah,ae=b(aa,ag);ae.options.position=ae.options.position?I(ae.options.position):I(ag);ae.options.map=N;if(ad){N.setCenter(ae.options.position);ad=false}ah=new z.classes.Marker(ae.options);ac.push(ah);ai=V.add({todo:ae},"marker",ah);n(T,{todo:ae},ah,ai)});O(aa,Y?ac:ac[0])}};this.getroute=function(Y){Y.opts.origin=I(Y.opts.origin,true);Y.opts.destination=I(Y.opts.destination,true);G().route(Y.opts,function(aa,Z){X(Y,Z==google.maps.DirectionsStatus.OK?aa:false,Z);P.ack()})};this.directionsrenderer=function(Y){Y.opts.map=N;var aa,Z=new google.maps.DirectionsRenderer(Y.opts);if(Y.todo.divId){Z.setPanel(document.getElementById(Y.todo.divId))}else{if(Y.todo.container){Z.setPanel(y(Y.todo.container).get(0))}}aa=V.add(Y,"directionsrenderer",Z);O(Y,Z,aa)};this.getgeoloc=function(Y){O(Y,Y.latLng)};this.styledmaptype=function(Y){L();var Z=new z.classes.StyledMapType(Y.todo.styles,Y.opts);N.mapTypes.set(Y.todo.id,Z);O(Y,Z)};this.imagemaptype=function(Y){L();var Z=new z.classes.ImageMapType(Y.opts);N.mapTypes.set(Y.todo.id,Z);O(Y,Z)};this.autofit=function(Y){var Z=new google.maps.LatLngBounds();y.each(V.all(),function(aa,ab){if(ab.getPosition){Z.extend(ab.getPosition())}else{if(ab.getBounds){Z.extend(ab.getBounds().getNorthEast());Z.extend(ab.getBounds().getSouthWest())}else{if(ab.getPaths){ab.getPaths().forEach(function(ac){ac.forEach(function(ad){Z.extend(ad)})})}else{if(ab.getPath){ab.getPath().forEach(function(ac){Z.extend(ac);""})}else{if(ab.getCenter){Z.extend(ab.getCenter())}else{if(ab instanceof a){ab=V.getById(ab.id(),true);if(ab){ab.autofit(Z)}}}}}}}});if(!Z.isEmpty()&&(!N.getBounds()||!N.getBounds().equals(Z))){if("maxZoom" in Y.todo){google.maps.event.addListenerOnce(N,"bounds_changed",function(){if(this.getZoom()>Y.todo.maxZoom){this.setZoom(Y.todo.maxZoom)}})}N.fitBounds(Z)}O(Y,true)};this.clear=function(Y){if(typeof Y.todo==="string"){if(V.clearById(Y.todo)||V.objClearById(Y.todo)){O(Y,true);return}Y.todo={name:Y.todo}}if(Y.todo.id){y.each(g(Y.todo.id),function(Z,aa){V.clearById(aa)||V.objClearById(aa)})}else{V.clear(g(Y.todo.name),Y.todo.last,Y.todo.first,Y.todo.tag);V.objClear(g(Y.todo.name),Y.todo.last,Y.todo.first,Y.todo.tag)}O(Y,true)};this.exec=function(Y){var Z=this;y.each(g(Y.todo.func),function(aa,ab){y.each(Z.get(Y.todo,true,Y.todo.hasOwnProperty("full")?Y.todo.full:true),function(ac,ad){ab.call(T,ad)})});O(Y,true)};this.get=function(aa,ad,ac){var Z,ab,Y=ad?aa:aa.todo;if(!ad){ac=Y.full}if(typeof Y==="string"){ab=V.getById(Y,false,ac)||V.objGetById(Y);if(ab===false){Z=Y;Y={}}}else{Z=Y.name}if(Z==="map"){ab=N}if(!ab){ab=[];if(Y.id){y.each(g(Y.id),function(ae,af){ab.push(V.getById(af,false,ac)||V.objGetById(af))});if(!y.isArray(Y.id)){ab=ab[0]}}else{y.each(Z?g(Z):[t],function(af,ag){var ae;if(Y.first){ae=V.get(ag,false,Y.tag,ac);if(ae){ab.push(ae)}}else{if(Y.all){y.each(V.all(ag,Y.tag,ac),function(ai,ah){ab.push(ah)})}else{ae=V.get(ag,true,Y.tag,ac);if(ae){ab.push(ae)}}}});if(!Y.all&&!y.isArray(Z)){ab=ab[0]}}}ab=y.isArray(ab)||!Y.all?ab:[ab];if(ad){return ab}else{O(aa,ab)}};this.getdistance=function(Y){var Z;Y.opts.origins=g(Y.opts.origins);for(Z=0;Z<Y.opts.origins.length;Z++){Y.opts.origins[Z]=I(Y.opts.origins[Z],true)}Y.opts.destinations=g(Y.opts.destinations);for(Z=0;Z<Y.opts.destinations.length;Z++){Y.opts.destinations[Z]=I(Y.opts.destinations[Z],true)}B().getDistanceMatrix(Y.opts,function(ab,aa){X(Y,aa===google.maps.DistanceMatrixStatus.OK?ab:false,aa);P.ack()})};this.trigger=function(Z){if(typeof Z.todo==="string"){google.maps.event.trigger(N,Z.todo)}else{var Y=[N,Z.todo.eventName];if(Z.todo.var_args){y.each(Z.todo.var_args,function(ab,aa){Y.push(aa)})}google.maps.event.trigger.apply(google.maps.event,Y)}X(Z);P.ack()}}function s(M){var L;if(!typeof M==="object"||!M.hasOwnProperty("get")){return false}for(L in M){if(L!=="get"){return false}}return !M.get.hasOwnProperty("callback")}y.fn.gmap3=function(){var M,O=[],N=true,L=[];J();for(M=0;M<arguments.length;M++){if(arguments[M]){O.push(arguments[M])}}if(!O.length){O.push("map")}y.each(this,function(){var P=y(this),Q=P.data("gmap3");N=false;if(!Q){Q=new K(P);P.data("gmap3",Q)}if(O.length===1&&(O[0]==="get"||s(O[0]))){if(O[0]==="get"){L.push(Q.get("map",true))}else{L.push(Q.get(O[0].get,true,O[0].get.full))}}else{Q._plan(O)}});if(L.length){if(L.length===1){return L[0]}else{return L}}return this}})(jQuery);

/*
 * jquery.infieldlabel
 * @version 0.1.4
 */
(function(e){e.InFieldLabels=function(n,i,t){var a=this;a.$label=e(n),a.label=n,a.$field=e(i),a.field=i,a.$label.data("InFieldLabels",a),a.showing=!0,a.init=function(){var n;a.options=e.extend({},e.InFieldLabels.defaultOptions,t),a.options.className&&a.$label.addClass(a.options.className),setTimeout(function(){""!==a.$field.val()?(a.$label.hide(),a.showing=!1):(a.$label.show(),a.showing=!0)},200),a.$field.focus(function(){a.fadeOnFocus()}).blur(function(){a.checkForEmpty(!0)}).bind("keydown.infieldlabel",function(e){a.hideOnChange(e)}).bind("paste",function(){a.setOpacity(0)}).change(function(){a.checkForEmpty()}).bind("onPropertyChange",function(){a.checkForEmpty()}).bind("keyup.infieldlabel",function(){a.checkForEmpty()}),a.options.pollDuration>0&&(n=setInterval(function(){""!==a.$field.val()&&(a.$label.hide(),a.showing=!1,clearInterval(n))},a.options.pollDuration))},a.fadeOnFocus=function(){a.showing&&a.setOpacity(a.options.fadeOpacity)},a.setOpacity=function(e){a.$label.stop().animate({opacity:e},a.options.fadeDuration,function(){0==e&&a.$label.hide()}),a.showing=e>0},a.checkForEmpty=function(e){""===a.$field.val()?(a.prepForShow(),a.setOpacity(e?1:a.options.fadeOpacity)):a.setOpacity(0)},a.prepForShow=function(){a.showing||(a.$label.css({opacity:0}).show(),a.$field.bind("keydown.infieldlabel",function(e){a.hideOnChange(e)}))},a.hideOnChange=function(e){16!==e.keyCode&&9!==e.keyCode&&(a.showing&&(a.$label.hide(),a.showing=!1),a.$field.unbind("keydown.infieldlabel"))},a.init()},e.InFieldLabels.defaultOptions={fadeOpacity:.5,fadeDuration:300,pollDuration:0,enabledInputTypes:["text","search","tel","url","email","password","number","textarea"],className:!1},e.fn.inFieldLabels=function(n){var i=n&&n.enabledInputTypes||e.InFieldLabels.defaultOptions.enabledInputTypes;return this.each(function(){var t,a,o=e(this).attr("for");o&&(t=document.getElementById(o),t&&(a=e.inArray(t.type,i),(-1!==a||"TEXTAREA"===t.nodeName)&&new e.InFieldLabels(this,t,n)))})}})(jQuery);

/**
 * Isotope v1.5.25
 */
(function(a,b,c){"use strict";var d=a.document,e=a.Modernizr,f=function(a){return a.charAt(0).toUpperCase()+a.slice(1)},g="Moz Webkit O Ms".split(" "),h=function(a){var b=d.documentElement.style,c;if(typeof b[a]=="string")return a;a=f(a);for(var e=0,h=g.length;e<h;e++){c=g[e]+a;if(typeof b[c]=="string")return c}},i=h("transform"),j=h("transitionProperty"),k={csstransforms:function(){return!!i},csstransforms3d:function(){var a=!!h("perspective");if(a){var c=" -o- -moz- -ms- -webkit- -khtml- ".split(" "),d="@media ("+c.join("transform-3d),(")+"modernizr)",e=b("<style>"+d+"{#modernizr{height:3px}}"+"</style>").appendTo("head"),f=b('<div id="modernizr" />').appendTo("html");a=f.height()===3,f.remove(),e.remove()}return a},csstransitions:function(){return!!j}},l;if(e)for(l in k)e.hasOwnProperty(l)||e.addTest(l,k[l]);else{e=a.Modernizr={_version:"1.6ish: miniModernizr for Isotope"};var m=" ",n;for(l in k)n=k[l](),e[l]=n,m+=" "+(n?"":"no-")+l;b("html").addClass(m)}if(e.csstransforms){var o=e.csstransforms3d?{translate:function(a){return"translate3d("+a[0]+"px, "+a[1]+"px, 0) "},scale:function(a){return"scale3d("+a+", "+a+", 1) "}}:{translate:function(a){return"translate("+a[0]+"px, "+a[1]+"px) "},scale:function(a){return"scale("+a+") "}},p=function(a,c,d){var e=b.data(a,"isoTransform")||{},f={},g,h={},j;f[c]=d,b.extend(e,f);for(g in e)j=e[g],h[g]=o[g](j);var k=h.translate||"",l=h.scale||"",m=k+l;b.data(a,"isoTransform",e),a.style[i]=m};b.cssNumber.scale=!0,b.cssHooks.scale={set:function(a,b){p(a,"scale",b)},get:function(a,c){var d=b.data(a,"isoTransform");return d&&d.scale?d.scale:1}},b.fx.step.scale=function(a){b.cssHooks.scale.set(a.elem,a.now+a.unit)},b.cssNumber.translate=!0,b.cssHooks.translate={set:function(a,b){p(a,"translate",b)},get:function(a,c){var d=b.data(a,"isoTransform");return d&&d.translate?d.translate:[0,0]}}}var q,r;e.csstransitions&&(q={WebkitTransitionProperty:"webkitTransitionEnd",MozTransitionProperty:"transitionend",OTransitionProperty:"oTransitionEnd otransitionend",transitionProperty:"transitionend"}[j],r=h("transitionDuration"));var s=b.event,t=b.event.handle?"handle":"dispatch",u;s.special.smartresize={setup:function(){b(this).bind("resize",s.special.smartresize.handler)},teardown:function(){b(this).unbind("resize",s.special.smartresize.handler)},handler:function(a,b){var c=this,d=arguments;a.type="smartresize",u&&clearTimeout(u),u=setTimeout(function(){s[t].apply(c,d)},b==="execAsap"?0:100)}},b.fn.smartresize=function(a){return a?this.bind("smartresize",a):this.trigger("smartresize",["execAsap"])},b.Isotope=function(a,c,d){this.element=b(c),this._create(a),this._init(d)};var v=["width","height"],w=b(a);b.Isotope.settings={resizable:!0,layoutMode:"masonry",containerClass:"isotope",itemClass:"isotope-item",hiddenClass:"isotope-hidden",hiddenStyle:{opacity:0,scale:.001},visibleStyle:{opacity:1,scale:1},containerStyle:{position:"relative",overflow:"hidden"},animationEngine:"best-available",animationOptions:{queue:!1,duration:800},sortBy:"original-order",sortAscending:!0,resizesContainer:!0,transformsEnabled:!0,itemPositionDataEnabled:!1},b.Isotope.prototype={_create:function(a){this.options=b.extend({},b.Isotope.settings,a),this.styleQueue=[],this.elemCount=0;var c=this.element[0].style;this.originalStyle={};var d=v.slice(0);for(var e in this.options.containerStyle)d.push(e);for(var f=0,g=d.length;f<g;f++)e=d[f],this.originalStyle[e]=c[e]||"";this.element.css(this.options.containerStyle),this._updateAnimationEngine(),this._updateUsingTransforms();var h={"original-order":function(a,b){return b.elemCount++,b.elemCount},random:function(){return Math.random()}};this.options.getSortData=b.extend(this.options.getSortData,h),this.reloadItems(),this.offset={left:parseInt(this.element.css("padding-left")||0,10),top:parseInt(this.element.css("padding-top")||0,10)};var i=this;setTimeout(function(){i.element.addClass(i.options.containerClass)},0),this.options.resizable&&w.bind("smartresize.isotope",function(){i.resize()}),this.element.delegate("."+this.options.hiddenClass,"click",function(){return!1})},_getAtoms:function(a){var b=this.options.itemSelector,c=b?a.filter(b).add(a.find(b)):a,d={position:"absolute"};return c=c.filter(function(a,b){return b.nodeType===1}),this.usingTransforms&&(d.left=0,d.top=0),c.css(d).addClass(this.options.itemClass),this.updateSortData(c,!0),c},_init:function(a){this.$filteredAtoms=this._filter(this.$allAtoms),this._sort(),this.reLayout(a)},option:function(a){if(b.isPlainObject(a)){this.options=b.extend(!0,this.options,a);var c;for(var d in a)c="_update"+f(d),this[c]&&this[c]()}},_updateAnimationEngine:function(){var a=this.options.animationEngine.toLowerCase().replace(/[ _\-]/g,""),b;switch(a){case"css":case"none":b=!1;break;case"jquery":b=!0;break;default:b=!e.csstransitions}this.isUsingJQueryAnimation=b,this._updateUsingTransforms()},_updateTransformsEnabled:function(){this._updateUsingTransforms()},_updateUsingTransforms:function(){var a=this.usingTransforms=this.options.transformsEnabled&&e.csstransforms&&e.csstransitions&&!this.isUsingJQueryAnimation;a||(delete this.options.hiddenStyle.scale,delete this.options.visibleStyle.scale),this.getPositionStyles=a?this._translate:this._positionAbs},_filter:function(a){var b=this.options.filter===""?"*":this.options.filter;if(!b)return a;var c=this.options.hiddenClass,d="."+c,e=a.filter(d),f=e;if(b!=="*"){f=e.filter(b);var g=a.not(d).not(b).addClass(c);this.styleQueue.push({$el:g,style:this.options.hiddenStyle})}return this.styleQueue.push({$el:f,style:this.options.visibleStyle}),f.removeClass(c),a.filter(b)},updateSortData:function(a,c){var d=this,e=this.options.getSortData,f,g;a.each(function(){f=b(this),g={};for(var a in e)!c&&a==="original-order"?g[a]=b.data(this,"isotope-sort-data")[a]:g[a]=e[a](f,d);b.data(this,"isotope-sort-data",g)})},_sort:function(){var a=this.options.sortBy,b=this._getSorter,c=this.options.sortAscending?1:-1,d=function(d,e){var f=b(d,a),g=b(e,a);return f===g&&a!=="original-order"&&(f=b(d,"original-order"),g=b(e,"original-order")),(f>g?1:f<g?-1:0)*c};this.$filteredAtoms.sort(d)},_getSorter:function(a,c){return b.data(a,"isotope-sort-data")[c]},_translate:function(a,b){return{translate:[a,b]}},_positionAbs:function(a,b){return{left:a,top:b}},_pushPosition:function(a,b,c){b=Math.round(b+this.offset.left),c=Math.round(c+this.offset.top);var d=this.getPositionStyles(b,c);this.styleQueue.push({$el:a,style:d}),this.options.itemPositionDataEnabled&&a.data("isotope-item-position",{x:b,y:c})},layout:function(a,b){var c=this.options.layoutMode;this["_"+c+"Layout"](a);if(this.options.resizesContainer){var d=this["_"+c+"GetContainerSize"]();this.styleQueue.push({$el:this.element,style:d})}this._processStyleQueue(a,b),this.isLaidOut=!0},_processStyleQueue:function(a,c){var d=this.isLaidOut?this.isUsingJQueryAnimation?"animate":"css":"css",f=this.options.animationOptions,g=this.options.onLayout,h,i,j,k;i=function(a,b){b.$el[d](b.style,f)};if(this._isInserting&&this.isUsingJQueryAnimation)i=function(a,b){h=b.$el.hasClass("no-transition")?"css":d,b.$el[h](b.style,f)};else if(c||g||f.complete){var l=!1,m=[c,g,f.complete],n=this;j=!0,k=function(){if(l)return;var b;for(var c=0,d=m.length;c<d;c++)b=m[c],typeof b=="function"&&b.call(n.element,a,n);l=!0};if(this.isUsingJQueryAnimation&&d==="animate")f.complete=k,j=!1;else if(e.csstransitions){var o=0,p=this.styleQueue[0],s=p&&p.$el,t;while(!s||!s.length){t=this.styleQueue[o++];if(!t)return;s=t.$el}var u=parseFloat(getComputedStyle(s[0])[r]);u>0&&(i=function(a,b){b.$el[d](b.style,f).one(q,k)},j=!1)}}b.each(this.styleQueue,i),j&&k(),this.styleQueue=[]},resize:function(){this["_"+this.options.layoutMode+"ResizeChanged"]()&&this.reLayout()},reLayout:function(a){this["_"+this.options.layoutMode+"Reset"](),this.layout(this.$filteredAtoms,a)},addItems:function(a,b){var c=this._getAtoms(a);this.$allAtoms=this.$allAtoms.add(c),b&&b(c)},insert:function(a,b){this.element.append(a);var c=this;this.addItems(a,function(a){var d=c._filter(a);c._addHideAppended(d),c._sort(),c.reLayout(),c._revealAppended(d,b)})},appended:function(a,b){var c=this;this.addItems(a,function(a){c._addHideAppended(a),c.layout(a),c._revealAppended(a,b)})},_addHideAppended:function(a){this.$filteredAtoms=this.$filteredAtoms.add(a),a.addClass("no-transition"),this._isInserting=!0,this.styleQueue.push({$el:a,style:this.options.hiddenStyle})},_revealAppended:function(a,b){var c=this;setTimeout(function(){a.removeClass("no-transition"),c.styleQueue.push({$el:a,style:c.options.visibleStyle}),c._isInserting=!1,c._processStyleQueue(a,b)},10)},reloadItems:function(){this.$allAtoms=this._getAtoms(this.element.children())},remove:function(a,b){this.$allAtoms=this.$allAtoms.not(a),this.$filteredAtoms=this.$filteredAtoms.not(a);var c=this,d=function(){a.remove(),b&&b.call(c.element)};a.filter(":not(."+this.options.hiddenClass+")").length?(this.styleQueue.push({$el:a,style:this.options.hiddenStyle}),this._sort(),this.reLayout(d)):d()},shuffle:function(a){this.updateSortData(this.$allAtoms),this.options.sortBy="random",this._sort(),this.reLayout(a)},destroy:function(){var a=this.usingTransforms,b=this.options;this.$allAtoms.removeClass(b.hiddenClass+" "+b.itemClass).each(function(){var b=this.style;b.position="",b.top="",b.left="",b.opacity="",a&&(b[i]="")});var c=this.element[0].style;for(var d in this.originalStyle)c[d]=this.originalStyle[d];this.element.unbind(".isotope").undelegate("."+b.hiddenClass,"click").removeClass(b.containerClass).removeData("isotope"),w.unbind(".isotope")},_getSegments:function(a){var b=this.options.layoutMode,c=a?"rowHeight":"columnWidth",d=a?"height":"width",e=a?"rows":"cols",g=this.element[d](),h,i=this.options[b]&&this.options[b][c]||this.$filteredAtoms["outer"+f(d)](!0)||g;h=Math.floor(g/i),h=Math.max(h,1),this[b][e]=h,this[b][c]=i},_checkIfSegmentsChanged:function(a){var b=this.options.layoutMode,c=a?"rows":"cols",d=this[b][c];return this._getSegments(a),this[b][c]!==d},_masonryReset:function(){this.masonry={},this._getSegments();var a=this.masonry.cols;this.masonry.colYs=[];while(a--)this.masonry.colYs.push(0)},_masonryLayout:function(a){var c=this,d=c.masonry;a.each(function(){var a=b(this),e=Math.ceil(a.outerWidth(!0)/d.columnWidth);e=Math.min(e,d.cols);if(e===1)c._masonryPlaceBrick(a,d.colYs);else{var f=d.cols+1-e,g=[],h,i;for(i=0;i<f;i++)h=d.colYs.slice(i,i+e),g[i]=Math.max.apply(Math,h);c._masonryPlaceBrick(a,g)}})},_masonryPlaceBrick:function(a,b){var c=Math.min.apply(Math,b),d=0;for(var e=0,f=b.length;e<f;e++)if(b[e]===c){d=e;break}var g=this.masonry.columnWidth*d,h=c;this._pushPosition(a,g,h);var i=c+a.outerHeight(!0),j=this.masonry.cols+1-f;for(e=0;e<j;e++)this.masonry.colYs[d+e]=i},_masonryGetContainerSize:function(){var a=Math.max.apply(Math,this.masonry.colYs);return{height:a}},_masonryResizeChanged:function(){return this._checkIfSegmentsChanged()},_fitRowsReset:function(){this.fitRows={x:0,y:0,height:0}},_fitRowsLayout:function(a){var c=this,d=this.element.width(),e=this.fitRows;a.each(function(){var a=b(this),f=a.outerWidth(!0),g=a.outerHeight(!0);e.x!==0&&f+e.x>d&&(e.x=0,e.y=e.height),c._pushPosition(a,e.x,e.y),e.height=Math.max(e.y+g,e.height),e.x+=f})},_fitRowsGetContainerSize:function(){return{height:this.fitRows.height}},_fitRowsResizeChanged:function(){return!0},_cellsByRowReset:function(){this.cellsByRow={index:0},this._getSegments(),this._getSegments(!0)},_cellsByRowLayout:function(a){var c=this,d=this.cellsByRow;a.each(function(){var a=b(this),e=d.index%d.cols,f=Math.floor(d.index/d.cols),g=(e+.5)*d.columnWidth-a.outerWidth(!0)/2,h=(f+.5)*d.rowHeight-a.outerHeight(!0)/2;c._pushPosition(a,g,h),d.index++})},_cellsByRowGetContainerSize:function(){return{height:Math.ceil(this.$filteredAtoms.length/this.cellsByRow.cols)*this.cellsByRow.rowHeight+this.offset.top}},_cellsByRowResizeChanged:function(){return this._checkIfSegmentsChanged()},_straightDownReset:function(){this.straightDown={y:0}},_straightDownLayout:function(a){var c=this;a.each(function(a){var d=b(this);c._pushPosition(d,0,c.straightDown.y),c.straightDown.y+=d.outerHeight(!0)})},_straightDownGetContainerSize:function(){return{height:this.straightDown.y}},_straightDownResizeChanged:function(){return!0},_masonryHorizontalReset:function(){this.masonryHorizontal={},this._getSegments(!0);var a=this.masonryHorizontal.rows;this.masonryHorizontal.rowXs=[];while(a--)this.masonryHorizontal.rowXs.push(0)},_masonryHorizontalLayout:function(a){var c=this,d=c.masonryHorizontal;a.each(function(){var a=b(this),e=Math.ceil(a.outerHeight(!0)/d.rowHeight);e=Math.min(e,d.rows);if(e===1)c._masonryHorizontalPlaceBrick(a,d.rowXs);else{var f=d.rows+1-e,g=[],h,i;for(i=0;i<f;i++)h=d.rowXs.slice(i,i+e),g[i]=Math.max.apply(Math,h);c._masonryHorizontalPlaceBrick(a,g)}})},_masonryHorizontalPlaceBrick:function(a,b){var c=Math.min.apply(Math,b),d=0;for(var e=0,f=b.length;e<f;e++)if(b[e]===c){d=e;break}var g=c,h=this.masonryHorizontal.rowHeight*d;this._pushPosition(a,g,h);var i=c+a.outerWidth(!0),j=this.masonryHorizontal.rows+1-f;for(e=0;e<j;e++)this.masonryHorizontal.rowXs[d+e]=i},_masonryHorizontalGetContainerSize:function(){var a=Math.max.apply(Math,this.masonryHorizontal.rowXs);return{width:a}},_masonryHorizontalResizeChanged:function(){return this._checkIfSegmentsChanged(!0)},_fitColumnsReset:function(){this.fitColumns={x:0,y:0,width:0}},_fitColumnsLayout:function(a){var c=this,d=this.element.height(),e=this.fitColumns;a.each(function(){var a=b(this),f=a.outerWidth(!0),g=a.outerHeight(!0);e.y!==0&&g+e.y>d&&(e.x=e.width,e.y=0),c._pushPosition(a,e.x,e.y),e.width=Math.max(e.x+f,e.width),e.y+=g})},_fitColumnsGetContainerSize:function(){return{width:this.fitColumns.width}},_fitColumnsResizeChanged:function(){return!0},_cellsByColumnReset:function(){this.cellsByColumn={index:0},this._getSegments(),this._getSegments(!0)},_cellsByColumnLayout:function(a){var c=this,d=this.cellsByColumn;a.each(function(){var a=b(this),e=Math.floor(d.index/d.rows),f=d.index%d.rows,g=(e+.5)*d.columnWidth-a.outerWidth(!0)/2,h=(f+.5)*d.rowHeight-a.outerHeight(!0)/2;c._pushPosition(a,g,h),d.index++})},_cellsByColumnGetContainerSize:function(){return{width:Math.ceil(this.$filteredAtoms.length/this.cellsByColumn.rows)*this.cellsByColumn.columnWidth}},_cellsByColumnResizeChanged:function(){return this._checkIfSegmentsChanged(!0)},_straightAcrossReset:function(){this.straightAcross={x:0}},_straightAcrossLayout:function(a){var c=this;a.each(function(a){var d=b(this);c._pushPosition(d,c.straightAcross.x,0),c.straightAcross.x+=d.outerWidth(!0)})},_straightAcrossGetContainerSize:function(){return{width:this.straightAcross.x}},_straightAcrossResizeChanged:function(){return!0}},b.fn.imagesLoaded=function(a){function h(){a.call(c,d)}function i(a){var c=a.target;c.src!==f&&b.inArray(c,g)===-1&&(g.push(c),--e<=0&&(setTimeout(h),d.unbind(".imagesLoaded",i)))}var c=this,d=c.find("img").add(c.filter("img")),e=d.length,f="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",g=[];return e||h(),d.bind("load.imagesLoaded error.imagesLoaded",i).each(function(){var a=this.src;this.src=f,this.src=a}),c};var x=function(b){a.console&&a.console.error(b)};b.fn.isotope=function(a,c){if(typeof a=="string"){var d=Array.prototype.slice.call(arguments,1);this.each(function(){var c=b.data(this,"isotope");if(!c){x("cannot call methods on isotope prior to initialization; attempted to call method '"+a+"'");return}if(!b.isFunction(c[a])||a.charAt(0)==="_"){x("no such method '"+a+"' for isotope instance");return}c[a].apply(c,d)})}else this.each(function(){var d=b.data(this,"isotope");d?(d.option(a),d._init(c)):b.data(this,"isotope",new b.Isotope(a,this,c))});return this}})(window,jQuery);

/*
* hoverFlow - A Solution to Animation Queue Buildup in jQuery
* Version 1.00
* Copyright (c) 2009 Ralf Stoltze, http://www.2meter3.de/code/hoverFlow/
*/
(function($){$.fn.hoverFlow=function(c,d,e,f,g){if($.inArray(c,['mouseover','mouseenter','mouseout','mouseleave'])==-1){return this}var h=typeof e==='object'?e:{complete:g||!g&&f||$.isFunction(e)&&e,duration:e,easing:g&&f||f&&!$.isFunction(f)&&f};h.queue=false;var i=h.complete;h.complete=function(){$(this).dequeue();if($.isFunction(i)){i.call(this)}};return this.each(function(){var b=$(this);if(c=='mouseover'||c=='mouseenter'){b.data('jQuery.hoverFlow',true)}else{b.removeData('jQuery.hoverFlow')}b.queue(function(){var a=(c=='mouseover'||c=='mouseenter')?b.data('jQuery.hoverFlow')!==undefined:b.data('jQuery.hoverFlow')===undefined;if(a){b.animate(d,h)}else{b.queue([])}})})}})(jQuery);

/* Detect Mobile Devices */

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    iPad: function(){
    	return navigator.userAgent.match(/iPad/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

/* Detect Mobile Browsers */
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(ipad|iphone|ipod|android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);


// jquery.touchcarousel v1.2
(function(f){function q(b,c){var a,e;this.carouselRoot=f(b);var d=this;this._b=this._a=!1;this._e=this._d=this._c="";this._f;this._g;this._h;this._i;this._j;this._k=0;this.settings=f.extend({},f.fn.touchCarousel.defaults,c);this._l=this.carouselRoot.find(".touchcarousel-container");this._m=this._l[0].style;this._n=this._l.wrap(f('<div class="touchcarousel-wrapper" />')).parent();var g=this._l.find(".touchcarousel-item");this.items=[];this.numItems=g.length;a=navigator.userAgent.toLowerCase();e=/(chrome)[ \/]([\w.]+)/.exec(a)||
/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||0>a.indexOf("compatible")&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[];a=e[1]||"";e=e[2]||"0";var r={};a&&(r[a]=!0,r.version=e);r.chrome&&(r.webkit=!0);d._o=r;this._p;this._q=!1;this._t=this._s=this._r=0;this._w=this._v=this._u=!1;"ontouchstart"in window?(this.hasTouch=!0,this._c="touchstart.rs",this._d="touchmove.rs",this._e="touchend.rs",this._x=this.settings.baseTouchFriction):(this.hasTouch=
!1,this._x=this.settings.baseMouseFriction,this.settings.dragUsingMouse?(this._c="mousedown.rs",this._d="mousemove.rs",this._e="mouseup.rs",this._y,this._z,a=d._o,a.msie||a.opera?this._y=this._z="move":a.mozilla&&(this._y="-moz-grab",this._z="-moz-grabbing"),this._a1()):this._n.addClass("auto-cursor"));if((this.hasTouch||this.settings.useWebkit3d)&&"WebKitCSSMatrix"in window&&"m11"in new WebKitCSSMatrix)this._l.css({"-webkit-transform-origin":"0 0","-webkit-transform":"translateZ(0)"}),this._w=!0;
this._w?(this._b1="-webkit-transform",this._c1="translate3d(",this._d1="px, 0, 0)"):(this._b1="left",this._c1="",this._d1="px");this.hasTouch&&(this.settings.directionNavAutoHide=!1);this.settings.directionNav||(this._f1=this.settings.loopItems?this._e1=!0:this._e1=!1,this.settings.loopItems=!0);var p,h,n=0;g.eq(this.numItems-1).addClass("last");g.each(function(b){h=f(this);p={};p.item=h;p.index=b;p.posX=n;p.width=h.outerWidth(!0)||d.settings.itemFallbackWidth;n+=p.width;if(this.hasTouch){var a;h.find("a").each(function(){a=
f(this);a.data("tc-href",a.attr("href"));a.data("tc-target",a.attr("target"));a.attr("href","#");a.bind("click",function(a){a.preventDefault();if(d._q)return!1;a=f(this).data("tc-href");var b=f(this).data("tc-target");!b||"_g1"===b.toLowerCase()?window.location.href=a:window.open(a)})})}else h.find("a").bind("click.touchcarousel",function(a){if(d._q)return a.preventDefault(),!1});h.find(".non-draggable").bind(d._c,function(a){d._q=!1;a.stopImmediatePropagation()});d.items.push(p)});this._h1=this._f=
n;this._i1=0<this.settings.itemsPerMove?this.settings.itemsPerMove:1;if(this.settings.pagingNav){if(this._j1=this.settings.snapToItems=!0,this._k1=Math.ceil(this.numItems/this._i1),this._l1=0,this.settings.pagingNavControls){this._m1=f('<div class="tc-paging-container"><div class="tc-paging-centerer"><div class="tc-paging-centerer-inside"></div></div></div>');g=this._m1.find(".tc-paging-centerer-inside");for(e=1;e<=this._k1;e++)a=f('<a class="tc-paging-item" href="#">'+e+"</a>").data("tc-id",e),e===
this._l1+1&&a.addClass("current"),g.append(a);this._n1=g.find(".tc-paging-item").click(function(a){a.preventDefault();d.goTo((f(a.currentTarget).data("tc-id")-1)*d._i1)});this._n.after(this._m1)}}else this._j1=!1;this._l.css({width:n});this.settings.directionNav&&(this._n.after("<a href='#' class='arrow-holder left'><span class='arrow-icon left'></span></a> <a href='#' class='arrow-holder right'><span class='arrow-icon right'></span></a>"),this.arrowLeft=this.carouselRoot.find(".arrow-holder.left"),
this.arrowRight=this.carouselRoot.find(".arrow-holder.right"),1>this.arrowLeft.length||1>this.arrowRight.length?this.settings.directionNav=!1:this.settings.directionNavAutoHide&&(this.arrowLeft.hide(),this.arrowRight.hide(),this.carouselRoot.one("mousemove.arrowshover",function(){d.arrowLeft.fadeIn("fast");d.arrowRight.fadeIn("fast")}),this.carouselRoot.hover(function(){d.arrowLeft.fadeIn("fast");d.arrowRight.fadeIn("fast")},function(){d.arrowLeft.fadeOut("fast");d.arrowRight.fadeOut("fast")})),this._p1(0),
this.settings.directionNav&&(this.arrowRight.click(function(a){a.preventDefault();(d.settings.loopItems&&!d._u||!d._f1)&&d.next()}),this.arrowLeft.click(function(a){a.preventDefault();(d.settings.loopItems&&!d._u||!d._e1)&&d.prev()})));this.carouselWidth;this._q1="onorientationchange"in window?"orientationchange.touchcarousel":"resize.touchcarousel";var l;f(window).bind(this._q1,function(){l&&clearTimeout(l);l=setTimeout(function(){d.updateCarouselSize(!1)},100)});this.settings.scrollbar?(this._r1=
f("<div class='scrollbar-holder'><div class='scrollbar"+("light"===this.settings.scrollbarTheme.toLowerCase()?" light":" dark")+"'></div></div>"),this._r1.appendTo(this.carouselRoot),this.scrollbarJQ=this._r1.find(".scrollbar"),this._s1="",this._t1=this.scrollbarJQ[0].style,this._u1=0,this.settings.scrollbarAutoHide?(this._v1=!1,this.scrollbarJQ.css("opacity",0)):this._v1=!0):this.settings.scrollbarAutoHide=!1;this.updateCarouselSize(!0);this._n.bind(this._c,function(a){d._w1(a)});this.settings.autoplay&&
0<this.settings.autoplayDelay?(this._x1=!1,this.autoplayTimer="",this.wasAutoplayRunning=!0,this.hasTouch||this.carouselRoot.hover(function(){d._x1=!0;d._y1()},function(){d._x1=!1;d._z1()}),this.autoplay=!0,this._a2()):this.autoplay=!1;this.settings.keyboardNav&&f(document).bind("keydown.touchcarousel",function(a){d._u||(37===a.keyCode?d.prev():39===a.keyCode&&d.next())});this.carouselRoot.css("overflow","visible")}q.prototype={goTo:function(b,c){var a=this.items[b];a&&(!c&&(this.autoplay&&this.settings.autoplayStopAtAction)&&
this.stopAutoplay(),this._b2(b),this.endPos=this._c2(),a=-a.posX,0<a?a=0:a<this.carouselWidth-this._h1&&(a=this.carouselWidth-this._h1),this.animateTo(a,this.settings.transitionSpeed,"easeInOutSine"))},next:function(b){var c=this._c2(),a=this._d2(c).index;this._j1?(c=this._l1+1,a=c>this._k1-1?this.settings.loopItems?0:(this._k1-1)*this._i1:c*this._i1):(a+=this._i1,this.settings.loopItems&&c<=this.carouselWidth-this._h1&&(a=0),a>this.numItems-1&&(a=this.numItems-1));this.goTo(a,b)},prev:function(b){var c=
this._c2(),a=this._d2(c).index;this._j1?(c=this._l1-1,a=0>c?this.settings.loopItems?(this._k1-1)*this._i1:0:c*this._i1):(a-=this._i1,0>a&&(a=this.settings.loopItems?0>c?0:this.numItems-1:0));this.goTo(a,b)},getCurrentId:function(){return this._d2(this._c2()).index},setXPos:function(b,c){c?this._t1[this._b1]=this._c1+b+this._d1:this._m[this._b1]=this._c1+b+this._d1},stopAutoplay:function(){this._y1();this.wasAutoplayRunning=this.autoplay=!1},resumeAutoplay:function(){this.autoplay=!0;this.wasAutoplayRunning||
this._z1()},updateCarouselSize:function(b){this.carouselWidth=this.carouselRoot.width();if(this.settings.scrollToLast){var c=0;if(this._j1){var a=this.numItems%this._i1;if(0<a)for(a=this.numItems-a;a<this.numItems;a++)c+=this.items[a].width;else c=this.carouselWidth}else c=this.items[this.numItems-1].width;this._h1=this._f+this.carouselWidth-c}else this._h1=this._f;this.settings.scrollbar&&(c=Math.round(this._r1.width()/(this._h1/this.carouselWidth)),this.scrollbarJQ.css("width",c),this._u1=this._r1.width()-
c);if(!this.settings.scrollToLast){if(this.carouselWidth>=this._f){this._v=!0;this.settings.loopItems||(this._f1=!0,this.arrowRight.addClass("disabled"),this._e1=!0,this.arrowLeft.addClass("disabled"));this.setXPos(0);return}this._v&&(this._e1=this._f1=this._v=!1,this.arrowRight.removeClass("disabled"),this.arrowLeft.removeClass("disabled"))}b||(b=this.endPos=this._c2(),0<b?b=0:b<this.carouselWidth-this._h1&&(b=this.carouselWidth-this._h1),this.animateTo(b,300,"easeInOutSine"))},animateTo:function(b,
c,a,e,d,g,r){function p(){h._b=!1;h._a2();h.settings.scrollbarAutoHide&&h._g2();null!==h.settings.onAnimComplete&&h.settings.onAnimComplete.call(h)}null!==this.settings.onAnimStart&&this.settings.onAnimStart.call(this);this.autoplay&&this.autoplayTimer&&(this.wasAutoplayRunning=!0,this._y1());this._e2();var h=this,n=this.settings.scrollbar,l=h._b1,j=h._c1,m=h._d1,q={containerPos:this.endPos},k={containerPos:b},v={containerPos:d};d=e?d:b;var s=h._m;h._b=!0;if(n){var t=this._t1,u=h._h1-h.carouselWidth;
this.settings.scrollbarAutoHide&&(this._v1||this._f2())}this._p1(d);this._p=f(q).animate(k,{duration:c,easing:a,step:function(){n&&(t[l]=j+Math.round(h._u1*(-this.containerPos/u))+m);s[l]=j+Math.round(this.containerPos)+m},complete:function(){e?h._p=f(k).animate(v,{duration:g,easing:r,step:function(){n&&(t[l]=j+Math.round(h._u1*(-this.containerPos/u))+m);s[l]=j+Math.round(this.containerPos)+m},complete:function(){n&&(t[l]=j+Math.round(h._u1*(-v.containerPos/u))+m);s[l]=j+Math.round(v.containerPos)+
m;p()}}):(n&&(t[l]=j+Math.round(h._u1*(-k.containerPos/u))+m),s[l]=j+Math.round(k.containerPos)+m,p())}})},destroy:function(){this.stopAutoplay();this._n.unbind(this._c);f(document).unbind(this._d).unbind(this._e);f(window).unbind(this._q1);this.settings.keyboardNav&&f(document).unbind("keydown.touchcarousel");this.carouselRoot.remove()},_b2:function(b){this._j1&&(this._l1=b=this._h2(b),this.settings.pagingNavControls&&(this._n1.removeClass("current"),this._n1.eq(b).addClass("current")))},_h2:function(b){for(var c=
this._i1,a=0;a<this._k1;a++)if(b>=a*c&&b<a*c+c)return a;return 0>b?0:b>=this._k1?this._k1-1:!1},_i2:function(){this.settings.loopItems||(this._e1?(this._e1=!1,this.arrowLeft.removeClass("disabled")):this._f1&&(this._f1=!1,this.arrowRight.removeClass("disabled")))},_o1:function(){!this._e1&&!this.settings.loopItems&&(this._e1=!0,this.arrowLeft.addClass("disabled"),this._f1&&(this._f1=!1,this.arrowRight.removeClass("disabled")))},_j2:function(){!this._f1&&!this.settings.loopItems&&(this._f1=!0,this.arrowRight.addClass("disabled"),
this._e1&&(this._e1=!1,this.arrowLeft.removeClass("disabled")))},_d2:function(b){b=-b;for(var c,a=0;a<this.numItems;a++)if(c=this.items[a],b>=c.posX&&b<c.posX+c.width)return c;return-1},_a2:function(){this.autoplay&&this.wasAutoplayRunning&&(this._x1||this._z1(),this.wasAutoplayRunning=!1)},_g2:function(){var b=this;this._v1=!1;this._s1&&clearTimeout(this._s1);this._s1=setTimeout(function(){b.scrollbarJQ.animate({opacity:0},150,"linear")},450)},_f2:function(){this._v1=!0;this._s1&&clearTimeout(this._s1);
this.scrollbarJQ.stop().animate({opacity:1},150,"linear")},_e2:function(){this._p&&this._p.stop()},_z1:function(){if(this.autoplay){var b=this;this.autoplayTimer||(this.autoplayTimer=setInterval(function(){!b._k2&&!b._b&&b.next(!0)},this.settings.autoplayDelay))}},_y1:function(){this.autoplayTimer&&(clearInterval(this.autoplayTimer),this.autoplayTimer="")},_c2:function(b){b=!b?this._l:this.scrollbarJQ;return this._w?(b=b.css("-webkit-transform").replace(/^matrix\(/i,"").split(/, |\)$/g),parseInt(b[4],
10)):Math.round(b.position().left)},_w1:function(b){if(!this._k2){this.autoplay&&this.settings.autoplayStopAtAction&&this.stopAutoplay();this._e2();this.settings.scrollbarAutoHide&&this._f2();var c;if(this.hasTouch)if(this._a=!1,(c=b.originalEvent.touches)&&0<c.length)c=c[0];else return!1;else c=b,b.preventDefault();this._l2();this._k2=!0;var a=this;this._w&&a._l.css({"-webkit-transition-duration":"0","-webkit-transition-property":"none"});f(document).bind(this._d,function(b){a._m2(b)});f(document).bind(this._e,
function(b){a._n2(b)});this._o2=this._c2();this._i=c.clientX;this._q=!1;this._k=b.timeStamp||(new Date).getTime();this._t=0;this._s=this._r=c.clientX;this._p2=c.clientY}},_m2:function(b){var c=b.timeStamp||(new Date).getTime(),a;if(this.hasTouch){if(this._a)return!1;a=b.originalEvent.touches;if(1<a.length)return!1;a=a[0];if(Math.abs(a.clientY-this._p2)>Math.abs(a.clientX-this._r)+3)return this.settings.lockAxis&&(this._a=!0),!1}else a=b;b.preventDefault();this._j=a.clientX;this._q2=this._r2;b=a.clientX-
this._s;this._q2!=b&&(this._r2=b);if(0!=b){var e=this._o2+this._t;0<=e?(b/=4,this._o1()):e<=this.carouselWidth-this._h1?(this._j2(),b/=4):this._i2();this._t+=b;this.setXPos(e);this.settings.scrollbar&&this.setXPos(this._u1*(-e/(this._h1-this.carouselWidth)),!0)}this._s=a.clientX;350<c-this._k&&(this._k=c,this._i=a.clientX);null!==this.settings.onDragStart&&this.settings.onDragStart.call(this);return!1},_n2:function(b){if(this._k2){var c=this;this._k2=!1;this._a1();this.endPos=this._c2();this.isdrag=
!1;f(document).unbind(this._d).unbind(this._e);if(this.endPos==this._o2){this._q=!1;this.settings.scrollbarAutoHide&&this._g2();return}this._q=!0;var a=this._j-this._i;b=Math.max(40,(b.timeStamp||(new Date).getTime())-this._k);var e=0.5;b=Math.abs(a)/b;var d=function(a){0<a?a=0:a<c.carouselWidth-c._h1&&(a=c.carouselWidth-c._h1);return a};if(this.settings.snapToItems){this.autoplay&&this.settings.autoplayStopAtAction&&this.stopAutoplay();var a=Boolean(0<this._r-this._s),e=d(this._c2()),g=this._d2(e).index;
this._j1?(a&&(e=Math.max(e-this.carouselWidth-1,1-c._h1),g=this._d2(e).index,void 0===g&&(g=this.numItems-1)),g=this._h2(g)*this._i1):g+=a?this._i1:-this._i1+1;g=a?Math.min(g,this.numItems-1):Math.max(g,0);e=this.items[g];this._b2(g);e&&(e=d(-e.posX),d=Math.abs(this.endPos-e),b=Math.max(1.08*d/b,150),g=Boolean(180>b),d*=0.08,a&&(d*=-1),this.animateTo(g?e+d:e,Math.min(b,400),"easeOutSine",g,e,300,"easeOutCubic"))}else d=0,2>=b?(e=3.5*this._x,d=0):2<b&&3>=b?(e=4*this._x,d=200):3<b&&(d=300,4<b&&(b=4,
d=400,e=6*this._x),e=5*this._x),a=2*b*b/(2*e)*(0>a?-1:1),e=2*b/e+d,0<this.endPos+a?0<this.endPos?this.animateTo(0,800,"easeOutCubic"):this.animateTo(this.carouselWidth/10*((d+200)/1E3),1.1*Math.abs(this.endPos)/b,"easeOutSine",!0,0,400,"easeOutCubic"):this.endPos+a<this.carouselWidth-this._h1?this.endPos<this.carouselWidth-this._h1?this.animateTo(this.carouselWidth-this._h1,800,"easeOutCubic"):this.animateTo(this.carouselWidth-this._h1-this.carouselWidth/10*((d+200)/1E3),1.1*Math.abs(this.carouselWidth-
this._h1-this.endPos)/b,"easeOutSine",!0,this.carouselWidth-this._h1,400,"easeOutCubic"):this.animateTo(this.endPos+a,e,"easeOutCubic");null!==this.settings.onDragRelease&&this.settings.onDragRelease.call(this)}return!1},_p1:function(b){void 0===b&&(b=this._c2());this.settings.loopItems||(0<=b?this._o1():b<=this.carouselWidth-this._h1?this._j2():this._i2())},_a1:function(){this._y?this._n.css("cursor",this._y):(this._n.removeClass("grabbing-cursor"),this._n.addClass("grab-cursor"))},_l2:function(){this._z?
this._n.css("cursor",this._z):(this._n.removeClass("grab-cursor"),this._n.addClass("grabbing-cursor"))}};f.fn.touchCarousel=function(b){return this.each(function(){var c=new q(f(this),b);f(this).data("touchCarousel",c)})};f.fn.touchCarousel.defaults={itemsPerMove:1,snapToItems:!1,pagingNav:!1,pagingNavControls:!0,autoplay:!1,autoplayDelay:3E3,autoplayStopAtAction:!0,scrollbar:!0,scrollbarAutoHide:!1,scrollbarTheme:"dark",transitionSpeed:600,directionNav:!0,directionNavAutoHide:!1,loopItems:!1,keyboardNav:!1,
dragUsingMouse:!0,scrollToLast:!1,itemFallbackWidth:500,baseMouseFriction:0.0012,baseTouchFriction:8E-4,lockAxis:!0,useWebkit3d:!1,onAnimStart:null,onAnimComplete:null,onDragStart:null,onDragRelease:null};f.fn.touchCarousel.settings={};f.extend(jQuery.easing,{easeInOutSine:function(b,c,a,e,d){return-e/2*(Math.cos(Math.PI*c/d)-1)+a},easeOutSine:function(b,c,a,e,d){return e*Math.sin(c/d*(Math.PI/2))+a},easeOutCubic:function(b,c,a,e,d){return e*((c=c/d-1)*c*c+1)+a}})})(jQuery);

/*
 * throttledresize: special jQuery event that happens at a reduced rate compared to "resize"
 *
 * latest version and complete README available on Github:
 * https://github.com/louisremi/jquery-smartresize
 *
 * Copyright 2012 @louis_remi
 * Licensed under the MIT license.
 *
 * This saved you an hour of work? 
 * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
 */
(function($) {

var $event = $.event,
	$special,
	dummy = {_:0},
	frame = 0,
	wasResized, animRunning;

$special = $event.special.throttledresize = {
	setup: function() {
		$( this ).on( "resize", $special.handler );
	},
	teardown: function() {
		$( this ).off( "resize", $special.handler );
	},
	handler: function( event, execAsap ) {
		// Save the context
		var context = this,
			args = arguments;

		wasResized = true;

		if ( !animRunning ) {
			setInterval(function(){
				frame++;

				if ( frame > $special.threshold && wasResized || execAsap ) {
					// set correct event type
					event.type = "throttledresize";
					$event.dispatch.apply( context, args );
					wasResized = false;
					frame = 0;
				}
				if ( frame > 9 ) {
					$(dummy).stop();
					animRunning = false;
					frame = 0;
				}
			}, 30);
			animRunning = true;
		}
	},
	threshold: 0
};

})(jQuery);

/* Images Loaded */
/*!
 * imagesLoaded PACKAGED v3.0.4
 * JavaScript is all like "You images are done yet or what?"
 */

/*!
 * EventEmitter v4.2.0 - git.io/ee
 * Oliver Caldwell
 * MIT license
 * @preserve
 */

(function () {
	// Place the script in strict mode
	'use strict';

	/**
	 * Class for managing events.
	 * Can be extended to provide event functionality in other classes.
	 *
	 * @class EventEmitter Manages event registering and emitting.
	 */
	function EventEmitter() {}

	// Shortcuts to improve speed and size

	// Easy access to the prototype
	var proto = EventEmitter.prototype;

	/**
	 * Finds the index of the listener for the event in it's storage array.
	 *
	 * @param {Function[]} listeners Array of listeners to search through.
	 * @param {Function} listener Method to look for.
	 * @return {Number} Index of the specified listener, -1 if not found
	 * @api private
	 */
	function indexOfListener(listeners, listener) {
		var i = listeners.length;
		while (i--) {
			if (listeners[i].listener === listener) {
				return i;
			}
		}

		return -1;
	}

	/**
	 * Returns the listener array for the specified event.
	 * Will initialise the event object and listener arrays if required.
	 * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
	 * Each property in the object response is an array of listener functions.
	 *
	 * @param {String|RegExp} evt Name of the event to return the listeners from.
	 * @return {Function[]|Object} All listener functions for the event.
	 */
	proto.getListeners = function getListeners(evt) {
		var events = this._getEvents();
		var response;
		var key;

		// Return a concatenated array of all matching events if
		// the selector is a regular expression.
		if (typeof evt === 'object') {
			response = {};
			for (key in events) {
				if (events.hasOwnProperty(key) && evt.test(key)) {
					response[key] = events[key];
				}
			}
		}
		else {
			response = events[evt] || (events[evt] = []);
		}

		return response;
	};

	/**
	 * Takes a list of listener objects and flattens it into a list of listener functions.
	 *
	 * @param {Object[]} listeners Raw listener objects.
	 * @return {Function[]} Just the listener functions.
	 */
	proto.flattenListeners = function flattenListeners(listeners) {
		var flatListeners = [];
		var i;

		for (i = 0; i < listeners.length; i += 1) {
			flatListeners.push(listeners[i].listener);
		}

		return flatListeners;
	};

	/**
	 * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
	 *
	 * @param {String|RegExp} evt Name of the event to return the listeners from.
	 * @return {Object} All listener functions for an event in an object.
	 */
	proto.getListenersAsObject = function getListenersAsObject(evt) {
		var listeners = this.getListeners(evt);
		var response;

		if (listeners instanceof Array) {
			response = {};
			response[evt] = listeners;
		}

		return response || listeners;
	};

	/**
	 * Adds a listener function to the specified event.
	 * The listener will not be added if it is a duplicate.
	 * If the listener returns true then it will be removed after it is called.
	 * If you pass a regular expression as the event name then the listener will be added to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to attach the listener to.
	 * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addListener = function addListener(evt, listener) {
		var listeners = this.getListenersAsObject(evt);
		var listenerIsWrapped = typeof listener === 'object';
		var key;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
				listeners[key].push(listenerIsWrapped ? listener : {
					listener: listener,
					once: false
				});
			}
		}

		return this;
	};

	/**
	 * Alias of addListener
	 */
	proto.on = proto.addListener;

	/**
	 * Semi-alias of addListener. It will add a listener that will be
	 * automatically removed after it's first execution.
	 *
	 * @param {String|RegExp} evt Name of the event to attach the listener to.
	 * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addOnceListener = function addOnceListener(evt, listener) {
		return this.addListener(evt, {
			listener: listener,
			once: true
		});
	};

	/**
	 * Alias of addOnceListener.
	 */
	proto.once = proto.addOnceListener;

	/**
	 * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
	 * You need to tell it what event names should be matched by a regex.
	 *
	 * @param {String} evt Name of the event to create.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.defineEvent = function defineEvent(evt) {
		this.getListeners(evt);
		return this;
	};

	/**
	 * Uses defineEvent to define multiple events.
	 *
	 * @param {String[]} evts An array of event names to define.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.defineEvents = function defineEvents(evts) {
		for (var i = 0; i < evts.length; i += 1) {
			this.defineEvent(evts[i]);
		}
		return this;
	};

	/**
	 * Removes a listener function from the specified event.
	 * When passed a regular expression as the event name, it will remove the listener from all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to remove the listener from.
	 * @param {Function} listener Method to remove from the event.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeListener = function removeListener(evt, listener) {
		var listeners = this.getListenersAsObject(evt);
		var index;
		var key;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key)) {
				index = indexOfListener(listeners[key], listener);

				if (index !== -1) {
					listeners[key].splice(index, 1);
				}
			}
		}

		return this;
	};

	/**
	 * Alias of removeListener
	 */
	proto.off = proto.removeListener;

	/**
	 * Adds listeners in bulk using the manipulateListeners method.
	 * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
	 * You can also pass it a regular expression to add the array of listeners to all events that match it.
	 * Yeah, this function does quite a bit. That's probably a bad thing.
	 *
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to add.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addListeners = function addListeners(evt, listeners) {
		// Pass through to manipulateListeners
		return this.manipulateListeners(false, evt, listeners);
	};

	/**
	 * Removes listeners in bulk using the manipulateListeners method.
	 * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	 * You can also pass it an event name and an array of listeners to be removed.
	 * You can also pass it a regular expression to remove the listeners from all events that match it.
	 *
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to remove.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeListeners = function removeListeners(evt, listeners) {
		// Pass through to manipulateListeners
		return this.manipulateListeners(true, evt, listeners);
	};

	/**
	 * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
	 * The first argument will determine if the listeners are removed (true) or added (false).
	 * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	 * You can also pass it an event name and an array of listeners to be added/removed.
	 * You can also pass it a regular expression to manipulate the listeners of all events that match it.
	 *
	 * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
		var i;
		var value;
		var single = remove ? this.removeListener : this.addListener;
		var multiple = remove ? this.removeListeners : this.addListeners;

		// If evt is an object then pass each of it's properties to this method
		if (typeof evt === 'object' && !(evt instanceof RegExp)) {
			for (i in evt) {
				if (evt.hasOwnProperty(i) && (value = evt[i])) {
					// Pass the single listener straight through to the singular method
					if (typeof value === 'function') {
						single.call(this, i, value);
					}
					else {
						// Otherwise pass back to the multiple function
						multiple.call(this, i, value);
					}
				}
			}
		}
		else {
			// So evt must be a string
			// And listeners must be an array of listeners
			// Loop over it and pass each one to the multiple method
			i = listeners.length;
			while (i--) {
				single.call(this, evt, listeners[i]);
			}
		}

		return this;
	};

	/**
	 * Removes all listeners from a specified event.
	 * If you do not specify an event then all listeners will be removed.
	 * That means every event will be emptied.
	 * You can also pass a regex to remove all events that match it.
	 *
	 * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeEvent = function removeEvent(evt) {
		var type = typeof evt;
		var events = this._getEvents();
		var key;

		// Remove different things depending on the state of evt
		if (type === 'string') {
			// Remove all listeners for the specified event
			delete events[evt];
		}
		else if (type === 'object') {
			// Remove all events matching the regex.
			for (key in events) {
				if (events.hasOwnProperty(key) && evt.test(key)) {
					delete events[key];
				}
			}
		}
		else {
			// Remove all listeners in all events
			delete this._events;
		}

		return this;
	};

	/**
	 * Emits an event of your choice.
	 * When emitted, every listener attached to that event will be executed.
	 * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
	 * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
	 * So they will not arrive within the array on the other side, they will be separate.
	 * You can also pass a regular expression to emit to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	 * @param {Array} [args] Optional array of arguments to be passed to each listener.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.emitEvent = function emitEvent(evt, args) {
		var listeners = this.getListenersAsObject(evt);
		var listener;
		var i;
		var key;
		var response;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key)) {
				i = listeners[key].length;

				while (i--) {
					// If the listener returns true then it shall be removed from the event
					// The function is executed either with a basic call or an apply if there is an args array
					listener = listeners[key][i];
					response = listener.listener.apply(this, args || []);
					if (response === this._getOnceReturnValue() || listener.once === true) {
						this.removeListener(evt, listeners[key][i].listener);
					}
				}
			}
		}

		return this;
	};

	/**
	 * Alias of emitEvent
	 */
	proto.trigger = proto.emitEvent;

	/**
	 * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
	 * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	 * @param {...*} Optional additional arguments to be passed to each listener.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.emit = function emit(evt) {
		var args = Array.prototype.slice.call(arguments, 1);
		return this.emitEvent(evt, args);
	};

	/**
	 * Sets the current value to check against when executing listeners. If a
	 * listeners return value matches the one set here then it will be removed
	 * after execution. This value defaults to true.
	 *
	 * @param {*} value The new value to check for when executing listeners.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.setOnceReturnValue = function setOnceReturnValue(value) {
		this._onceReturnValue = value;
		return this;
	};

	/**
	 * Fetches the current value to check against when executing listeners. If
	 * the listeners return value matches this one then it should be removed
	 * automatically. It will return true by default.
	 *
	 * @return {*|Boolean} The current value to check for or the default, true.
	 * @api private
	 */
	proto._getOnceReturnValue = function _getOnceReturnValue() {
		if (this.hasOwnProperty('_onceReturnValue')) {
			return this._onceReturnValue;
		}
		else {
			return true;
		}
	};

	/**
	 * Fetches the events object and creates one if required.
	 *
	 * @return {Object} The events storage object.
	 * @api private
	 */
	proto._getEvents = function _getEvents() {
		return this._events || (this._events = {});
	};

	// Expose the class either via AMD, CommonJS or the global object
	if (typeof define === 'function' && define.amd) {
		define(function () {
			return EventEmitter;
		});
	}
	else if (typeof module !== 'undefined' && module.exports){
		module.exports = EventEmitter;
	}
	else {
		this.EventEmitter = EventEmitter;
	}
}.call(this));

/*!
 * eventie v1.0.3
 * event binding helper
 *   eventie.bind( elem, 'click', myFn )
 *   eventie.unbind( elem, 'click', myFn )
 */

/*jshint browser: true, undef: true, unused: true */
/*global define: false */

( function( window ) {

'use strict';

var docElem = document.documentElement;

var bind = function() {};

if ( docElem.addEventListener ) {
  bind = function( obj, type, fn ) {
    obj.addEventListener( type, fn, false );
  };
} else if ( docElem.attachEvent ) {
  bind = function( obj, type, fn ) {
    obj[ type + fn ] = fn.handleEvent ?
      function() {
        var event = window.event;
        // add event.target
        event.target = event.target || event.srcElement;
        fn.handleEvent.call( fn, event );
      } :
      function() {
        var event = window.event;
        // add event.target
        event.target = event.target || event.srcElement;
        fn.call( obj, event );
      };
    obj.attachEvent( "on" + type, obj[ type + fn ] );
  };
}

var unbind = function() {};

if ( docElem.removeEventListener ) {
  unbind = function( obj, type, fn ) {
    obj.removeEventListener( type, fn, false );
  };
} else if ( docElem.detachEvent ) {
  unbind = function( obj, type, fn ) {
    obj.detachEvent( "on" + type, obj[ type + fn ] );
    try {
      delete obj[ type + fn ];
    } catch ( err ) {
      // can't delete window object properties
      obj[ type + fn ] = undefined;
    }
  };
}

var eventie = {
  bind: bind,
  unbind: unbind
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( eventie );
} else {
  // browser global
  window.eventie = eventie;
}

})( this );

/*!
 * imagesLoaded v3.0.4
 * JavaScript is all like "You images are done yet or what?"
 */

( function( window ) {

'use strict';

var $ = window.jQuery;
var console = window.console;
var hasConsole = typeof console !== 'undefined';

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

var objToString = Object.prototype.toString;
function isArray( obj ) {
  return objToString.call( obj ) === '[object Array]';
}

// turn element or nodeList into an array
function makeArray( obj ) {
  var ary = [];
  if ( isArray( obj ) ) {
    // use object if already an array
    ary = obj;
  } else if ( typeof obj.length === 'number' ) {
    // convert nodeList to array
    for ( var i=0, len = obj.length; i < len; i++ ) {
      ary.push( obj[i] );
    }
  } else {
    // array of single index
    ary.push( obj );
  }
  return ary;
}

// --------------------------  -------------------------- //

function defineImagesLoaded( EventEmitter, eventie ) {

  /**
   * @param {Array, Element, NodeList, String} elem
   * @param {Object or Function} options - if function, use as callback
   * @param {Function} onAlways - callback function
   */
  function ImagesLoaded( elem, options, onAlways ) {
    // coerce ImagesLoaded() without new, to be new ImagesLoaded()
    if ( !( this instanceof ImagesLoaded ) ) {
      return new ImagesLoaded( elem, options );
    }
    // use elem as selector string
    if ( typeof elem === 'string' ) {
      elem = document.querySelectorAll( elem );
    }

    this.elements = makeArray( elem );
    this.options = extend( {}, this.options );

    if ( typeof options === 'function' ) {
      onAlways = options;
    } else {
      extend( this.options, options );
    }

    if ( onAlways ) {
      this.on( 'always', onAlways );
    }

    this.getImages();

    if ( $ ) {
      // add jQuery Deferred object
      this.jqDeferred = new $.Deferred();
    }

    // HACK check async to allow time to bind listeners
    var _this = this;
    setTimeout( function() {
      _this.check();
    });
  }

  ImagesLoaded.prototype = new EventEmitter();

  ImagesLoaded.prototype.options = {};

  ImagesLoaded.prototype.getImages = function() {
    this.images = [];

    // filter & find items if we have an item selector
    for ( var i=0, len = this.elements.length; i < len; i++ ) {
      var elem = this.elements[i];
      // filter siblings
      if ( elem.nodeName === 'IMG' ) {
        this.addImage( elem );
      }
      // find children
      var childElems = elem.querySelectorAll('img');
      // concat childElems to filterFound array
      for ( var j=0, jLen = childElems.length; j < jLen; j++ ) {
        var img = childElems[j];
        this.addImage( img );
      }
    }
  };

  /**
   * @param {Image} img
   */
  ImagesLoaded.prototype.addImage = function( img ) {
    var loadingImage = new LoadingImage( img );
    this.images.push( loadingImage );
  };

  ImagesLoaded.prototype.check = function() {
    var _this = this;
    var checkedCount = 0;
    var length = this.images.length;
    this.hasAnyBroken = false;
    // complete if no images
    if ( !length ) {
      this.complete();
      return;
    }

    function onConfirm( image, message ) {
      if ( _this.options.debug && hasConsole ) {
        console.log( 'confirm', image, message );
      }

      _this.progress( image );
      checkedCount++;
      if ( checkedCount === length ) {
        _this.complete();
      }
      return true; // bind once
    }

    for ( var i=0; i < length; i++ ) {
      var loadingImage = this.images[i];
      loadingImage.on( 'confirm', onConfirm );
      loadingImage.check();
    }
  };

  ImagesLoaded.prototype.progress = function( image ) {
    this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
    // HACK - Chrome triggers event before object properties have changed. #83
    var _this = this;
    setTimeout( function() {
      _this.emit( 'progress', _this, image );
      if ( _this.jqDeferred ) {
        _this.jqDeferred.notify( _this, image );
      }
    });
  };

  ImagesLoaded.prototype.complete = function() {
    var eventName = this.hasAnyBroken ? 'fail' : 'done';
    this.isComplete = true;
    var _this = this;
    // HACK - another setTimeout so that confirm happens after progress
    setTimeout( function() {
      _this.emit( eventName, _this );
      _this.emit( 'always', _this );
      if ( _this.jqDeferred ) {
        var jqMethod = _this.hasAnyBroken ? 'reject' : 'resolve';
        _this.jqDeferred[ jqMethod ]( _this );
      }
    });
  };

  // -------------------------- jquery -------------------------- //

  if ( $ ) {
    $.fn.imagesLoaded = function( options, callback ) {
      var instance = new ImagesLoaded( this, options, callback );
      return instance.jqDeferred.promise( $(this) );
    };
  }


  // --------------------------  -------------------------- //

  var cache = {};

  function LoadingImage( img ) {
    this.img = img;
  }

  LoadingImage.prototype = new EventEmitter();

  LoadingImage.prototype.check = function() {
    // first check cached any previous images that have same src
    var cached = cache[ this.img.src ];
    if ( cached ) {
      this.useCached( cached );
      return;
    }
    // add this to cache
    cache[ this.img.src ] = this;

    // If complete is true and browser supports natural sizes,
    // try to check for image status manually.
    if ( this.img.complete && this.img.naturalWidth !== undefined ) {
      // report based on naturalWidth
      this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
      return;
    }

    // If none of the checks above matched, simulate loading on detached element.
    var proxyImage = this.proxyImage = new Image();
    eventie.bind( proxyImage, 'load', this );
    eventie.bind( proxyImage, 'error', this );
    proxyImage.src = this.img.src;
  };

  LoadingImage.prototype.useCached = function( cached ) {
    if ( cached.isConfirmed ) {
      this.confirm( cached.isLoaded, 'cached was confirmed' );
    } else {
      var _this = this;
      cached.on( 'confirm', function( image ) {
        _this.confirm( image.isLoaded, 'cache emitted confirmed' );
        return true; // bind once
      });
    }
  };

  LoadingImage.prototype.confirm = function( isLoaded, message ) {
    this.isConfirmed = true;
    this.isLoaded = isLoaded;
    this.emit( 'confirm', this, message );
  };

  // trigger specified handler for event type
  LoadingImage.prototype.handleEvent = function( event ) {
    var method = 'on' + event.type;
    if ( this[ method ] ) {
      this[ method ]( event );
    }
  };

  LoadingImage.prototype.onload = function() {
    this.confirm( true, 'onload' );
    this.unbindProxyEvents();
  };

  LoadingImage.prototype.onerror = function() {
    this.confirm( false, 'onerror' );
    this.unbindProxyEvents();
  };

  LoadingImage.prototype.unbindProxyEvents = function() {
    eventie.unbind( this.proxyImage, 'load', this );
    eventie.unbind( this.proxyImage, 'error', this );
  };

  // -----  ----- //

  return ImagesLoaded;
}

// -------------------------- transport -------------------------- //

if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( [
      'eventEmitter/EventEmitter',
      'eventie/eventie'
    ],
    defineImagesLoaded );
} else {
  // browser global
  window.imagesLoaded = defineImagesLoaded(
    window.EventEmitter,
    window.eventie
  );
}

})( window );


