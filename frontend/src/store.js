import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function initialState() {
  return {
    user: null
  }
}

export default new Vuex.Store({
  state: {
    user: initialState
  },
  mutations: {
    reset(state) {
      const s = initialState()
      Object.keys(s).forEach(key => {
        state[key] = s[key]
      })
    }
  },
  actions: {

  }
})