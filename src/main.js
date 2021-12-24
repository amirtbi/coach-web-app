import { createApp } from 'vue'
//importing main options
import App from './App.vue'
// routers and store
import router from './router/router.js';
import store from './store/store.js';

//import layouts
import TheHeader from './components/Layouts/TheHeader.vue';

const app = createApp(App);


app.component("the-header",TheHeader);

app.use(router);
app.use(store);
app.mount('#app');
