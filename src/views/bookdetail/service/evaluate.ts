import { storeToRefs } from 'pinia'
import evaluateStore from '../../../store/evaluate/index'
import { getOneItemValuesFrmArr } from '../../../utils/commonTypes'
import { Ref, ref } from 'vue'
import { Evaluate } from '../../../store/evaluate/state'
export default class EvaluateClass {
  static evaluatestore = evaluateStore()
  static storeRefs = storeToRefs(EvaluateClass.evaluatestore)
  static goodEvalNums = ref(0)
  static mediumEvalNums = ref(0)
  static nagativeEvalNums = ref(0)
  static evalRplLst: Ref<Evaluate[]> = ref([])
  static cancelRplShowIndx = ref(-1)
  static async searchEvalRplLst() {
    await EvaluateClass.evaluatestore.findEvalReplyLst()
    EvaluateClass.evalRplLst.value = EvaluateClass.evaluatestore.getEvalRplLst
    EvaluateClass.calEvalDegrees()
  }
  static restoreEvalNum() {
    EvaluateClass.goodEvalNums.value = 0
    EvaluateClass.mediumEvalNums.value = 0
    EvaluateClass.nagativeEvalNums.value = 0
  }
  static calEvalDegrees() {
    EvaluateClass.restoreEvalNum()
    const evalDegrees = getOneItemValuesFrmArr(EvaluateClass.evaluatestore.evaluate, 'evaluatedegree')
    evalDegrees.forEach(evalDegree => {
      if (evalDegree === EvalDegree.GoodEval) {
        EvaluateClass.goodEvalNums.value++
      } else if (evalDegree === EvalDegree.MedEval) {
        EvaluateClass.mediumEvalNums.value++
      } else if (evalDegree === EvalDegree.NegEval) {
        EvaluateClass.nagativeEvalNums.value++
      }
    })
  }
  static getEvalRplLst(evalDegree: EvalDegree) {
    EvaluateClass.evalRplLst.value = EvaluateClass.evaluatestore.evaluate
    if (evalDegree !== EvalDegree.AllEval) {
      EvaluateClass.evalRplLst.value = EvaluateClass.evalRplLst.value.filter((evalRpl) => {
        return evalRpl.evaluatedegree === evalDegree
      })
    }
  }
  static showAllEvalRplLst() {
    EvaluateClass.getEvalRplLst(EvalDegree.AllEval)
  }
  static showGoodEvalRplLst() {
    EvaluateClass.getEvalRplLst(EvalDegree.GoodEval)
  }
  static showMedEvalRplLst() {
    EvaluateClass.getEvalRplLst(EvalDegree.MedEval)
  }
  static showNegEvalRplLst() {
    EvaluateClass.getEvalRplLst(EvalDegree.NegEval)
  }
  static changeClassName(event: Event, className: string) {
    const rplEle = event.currentTarget as HTMLBodyElement
    const rplPanel = rplEle.parentElement!.nextElementSibling!
    rplPanel.className = className
  }
  static reply(event: Event, index: number) {
    EvaluateClass.changeClassName(event, 'reply-panel-show')
    EvaluateClass.cancelRplShowIndx.value = index
    EvaluateClass.controlScrlOrHid('hidden')
    EvaluateClass.ctrlHeadAndDegree(false)
    const rplEle = event.currentTarget as HTMLBodyElement
    const rplPanel = rplEle.parentElement!.nextElementSibling!
    window.scrollY = rplPanel.scrollTop
  }
  static cancelreply(event: Event) {
    EvaluateClass.changeClassName(event, 'reply-panel')
    EvaluateClass.cancelRplShowIndx.value = -1
    EvaluateClass.controlScrlOrHid('scroll')
    EvaluateClass.ctrlHeadAndDegree(true)
  }
  static controlScrlOrHid(scrollMode: string) {
    document.documentElement.style.overflowY = scrollMode
    document.body.style.overflowY = scrollMode
  }
  static ctrlHeadAndDegree(isShow: boolean) {
    EvaluateClass.evaluatestore.headAndDegree = isShow
  }
}
enum EvalDegree {
  AllEval = 0,
  GoodEval = 1,
  MedEval = 2,
  NegEval = 3
}