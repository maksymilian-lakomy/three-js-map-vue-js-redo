<template>
<v-map />
</template>

<script lang="ts">
import {
    Options,
    Vue
} from "vue-class-component";

@Options({})
export default class App extends Vue {}
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
