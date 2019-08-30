import apiPage from '~/api/page'
import apiArticle from '~/api/article'

export const state = () => ({
    home: {
        tag: [],
        book: [],
        articles: {
            types: [
                {
                    id: 0,
                    name: '今日热门'
                }
            ],
            form: {
                type: 0,
                sort: 0,
                index: 1,
                size: 10
            },
            list: [],
            more: true
        }
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
                arr[arr.length - 1].list.push({
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
        state.home.tag = o.tag
        state.home.book = o.book
    },
    clearHomeArticle(state) {
        state.home.articles.list = []
        state.home.articles.form.index = 1
    },
    changeHomeArticleType(state, o) {
        state.home.articles.form.type = o.id
    },
    changeHomeArticleSort(state, n) {
        state.home.articles.form.sort = n
    },
    initHomeArticlesTypes(state, a) {
        a.forEach(i => {
            state.home.articles.types.push(i)
        })
    },
    pushHomeArticles(state, o) {
        o.data.forEach(i => {
            state.home.articles.list.push(i)
        })
        state.home.articles.form.index += 1
        if (state.home.articles.list.length === o.page.count) {
            state.home.articles.more = false
        }
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
    getHome({ dispatch, commit }, { axios }) {
        return new Promise((resolve) => {
            apiPage.index({ axios }).then(resp => {
                if (resp.done === true) {
                    commit('setHome', resp.data)
                    resolve()
                }
            })
        })
    },
    getHomeTypes({ dispatch, commit }, { axios }) {
        return new Promise((resolve) => {
            apiArticle.getTypes({ axios }).then(types => {
                if (types.done) {
                    commit('initHomeArticlesTypes', types.data)
                    resolve()
                }
            })
        })
    },
    getHomeArticles({ commit, state }, { axios }) {
        return new Promise((resolve) => {
            apiArticle.getArticles({ axios, params: state.home.articles.form }).then(res => {
                if (res.done) {
                    commit('pushHomeArticles', res)
                    resolve()
                }
            })
        })
    },
    async getArticle({ commit }, { axios, params }) {
        const resp = await apiPage.article({ axios, params })
        if (resp.done === true) {
            commit('setArticle', resp.data)
        }
    },
    async getBook({ commit }, { axios, params }) {
        const resp = await apiPage.book({ axios, params })
        if (resp.done === true) {
            commit('setBook', resp.data)
        }
    },
    async getAuthor({ commit }, { axios, params }) {
        const resp = await apiPage.author({ axios, params })
        if (resp.done === true) {
            commit('setAuhor', resp.data)
        }
    },
    async getSearch({ commit }, { axios, params }) {
        const resp = await apiPage.search({ axios, params })
        if (resp.done === true) {
            commit('setSearch', resp.data)
        }
    }
}