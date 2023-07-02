<template>
  <div class="order-book">
    <div class="order-book-tag">
      <img class="img" :src="getImg('dangdang.png')" alt="当当">
      <span class="own-business">图书自营</span>
    </div>
    <div class="order-book-list" v-if="getSubChckedSCLst.length !== 0">
      <div class="shopcart-book" v-for="item in getSubChckedSCLst" :key="item.bookisbn">
        <img class="shopcart-book-img" :src="getImg(item.bookpicname)" alt="图书">
      </div>
      <div class="leftarrow" v-show="isShowLeftArrow" @click="leftScrollArrow">
        <font-awesome-icon icon="fa-solid fa-chevron-left"/>
      </div>
      <div class="rightarrow" v-show="isShowRightArrow" @click="rightScrollArrow">
        <font-awesome-icon icon="fa-solid fa-chevron-right"/>
      </div>
    </div>
    <div class="order-empty" v-else>购物车空空如也, 快去逛逛吧</div>
  </div>
</template>

<script setup lang="ts">
import getImg from '../../../utils/imgUtil'
import OrderInfo from '../service/index'
const { setChckedSCLst, leftScrollArrow, rightScrollArrow, showLeftArrow, showRightArrow } = OrderInfo
const { getSubChckedSCLst } = OrderInfo.storeRefs
setChckedSCLst()
const isShowLeftArrow = showLeftArrow()
const isShowRightArrow = showRightArrow()
</script>

<style lang="scss" scoped>
.order-book {
  width: 5.1rem;
  background-color: #fff;
  margin-bottom: 0.2rem;
  &-tag {
    padding-top: 0.1rem;
    .img {
      width: 0.29rem;
      height: 0.28rem;
      vertical-align: middle;
      margin-right: 0.1rem;
      margin-left: 0.2rem;
    }
    .own-business {
      font-size: 0.15rem;
      font-weight: bold;
      position: relative;
      top: 0.02rem;
    }
  }
  &-list {
    margin-left: 0.3rem;
    margin-top: 0.2rem;
    padding-bottom: 0.2rem;
    width: 4.5rem;
    display: flex;
    gap: 0.28rem;
    position: relative;
    .shopcart-book {
      height: 1.15rem;
      display: flex;
      gap: 0.3rem;
      &-img {
        width: 0.9rem;
        height: 100%;
      }
    }
    .leftarrow, .rightarrow {
      position: absolute;
      top: 50%;
      transform: translateY(-80%);
      font-size: 0.26rem;
    }
    .leftarrow {
      left: -0.2rem;
    }
    .rightarrow {
      right: -0.2rem;
    }
  }
  .order-empty {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.3rem;
    color: gray;
  }
}
</style>