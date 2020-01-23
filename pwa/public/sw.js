self.addEventListener('fetch', e => {
    console.log(`当前时间 ${Date.now()}: debug 的数据是 e.request.url: `, e.request.url)
})