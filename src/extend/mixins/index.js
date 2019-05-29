import Vue from 'vue'
import dayjs from 'dayjs'
import {QINIU_URL} from '../../config/var/qiniu'

Vue.mixin({
    filters: {
        imgCover (e) {
            if (!e) {
                return QINIU_URL + 'FpPaIUIP_uhaIkJPcDwT2lzlNXTO'
            }
            return QINIU_URL + e
        },
        avatarCover (e) {
            if (!e) {
                return QINIU_URL + 'FjOWYKEmOtCEUXJz9uIaepiPGPcX'
            }
            return QINIU_URL + e
        },
        timeFormat (e) {
            if (!e) {
                return ''
            }
            return dayjs(e).format('YYYY-MM-DD HH:mm')
        }
    },
    methods: {
        nav (s, o = {}) {
            this.$router.push({path: s, query: o})
        },
        rep (s, o = {}) {
            this.$router.replace({path: s, query: o})
        },
        back () {
            this.$router.go(-1)
        },
        openUrl (s) {
            window.open(s)
        }
    }
})
