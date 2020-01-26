import createApp from './src/app'

export default context => new Promise(resolve => {
    const { app, router } = createApp()
    const { url } = context
    // 路由跳转
    router.push(url)

    router.onReady(() => {
        resolve(app)
    })
})


