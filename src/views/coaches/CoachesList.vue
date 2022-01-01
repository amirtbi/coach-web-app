<template>
  <section>
    <base-card>
      Filter Coach
      <coach-filter @filter-change="setFilters"></coach-filter>
    </base-card>
  </section>
  <section class="coaches-section">
    <base-card>
      <div class="controls">
        <base-button type="outline"> Refresh Coach List </base-button>
        <!-- Only show when user is not coach or registered alreaddy -->
        <base-button v-if="!isCoach" link to="/register"
          >Register as Coach</base-button
        >
      </div>
      <ul class="coaches-container" v-if="hasCoaches">
        <coach-item
          v-for="coach in filteredCoaches"
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
import coachFilter from "../../components/Coach/coachFilter.vue";
// import { mapGetters } from "vuex";

export default {
  components: {
    coachItem,
    coachFilter,
  },
  data() {
    return {
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    // Check the logged user is whether coach or not
    isCoach() {
      return this.$store.getters["coach/isCoach"];
    },
    hasCoaches() {
      return this.$store.getters["coach/hasCoaches"];
    },
    filteredCoaches() {
      const coaches = this.$store.getters["coach/coaches"];
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes("frontend")) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes("career")) {
          return true;
        }
        return false;
      });
    },
  },
  methods: {
    setFilters(udpatedFilters) {
      this.activeFilters = udpatedFilters;
      console.log("active filters", this.activeFilters);
    },
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
  padding: 0;
}
</style>
