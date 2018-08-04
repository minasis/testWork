import Vue from 'vue'
import App from './App.vue'
import 'expose-loader?$!expose-loader?jQuery!jquery'

new Vue({
  el: '#app',
  render: h => h(App)
})
