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