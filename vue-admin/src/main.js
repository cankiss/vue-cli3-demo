import Vue from 'vue'
import App from './App.vue'
import router from './router'

import {
    setDocumentTitle,
    wxOverflow,
    jumper
} from '@/utils/tools';

Vue.use(wxOverflow)
Vue.prototype.$setTitle = setDocumentTitle
Vue.prototype.$jumper = jumper

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')