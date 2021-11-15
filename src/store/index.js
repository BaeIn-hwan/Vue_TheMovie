import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseURL: "//api.themoviedb.org/3",
    imgURL: "https://image.tmdb.org/t/p",
    apiKey: "4e9b730dfa3a8151bfa85efa7f4685b1",
  },
  getters: {

  },
  actions: {
    /*
      @params
        {} : Object
        payload : Object

      @comment: API 요청 함수
    */
    async requestMethod({state, dispatch}, payload) {
      const {header, method, url, data} = payload;
      let getParams;

      if (method.toLocaleUpperCase() == "GET") {
        getParams = await dispatch("convertGetData", data);
      }

      try {
        const requestParams = {
          method: method,
          header: header ? header : {},
          url: `${state.baseURL}${url}?${'api_key='+ state.apiKey}${method.toLocaleUpperCase() == "GET" ? getParams : ""}`,
          data: data ? await dispatch("convertFormData", data) : null,
        };
  
        const response = await axios(requestParams);
        
        if (response && response.status && response.status == 200) {
          return response;
        }
        else {
          throw ({message: response.status_message});
        }
      }
      catch(e) {
        console.error("network error", e);
        const response = e.response;

				throw({
					status: response ? response.status : e.status,
					message: response && response.data ? e.response.data.status_message: e.status_message,
				});
      }
    },

    /*
      @params
        store: Object
        datas: Object

      @comment: FormData 객체를 만들어 key/value 데이터 형태로 만들기 위한 함수
    */
    convertFormData(store, datas) {
      const formData = new FormData();

      for (let key in datas) {
        formData.append(key, datas[key]);
      }

      return formData;
    },

    /*
      @params
        store: Object
        datas: Object

      @comment: Method가 GET방식인 경우 URL 뒤에 파라미터 형태로 변경하기 위한 함수
    */
    convertGetData(store, datas) {
      let getParams = "";

      for (let data in datas) {
        getParams += `&${data}=${datas[data]}`
      }

      return getParams;
    }
  },

  mutations: {
    
  },
  
  modules: {
  }
})
