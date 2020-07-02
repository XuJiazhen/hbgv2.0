import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		systemInfo: null,
		hasLogin: false
	},
	mutations:{},
	actions:{}
})

export default store