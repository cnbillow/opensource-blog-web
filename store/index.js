import apiUser from '~/api/user'

export const state = () => ({
    app: {
        tipVisible: true
    },
    user: {}
})

export const mutations = {
    setAppTip(state, b) {
        state.app = b
    },
    setUser(state, user) {
        state.user = user
    }
}
export const actions = {
    async nuxtServerInit({ dispatch }, {req, $axios}) {
        if (req.session.token) {
            await dispatch('getUserInfo', {axios: $axios})
        }
    },
    getUserInfo({commit}, {axios}) {
        return new Promise((resolve) => {
            apiUser.profile({axios}).then(res => {
                if (res.done) {
                    commit('setUser', res.data)
                    resolve()
                }
            })
        })
    }
}