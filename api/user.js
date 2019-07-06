export default {
    async register({axios, params}) {
        return await axios.$post('api/user/register', params)
    },
    async login({axios, params}) {
        return await axios.$post('user/login', params)
    },
    async exit({axios}) {
        return await axios.$post('user/exit')
    },
    async doPraise({axios, params}) {
        return await axios.$post('api/user/doPraise', params)
    },
    async createArticleComment({axios, params}) {
        return await axios.$post('api/user/createArticleComment', params)
    },
    async createArticle({ axios, params }) {
        return await axios.$post('api/user/createArticle', params)
    },
    async getArticle({ axios, params }) {
        return await axios.$post('api/user/getArticle', params)
    },
    async getArticles({ axios, params }) {
        return await axios.$post('api/user/getArticles', params)
    },
    async deleteArticle({ axios, params }) {
        return await axios.$post('api/user/deleteArticle', params)
    },
    async updateArticle({ axios, params }) {
        return await axios.$post('api/user/updateArticle', params)
    }
}