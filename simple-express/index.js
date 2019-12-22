const {createServer} = require('http')
const url = require('url')
const methods = require('methods')

const application = () => {
    const routes = []

    let app = (req, res) => {
        const {pathname} = url.parse(req.url)
        const method = req.method.toLowerCase()

        for (let i = 0, len = routes.length; i < len; i++) {
            const {handler, path, method: mtd} = routes[i]

            if (path.params) {
                const matches = pathname.match(path)
                if (matches) {
                    const [, ...lists] = matches
                    const params = path.params.reduce((memo, curItem, idx) => (memo[curItem] = lists[idx] ,memo), {})
                    req.params = params
                    return handler(req, res)
                }
            }

            if (
                // 如果当前的请求路劲和预制的路由的路径相等或者预制了所有路径路由
                (path === pathname || path === '*')
                // 查看请求方法
                && mtd === method
                || mtd === 'all'
            ) {
                return handler(req, res)
            }
        }

        res.writeHead(404)
        res.end('404')
    }

    ['all', ...methods].forEach(method => {
        app[method] = (path, handler) => {

            if (path.includes(':')) {
                const params = []
                path = path.replace(/:([^ \/]*)/g, (...args) => {
                    const [, aramName] = args
                    params.push(aramName)
                    return '([^ \/]*)'
                })

                path = new RegExp(path)
                path.params = params
            }

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

