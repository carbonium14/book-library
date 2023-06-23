export interface Evaluate {
  evaluateid: number,
  content: string,
  evaluator: string,
  isbn: string,
  givealikenum: number,
  headportrai: string,
  evaluatedegree: number,
  pubdate: Date,
  isanonymous: number,
  replyLst: Reply[]
}
export interface Reply {
  replyid?: number,
  replycontent: string,
  replydate?: Date,
  strReplyDate: string,
  replyor: string,
  evalid: number
}