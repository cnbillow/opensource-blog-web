import Vue from 'vue'
import {router} from '@/extend/router'

export const LOGIN_GUIDE = function () {
    Vue.prototype.$Notice.warning({
        name: 'login',
        title: '权限受限',
        render: h => {
            return h('div', {
                style: {
                    display: 'flex',
                    alignItems: 'center'
                }
            }, [
                h('span', {
                    style: {
                        paddingRight: '10px'
                    }
                }, '您尚未登陆，无法以下操作,是否'),
                h('Button', {
                    props: {
                        type: "primary",
                        size: 'small'
                    },
                    on: {
                        click: () => {
                            Vue.prototype.$Notice.close('login')
                            router.replace({path: '/login'})
                        }
                    }
                }, '登录')
            ])
        },
        duration: 0
    });
}