import Vue from 'vue'
import dayjs from 'dayjs'

Vue.mixin({
    filters: {
        imgCover(e) {
            if (!e) {
                return process.env.QINIU_BASE_URL + 'FpPaIUIP_uhaIkJPcDwT2lzlNXTO'
            }
            return process.env.QINIU_BASE_URL + e
        },
        avatarCover(e) {
            if (!e) {
                return process.env.QINIU_BASE_URL + 'FjOWYKEmOtCEUXJz9uIaepiPGPcX'
            }
            return process.env.QINIU_BASE_URL + e
        },
        timeFormat(e) {
            if (!e) {
                return ''
            }
            return dayjs(e).format('YYYY-MM-DD HH:mm')
        }
    }
})
