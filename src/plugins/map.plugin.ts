import { CameraZoomAction, Map, RendererResizeAction } from '@/classes';
import { CameraMovementAction } from '@/classes/actions/camera-movement-action.class';
import { App } from "vue";
import MapComponent from "../components/map/map.component.vue";

export default {
  install: (app: App) => {

    app.component("v-map", MapComponent);
  },
};
