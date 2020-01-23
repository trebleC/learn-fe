# http 缓存笔记

> Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 这个版本的 Chrome 的缓存逻辑应该是有 bug, 使用的是 Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:72.0) Gecko/20100101 Firefox/72.0 版本的 Firefox

## Last-Modified / If-Modified-Since

- 请求初次到达后端设置响应头 Last-Modified 为文件最后一次修改的时间
- 下次请求时浏览器自动携带请求头 If-Modified-Since 值为上次访问相同路径资源(包括 path + search...不含 hash)时返回的 Last-Modified 字段的值
- 后端判断
  - 如果请求头 If-Modified-Since 为文件当前的最后修改时间时, 返回 304
  - 如果没有 If-Modified-Since 请求头 OR 请求头和文件当前的最后修改时间不一致正常返回文件, 并携带响应头 Last-Modified 为新的最后更新时间
- 结束

PS: 如果文件设置了 Last-Modified, 下次访问时会命中浏览器默认的强缓存策略(浏览器来自上方说的 bug 版本浏览器 Chrome)
1. 没有关闭浏览器在当前页面刷新重新获取该图片的话返回 statusCode 为 200, Size tab 展示内容来自 memory cache
2. 没有关闭浏览器在当前页面刷新重新获取该图片的话返回 statusCode 为 200, Size tab 展示内容来自 disk cache
3. 关闭浏览器再打开当前 url index.html 甚至都会命中强缓存 statusCode 为 200, Size tab 展示内容来自 disk cache
