import request from '../utils/axiosUtil'
class SearchApi {
  static api: SearchApi = new SearchApi()
  searchKeywords(key: string) {
    return request.get(`/searchmodule/searchKeywords/${key}`, false)
  }
  addOrUpdateHistoryKeyword(historykeyword: string) {
    return request.post(`/searchmodule/addOrUpdateHistoryKeyword`, false, {
      historykeyword
    })
  }
  searchDescovery() {
    return request.get('/searchmodule/searchDescovery', false)
  }
  searchHistoryKeywordObjList() {
    return request.get('/searchmodule/searchHistoryKeywordObjList', false)
  }
  deleteDescovery() {
    return request.get('/searchmodule/deleteDescovery', false)
  }
  deleteHistoryKeywords() {
    return request.get('/searchmodule/deleteHistoryKeywords', false)
  }
}
export default SearchApi.api