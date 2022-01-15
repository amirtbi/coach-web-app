<template>
  <base-card>
    <form class="form-container" @submit.prevent="submitForm">
      <div class="title-container">
        <h1 id="title">Signup</h1>
      </div>
      <div class="form-controls">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          v-model.trim="enteredUserName"
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
        <base-button id="submit">Register</base-button>
      </div>
    </form>
    <div class="info-container">
      <p class="register">
        Register as a new<router-link to="/register"> Coach </router-link>
      </p>
    </div>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      enteredUserName: "",
      enteredPassword: "",
      enteredEmail: "",
      userIndex: null,
    };
  },

  computed: {
    Users() {
      return this.$store.getters["users/users"];
    },
  },

  methods: {
    checkDataEntry() {
      const users = this.Users;
      //Check user is whether new or not
      this.userIndex = users.findIndex((user) => {
        return (
          user.email === this.enteredEmail ||
          user.userName === this.enteredUserName
        );
      });
    },
    async submitForm() {
      const newUser = {
        username: this.enteredUserName,
        email: this.enteredEmail,
        password: this.enteredPassword,
      };

      if (this.userIndex < 0) {
        try {
          await this.$store.dispatch("users/registerUser", newUser);
          this.$router.push({ path: "/coaches" });
        } catch (error) {
          alert(error.message);
        }
      } else {
        console.log("The user is already has been registered!");
        this.enteredEmail = '';
        this.enteredPassword = '';
        this.enteredUserName = '';
      }
    },
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
#title {
  text-align: center;
  letter-spacing: 2px;
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
</style>
