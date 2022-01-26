<template>

  <li>
        <div class="coach-field">      
        <h3 class="coach-field__title">{{ fullName }}</h3>
        </div>

        <div class="coach-field">
          <h4 class="coach-field__rate-title">Rate:</h4>
          <span class="coach-field__rate">${{ rate }}/hour</span>
        </div>
         <div class="coach-field">
        <!-- <h4 class="coach-field__profession-title">Field of Professions</h4> -->
        <div class="coach-field__areas">
          <base-badge :title='profession' :type='profession' v-for="profession in areas" :key="profession">
          </base-badge>
        </div>
        </div>
        <div class="actions">
          <base-button link type='outline' :to="coachContactLink">Contact</base-button>
          <base-button link  :to="coachDetailLink">View Details</base-button>
        </div>

  </li>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      required: true,
    },
    areas: {
      type: Array,
      required: true,
    },
    rate: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    fullName() {
      return this.firstname + " " + this.lastname;
    },
    coachContactLink() {
      return this.$route.path + "/" + this.id + "/contact"; // coaches/c1/contact
    },
    coachDetailLink() {
      return this.$route.path + "/" + this.id; // coaches/c1
    },
  },
};
</script>

<style scoped>
li{
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content:center;
  width: 100%;
  padding: 1rem;
  list-style-type:none;
  border: 1px solid #1d1d1d;
  margin-bottom: 2rem;
  border-radius: 5px;
}
div.coach-field{
  display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    margin-top: 1rem;
}
h3.coach-field__title{
  padding: 0;
  margin: 0;
}
h4.coach-field__rate-title{
  margin: 0;
}
span.coach-field__rate{
  font-weight: bold;
}
h4.coach-field__profession-title
{
  margin: 0;
  width: 30%;
}
div.coach-field__areas{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

div.actions{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
}
div.actions a{
  margin-right: 1rem;
}
</style>
