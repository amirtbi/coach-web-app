<template>
    <div class="card-container">
        <slot></slot>
    </div>
</template>


<style scoped>
.card-container{
    /* box-shadow: 0px 0px 0px #c1c1c1; */
    max-width: 40rem;
    box-shadow: 0px 2px 8px #c1c1c1;
    padding:1rem;
    margin: 2rem auto;
    border-radius: 12px;
}
</style>