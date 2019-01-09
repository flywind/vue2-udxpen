import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import tagsView from './modules/tagsView'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
		app,
		errorLog,
		user,
		tagsView,
		permission
	},
	getters
})
