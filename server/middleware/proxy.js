const post = require('../utils/post')


module.exports = app => {
    app.use(async (ctx, next) => {
        if (ctx.url.indexOf('/api/') >= 0) {
            const resp = await post(ctx, {url: ctx.url, params: ctx.request.body})
            ctx.body = JSON.stringify(resp)
        } else {
            await next()
        }
    })

}