const http = require('http')
const url = require('url')
const fs = require('fs')
const mime = require('mime')
const {join} = require('path')

const basePath = join(__dirname, 'public')

const conf = {
    PORT: 3333
}

const server = http.createServer((request, response) => {
    const {url: reqUrl} = request
    const {pathname} = url.parse(reqUrl, true)
    const absPath = join(basePath, pathname)

    fs.stat(absPath, (err, stats) => {
        if (err) {
            response.statusCode = 404
            response.end('Not found ~')
            return
        }

        if (stats.isFile()) {
            fs.readFile(absPath, (err, fd) => {
                if (err) {
                    response.statusCode = 404
                    response.end('Not found ~')
                }
                response.setHeader('Content-Type', mime.getType(absPath))
                response.end(fd)
            })
        } else if (stats.isDirectory()) {
            const realPath = join(absPath, 'index.html')
            fs.access(realPath, 'r', (err, fd) => {
                if (err) {
                    response.statusCode = 404
                    response.end('Not found ~')
                } else {
                    fs.readFile(realPath, (err, fd) => {
                        if (err) {
                            response.statusCode = 404
                            response.end('Not found ~')
                        }
                        response.setHeader('Content-Type', mime.getType(realPath))
                        response.end(fd)
                    })
                }
            })
        } else {
            response.statusCode = 404
            response.end('Not found ~')
        }
    })
})

server.listen(conf.PORT, () => {
    console.log(`the server is running on ${conf.PORT}`)
})