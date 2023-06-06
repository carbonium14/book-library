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
</template>

<script setup lang="ts">
import Books from '../service/index'
const { sortBook, isReadyAsc, sortField } = Books
</script>

<style lang="scss" scoped>
.book-sort {
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
</style>