import {LOGIN_GUIDE} from '@/plugins/login-guide'
import {AUTH_LIMITED} from '@/plugins/auth-limited'

export const RESP_INTERCEPTOR = function (resp) {
    if (resp.data.code === '2000') {
        LOGIN_GUIDE()
    }
    if (resp.data.code === '3110') {
        AUTH_LIMITED()
    }
}
