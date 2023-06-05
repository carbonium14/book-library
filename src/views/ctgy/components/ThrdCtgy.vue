<template>
  <ul class="thrdctgy">
    <li class="thrdctgy-item" v-for="(item, index) in (isReadyOpen ? subThirdCtgys : thrdCtgys)" :key="item.thirdCtgyId">
      <span class="thrdctgyname" @click="toBookInfo(item, secondCtgy)">{{ item.thirdName }}</span>
      <i v-if="((index + 1) % 3) !== 0" class="icon-shuxian">|</i>
    </li>
    <div :class="{ readyOpen: isReadyOpen, readycollapse: !isReadyOpen }" @click="(event) => openOrCollapse(event, secondCtgy)">
      <span v-show="isReadyOpen">
        展开
        <font-awesome-icon icon="fa-regular fa-circle-down" />
      </span>
      <span v-show="!isReadyOpen">
        收起
        <font-awesome-icon icon="fa-regular fa-circle-up" />
      </span>
    </div>
  </ul>
</template>

<script setup lang="ts">
import { SecondCtgy, ThirdCtgy } from '../../../store/state'
import FstToThrdCtgy from '../service/index'
const { thrdCtgys, isReadyOpen, secondCtgy, subThirdCtgys } = defineProps<{
  thrdCtgys: ThirdCtgy[],
  isReadyOpen: boolean,
  secondCtgy: SecondCtgy,
  subThirdCtgys: ThirdCtgy[]
}>()
const { openOrCollapse, toBookInfo } = FstToThrdCtgy

</script>

<style lang="scss" scoped>
.thrdctgy {
  display: grid;
  padding: 0 0.05rem 0 0.1rem;
  grid-template-columns: 1.18rem 1.1rem 1.25rem;
  position: relative;
  &-item {
    padding: 0.2rem 0;
    text-align: center;
    display: flex;
    .thrdctgyname {
      flex: 1;
    }
    .icon-shuxian {
      color: gainsboro;
    }
  }
  .readyOpen {
    width: 1.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .readycollapse {
    position: absolute;
    left: 2.73rem;
    bottom: 0.2rem;
  }
}
</style>