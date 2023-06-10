import { ShopCart } from '../../../store/shopcart/state'
import { BookInfo } from '../../../store/book/state'
import shopCartStore from '../../../store/shopcart/index'
import { storeToRefs } from 'pinia'
import Books from './index'
export default class Shopcart {
  static store = shopCartStore()
  static storeRefs = storeToRefs(Shopcart.store)
  static async findCurUseShopCartLst() {
    await Shopcart.store.findCurUseShopCartLst(1)
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
      userid: 1,
      checked: false,
      bookisbn: bookinfo.ISBN,
      bookname: bookinfo.bookname,
      bookpicname: bookinfo.bookpicname,
      bookprice: bookinfo.discountprice,
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
    } else if (className === 'shopcart-operate-minus' || className === 'shopcart-operate-del') {
      purcharsenum = bookinfo.purcharsenum - 1
    }
    const shopcart: ShopCart = {
      userid: 1,
      checked: false,
      shopcartid: curShopCartID,
      bookisbn: bookinfo.ISBN,
      bookname: bookinfo.bookname,
      bookpicname: bookinfo.bookpicname,
      bookprice: bookinfo.discountprice,
      purcharsenum
    }
    await Shopcart.store.appOrSubtrBookFrmShopCart(shopcart)
    Books.updateBookNum(purcharsenum, bookinfo.ISBN)
  }
}