import * as qiniu from 'qiniu-js'
import apiQiniu from '~/api/qiniu'

export default {
    qiniu: ({axios}) => {
        return new Promise((resolve) => {
            var pom = document.createElement('input')
            pom.setAttribute('type', 'file')
            pom.addEventListener('change', function (e) {
                apiQiniu.token({ axios }).then(res => {
                    if (res.done) {
                        const config = {
                            useCdnDomain: false,
                            region: null
                        }
                        const putExtra = {
                            fname: '',
                            params: {},
                            mimeType: null
                        }
                        const observable = qiniu.upload(
                            e.path[0].files[0],
                            null,
                            res.data,
                            putExtra,
                            config
                        )
                        observable.subscribe({
                            complete(res1) {
                                resolve(res1.key)
                            }
                        })
                    }
                })
            })
            pom.style.display = 'none'
            if (document.createEvent) {
                const event = document.createEvent('MouseEvents')
                event.initEvent('click', true, true)
                pom.dispatchEvent(event)
            } else {
                pom.click()
            }
        })
    }
}