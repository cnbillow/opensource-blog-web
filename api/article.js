export default {
    async getArticles({ axios, params }) {
        return await axios.$post('api/article/getArticles', params)
    },
    async getComment({ axios, params }) {
        return await axios.$post('api/article/getComment', params)
    },
    async getByUserId({ axios, params }) {
        return await axios.$post('api/article/getByUserId', params)
    },
    async search({ axios, params }) {
        return await axios.$post('api/article/search', params)
    },
    async getTags({ axios }) {
        return await axios.$post('api/article/getTags')
    },
    async getTypes({ axios }) {
        return await axios.$post('api/article/getTypes')
    }
}