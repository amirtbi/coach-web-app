<template>
  <section>
    <base-card>
      <span class="coach-title">Coach Name:</span>
      <h3>{{ fullName }}</h3>
      <span class="coach-rate">Rate:</span>
      <h4>${{ rate }}/hour</h4>
    </base-card>
  </section>

  <section>
    <base-card>
      <header>
        <h2>Intrested? Reach out now!</h2>
        <base-button link :to="contactCoach">
          Contact
        </base-button>
      </header>
      <router-view></router-view>
    </base-card>
  </section>
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
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      selectedCoach: null,
      
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
</style>
