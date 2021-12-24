<template>
<the-header></the-header>
<main>
  <router-view></router-view>
</main>
</template>

<script>
import TheHeader from './components/Layouts/TheHeader.vue';
export default {
  components:{
    TheHeader
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

* {
  box-sizing: border-box;
}
body,
html {
  margin: 0;
  padding: 0;
}
body {
  font-family: "Roboto", sans-serif;
}
</style>
