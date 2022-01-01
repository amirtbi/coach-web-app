<template>
  <span :class="type">
    {{ text }}
  </span>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    title:{
      type:String,
      required:false
    }
  },
  computed:{
    text(){
      return this.title.toUpperCase();
    }
  }
};
</script>

<style scoped>
span {
  padding: 0.5rem 1rem;
  border: none;
  font-size: 0.7rem;  
  font-family: inherit;
  margin-right: 0.5rem;
  border-radius: 5px;
  color: white;
}
span.info {
  background-color: blue;
  margin-right: 1rem;
  border-radius: 5px;
  color: white;
}
span.frontend{
  background-color: red;
}
span.backend{
  background-color:blue ;
}
span.career{
  background-color: rgb(92, 3, 143);
}
</style>
