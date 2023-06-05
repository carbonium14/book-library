<template>
  <div class="bookitem" v-for="(item, index) in bookList" :key="item.ISBN">
    <img class="book-pic" :src="getImg(item.bookpicname)" alt="图书" />
    <div class="bookinfo">
      <div class="bookinfo-brief">
        <div class="book-name">{{ item.bookname }}</div>
        <div class="book-author-publs">
          <span class="author spacing">{{ item.author }}</span>
          <span class="separator spacing">|</span>
          <span class="publs spacing">{{ item.publishername }}</span>
        </div>
      </div>
      <div class="bookinfo-other">
        <div class="price">
          <span class="discountprice spacing">
            <span class="symbol">&yen;</span>{{ (item.originalprice * item.discount).toFixed(2) }}
          </span>
          <span class="originprice spacing">&yen;{{ item.originalprice }}</span>
          <span class="discount">{{ item.discount }}折</span>
        </div>
        <div class="give">
          <span class="self-support">自营</span>
          <span class="coupons">券</span>
          <span class="free-shipping">包邮</span>
        </div>
        <div class="monthsalescount">
          <span>月销{{ item.monthsalecount }}</span>
        </div>
        <div class="ranklist">
          <span>图书畅销总排行榜第1名</span>
        </div>
      </div>
    </div>
  </div>
  <div class="empty" v-show="bookList.length === 0">库存所有书已经售完</div>
</template>

<script setup lang="ts">
import getImg from '../../../utils/imgUtil'
import books from '../service/index'
import FstToThrdCtgy from '../../ctgy/service/index'
const { findBooksByThirdCtgyId, findBooksBySecondCtgyId, storeRefs } = books
const { bookList } = storeRefs
const { getSwitchThrdCtgyIndex } = FstToThrdCtgy.storeRefs
if (getSwitchThrdCtgyIndex.value === -1) {
  findBooksBySecondCtgyId()
} else {
  findBooksByThirdCtgyId()
}
</script>

<style lang="scss" scoped>
.bookitem {
  margin-top: 0.2rem;
  display: grid;
  grid-template-columns: 2.34rem 2.7rem;
  justify-items: center;
  row-gap: 0.1rem;
  .book-pic {
    width: 1.8rem;
    height: 2.2rem;
    object-fit: contain;
    justify-self: flex-start;
  }
  .bookinfo {
    width: 2.7rem;
    display: grid;
    grid-template-columns: 2.7rem;
    gap: 0.15rem;
    &-brief {
      width: 100%;
      line-height: 0.35rem;
      .book-name {
        font-size: 0.25rem;
        color: #4c4c4c;
      }
      .book-author-publs {
        color: #848484;
        .spacing {
          margin-right: 0.09rem;
        }
      }
    }
    &-other {
      line-height: 0.36rem;
      .price {
        .spacing {
          margin-right: 0.09rem;
        }
        .discountprice {
          font-size: 0.27rem;
          color: #e94039;
          .symbol {
            font-size: 0.22rem;
          }
        }
        .originprice, .discount {
          color: #c6c6c6;
          font-size: 0.2rem;
        }
        .originprice {
          text-decoration: line-through;
        }
      }
      .give {
        display: flex;
        line-height: 0.2rem;
        justify-content: flex-start;
        gap: 0.05rem;
        font-size: 0.15rem;
        .self-support {
          padding: 0 0.15rem;
          border-radius: 0.05rem;
          text-shadow: 0 0.005rem #7f7f7f;
          background-color: #eb636d;
          color: white;
        }
        .coupons {
          padding: 0 0.15rem;
          border-radius: 0.05rem;
          border: 1px #d06d70 solid;
          background-color: #fff;
          color: #7f7f7f;
          text-shadow: 0rem 0.005rem #d06d70;
        }
        .free-shipping {
          padding: 0 0.15rem;
          border-radius: 0.05rem;
          border: 1px #d06d70 solid;
          background-color: #fff;
          color: #7f7f7f;
          text-shadow: 0rem 0.005rem #d06d70;
        }
      }
      .monthsalescount, .ranklist {
        color: #db8441;
        font-size: 0.2rem;
        padding: 0.04rem;
      }
      .ranklist {
        background-color: #fef3ed;
        width: 2.5rem;
        text-indent: 0.04rem;
      }
    }
  }
}
.empty {
  text-align: center;
  margin: 2rem 0;
  font-size: 0.5rem;
}
</style>