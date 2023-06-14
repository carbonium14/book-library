import { storeToRefs } from 'pinia'
import { Ref, ref } from 'vue'
import router from '../../../router/index'
import searchStore, { initKeywordVal } from '../../../store/search/index'
export default class Search {
  static isOpenAutoComplete: Ref<boolean> = ref(false)
  static store = searchStore()
  static storeRefs = storeToRefs(Search.store)
  static back() {
    router.back()
  }
  static getKeywordFromStore() {
    return Search.store.keyword
  }
  static showOrCloseAutoComplete(flag: boolean) {
    Search.isOpenAutoComplete.value = flag
  }
  static async init() {
    if (Search.store.getHistoryList.length === 0) {
      await Search.store.searchHistoryKeywordObjList()
    }
    await Search.store.searchDescovery()
  }
  static searchKeywords = debounce(async () => {
    const key = Search.getKeywordFromStore()
    if (!key) {
      Search.showOrCloseAutoComplete(false)
    } else {
      await Search.store.searchKeyword(key)
      Search.showOrCloseAutoComplete(true)
    }
  }, 400)
  static closeKeywords() {
    if (!Search.getKeywordFromStore()) {
      Search.store.storeKeyword(initKeywordVal)
    }
    Search.showOrCloseAutoComplete(false)
  }
  static resetKeywords() {
    if (Search.getKeywordFromStore() === initKeywordVal) {
      Search.store.storeKeyword('')
    } else {
      Search.showOrCloseAutoComplete(true)
    }
  }
  static async searchBooksByKey(historykeyword: string) {
    await Search.store.addOrUpdateHistoryKeyword(historykeyword)
    Search.showOrCloseAutoComplete(false)
  }
  static async deleteHistory() {
    await Search.store.deleteHistoryKeywords()
  }
  static async deleteDescovery() {
    await Search.store.deleteDescovery()
    await Search.init()
  }
}
type CommonFunction = (...args: any) => any
function debounce<T extends CommonFunction>(fn: T, wait: number = 200) {
  let timer: any = null
  return function() {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn()
      timer = null
    }, wait)
  }
}