<template>
  <div class="goods" v-if="getBookDetail">
    <font-awesome-icon icon="fa-solid fa-circle-chevron-left" class="leftarrow" @click="back"/>
    <div class="pic" ref="picRef">
      <img :src="getImg(getBookDetail.bookpicname)" alt="图片" class="img"/>
    </div>
    <div class="goods-detail">
      <div class="price-detail">
        <div class="favourable">
          <span class="discount-price">
            <strong class="symbol">&yen;</strong>
            <strong class="discountprice">{{ getBookDetail.discountprice }}</strong>
          </span>
          <span class="discount-condition">
            <span class="inner">满100减50</span>
          </span>
          <font-awesome-icon icon="fa-solid fa-comment-dollar" class="jiangjia"/>
        </div>
        <div class="other">
          <span class="original-price">定价&yen;{{ getBookDetail.originalprice }}</span>
          <span class="discount">{{ getBookDetail.discount }}折</span>
          <span class="reduction-notice">降价通知</span>
        </div>
      </div>
      <div class="line"></div>
      <div class="fullminus">
        <div class="fullminus-item">
          <div class="fullminus-item-desc">
            <strong class="symbol">&yen;</strong>
            <span class="integerpart">10</span>
            <span class="sale-price">减99</span>
          </div>
          <div class="fullminus-item-get">领</div>
          <span class="radius-up"></span>
          <span class="radius-down"></span>
          <span class="connect-line-1"></span>
          <span class="connect-line-2"></span>
          <span class="connect-line-3"></span>
        </div>
        <div class="extra-item-1">
          <span class="yuan-field">N元场</span>
          <span class="discount">3月49元5件 & 88元10件</span>
          <span class="collect-coupons">
            领券
            <font-awesome-icon icon="fa-solid fa-chevron-right" />
          </span>
        </div>
        <div class="extra-item-2">
          <span class="yuan-field">满额减</span>
          <span class="discount">每满 &yen; 100元减 &yen; 50元</span>
          <span class="collect-coupons">
            领券
            <font-awesome-icon icon="fa-solid fa-chevron-right" />
          </span>
        </div>
      </div>
    </div>
    <div class="book-brief">
      <div class="descr">
        <span class="ziying">图书自营</span>
        <span class="book-name">{{ getBookDetail.bookname }}</span>
      </div>
      <div class="book-introduce">
        本套丛书精心制作, 内容丰富, 是购买的不二之选
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BookDetail from '../service/index'
import getImg from '../../../utils/imgUtil'
import { onMounted, onUnmounted } from 'vue'
const { storeRefs, back, bookScroll, picRef, init } = BookDetail
const { getBookDetail } = storeRefs
onMounted(() => {
  window.addEventListener('scroll', bookScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', bookScroll)
})
init()
</script>

<style lang="scss" scoped>
.goods {
  position: absolute;
  top: 0rem;
  left: 0rem;
  bottom: -5rem;
  .leftarrow {
    position: absolute;
    top: 0.2rem;
    left: 0.2rem;
    font-size: 0.4rem;
    opacity: 0.4rem;
  }
  .pic {
    display: flex;
    width: 5.4rem;
    height: 3.5rem;
    justify-content: center;
    margin-top: 0.2rem;
    .img {
      width: 80%;
      height: 90%;
      object-fit: contain;
    }
  }
  &-detail {
    width: 5.4rem;
    height: 2.75rem;
    background-image: linear-gradient(#ff5244 35%, #ffc3bc, #fff);
    border-radius: 0.2rem 0.2rem 0rem 0rem;
    box-shadow: 0rem -0.01rem 0.01rem 0.01rem gainsboro;
    overflow: hidden;
    .price-detail {
      margin-top: 0.1rem;
      width: 5.1rem;
      padding: 0 0.15rem;
      height: 1.04rem;
      color: #fff;
      font-size: 0.2rem;
      .favourable, .other {
        line-height: 0.4rem;
        display: flex;
        align-items: center;
        .discount-price {
          width: 0.94rem;
          font-size: 0.25rem;
          .symbol, .discountprice {
            font-weight: bold;
          }
        }
        .discount-condition {
          flex: 1;
          .inner {
            border: 1px solid gray;
            box-shadow: 0rem 0.01rem 0.03rem 0.02rem #fff inset;
            padding: 0.05rem;
            border-radius: 0.05rem;
          }
        }
        .jiangjia {
          width: 0.7rem;
          font-size: 0.3rem;
          text-shadow: 0rem 0rem 0.02rem gray;
        }
      }
      .other {
        .original-price {
          width: 1.2rem;
          text-decoration: line-through;
        }
        .discount {
          flex: 1;
          text-shadow: 0rem 0rem 0.02rem gray;
        }
        .reduction-notice {
          text-shadow: 0rem 0rem 0.02rem gray;
        }
      }
    }
    .line {
      height: 0.1rem;
      background-color: #e94230;
      margin: 0 0.05rem;
      border-radius: 0.1rem;
    }
    .fullminus {
      position: relative;
      top: -0.05rem;
      height: 1.48rem;
      background-image: linear-gradient(#ffc3bc 5%, #fff 30%, #fff 30%, #fff 30%);
      margin: 0 0.11rem;
      padding: 0.18rem 0 0 0.18rem;
      &-item {
        display: flex;
        align-items: center;
        gap: 0.08rem;
        color: #fff;
        position: relative;
        &-desc, &-get {
          height: 0.45rem;
          background-color: #ff5c47;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0.1rem;
        }
        &-desc {
          width: 1.1rem;
          box-shadow: -0.01rem 0rem 0.04rem 0rem black;
          .symbol {
            font-size: 0.25rem;
          }
          .integerpart {
            margin-right: 0.1rem;
            font-size: 0.25rem;
          }
        }
        &-get {
          width: 0.4rem;
          box-shadow: 0.01rem 0rem 0.04rem 0rem black;
        }
        .radius-up, .radius-down {
          width: 0.11rem;
          height: 0.06rem;
          position: absolute;
          border: 0.02rem solid #ff5347;
          left: 1.08rem;
          border-top: none;
          border-bottom-left-radius: 50% 100%;
          border-bottom-right-radius: 50% 100%;
        }
        .radius-up {
          top: 0.03rem;
        }
        .radius-down {
          bottom: 0.03rem;
          transform: rotate(180deg);
        }
        .connect-line-1, .connect-line-2, .connect-line-3 {
          width: 0.11rem;
          height: 0.02rem;
          background-color: #ff5347;
          position: absolute;
          left: 1.08rem;
        }
        .connect-line-1 {
          top: 0.15rem;
        }
        .connect-line-2 {
          top: 0.21rem;
        }
        .connect-line-3 {
          top: 0.27rem;
        }
      }
      .extra-item-1 {
        margin-top: 0.1rem;
      }
      .extra-item-1, .extra-item-2 {
        display: flex;
        align-items: center;
        gap: 0.24rem;
        height: 0.4rem;
        .yuan-field {
          background-color: #f6e8e7;
          width: 0.8rem;
          padding: 0.05rem 0.03rem;
          text-align: center;
        }
        .discount {
          flex: 1;
          color: #414141;
          font-weight: bold;
        }
        .collect-coupons {
          width: 0.8rem;
          color: #e24a56;
        }
      }
    }
  }
  .book-brief {
    margin: 0 0.25rem;
    .descr {
      display: flex;
      align-items: center;
      height: 0.5rem;
      gap: 0.24rem;
      .ziying {
        background-color: #f34949;
        color: #fff;
        width: 0.9rem;
        text-align: center;
        padding: 0.05rem 0.05rem;
        border-radius: 0.02rem;
        box-shadow: 0.01rem 0.005rem 0.01rem 0.01rem gray;
      }
      .book-name {
        width: 3.6rem;
        font-size: 0.23rem;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .book-introduce {
      font-size: 0.17rem;
      color: #8e8e8e;
      line-height: 0.3rem;
    }
  }
}
</style>