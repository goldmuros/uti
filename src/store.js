import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    patients: [],
    user: {
      role: 'doctor',
      name: 'Bel'
    },
    activePage: '',
    mediaQuery: ''
  },
  getters: {
    getActivePage: state => {
      return state.activePage
    },
    getUser: state => {
      return state.user
    }
  },
  mutations: {
    setMediaQuery (state, mediaQuery) {
      state.mediaQuery = mediaQuery
    }
  },
  actions: {

  }
})
