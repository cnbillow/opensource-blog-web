const post = require('../utils/post')

const api = {
    login: async (ctx, params = {}) => {
        return await post(ctx, {url: '/api/user/login', params})
    },
    profile: async (ctx, params = {}) => {
        return await post(ctx, {url: '/api/user/profile', params})
    }
}

module.exports = api