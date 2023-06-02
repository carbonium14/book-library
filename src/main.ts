import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import App from './App.vue'
import { createApp } from 'vue'
import { ImgUtil } from './utils/imgUtil'
// import store from './store/index'
import router from './router/index'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { createPinia } from 'pinia'
library.add(fas, far, fab)
createApp(App)
  .use(router)
  .use(createPinia())
  .use(ElementPlus, { size: 'small' })
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
ImgUtil.storageImgList()