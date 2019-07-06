export default {
    async getHotArticles({ axios, params }) {
        return await axios.$post('api/article/getHot', params)
    },
    async getComment({ axios, params }) {
        return await axios.$post('api/article/getComment', params)
    },
    async getByUserId({ axios, params }) {
        return await axios.$post('api/article/getByUserId', params)
    },
    async search({ axios, params }) {
        return await axios.$post('api/article/getByTagId', params)
    },
    async getTag({ axios }) {
        return await axios.$post('api/article/getTag')
    }
}