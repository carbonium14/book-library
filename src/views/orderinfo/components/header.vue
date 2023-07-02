<template>
  <div class="header">
    <font-awesome-icon icon="fa-solid fa-chevron-left" class="backarrow" @click="back"/>
    <div class="order-text">确认订单</div>
  </div>
</template>

<script setup lang="ts">
import OrderInfo from '../service/index'
const { back } = OrderInfo
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  width: 5.1rem;
  height: 0.71rem;
  align-items: center;
  justify-content: center;
  font-size: 0.25rem;
  background-color: #fff;
  margin-bottom: 0.2rem;
  .backarrow {
    font-size: 0.3rem;
  }
  .order-text {
    flex: 1;
    text-align: center;
    font-weight: bold;
  }
}
</style>