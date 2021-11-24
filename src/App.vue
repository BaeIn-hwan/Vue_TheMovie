<template>
  <div class="wrapper" id="wrapper">
    <Header/>

    <main class="container" id="container">
      <router-view/>
    </main>

    <Footer/>

    <AlertComponent :message="alert.msg" v-if="alert.isOpen" @alert-close="alertClose()" />
    <!-- <ModalComponent :width="modal.width" :height="modal.height" v-if="modal.isOpen" @modal-close="modal.isOpen = false"> -->
  </div>
</template>

<script>
import EventBus from "@/eventBus/index.js"
import Header from "@/views/layout/Header.vue";
import Footer from "@/views/layout/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      alert: {
        isOpen: false,
        msg: ""
      },
      
    }
  },
  mounted () {
    EventBus.$on("open-alert", this.alertOpen);
    
  },
  methods: {
    
    /*
    @ params
      payload: Obejct

      커스텀 alert 함수
    */
    alertOpen(payload) {
      this.alert.isOpen = payload.isOpen;
      this.alert.msg = payload.msg;
    },
    alertClose() {
      this.alert.isOpen = false;
      this.alert.msg = "";
    }
  }
}
</script>

<style lang="scss">
// 
</style>


  <!-- <router-link to="/">Home</router-link> | -->