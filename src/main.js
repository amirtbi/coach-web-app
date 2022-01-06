import { createApp } from 'vue'
//importing main options
import App from './App.vue'
// routers and store
import router from './router/router.js';
import store from './store/index.js';

//importing UI

import BaseCard from './components/UI/baseCard.vue';
import BaseButton from './components/UI/baseButton.vue';
import BaseBadge from './components/UI/baseBadge.vue';
import BaseSpinner from './components/UI/baseSpinner.vue';
import BaseModal from './components/UI/baseModal.vue';
const app = createApp(App);

app.component("base-card",BaseCard);
app.component("base-button",BaseButton);
app.component("base-badge",BaseBadge);
app.component("base-spinner",BaseSpinner);
app.component("base-modal",BaseModal);

app.use(router);
app.use(store);
app.mount('#app');
