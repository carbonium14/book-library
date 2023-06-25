<template>
  <div class="contain">
    <evaldegree></evaldegree>
    <evallist></evallist>
  </div>
</template>

<script setup lang="ts">
import evaldegree from './components/evaldegree.vue'
import evallist from './components/evallist.vue'
window.pageYOffset = 0
document.body.scrollTop = 0
document.documentElement.scrollTop = 0
</script>

<style lang="scss" scoped>
.contain {
  position: absolute;
  top: 0.6rem;
  left: 0.4rem;
  width: 4.6rem;
}
</style>