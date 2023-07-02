export type OrderInfo = {
  orderid?: number,
  ordertime: string,
  customerid: number,
  orderstatus: number,
  orderDetailList?: OrderDetail[],
  strOrderstatus?: string,
  countDownTime?: string,
  orderEndTime?: number,
  countdownfn?: NodeJS.Timer
}
export type OrderDetail = {
  orderdetailid?: number,
  bookname: string,
  bookprice: string,
  bookpicname: string,
  purcharsenum: number,
  orderid?: number,
  shopcartid?: number
}