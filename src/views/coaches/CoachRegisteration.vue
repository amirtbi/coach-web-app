<template>
    <coach-form @register-coach="addCoach"></coach-form>
</template>

<script>
import coachForm from '../../components/Coach/coachForm.vue';
export default{
    components:{
        coachForm
    },
    data() {
        return {
            
        }
    },
    methods:{
        addCoach(data){
            this.$store.dispatch('coach/register',data);
            this.$router.push({
                path:'/coaches',
                name:'coaches-list',
            });
            
        }
    }
}
</script>