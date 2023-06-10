<template>
  <div class="shopcart">
    <div class="addBtn" v-if="bookitem?.purcharsenum === 0">
      <div class="addBtn-inner" @click="addBookToShopCart(bookitem)">添加到购物车</div>
    </div>
    <div class="shopcart-operate" v-else-if="bookitem?.purcharsenum >= 1">
      <span class="shopcart-operate-minus" v-show="bookitem.purcharsenum > 1" @click="(e) => appOrSubtrBookFrmShopCart(bookitem, e)">
        <span class="inner">-</span>
      </span>
      <span class="shopcart-operate-del" v-show="bookitem.purcharsenum === 1" @click="(e) => appOrSubtrBookFrmShopCart(bookitem, e)">
        <span class="inner"><font-awesome-icon icon="fa-solid fa-trash" class="shanchu"/></span>
      </span>
      <span class="purchasenum">{{ bookitem.purcharsenum }}</span>
      <span class="shopcart-operate-add" @click="(e) => appOrSubtrBookFrmShopCart(bookitem, e)">
        <span class="inner">+</span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BookInfo } from '../../../store/book/state'
import Shopcart from '../service/shopcart'
defineProps<{
  bookitem: BookInfo
}>()
const { addBookToShopCart, appOrSubtrBookFrmShopCart } = Shopcart
</script>

<style lang="scss" scoped>
.shopcart {
  margin-top: 0.1rem;
  &-operate {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.3rem;
    &-add, &-minus {
      padding: 0.15rem;
      .inner {
        display: inline-block;
        width: 0.3rem;
        height: 0.3rem;
        line-height: 0.3rem;
        background-color: #1985f1;
        color: #fff;
        text-align: center;
        border-radius: 50%;
      }
    }
    &-del {
      padding: 0.15rem;
      .shanchu {
        margin-top: 0.1rem;
        font-size: 0.3rem;
      }
    }
    .purchasenum {
      font-size: 0.25rem;
    }
  }
  .addBtn {
    display: flex;
    justify-content: center;
    &-inner {
      width: 90%;
      height: 0.32rem;
      line-height: 0.32rem;
      background-color: #fef3ed;
      color: #db8441;
      text-align: center;
      padding: 0.05rem;
      border-radius: 0.25rem;
    }
  }
}
</style>