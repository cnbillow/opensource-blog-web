export default {
    async recommend({ axios, params }) {
        return await axios.$post('api/specific/recommend', params)
    }
}