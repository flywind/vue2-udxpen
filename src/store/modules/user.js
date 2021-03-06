import { login, logout, getUserInfo } from '@/api/login'
import { getSystemInfo } from '@/api/system'
import { setStore, getStore, clearStore } from '@/utils/store'
import {
	getToken,
	setToken,
	removeToken,
} from '@/utils/auth'

const user = {
	state: {
		token: getToken(),
		name: '',
		avatar: '',
		setting: getStore({name: 'system'}),
		roles: []
	},

	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_SETTING: (state, setting) => {
			state.setting = setting
		},
		SET_NAME: (state, name) => {
			state.name = name
		},
		SET_AVATAR: (state, avatar) => {
			state.avatar = avatar
		},
		SET_ROLES: (state, roles) => {
			state.roles = roles
		}
	},

	actions: {
		// 用户登录
		Login({
			commit
		}, userInfo) {
			const username = userInfo.username.trim()
			return new Promise((resolve, reject) => {
				login(username, userInfo.password).then(response => {

					const data = response.data
					commit('SET_TOKEN', data.token)
					setToken(response.data.token)
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},

		//系统信息
		GetSystemInfo({commit, state}){
			//debugger
			return new Promise((resolve, reject) => {
				getSystemInfo().then(response => {
					const data = response.data
					commit('SET_SETTING', data.row)
					setStore({
						name: 'system',
						content: data.row
					})
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},
		
		//用户信息
		GetUserInfo({
			commit,
			state
		}) {
			return new Promise((resolve, reject) => {
				getUserInfo(state.token).then(response => {
					if(!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
						reject('error')
					}
					const data = response.data
					//debugger
					if(data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
						commit('SET_ROLES', data.roles)
					} else {
						reject('getInfo: roles must be a non-null array !')
					}

					commit('SET_NAME', data.loginUser.username)
					commit('SET_AVATAR', data.loginUser.picUrl)
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 第三方验证登录
		// LoginByThirdparty({ commit, state }, code) {
		//   return new Promise((resolve, reject) => {
		//     commit('SET_CODE', code)
		//     loginByThirdparty(state.status, state.email, state.code).then(response => {
		//       commit('SET_TOKEN', response.data.token)
		//       setToken(response.data.token)
		//       resolve()
		//     }).catch(error => {
		//       reject(error)
		//     })
		//   })
		// },

		// 登出
		LogOut({
			commit,
			state
		}) {
			return new Promise((resolve, reject) => {
				logout(state.token).then(() => {
					commit('SET_TOKEN', '')
					commit('SET_ROLES', [])
					removeToken()
					clearStore()
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 前端 登出
		FedLogOut({
			commit
		}) {
			return new Promise(resolve => {
				commit('SET_TOKEN', '')
				removeToken()
				//clearStore({type: false})
				resolve()
			})
		},

		// 动态修改权限
		ChangeRoles({
			commit,
			dispatch
		}, role) {
			return new Promise(resolve => {
				commit('SET_TOKEN', role)
				setToken(role)
				getUserInfo(role).then(response => {
					const data = response.data
					commit('SET_ROLES', data.roles)
					commit('SET_NAME', data.name)
					commit('SET_AVATAR', data.avatar)
					commit('SET_INTRODUCTION', data.introduction)
					dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
					resolve()
				})
			})
		}
	}
}

export default user