import { createStore } from "vuex";
import notify from "./notify";
import error from "./error"
import loading from "./loading"
// import Users from './Users'

export const store = createStore({
  modules: {
    notify, 
    error,
    loading
  }
})