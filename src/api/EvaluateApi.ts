import request from '../utils/axiosUtil'
class EvaluateApi {
  static api: EvaluateApi = new EvaluateApi()
  findEvalReplyLst(isbn: string) {
    return request.get(`/evaluatemodule/findEvalReplyLst/${isbn}`, false)
  }
}
export default EvaluateApi.api