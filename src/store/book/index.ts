import goodStorage from 'good-storage'
import { defineStore } from 'pinia'
import { BookInfo } from './state'
import bookApi from '../../api/BookApi'
import { AxiosResponse } from 'axios'
export default defineStore('bookstore', {
  state:() => {
    return {
      bookList: [] as BookInfo[],
    }
  },
  getters: {
    getBookList(state) {
      return state.bookList.length > 0 ? state.bookList : goodStorage.get('bookList')
    }
  },
  actions: {
    async findBooksByThirdCtgyId(thirdCtgyid: number, sortField: string, ascOrDesc: string) {
      const bookList: AxiosResponse<BookInfo[]> = await bookApi.getBookList(thirdCtgyid, sortField, ascOrDesc)
      bookList.data = bookList.data.map((book) => {
        book.discountprice = toFixed_(book.originalprice * book.discount)
        return book
      })
      this.bookList = bookList.data
      goodStorage.set('bookList', this.bookList)
    },
    async findBooksBySecondCtgyId(secondCtgyid: number, sortField: string, ascOrDesc: string) {
      const bookList: AxiosResponse<BookInfo[]> = await bookApi.getAllBookList(secondCtgyid, sortField, ascOrDesc)
      bookList.data = bookList.data.map((book) => {
        book.discountprice = toFixed_(book.originalprice * book.discount)
        return book
      })
      this.bookList = bookList.data
      goodStorage.set('bookList', this.bookList)
    }
  }
})
const toFixed_ = (num: number): number => {
  if (num.toString().indexOf('.') !== -1) {
    return parseFloat(num.toFixed(2))
  }
  return num
}