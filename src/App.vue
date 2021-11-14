<template>
  <div class="wrapper" id="wrapper">
    <Header/>

    <main class="container" id="container">
      <router-view/>
    </main>

    <Footer/>
  </div>
</template>

<script>
import Header from "@/views/layout/Header.vue";
import Footer from "@/views/layout/Footer.vue";

export default {
  components: {
    Header,
    Footer
  }  
}
</script>

<style lang="scss">
// 
</style>


  <!-- <router-link to="/">Home</router-link> | -->