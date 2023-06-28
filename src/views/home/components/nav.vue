<template>
  <div class="nav">
    <div class="nav-item-list">
      <div class="nav-item" v-for="(item, index) in navItems" :key="index">
        <a :href="item.href">
          <img :src="getImg(item.img)" alt="导航" class="nav-item-icon" />
          <div class="nav-item-title">{{ item.name }}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import getImg from '../../../utils/imgUtil'
const navItems = [{
  href: 'https://www.baidu.com',
  img: '畅销榜.png',
  name: '畅销榜'
}, {
  href: 'https://www.baidu.com',
  img: '当当超市.png',
  name: '当当超市'
}, {
  href: 'https://www.baidu.com',
  img: '服装.png',
  name: '服装'
}, {
  href: 'https://www.baidu.com',
  img: '今日促销.png',
  name: '今日促销'
}, {
  href: 'https://www.baidu.com',
  img: '领券中心.png',
  name: '领券中心'
}, {
  href: 'https://www.baidu.com',
  img: '拼团.png',
  name: '拼团'
}, {
  href: 'https://www.baidu.com',
  img: '特价书市.png',
  name: '特价书市'
}, {
  href: 'https://www.baidu.com',
  img: '童书榜.png',
  name: '童书榜'
}, {
  href: 'https://www.baidu.com',
  img: '童书馆.png',
  name: '童书馆'
}, {
  href: 'https://www.baidu.com',
  img: '图书馆.png',
  name: '图书馆'
}]
</script>

<style lang="scss" scoped>
.nav {
  position: absolute;
  top: 3rem;
  width: 5.2rem;
  &-item-list {
    height: 2.3rem;
    width: 100%;
    height: 100%;
    gap: 0.1rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    justify-items: center;
    .nav-item {
      width: 0.9rem;
      height: 1rem;
      a {
        color: black;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.1rem;
        .nav-item-icon {
          width: 0.4rem;
          height: 0.4rem;
          object-fit: contain;
        }
        .nav-item-title {
          font-size: 0.14rem;
        }
      }
    }
  }
}
</style>