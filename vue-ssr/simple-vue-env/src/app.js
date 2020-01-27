import Vue from 'vue'
import App from './App.vue'
import createRouter from './router/index'
import createStore from './store/index'

export default () => {
    const router = createRouter()
    const store = createStore()

    const app = new Vue({
        store,
        router,
        render: h => h(App)
    })

    return { app, router }
}
