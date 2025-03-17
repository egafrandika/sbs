import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia'
// global icon
import { PlusOutlined, MinusCircleOutlined, MenuOutlined} from '@ant-design/icons-vue';
const pinia = createPinia()
const app = createApp(App);

app.component('PlusOutlined', PlusOutlined);
app.component('MinusCircleOutlined', MinusCircleOutlined);
app.component('MenuOutLined', MenuOutlined);
app.use(pinia);
app.use(Antd);
app.use(router);
app.mount('#app');
