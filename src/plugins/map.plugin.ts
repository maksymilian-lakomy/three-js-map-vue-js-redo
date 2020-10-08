import { App } from "vue";
import MapComponent from "../components/map/map.component.vue";

export default {
  install: (app: App) => {
    app.component("v-map", MapComponent);
  },
};
