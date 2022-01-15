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
          v-model.trim="enteredUsername"
          placeholder="username"
        />
      </div>
      <div class="form-controls">
        <label for="username">Email</label>
        <input
          type="email"
          id="email"
          v-model.trim="enteredEmail"
          placeholder="name@email.com"
        />
      </div>
      <div class="form-controls">
        <label for="password">Password</label>
        <input type="password" id="password" v-model.trim="enteredPassword" />
      </div>
      <div class="actions">
        <base-button id="submit">LOGIN</base-button>
      </div>
    </form>
    <section>
      <div class="info-container">
        <p class="register">
          Register as a new<router-link to="/register"> Coach </router-link
          >/<router-link to="/UserSignup">User</router-link>
        </p>
      </div>
    </section>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      enteredUsername: "",
      enteredEmail: "",
      enteredPassword: "",
      userIndex: null,
    };
  },
  computed: {
    userIsValid() {
      return this.$store.getters["users/userIsValid"];
    },
    users() {
      return this.$store.getters["users/users"];
    },
  },
  created() {
    // Loading users from firebase 
    
  },
  methods: {
    
    async loadUsers(){

      const response = await axios({
        method:'GET',
        url:'https://coach-app-c1d0e-default-rtdb.firebaseio.com/users.json'
      });

      const responseDate = response.data;
      
    },

     submitForm() {
      const enteredData = {
        email: this.enteredEmail,
        username: this.enteredUsername,
        password: this.enteredPassword,
      };
      
      this.$store.dispatch("users/login", enteredData);
      // Clearing user input
      // this.enteredEmail = "";
      // this.enteredUsername = "";
      // this.enteredPassword = "";

      // if (this.userIsValid) {
      //   this.$router.push({ path: "/coaches" });
      // } else {
      //   alert("Not valid data");
      // }
    },
  },
  created() {
    this.enteredEmail = "";
    this.enteredPassword = "";
    this.enteredUsername = "";
  },
};
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}
div.form-controls {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 1.5rem;
  padding: 1rem;
}

div.form-controls > input {
  border: 1px solid #c1c1cc;
  border-radius: 10px;
  padding: 1rem;
  width: 80%;
}
input::placeholder {
  font-weight: bold;
}
label {
  font-weight: bold;
  margin-right: 1rem;
}
div.info-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
}
p.register {
  width: 100%;
  text-align: center;
  font-weight: bold;
  letter-spacing: 2px;
  font-size: 0.75rem;
}
p.register a {
  text-decoration: none;
  color: purple;
  font-weight: bold;
}
a {
  margin-left: 0.5rem;
}
p.register a:hover,
p.register a:active {
  color: orangered;
}
#title {
  text-align: center;
  letter-spacing: 2px;
}
</style>
