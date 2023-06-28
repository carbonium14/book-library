import { defineStore } from 'pinia'
import { BookInfo, CurPageDataType } from './state'
import bookApi from '../../api/BookApi'
import { AxiosResponse } from 'axios'
import { Operate, InitStateType, Publisher } from './state'
import storage from '../../utils/goodstorageUtil'
import searchStore from '../search/index'
function hasProps(obj: Record<string, any>) {
  return Boolean(Object.getOwnPropertyNames(obj).length)
}
export default defineStore('bookstore', {
  state:(): InitStateType => {
    return {
      bookList: [],
      operate: Operate.INIT,
      publisherList: [],
      curPublisherList: [],
      bookDetail: {} as BookInfo,
      ISBN: '',
      curPageAllData: {
        curPageNo: 0,
        curPageDataList: [],
        totalPageNum: 0
      },
      headerRef: undefined,
      headerHeight: 0,
      headerOpacity: {
        opacity: 1
      }
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
    },
    getBookDetail(state): BookInfo {
      return hasProps(state.bookDetail) ? state.bookDetail : storage.get('bookDetail')
    },
    getISBN(state) {
      return state.ISBN.length > 0 ? state.ISBN : storage.get('ISBN')
    },
    isLastPage(state) {
      return state.curPageAllData.curPageNo === state.curPageAllData.totalPageNum
    },
    getCurPageData(state): CurPageDataType {
      return state.curPageAllData
    },
    getCurPageBookList(state): BookInfo[] {
      return state.curPageAllData.curPageDataList
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
    },
    async findBookDetailsByISBN() {
      const bookDetail: AxiosResponse<BookInfo> = await bookApi.findBookDetailsByISBN(this.getISBN)
      bookDetail.data.discountprice = toFixed_(bookDetail.data.originalprice * bookDetail.data.discount)
      this.bookDetail = bookDetail.data
      storage.set('bookDetail', bookDetail.data)
    },
    storeISBN(ISBN: string) {
      this.ISBN = ISBN
      storage.set('ISBN', ISBN)
    },
    async findBookLstWithPager() {
      if (!this.curPageAllData.curPageNo || this.curPageAllData.curPageNo < this.curPageAllData.totalPageNum) {
        this.curPageAllData.curPageNo += 1
        const curPageData: AxiosResponse<CurPageDataType> = await bookApi.findBookLstWithPager(this.curPageAllData.curPageNo)
        if (this.curPageAllData.curPageDataList.length === 0) {
          this.curPageAllData = curPageData.data
        } else {
          const { curPageNo, totalPageNum } = curPageData.data
          this.curPageAllData.curPageDataList.push(...curPageData.data.curPageDataList)
          Object.assign(this.curPageAllData, { curPageNo, totalPageNum })
        }
        this.curPageAllData.curPageDataList= calBookPrice(this.curPageAllData.curPageDataList)
      }
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