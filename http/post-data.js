const http = require('http')

const conf = {
    PORT: 3000
}

const app = http.createServer((request, response) => {
    const { method }  = request
    if (method === 'POST') {
        const dataArr = []
        request.on('data', chunk => {
            dataArr.push(chunk)
        })

        request.on('end', () => {
            const data = Buffer.concat(dataArr).toString()

            response.end(data)
        })

    } else {
        response.end('hello world ~')
    }

})

app.listen(conf.PORT, () => {
    console.log(`the Server is listening on ${conf.PORT}`);
})