<template>
<transition name="fade">
  <section v-if="show">
    <base-card>
      <h1>Page not found</h1>
      <p>This page could not be found! - maybe check out all our coaches</p>
    </base-card>
  </section>
</transition>
</template>


<script>
export default {
    data() {
        return {
            show:false
        }
    },
    mounted(){
        this.show = true;
    },

    methods:{
        beforeRouteLeave (to, from, next) {
            this.show = false;
        }
    }
}
</script>


<style scoped>
    .fade-enter-from{
        opacity: 0;
    }
    .fade-enter-active{
        transition: all 0.5s;
    }
    .fade-enter-to{
        opacity: 1;
    }
</style>
