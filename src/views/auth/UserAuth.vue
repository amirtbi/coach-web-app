<template>
  <div>
    <base-modal title="Authenticating..." v-if="isLoading">
      <base-spinner></base-spinner>
    </base-modal>
    <base-modal
      title="An error occured..."
      v-if="!!error"
      :description="error"
      @closeHandler="closeModal"
    >
    </base-modal>
    <base-card>
      <form
        v-if="!isLoggedIn"
        class="form-container"
        @submit.prevent="submitForm"
      >
        <div class="title-container">
          <h1 id="title">Login</h1>
          <small v-if="!formIsValid" id="warning-error"
            >Please check your netry</small
          >
        </div>

        <div class="form-controls">
          <label for="username">E-mail</label>
          <input
            type="email"
            id="email"
            v-model.trim="email"
            placeholder="name@email.com"
          />
        </div>
        <div class="form-controls">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <div class="actions">
          <base-button id="submit">{{ submitButtonCaption }}</base-button>
          <base-button @click="switchAuthMode" type="flat">{{
            switchModeButtonCaption
          }}</base-button>
        </div>
      </form>
      <div v-else>
        <h3>User Loggedin successfully</h3>
        <p id="token">Logged token id:{{ $store.getters.userId }}</p>
        <base-button @click="logout">Logout</base-button>
      </div>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      mode: "login",
      formIsValid: true,
      isLoading: false,
      error: null,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    submitButtonCaption() {
      if (this.mode === "login") {
        return "Login";
      } else {
        return "Signup";
      }
    },
    switchModeButtonCaption() {
      if (this.mode === "login") {
        return "Signup instead";
      } else {
        return "Login instead";
      }
    },
  },
  methods: {
    closeModal() {
      this.isLoading = false;
      this.error = null;
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/coaches");
    },
    async submitForm() {
      this.formIsValid = true;
      // Checking entered values
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;
      // Sending http request
      const userEntry = {
        email: this.email,
        password: this.password,
        mode: this.mode,
      };
      try {
        if (this.mode === "login") {
          await this.$store.dispatch("login", userEntry);
        } else {
          ///
          await this.$store.dispatch("signup", userEntry);
        }
        // Redirect whether user is logged for new coach or not
        const redirectUrl = "/" + (this.$route.query.redirect || "coaches");
        console.log("redirected", redirectUrl);
        this.$router.push(redirectUrl);
      } catch (err) {
        console.log("Error", err.message);
        this.error = err.message || "Failed to authenticate";
      }
      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else if (this.mode === "signup") {
        this.mode = "login";
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
p#token {
  word-break: break-all;
}
#title {
  text-align: center;
  letter-spacing: 2px;
}
#warning-error {
  font-size: 1rem;
  color: red;
  margin-left: 1.2rem;
}
/* Animation */
.fade-enter-from {
  opacity: 0;
  transform: translateY(-100px);
}
.fade-enter-active {
  transition: all 1s ease-in-out;
}
.fade-enter-to {
  opacity: 1;
  transform: translateY(0px);
}
</style>
