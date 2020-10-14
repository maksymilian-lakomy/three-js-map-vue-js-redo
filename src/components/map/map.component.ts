import {
  CameraMovementAction,
  CameraZoomAction,
  Map,
  RendererResizeAction,
} from "../../classes";
import { MapOptions } from "../../models";
import { sampleMarkersFactory } from "../../helpers";
import { defineComponent, onMounted, ref, PropType } from "vue";

const MapComponent = defineComponent({
  props: {
    mapOptions: {
      type: Object as PropType<MapOptions>,
      required: true,
    },
  },
  setup(props) {
    const mapWrapper = ref<HTMLElement | null>(null);
    let map: Map;

    onMounted(() => {
      mapWrapper.value &&
        (map = new Map(mapWrapper.value, [
          CameraMovementAction,
          CameraZoomAction,
          RendererResizeAction,
        ]));
      map.setMap(props.mapOptions);

      const markersPos = sampleMarkersFactory(props.mapOptions);

      const markers = map.initializeMarkers();
      
      markers.addMarkers(markersPos);

      const animate = () => {
        map.render();
        requestAnimationFrame(() => animate());
      };
      requestAnimationFrame(() => animate());
    });

    return {
      map: map!,
      mapWrapper,
    };
  },
});

export default MapComponent;
