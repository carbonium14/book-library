import { Ref, ref } from 'vue'
export default class Bottom {
  static activeIndex: Ref<number> = ref(0)
  static change(index: number) {
    Bottom.activeIndex.value = index
  }
}