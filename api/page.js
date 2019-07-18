export default {
    async index({axios}) {
        return await axios.$post('api/page/home')
    },
    async article({axios, params}) {
        return await axios.$post('api/page/article', params)
    },
    async book({axios, params}) {
        return await axios.$post('api/page/book', params)
    },
    async author({axios, params}) {
        return await axios.$post('api/page/author', params)
    },
    async search({axios, params}) {
        return await axios.$post('api/page/search', params)
    }
}