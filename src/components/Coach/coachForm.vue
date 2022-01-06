<template>
  <base-card>
    <h2>Register as A New Coach</h2>
    <form class="form" @submit.prevent="registerCoach">
      <div class="form-fields" :class="{ invalid: !firstName.isValid }">
        <div class="form-control">
          <label for="firstname">Firstname</label>
          <input
            type="text"
            id="firstname"
            v-model.trim="firstName.val"
            @blur="clearValidity('firstName')"
          />
        </div>
        <div class="form-fields__message">
          <small class="text-warning" v-if="!firstName.isValid">
            firstname must not be empty!
          </small>
        </div>
      </div>
      <div class="form-fields" :class="{ invalid: !lastName.isValid }">
        <div class="form-control">
          <label for="lastname">Lastname</label>

          <input
            type="text"
            id="lastname"
            v-model.trim="lastName.val"
            @blur="clearValidity('lastName')"
          />
        </div>
        <div class="form-fields__message">
          <small class="text-warning" v-if="!lastName.isValid">
            lastname must not be empty!
          </small>
        </div>
      </div>
      <div class="form-fields" :class="{ invalid: !description.isValid }">
        <div class="form-control">
          <label for="description">Description</label>
          <textarea
            name="description"
            id="description"
            rows="5"
            v-model.trim="description.val"
            @blur="clearValidity('description')"
          ></textarea>
        </div>
        <div class="form-fields__message">
          <small class="text-warning" v-if="!description.isValid">
            description must not be empty!
          </small>
        </div>
      </div>
      <div class="form-fields">
        <div class="form-control">
          <label for="rate" :class="{ invalid: !rate.isValid }">Hourly</label>
          <input
            type="number"
            id="rate"
            v-model.trim="rate.val"
            @blur="clearValidity('rate')"
          />
        </div>
        <div class="form-fields__message">
          <small class="text-warning" v-if="!rate.isValid"
            >Rate must be greater than 0!</small
          >
        </div>
      </div>
      <div class="form-fields" :class="{ invalid: !areas.isValid }">
        <div class="form-control row">
          <h3 id="area-title">Areas of expertise</h3>
          <div>
            <input
              type="checkbox"
              id="frontend"
              value="frontend"
              v-model="areas.val"
              @blur="clearValidity('areas')"
            />
            <label for="frontend">Frontend development</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="backend"
              value="backend"
              v-model="areas.val"
              @blur="clearValidity('areas')"
            />
            <label for="backend">Backend development</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="career"
              value="career"
              v-model="areas.val"
              @blur="clearValidity('areas')"
            />
            <label for="career">Career Advisory</label>
          </div>
          <div class="form-fields__message">
            <small class="text-warning" v-if="!areas.isValid">
              At least one area needed!
            </small>
          </div>
        </div>
      </div>
      <p class="text-warning" v-if="!formIsValid">
        Please fix above errors and submit again!
      </p>
      <base-button>Register</base-button>
    </form>
  </base-card>
</template>

<script>
export default {
  emits: ["register-coach"],
  data() {
    return {
      firstName: {
        val: "",
        isValid: true,
      },
      lastName: {
        val: "",
        isValid: true,
      },
      description: {
        val: "",
        isValid: true,
      },
      rate: {
        val: null,
        isValid: true,
      },
      areas: {
        val: [],
        isValid: true,
      },
      formIsValid: true,
    };
  },
  computed: {},
  methods: {
    // Reset Validity of each inputField to true after bluring
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;

      if (this.firstName.val === "") {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }
      if (this.lastName.val === "") {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.val === "") {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      if (!this.rate.val || this.rate.val < 0) {
        this.rate.isValid = false;
        this.formIsValid = false;
      }
      if (this.areas.val.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },
     registerCoach() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const enteredFirstName = this.firstName.val;
      const enteredLastName = this.lastName.val;
      const enteredDescription = this.description.val;
      const enteredExperties = this.areas.val;
      const enteredRate = this.rate.val;

      const registeredCoach = {
        // id: this.$store.getters.userId,
        firstName: enteredFirstName,
        lastName: enteredLastName,
        description: enteredDescription,
        areas: enteredExperties,
        hourlyRate: enteredRate,
      };
      this.$emit("register-coach", registeredCoach);
    },
    // validateForm(event){
    //   const inputElement = event.target.value;
    //   if(inputElement === ''){
    //     inputElement
    //   }

    // }
  },
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
div.form-fields {
  display: flex;
  flex-direction: column;
  width: 100%;
}
div.form-control {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 1rem;
  padding-bottom: 0.2rem;
}
div.form-fields__message {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0 1rem;
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
div.form-fields.invalid input {
  border: 1px solid red;
}
div.form-fields.invalid label {
  color: red;
}
.text-warning {
  color: black;
  font-weight: bold;
  font-family: inherit;
  margin-top: 0.5rem;
}
#area-title {
  margin-top: 0;
}
</style>
