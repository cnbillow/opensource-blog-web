import {post} from '@/utils/post'

export const article = {
    getHotArticles: (o) => {
        return post('api/article/getHot', o)
    },
    getTag: () => {
        return post('api/article/getTag')
    },
    getComment: (o) => {
        return post('api/article/getComment', o)
    },
    getByTagId: (o) => {
        return post('api/article/getByTagId', o)
    },
    getByUserId: (o) => {
        return post('api/article/getByUserId', o)
    }
}
