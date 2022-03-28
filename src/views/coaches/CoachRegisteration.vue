<template>
  <div>
    <base-modal
      v-if="!!error"
      @closeHandler="close"
      :description="error"
      title="An error occured"
    >
    </base-modal>
    <coach-form @register-coach="addCoach"></coach-form>
  </div>
</template>

<script>
import coachForm from "../../components/Coach/coachForm.vue";
export default {
  components: {
    coachForm,
  },
  data() {
    return {
      error: null,
    };
  },
  methods: {
    close() {
      this.error = null;
    },
    async addCoach(data) {
      try {
        await this.$store.dispatch("coach/register", data);
        await this.$router.push({
          path: "/coaches",
          name: "coaches-list",
        });
      } catch (error) {
        this.error = error.message || "Something went wrong";
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
