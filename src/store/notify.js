import axios from 'axios'
import loadMore from '../assets/js/loadMore.js'

export default {
  state: {
    messages: [],
    messageMain: [],
  },
  mutations: {
    setMessage(state, payload) {
      state.messages = payload
    },
    setMessageMain(state, payload) {
      state.messageMain = payload
    },
    loadMessages(state, payload) {
      state.messageMain = [...state.messageMain, ...payload]
    }
  },
  actions: {
    async fetchMessages({ commit, dispatch }) {
      commit('setLoading', true)
      commit('clearError')

      try {
        const response = await axios.get('https://tocode.ru/static/_secret/courses/1/notifyApi.php/')
        const res = response.data.notify;

        const messages = res.filter(msq => !msq.main);
        const messagesMain = res.filter(msq => msq.main);

        commit('setMessage', messages)
        commit('setMessageMain', messagesMain);
      } catch(error) {
        console.error(`Error: ${error}`);
        commit('setError', 'Error: Network Error');
      } finally {
        commit('setLoading', false);
      }
    },
    setMessage({ commit }, payload) {
      commit('setMessage', payload)
    },
    setMessageMain({ commit }, payload) {
      commit('setMessageMain', payload)
    },
    loadMessages({ commit, getters }) {
      let res = getters.getMessageFilter
      commit('loadMessages', loadMore(res))
    }
  },
  getters: {
    getMessage(state) {
      return state.messages
    },
    getMessageFilter(state) {
      return state.messages.filter(mes => {
        return mes.main === false
      })
    },
    getMessageMain(state) {
      return state.messageMain
    }
  }
}