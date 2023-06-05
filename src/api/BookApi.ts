import request from '../utils/axiosUtil'
class BookApi {
  static api: BookApi = new BookApi()
  getBookList(thirdCtgyId: number) {
    return request.get(`/booksmodule/findBooksByThirdCtgyId/${thirdCtgyId}`, false)
  }
  getAllBookList(secondctgyid: number) {
    return request.get(`/booksmodule/findBooksBySecondCtgyId/${secondctgyid}`, false)
  }
}
export default BookApi.api