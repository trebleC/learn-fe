const Koa = require('koa')
const KoaRouter  =require('koa-router')
const KoaStatic = require('koa-static')
const conf = {
    PORT: 3333
}

const app = new Koa()
const router = new KoaRouter()
app.use(KoaStatic(__dirname))

app.use(router.routes(), router.allowedMethods())
app.listen(conf.PORT, () => {
    console.log(`the server is listening on ${conf.PORT}`)
})
