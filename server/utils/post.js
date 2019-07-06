const REMOTE_API_BASE_URL = require('../conf/index')
const request = require('superagent')

const post = async (ctx, { url, params }) => {
    const resp = await request
        .post(REMOTE_API_BASE_URL + url)
        .set('x-access-token', ctx.session.token ? ctx.session.token : '')
        .send(params)
    return resp.body
}

module.exports = post