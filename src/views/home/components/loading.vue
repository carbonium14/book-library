<template>
  <div class="loading">
    <div class="loading-img">
      <font-awesome-icon icon="fa-solid fa-spinner" spin />
    </div>
    <span>正在加载...</span>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  gap: 0.1rem;
  align-items: center;
  justify-content: center;
  width: 5.2rem;
  font-size: 0.13rem;
  color: #656;
  .loading-img {
    width: 0.2rem;
    height: 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>