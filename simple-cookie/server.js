const http = require('http')
const querystring = require('querystring')
const url = require('url')
const PORT = 3333

http.createServer((request, response) => {
    const {pathname} = url.parse(request.url)

    const cookieArr = []
    response.setCookie = (k, v, opt) => {
        cookieArr.push(`${k}=${v}`)
        for (let key in opt) {
            cookieArr[cookieArr.length - 1] += `; ${key}=${opt[key]}`
        }

        // 利用多次设置 Set-Cookie 响应头以最后一次为准, 设置所有 cookie
        response.setHeader('Set-Cookie', cookieArr)
    }

    request.getCookie = key => {
        const {cookie} = request.headers
        const {[key]: value = ''} = querystring.parse(cookie, '; ')
        return value
    }

    switch (pathname) {
        case '/get': case '/get/2': case '/get2':
            response.end(request.getCookie('name'))
            break
        case '/set':

            response.setCookie('name', 'quanquan', {
                domain: 'quanquan.com',
                path: '/'
            })

            response.setCookie('age', '18', {
                ['max-age']: '10',
                httpOnly: true
            })

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