<template>
  <div class="content">
    <div class="tosearch">
      <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="icon-fangdajing"/>
      <div class="tosearch-keyword" @click="toSearch">
        <input type="text" class="tosearch-keyword-input" placeholder="请输入...">
        <font-awesome-icon icon="fa-solid fa-qrcode" class="icon-iconfontscan"/>
      </div>
    </div>
    <div class="message">
      <div class="icon-xiaoxi">
        <font-awesome-icon icon="fa-regular fa-envelope"/>
        <div class="icon-xiaoxi-count">9</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FstToThrdCtgy from '../service/index'
const { toSearch } = FstToThrdCtgy
</script>

<style lang="scss" scoped>
@import '../../../assets/css/common.scss';
.content {
  @extend .multiplex-context;
  .tosearch {
    @extend .multiplex-tosearch;
    .icon-fangdajing {
      font-size: 0.36rem;
      margin: 0.16rem 0.15rem;
    }
    &-keyword {
      width: 3.5rem;
      height: 0.63rem;
      display: flex;
      align-items: center;
      gap: 0.2rem;
      line-height: 0.63rem;
      &-input {
        height: 0.4rem;
        width: 2.7rem;
        background: none;
        border: none;
        font-size: 0.3rem;
        outline: 0;
      }
      .icon-iconfontscan {
        font-size: 0.32rem;
      }
    }
  }
  .message {
    width: 0.76rem;
    text-align: center;
    .icon-xiaoxi {
      font-size: 0.37rem;
      position: relative;
      &-count {
        position: absolute;
        width: 0.2rem;
        height: 0.2rem;
        background-color: red;
        color: #f6f6f6;
        border-radius: 0.1rem;
        font-size: 0.1rem;
        top: -0.1rem;
        right: 0.01rem;
        text-align: center;
        line-height: .2rem;
      }
    }
  }
}
</style>