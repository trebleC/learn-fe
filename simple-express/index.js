const {createServer} = require('http')
const url = require('url')
const methods = require('methods')

const application = () => {
    const routes = []

    let app = (req, res) => {
        const {pathname} = url.parse(req.url)
        const method = req.method.toLowerCase()

        const curLayer = routes.find(handler =>
            // 如果当前的请求路劲和预制的路由的路径相等或者预制了所有路径路由
            (handler.path === pathname || handler.path === '*')
            // 查看请求方法
            && handler.method === method
            || handler.method === 'all'
        )

        if (curLayer) {
            curLayer.handler(req, res)
        } else {
            res.writeHead(404)
            res.end('404')
        }
    }

    ['all', ...methods].forEach(method => {
        app[method] = (path, handler) => {
            const layer = {
                path, handler, method
            }

            routes.push(layer)
        }
    })

    app.listen = (...args) => {
        createServer(app).listen(...args);
    }

    return app
}

module.exports = application

