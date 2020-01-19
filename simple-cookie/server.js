const http = require('http')
const querystring = require('querystring')
const url = require('url')
const PORT = 3333

http.createServer((request, response) => {
    const {pathname} = url.parse(request.url)

    switch (pathname) {
        case '/get':
            const {cookie} = request.headers
            const cookieObj = querystring.parse(cookie, '; ')
            response.end(JSON.stringify(cookieObj))
            break
        case '/set':
            response.setHeader('Set-Cookie', 'name=quanquan')
            response.end('success ~')
            break
        default:
            response.setHeader('Content-Type', 'text/html')
            response.end(`
                <h1>welcome to debug my code ~</h1>
                <a href="/set">to Set</a>
                <a href="/get">to Get</a>
            `)
            break
    }
}).listen(PORT, () => {
    console.log(`the server is listen on ${PORT}`)
})