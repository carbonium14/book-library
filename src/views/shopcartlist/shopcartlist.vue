<template>
  <div class="shopcartlist">
    <div class="header">
      <font-awesome-icon icon="fa-solid fa-chevron-left" class="back" @click="back"/>
      <input type="checkbox" class="check" v-model="isSelectAll" @click="selectAll"/>
      <span class="booklabel">图书购物商城</span>
    </div>
    <div class="items">
      <div class="item" v-for="item in getShopCartList" :key="item.bookisbn">
        <div class="content">
          <input type="checkbox" class="check" v-model="item.checked" @change="checkEveryCheckBox"/>
          <div class="pic">
            <img class="bookimg" :src="getImg(item.bookpicname)" alt="图书" />
          </div>
          <div class="descri">
            <div class="book-title">{{ item.bookname }}</div>
            <div class="price">
              <span class="curprice">&yen;&nbsp;{{ item.bookprice }}</span>
              <span class="shopcart">
                <addsubtrsc :shopcart="item"></addsubtrsc>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="empty" v-show="getShopCartList.length === 0">
        <font-awesome-icon icon="fa-solid fa-cart-shopping" class="cart"/>
        <div class="empty-desc">您的购物车还空着呢, 快去逛逛吧~</div>
        <div class="gotoctgy" @click="gotoctgy">去逛逛</div>
      </div>
    </div>
    <div class="cal" v-if="getShopCartList.length > 0">
      <span class="checkall">
        <input type="checkbox" class="check" v-model="isSelectAll" @click="selectAll"/>
        <span class="selall" @click="selectAll">全选</span>
        <span class="total">
          合计:
          <span class="money">&yen;&nbsp;{{ totalPrice }}</span>
        </span>
      </span>
      <span class="pay">去结算({{ totalCount }})</span>
    </div>
  </div>
  <Bottom></Bottom>
</template>

<script setup lang="ts">
import getImg from '../../utils/imgUtil'
import Shopcart from '../books/service/shopcart'
import addsubtrsc from '../books/components/addsubtrsc.vue'
import Bottom from '../common/bottom.vue'
const { getShopCartList } = Shopcart.storeRefs
const { totalCount, totalPrice } = Shopcart.refreshInShopCartList()
const { back, isSelectAll, selectAll, checkEveryCheckBox, gotoctgy } = Shopcart
</script>

<style lang="scss" scoped>
.shopcartlist {
  padding: 0rem 0.13rem;
  .header {
    position: fixed;
    width: 5.14rem;
    height: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    z-index: 1;
    .back, .booklabel {
      font-size: 0.25rem;
    }
    .check {
      width: 0.3rem;
      height: 0.22rem;
      cursor: pointer;
    }
  }
  .items {
    overflow-y: auto;
    position: absolute;
    top: 0.86rem;
    bottom: 1.565rem;
    z-index: 0;
    display: grid;
    grid-template-columns: 5.14rem;
    grid-template-rows: 2.89rem;
    .item {
      .content {
        display: flex;
        align-items: center;
        .check {
          width: 0.3rem;
          height: 0.22rem;
          cursor: pointer;
        }
        .pic {
          width: 1.539rem;
          height: 2.16rem;
          display: flex;
          align-items: center;
          justify-content: center;
          .bookimg {
            width: 80%;
            height: 70%;
          }
        }
        .descri {
          width: 3.21rem;
          font-size: 0.2rem;
          .book-title {
            height: 0.8rem;
            color: #272727;
            display: flex;
            align-items: center;
          }
          .price {
            height: 1rem;
            color: #ea5340;
            display: flex;
            align-items: center;
            width: 100%;
            .curprice {
              flex: 1;
            }
            .shopcart {
              flex: 2;
            }
          }
        }
      }
    }
    .empty {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 0.1rem;
      .cart {
        width: 1.5rem;
        height: 1.5rem;
      }
      &-desc {
        font-size: 0.2rem;
        color: gray;
      }
      .gotoctgy {
        background-color: orange;
        width: 2rem;
        height: 0.5rem;
        text-align: center;
        line-height: 0.5rem;
        border-radius: 0.3rem;
        color: gray;
        margin-top: 0.2rem;
      }
    }
  }
  .cal {
    position: fixed;
    width: 5.14rem;
    margin: 0rem 0.13rem;
    bottom: 0.7rem;
    left: 0rem;
    height: 0.86rem;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.2rem;
    .checkall {
      display: flex;
      align-items: center;
      gap: 0.1rem;
      .check {
        width: 0.3rem;
        height: 0.22rem;
        cursor: pointer;
      }
      .total {
        font-weight: bold;
        .money {
          font-weight: bold;
        }
      }
    }
    .pay {
      width: 1.8rem;
      background-color: #ed1611;
      height: 0.6rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      border-radius: 0.288rem;
      text-shadow: 0 0 0.1rem #3f3f3f;
      margin-right: 0.03rem;
    }
  }
}
</style>