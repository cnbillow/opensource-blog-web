import {api} from '@/service/api'
import {token} from '@/utils/token'
import * as types from './mutation-types'

export const actions = {
    login({dispatch}, payLoad) {
        return new Promise((resolve) => {
            api.user.login(payLoad).then(res => {
                if (res.done) {
                    token.set(res.data)
                    dispatch('getUser').then(() => {
                        resolve()
                    })
                }
            })
        })
    },
    exit({commit}) {
        return new Promise((resolve) => {
            token.clear()
            commit(types.SET_USER_LOGIN, false)
            resolve()
        })
    },
    getUser({commit}) {
        return new Promise((resolve) => {
            if (!token.get()) {
                return
            }
            api.user.profile().then(res => {
                if (res.done) {
                    commit(types.SET_USER_PROFILE, res.data)
                    commit(types.SET_USER_LOGIN, true)
                    resolve()
                }
            })
        })
    }
}
