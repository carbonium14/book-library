<template>
  <div class="content">
    <font-awesome-icon icon="fa-solid fa-chevron-left" class="left" @click="back()"/>
    <div class="tosearch">
      <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="icon-fangdajing"/>
      <div class="tosearch-keyword">
        <input type="text" class="tosearch-keyword-input" @click="toSearch"/>
        <span class="keyword">{{ getSwitchThrdCtgyIndex === -1 ? '全部' : getThirdCtgy.thirdName }}</span>
        <font-awesome-icon icon="fa-solid fa-xmark" class="icon-close"/>
      </div>
    </div>
    <div class="icon-xiaoxi message">
      <font-awesome-icon icon="fa-solid fa-ellipsis" class="more" />
    </div>
  </div>
</template>

<script setup lang="ts">
import FstToThrdCtgy from '../../ctgy/service/index'
const { getThirdCtgy, getSwitchThrdCtgyIndex } = FstToThrdCtgy.storeRefs
const { back, toSearch } = FstToThrdCtgy
</script>

<style lang="scss" scoped>
@import '../../../assets/css/common.scss';
.content {
  @extend .multiplex-context;
  gap: 0.05rem;
  z-index: 2;
  .tosearch {
    @extend .multiplex-tosearch;
    .icon-fangdajing {
      margin: 0 0.25rem;
      font-size: 0.36rem;
    }
    &-keyword {
      display: grid;
      grid-template-columns: 3rem;
      align-items: center;
      color: #fff;
      .keyword {
        padding: 0.09rem 0.45rem 0.09rem 0.13rem;
        background-color: #838383;
        width: 0.7rem;
        border-radius: 1rem;
      }
      .icon-close {
        justify-self: flex-start;
        position: relative;
        left: 0.9rem;
      }
      &-input {
        height: 0.3rem;
        background-color: transparent;
        border: none;
        outline: none;
      }
      .keyword, &-input, .icon-close {
        grid-row: 1 / 2;
        grid-column: 1 / 2;
      }
    }
  }
  .icon-fangdajing, .more, .left {
    font-size: 0.46rem;
  }
}
</style>