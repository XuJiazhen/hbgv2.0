import Vue from 'vue'
import App from './App'
import store from './store/index.js'

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$baseUrl = 'https://ht.huijianfc.cn/appapi.php/'

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
