import goodStorage from 'good-storage'
import { FirstCtgy, SecondCtgy, ThirdCtgy } from './state'
import ctgyApi from '../../api/CtgyApi'
import { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
function hasProps(obj: Record<string, any>) {
  return Boolean(Object.getOwnPropertyNames(obj).length)
}
export const ctgyStore = defineStore('ctgyStore', {
  state: () => {
    return {
      firstCtgyList: [] as FirstCtgy[],
      secondCtgyList: [] as SecondCtgy[],
      thirdCtgy: {} as ThirdCtgy,
      firstCtgy: {} as FirstCtgy,
      secondCtgy: {} as SecondCtgy,
      thirdCtgyList: [] as ThirdCtgy[],
      subThirdCtgyList: [] as ThirdCtgy[],
      isReadyOpen: true,
      switchThrdCtgyIndex: -2
    }
  },
  getters: {
    getFirstCtgyList(state) {
      return state.firstCtgyList
    },
    getSecThrdCtgyList(state) {
      return state.secondCtgyList
    },
    getSubThirdCtgyList(state): ThirdCtgy[] {
      return state.subThirdCtgyList.length > 0 ? state.subThirdCtgyList : goodStorage.get('subThirdCtgyList')
    },
    getThirdCtgyList(state): ThirdCtgy[] {
      return state.thirdCtgyList.length > 0 ? state.thirdCtgyList : goodStorage.get('thirdCtgyList')
    },
    getThirdCtgy(state): ThirdCtgy {
      return hasProps(state.thirdCtgy) ? state.thirdCtgy : goodStorage.get('thirdCtgy')
    },
    getFirstCtgy(state): FirstCtgy {
      return hasProps(state.firstCtgy) ? state.firstCtgy : goodStorage.get('firstCtgy')
    },
    getSecondCtgy(state): SecondCtgy {
      return hasProps(state.secondCtgy) ? state.secondCtgy : goodStorage.get('secondCtgy')
    },
    getIsReadyOpen(state): boolean {
      return state.isReadyOpen
    },
    getSwitchThrdCtgyIndex(state): number {
      return state.switchThrdCtgyIndex !== -2 ? state.switchThrdCtgyIndex : goodStorage.get('switchThrdCtgyIndex')
    }
  },
  actions: {
    storeSwitchThrdCtgyIndex(switchThrdCtgyIndex: number) {
      goodStorage.set('switchThrdCtgyIndex', switchThrdCtgyIndex)
      this.switchThrdCtgyIndex = switchThrdCtgyIndex
    },
    storeThirdCtgy(thirdCtgy: ThirdCtgy) {
      goodStorage.set('thirdCtgy', thirdCtgy)
      this.thirdCtgy = thirdCtgy
    },
    storeFirstCtgy(firstCtgy: FirstCtgy) {
      goodStorage.set('firstCtgy', firstCtgy)
      this.firstCtgy = firstCtgy
    },
    storeSecondCtgy(secondCtgy: SecondCtgy) {
      goodStorage.set('secondCtgy', secondCtgy)
      this.secondCtgy = secondCtgy
    },
    storeThirdCtgyList(thirdCtgyList: ThirdCtgy[]) {
      goodStorage.set('thirdCtgyList', thirdCtgyList)
      this.thirdCtgyList = thirdCtgyList
    },
    storeSubThirdCtgyList(subThirdCtgyList: ThirdCtgy[]) {
      goodStorage.set('subThirdCtgyList', subThirdCtgyList)
      this.subThirdCtgyList = subThirdCtgyList
    },
    storeIsReadyOpen(isReadyOpen: boolean) {
      this.isReadyOpen = isReadyOpen
    },
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