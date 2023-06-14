<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left" @click="toShopCartList">
        <font-awesome-icon icon="fa-solid fa-cart-shopping" class="gouwuche" :class="{ highlight: totalCount > 0 }"/>
        <div class="num" v-show="totalCount > 0">{{ totalCount }}</div>
      </div>
      <div class="content-right">
        <div class="totalprice">&yen;&nbsp;{{ totalPrice }}</div>
        <div class="topay">
          去支付
          <font-awesome-icon icon="fa-solid fa-chevron-right" />
        </div>
      </div>
      <div class="ball-container">
        <transition @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
          <div class="ball" v-show="ball.showorhidden">
            <div class="inner"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Shopcart from '../service/shopcart'
const { totalPrice, totalCount } = Shopcart.refreshShopCartList()
const { beforeDrop, dropping, afterDrop, ball, toShopCartList, init } = Shopcart
init()
</script>

<style lang="scss" scoped>
.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 0.73rem;
    width: 100%;
    gap: 0.3rem;
    &-left {
      width: 1.095rem;
      height: 0.53rem;
      position: relative;
      .gouwuche {
        font-size: 0.4rem;
        &.highlight {
          color: black;
        }
      }
      .num {
        position: absolute;
        left: 0.3rem;
        top: -0.05rem;
        color: #fff;
        background-color: red;
        font-size: 0.18rem;
        padding: 0rem 0.02rem;
        width: 0.3rem;
        text-align: center;
        border-radius: 0.1rem;
      }
    }
    &-right {
      width: 3.5rem;
      height: 0.53rem;
      font-size: 0.29rem;
      background-color: #ffd102;
      color: black;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 1rem;
      gap: 0.05rem;
      .totalprice {
        font-weight: bold;
      }
      .topay {
        font-size: 0.24rem;
      }
    }
    .ball-container {
      .ball {
        position: fixed;
        left: 0.45rem;
        bottom: 0.2rem;
        width: 0.16rem;
        height: 0.16rem;
        transition: all 0.4s cubic-bezier(0.48, -0.35, 0.78, 0.45);
        .inner {
          width: 0.16rem;
          height: 0.16rem;
          border-radius: 50%;
          background-color: #1985f1;
          transition: all 0.4s linear;
        }
      }
    }
  }
}
</style>