<template>
  <section>Filter Coach</section>
  <section class="coaches-section">
    <base-card>
    <div class="controls">
      <button class="controls__button controls__button-action">Refresh Coach List</button>
      <router-link to="/register">Register as Coach</router-link>
    </div>
    <ul class="coaches-container" v-if="hasCoaches">
      <coach-item
        v-for="coach in coaches"
        :id="coach.id"
        :firstname="coach.firstName"
        :lastname="coach.lastName"
        :areas="coach.areas"
        :description="coach.description"
        :rate="coach.hourlyRate"
      ></coach-item>
    </ul>
    <h3 v-else>No Coaches Found</h3>
    </base-card>
  </section>
</template>

<script>
import coachItem from "../../components/Coach/coachItem.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    coachItem,
  },
  computed: {
    ...mapGetters("coach", ["coaches", "hasCoaches"]),
  },
};
</script>

<style scoped>
div.controls {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 1rem auto;
}
ul.coaches-container {
  display: flex;
  flex-direction: column;

}
button{
  border: none;
  border-radius: 5px;
  font-weight: bold;
  font-family: inherit;
  cursor: pointer;
}
button.controls__button-action{
  background-color: blue;
  color:white;
  padding: 0.75rem 1rem;
  margin-right: 1rem;
  
}
</style>
