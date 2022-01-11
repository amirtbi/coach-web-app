<template>
  <base-card>
    <form class="form-container" @submit.prevent="submitForm">
      <div class="title-container">
        <h1 id="title">Login</h1>
      </div>
      <div class="form-controls">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          v-model="enteredUsername"
          placeholder="username"
        />
      </div>
      <div class="form-controls">
        <label for="username">Email</label>
        <input
          type="email"
          id="email"
          v-model="enteredEmail"
          placeholder="name@email.com"
        />
      </div>
      <div class="actions">
        <base-button id="submit">LOGIN</base-button>
      </div>
    </form>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      enteredUsername: "",
      enteredEmail: "",
    };
  },
  methods: {
    submitForm() {
      const enteredData = {
        email: this.enteredUsername,
        username: this.enteredEmail,
      };

      this.$store.dispatch("users/login", enteredData);
    },
  },
};
</script>


<style scoped>
.form-container{
    display: flex;
    flex-direction: column;
    width: 100%;
}
div.form-controls{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 1.5rem;
    padding: 1rem;
}

div.form-controls > input{
    border: 1px solid #c1c1cc;
    border-radius: 10px;
    padding: 1rem;
    width: 80%;


}
input::placeholder{
    font-weight: bold;

}
label{
    font-weight: bold;
    margin-right: 1rem;
}
</style>