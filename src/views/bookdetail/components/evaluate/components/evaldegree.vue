<template>
  <div class="evaldegree" v-show="headAndDegree">
    <div class="evaldegree-wrapper">
      <div class="more">
        <span class="all evaluate" @click="showAllEvalRplLst">全部</span>
        <span class="newest evaluate">最新</span>
        <span class="figure-video evaluate">图/视频</span>
      </div>
      <div class="ratings">
        <span class="goodEvals evaluate" @click="showGoodEvalRplLst">
          好评
          <strong>({{ goodEvalNums }})</strong>
        </span>
        <span class="mediumEvals evaluate" @click="showMedEvalRplLst">
          中评
          <strong>({{ mediumEvalNums }})</strong>
        </span>
        <span class="negativeEvals evaluate" @click="showNegEvalRplLst">
          差评
          <strong>({{ nagativeEvalNums }})</strong>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BookDetail from '../../../service/index'
import EvaluateClass from '../../../service/evaluate'
const { setHeaderOpacity } = BookDetail
const { searchEvalRplLst, goodEvalNums, mediumEvalNums, nagativeEvalNums, showGoodEvalRplLst, showMedEvalRplLst, 
  showNegEvalRplLst, showAllEvalRplLst } = EvaluateClass
  const { headAndDegree } = EvaluateClass.storeRefs
setHeaderOpacity(1)
searchEvalRplLst()
</script>

<style lang="scss" scoped>
.evaldegree {
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  display: flex;
  width: 4.6rem;
  justify-content: center;
  &-wrapper {
    .more, .ratings {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 0.3rem;
      line-height: 0.35rem;
      .evaluate {
        background-color: #fef2f6;
        border-radius: 0.04rem;
        padding: 0.08rem 0.2rem;
        strong {
          font-weight: bold;
        }
      }
    }
    .more {
      margin-bottom: 0.2rem;
    }
  }
}
</style>