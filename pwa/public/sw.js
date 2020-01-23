const CACHE_NAME = 'cache-v1'
const CACHE_LIST = [
    '/',
    '/css/index.css',
    '/js/app.js',
    '/api/getImage'
]

const handleCache = () => caches.open(CACHE_NAME).then(cache => cache.addAll(CACHE_LIST))

self.addEventListener('fetch', e => {
    console.log(e.request.url)
})

// sw.js 文件更新后的下次刷新进行安装
self.addEventListener('install', e => {
    // 如果前一个 sw 不销毁需要手动 skipWaiting
    console.log(`当前时间 ${Date.now()}: 代码走到了这里 install`)
    e.waitUntil(handleCache())
})

// 当前的 sw 激活的时候触发
// 初次加载 sw 文件时会自动触发激活的方法
// install 方法中触发 skipWaiting
// 用户手动点击 skipWaiting 的时候会触发这个方法
// 浏览页面的过程中更新了 sw 文件, 关闭页面再打开新的页面会跳过这个方法直接进入激活状态
self.addEventListener('activate', () => {
    console.log(`当前时间 ${Date.now()}: 代码走到了这里 activate`)
})

