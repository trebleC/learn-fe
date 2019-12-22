const {createServer} = require('http')
const url = require('url')
const methods = require('methods')

const application = () => {
    const routes = []

    let app = (req, res) => {
        let idx = 0
        const {pathname} = url.parse(req.url)
        const method = req.method.toLowerCase()
        const next = () => {
            if (idx === routes.length) {
                res.statusCode = 404;
                res.end('404')
                return
            }

            const {handler, path, method: mtd} = routes[idx++]
            // 中间件
            if (mtd === 'middleware') {
                if (
                    // 所有路径可用
                    // eg: app.use((req, res, next) => {next()})
                    // eg: app.use('/', (req, res, next) => {next()})
                    path === '/'
                    // 完整匹配
                    // eg: app.use('/user'(req, res, next) => {next()})
                    //   -> http invoke http.get('/user')
                    || pathname === path
                    // 以一段开头
                    // eg: app.use('/user'(req, res, next) => {next()})
                    //   -> http invoke http.get('/user/quanquan')
                    // 后边加一个斜杠的原因是为了解决
                    //  -> http invoke http.get('/usersuper/balabala') 这样的问题
                    || pathname.startsWith(`${path}/`) ) {

                    handler(req, res, next)
                } else {
                    next()
                }
            } else {
                for (let i = 0, len = routes.length; i < len; i++) {
                    const {handler, path, method: mtd} = routes[i]
                }
                // 路由
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

                // 路由没有匹配到直接 next
                next()
            }
        }

        next()
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

                path = new RegExp(`^${path}$`)
                path.params = params
            }

            const layer = {
                path, handler, method
            }

            routes.push(layer)
        }
    })

    app.use = (path, handler = path) => {
        // 重载 path 参数
        if (typeof path === 'function') {
            path = '/'
        }

        const layer = {
            method: 'middleware',
            path,
            handler
        }

        routes.push(layer)
    }

    app.listen = (...args) => {
        createServer(app).listen(...args);
    }

    return app
}

module.exports = application

