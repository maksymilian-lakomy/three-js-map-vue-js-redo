import { createApp } from "vue";
import App from "./App.vue";
import mapPlugin from './plugins/map.plugin';

const app = createApp(App);

app.use(mapPlugin, {});
app.mount('#app');