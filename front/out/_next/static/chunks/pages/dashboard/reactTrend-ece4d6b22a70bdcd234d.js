_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[37,46,48,49],{"1/7W":function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/dashboard/reactTrend",function(){return n("gGzw")}])},GeUX:function(t,e,n){"use strict";n.r(e);var a=n("ERkP"),r=n.n(a),i=n("j/s1"),o=n("KuPt"),s=n("JakE"),l=i.b.h1.withConfig({displayName:"pageHeaderstyle__WDComponentTitleWrapper",componentId:"nr81kb-0"})(["font-size:19px;font-weight:500;color:",";width:100%;margin-right:17px;margin-bottom:30px;display:flex;align-items:center;white-space:nowrap;@media only screen and (max-width:767px){margin:0 10px;margin-bottom:30px;}&:before{content:'';width:5px;height:40px;background-color:",";display:flex;margin:",";}&:after{content:'';width:100%;height:1px;background-color:",";display:flex;margin:",";}"],Object(o.palette)("secondary",2),Object(o.palette)("secondary",3),(function(t){return"rtl"===t["data-rtl"]?"0 0 0 15px":"0 15px 0 0"}),Object(o.palette)("secondary",3),(function(t){return"rtl"===t["data-rtl"]?"0 15px 0 0":"0 0 0 15px"})),u=Object(s.a)(l),d=r.a.createElement;e.default=function(t){return d(u,{className:"isoComponentTitle"},t.children)}},TUWS:function(t,e,n){"use strict";n.r(e);var a=n("cxan"),r=n("ERkP"),i=n.n(r),o=n("j/s1").b.div.withConfig({displayName:"layoutWrapperstyle__LayoutContentWrapper",componentId:"qhwnm2-0"})(["padding:40px 20px;display:flex;flex-flow:row wrap;overflow:hidden;@media only screen and (max-width:767px){padding:50px 20px;}@media (max-width:580px){padding:15px;}"]),s=i.a.createElement;e.default=function(t){return s(o,Object(a.a)({className:null!=t.className?"".concat(t.className," isoLayoutContentWrapper"):"isoLayoutContentWrapper"},t),t.children)}},gGzw:function(t,e,n){"use strict";n.r(e);var a=n("ERkP"),r=n.n(a),i=n("ysqo"),o=n.n(i),s=[0,2,5,9,5,10,3,5,0,0,1,8,2,9,0],l=["purple","violet"],u=n("GeUX"),d=n("TUWS"),c=n("lISX"),p=n("aWzz"),f=n.n(p),h=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t},m=function(t){var e=t.value,n=t.min,a=t.max,r=t.scaleMin,i=void 0===r?0:r,o=t.scaleMax;return n===a?i:i+(e-n)*((void 0===o?1:o)-i)/(a-n)},x=function(t,e,n){var a=t.x-e.x,r=t.y-e.y,i=Math.sqrt(a*a+r*r),o=a/i,s=r/i;return{x:e.x+o*n,y:e.y+s*n}},y=function(t,e){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))},g=void 0,w=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t};var b={data:f.a.arrayOf(f.a.oneOfType([f.a.number,f.a.shape({value:f.a.number})]).isRequired).isRequired,smooth:f.a.bool,autoDraw:f.a.bool,autoDrawDuration:f.a.number,autoDrawEasing:f.a.string,width:f.a.number,height:f.a.number,padding:f.a.number,radius:f.a.number,gradient:f.a.arrayOf(f.a.string)},v=function(t){function e(n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var a=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!==typeof e&&"function"!==typeof e?t:e}(this,t.call(this,n));return a.trendId=Math.round(Math.random()*Math.pow(10,16)),a.gradientId="react-trend-vertical-gradient-"+a.trendId,a}return function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),e.prototype.componentDidMount=function(){var t=this.props,e=t.autoDraw,n=t.autoDrawDuration,a=t.autoDrawEasing;e&&(this.lineLength=this.path.getTotalLength(),function(t){if(null==g&&null==(g=document.querySelector("style[data-react-trend]"))){var e=document.head||document.getElementsByTagName("head")[0];(g=document.createElement("style")).type="text/css",g.setAttribute("data-react-trend",""),e.appendChild(g)}g.appendChild(document.createTextNode(t))}(function(t){var e=t.id,n=t.lineLength,a=t.duration;return"\n    \n    @keyframes react-trend-autodraw-"+e+" {\n      0% {\n        stroke-dasharray: "+n+";\n        stroke-dashoffset: "+n+"\n      }\n      100% {\n        stroke-dasharray: "+n+";\n        stroke-dashoffset: 0;\n      }\n      100% {\n        stroke-dashoffset: '';\n        stroke-dasharray: '';\n      }\n    }\n  \n\n    \n    @keyframes react-trend-autodraw-cleanup-"+e+" {\n      to {\n        stroke-dasharray: '';\n        stroke-dashoffset: '';\n      }\n    }\n  \n\n    #react-trend-"+e+" {\n      animation:\n        react-trend-autodraw-"+e+" "+a+"ms "+t.easing+",\n        react-trend-autodraw-cleanup-"+e+" 1ms "+a+"ms\n      ;\n    }\n  "}({id:this.trendId,lineLength:this.lineLength,duration:n,easing:a})))},e.prototype.getDelegatedProps=function(){return t=this.props,e=Object.keys(b),Object.keys(t).reduce((function(n,a){var r;return-1!==e.indexOf(a)?n:h({},n,((r={})[a]=t[a],r))}),{});var t,e},e.prototype.renderGradientDefinition=function(){var t=this.props.gradient;return r.a.createElement("defs",null,r.a.createElement("linearGradient",{id:this.gradientId,x1:"0%",y1:"0%",x2:"0%",y2:"100%"},t.slice().reverse().map((function(e,n){return r.a.createElement("stop",{key:n,offset:m({value:n,min:0,max:t.length-1||1}),stopColor:e})}))))},e.prototype.render=function(){var t=this,e=this.props,n=e.data,a=e.smooth,i=e.width,o=e.height,s=e.padding,l=e.radius,u=e.gradient;if(!n||n.length<2)return null;var d=i||300,c=o||75,p=i||"100%",f=o||"25%",h=function(t,e){var n=e.minX,a=e.maxX,r=e.minY,i=e.maxY,o={min:0,max:t.length-1},s={min:Math.min.apply(Math,t),max:Math.max.apply(Math,t)},l=t.map((function(t,e){return{x:m({value:e,min:o.min,max:o.max,scaleMin:n,scaleMax:a}),y:m({value:t,min:s.min,max:s.max,scaleMin:r,scaleMax:i})}}));return s.min===s.max&&(l[0].y+=1e-4),l}(n.map((function(t){return"number"===typeof t?t:t.value})),{minX:s,maxX:d-s,minY:c-s,maxY:s}),g=a?function(t,e){var n=e.radius,a=t[0],r=t.slice(1);return r.reduce((function(t,e,i){var o,s,l,u=r[i+1],d=r[i-1]||a,c=u&&(s=e,l=u,((o=d).y-s.y)*(o.x-l.x)===(o.y-l.y)*(o.x-s.x));if(!u||c)return t+"\nL "+e.x+","+e.y;var p=y(d,e),f=y(u,e),h=Math.min(p,f),m=h/2<n?h/2:n,g=x(d,e,m),w=x(u,e,m);return[t,"L "+g.x+","+g.y,"S "+e.x+","+e.y+" "+w.x+","+w.y].join("\n")}),"M "+a.x+","+a.y)}(h,{radius:l}):function(t){return t.reduce((function(t,e,n){return t+(0===n?"M":"L")+" "+e.x+","+e.y+"\n"}),"")}(h);return r.a.createElement("svg",w({width:p,height:f,viewBox:"0 0 "+d+" "+c},this.getDelegatedProps()),u&&this.renderGradientDefinition(),r.a.createElement("path",{ref:function(e){t.path=e},id:"react-trend-"+this.trendId,d:g,fill:"none",stroke:u?"url(#"+this.gradientId+")":void 0}))},e}(a.Component);v.defaultProps={radius:10,stroke:"black",padding:8,strokeWidth:1,autoDraw:!1,autoDrawDuration:2e3,autoDrawEasing:"ease"};var E=v,k=r.a.createElement,O=function(){return k(d.default,{className:"isoMapPage"},k(u.default,null,"React Trend"),k(c.default,null,k(E,{smooth:true,autoDraw:true,autoDrawDuration:parseInt(3e3,10),autoDrawEasing:"ease-out",height:100,width:600,data:s,gradient:l,radius:parseInt(1.5,10),strokeWidth:.5,strokeLinecap:"round"})))},_=n("P/cE"),j=n("0Jbt"),D=r.a.createElement;e.default=Object(_.c)((function(){return D(r.a.Fragment,null,D(o.a,null,D("title",null,"React Trend")),D(j.a,null,D(O,null)))}))},lISX:function(t,e,n){"use strict";n.r(e);var a=n("ERkP"),r=n.n(a),i=n("j/s1"),o=n("KuPt"),s=i.b.h3.withConfig({displayName:"boxTitlestyle__BoxTitle",componentId:"sc-132ff7v-0"})(["font-size:14px;font-weight:500;color:",";margin:0;margin-bottom:5px;"],Object(o.palette)("text",0)),l=i.b.p.withConfig({displayName:"boxTitlestyle__BoxSubTitle",componentId:"sc-132ff7v-1"})(["font-size:13px;font-weight:400;color:",";line-height:24px;"],Object(o.palette)("text",3)),u=r.a.createElement,d=function(t){return u("div",null,t.title?u(s,{className:"isoBoxTitle"}," ",t.title," "):"",t.subtitle?u(l,{className:"isoBoxSubTitle"}," ",t.subtitle," "):"")},c=i.b.div.withConfig({displayName:"boxstyle__BoxWrapper",componentId:"sc-6ry71n-0"})(["width:100%;height:100%;padding:20px;background-color:#ffffff;border:1px solid ",";margin:0 0 30px;&:last-child{margin-bottom:0;}@media only screen and (max-width:767px){padding:20px;",";}&.half{width:calc(50% - 34px);@media (max-width:767px){width:100%;}}"],Object(o.palette)("border",0),""),p=r.a.createElement;e.default=function(t){return p(c,{className:"".concat(t.className?t.className:""," isoBoxWrapper"),style:t.style},p(d,{title:t.title,subtitle:t.subtitle}),t.children)}}},[["1/7W",2,1,7,6,0,3,4,5,8,9,10,11,12]]]);