(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-727a7a76"],{"1ca1":function(t,a,e){var s=e("a719"),i=e("74e7"),n=e("90fb"),o=n("species");t.exports=function(t,a){var e;return i(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!i(e.prototype)?s(e)&&(e=e[o],null===e&&(e=void 0)):e=void 0),new(void 0===e?Array:e)(0===a?0:a)}},"2d3b":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"search"},[e("van-row",{staticClass:"topsearchNav"},[e("van-col",{attrs:{span:"3"},on:{click:function(a){return t.$router.go(-1)}}},[e("span",{staticClass:"iconfont icon-fanhui2"})]),e("van-col",{attrs:{span:"18"}},[e("span",{staticClass:"t"},[t._v("搜索")])]),e("van-col",{staticClass:"clearfix",attrs:{span:"3"}},[e("van-icon",{staticClass:"home-t",attrs:{name:"wap-home"},on:{click:function(a){return t.$router.push("/main/bookcity")}}})],1)],1),e("div",{staticClass:"page-searching-wrapper"},[e("div",{staticClass:"searching-wrapper"},[e("div",{staticClass:"searching-input"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.value,expression:"value"}],attrs:{type:"text",placeholder:"请输入搜索内容"},domProps:{value:t.value},on:{keyup:function(a){return!a.type.indexOf("key")&&t._k(a.keyCode,"enter",13,a.key,"Enter")?null:t.search(a)},input:function(a){a.target.composing||(t.value=a.target.value)}}})]),e("span",[t._v("确定")])]),""!=t.value?e("div",{staticClass:"searching-auto"},t._l(t.keywordsData,(function(a,s){return e("div",{key:s,staticClass:"li"},[t._v(t._s(a))])})),0):e("div",{staticClass:"searching-section"},[e("div",{staticClass:"searching-hotWords"},[e("div",{staticClass:"searching-title"},[e("div",{staticClass:"title"},[t._v("热门推荐")]),e("div",{staticClass:"right refresh",on:{click:function(a){return t.getHotWord()}}},[t._v("换一批")])]),t._l(t.searchHotWords,(function(a,s){return e("div",{key:s,staticClass:"content"},[t._v(t._s(a.word))])}))],2),t._m(0)])])],1)},i=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"searching-history"},[e("div",{staticClass:"searching-title"},[e("div",{staticClass:"title"},[t._v("搜索历史")]),e("div",{staticClass:"right delete"},[t._v("删除历史")])])])}],n=(e("ea69"),e("5e5c"),{data:function(){return{searchHotWords:[],keywordsData:[],value:"",index:0}},created:function(){this.hotWordsData(),this.autoWordsData()},methods:{hotWordsData:function(){var t=this;this.$toast.loading({message:"加载中...",forbidClick:!0,duration:0}),this.axios({method:"GET",url:"http://novel.kele8.cn/search-hotwords"}).then((function(a){t.$toast.clear(),200==a.status&&(t.searchHotWords=a.data.searchHotWords.splice(t.index,6))})).catch((function(t){}))},autoWordsData:function(){var t=this;this.$toast.loading({message:"加载中...",forbidClick:!0,duration:0});var a=this.value;this.axios({method:"GET",url:"http://novel.kele8.cn/auto-complete?query="+a}).then((function(a){t.$toast.clear(),200==a.status&&(t.keywordsData=a.data.keywords)})).catch((function(t){}))},search:function(){this.autoWordsData()},getHotWord:function(){this.index+=6,this.index=36==this.index?0:this.index,this.hotWordsData()}}}),o=n,r=e("9ca4"),c=Object(r["a"])(o,s,i,!1,null,"afd54f02",null);a["default"]=c.exports},"5e5c":function(t,a,e){},ea69:function(t,a,e){"use strict";var s=e("1c8b"),i=e("e1d6"),n=e("3da3"),o=e("d88d"),r=e("3553"),c=e("1ca1"),l=e("1bbd"),d=e("1ea7"),u=e("ff9c"),h=d("splice"),v=u("splice",{ACCESSORS:!0,0:0,1:2}),f=Math.max,p=Math.min,g=9007199254740991,C="Maximum allowed length exceeded";s({target:"Array",proto:!0,forced:!h||!v},{splice:function(t,a){var e,s,d,u,h,v,m=r(this),k=o(m.length),y=i(t,k),w=arguments.length;if(0===w?e=s=0:1===w?(e=0,s=k-y):(e=w-2,s=p(f(n(a),0),k-y)),k+e-s>g)throw TypeError(C);for(d=c(m,s),u=0;u<s;u++)h=y+u,h in m&&l(d,u,m[h]);if(d.length=s,e<s){for(u=y;u<k-s;u++)h=u+s,v=u+e,h in m?m[v]=m[h]:delete m[v];for(u=k;u>k-s+e;u--)delete m[u-1]}else if(e>s)for(u=k-s;u>y;u--)h=u+s-1,v=u+e-1,h in m?m[v]=m[h]:delete m[v];for(u=0;u<e;u++)m[u+y]=arguments[u+2];return m.length=k-s+e,d}})}}]);