import goodStorage from 'good-storage'
import { storeToRefs } from 'pinia'
import FstToThrdCtgy from '../../ctgy/service/index'
import bookStore from '../../../store/book/index'
import { ctgyStore } from '../../../store/ctgy/index'
import Shopcart from './shopcart'
import router from '../../../router/index'
import { Ref, ref } from 'vue'
import { Operate } from '../../../store/book/state'
import { getValArrOfObj } from '../../../utils/goodstorageUtil'
export default class Books {
  static sortField = ref('ISBN')
  static ascOrDesc = ref('desc')
  static isReadyAsc = ref(true)
  static isAutoComSearch = ref(false)
  static isReadyOpen = ref(true)
  static publisherPanelRef: Ref<HTMLBodyElement | undefined> = ref<HTMLBodyElement>()
  static store = bookStore()
  static store_ = ctgyStore()
  static storeRefs = storeToRefs(Books.store)
  static init() {
    Books.getOperate()
    Books.findPublishersByAutoCompKey()
  }
  static async findBooksByThirdCtgyId(sortField: string = 'ISBN', ascOrDesc: string = 'asc') {
    const thirdCtgyId = FstToThrdCtgy.store.getThirdCtgy.thirdCtgyId
    await Books.store.findBooksByThirdCtgyId(thirdCtgyId, sortField, ascOrDesc)
    await Books.shopCartAndUptBkNum()
  }
  static async findBooksBySecondCtgyId(sortField: string = 'ISBN', ascOrDesc: string = 'asc') {
    const secondctgyid = FstToThrdCtgy.store.getSecondCtgy.secondCtgyId
    await Books.store.findBooksBySecondCtgyId(secondctgyid, sortField, ascOrDesc)
    await Books.shopCartAndUptBkNum()
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
  static async shopCartAndUptBkNum() {
    const shopcartlist = Shopcart.store.shopCartList
    if (!shopcartlist || shopcartlist.length === 0) {
      await Shopcart.findCurUseShopCartLst()
    }
    Books.uptBookNumWithSCLstNum()
  }
  static updateBookNum(bookNum: number, curbookisbn?: string) {
    const bookList = Books.store.getBookList
    for (let i = 0; i < bookList.length; i++) {
      if (curbookisbn && curbookisbn === bookList[i].ISBN) {
        bookList[i].purcharsenum = bookNum
        break
      }
    }
    return bookList
  }
  static initBookNum() {
    const bookList = Books.store.getBookList
    for (let i = 0; i < bookList.length; i++) {
      bookList[i].purcharsenum = 0
    }
    return bookList
  }
  static uptBookNumWithSCLstNum() {
    Shopcart.uptBookNumWithSCLstNum(Books.initBookNum())
  }
  static searchBooks() {
    const operate = Books.store.getOperate
    if (operate === Operate.THRDCTGYID) {
      Books.findBooksByThirdCtgyId()
    } else if (operate === Operate.SECCTGYID) {
      Books.findBooksBySecondCtgyId()
    } else if (operate === Operate.AUTOCOMPKEYWORD) {
      Books.findBookByAutoCompKeyword()
    }
  }
  static async findBookByAutoCompKeyword() {
    const autoCompKeyword = Books.store.getAutoCompKeyword
    await Books.store.findBooksByAutoCompKeyword(autoCompKeyword)
    await Books.shopCartAndUptBkNum()
    Books.store_.storeSwitchThrdCtgyIndex(-1)
  }
  static getOperate() {
    Books.isAutoComSearch.value = Books.store.getOperate === Operate.AUTOCOMPKEYWORD
  }
  static async findPublishersByAutoCompKey() {
    if (Books.store.getOperate === Operate.AUTOCOMPKEYWORD) {
      await Books.store.findPublishersByAutoCompKey()
    }
  }
  static controlPanel(ctrlShopCart: (isShow: boolean) => void) {
    Books.isReadyOpen.value = !Books.isReadyOpen.value
    const publisherPanel = Books.publisherPanelRef.value!
    if (publisherPanel.className === 'publisher-panel') {
      publisherPanel.className = 'publisher-panel-show'
      ctrlShopCart(false)
    } else {
      publisherPanel.className = 'publisher-panel'
      ctrlShopCart(true)
    }
    if (publisherPanel.className === 'publisher-panel') {
      document.documentElement.style.overflowY = 'scroll'
    } else {
      document.documentElement.style.overflowY = 'hidden'
    }
  }
  static async findBksByPublishIds(ctrlShopCart: (isShow: boolean) => void) {
    const publishids = getValArrOfObj(Books.store.curPublisherList, 'publishid')
    await Books.store.findBksByPublishIds(publishids)
    Books.publisherPanelRef.value!.className = 'publisher-panel'
    ctrlShopCart(true)
  }
  static selectPublish(publish: { publishid: number, publishername: string }) {
    const curPublisherList = Books.store.getCurPublisherList
    const curPublishIndex = curPublisherList.findIndex((curPublisher) => {
      if (curPublisher.publishid === publish.publishid) {
        return true
      }
    })
    if (curPublishIndex === -1) {
      curPublisherList.push(publish)
    } else {
      curPublisherList.splice(curPublishIndex, 1)
    }
    Books.store.storeCurPublisherList(curPublisherList)
  }
  static resetPublishList() {
    Books.store.storeCurPublisherList([])
  }
}