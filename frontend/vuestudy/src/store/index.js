import Vue from 'vue'
import Vuex from 'vuex'
import User from './models/user'

// Load Vuex
Vue.use(Vuex)

// Create Store
export default new Vuex.Store({
  modules: {
    User
  }
})
