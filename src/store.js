import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activePage: '',
    mediaQuery: ''
  },
  getters: {
    getActivePage: state => {
      return state.activePage
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
