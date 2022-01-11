<template>
  <header class="main-header">
    <nav class="main-header__nav">
      <h1 class="main-header__title">
        <router-link to="/">Find a coach</router-link>
      </h1>
      <ul class="main-header__links">
        <li class="main-header__link" v-for="item in links" :key="item.title">
          <router-link  :to="item.link">{{ item.title }}</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script>
export default {
  data() {
    return {
      links: [
        { title: "All Coaches", link: "/coaches" },
        { title: "Requests", link: "/request" },
        { title: "Login", link: "/login" },
      ],
    };
  },
};
</script>

<style scoped>
header.main-header {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 5rem;
  background-color: rgb(67 0 106);
  padding: 2rem;
}
.main-header a{
    text-decoration:none;
    padding: 0.75rem 1.5rem;
    border: 1px solid transparent;
    color:#f391e3;
}
.main-header__nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.main-header__title {
  padding: 0;
}
.main-header__title a{
    color:white;
}
.main-header__links {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 2rem ;
}
.main-header__link{
    list-style-type: none;
    margin-right: 2rem;
    
    /* border: 2px solid #f79fff; */
    
}

a:active,
a:hover,
a.router-link-active{
    border: 1px solid #f391e3 ;
   
}

</style>
