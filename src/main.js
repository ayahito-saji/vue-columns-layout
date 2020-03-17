import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import Sample from './components/Sample'
import Sample2 from './components/Sample2'

Vue.prototype.$columns_layout = {
  pages: {
    Sample,
    Sample2
  }
}

new Vue({
  render: h => h(App),
}).$mount('#app')
