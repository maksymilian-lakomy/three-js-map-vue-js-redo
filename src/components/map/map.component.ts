import { Map } from "@/classes";
import { defineComponent, onMounted, ref } from "vue";

const MapComponent = defineComponent({
  setup() {
    const mapWrapper = ref<HTMLElement | null>(null);
    let map: Map;

    onMounted(() => {
      mapWrapper.value && (map = new Map(mapWrapper.value));

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
