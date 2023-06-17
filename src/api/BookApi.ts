import request from '../utils/axiosUtil'
class BookApi {
  static api: BookApi = new BookApi()
  getBookList(thirdCtgyId: number, sortField: string = 'ISBN', ascOrDesc: string = 'asc') {
    return request.get(`/booksmodule/findBooksByThirdCtgyId/${thirdCtgyId}/${sortField}/${ascOrDesc}`, false)
  }
  getAllBookList(secondctgyid: number, sortField: string = 'ISBN', ascOrDesc: string = 'asc') {
    return request.get(`/booksmodule/findBooksBySecondCtgyId/${secondctgyid}/${sortField}/${ascOrDesc}`, false)
  }
  findBooksByAutoCompKeyword(autoCompKeyword: string) {
    return request.get(`/booksmodule/findBooksByAutoCompKeyword/${autoCompKeyword}`, false)
  }
  findPublishersByAutoCompKey(autoCompKeyword: string) {
    return request.get(`/booksmodule/findPublishersByAutoCompKey/${autoCompKeyword}`, false)
  }
  findBksByPublishIds(publishids: number[]) {
    return request.post(`/booksmodule/findBksByPublishIds`, false, publishids)
  }
}
export default BookApi.api