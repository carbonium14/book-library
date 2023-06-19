import { reactive, toRefs } from 'vue'
import userStore from '../../../store/userinfo/index'
import storage from '../../../utils/goodstorageUtil'
import router from '../../../router/index'
export default class UserInfo {
  static store = userStore()
  static usernameAndPsw = reactive({
    username: '',
    psw: ''
  })
  static username = toRefs(UserInfo.usernameAndPsw).username
  static psw = toRefs(UserInfo.usernameAndPsw).psw
  static async login() {
    await UserInfo.store.login(UserInfo.username.value, UserInfo.psw.value)
    if (storage.get('token')) {
      router.push({
        path: 'ctgy'
      })
    }
  }
}