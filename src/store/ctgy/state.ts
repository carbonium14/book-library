export interface FirstCtgy {
  firstCtgyId: number,
  name: string
}
export interface SecondCtgy {
  secondCtgyId: number,
  secondCtgyName: string,
  thirdCtgys: ThirdCtgy[]
}
export interface ThirdCtgy {
  thirdCtgyId: number,
  thirdName: string
}
export interface CtgyState {
  firstCtgyList: FirstCtgy[],
  secondCtgyList: SecondCtgy[]
}
export const initCtgyState: CtgyState = {
  firstCtgyList: [],
  secondCtgyList: []
}