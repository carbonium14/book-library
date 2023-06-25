import { defineStore } from 'pinia'
import storage from '../../utils/goodstorageUtil'
import evaluateApi from '../../api/EvaluateApi'
import { AxiosResponse } from 'axios'
import { Evaluate, Reply } from './state'
import bookStore from '../book/index'
import replyApi from '../../api/ReplyApi'
export default defineStore('evaluatestore', {
  state: () => {
    return {
      evaluate: [] as Evaluate[],
      reply: [] as Reply[],
      headAndDegree: true
    }
  },
  getters: {
    getEvalRplLst(state): Evaluate[] {
      return state.evaluate.length > 0 ? state.evaluate : storage.get('evaluate')
    },
    getBookISBN() {
      return bookStore().getISBN
    }
  },
  actions: {
    async findEvalReplyLst() {
      const result: AxiosResponse<Evaluate[]> = await evaluateApi.findEvalReplyLst(this.getBookISBN)
      this.evaluate = result.data
      storage.set('evaluate', result.data)
    },
    async addReply(reply: Reply) {
      const result: AxiosResponse<Reply> = await replyApi.addReply(reply)
      const evalRplLst = this.getEvalRplLst
      const dbEvalRplLst = evalRplLst.map((evalRpl) => {
        if (evalRpl.evaluateid === reply.evalid) {
          evalRpl.replyLst.push(result.data)
        }
        return evalRpl
      })
      this.evaluate = dbEvalRplLst
      storage.set('evaluate', this.evaluate)
    }
  }
})