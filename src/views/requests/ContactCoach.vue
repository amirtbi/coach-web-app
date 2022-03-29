<template>
  <transition name="fade-in">
    <form v-if="show" @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">Your E-Mail</label>
        <input
          type="email"
          id="email"
          placeholder="name@email.com"
          v-model.trim="email"
        />
      </div>
      <div class="form-control">
        <label for="message">Your message</label>
        <textarea rows="5" id="message" v-model.trim="message"></textarea>
      </div>
      <p class="text-warning" v-if="!formIsValid">Please check your entry</p>
      <p class="text-warning" v-if="!!error">{{ error }}</p>
      <div class="actions">
        <base-button>Send Your Message</base-button>
      </div>
    </form>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      message: "",
      formIsValid: true,
      error: null,
      contactIsOpened: false,
      show: false,
    };
  },

  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.message === ""
      ) {
        this.formIsValid = false;
        return;
      }

      const submittedMessage = {
        email: this.email,
        message: this.message,
        coachId: this.$route.params.id,
      };

      try {
        await this.$store.dispatch("request/addMessage", submittedMessage);
      } catch (error) {
        this.error = error.message || "Please try again";
      }

      if (this.$store.getters.isAuthenticated) {
        this.$router.push({ path: "/coaches" });
      }
    },
  },

  mounted() {
    this.show = true;

    console.log(this.$router);
  },
};
</script>
<style scoped>
div.form-control {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}
div.actions {
  margin-top: 1rem;
}
div.form-control input,
textarea {
  width: 100%;
  border: 1px solid #adadad;
  padding: 0.5rem 1rem;
  border-radius: 12px;
}
label {
  font-weight: bold;
  font-family: inherit;
  margin-bottom: 1rem;
  margin-top: 1rem;
}
.text-warning {
  color: orangered;
  font-weight: bold;
}

.fade-in-enter-from {
  opacity: 0;
  transform: translateY(-100px);
}
.fade-in-enter-active {
  transition: all 1s ease-in;
}
.fade-in-enter-to {
  opacity: 1;
  transform: translateY(0px);
}
</style>
