import request from '../utils/axiosUtil'
class BookApi {
  static api: BookApi = new BookApi()
  getBookList(thirdCtgyId: number, sortField: string = 'ISBN', ascOrDesc: string = 'asc') {
    return request.get(`/booksmodule/findBooksByThirdCtgyId/${thirdCtgyId}/${sortField}/${ascOrDesc}`, false)
  }
  getAllBookList(secondctgyid: number, sortField: string = 'ISBN', ascOrDesc: string = 'asc') {
    return request.get(`/booksmodule/findBooksBySecondCtgyId/${secondctgyid}/${sortField}/${ascOrDesc}`, false)
  }
}
export default BookApi.api