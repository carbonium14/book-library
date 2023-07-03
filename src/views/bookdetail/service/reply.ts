import { storeToRefs } from 'pinia'
import evaluateStore from '../../../store/evaluate/index'
import { ref } from 'vue'
import { Reply, Evaluate } from '../../../store/evaluate/state'
import storage from '../../../utils/goodstorageUtil'
import { Userinfo } from '../../../store/userinfo/state'
import EvaluateClass from './evaluate'
export default class ReplyClass {
  static store = evaluateStore()
  static storeRefs = storeToRefs(ReplyClass.store)
  static endIndex = ref<{ evaluateid: number, endRplLstIndex: number }[]>([])
  static initRplLst(evaluateLst: Evaluate[]) {
    evaluateLst.forEach((evaluate) => {
      ReplyClass.endIndex.value.push({
        evaluateid: evaluate.evaluateid,
        endRplLstIndex: 2
      })
    })
  }
  static showReplyLst(evaluate: Evaluate) {
    const rplLst = evaluate.replyLst
    const evalueteIndex = ReplyClass.endIndex.value.findIndex((value) => {
      return value.evaluateid === evaluate.evaluateid
    })!
    return rplLst.slice(0, ReplyClass.endIndex.value[evalueteIndex].endRplLstIndex)
  }
  static foldRplLst(evaluate: Evaluate) {
    const rplLst = evaluate.replyLst
    const evalueteIndex = ReplyClass.endIndex.value.findIndex((value) => {
      return value.evaluateid === evaluate.evaluateid
    })!
    ReplyClass.endIndex.value[evalueteIndex].endRplLstIndex = rplLst.length
  }
  static collapseRplLst(evaluate: Evaluate) {
    const evalueteIndex = ReplyClass.endIndex.value.findIndex((value) => {
      return value.evaluateid === evaluate.evaluateid
    })!
    ReplyClass.endIndex.value[evalueteIndex].endRplLstIndex = 2
  }
  static isReadyCollapse(evaluate: Evaluate) {
    const rplLst = evaluate.replyLst
    const evalueteIndex = ReplyClass.endIndex.value.findIndex((value) => {
      return value.evaluateid === evaluate.evaluateid
    })!
    return ReplyClass.endIndex.value[evalueteIndex].endRplLstIndex > 2 && rplLst.length > 2
  }
  static isEmpty(rplLst: Reply[]) {
    return rplLst.length === 0
  }
  static isReadyOpen(evaluate: Evaluate) {
    const rplLst = evaluate.replyLst
    const evalueteIndex = ReplyClass.endIndex.value.findIndex((value) => {
      return value.evaluateid === evaluate.evaluateid
    })!
    return rplLst.length > 2 && ReplyClass.endIndex.value[evalueteIndex].endRplLstIndex <= 2
  }
  static async addReply(event: Event, evaliateid: number) {
    const replyEle = event.currentTarget as HTMLBodyElement
    const replyContent = (replyEle.previousElementSibling! as HTMLInputElement).value
    const replyTime = getNowTime()
    const replyor = storage.get<Userinfo>('loginUser').username
    const reply: Reply = {
      replycontent: replyContent,
      strReplyDate: replyTime,
      replyor,
      evalid: evaliateid
    }
    await ReplyClass.store.addReply(reply)
    EvaluateClass.evalRplLst.value = ReplyClass.store.getEvalRplLst
    const replyPanelEle = replyEle.parentElement!.parentElement! as HTMLBodyElement
    replyPanelEle.className = 'reply-panel'
    EvaluateClass.cancelRplShowIndx.value = -1
    EvaluateClass.controlScrlOrHid('scroll')
    EvaluateClass.ctrlHeadAndDegree(true)
  }
}
function getNowTime() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() >= 9 ? now.getMonth() + 1 : `0${now.getMonth() + 1}`
  const date = now.getDate() >=10 ? now.getDate() : `0${now.getDate()}`
  // const hour = now.getHours() >=10 ? now.getHours() : `0${now.getHours()}`
  // const minute = now.getMinutes() >=10 ? now.getMinutes() : `0${now.getMinutes()}`
  // const second = now.getSeconds() >= 10 ? now.getSeconds() : `0${now.getSeconds()}`
  // return `${year}/${month}/${date} ${hour}:${minute}:${second}`
  return `${year}/${month}/${date}`
}