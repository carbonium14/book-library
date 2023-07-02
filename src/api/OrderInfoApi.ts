import request from '../utils/axiosUtil'
import { OrderInfo } from '../store/orderinfo/state'
class OrderInfoApi {
  static api: OrderInfoApi = new OrderInfoApi()
  addOrdAndOrdDetail(ordAndOrdDetail: OrderInfo) {
    return request.post('/ordAndOrdDetailmodule/addOrdAndOrdDetail', false, ordAndOrdDetail)
  }
  findCurUsrOrdAndOrdDetail(customerid: number) {
    return request.get(`/ordAndOrdDetailmodule/findCurUsrOrdAndOrdDetail/${customerid}`, false)
  }
  uptOrdStatusByOrdId(orderid: number) {
    return request.get(`/ordAndOrdDetailmodule/uptOrdStatusByOrdId/${orderid}/${-1}`, false)
  }
}
export default OrderInfoApi.api