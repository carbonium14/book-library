<template>
  <div class="breadcrumbs">
    <div class="firstctgyname">{{ getFirstCtgy.name }}</div>
    <font-awesome-icon icon="fa-solid fa-chevron-right" />
    <div class="secondctgyname">{{ getSecondCtgy.secondCtgyName }}</div>
  </div>
</template>

<script setup lang="ts">
import FstToThrdCtgy from '../../ctgy/service/index'
const { getFirstCtgy, getSecondCtgy } = FstToThrdCtgy.storeRefs
</script>

<style lang="scss" scoped>
.breadcrumbs {
  display: flex;
  align-items: center;
  font-size: 0.23rem;
  padding: 0.12rem 0;
  gap: 0.1rem;
  .firstctgyname, .secondctgyname {
    font-weight: bold;
  }
}
</style>