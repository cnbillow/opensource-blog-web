import Vue from 'vue'
import App from './App.vue'
// 路由表
import {router} from '@/extend/router'
// iview
import iView from 'iview'
import 'iview/dist/styles/iview.css'
// vue扩展
import '@/extend/mixins'
// 状态管理
import '@/extend/store'

Vue.config.productionTip = false
Vue.use(iView)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
