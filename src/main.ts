import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import App from './App.vue'
import { createApp } from 'vue'
import { ImgUtil } from './utils/imgUtil'
import store from './store/index'
import router from './router/index'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)
createApp(App).use(store).use(router).use(ElementPlus, { size: 'small' }).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
ImgUtil.storageImgList()