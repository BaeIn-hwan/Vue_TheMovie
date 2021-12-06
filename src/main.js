import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Swiper from 'swiper';
import VueLazyload from 'vue-lazyload'

// scss 파일 사용방법
// import '@/assets/scss/_styles.scss'

// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* 필요한 아이콘 solid 쪽에 추가 후 아래 library 안에 추가 */
library.add(faUserSecret, faPlus, faXmark);

import AlertComponent from "@/components/AlertComponent.vue";
import ModalComponent from "@/components/ModalComponent.vue";
import ListItemComponent from "@/components/ListItemComponent.vue";
import SlideItemComponent from "@/components/SlideItemComponent.vue";
import PaginationComponent from "@/components/paginationComponent.vue";

// lazyload
Vue.use(VueLazyload, {
  preLoad: 1,
  error: require("@/assets/images/common/img_comm_no-image.jpg"),
  loading: require("@/assets/images/common/ico_comm_loading.gif"),
  attempt: 1
})

// font-awesome 
Vue.component('font-awesome-icon', FontAwesomeIcon);

// common
Vue.component("AlertComponent", AlertComponent);
Vue.component("ModalComponent", ModalComponent);
Vue.component("ListItemComponent", ListItemComponent);
Vue.component("SlideItemComponent", SlideItemComponent);
Vue.component("PaginationComponent", PaginationComponent);


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
