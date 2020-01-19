const url = require('url')
const http = require('http')
const { join } = require('path')
const fs = require('mz/fs')
const mime = require('mime')

const basePath = join(__dirname)

class Server {
    constructor(port) {
        this.port = port || 3333
    }

    async handleRequest(request, response) {
        const { pathname } = url.parse(request.url, true)
        let absPath = join(basePath, pathname)

        let { method, headers: { origin } } = request
        method = method.toLowerCase()

        // 发送页面 *.html 请求的时候不会携带 origin 请求头, 不用设置跨域
        if (origin) {
            response.setHeader('Access-Control-Allow-Origin', origin)
            response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
            response.setHeader('Access-Control-Allow-Headers', 'token')
            // 预检请求的有效时间, 单位是秒. 默认值为 5
            response.setHeader('Access-Control-Max-Age', 10)
            response.setHeader('Access-Control-Allow-Credentials', true)
        }

        if (method === 'options') {
            return void (response.end())
        }

        switch (pathname) {
            case '/user':
                if (method === 'get') {
                    response.setHeader('Content-Type', 'application/json')
                    response.end(JSON.stringify({ name: 'quanquan', method: 'get' }))
                }

                if (method === 'put') {
                    response.setHeader('Content-Type', 'application/json')
                    response.end(JSON.stringify({ name: 'quanquan', method: 'put' }))
                }
                break;
            default:
                break;
        }
        try {
            const statusObj = await fs.stat(absPath)

            if (statusObj.isDirectory()) {
                absPath = join(absPath, 'index.html')
            }

            await fs.access(absPath)

            this.renderFile(absPath, response)
        } catch (error) {
            this.renderError(response)
        }
    }

    renderFile(absPath, response) {
        response.setHeader('Content-Type', mime.getType(absPath))
        fs.createReadStream(absPath).pipe(response)
    }

    renderError(response) {
        response.statusCode = 404
        response.end('Not found~')
    }

    start() {
        const server = http.createServer(this.handleRequest.bind(this))
        server.listen(this.port, () => {
            console.log(`the server is running on ${this.port}`)
        })
    }
}

new Server().start()