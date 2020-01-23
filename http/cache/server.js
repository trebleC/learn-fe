const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')
const PORT = 3333


const render404 = response => {
    response.statusCode = 404
    response.end('Not found')
}

http.createServer((request, response) => {
    const {pathname} = url.parse(request.url)
    const filePath = path.join(__dirname, pathname)
    fs.stat(filePath, (err, st) => {
        if (err) {
            return void(render404(response))
        }

        if (st.isFile()) {
            fs.createReadStream(filePath).pipe(response)
        } else {
            render404(response)
        }
    })
}).listen(PORT, () => {
    console.log(`the server is listening on ${PORT}`)
})
