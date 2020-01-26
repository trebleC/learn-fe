const Koa = require('koa')
const KoaRouter = require('koa-router')
const Vue = require('vue')
const vueServerRenderer = require('vue-server-renderer')

const conf = {
    PORT: 3333
}

const app = new Koa()
const router = new KoaRouter()

router.get('/', ctx => {
    const vm = new Vue({
        template: '<div>hello world~</div>'
    })

    vueServerRenderer.createRenderer()
        .renderToString(vm, (err, htmlStr) => {
            if (err) {
                ctx.statusCode = 502
                ctx.body = 'Server Error'
                return;
            }
            ctx.body = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>vue-server-renderer</title>
                </head>
                <body>
                    ${htmlStr}
                </body>
                </html>
            `
        })
})

app.use(router.routes(), router.allowedMethods())
app.listen(conf.PORT, () => {
    console.log(`the server is listen on ${conf.PORT}`)
})