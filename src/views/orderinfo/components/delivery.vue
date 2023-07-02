<template>
  <div class="wrapper">
    <div class="delivery">配送</div>
    <div class="free">快递运输&nbsp;免运费</div>
    <div class="time">工作日, 节假日均可送货</div>
    <div class="info">
      明日14: 55前支付, 预计
      <span class="bold">2月14日(周一)到达</span>
    </div>
    <font-awesome-icon icon="fa-solid fa-chevron-right" class="arrow"/>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.wrapper {
  width: 5.1rem;
  height: 1rem;
  background-color: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 0.1rem;
  .delivery {
    position: absolute;
    top: 50%;
    left: 0.3rem;
    transform: translateY(-50%);
    font-size: 0.2rem;
  }
  .free {
    margin-right: 0.5rem;
    font-weight: bold;
  }
  .time {
    margin-right: 0.5rem;
  }
  .info {
    margin-right: 0.5rem;
    .bold {
      color: red;
    }
  }
  .arrow {
    position: absolute;
    top: 50%;
    right: 0.3rem;
    transform: translateY(-50%);
    font-size: 0.2rem;
  }
}
</style>