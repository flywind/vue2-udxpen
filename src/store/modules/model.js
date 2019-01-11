import { setStore, getStore, clearStore } from '@/utils/store'

import { getCategorys } from '@/api/category'

const model = {
	state: {
		model: null,
	},
	mutations: {
		SET_MODEL: (state, model) => {
			state.model = model
		}
	},
	actions: {
		setModel({commit, state}, model){
			return new Promise((resolve, reject) => {
// 				getCategorys().then(response => {
// 					const data = response.data
// 					commit('SET_SETTING', data.row)
// 					setStore({
// 						name: 'system',
// 						content: data.row
// 					})
// 					resolve()
// 				}).catch(error => {
// 					reject(error)
// 				})
			}
		}
	}
}

export default model;