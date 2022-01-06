<template>
  <section>
    <base-modal @close='ErrorHandler' v-if="error"  :title="error">
      <template #header> </template>
      <template #default>
        <p id="modal-text">
          Loading coaches data from server has been experienced some
          difficulties. Please try again!.
        </p>
      </template>
    </base-modal>
    <base-card>
      Filter Coach
      <coach-filter @filter-change="setFilters"></coach-filter>
    </base-card>
  </section>
  <section class="coaches-section">
    <base-card>
      <div class="controls">
        <base-button @click="loadCoaches(true)" type="outline">
          Refresh Coach List
        </base-button>
        <!-- Only show when user is not coach or registered alreaddy -->
        <base-button link to="/register"
          >Register as Coach</base-button
        >
      </div>
      <div class="spinner-container" v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul class="coaches-container" v-else-if="hasCoaches && !isLoading">
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
      isLoading: false,
      error:null,
 
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
      console.log("all coaches:", coaches);
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
  created() {
    this.loadCoaches();
  },
  methods: {
    setFilters(udpatedFilters) {
      this.activeFilters = udpatedFilters;
      console.log("active filters", this.activeFilters);
    },
    ErrorHandler(){
      this.error = null;
    },
    async loadCoaches(refresh = false) {
      // Loading is underway
      this.isLoading = true;
      try {
        await this.$store.dispatch("coach/loadCoaches",{forceRefresh:refresh});
      } catch (error) {
        this.error = error.message || "something went wrong!";
      }
      // Set isLoading to false, after the coaches were loaded
      this.isLoading = false;
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
div.spinner-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem;
}
h2 {
  color: orangered;
  font-size: bold;
  margin: 0;
  padding-top: 1rem;
}
p#modal-text {
  font-size: 1.2rem;
  color: #defaff;
  font-family: inherit;
  margin: 0;
  padding: 0.5rem 1rem;
  text-align: justify;

}
</style>
