export type EleOfArr<T> = T extends Array<infer E> ? E : never
export type ItemType<T extends Object[]> = {
  [K in keyof EleOfArr<T>]: EleOfArr<T>[K]
}
export function getSubItemFrmArr<T extends ItemType<T>[], K extends keyof EleOfArr<T>>(t: T, ...keys: K[]): Pick<EleOfArr<T>, K>[] {
  return t.map((item) => {
    return keys.reduce((pre, cur, index) => {
      return { ...pre, [keys[index]]: item[keys[index]] }
    }, {})
  }) as Pick<EleOfArr<T>, K>[]
}
export function getOneItemValuesFrmArr<T extends ItemType<T>[], K extends keyof EleOfArr<T>, E = EleOfArr<T>>(arr:T, k: K) {
  return arr.map(({[k]: v}: E) => {
    return v
  })
}
export function getNoReptValsItem(arr: any[]) {
  const data: any[] = []
  return arr.filter((item) => !data.includes(item) && data.push(item))
}
export function getNoReptItem<T extends ItemType<T>[], K extends keyof EleOfArr<T> = keyof EleOfArr<T>>(arr:T, k: K): ItemType<T>[] {
  const data: ItemType<T>[] = []
  const oneItemValues = getOneItemValuesFrmArr(arr, k)
  const noReptOneItemValues = getNoReptValsItem(oneItemValues)
  arr.filter((item) => {
    if (noReptOneItemValues.includes(item[k])) {
      noReptOneItemValues.splice(noReptOneItemValues.indexOf(item[k]), 1)
      data.push(item)
    }
  })
  return data
}
export type UnionToIntersection<U> = (U extends any ? (args: U) => void : never) extends (args: infer I) => void ? I: never
export function combine<T extends Object[]>(...args: T): UnionToIntersection<T[number]>
export function combine<T extends Object[]>(...t: T) {
  return t.reduce((pre, cur) => {
    return { ...pre, ...cur }
  }, {})
}
export function combineRelative<T extends ItemType<T>[]>(arr: T, relativeKey: string, Values: any) {
  return arr.map((item) => {
    return combine(item, { [relativeKey]: Values })
  })
}