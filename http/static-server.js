const http = require('http')
const url = require('url')
const fs = require('fs')
const mime = require('mime')
const {join} = require('path')

const basePath = join(__dirname, 'public')

const conf = {
    PORT: 3333
}

const readFile = (filePath, response) => {
    fs.readFile(filePath, (err, fd) => {
        if (err) {
            response.statusCode = 404
            response.end('Not found ~')
            return
        }

        response.setHeader('Content-Type', mime.getType(filePath))
        response.end(fd)
    })
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
            readFile(absPath, response)
        } else if (stats.isDirectory()) {
            const realPath = join(absPath, 'index.html')
            fs.access(realPath, 'r', (err, fd) => {
                if (err) {
                    response.statusCode = 404
                    response.end('Not found ~')
                } else {
                    readFile(realPath, response)
                }
            })
        }
    })
})

server.listen(conf.PORT, () => {
    console.log(`the server is running on ${conf.PORT}`)
})