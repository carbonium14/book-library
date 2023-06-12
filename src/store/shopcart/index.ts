import goodStorage from 'good-storage';
import { defineStore } from 'pinia'
import ShopCartApi from '../../api/ShopCartApi'
import { ShopCart, initShopCart } from './state'
import { AxiosResponse } from 'axios'
import storage, { OPTION } from '../../utils/goodstorageUtil'
export default defineStore('shopcartstore', {
  state: () => {
    return {
      shopCartList: initShopCart 
    }
  },
  getters: {
    getShopCartList(state): ShopCart[] {
      return state.shopCartList.length > 0 ? state.shopCartList : goodStorage.get('shopCartList')
    }
  },
  actions: {
    storeShopCartList(shopCartList: ShopCart[]) {
      this.shopCartList = shopCartList
      storage.set('shopCartList', shopCartList)
    },
    async findCurUseShopCartLst(userid: number) {
      const result: AxiosResponse<ShopCart[]> = await ShopCartApi.getShopCartList(userid)
      this.shopCartList = result.data
      storage.set('shopCartList', this.shopCartList)
    },
    async addBookToShopCart(shopcart: ShopCart) {
      const result: AxiosResponse<ShopCart> = await ShopCartApi.addBookToShopCart(shopcart)
      this.shopCartList = storeShopCart(result)
    },
    async appOrSubtrBookFrmShopCart(shopcart: ShopCart) {
      const result: AxiosResponse<ShopCart> = await ShopCartApi.appOrSubtrBookFrmShopCart(shopcart)
      this.shopCartList = storeShopCart(result)
    },
    async delBookFrmSC(shopcartid: number) {
      const result: AxiosResponse<number> = await ShopCartApi.delBookFrmSC(shopcartid)
      if (result.data > 0) {
        storage.remove('shopCartList', OPTION.ADDORAPPOBJTOARR, 'shopcartid', shopcartid)
        const shopCartList: ShopCart[] = storage.get('shopCartList', OPTION.ADDORAPPOBJTOARR)
        this.shopCartList = shopCartList
      }
    }
  }
})
function storeShopCart(result: AxiosResponse<ShopCart>) {
  const dbShopCart: ShopCart = result.data
  dbShopCart.checked = true
  const shopCartList: ShopCart[] = storage.set('shopCartList', dbShopCart, OPTION.ADDORAPPOBJTOARR, 'shopcartid', dbShopCart.shopcartid)
  return shopCartList
}