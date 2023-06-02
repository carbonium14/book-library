import goodStorage from 'good-storage'
import { Module } from 'vuex'
import { CtgyState, FirstCtgy, SecondCtgy, initCtgyState } from './state'
import ctgyApi from '../../api/CtgyApi'
import { AxiosResponse } from 'axios'
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
      const result: AxiosResponse<SecondCtgy[]> = await ctgyApi.getSecThrdCtgyList(firstCtgyId)
      result.data = result.data.map((secondctgy) => {
        secondctgy.isReadyOpen = true
        secondctgy.subThirdCtgys = secondctgy.thirdCtgys.slice(0, 5)
        return secondctgy
      })
      commit('storeSecondCtgyList', result.data)
    }
  }
}