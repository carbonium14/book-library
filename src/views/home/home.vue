<template>
  <div class="content">
    <div class="head-wrapper">
      <Header></Header>
    </div>
    <Nav></Nav>
    <Books></Books>
    <Bottom></Bottom>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Header from './components/header.vue'
import Nav from './components/nav.vue'
import Books from './components/books.vue'
import Bottom from '../common/bottom.vue'
import Home from './service/index'
const { scrollHandler } = Home
onMounted(() => {
  window.addEventListener('scroll', scrollHandler)
})
onUnmounted(() => {
  window.removeEventListener('scroll', scrollHandler)
})
</script>

<style lang="scss" scoped>
.content {
  width: 5.2rem;
  padding: 0 0.1rem;
  .head-wrapper {
    position: fixed;
    z-index: 2;
    background-color: #fff;
  }
}
</style>