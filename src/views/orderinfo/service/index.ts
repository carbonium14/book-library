import { watchEffect, ref, Ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import router from '../../../router/index'
import shopcartStore from '../../../store/shopcart/index'
import orderInfoStore from '../../../store/orderinfo/index'
import { timeConversion } from '../../../utils/dateUtil'
import { OrderInfo as OrderInfoType } from '../../../store/orderinfo/state'
export default class OrderInfo {
  static store = shopcartStore()
  static ordStore = orderInfoStore()
  static storeRefs = storeToRefs(OrderInfo.store)
  static ordStoreRefs = storeToRefs(OrderInfo.ordStore)
  static startIndex: Ref<number> = ref(0)
  static orderinfos = ['全部信息', '待付款', '待收货', '待评价', '|', '筛选']
  static back() {
    router.back()
  }
  static setChckedSCLst() {
    OrderInfo.store.setChckedSCLst()
    OrderInfo.getSubChkSCLst()
  }
  static getSubChkSCLst() {
    watchEffect(() => {
      OrderInfo.store.subChkedSCLst = OrderInfo.store.getChckedSCLst.slice(OrderInfo.startIndex.value, OrderInfo.startIndex.value + 4)
    })
  }
  static leftScrollArrow() {
    OrderInfo.startIndex.value -= 1 
  }
  static rightScrollArrow() {
    OrderInfo.startIndex.value += 1
  }
  static showLeftArrow() {
    return computed(() => {
      return OrderInfo.startIndex.value > 0
    })
  }
  static showRightArrow() {
    return computed(() => {
      return OrderInfo.startIndex.value + 4 <= OrderInfo.store.getChckedSCLst.length - 1
    })
  }
  static async addOrdAndOrdDetailLst() {
    await OrderInfo.ordStore.addOrdAndOrdDetail()
    OrderInfo.clearSCLstCache()
    router.push({
      path: 'ordersort'
    })
  }
  static clearSCLstCache() {
    OrderInfo.store.storeShopCartList([])
  }
  static loopCutDownTime() {
    watchEffect(() => {
      const ordList = !OrderInfo.ordStore.getOrdList ? [] : OrderInfo.ordStore.getOrdList
      ordList.forEach((orderitem) => {
        if (orderitem.orderstatus === 1) {
          orderitem.countdownfn = setInterval(async () => {
            const restTimes = orderitem.orderEndTime! - (new Date()).getTime()
            const restSecs = Math.floor(restTimes / 1000)
            if (restSecs === 0) {
              clearInterval(orderitem.countdownfn)
              await OrderInfo.ordStore.uptOrdStatusByOrdId(orderitem.orderid!, -1)
            } else {
              orderitem.countDownTime = timeConversion(restTimes)
            }
          }, 1000)
        } else {
          return
        }
      })
    })
  }
  static async cancelOrder(orderitem: OrderInfoType) {
    clearInterval(orderitem.countdownfn)
    await OrderInfo.ordStore.uptOrdStatusByOrdId(orderitem.orderid!, -1)
    await OrderInfo.ordStore.findCurUsrOrdAndOrdDetail()
  }
  static async payOrder(orderitem: OrderInfoType) {
    clearInterval(orderitem.countdownfn)
    await OrderInfo.ordStore.uptOrdStatusByOrdId(orderitem.orderid!, 2)
    await OrderInfo.ordStore.findCurUsrOrdAndOrdDetail()
  }
}