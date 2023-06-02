import { ctgyStore } from './../../../store/ctgy/index'
import { Ref, ref, watchEffect } from 'vue'
import { SecondCtgy } from '../../../store/ctgy/state'
import { storeToRefs } from 'pinia'
export default class FstToThrdCtgy {
  static store = ctgyStore()
  static storeRefs = storeToRefs(FstToThrdCtgy.store)
  static firstCtgyActiveIndex: Ref<number> = ref(0)
  static async getFirstCtgys() {
    await FstToThrdCtgy.store.findFirstCtgyList()
  }
  static openOrCollapse(event: Event, secondCtgy: SecondCtgy) {
    const currentTarget = <HTMLBodyElement>event.currentTarget
    const ulPanel = currentTarget.parentElement as HTMLElement
    if (secondCtgy.isReadyOpen) {
      secondCtgy.isReadyOpen = false
      if (secondCtgy.thirdCtgys.length % 3 === 0) {
        ulPanel.style.paddingBottom = 0.5 + 'rem'
      }
    } else {
      secondCtgy.isReadyOpen = true
      ulPanel.style.paddingBottom = '0'
    }
  }
  static changeTab(index: number) {
    FstToThrdCtgy.firstCtgyActiveIndex.value = index
  }
  static getSecThrdCtgyList() {
    watchEffect(async () => {
      await FstToThrdCtgy.store.findSecThrdCtgyList(FstToThrdCtgy.firstCtgyActiveIndex.value + 1)
    })
  }
}