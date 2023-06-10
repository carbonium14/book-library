import { ShopCart } from '../store/shopcart/state'
import request from '../utils/axiosUtil'
class ShopcartApi {
  static api: ShopcartApi = new ShopcartApi()
  getShopCartList(userid: number) {
    return request.get(`/shopcartmodule/findCurUseShopCartLst/${userid}`, false)
  }
  addBookToShopCart(shopcart: ShopCart) {
    return request.post('/shopcartmodule/addBookToShopCart', false, shopcart)
  }
  appOrSubtrBookFrmShopCart(shopcart: ShopCart) {
    return request.post('/shopcartmodule/appOrSubtrBookFrmShopCart', false, shopcart)
  }
}
export default ShopcartApi.api