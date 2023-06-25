import { storeToRefs } from 'pinia'
import evaluateStore from '../../../store/evaluate/index'
import { ref } from 'vue'
import { Reply } from '../../../store/evaluate/state'
import storage from '../../../utils/goodstorageUtil'
import { Userinfo } from '../../../store/userinfo/state'
import EvaluateClass from './evaluate'
export default class ReplyClass {
  static store = evaluateStore()
  static storeRefs = storeToRefs(ReplyClass.store)
  static endRplLstIndex = ref(2)
  static showReplyLst(rplLst: Reply[], endRplLstIndex: number) {
    return rplLst.slice(0, endRplLstIndex)
  }
  static foldRplLst(rplLst: Reply[]) {
    ReplyClass.endRplLstIndex.value = rplLst.length
  }
  static collapseRplLst() {
    ReplyClass.endRplLstIndex.value = 2
  }
  static isReadyCollapse(rplLst: Reply[]) {
    return ReplyClass.endRplLstIndex.value > 2 && rplLst.length > 2
  }
  static isEmpty(rplLst: Reply[]) {
    return rplLst.length === 0
  }
  static isReadyOpen(rplLst: Reply[]) {
    return rplLst.length > 2 && ReplyClass.endRplLstIndex.value <= 2
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