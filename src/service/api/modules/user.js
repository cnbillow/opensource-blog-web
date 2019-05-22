import {post} from '@/utils/post'

export const user = {
    register: (o) => {
        return post('api/user/register', o)
    },
    login: (o) => {
        return post('api/user/login', o)
    },
    profile () {
        return post('api/user/profile')
    },
    checkAuth (o) {
        return post('api/user/checkAuth', o)
    },
    createArticle (o) {
        return post('api/user/createArticle', o)
    },
    getArticle (o) {
        return post('api/user/getArticle', o)
    },
    updateArticle (o) {
        return post('api/user/updateArticle', o)
    },
    deleteArticle (o) {
        return post('api/user/deleteArticle', o)
    },
    getArticles (o = {}) {
        return post('api/user/getArticles', o)
    },
    createArticleComment (o) {
        return post('api/user/createArticleComment', o)
    },
    doPraise: (o) => {
        return post('api/user/doPraise', o)
    }
}
