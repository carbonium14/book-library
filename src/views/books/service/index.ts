import { storeToRefs } from 'pinia'
import FstToThrdCtgy from '../../ctgy/service/index'
import bookStore from '../../../store/book/index'
import router from '../../../router/index'
export default class Books {
  static store = bookStore()
  static storeRefs = storeToRefs(Books.store)
  static findBooksByThirdCtgyId() {
    const thirdCtgyId = FstToThrdCtgy.store.getThirdCtgy.thirdCtgyId
    Books.store.findBooksByThirdCtgyId(thirdCtgyId)
  }
  static findBooksBySecondCtgyId() {
    const secondctgyid = FstToThrdCtgy.store.getSecondCtgy.secondCtgyId
    Books.store.findBooksBySecondCtgyId(secondctgyid)
  }
}