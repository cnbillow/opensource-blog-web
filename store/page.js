import apiPage from '~/api/page'

export const state = () => ({
    home: {
        tag: [],
        book: []
    },
    article: {
        user: {
            tag: []
        },
        link: [],
        article: {
            title: '',
            text: '',
            tag: [],
            know: [],
            source: [],
            goods: [],
            section: []
        },
        mostViewArticles: []
    },
    book: {
        user: {
            tag: []
        },
        book: {
            title: '',
            desc: '',
            cover: '',
            section: []
        },
        mostViewArticles: []
    },
    author: {
        user: {},
        mostViewArticles: []
    },
    search: {
        tag: [],
        author: []
    }
})

export const getters = {
    articleCategory: state => {
        if (!state.article.article.text) {
            return []
        }
        try {
            const re = /(^(#{1,3})|\n(#{1,3}))\s+(\S+)/g
            const list = state.article.article.text.match(re)
            let arr = []
            list.forEach(i => {
                const arrName = i.match(/(^(#{1,3})|\n(#{1,3}))\s+(\S+)/)
                const name = arrName[4]
                if (i.match(/#/g).length === 2) {
                    arr.push({
                        name: name,
                        list: []
                    })
                    return
                }
                arr[arr.length -1].list.push({
                    name: name
                })
            })
            return arr
        } catch (e) {
            return []
        }
    }
}

export const mutations = {
    setHome(state, o) {
        state.home = o
    },
    setArticle(state, o) {
        state.article = o
    },
    setBook(state, o) {
        state.book = o
    },
    setAuhor(state, o) {
        state.author = o
    },
    setSearch(state, o) {
        state.search = o
    }
}
export const actions = {
    async getIndex({ commit }, { axios }) {
        const resp = await apiPage.index({ axios })
        if (resp.done === true) {
            commit('setHome', resp.data)
        }
    },
    async getArticle({ commit }, { axios, params }) {
        const resp = await apiPage.article({axios, params})
        if (resp.done === true) {
            commit('setArticle', resp.data)
        }
    },
    async getBook({ commit }, { axios, params }) {
        const resp = await apiPage.book({axios, params})
        if (resp.done === true) {
            commit('setBook', resp.data)
        }
    },
    async getAuthor({ commit }, { axios, params }) {
        const resp = await apiPage.author({axios, params})
        if (resp.done === true) {
            commit('setAuhor', resp.data)
        }
    },
    async getSearch({ commit }, { axios, params }) {
        const resp = await apiPage.search({axios, params})
        if (resp.done === true) {
            commit('setSearch', resp.data)
        }
    }
}