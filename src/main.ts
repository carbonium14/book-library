import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { ImgUtil } from './utils/imgUtil'
createApp(App).mount('#app')
ImgUtil.storageImgList()
