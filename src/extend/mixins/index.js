import Vue from 'vue'
import {BASE_CDN_URL} from '../../config/var/api'

Vue.mixin({
    filters: {
        imgCover (e) {
            if (!e) {
                return BASE_CDN_URL + 'FpPaIUIP_uhaIkJPcDwT2lzlNXTO'
            }
            return BASE_CDN_URL + e
        },
        avatarCover (e) {
            if (!e) {
                return BASE_CDN_URL + 'FjOWYKEmOtCEUXJz9uIaepiPGPcX'
            }
            return BASE_CDN_URL + e
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
        }
    }
})
