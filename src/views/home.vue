<template>
    <the-header></the-header>
    <h1>{{this.$store.state.message}}</h1>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
}
</script>

<style scoped>
    h1{
        color:purple;
        font-size: 2rem;
        font-weight: bold;
        letter-spacing: 5px;
    }
</style>