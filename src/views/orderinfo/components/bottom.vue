<template>
  <div class="submitto">
    <div class="payable" v-if="chkedSCLst.length !== 0">
      <span class="tag">实付:&nbsp;</span>
      <span class="money">&yen;&nbsp;{{ totalPrice }}</span>
    </div>
    <div class="submitto-order" @click="addOrdAndOrdDetailLst" v-if="chkedSCLst.length !== 0">
      <span>提交订单</span>
    </div>
    <div class="submitto-order-noshopcart" @click="addOrdAndOrdDetailLst" v-if="chkedSCLst.length === 0">
      <span>订单已提交或暂无订单</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import Shopcart from '../../books/service/shopcart'
import OrderInfo from '../service/index'
const { totalPrice } = Shopcart.refreshInShopCartList()
const { chkedSCLst } = Shopcart.storeRefs
const { addOrdAndOrdDetailLst } = OrderInfo
</script>

<style lang="scss" scoped>
.submitto {
  position: fixed;
  bottom: 0.2rem;
  left: 0;
  width: 5.1rem;
  padding: 0 0.15rem;
  display: flex;
  height: 0.8rem;
  font-size: 0.25rem;
  .payable {
    width: 3.17rem;
    background-color: #5c5c5c;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 0.8rem;
    border-bottom-left-radius: 0.8rem;
  }
  &-order, .submitto-order-noshopcart {
    width: 1.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: #ea1311;
    border-top-right-radius: 0.8rem;
    border-bottom-right-radius: 0.8rem;
    text-shadow: 0 0 0.01rem black;
  }
  .submitto-order-noshopcart {
    width: 4.97rem;
    border-radius: 0.8rem;
  }
}
</style>