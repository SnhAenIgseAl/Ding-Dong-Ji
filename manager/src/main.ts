import { createApp } from 'vue'
import App from './App.vue'
import TDesign from 'tdesign-vue-next';
import 'tdesign-vue-next/es/style/index.css';
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import '@/assets/css/theme.css'
import '@/assets/css/global.css'
import router from './router/index'
import { store } from './stores';

const app = createApp(App)

app.use(TDesign)
// app.use(ElementPlus)
app.use(router)
app.use(store)

app.mount('#app')