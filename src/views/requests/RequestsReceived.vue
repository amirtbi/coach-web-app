<template>
  <section>
    <header>
      <base-card>
        <h1>List of your requests</h1>
      </base-card>
    </header>
    <article>
      <base-card>
        <base-spinner v-if='isLoading'></base-spinner>
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
</template>

<script>
import RequestItem from "../../components/requests/requestItem.vue";
export default {
  components: {
    RequestItem,
  },
  data() {
    return {
      isLoading:true
      //   name: "image2.jpg",
    };
  },
  methods: {
    async loadMessage(){
      this.isLoading = true;
      try{
        await this.$store.dispatch('request/loadRequests')
      }
      catch(error){
        console.log('error message :',error.message);
      }
      this.isLoading = false;
    }
  },
  created() {
    this.loadMessage();
    
  },
  computed: {
    requests() {
      // return this.$store.getters["request/receivedMessages"];
      return this.$store.getters['request/receivedMessages']
    },
    hasRequests() {
      return this.$store.getters["request/hasRequest"];
    },
    // activeCoach(){
    //     const activeCoach = this.$store.getters.activeCoach;
    //     const requests =  this.$store.getters["request/receivedMessages"];
    //     for(let request of requests){
    //         if(request.coachId === activeCoach){
    //             return true
    //         }
    //         return;
    //     }

    // }
  },
};
</script>

<style scoped>
div.card-container {
  width: 400px;
  margin-bottom: 0;
}
h1,
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
</style>
