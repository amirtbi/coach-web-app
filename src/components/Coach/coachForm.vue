<template>
  <base-card>
    <h2>Register as A New Coach</h2>
    <form class="form" @submit.prevent="registerCoach">
      <div class="form-control">
        <label for="firstname">Firstname</label>
        <input type="text" id="firstname" v-model.trim="firstName" />
      </div>
      <div class="form-control">
        <label for="lastname">Lastname</label>
        <input type="text" id="lastname" v-model.trim="lastName" />
      </div>
      <div class="form-control">
        <label for="description">Description</label>
        <textarea
          name="description"
          id="description"
          rows="5"
          v-model.trim="description"
        ></textarea>
      </div>
      <div class="form-control">
        <label for="rate">Hourly</label>
        <input type="number" id="rate" v-model.trim="rate" />
      </div>
      <div class="form-control row">
        <h3 id="area-title">Areas of expertise</h3>
        <div>
          <input
            type="checkbox"
            id="frontend"
            value="frontend"
            v-model="areas"
          />
          <label for="frontend">Frontend development</label>
        </div>
        <div>
          <input type="checkbox" id="backend" value="backend" v-model="areas" />
          <label for="backend">Backend development</label>
        </div>
        <div>
          <input type="checkbox" id="career" value="career" v-model="areas" />
          <label for="career">Career Advisory</label>
        </div>
      </div>
      <base-button>Register</base-button>
    </form>
  </base-card>
</template>

<script>
export default {
    emits:['register-coach'],
  data() {
    return {
      firstName: "",
      lastName: "",
      description: "",
      rate: null,
      areas: [],
    };
  },
  methods:{
      registerCoach(){
          const enteredFirstName = this.firstName;
          const enteredLastName = this.lastName;
          const enteredDescription = this.description;
          const enteredExperties = this.areas;
          const enteredRate = this.rate;

          const registeredCoach = {
              id: new Date().toISOString(),
              firstName :enteredFirstName,
              lastName : enteredLastName,
              description:enteredDescription,
              areas:enteredExperties,
              hourlyRate:enteredRate
          }
         this.$emit('register-coach',registeredCoach);
        
      }
  }
};
</script>

<style scoped>
form.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  max-width: 80%;
  padding: 1rem;
}
div.form-control {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
  padding: 1rem;
}
div.row {
  flex-direction: column !important;
  justify-content: flex-start;
  align-items: flex-start;
}
div.row > div {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}
div.row > div > input {
  width: 10%;
}
input,
textarea {
  border: 1px solid #ccc;
  width: 80%;
  padding: 0.5rem;
  border-radius: 12px;
}

input[type="number"] {
  width: 20%;
  margin-left: 2rem;
}

label {
  font-family: inherit;
  font-weight: bold;
  margin-right: 1rem;
}
#area-title {
  margin-top: 0;
}
</style>
