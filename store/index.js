export const state = () => ({
    user: {}
})

export const mutations = {
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