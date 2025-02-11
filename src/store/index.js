import { createStore } from "vuex";
import notify from "./notify";
// import Users from './Users'

export const store = createStore({
  modules: {
    notify
  }
})