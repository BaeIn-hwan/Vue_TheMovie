<template>
  <div class="wrapper" id="wrapper">
    <Header/>

    <main class="container" id="container">
      <router-view/>
    </main>

    <Footer/>

    <AlertComponent v-if="alert.isOpen" :message="alert.msg" @alert-close="alert.isOpen = false" />
  </div>
</template>

<script>
import EventBus from "@/eventBus/index.js"
import Header from "@/views/layout/Header.vue";
import Footer from "@/views/layout/Footer.vue";
import AlertComponent from "@/components/AlertComponent.vue";

export default {
  components: {
    Header,
    Footer,
    AlertComponent
  },
  data() {
    return {
      alert: {
        isOpen: false,
        msg: ""
      }
    }
  },
  mounted () {
    EventBus.$on("open-alert", this.alertOpen);
  },
  methods: {
    
    /*
    @ params
      payload: Obejct

      alertDialog 호출 함수
    */
    alertOpen(payload) {
      this.alert.isOpen = payload.isOpen;
      this.alert.msg = payload.msg;
    }
  }
}
</script>

<style lang="scss">
// 
</style>


  <!-- <router-link to="/">Home</router-link> | -->