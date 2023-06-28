<template>
  <div class="bottom-nav-wrapper">
    <div class="bottom-nav">
      <div v-for="(item, index) in bottomNavList" :key="index" @click="change(index)">
        <router-link :to="{ path: item.url }" :class="{ 'bottom-nav-item': true, 'bottom-nav-item_active': index === activeIndex }">
          <font-awesome-icon :icon="item.icon" class="font"/>
          <span class="bottom-nav-title">{{ item.text }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Bottom from './index'
const { activeIndex, change } = Bottom
const bottomNavList = [{
  icon: 'fa-solid fa-house',
  text: '首页',
  url: '/home'
}, {
  icon: 'fa-solid fa-rectangle-list',
  text: '分类',
  url: '/ctgy'
}, {
  icon: 'fa-solid fa-cart-shopping',
  text: '购物车',
  url: '/shopcartlist'
}, {
  icon: 'fa-solid fa-user',
  text: '我的',
  url: '/ctgy'
}]
</script>

<style lang="scss" scoped>
.bottom-nav-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 5.3rem;
  background-color: #fff;
  border-top: 1px solid #ebd4ce;
  .bottom-nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 0.5rem;
    padding: 0.1rem 0rem;
    .bottom-nav-item {
      display: flex;
      flex-direction: column;
      font-size: 0.15rem;
      color: #aba9ac;
    }
    .bottom-nav-item_active {
      color: #21a2ff;
    }
    .font {
      font-size: 0.2rem;
    }
    .bottom-nav-title {
      margin-top: 0.05rem;
    }
  }
}
</style>