export default {
    async register({ axios, params }) {
        return await axios.$post('api/user/register', params)
    },
    async login({ axios, params }) {
        return await axios.$post('user/login', params)
    },
    async exit({ axios }) {
        return await axios.$post('user/exit')
    },
    async doPraise({ axios, params }) {
        return await axios.$post('api/user/doPraise', params)
    },
    async createArticleComment({ axios, params }) {
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
    },
    async getBook({ axios, params }) {
        return await axios.$post('api/user/getBook', params)
    },
    async getBooks({ axios, params }) {
        return await axios.$post('api/user/getBooks', params)
    },
    async getOwnBooks({ axios, params }) {
        return await axios.$post('api/user/getOwnBooks', params)
    },
    async createBook({ axios, params }) {
        return await axios.$post('api/user/createBook', params)
    },
    async updateBook({ axios, params }) {
        return await axios.$post('api/user/updateBook', params)
    },
    async deleteBook({ axios, params }) {
        return await axios.$post('api/user/deleteBook', params)
    },
    async checkAuth({ axios, params }) {
        return await axios.$post('api/user/checkAuth', params)
    }
}