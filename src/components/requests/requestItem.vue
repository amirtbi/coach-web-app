<template>
  <li>
    <!--profile of user -->
    <div class="profile-container"></div>
    <!-- messages and email of user -->
    <div class="data-container">
      <a :href="mainLink + request.email">{{ request.email }}</a>
      <p>{{ request.message }}</p>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    request: {
      type: Object,
      required: true,
    },
  },
  computed: {
    mainLink() {
      return "mailto:";
    },
  },
};
</script>
<style scoped>
div.card-container {
  width: 800px;
  margin-bottom: 0;
}
li {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem;
  border: 1px solid #c1c1c1;
  margin-bottom: 1rem;
}
p {
  color: #c1c1c1;
  font-weight: bold;
  font-family: inherit;
  margin-top: 0.5rem;
  margin: 0;
  padding: 0;
  padding-top: 0.5rem;
  font-size: 0.8rem;
}
div.profile-container {
  width: 60px;
  height: 60px;
  border-radius: 100%;
  background-image: url("../../statics/images/image1.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-origin: content-box;
  margin-right: 1rem;
  border: 1px solid black;
}
div.profile-container img {
  width: 100%;
}
div.data-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
a {
  color: black;
  text-decoration: none;
  font-weight: bold;
}
a:hover,
a:active {
  color: purple;
}
a,p{
  font-size: 1rem;
  letter-spacing: 2px;
}
</style>
