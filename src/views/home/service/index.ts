import { storeToRefs } from 'pinia'
import bookStore from '../../../store/book/index'
import { trimStr } from '../../../utils/stringUtil'
import Bottom from '../../common/index'
import router from '../../../router/index'
export default class Home {
  static store = bookStore()
  static storeToRefs = storeToRefs(Home.store)
  static init() {
    Home.store.headerHeight = Home.store.headerRef!.offsetHeight
  }
  static async findBookLstWithPager() {
    await Home.store.findBookLstWithPager()
  }
  static getScrollTop() {
    return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
  }
  static getClientHeight() {
    return document.documentElement.clientHeight || document.body.clientHeight
  }
  static getFullHeight() {
    return document.documentElement.scrollHeight || document.body.scrollHeight
  }
  static controlScrlOrHid(scrollMode: string) {
    document.documentElement.style.overflowY = scrollMode
    document.body.style.overflowY = scrollMode
  }
  static async pageScroll() {
    const scrollTop = Home.getScrollTop()
    const clientHeight = Home.getClientHeight()
    const fullHeight = Home.getFullHeight()
    if (scrollTop >= fullHeight - clientHeight - 20) {
      Home.controlScrlOrHid('hidden')
      await Home.findBookLstWithPager()
      Home.controlScrlOrHid('scroll')
    }
  }
  static headerScroll() {
    const scrollTop = Home.getScrollTop()
    if (scrollTop >= 0 && scrollTop <= Home.store.headerHeight - 30) {
      Home.store.headerRef!.style.display = 'block'
      Home.store.headerOpacity.opacity = 1 - scrollTop / Home.store.headerHeight
    } else {
      Home.store.headerRef!.style.display = 'none'
    }
  }
  static scrollHandler() {
    Home.headerScroll()
    Home.pageScroll()
  }
  static toCtgy() {
    Bottom.change(1)
    router.push({
      path: 'ctgy'
    })
  }
}
export { trimStr }