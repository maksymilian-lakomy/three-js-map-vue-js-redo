import { Map } from "@/classes";
import { MapOptions } from "@/models";
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
      mapWrapper.value && (map = new Map(mapWrapper.value));
      map.setMap(props.mapOptions);

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
