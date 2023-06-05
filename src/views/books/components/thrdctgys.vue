<template>
  <div class="content">
    <div class="thrdctgys">
      <span :class="{ 'thrdctgys-item': true, 'is-active': getSwitchThrdCtgyIndex === -1 }" @click="changeThrdCtgyIndex(-1)">
        全部
      </span>
    </div>
    <div class="thrdctgys" v-for="(item, index) in isReadyOpen ? getSubThirdCtgyList : getThirdCtgyList" :key="item.thirdCtgyId">
      <span :class="{ 'thrdctgys-item': true, 'is-active': item.thirdCtgyId === getSwitchThrdCtgyIndex }" @click="changeThrdCtgyIndex(item.thirdCtgyId)">
        {{ item.thirdName }}
      </span>
    </div>
    <div class="icon">
      <span v-show="isReadyOpen" @click="openOrCollapseInBook(false)">
        <font-awesome-icon icon="fa-solid fa-chevron-down" />
      </span>
      <span v-show="!isReadyOpen" @click="openOrCollapseInBook(true)">
        <font-awesome-icon icon="fa-solid fa-chevron-up" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import FstToThrdCtgy from '../../ctgy/service/index'
const { getSubThirdCtgyList, getThirdCtgyList, isReadyOpen } = FstToThrdCtgy.storeRefs
const { openOrCollapseInBook, storeRefs, changeThrdCtgyIndex } = FstToThrdCtgy
const { getSwitchThrdCtgyIndex } = storeRefs
</script>

<style lang="scss" scoped>
.content {
  margin-top: 0.3rem;
  width: 5.04rem;
  position: relative;
  .thrdctgys {
    float: left;
    font-size: 0.23rem;
    margin-right: 0.5rem;
    height: 0.48rem;
    &-item {
      text-shadow: 0 0 0.01rem gray;
      padding: 0.05rem 0.15rem;
    }
    .is-active {
      color: #fff;
      background-color: #fe463c;
      border-radius: 0.3rem;
    }
  }
  .icon {
    position: absolute;
    right: 0.2rem;
    top: 0;
  }
  &::after {
    display: block;
    content: '';
    clear: both;
  }
}
</style>