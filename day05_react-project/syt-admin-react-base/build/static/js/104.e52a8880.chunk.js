"use strict";(self.webpackChunksyt_admin=self.webpackChunksyt_admin||[]).push([[104],{7058:function(e,t,n){n.d(t,{Dn:function(){return o},Jp:function(){return s},SJ:function(){return i},SR:function(){return a},Xt:function(){return c},g8:function(){return l}});var r=n(4832),a=function(e){var t=e.page,n=e.limit,a=e.hosname,i=e.hoscode;return r.W.get("/admin/hosp/hospitalSet/".concat(t,"/").concat(n),{params:{hosname:a,hoscode:i}})},i=function(e){return r.W.post("/admin/hosp/hospitalSet/save",e)},s=function(e){return r.W.delete("admin/hosp/hospitalSet/remove/"+e)},o=function(e){return r.W.get("/admin/hosp/hospitalSet/get/"+e)},c=function(e){return r.W.put("/admin/hosp/hospitalSet/update",e)},l=function(e){return r.W.delete("/admin/hosp/hospitalSet/batchRemove",{data:e})}},104:function(e,t,n){n.r(t),n.d(t,{default:function(){return v}});var r=n(5861),a=n(9439),i=n(7757),s=n.n(i),o=n(7058),c=n(3272),l=n(3695),u=n(3383),p=n(8678),m=n(3099),d=n(7309),f=n(2791),h=n(6871),x=n(184);function v(){var e=c.Z.useForm(),t=(0,a.Z)(e,1)[0],n=(0,h.s0)(),i=(0,h.UO)().id,v=function(){var e=(0,r.Z)(s().mark((function e(t){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("fields",t),!i){e.next=9;break}return console.log("\u4fee\u6539\u6570\u636e"),t.id=i,e.next=6,(0,o.Xt)(t);case 6:l.ZP.success("\u4fee\u6539\u6210\u529f"),e.next=12;break;case 9:return e.next=11,(0,o.SJ)(t);case 11:l.ZP.success("\u6dfb\u52a0\u6210\u529f");case 12:n("/syt/hospital/hospitalSet");case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Z=function(){var e=(0,r.Z)(s().mark((function e(){var n;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,o.Dn)(i);case 2:n=e.sent,console.log(n),t.setFieldsValue(n);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,f.useEffect)((function(){i&&Z()}),[]),(0,x.jsx)(u.Z,{children:(0,x.jsxs)(c.Z,{name:"basic",labelCol:{span:3},wrapperCol:{span:21},onFinish:v,form:t,children:[(0,x.jsx)(c.Z.Item,{label:"\u533b\u9662\u540d\u79f0",name:"hosname",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u533b\u9662\u540d\u79f0!"}],children:(0,x.jsx)(p.Z,{})}),(0,x.jsx)(c.Z.Item,{label:"\u533b\u9662\u7f16\u53f7",name:"hoscode",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u533b\u9662\u7f16\u53f7!"}],children:(0,x.jsx)(p.Z,{})}),(0,x.jsx)(c.Z.Item,{label:"api\u57fa\u7840\u8def\u5f84",name:"apiUrl",rules:[{required:!0,message:"\u8bf7\u8f93\u5165api\u57fa\u7840\u8def\u5f84!"}],children:(0,x.jsx)(p.Z,{})}),(0,x.jsx)(c.Z.Item,{label:"\u8054\u7cfb\u4eba\u59d3\u540d",name:"contactsName",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u8054\u7cfb\u4eba\u59d3\u540d!"}],children:(0,x.jsx)(p.Z,{})}),(0,x.jsx)(c.Z.Item,{label:"\u8054\u7cfb\u4eba\u624b\u673a",name:"contactsPhone",rules:[{required:!0,message:"\u8054\u7cfb\u4eba\u624b\u673a\u53f7\u5fc5\u586b!"},{pattern:/^1[3-9]\d{9}$/,message:"\u624b\u673a\u53f7\u4e0d\u5408\u6cd5"}],children:(0,x.jsx)(p.Z,{})}),(0,x.jsx)(c.Z.Item,{wrapperCol:{offset:3,span:16},children:(0,x.jsxs)(m.Z,{children:[(0,x.jsx)(d.Z,{type:"primary",htmlType:"submit",children:"\u4fdd\u5b58"}),(0,x.jsx)(d.Z,{children:"\u8fd4\u56de"})]})})]})})}},3099:function(e,t,n){n.d(t,{u:function(){return f},Z:function(){return x}});var r=n(7462),a=n(4942),i=n(9439),s=n(2791),o=n(1694),c=n.n(o),l=n(5501),u=n(9077);function p(e){var t=e.className,n=e.direction,i=e.index,o=e.marginDirection,c=e.children,l=e.split,u=e.wrap,p=s.useContext(f),m=p.horizontalSize,d=p.verticalSize,h=p.latestIndex,x={};return p.supportFlexGap||("vertical"===n?i<h&&(x={marginBottom:m/(l?2:1)}):x=(0,r.Z)((0,r.Z)({},i<h&&(0,a.Z)({},o,m/(l?2:1))),u&&{paddingBottom:d})),null===c||void 0===c?null:s.createElement(s.Fragment,null,s.createElement("div",{className:t,style:x},c),i<h&&l&&s.createElement("span",{className:"".concat(t,"-split"),style:x},l))}var m=n(9911),d=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},f=s.createContext({latestIndex:0,horizontalSize:0,verticalSize:0,supportFlexGap:!1}),h={small:8,middle:16,large:24};var x=function(e){var t,n=s.useContext(u.E_),o=n.getPrefixCls,x=n.space,v=n.direction,Z=e.size,g=void 0===Z?(null===x||void 0===x?void 0:x.size)||"small":Z,y=e.align,b=e.className,j=e.children,S=e.direction,w=void 0===S?"horizontal":S,z=e.prefixCls,k=e.split,C=e.style,E=e.wrap,I=void 0!==E&&E,O=d(e,["size","align","className","children","direction","prefixCls","split","style","wrap"]),N=(0,m.Z)(),P=s.useMemo((function(){return(Array.isArray(g)?g:[g,g]).map((function(e){return function(e){return"string"===typeof e?h[e]:e||0}(e)}))}),[g]),F=(0,i.Z)(P,2),W=F[0],q=F[1],G=(0,l.Z)(j,{keepEmpty:!0}),D=void 0===y&&"horizontal"===w?"center":y,B=o("space",z),J=c()(B,"".concat(B,"-").concat(w),(t={},(0,a.Z)(t,"".concat(B,"-rtl"),"rtl"===v),(0,a.Z)(t,"".concat(B,"-align-").concat(D),D),t),b),R="".concat(B,"-item"),_="rtl"===v?"marginLeft":"marginRight",A=0,M=G.map((function(e,t){null!==e&&void 0!==e&&(A=t);var n=e&&e.key||"".concat(R,"-").concat(t);return s.createElement(p,{className:R,key:n,direction:w,index:t,marginDirection:_,split:k,wrap:I},e)})),U=s.useMemo((function(){return{horizontalSize:W,verticalSize:q,latestIndex:A,supportFlexGap:N}}),[W,q,A,N]);if(0===G.length)return null;var X={};return I&&(X.flexWrap="wrap",N||(X.marginBottom=-q)),N&&(X.columnGap=W,X.rowGap=q),s.createElement("div",(0,r.Z)({className:J,style:(0,r.Z)((0,r.Z)({},X),C)},O),s.createElement(f.Provider,{value:U},M))}}}]);
//# sourceMappingURL=104.e52a8880.chunk.js.map