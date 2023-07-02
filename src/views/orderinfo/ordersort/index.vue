<template>
  <div class="container">
    <ordersorthead></ordersorthead>
    <orderlist></orderlist>
  </div>
</template>

<script setup lang="ts">
import ordersorthead from './components/ordersorthead.vue'
import orderlist from './components/orderlist.vue'
</script>

<style lang="scss" scoped>
.container {
  width: 5.4rem;
  padding: 0 0.15rem;
  background-color: #f2f2f2;
}
</style>