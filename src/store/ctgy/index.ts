import { CtgyState, FirstCtgy, SecondCtgy } from './state'
import ctgyApi from '../../api/CtgyApi'
import { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
export const ctgyStore = defineStore('ctgyStore', {
  state: (): CtgyState => {
    return {
      firstCtgyList: [],
      secondCtgyList: []
    }
  },
  getters: {
    getFirstCtgyList(state) {
      return state.firstCtgyList
    },
    getSecThrdCtgyList(state) {
      return state.secondCtgyList
    }
  },
  actions: {
    async findFirstCtgyList() {
      const result: AxiosResponse<FirstCtgy[]> = await ctgyApi.getFirstCtgyList()
      this.firstCtgyList = result.data
    },
    async findSecThrdCtgyList(firstCtgyId: number) {
      const result: AxiosResponse<SecondCtgy[]> = await ctgyApi.getSecThrdCtgyList(firstCtgyId)
      result.data = result.data.map((secondctgy) => {
        secondctgy.isReadyOpen = true
        secondctgy.subThirdCtgys = secondctgy.thirdCtgys.slice(0, 5)
        return secondctgy
      })
      this.secondCtgyList = result.data
    }
  }
})