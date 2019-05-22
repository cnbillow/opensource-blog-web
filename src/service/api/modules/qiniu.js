import {post} from '@/utils/post'

export const qiniu = {
    token: () => {
        return post('api/qiniu/uploadToken')
    }
}
