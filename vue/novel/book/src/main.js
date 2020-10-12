import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
//导入font-awesome字体图标库
import 'font-awesome/css/font-awesome.min.css'
//阿里图标矢量库
import "./assets/font/iconfont.css"
import "./assets/css/base.css"
//导入用于设置 rem 基准值模块，默认情况下，设置在iphone6屏幕下的html元素的字体大小为37.5px
import 'lib-flexible'
//导入vant框架 用什么组件就导入什么
import {
  NavBar,
  Row,
  Search,
  Col,
  Form,
  Field,
  Toast,
  Tabbar,
  TabbarItem,
  Swipe, 
  SwipeItem,
  Lazyload,
  Empty,
  SwipeCell,
  Popup,
  Tabs,
  Tab,
  Icon,
  Cell,
  CellGroup,
  Dialog,
  Radio,
  RadioGroup,
  Uploader,
  Button,
  List
} from 'vant'

//注册vant框架的组件
Vue
  .use(NavBar)
  .use(Row)
  .use(Col)
  .use(Search)
  .use(Form)
  .use(Field)
  .use(Toast)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(Empty)
  .use(SwipeCell)
  .use(Popup)
  .use(Tabs)
  .use(Tab)
  .use(Icon)
  .use(Cell)
  .use(CellGroup)
  .use(Dialog)
  .use(Radio)
  .use(RadioGroup)
  .use( Uploader )
  .use(Button)
  .use(List)
//注册axios
Vue.use(VueAxios, axios)
//配置请求基础路径
axios.defaults.baseURL = 'http://www.kangliuyong.com:10002'

//配置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

//发起请求之前处理 interceptors：拦截器
axios.interceptors.request.use(config => {
  // 

  if (config.method == 'post') {
    let paramsString = '';
    //post请求参数序列化，转成一个字符串
    for (let key in config.data) {
      paramsString += key + '=' + config.data[key] + '&'
    }

    // 

    config.data = paramsString.slice(0, -1);

    // 
  }

  return config;
})
// 阻止启动生产消息
Vue.config.productionTip = false

//添加appkey属性保存appkey
Vue.prototype.appkey = 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=';
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
