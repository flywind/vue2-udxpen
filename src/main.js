import Vue from 'vue'

import Cookies from 'js-cookie'

import 'animate.css'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import moment from 'moment';
import axios from 'axios'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css
import '@/styles/iconfont.css'

import App from './App.vue'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import './icons' // svg icon
import './errorLog' // error log
import './permission' // permission control
import waves from './components/waves' // waves

import * as filters from './filters' // global filters
Vue.prototype.$moment = moment;
Vue.prototype.$axios = axios;
Vue.use(waves)
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
