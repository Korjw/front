import Vue from 'vue'
import App from './App.vue'
import './tailwind.css'
import router from './routes.js'
import VueRouter from 'vue-router';
import DatePicker from 'v-calendar/lib/components/date-picker.umd'

Vue.use(VueRouter);

Vue.config.productionTip = false;

Vue.component('date-picker', DatePicker)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
