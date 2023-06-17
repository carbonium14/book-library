import { defineStore } from 'pinia'
import { BookInfo } from './state'
import bookApi from '../../api/BookApi'
import { AxiosResponse } from 'axios'
import { Operate, InitStateType, Publisher } from './state'
import storage from '../../utils/goodstorageUtil'
import searchStore from '../search/index'
export default defineStore('bookstore', {
  state:(): InitStateType => {
    return {
      bookList: [],
      operate: Operate.INIT,
      publisherList: [],
      curPublisherList: [],
    }
  },
  getters: {
    getBookList(state): BookInfo[] {
      return state.bookList.length > 0 ? state.bookList : storage.get('bookList')
    },
    getOperate(state) {
      return state.operate || storage.get('operate')
    },
    getAutoCompKeyword() {
      return searchStore().getAutoCompKeyword
    },
    getCurPublisherList(state): Publisher[] {
      return state.curPublisherList
    }
  },
  actions: {
    async findBooksByThirdCtgyId(thirdCtgyid: number, sortField: string, ascOrDesc: string) {
      const bookList: AxiosResponse<BookInfo[]> = await bookApi.getBookList(thirdCtgyid, sortField, ascOrDesc)
      bookList.data = calBookPrice(bookList.data)
      this.bookList = bookList.data
      storage.set('bookList', this.bookList)
    },
    async findBooksBySecondCtgyId(secondCtgyid: number, sortField: string, ascOrDesc: string) {
      const bookList: AxiosResponse<BookInfo[]> = await bookApi.getAllBookList(secondCtgyid, sortField, ascOrDesc)
      bookList.data = calBookPrice(bookList.data)
      this.bookList = bookList.data
      storage.set('bookList', this.bookList)
    },
    storeOperate(operate: Operate) {
      this.operate = operate
      storage.set('operate', this.operate)
    },
    async findBooksByAutoCompKeyword(autoCompKeyword: string) {
      const bookList: AxiosResponse<BookInfo[]> = await bookApi.findBooksByAutoCompKeyword(autoCompKeyword)
      bookList.data = calBookPrice(bookList.data)
      this.bookList = bookList.data
      storage.set('bookList', bookList.data)
    },
    async findPublishersByAutoCompKey() {
      const publisherList: AxiosResponse<Publisher[]> = await bookApi.findPublishersByAutoCompKey(this.getAutoCompKeyword)
      this.publisherList = publisherList.data
      this.curPublisherList = publisherList.data
    },
    async findBksByPublishIds(publishids: number[]) {
      const bookList: AxiosResponse<BookInfo[]> = await bookApi.findBksByPublishIds(publishids)
      bookList.data = calBookPrice(bookList.data)
      this.bookList = bookList.data
      storage.set('bookList', this.bookList)
    },
    storeCurPublisherList(curPublisherList: Publisher[]) {
      this.curPublisherList = curPublisherList
    }
  }
})
const toFixed_ = (num: number): number => {
  if (num.toString().indexOf('.') !== -1) {
    return parseFloat(num.toFixed(2))
  }
  return num
}
const calBookPrice = (bookList: BookInfo[]) => {
  return bookList.map((book) => {
    book.discountprice = toFixed_(book.originalprice * book.discount)
    return book
  })
}