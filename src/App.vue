<template>
  <v-map :mapOptions="map" />
</template>

<script lang="ts">
import { MapOptions } from "@/models";

import { Options, Vue } from "vue-class-component";

@Options({})
export default class App extends Vue {
  map: MapOptions = {
    vertices: {
      left: -1305.40466,
      right: 394.59537,
      top: -289.79858,
      bottom: -1989.79858,
    },
    size: 2000,
    tileOptions: {
      inColumn: 4,
      proportions: {
        horizontal: 1,
        vertical: 1,
      },
      paths: [
        require("@/assets/sample-map/image-01-04.png"),
        require("@/assets/sample-map/image-02-04.png"),
        require("@/assets/sample-map/image-03-04.png"),
        require("@/assets/sample-map/image-04-04.png"),
        require("@/assets/sample-map/image-01-03.png"),
        require("@/assets/sample-map/image-02-03.png"),
        require("@/assets/sample-map/image-03-03.png"),
        require("@/assets/sample-map/image-04-03.png"),
        require("@/assets/sample-map/image-01-02.png"),
        require("@/assets/sample-map/image-02-02.png"),
        require("@/assets/sample-map/image-03-02.png"),
        require("@/assets/sample-map/image-04-02.png"),
        require("@/assets/sample-map/image-01-01.png"),
        require("@/assets/sample-map/image-02-01.png"),
        require("@/assets/sample-map/image-03-01.png"),
        require("@/assets/sample-map/image-04-01.png"),
      ],
    },
  };
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}

#app {
  width: 100vw;
  height: 100vh;
}
</style>
