export type ShopCart = {
  userid: number,
  checked: boolean,
  shopcartid?: number,
  bookisbn: string,
  bookname: string,
  bookpicname: string,
  bookprice: number,
  purcharsenum: number
}
export const initShopCart: ShopCart[] = []
export const chkedSCLst: ShopCart[] = []
export const subChkedSCLst: ShopCart[] = []