<template>
  <div class="container">
    <Header></Header>
    <Pay></Pay>
    <OrderBooks></OrderBooks>
    <Delivery></Delivery>
    <Bottom></Bottom>
  </div>
</template>

<script setup lang="ts">
import Header from './components/header.vue'
import Pay from './components/pay.vue'
import OrderBooks from './components/orderbooks.vue'
import Delivery from './components/delivery.vue'
import Bottom from './components/bottom.vue'
</script>

<style lang="scss" scoped>
.container {
  width: 5.1rem;
  height: 100vh;
  padding: 0rem 0.15rem;
  background-color: #f8f8f8;
}
</style>