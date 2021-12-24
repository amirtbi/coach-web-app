import { createApp } from 'vue'
//importing main options
import App from './App.vue'
// routers and store
import router from './router/router.js';
import store from './store/store.js';



const app = createApp(App);



app.use(router);
app.use(store);
app.mount('#app');
