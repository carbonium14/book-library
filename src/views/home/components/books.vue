<template>
  <div class="books">
    <div class="books-wrapper" ref="booksRef">
      <div class="books-item" v-for="item in getCurPageBookList" :key="item.ISBN" @click="toBookDetail(item.ISBN)">
        <div class="books-pic">
          <img :src="getImg(item.bookpicname)" alt="图书" class="bookpic" />
        </div>
        <div class="books-summary">
          <div class="books-title">{{ trimStr(item.bookname) }}</div>
          <div class="books-favourable">
            <span class="self-support">自营</span>
            <span class="coupons">券</span>
            <span class="free-shipping">包邮</span>
          </div>
          <div class="price-and-addcart">
            <span class="price">&yen;{{ item.discountprice }}</span>
            <span class="shopcart" @click.stop>
              <font-awesome-icon icon="fa-solid fa-cart-shopping" class="gouwuche" />
            </span>
          </div>
        </div>
      </div>
    </div>
    <div style="position: relative; bottom: 0.8rem;" v-show="!isLastPage">
      <Loading></Loading>
    </div>
    <div style="position: relative; bottom: 0.8rem;" v-show="isLastPage" class="tobottom">我也是有底线的</div>
  </div>
</template>

<script setup lang="ts">
import getImg from '../../../utils/imgUtil'
import Home, { trimStr } from '../service/index'
import Loading from './loading.vue'
import Books from '../../books/service/index'
const { findBookLstWithPager } = Home
const { toBookDetail } = Books
findBookLstWithPager()
const { getCurPageBookList, isLastPage } = Home.storeToRefs
</script>

<style lang="scss" scoped>
.books {
  position: absolute;
  top: 5.3rem;
  width: 5.2rem;
  background-color: #fef3ed;
  .books-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 5.2rem;
    gap: 0.1rem;
    margin-top: 0.15rem;
    margin-bottom: 0.15rem;
    .books-item {
      width: 2.55rem;
      background-color: #fff;
      padding: 0.15rem 0rem;
      .books-pic {
        width: 2.48rem;
        height: 2rem;
        display: flex;
        justify-content: center;
        .bookpic {
          width: 80%;
          height: 90%;
          object-fit: contain;
        }
      }
      .books-summary {
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
        margin-left: 0.1rem;
        .books-title {
          color: black;
          font-weight: bold;
          min-height: 0.34rem;
        }
        .books-favourable {
          display: flex;
          gap: 0.1rem;
          .self-support {
            padding: 0.05rem;
            border-radius: 0.05rem;
            text-shadow: 0rem 0.005rem #7f7f7f;
            background-color: #eb636d;
            color: #fff;
          }
          .coupons, .free-shipping {
            padding: 0.05rem;
            border-radius: 0.05rem;
            border: 1px solid #d06d70;
            background-color: #fff;
            color: #7f7f7f;
            box-shadow: 0 0 0 0.01rem #d06d70;
            text-shadow: 0rem 0.005rem #d06d70;
          }
        }
        .price-and-addcart {
          display: flex;
          justify-content: space-between;
          margin-right: 0.1rem;
          height: 0.35rem;
          .price {
            font-size: 0.3rem;
          }
          .shopcart {
            background-color: #fb4b3c;
            border-radius: 50%;
            width: 0.31rem;
            height: 0.31rem;
            display: flex;
            align-items: center;
            .gouwuche {
              color: #fff;
              padding: 0.05rem;
              text-shadow: 0rem 0rem 0.01rem gray;
            }
          }
        }
      }
    }
  }
  .tobottom {
    text-align: center;
    line-height: 0.5rem;
    color: #656;
    background-color: #fff;
    margin-top: 0.9rem;
  }
}
</style>