<template>
  <transition name="fade-in">
    <section>
      <base-modal
        @closeHandler="close"
        v-if="!!error"
        :description="error"
        title="An error occured"
      >
      </base-modal>
      <header>
        <base-card>
          <h1>List of your requests</h1>
        </base-card>
      </header>
      <article>
        <base-card>
          <div v-if="isLoading" class="spinner-container">
            <base-spinner></base-spinner>
          </div>
          <ul v-else-if="!isLoading && hasRequests">
            <!-- request-item component -->
            <request-item
              v-for="request in requests"
              :key="request.id"
              :request="request"
            ></request-item>
          </ul>
          <h4 v-else>You have not any requests yet!</h4>
        </base-card>
      </article>
    </section>
  </transition>
</template>

<script>
import RequestItem from "../../components/requests/requestItem.vue";
export default {
  components: {
    RequestItem,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  mounted() {
    this.show = true;
  },
  methods: {
    async loadMessage() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("request/loadRequests");
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },
    close() {
      this.error = null;
      this.isLoading = false;
    },
  },
  created() {
    this.loadMessage();
  },
  computed: {
    requests() {
      // return this.$store.getters["request/receivedMessages"];
      return this.$store.getters["request/receivedMessages"];
    },
    hasRequests() {
      return this.$store.getters["request/hasRequest"];
    },
  },
};
</script>

<style scoped>
div.card-container {
  width: 800px;
  margin-bottom: 0;
}
div.spinner-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
}
h1 {
  font-size: 1.5rem;
  text-align: center;
}

h4 {
  font-size: 1rem;
  text-align: center;
}

ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 100%;
}

h4 {
  font-size: 0.75rem;
  font-family: inherit;
  color: black;
  font-weight: bold;
  padding: 0;
  margin: 0;
  margin-bottom: 0.2rem;
}
p#modal-text {
  font-size: 1.2rem;
  color: #defaff;
  font-family: inherit;
  margin: 0;
  padding: 0.5rem 1rem;
  text-align: justify;
}

.fade-in-enter-from {
  opacity: 0;
  transform: translateX(-100px);
}

.fade-in-enter-active {
  transition: all 1s ease-in-out;
}
.fade-in-enter-to {
  opacity: 1;
  transform: translateX(0);
}
</style>
