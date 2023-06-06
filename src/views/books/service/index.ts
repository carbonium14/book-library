import goodStorage from 'good-storage'
import { storeToRefs } from 'pinia'
import FstToThrdCtgy from '../../ctgy/service/index'
import bookStore from '../../../store/book/index'
import { ctgyStore } from '../../../store/ctgy/index'
import router from '../../../router/index'
import { ref } from 'vue'
export default class Books {
  static sortField = ref('ISBN')
  static ascOrDesc = ref('desc')
  static isReadyAsc = ref(true)
  static store = bookStore()
  static store_ = ctgyStore()
  static storeRefs = storeToRefs(Books.store)
  static findBooksByThirdCtgyId(sortField: string = 'ISBN', ascOrDesc: string = 'asc') {
    const thirdCtgyId = FstToThrdCtgy.store.getThirdCtgy.thirdCtgyId
    Books.store.findBooksByThirdCtgyId(thirdCtgyId, sortField, ascOrDesc)
  }
  static findBooksBySecondCtgyId(sortField: string = 'ISBN', ascOrDesc: string = 'asc') {
    const secondctgyid = FstToThrdCtgy.store.getSecondCtgy.secondCtgyId
    Books.store.findBooksBySecondCtgyId(secondctgyid, sortField, ascOrDesc)
  }
  static sortBook(sortField: string) {
    Books.sortField.value = sortField
    if (sortField === 'originalprice') {
      Books.isReadyAsc.value = !Books.isReadyAsc.value
    }
    Books.ascOrDesc.value = Books.ascOrDesc.value === 'desc' ? 'asc' : 'desc'
    goodStorage.set('sortField', Books.sortField.value)
    goodStorage.set('ascOrDesc', Books.ascOrDesc.value)
    if (Books.store_.getSwitchThrdCtgyIndex !== -1) {
      Books.findBooksByThirdCtgyId(sortField, Books.ascOrDesc.value)
    } else {
      Books.findBooksBySecondCtgyId(sortField, Books.ascOrDesc.value)
    }
  }
}