<template>
  <!-- Coach Pesonal information -->
  <transition name="fade-in">
  <div v-if="show">
    <section>
      <base-card>
        <span class="coach-title">Coach Name:</span>
        <h3>{{ fullName }}</h3>
        <span class="coach-rate">Rate:</span>
        <h4>${{ rate }}/hour</h4>
      </base-card>
    </section>
    <!-- Coach Contact -->
    <section>
      <base-card>
        <header>
          <h2>Intrested? Reach out now!</h2>
          <base-button link :to="contactCoach"> Contact </base-button>
        </header>
        <router-view> </router-view>
      </base-card>
    </section>
    <!-- Coach expertises -->
    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :type="area"
          :key="area"
          :title="area"
        ></base-badge>
        <p class="margin-top">{{ description }}</p>
      </base-card>
    </section>
  </div>
  </transition>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      selectedCoach: null,
      show:false
    };
  },

  computed: {
    contactCoach() {
      return this.$route.path + "/contact";
    },
    fullName() {
      return this.selectedCoach.firstName + "" + this.selectedCoach.lastName;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    description() {
      return this.selectedCoach.description;
    },
    areas() {
      return this.selectedCoach.areas;
    },
  },
  methods: {
    // Animation 
    beforeRouteLeave (to, from, next) {
      this.show = false;
    },
    // fetch requested coach info
    fetchCoachInfo(coaches) {
      // coaches:[c1:{},c2:{}]

      for (const key in coaches) {
        if (coaches[key].id === this.id) {
          this.selectedCoach = coaches[key];
        }
      }
      // this.selectedCoach = coaches.find((coach) => {
      //   return coach.id === this.id;
      // });
    },
  },
  created() {
    // Load all data about the requested coach
    const coachesList = this.$store.getters["coach/coaches"];
    this.fetchCoachInfo(coachesList);
  },
  mounted() {
    this.show = true;
  },

};
</script>

<style scoped>
header {
  margin-bottom: 2rem;
}
.margin-top {
  margin-top: 1.5rem;
}
h3,
h4 {
  font-size: 1.2rem;
  padding: 0;
}
span.coach-title,
span.coach-rate {
  font-size: 1rem;
  font-family: inherit;
}
/* Animation for main section */
.fade-in-enter-from{
  opacity: 0;
  transform: translateX(-100px);

}
.fade-in-enter-active{
  transition: all 1s ease-in;
}
.fade-in-enter-to{
  opacity: 1;
  transform: translateX(0);
}
</style>
