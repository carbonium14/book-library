import request from '../utils/axiosUtil'
import { Userinfo } from '../store/userinfo/state'
class UserApi {
  static api: UserApi = new UserApi()
  login(userinfo: Userinfo) {
    return request.post('/usermodule/login', false, userinfo)
  }
}
export default UserApi.api