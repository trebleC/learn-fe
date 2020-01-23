const http = require('http')
const fs = require('fs')
const path = require('path')
const mime = require('mime')
const url = require('url')
const PORT = 3333

const renderFile = (filePath, response) => {
    response.setHeader('Content-Type', mime.getType(filePath))
    fs.createReadStream(filePath).pipe(response)
}

const render404 = response => {
    response.statusCode = 404
    response.end('Not found')
}

const render304 = response => {
    response.statusCode = 304
    response.end('Not Modified')
}

http.createServer((request, response) => {
    const {pathname} = url.parse(request.url)
    const {headers: {['if-modified-since']: lastModifiedTime}} = request

    const filePath = path.join(__dirname, pathname)
    fs.stat(filePath, (err, st) => {
        if (err) {
            return void(render404(response))
        }

        if (st.isFile()) {
            // html 文件不走缓存判断直接返回
            if (path.extname(filePath) === '.html') {
                return void(renderFile(filePath, response))
            }

            // Last-Modified 相关逻辑
            const mtime = st.mtime.toGMTString()
            response.setHeader('Last-Modified', mtime)
            if (lastModifiedTime === mtime) {
                return void(render304(response))
            }

            renderFile(filePath, response)
        } else {
            render404(response)
        }
    })
}).listen(PORT, () => {
    console.log(`the server is listening on ${PORT}`)
})
