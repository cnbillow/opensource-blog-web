import {post} from '@/utils/post'

export const page = {
    home: () => {
        return post('api/page/home')
    },
    article: (o) => {
        return post('api/page/article', o)
    },
    author: (o) => {
        return post('api/page/author', o)
    },
    tag: (o) => {
        return post('api/page/tag', o)
    }
}
