<template>
  <div class="header" :style="headerOpacity">
    <font-awesome-icon icon="fa-solid fa-arrow-left" class="left-arrow" @click="back"/>
    <div class="header-wrapper">
      <span v-for="(item, index) in navList" :key="index" :class="{ 'item-active' : index === activeIndex }" @click="switchTab(index)">
        <router-link :to="{ path: item.url }" replace>{{ item.text }}</router-link>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import BookDetail from '../service/index'
const { headerOpacity, navList, activeIndex, switchTab, back } = BookDetail
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  left: 0rem;
  top: 0rem;
  height: 0.5rem;
  z-index: 2;
  background-color: #fff;
  .left-arrow {
    position: absolute;
    top: 0.1rem;
    left: 0.2rem;
    font-size: 0.4rem;
  }
  &-wrapper {
    width: 5.4rem;
    height: 0.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    font-size: 0.25rem;
    color: #000;
    a {
      color: inherit;
    }
    .item-active {
      color: red;
      border-bottom: 0.04rem solid #f5344f;
      padding-bottom: 0.05rem;
    }
  }
}
</style>