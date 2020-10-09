import { CameraZoomAction, Map, RendererResizeAction } from '@/classes';
import { CameraMovementAction } from '@/classes/actions/camera-movement-action.class';
import { App } from "vue";
import MapComponent from "../components/map/map.component.vue";

export default {
  install: (app: App) => {
    Map.actions = [CameraMovementAction, CameraZoomAction, RendererResizeAction];

    app.component("v-map", MapComponent);
  },
};
