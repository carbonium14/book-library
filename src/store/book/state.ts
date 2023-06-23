export interface BookInfo {
  ISBN: string,
  bookname: string,
  author: string,
  publishid: number,
  publishername: string,
  monthsalecount: number,
  purcharsenum: number,
  bookpicname: string,
  secondctgyid: number,
  thirdctgyid: number,
  discountprice: number,
  discount: number,
  disPercent: number
  originalprice: number,
  integerpart: number,
  fractpart: number,
  isDecimal: boolean,
  ranking: number
}
export enum Operate {
  INIT = 0,
  SECCTGYID = 1,
  THRDCTGYID = 2,
  AUTOCOMPKEYWORD = 3,
}
export interface InitStateType {
  bookList: BookInfo[],
  operate?: Operate,
  publisherList: Publisher[],
  curPublisherList: Publisher[],
  bookDetail: BookInfo,
  ISBN: string
}
export interface Publisher {
  publishid: number,
  publishername: string
}