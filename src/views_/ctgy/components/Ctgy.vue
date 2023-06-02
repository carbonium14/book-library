<template>
  <div class="content">
    <ul class="firstctgy">
      <li :class="{ 'firstctgy-item': true, 'firstctgy-item_active': firstCtgyActiveIndex === index }"
        v-for="(item, index) in firstCtgyList" :key="item.firstCtgyId" @click="changeTab(index)">
        <span class="firstctgyname">{{ item.name }}</span>
      </li>
    </ul>
    <div class="secondthrdctgy">
      <ul>
        <li class="secondthrdctgy-item" v-for="(item, index) in secondCtgyList" :key="item.secondCtgyId">
          <div class="secondctgy-item">
            <span class="secondCtgyName">{{ item.secondCtgyName }}</span>
            <span class="secondCtgyNameshop">{{ item.secondCtgyName }}馆&nbsp;&gt;</span>
          </div>
          <ThrdCtgy :thrdCtgys="item.thirdCtgys" :isReadyOpen="item.isReadyOpen" :secondCtgy="item" :subThirdCtgys="item.subThirdCtgys"></ThrdCtgy>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import FstToThrdCtgy from '../service/index'
import ThrdCtgy from './ThrdCtgy.vue'
const { firstCtgyActiveIndex, firstCtgyList, changeTab, getFirstCtgys, secondCtgyList, getSecThrdCtgyList } = FstToThrdCtgy
getFirstCtgys()
getSecThrdCtgyList()
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  position: absolute;
  top: 1.02rem;
  left: 0;
  bottom: 0.85rem;
  width: 100%;
  gap: 0.1rem;
  .firstctgy {
    width: 1.3rem;
    flex-basis: 1.3rem;
    overflow-y: auto;
    background-color: #fff;
    &-item {
      height: 0.78rem;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      &_active {
        color: red;
        text-shadow: 0 0 0.03rem #2a2a2a;
        background-color: #f7f7f7;
        .firstctgyname {
          border-left: 3px solid red;
          width: 100%;
          text-align: center;
        }
      }
    }
  }
  .secondthrdctgy {
    flex: 1;
    margin-right: 0.19rem;
    overflow-y: auto;
    &-item {
      background-color: #fff;
      .secondctgy-item {
        padding: 0 0.2rem;
        height: 0.73rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.2rem;
        .secondCtgyName {
          color: #0d0d0d;
          font-weight: bold;
        }
        .secondCtgyNameshop {
          color: #535353;
        }
      }
    }
  }
}
</style>