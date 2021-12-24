import { createApp } from 'vue'
//importing main options
import App from './App.vue'
// routers and store
import router from './router/router.js';
import store from './store/index.js';

//importing UI

import BaseCard from './components/UI/baseCard.vue';

const app = createApp(App);

app.component("base-card",BaseCard);

app.use(router);
app.use(store);
app.mount('#app');
