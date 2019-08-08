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
    nuxtServerInit({ commit }, { req }) {
        if (req.session.user) {
            commit('setUser', req.session.user)
        }
    }
}