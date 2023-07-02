<template>
  <div class="order-header">
    <div class="order-search">
      <font-awesome-icon icon="fa-solid fa-chevron-left" class="left" @click="back"/>
      <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="fangdajing"/>
      <input type="text" id="input" placeholder="搜索我的订单" class="keyword-input"/>
    </div>
    <div class="order-status">
      <div v-for="(item, index) in orderinfos" :key="index" :class="{ 'item_active': activeIndex === index && activeIndex !== 4 }" @click="changeTab(index)">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import OrderInfo from '../../service'
const { orderinfos, back } = OrderInfo
const { activeIndex } = OrderInfo.ordStoreRefs
const { changeTab } = OrderInfo.ordStore
</script>

<style lang="scss" scoped>
.order-header {
  width: 5.1rem;
  height: 1.2rem;
  position: fixed;
  top: 0rem;
  padding-top: 0.2rem;
  background-color: #fff;
  z-index: 2;
  .order-search {
    display: flex;
    align-items: center;
    height: 0.65rem;
    background-color: #f6f6f6;
    border-radius: 1rem;
    .left {
      margin-left: 0.1rem;
      font-size: 0.2rem;
    }
    .fangdajing {
      margin-left: 0.1rem;
      margin-right: 0.1rem;
      font-size: 0.2rem;
    }
    .keyword-input {
      border: none;
      outline: none;
      background: none;
      height: 0.5rem;
      font-size: 0.2rem;
    }
  }
  .order-status {
    display: flex;
    justify-content: space-around;
    margin-top: 0.2rem;
    font-size: 0.2rem;
    .item_active {
      color: #f04f54;
      border-bottom: 1px solid #936e7f;
      height: 0.2rem;
    }
  }
}
</style>