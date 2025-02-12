export default {
  state: {
    error: null
  },
  mutations: {
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    setError({ commit}, error) {
      commit('setError', error)
    },
    clearError({ commit}) {
      commit('clearError')
    }
  },
  getters: {
    getError(state) {
      return state.error
    }
  }
}