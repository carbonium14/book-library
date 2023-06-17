<template>
  <toSearch></toSearch>
  <div class="adv">
    <img :src="getImg('1.png')" alt="图片" class="adv-img">
  </div>
  <div class="bookctgys">
    <breadcrumbs></breadcrumbs>
    <thrdctgys></thrdctgys>
    <booksort :ctrlShopCart="ctrlShopCart"></booksort>
    <bookItem></bookItem>
  </div>
  <div>
    <shopcart ref="shopcartRef"></shopcart>
  </div>
</template>

<script setup lang="ts">
import toSearch from './components/toSearch.vue'
import getImg from '../../utils/imgUtil'
import breadcrumbs from './components/breadcrumbs.vue'
import thrdctgys from './components/thrdctgys.vue'
import bookItem from './components/bookitem.vue'
import booksort from './components/booksort.vue'
import shopcart from './components/shopcart.vue'
import { ref } from 'vue'
const shopcartRef = ref()
function ctrlShopCart(isShow: boolean) {
  shopcartRef.value!.ctrlShopCart(isShow)
}
</script>

<style lang="scss" scoped>
.adv {
  position: absolute;
  top: 0.86rem;
  width: 5.04rem;
  margin: 0.18rem;
  height: 1.62rem;
  &-img {
    width: 100%;
    height: 100%;
    border-radius: 0.1rem;
  }
}
.bookctgys {
  position: absolute;
  top: 2.7rem;
  width: 5.04rem;
  margin: 0.18rem;
  padding-bottom: 0.8rem;
}
</style>