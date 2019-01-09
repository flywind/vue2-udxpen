import Cookies from 'js-cookie'
import { getStore, setStore } from '@/utils/store'

const app = {
  state: {
    sidebar: {
      opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
      withoutAnimation: false
    },
    language: Cookies.get('language') || 'en',
    size: Cookies.get('size') || 'medium',
    logobg: getStore({name: 'logobg'}) || 'skin6',
    navbarbg: getStore({name: 'navbarbg'}) || 'skin6',
    sidebarbg: getStore({name: 'sidebarbg'}) || 'skin6',
    navbarfixed: getStore({name: 'navbarfixed'}) || false,
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 0)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    },
    SET_SIZE: (state, size) => {
      state.size = size
      Cookies.set('size', size)
    },
    SET_LOGOBG: (state, logobg) => {
    	state.logobg = logobg;
    	setStore({
    		name: 'logobg',
    		content: logobg
    	})
    },
    SET_NAVBARBG: (state, navbarbg) => {
    	state.navbarbg = navbarbg;
    	setStore({
    		name: 'navbarbg',
    		content: navbarbg
    	})
    },
    SET_SIDEBARBG: (state, sidebarbg) => {
    	state.sidebarbg = sidebarbg;
    	setStore({
    		name: 'sidebarbg',
    		content: sidebarbg
    	})
    },
    SET_NAVBARFIXED: (state, navbarfixed) => {
    	state.navbarfixed = navbarfixed;
    	setStore({
    		name: 'navbarfixed',
    		content: navbarfixed
    	})
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    setSize({ commit }, size) {
      commit('SET_SIZE', size)
    },
    setLogobg({ commit }, logobg){
    	commit('SET_LOGOBG', logobg)
    },
    setNavbarbg({ commit }, navbarbg){
    	commit('SET_NAVBARBG', navbarbg)
    },
    setSidebarbg({ commit }, sidebarbg){
    	commit('SET_SIDEBARBG', sidebarbg)
    },
    setNavbarfixed({ commit }, navbarfixed){
    	commit('SET_NAVBARFIXED', navbarfixed)
    },
  }
}

export default app
