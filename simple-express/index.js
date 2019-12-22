const {createServer} = require('http')
const url = require('url')
const methods = require('methods')

const application = () => {
    const routes = []

    let app = (req, res) => {
        const {pathname} = url.parse(req.url)
        const method = req.method.toLowerCase()

        const curLayer = routes.find(handler => handler.method === method && handler.path === pathname)

        if (curLayer) {
            curLayer.handler(req, res)
        } else {
            res.writeHead(404)
            res.end('404')
        }
    }

    methods.forEach(method => {
        app[method] = (path, handler) => {
            const layer = {
                path, handler, method
            }

            routes.push(layer)
        }
    })

    app.get = (path, handler) => {
        const layer = {
            path, handler, method: 'get'
        }

        routes.push(layer)
    }

    app.listen = (...args) => {
        createServer(app).listen(...args);
    }

    return app
}

module.exports = application

