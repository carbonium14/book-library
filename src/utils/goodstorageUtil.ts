import { Operate } from '../store/book/state'
import goodStorage from 'good-storage'
type EleOfArr<T> = T extends Array<infer E> ? E : never
export function getValArrOfObj<T extends any[], K extends keyof EleOfArr<T>, E = EleOfArr<T>>(t: T, k: K) {
  return t.map(({[k]: v}: E) => v)
}
function isPlainObject(val: unknown): val is object {
  return Object.prototype.toString.call(val) === '[object Object]'
}
function isString(val: any): val is string {
  return typeof val === 'string'
}
export enum OPTION {
  ACCUMU = 0,
  ADDORAPPOBJTOARR = 2,
  NONE = -1
}
class Storage {
  static storage: Storage = new Storage()
  set(key: string, value: string): any
  set(key: string, value: object): any
  set(key: string, value: any[]): any
  set(key: string, value: Operate): any
  set(key: string, value: any[], option: OPTION): any
  set(key: string, value: string, option: OPTION): any
  set(key: string, value: object, option: OPTION, propkey: string, propvalue: any): any
  set(key: string, value: any, option: OPTION = OPTION.NONE, propkey: string = '', propvalue?: any) {
    if (isPlainObject(value) && option === OPTION.ADDORAPPOBJTOARR) {
      const arr: any[] = goodStorage.get(key, [])
      const keyValsOfObj = getValArrOfObj(arr, propkey)
      if (propkey.length > 0 && propvalue) {
        if (!keyValsOfObj.includes(propvalue)) {
          arr.push(value)
        } else {
          const index = keyValsOfObj.indexOf(propvalue)
          if (index !== -1) {
            arr[index] = value
          }
        }
        goodStorage.set(key, arr)
        return arr
      }
    } else if (option === OPTION.ACCUMU) {
      const arr: any[] = goodStorage.get(key, [])
      if (Array.isArray(value)) {
        arr.push(...value)
      } else if (isString(value) && !arr.includes(value)) {
        arr.push(value)
      }
      goodStorage.set(key, arr)
      return arr
    }
    goodStorage.set(key, value)
    return value
  }
  get<T = any>(key: string): T
  get<T = any>(key: string, option: OPTION): T
  get(key: string, option: OPTION = OPTION.NONE) {
    if (option === OPTION.ACCUMU || option === OPTION.ADDORAPPOBJTOARR) {
      return goodStorage.get(key, [])
    } else {
      return goodStorage.get(key) || ''
    }
  }
  remove(key: string): any
  remove(key: string, option: OPTION, propkey: string, propvalue: any): any
  remove(key: string, option: OPTION = OPTION.NONE, propkey: string = '', propvalue?: any) {
    if (option === OPTION.ADDORAPPOBJTOARR) {
      const arr: any[] = goodStorage.get(key, [])
      const keyValsOfObj = getValArrOfObj(arr, propkey)
      const eleIndex = keyValsOfObj.indexOf(propvalue)
      if (eleIndex !== -1) {
        arr.splice(eleIndex, 1)
        goodStorage.set(key, arr)
      }
    } else {
      goodStorage.remove(key)
    }
  }
}
export default Storage.storage