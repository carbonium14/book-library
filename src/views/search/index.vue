<template>
  <div class="search">
    <div class="search-header">
      <font-awesome-icon icon="fa-solid fa-chevron-left" class="back" @click="back"/>
      <span class="search-text">搜索</span>
    </div>
    <div class="search-keyword">
      <div class="search-keyword-wrapper">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="fangdajing"/>
        <input type="text" class="search-keyword-input" placeholder="请输入内容" @keyup="searchKeywords" @blur="closeKeywords"
          v-model.trim="keyword" @focus="resetKeywords"/>
      </div>
      <span class="searchbtn">搜索</span>
    </div>
    <div class="autocomplete" v-show="isOpenAutoComplete">
      <div class="autocomplete-item" v-for="item in keywordList" :key="item.id" @mousedown="searchBooksByKey(item.keyword)">
        <span class="keyword">{{ item.keyword }}</span>
      </div>
      <div class="empty" v-show="keywordList.length === 0">当前没有内容</div>
    </div>
    <div class="search-history">
      <div class="search-history-header" v-show="getHistoryList.length !== 0">
        <span class="historytext">搜索历史</span>
        <font-awesome-icon icon="fa-solid fa-trash" class="del" @click="deleteHistory"/>
      </div>
      <div class="search-history-items">
        <div class="item" v-for="(item, index) in getHistoryList" :key="index">
          <span>{{ item }}</span>
        </div>
      </div>
    </div>
    <div class="search-discovery">
      <div class="search-discovery-header" v-show="getHistoryKeywordObjList.length !== 0">
        <span class="historytext">搜索发现</span>
        <font-awesome-icon icon="fa-solid fa-trash" class="del" @click="deleteDescovery"/>
      </div>
      <div class="search-history-items">
        <div class="item" v-for="item in getHistoryKeywordObjList" :key="item.id">
          <span>{{ item.historykeyword }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Search from './service/index'
const { isOpenAutoComplete, back, searchKeywords, closeKeywords, resetKeywords, searchBooksByKey, init, deleteHistory, deleteDescovery } = Search
const { keyword, keywordList, getHistoryList, getHistoryKeywordObjList } = Search.storeRefs
init()
</script>

<style lang="scss" scoped>
.search {
  width: 5.4rem;
  padding: 0.13rem 0rem;
  &-header {
    display: flex;
    align-items: center;
    height: 0.54rem;
    border-bottom: 1px solid #f6f6f6;
    .back {
      font-size: 0.3rem;
      padding-left: 0.13rem;
    }
    .search-text {
      flex: 1;
      font-size: 0.25rem;
      text-align: center;
      font-weight: bold;
    }
  }
  &-keyword {
    display: flex;
    align-items: center;
    height: 0.75rem;
    gap: 0.2rem;
    width: 5.14rem;
    margin: 0rem 0.13rem;
    &-wrapper {
      flex: 1;
      height: 0.5rem;
      background-color: #f6f6f6;
      border-radius: 1rem;
      display: flex;
      align-items: center;
      .search-keyword-input {
        flex: 1;
        height: 100%;
        background: none;
        border: none;
        outline: none;
        font-size: 0.2rem;
      }
      .fangdajing {
        margin-left: 0.23rem;
        margin-right: 0.12rem;
        font-size: 0.26rem;
      }
    }
    .searchbtn {
      width: 0.5rem;
      font-weight: bold;
      font-size: 0.25rem;
    }
  }
  .autocomplete {
    position: fixed;
    width: 5.4rem;
    height: calc(100% - 0.85rem);
    background-color: #fff;
    &-item {
      display: flex;
      align-items: center;
      height: 0.5rem;
      border-bottom: 1px solid #f4f4f4;
      padding: 0 0.15rem;
    }
    .empty {
      height: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.3rem;
      color: gray;
    }
  }
  &-history, &-discovery {
    width: 5.14rem;
    margin: 0.2rem 0.13rem;
    &-header {
      display: flex;
      height: 0.4rem;
      align-items: center;
      justify-content: space-between;
      .historytext {
        font-weight: bold;
        text-shadow: 0 0 0.01rem gray;
        font-size: 0.19rem;
      }
      .del {
        font-size: 0.23rem;
      }
    }
    &-items {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-auto-flow: row;
      margin-left: 0.06rem;
      margin-top: 0.2rem;
      gap: 0.15rem;
      .item {
        height: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f6f6f6;
        border-radius: 1rem;
      }
    }
  }
}
</style>