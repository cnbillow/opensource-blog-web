export default {
    async getByUserId({ axios, params }) {
        return await axios.$post('api/book/getByUserId', params)
    }
}