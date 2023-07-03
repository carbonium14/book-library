<template>
  <div class="header" :style="headerOpacity" ref="headerRef">
    <div class="header-title">图书购物</div>
    <div class="header-content">
      <div class="header-searchandsort">
        <div class="header-search" @click="toSearch">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="fangdajing"/>
          <input type="text" placeholder="请输入图书名称" class="header-search-input" />
        </div>
        <div class="header-sort" @click="toCtgy">
          <font-awesome-icon icon="fa-regular fa-rectangle-list" class="fenlei" />
          <span class="sort-text">分类</span>
        </div>
      </div>
      <div class="header-adv-img">
        <img :src="getImg('adv.png')" alt="广告" class="imgadv"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import getImg from '../../../utils/imgUtil'
import Home from '../service/index'
import FstToThrdCtgy from '../../ctgy/service/index'
const { init, toCtgy } = Home
const { toSearch } = FstToThrdCtgy
const { headerOpacity, headerRef } = Home.storeToRefs
onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
.header {
  background-color: #fff;
  &-title {
    line-height: 0.5rem;
    text-align: center;
  }
  &-content {
    height: 2.4rem;
    width: 100%;
    background-image: linear-gradient(#06086c, #04086c, #e7e7ef);
    .header-searchandsort {
      display: flex;
      align-items: center;
      height: 0.58rem;
      gap: 0.2rem;
      .header-search {
        margin-top: 0.15rem;
        flex: 1;
        height: 100%;
        background-color: #fff;
        border-radius: 1rem;
        display: flex;
        gap: 0.1rem;
        align-items: center;
        .fangdajing {
          margin-left: 0.2rem;
          font-size: 0.3rem;
        }
        &-input {
          border: none;
          outline: none;
          background: none;
          width: 80%;
        }
      }
      .header-sort {
        width: 1rem;
        display: flex;
        align-items: center;
        gap: 0.05rem;
        margin-top: 0.1rem;
        .fenlei {
          color: gray;
          font-size: 0.25rem;
        }
        .sort-text {
          color: gray;
          font-size: 0.25rem;
        }
      }
    }
    .header-adv-img {
      margin-top: 0.15rem;
      width: 5.15rem;
      height: 1.7rem;
      display: flex;
      justify-content: center;
      .imgadv {
        width: 98%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>