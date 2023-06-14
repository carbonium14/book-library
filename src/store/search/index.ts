import { defineStore } from 'pinia'
import searchApi from '../../api/SearchApi'
import { Keyword, HistoryKeyword } from './state'
import { AxiosResponse } from 'axios'
import storage, { OPTION } from '../../utils/goodstorageUtil'
export const initKeywordVal = '请输入搜索的图书关键字'
export default defineStore('searchstore', {
  state: () => {
    return {
      keyword: initKeywordVal,
      keywordList: [] as Keyword[],
      historykeywordList: [] as string[],
      historykeywordObjList: [] as HistoryKeyword[]
    }
  },
  getters: {
    getKeyword(state) {
      return state.keyword
    },
    getHistoryList(state): string[] {
      return state.historykeywordList.length > 0 ? state.historykeywordList : storage.get('historykeywordList')
    },
    getHistoryKeywordObjList(state): HistoryKeyword[] {
      return state.historykeywordObjList.length > 0 ? state.historykeywordObjList : storage.get('historykeywordObjList')
    }
  },
  actions: {
    storeKeyword(keyword: string = '') {
      this.keyword = keyword
    },
    async searchKeyword(key: string) {
      const result: AxiosResponse<Keyword[]> = await searchApi.searchKeywords(key)
      this.keywordList = result.data
    },
    async addOrUpdateHistoryKeyword(historykeyword: string) {
      const result: AxiosResponse<number> = await searchApi.addOrUpdateHistoryKeyword(historykeyword)
      if (result.data > 0) {
        const historykeywordList = storage.set('historykeywordList', historykeyword, OPTION.ACCUMU)
        this.historykeywordList = historykeywordList
      }
    },
    async searchDescovery() {
      const result: AxiosResponse<HistoryKeyword[]> = await searchApi.searchDescovery()
      storage.set('historykeywordObjList', result.data)
      this.historykeywordObjList = result.data
    },
    async searchHistoryKeywordObjList() {
      const result: AxiosResponse<HistoryKeyword[]> = await searchApi.searchHistoryKeywordObjList()
      const historykeywordList = result.data.map((history) => history.historykeyword)
      storage.set('historykeywordList', historykeywordList, OPTION.ACCUMU)
      this.historykeywordList = historykeywordList
    },
    async deleteHistoryKeywords() {
      const result: AxiosResponse<number> = await searchApi.deleteHistoryKeywords()
      if (result.data > 0) {
        storage.remove('historykeywordList')
        storage.remove('historykeywordObjList')
        this.historykeywordList = []
        this.historykeywordObjList = []
      }
    },
    async deleteDescovery() {
      const result: AxiosResponse<number> = await searchApi.deleteDescovery()
      if (result.data > 0) {
        await this.searchHistoryKeywordObjList()
      }
    }
  }
})