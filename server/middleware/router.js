const koaRouter = require('koa-router')
const api = require('../api')

const router = koaRouter()


module.exports = app => {
    router.post('/user/login', async (ctx, next) => {
        try {
            const login = await api.login(ctx, ctx.request.body)
            if (login.done) {
                ctx.session.token = login.data
                const profile = await api.profile(ctx)
                if (profile.done) {
                    ctx.body = JSON.stringify(profile)
                }
            }
            if (!login.done) {
                ctx.body = JSON.stringify(login)
            }
        } catch (e) {
            ctx.body = 'http server error'
        }
    })
    router.post('/user/exit', async (ctx, next) => {
        try {
            ctx.session.token = null
            ctx.session.user = null
            const resp = {
                done: true,
                data: []
            }
            ctx.body = JSON.stringify(resp)
        } catch (e) {
            ctx.body = 'http server error'
        }
    })
    app.use(router.routes()).use(router.allowedMethods())
}