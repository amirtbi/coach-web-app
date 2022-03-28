<template>
  <base-modal
    @closeHandler="close"
    v-if="!!error"
    description="loading Requests has faced some difficulties"
    :title="error"
  >
  </base-modal>

  <transition name="fade">
    <div v-if="show">
      <section>
        <base-card>
          Filter Coach
          <coach-filter @filter-change="setFilters"></coach-filter>
        </base-card>
      </section>
      <!-- Coaches list -->
      <section class="coaches-section">
        <base-card>
          <div class="controls">
            <base-button @click="loadCoaches(true)" type="outline">
              Refresh Coach List
            </base-button>
            <!-- Only show when user is not coach or registered alreaddy -->
            <base-button v-if="isLoggedIn && !isCoach" link to="/register"
              >Register as Coach</base-button
            >
          </div>

          <section>
            <div class="spinner-container" v-if="isLoading">
              <base-spinner></base-spinner>
            </div>

            <transition-group
              name="coachesList"
              tag="ul"
              class="coaches-container"
              v-else-if="hasCoaches && !isLoading"
            >
              <coach-item
                v-for="coach in filteredCoaches"
                :id="coach.id"
                :key="coach.id"
                :firstname="coach.firstName"
                :lastname="coach.lastName"
                :areas="coach.areas"
                :description="coach.description"
                :rate="coach.hourlyRate"
              ></coach-item>
            </transition-group>

            <h3 v-else>No Coaches Found</h3>
          </section>
        </base-card>
      </section>
    </div>
  </transition>
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
      error: null,
      show: false,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  mounted() {
    this.show = true;
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
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
    beforeRouteLeave(to, from, next) {
      this.show = false;
    },
    setFilters(udpatedFilters) {
      this.activeFilters = udpatedFilters;
      console.log("active filters", this.activeFilters);
    },
    close() {
      this.error = null;
    },
    async loadCoaches(refresh = true) {
      // Loading is underway
      this.isLoading = true;
      try {
        await this.$store.dispatch("coach/loadCoaches", {
          forceRefresh: refresh,
        });
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

.fade-enter-from {
  opacity: 0;
  transform: translateX(-100px);
}
.fade-enter-active {
  transition: all 1s ease-in;
}
.fade-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.dialog-enter-active {
  animation: fade-in 1s ease-in-out;
}
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-100px);
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
}

.coachesList-enter-from,
.coachesList-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
.coachesList-enter-active,
.coachesList-leave-active {
  transition: all 0.5s ease;
}
.coachesList-enter-to,
.coachesList-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.coachesList-move {
  transition: transform 0.8s ease;
}
</style>
