import store from '../index'
const ctgyGettersTarget = {
  getFirstCtgyList: [],
  getSecondCtgyList: []
}
const ctgyGettersProxy = new Proxy(ctgyGettersTarget, {
  get(ctgyGettersTarget, key) {
    if (key === 'getFirstCtgyList') {
      return store.getters['ctgyModule/getFirstCtgyList']
    } else if (key === 'getSecondCtgyList') {
      return store.getters['ctgyModule/getSecThrdCtgyList']
    }
  }
})
export { ctgyGettersProxy }