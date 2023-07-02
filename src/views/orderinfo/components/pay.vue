<template>
  <div class="pay-method">
    <span class="pay-txt">支付方式</span>
    <span class="pay-type">
      <img class="pay-type-img" :src="getImg('zhifubao.png')" alt="支付宝">
      <span class="pay-type-txt">支付宝支付</span>
      <font-awesome-icon icon="fa-solid fa-chevron-right" class="arrow"/>
    </span>
  </div>
</template>

<script setup lang="ts">
import getImg from '../../../utils/imgUtil'
</script>

<style lang="scss" scoped>
.pay-method {
  width: 5.1rem;
  line-height: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  margin-bottom: 0.2rem;
  .pay-txt {
    color: #949494;
    width: 1.4rem;
    flex-basis: 1.4rem;
    text-align: center;
  }
  .pay-type {
    flex: 1;
    text-align: right;
    margin-right: 0.6rem;
    &-img {
      vertical-align: middle;
      margin-right: 0.1rem;
      width: 0.29rem;
      height: 0.3rem;
    }
    &-txt {
      font-weight: bold;
    }
    .arrow {
      font-size: 0.2rem;
      margin-left: 0.01rem;
      position: relative;
      top: 0.02rem;
    }
  }
}
</style>