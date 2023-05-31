import goodStorage from 'good-storage'
import { Module } from 'vuex'
import { CtgyState, FirstCtgy, SecondCtgy, initCtgyState } from './state'
import ctgyApi from '../../api/CtgyApi'
export const ctgyModule: Module<CtgyState, {}> = {
  namespaced: true,
  state: initCtgyState,
  getters: {
    getFirstCtgyList(state) {
      return state.firstCtgyList
    },
    getSecThrdCtgyList(state) {
      return state.secondCtgyList
    }
  },
  mutations: {
    storeFirstCtgyList(state, firstCtgyList: FirstCtgy[]) {
      state.firstCtgyList = firstCtgyList
    },
    storeSecondCtgyList(state, secondCtgyList: SecondCtgy[]) {
      goodStorage.set('secondCtgyList', secondCtgyList)
      state.secondCtgyList = secondCtgyList
    }
  },
  actions: {
    async findFirstCtgyList({ commit }) {
      const result = await ctgyApi.getFirstCtgyList()
      commit('storeFirstCtgyList', result.data)
    },
    async findSecThrdCtgyList({ commit }, firstCtgyId: number) {
      const result = await ctgyApi.getSecThrdCtgyList(firstCtgyId)
      commit('storeSecondCtgyList', result.data)
    }
  }
}