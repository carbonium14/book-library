<template>
  <div class="wrapper">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import Header from './components/header.vue'
</script>

<style lang="scss" scoped>
.wrapper {
  width: 5.4rem;
}
</style>