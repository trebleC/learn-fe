const http = require('http')
const querystring = require('querystring')
const url = require('url')
const PORT = 3333

http.createServer((request, response) => {
    const {pathname} = url.parse(request.url)

    switch (pathname) {
        case '/get': case '/get/2': case '/get2':
            const {cookie} = request.headers
            const cookieObj = querystring.parse(cookie, '; ')
            response.end(JSON.stringify(cookieObj))
            break
        case '/set':
            response.setHeader('Set-Cookie', [
                'name=quanquan; domain=quanquan.com; path=/get',
                'age=18; max-age=10; httpOnly=true;'
            ])
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