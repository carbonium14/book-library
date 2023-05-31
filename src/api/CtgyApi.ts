import request from '../utils/axiosUtil'
class CtgyApi {
  static api: CtgyApi = new CtgyApi()
  getFirstCtgyList() {
    return request.get('/ctgymodule/findFirstCtgys', false)
  }
  getSecThrdCtgyList(firstCtgyId: number) {
    return request.get(`/ctgymodule/findSecThrdCtgys/${firstCtgyId}`, false)
  }
}
export default CtgyApi.api