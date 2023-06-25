import { Reply } from '../store/evaluate/state'
import request from '../utils/axiosUtil'
class ReplyApi {
  static api: ReplyApi = new ReplyApi()
  addReply(reply: Reply) {
    return request.post('/replymodule/addReply', false, reply)
  }
}
export default ReplyApi.api