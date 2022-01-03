<template>
  <base-modal v-if="$store.state.error" :title="$store.state.error">
    <template #header> </template>
    <template #default>
      <p id="modal-text">
        Loading coaches data from server has been experienced some difficulties.
        Please try again!.
      </p>
    </template>
  </base-modal>
  <coach-form @register-coach="addCoach"></coach-form>
</template>

<script>
import coachForm from "../../components/Coach/coachForm.vue";
export default {
  components: {
    coachForm,
  },
  data() {
    return {};
  },
  methods: {
    async addCoach(data) {
      try {
        await this.$store.dispatch("coach/register", data);
        await this.$router.push({
          path: "/coaches",
          name: "coaches-list",
        });
      } catch (error) {
        this.$store.state.error = error.message;
      }
    },
  },
};
</script>

<style scoped>
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
