import { storeToRefs } from 'pinia'
import bookStore from '../../../store/book/index'
import { ref } from 'vue'
import router from '../../../router/index'
export default class BookDetail {
  static bookstore = bookStore()
  static storeRefs = storeToRefs(BookDetail.bookstore)
  static headerOpacity = ref({
    opacity: 0
  })
  static navList = [{
    text: '商品',
    name: 'goods',
    url: '/goods'
  }, {
    text: '详情',
    name: 'goods',
    url: '/goods'
  }, {
    text: '评论',
    name: 'evaluate',
    url: '/evaluate'
  }, {
    text: '相关',
    name: 'evaluate',
    url: '/evaluate'
  }]
  static activeIndex = ref(0)
  static picRef = ref<HTMLBodyElement | undefined>()
  static switchTab(index: number) {
    BookDetail.activeIndex.value = index
  }
  static back() {
    router.back()
  }
  static setHeaderOpacity(opacity: number) {
    BookDetail.headerOpacity.value.opacity = opacity
  }
  static init() {
    window.pageYOffset = 0
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    BookDetail.headerOpacity.value.opacity = 0
    BookDetail.searchBooksByISBN()
  }
  static async searchBooksByISBN() {
    await BookDetail.bookstore.findBookDetailsByISBN()
  }
  static bookScroll() {
    const scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop
    const picHeight = BookDetail.picRef.value?.offsetHeight!
    if (scrollTop > 90) {
      BookDetail.headerOpacity.value.opacity = scrollTop / picHeight
    } else {
      BookDetail.headerOpacity.value.opacity = 0
    }
  }
}