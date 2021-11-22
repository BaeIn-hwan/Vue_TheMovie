import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Swiper from 'swiper';

// css
import '@/assets/scss/_styles.scss'

// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* 필요한 아이콘 solid 쪽에 추가 후 아래 library 안에 추가 */
library.add(faUserSecret, faPlus, faXmark);


import AlertComponent from "@/components/AlertComponent.vue";
import ModalComponent from "@/components/ModalComponent.vue";



// font-awesome 
Vue.component('font-awesome-icon', FontAwesomeIcon);

// common
Vue.component("AlertComponent", AlertComponent);
Vue.component("ModalComponent", ModalComponent);

Vue.prototype.Swiper = Swiper;
Vue.config.productionTip = false;
/*
  @ 전역 인스턴스 생성 방법
  Vue.prototype.AppName = Appname;
*/

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
