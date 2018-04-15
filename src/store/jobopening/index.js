import axios from 'axios'
import constants from '../../Utility/constants'
const BASE_URL = constants.BASE_URL
const MODEL_URL = '/jobopening/'
import {EventBus} from "../../Utility/EventBus";

export default {
  state:{
    loadedJobOpenings:[

    ]
  },
  mutations:{
    createJobOpening(state, payload){
      state.loadedJobOpenings.push(payload)
    },
    setLoadedJobOpenings(state, payload){
      state.loadedJobOpenings = payload
    }
  },
  actions:{
    createJobOpening({commit, getters, dispatch}, payload){
      axios.post(BASE_URL + MODEL_URL, payload)
        .then(response => {
          console.log(response.data)
          dispatch('loadJobOpenings')
        })
        .catch(error => {
          console.log(error)
        })
    },
    loadJobOpenings({commit, getters}){
      axios.get(BASE_URL + MODEL_URL)
        .then(response => {
          commit('setLoadedJobOpenings', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
  getters:{
    loadedJobOpenings(state){
      return state.loadedJobOpenings
    }
  }
}
