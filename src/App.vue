<template>
  <the-header></the-header>
    <router-view>
    
    </router-view>

</template>

<script>
import TheHeader from "./components/Layouts/TheHeader.vue";
export default {
  components: {
    TheHeader,
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

/* Views animation */
/* .route-enter-from {
  opacity: 0;
  transform: translateX(-100px);
} */
.route-enter-active {
  animation:fade-in 1s ease-in
}

@keyframes fade-in {
  from{
    opacity: 0;
    transform: translateX(-100px);
  }

  to{
    opacity: 1;
    transform: translateX(0px);
  }
}

</style>
