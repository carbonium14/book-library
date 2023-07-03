<template>
  <div class="order" v-if="getSubOrdList">
    <div class="order-list" v-for="item in getSubOrdList" :key="item.orderid">
      <div class="order-status">
        <img class="img" :src="getImg('dangdang.png')" alt="logo">
        <span>图书自营</span>
        <span>{{ item.strOrderstatus }}</span>
        <span>
          <font-awesome-icon icon="fa-solid fa-trash" class="del"/>
        </span>
      </div>
      <div class="order-submit-info" v-show="item.orderstatus === 1">
        <div>订单下单成功</div>
        <div>{{ item.ordertime }}</div>
      </div>
      <div class="order-detail-list" v-for="subitem in item.orderDetailList" :key="subitem.orderdetailid">
        <div class="book-pic">
          <img class="img" :src="getImg(subitem.bookpicname)" alt="图书">
        </div>
        <div class="book-name-num">
          <span class="book-name">{{ subitem.bookname }}</span>
          <span class="book-num">x{{ subitem.purcharsenum }}</span>
        </div>
        <div class="book-numandprice">
          <span>共{{ subitem.purcharsenum }}件商品</span>
          <span>需付款:&yen;&nbsp;{{ (+subitem.bookprice * subitem.purcharsenum).toFixed(2) }}</span>
        </div>
        <div class="other">
          <div class="cut-down" v-if="item.orderstatus === 1">
            <font-awesome-icon icon="fa-solid fa-clock-rotate-left" class="time"/>
            <span>支付剩余时间:&nbsp;</span>
            <span class="countdowntime" v-html="item.countDownTime"></span>
          </div>
          <div class="pay-or-cancelord" v-if="item.orderstatus === 1">
            <div class="cancel-order" @click="cancelOrder(item)">取消订单</div>
            <div class="immedate-pay" @click="payOrder(item)">立即支付</div>
          </div>
        </div>
      </div>
    </div>
    <div class="fill" v-show="getSubOrdList.length !== 0"></div>
    <div class="empty-order" v-show="getSubOrdList.length === 0">
      <div class="noorder-descr">
        <span>
          <font-awesome-icon icon="fa-regular fa-rectangle-list" />
        </span>
        <span>您暂无订单</span>
      </div>
      <div class="noorder-pic">
        <img :src="getImg('noorder.png')" alt="没有订单">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import getImg from '../../../../utils/imgUtil'
import OrderInfo from '../../service'
import { watchEffect } from 'vue'
const { findCurUsrOrdAndOrdDetail, setSubOrdList } = OrderInfo.ordStore
const { getSubOrdList } = OrderInfo.ordStoreRefs
const { loopCutDownTime, cancelOrder, payOrder } = OrderInfo
findCurUsrOrdAndOrdDetail()
loopCutDownTime()
watchEffect(() => {
  setSubOrdList()
})
</script>

<style lang="scss" scoped>
.order {
  position: absolute;
  top: 1.3rem;
  bottom: 0.9rem;
  width: 5.1rem;
  &-list {
    width: 100%;
    .order-status {
      display: flex;
      align-items: center;
      height: 0.52rem;
      .img {
        width: 0.29rem;
        height: 0.24rem;
        object-fit: contain;
      }
      span:nth-child(2) {
        margin-left: 0.15rem;
        color: black;
        font-weight: bold;
        margin-right: auto;
      }
      span:nth-child(3) {
        color: #989898;
      }
      span:nth-child(4) {
        margin-left: 0.2rem;
      }
    }
    .order-submit-info {
      line-height: 0.32rem;
      color: black;
    }
    .order-detail-list {
      display: grid;
      width: 100%;
      height: 2.38rem;
      padding: 0.1rem 0rem;
      grid-template-columns: [col1] 1fr [col2] 1fr [col3] 1fr [col4] 1fr [col5] 1fr [col6] 1fr [col7] 1fr [col8];
      grid-template-rows: [row1] 1fr [row2] 1fr [row3] 1fr [row4] 1fr [row5];
      .book-pic {
        grid-area: 1/1/3/3;
        .img {
          width: 1.5rem;
          height: 1rem;
          object-fit: contain;
        }
      }
      .book-name-num {
        grid-area: 1/3/3/8;
        display: grid;
        grid-template-rows: 1fr 1fr;
        .book-num {
          align-self: flex-end;
        }
      }
      .book-numandprice {
        grid-area: 3/1/4/8;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 0.2rem;
      }
      .other {
        grid-area: 4/1/5/8;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .cut-down {
          .time {
            color: #f04f54;
            margin-right: 0.1rem;
          }
        }
        .pay-or-cancelord {
          display: flex;
          gap: 0.1rem;
          .cancel-order {
            width: 1rem;
            height: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f6f6f6;
            color: black;
            border-radius: 0.5rem;
          }
          .immedate-pay {
            width: 1rem;
            height: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f04f54;
            color: white;
            border-radius: 0.5rem;
          }
        }
      }
    }
  }
  .fill {
    width: 100%;
    height: 0.9rem;
  }
  .empty-order {
    width: 100%;
    height: 85vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .noorder-descr {
      span {
        font-size: 0.4rem;
        margin-left: 0.2rem;
        color: gray;
      }
    }
    .noorder-pic {
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>