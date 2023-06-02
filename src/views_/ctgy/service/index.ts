import { CtgyActions } from '../../../store/actions'
import { ctgyGettersProxy } from '../../../store/getters'
import { Ref, ref, watchEffect } from 'vue'
import { FirstCtgy, SecondCtgy } from '../../../store/ctgy/state'
export default class FstToThrdCtgy {
  static firstCtgyActiveIndex: Ref<number> = ref(0)
  static firstCtgyList: Ref<FirstCtgy[]> = ref([])
  static async getFirstCtgys() {
    await CtgyActions.findFirstCtgyList()
    FstToThrdCtgy.firstCtgyList.value = ctgyGettersProxy.getFirstCtgyList 
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
  static secondCtgyList: Ref<SecondCtgy[]> = ref([])
  static getSecThrdCtgyList() {
    watchEffect(async () => {
      await CtgyActions.findSecThrdCtgyList(FstToThrdCtgy.firstCtgyActiveIndex.value + 1)
      FstToThrdCtgy.secondCtgyList.value = ctgyGettersProxy.getSecondCtgyList
    })
  }
}