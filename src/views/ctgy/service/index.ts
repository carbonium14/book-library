import goodStorage from 'good-storage'
import { ctgyStore } from '../../../store/ctgy/index'
import { Ref, ref, watchEffect, computed } from 'vue'
import { SecondCtgy, ThirdCtgy } from '../../../store/ctgy/state'
import { storeToRefs } from 'pinia'
import router from '../../../router/index'
import Books from '../../books/service/index'
export default class FstToThrdCtgy {
  static store = ctgyStore()
  static storeRefs = storeToRefs(FstToThrdCtgy.store)
  static firstCtgyActiveIndex: Ref<number> = ref(0)
  static async getFirstCtgys() {
    await FstToThrdCtgy.store.findFirstCtgyList()
    FstToThrdCtgy.storeFirstCtgy(1)
  }
  static storeFirstCtgy(index: number) {
    const firstCtgy = FstToThrdCtgy.store.firstCtgyList.find((firstCtgy) => {
      return firstCtgy.firstCtgyId === index
    })!
    FstToThrdCtgy.store.storeFirstCtgy(firstCtgy)
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
    FstToThrdCtgy.storeFirstCtgy(index + 1)
  }
  static getSecThrdCtgyList() {
    watchEffect(async () => {
      await FstToThrdCtgy.store.findSecThrdCtgyList(FstToThrdCtgy.firstCtgyActiveIndex.value + 1)
    })
  }
  static toBookInfo(thirdCtgy: ThirdCtgy, secondCtgy: SecondCtgy) {
    FstToThrdCtgy.store.storeThirdCtgy(thirdCtgy)
    FstToThrdCtgy.store.storeSecondCtgy(secondCtgy)
    FstToThrdCtgy.store.storeThirdCtgyList(secondCtgy.thirdCtgys)
    FstToThrdCtgy.store.storeSubThirdCtgyList(secondCtgy.subThirdCtgys)
    FstToThrdCtgy.store.storeIsReadyOpen(secondCtgy.isReadyOpen)
    FstToThrdCtgy.store.storeSwitchThrdCtgyIndex(thirdCtgy.thirdCtgyId)
    router.push({
      name: 'books'
    })
  }
  static back() {
    router.back()
  }
  static openOrCollapseInBook(isReadyOpen: boolean) {
    FstToThrdCtgy.store.isReadyOpen = isReadyOpen
  }
  static async changeThrdCtgyIndex(thrdCtgyActiveIndex: number) {
    FstToThrdCtgy.store.storeSwitchThrdCtgyIndex(thrdCtgyActiveIndex)
    const sortField = goodStorage.get('sortField') || 'ISBN'
    const ascOrDesc = goodStorage.get('ascOrDesc') || 'asc'
    if (thrdCtgyActiveIndex === -1) {
      await Books.store.findBooksBySecondCtgyId(FstToThrdCtgy.store.getSecondCtgy.secondCtgyId, sortField, ascOrDesc)
    } else {
      const thirdCtgy = FstToThrdCtgy.store.getThirdCtgyList.find((thirdCtgy) => thirdCtgy.thirdCtgyId === thrdCtgyActiveIndex)!
      FstToThrdCtgy.store.storeThirdCtgy(thirdCtgy)
      await Books.store.findBooksByThirdCtgyId(thrdCtgyActiveIndex, sortField, ascOrDesc)
    }
    Books.uptBookNumWithSCLstNum()
  }
  static changeTabWithClick() {
    return computed(() => {
      const newThirdCtgyList = FstToThrdCtgy.store.isReadyOpen ? FstToThrdCtgy.store.getSubThirdCtgyList : FstToThrdCtgy.store.getThirdCtgyList
      if (FstToThrdCtgy.store.getSwitchThrdCtgyIndex === -1) {
        return newThirdCtgyList
      }
      const currentIndex = newThirdCtgyList.findIndex((ctgy) => ctgy.thirdCtgyId === FstToThrdCtgy.store.getSwitchThrdCtgyIndex)!
      const currentCtgy = newThirdCtgyList[currentIndex]
      return [currentCtgy, ...newThirdCtgyList.slice(0, currentIndex), ...newThirdCtgyList.slice(currentIndex + 1)]
    })
  }
}