<template>
  <ul class="book-sort">
    <li @click="sortBook('ISBN')" :class="{ selected: sortField === 'ISBN' }" class="compsive">综合</li>
    <li @click="sortBook('monthsalecount')" :class="{ selected: sortField === 'monthsalecount' }">销量</li>
    <li @click="sortBook('originalprice')" :class="{ selected: sortField === 'originalprice' }">
      价格
      <span class="ascdesc">
        <font-awesome-icon icon="fa-solid fa-caret-up" v-show="isReadyAsc"/>
        <font-awesome-icon icon="fa-solid fa-caret-down" v-show="!isReadyAsc"/>
      </span>
    </li>
    <li class="shop" @click="sortBook('publishername')" :class="{ selected: sortField === 'publishername' }">店铺</li>
    <li class="dressing">
      筛选
      <font-awesome-icon icon="fa-solid fa-filter" />
    </li>
  </ul>
  <ul class="autocompsearch_incr" v-show="isAutoComSearch">
    <li>发货</li>
    <li>促销</li>
    <li class="publisher" @click="controlPanel(ctrlShopCart)">
      出版社
      <span class="down-or-up-arrow">
        <font-awesome-icon icon="fa-solid fa-arrow-up" v-show="!isReadyOpen"/>
        <font-awesome-icon icon="fa-solid fa-arrow-down" v-show="isReadyOpen"/>
      </span>
      <div class="publisher-panel" ref="publisherPanelRef">
        <div class="publisher-panel-items" @click.stop>
          <div class="publisher-panel-item" v-for="item in publisherList" :key="item.publishid">
            <span @click="selectPublish(item)">{{ item.publishername }}</span>
            <span>
              <font-awesome-icon icon="fa-solid fa-check" v-show="curPublisherList.includes(item)" />
            </span>
          </div>
        </div>
        <div class="confirmOrReset" @click.stop>
          <span class="reset" @click="resetPublishList">重置</span>
          <span class="confirm" @click="findBksByPublishIds(ctrlShopCart)">搜索</span>
        </div>
        <div class="overlay"></div>
      </div>
    </li>
    <li>
      作者
      <span class="down-or-up-arrow">
        <font-awesome-icon icon="fa-solid fa-arrow-up" v-show="!isReadyOpen"/>
        <font-awesome-icon icon="fa-solid fa-arrow-down" v-show="isReadyOpen"/>
      </span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import Books from '../service/index'
const { sortBook, isReadyAsc, sortField, isAutoComSearch, init, isReadyOpen, publisherPanelRef, controlPanel, findBksByPublishIds,
  selectPublish, resetPublishList } = Books
const { publisherList, curPublisherList } = Books.storeRefs
init()
const { ctrlShopCart } = defineProps<{
  ctrlShopCart: (isShow: boolean) => void
}>()
</script>

<style lang="scss" scoped>
.book-sort, .autocompsearch_incr {
  display: flex;
  font-size: 0.2rem;
  width: 100%;
  margin-left: 0.1rem;
  >li {
    flex: 1;
    height: 0.5rem;
    display: flex;
    align-items: center;
    &.selected {
      color: red;
    }
  }
}
.autocompsearch_incr {
  .publisher {
    position: relative;
    &-panel {
      display: none;
      &-show {
        position: absolute;
        top: 0.5rem;
        left: -2.95rem;
        width: 5.4rem;
        background-color: #fff;
        .confirmOrReset {
          border-top: 2px solid #f6f6f6;
          display: flex;
          align-items: center;
          height: 0.8rem;
          justify-content: space-around;
          .reset, .confirm {
            text-shadow: 0 0 0.1rem #777;
            background-color: #f94836;
            color: #fff;
            padding: 0.03rem 0.12rem;
          }
        }
        .overlay {
          position: absolute;
          width: 5.4rem;
          background-color: #777;
          height: 100vh;
          z-index: 10;
          opacity: 0.4;
        }
      }
      &-items {
        display: grid;
        grid-template-columns: 2.6rem 2.2rem;
      }
      &-item {
        height: 0.82rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>