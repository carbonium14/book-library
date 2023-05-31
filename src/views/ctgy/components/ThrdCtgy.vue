<template>
  <ul class="thrdctgy">
    <li class="thrdctgy-item" v-for="(item, index) in thrdCtgys" :key="item.thirdCtgyId">
      <span class="thrdctgyname">{{ item.thirdName }}</span>
      <i v-if="((index + 1) % 3) !== 0" class="icon-shuxian">|</i>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { FirstCtgy, SecondCtgy, ThirdCtgy } from '../../../store/state'
const { thrdCtgys } = defineProps<{thrdCtgys: ThirdCtgy[]}>()
</script>

<style lang="scss" scoped>
.thrdctgy {
  display: grid;
  padding: 0 0.05rem 0 0.1rem;
  grid-template-columns: 1.18rem 1.1rem 1.25rem;
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
}
</style>