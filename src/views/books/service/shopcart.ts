import { ShopCart } from '../../../store/shopcart/state'
import { BookInfo } from '../../../store/book/state'
import shopCartStore from '../../../store/shopcart/index'
import { storeToRefs } from 'pinia'
import Books from './index'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Ref, computed, ref } from 'vue'
import router from '../../../router/index'
import storage from '../../../utils/goodstorageUtil'
import Bottom from '../../common/index'
import { Userinfo } from '../../../store/userinfo/state'
type BallType = {
  showorhidden: boolean,
  curTarget?: EventTarget | null
}
export default class Shopcart {
  static store = shopCartStore()
  static storeRefs = storeToRefs(Shopcart.store)
  static ball: Ref<BallType> = ref({
    showorhidden: false, 
  })
  static isSelectAll = ref(true)
  static isShow = ref(true)
  static async init() {
    if (Shopcart.store.shopCartList.length === 0) {
      await Shopcart.findCurUseShopCartLst()
    }
  }
  static beforeDrop(ele: Element) {
    const curBallEle = ele as HTMLBodyElement
    const addBtnEle = <HTMLBodyElement>Shopcart.ball.value.curTarget
    const addBtnEleRect = addBtnEle.getBoundingClientRect()
    const x = addBtnEleRect.left - 35
    const y = -1 * (window.innerHeight - addBtnEleRect.top - 22)
    curBallEle.style.transform = `translate3d(0,${y}px,0)`
    const inner = <HTMLBodyElement>curBallEle.getElementsByClassName('inner')[0]
    inner.style.transform = `translate3d(${x}px,0,0)`
  }
  static dropping(ele: Element, done: (...args: any) => any) {
    document.body.scrollHeight
    const curBallEle = ele as HTMLBodyElement
    curBallEle.style.transform = 'translate3d(0,0,0)'
    const inner = <HTMLBodyElement>curBallEle.getElementsByClassName('inner')[0]
    inner.style.transform = 'translate3d(0,0,0)'
    done()
  }
  static afterDrop(ele: Element) {
    Shopcart.ball.value.showorhidden = false
    Shopcart.ball.value.curTarget = undefined
  }
  static drop(event: Event) {
    Shopcart.ball.value.showorhidden = true
    Shopcart.ball.value.curTarget = event.currentTarget
  }
  static async findCurUseShopCartLst() {
    await Shopcart.store.findCurUseShopCartLst(storage.get<Userinfo>('loginUser').userid)
  }
  static uptBookNumWithSCLstNum(books: BookInfo[]) {
    const shopcartList = Shopcart.store.getShopCartList
    shopcartList.forEach((shopcart) => {
      books.forEach((book) => {
        if (shopcart.bookisbn === book.ISBN) {
          book.purcharsenum = shopcart.purcharsenum
        }
      })
    })
  }
  static async addBookToShopCart(bookinfo: BookInfo) {
    const shopcart: ShopCart = {
      userid: storage.get<Userinfo>('loginUser').userid,
      checked: true,
      bookisbn: bookinfo.ISBN,
      bookname: bookinfo.bookname,
      bookpicname: bookinfo.bookpicname,
      bookprice: procDecimalZero(bookinfo.originalprice * bookinfo.discount),
      purcharsenum: 1
    }
    await Shopcart.store.addBookToShopCart(shopcart)
    Books.updateBookNum(1, bookinfo.ISBN)
  }
  static getExistsShopCartID(bookinfo: BookInfo) {
    const shopCartList = Shopcart.store.getShopCartList
    let shopcart: ShopCart
    let shopcartid: number = 0
    for (let i = 0; i < shopCartList.length; i++) {
      shopcart = shopCartList[i]
      if (bookinfo.ISBN === shopcart.bookisbn) {
        shopcartid = shopcart.shopcartid!
        break
      }
    }
    return shopcartid
  }
  static async appOrSubtrBookFrmShopCart(bookinfo: BookInfo, event: Event) {
    const curShopCartID = Shopcart.getExistsShopCartID(bookinfo)
    const curtarget = <HTMLBodyElement>event.currentTarget
    const className = curtarget.className
    let purcharsenum: number = 0
    if (className === 'shopcart-operate-add') {
      purcharsenum = bookinfo.purcharsenum + 1
      Shopcart.drop(event)
    } else if (className === 'shopcart-operate-minus') {
      purcharsenum = bookinfo.purcharsenum - 1
    }
    const shopcart: ShopCart = {
      userid: storage.get<Userinfo>('loginUser').userid,
      checked: true,
      shopcartid: curShopCartID,
      bookisbn: bookinfo.ISBN,
      bookname: bookinfo.bookname,
      bookpicname: bookinfo.bookpicname,
      bookprice: procDecimalZero(bookinfo.originalprice * bookinfo.discount),
      purcharsenum
    }
    await Shopcart.store.appOrSubtrBookFrmShopCart(shopcart)
    Books.updateBookNum(purcharsenum, bookinfo.ISBN)
  }
  static async delCurBookFrmSC(bookinfo: BookInfo) {
    ElMessageBox.confirm('确定从购物车删除这本书?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '再想想',
      type: 'warning',
      center: true
    }).then(async () => {
      const curShopCartID = Shopcart.getExistsShopCartID(bookinfo)
      await Shopcart.store.delBookFrmSC(curShopCartID)
      Books.updateBookNum(0, bookinfo.ISBN)
      ElMessage.success({
        message: '删除成功'
      })
    }).catch(() => {
      ElMessage.error({
        message: '删除失败'
      })
    })
  }
  static refreshShopCartList() {
    const totalCount = computed(() => {
      let totalCount: number = 0
      const shopCartList = Shopcart.store.getShopCartList
      if (shopCartList?.length > 0) {
        shopCartList.forEach((shopcart) => {
          totalCount += shopcart.purcharsenum
        })
      }
      return totalCount
    })
    const totalPrice = computed(() => {
      let totalPrice: number = 0
      const shopCartList = Shopcart.store.getShopCartList
      if (shopCartList?.length > 0) {
        shopCartList.forEach((shopcart) => {
          totalPrice += shopcart.purcharsenum * shopcart.bookprice
        })
      }
      return procDecimalZero(totalPrice)
    })
    return {
      totalCount,
      totalPrice
    }
  }
  static toShopCartList() {
    Bottom.change(2)
    router.push({
      path: '/shopcartlist'
    })
  }
  static async appOrSubtrBookInShopCart(shopcart: ShopCart, event: Event) {
    const curtarget = <HTMLBodyElement>event.currentTarget
    const className = curtarget.className
    if (className === 'shopcart-operate-add') {
      shopcart.purcharsenum += 1
    } else if (className === 'shopcart-operate-minus') {
      shopcart.purcharsenum -= 1
    }
    await Shopcart.store.appOrSubtrBookFrmShopCart(shopcart)
  }
  static async delCurBookInSC(shopcart: ShopCart) {
    ElMessageBox.confirm('确定从购物车删除这本书?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '再想想',
      type: 'warning',
      center: true
    }).then(async () => {
      await Shopcart.store.delBookFrmSC(shopcart.shopcartid!)
      if (Shopcart.store.getShopCartList.length === 0) {
        Shopcart.isSelectAll.value = false
      }
      ElMessage.success({
        message: '删除成功'
      })
    }).catch(() => {
      ElMessage.error({
        message: '删除失败'
      })
    })
  }
  static back() {
    Bottom.change(1)
    router.back()
  }
  static gotoctgy() {
    router.push({
      path: '/ctgy'
    })
  }
  static selectAll() {
    const shopCartList = Shopcart.store.getShopCartList.map((shopcart) => {
      shopcart.checked = !Shopcart.isSelectAll.value
      return shopcart
    })
    Shopcart.store.storeShopCartList(shopCartList)
  }
  static checkEveryCheckBox() {
    const isSelectAll = Shopcart.store.getShopCartList.every((shopcart) => {
      return shopcart.checked
    })
    Shopcart.store.storeShopCartList(Shopcart.store.getShopCartList)
    Shopcart.isSelectAll.value = isSelectAll
  }
  static refreshInShopCartList() {
    const totalCount = computed(() => {
      let totalCount: number = 0
      const shopCartList = Shopcart.store.getShopCartList
      if (shopCartList?.length > 0) {
        shopCartList.forEach((shopcart) => {
          if (shopcart.checked === true) {
            totalCount += shopcart.purcharsenum
          }
        })
      }
      return totalCount
    })
    const totalPrice = computed(() => {
      let totalPrice: number = 0
      const shopCartList = Shopcart.store.getShopCartList
      if (shopCartList?.length > 0) {
        shopCartList.forEach((shopcart) => {
          if (shopcart.checked === true) {
            totalPrice += shopcart.purcharsenum * shopcart.bookprice
          }
        })
      }
      return procDecimalZero(totalPrice)
    })
    return {
      totalCount,
      totalPrice
    }
  }
  static ctrlShopCart(isShow: boolean) {
    Shopcart.isShow.value = isShow
  }
  static addBkToShopCartWrapper(bookinfo: BookInfo) {
    if (storage.get('token')) {
      Shopcart.addBookToShopCart(bookinfo)
    } else {
      ElMessage.info({
        message: '登录后再执行此操作'
      })
      router.push({
        path: '/login'
      })
    }
  }
  static toPay() {
    router.push({
      path: '/order'
    })
  }
}
function procDecimalZero(num: number) {
  let strvalue = num.toString()
  const splitvalues = strvalue.split('.')
  if (splitvalues.length === 1) {
    strvalue += '.00'
  } else if (splitvalues.length > 1) {
    if (splitvalues[1].length === 1) {
      strvalue += '0'
    } else if (splitvalues[1].length > 2) {
      strvalue = num.toFixed(2).toString()
    }
  }
  return strvalue as any as number
}