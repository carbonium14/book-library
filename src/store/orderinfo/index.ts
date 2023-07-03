import { defineStore } from 'pinia'
import storage from '../../utils/goodstorageUtil'
import { AxiosResponse } from 'axios'
import { OrderDetail, OrderInfo } from './state'
import orderInfoApi from '../../api/OrderInfoApi'
import { Userinfo } from '../userinfo/state'
import { ShopCart } from '../shopcart/state'
import { combine } from '../../utils/commonTypes'
import { timeConversion } from '../../utils/dateUtil'
function hasProps(obj: Record<string, any>) {
  return Boolean(Object.getOwnPropertyNames(obj).length)
}
export default defineStore('ordAndOrdDetailStore', {
  state: () => {
    return {
      ordAndOrdDetails: {} as OrderInfo,
      activeIndex: 0,
      orderinfoLst: [] as OrderInfo[],
      subOrdList: [] as OrderInfo[]
    }
  },
  getters: {
    getOrdAndOrdDetail(state): OrderInfo {
      return hasProps(state.ordAndOrdDetails) ? state.ordAndOrdDetails : storage.get('ordAndOrdDetails')
    },
    getOrdList(state): OrderInfo[] {
      return state.orderinfoLst.length > 0 ? state.orderinfoLst : storage.get('orderinfoLst')
    },
    getSubOrdList(state): OrderInfo[] {
      return state.subOrdList.length > 0 ? state.subOrdList : storage.get('subOrdList')
    }
  },
  actions: {
    async addOrdAndOrdDetail() {
      const customerid = storage.get<Userinfo>('loginUser').userid
      const orderinfo: OrderInfo = {
        ordertime: getNowTime(),
        orderstatus: 1,
        customerid
      }
      const orderDetailList: OrderDetail[] = []
      const chkedSCLst = storage.get<ShopCart[]>('chkedSCLst')
      chkedSCLst.forEach((chkedSC) => {
        const { bookname, bookprice, bookpicname, purcharsenum, shopcartid } = chkedSC
        orderDetailList.push({
          bookname,
          bookpicname,
          bookprice: bookprice.toString(),
          purcharsenum,
          shopcartid
        })
      })
      const lastOrdAndOrdDetailLst: OrderInfo = combine(orderinfo, {
        orderDetailList
      })
      const result: AxiosResponse<OrderInfo> = await orderInfoApi.addOrdAndOrdDetail(lastOrdAndOrdDetailLst)
      this.ordAndOrdDetails = result.data
      storage.set('ordAndOrdDetails', result.data)
    },
    changeTab(index: number) {
      this.activeIndex = index
      this.setSubOrdList()
    },
    async findCurUsrOrdAndOrdDetail() {
      const customerid = storage.get<Userinfo>('loginUser').userid
      const ordinfoLst: AxiosResponse<OrderInfo[]> = await orderInfoApi.findCurUsrOrdAndOrdDetail(customerid)
      this.orderinfoLst = setOrdEndTimeAndCutDownTime(convertOrdStatus(ordinfoLst.data))
      storage.set('orderinfoLst', this.orderinfoLst)
    },
    async uptOrdStatusByOrdId(orderid: number, orderstatus: number = -1) {
      await orderInfoApi.uptOrdStatusByOrdId(orderid, orderstatus)
      this.getOrdList.forEach((order) => {
        if (order.orderid === orderid) {
          order.orderstatus = orderstatus
          order.strOrderstatus = ordStatusToStrStatus[orderid]
        }
      })
    },
    setSubOrdList() {
      if ([0, 1, 2].indexOf(this.activeIndex) !== -1) {
        if (this.activeIndex === 0) {
          this.subOrdList = this.orderinfoLst
        } else {
          this.subOrdList = this.orderinfoLst.filter((order) => {
            return order.orderstatus == this.activeIndex
          })
        }
      } else {
        this.subOrdList = []
      }
      storage.set('subOrdList', this.subOrdList)
    }
  }
})
function getNowTime() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() >= 9 ? now.getMonth() + 1 : `0${now.getMonth() + 1}`
  const date = now.getDate() >=10 ? now.getDate() : `0${now.getDate()}`
  const hour = now.getHours() >=10 ? now.getHours() : `0${now.getHours()}`
  const minute = now.getMinutes() >=10 ? now.getMinutes() : `0${now.getMinutes()}`
  const second = now.getSeconds() >= 10 ? now.getSeconds() : `0${now.getSeconds()}`
  return `${year}/${month}/${date} ${hour}:${minute}:${second}`
  // return `${year}/${month}/${date}`
}
const ordStatusToStrStatus: { [key: number]: string } = {
  '1': '等待付款',
  '2': '交易成功',
  '3': '待评价',
  '-1': '订单已取消',
}
function convertOrdStatus(relativeOrdList: OrderInfo[]) {
  return relativeOrdList.map((relativeOrd) => {
    if (relativeOrd.orderstatus === 1) {
      relativeOrd.strOrderstatus = '等待付款'
    } else if (relativeOrd.orderstatus === 2) {
      relativeOrd.strOrderstatus = '交易成功'
    } else if (relativeOrd.orderstatus === 3) {
      relativeOrd.strOrderstatus = '待评价'
    } else if (relativeOrd.orderstatus === -1) {
      relativeOrd.strOrderstatus = '订单已取消'
    } else {
      relativeOrd.strOrderstatus = ''
    }
    return relativeOrd
  })
}
function setOrdEndTimeAndCutDownTime(orderinfoList: OrderInfo[]) {
  return orderinfoList.map((item) => {
    if (item.orderstatus === 1) {
      const orderTime = new Date(item.ordertime)
      item.orderEndTime = orderTime.getTime() + (1000 * 30)
    }
    getCurDownTime(item)
    return item
  })
}
function getCurDownTime(orderinfo: OrderInfo) {
  const restTimes = orderinfo.orderEndTime! - new Date().getTime()
  const restSecs = Math.floor(restTimes / 1000)
  if (restSecs > 0) {
    orderinfo.countDownTime = timeConversion(restTimes)
  }
}