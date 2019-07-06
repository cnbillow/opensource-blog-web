export default {
    async token({axios}) {
        return await axios.$post('api/qiniu/uploadToken')
    }
}