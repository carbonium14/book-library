import { defineStore } from 'pinia'
import storage from '../../utils/goodstorageUtil'
import { Userinfo } from './state'
import UserApi from '../../api/UserApi'
import { AxiosResponse } from 'axios'
function hasProps(obj: Record<string, any>) {
  return Boolean(Object.getOwnPropertyNames(obj).length)
}
export default defineStore('userstore', {
  state: () => {
    return {
      userinfo: {} as Userinfo
    }
  },
  getters: {
    getLoginUser(state) {
      return hasProps(state.userinfo) ? state.userinfo : storage.get('loginUser')
    }
  },
  actions: {
    async login(username: string, psw: string) {
      const loginUser = {
        username,
        psw
      } as Userinfo
      const userinfo: AxiosResponse<Userinfo> = await UserApi.login(loginUser)
      this.userinfo = userinfo.data
      storage.set('token', userinfo.data.token)
      storage.set('loginUser', userinfo.data)
    }
  }
})