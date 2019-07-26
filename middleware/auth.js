
import Vue from 'vue'
import apiUser from '~/api/user'

export default async function ({ app, route, store, redirect }) {
    const path = route.path
    if ('id' in store.state.user === false) {
        if (path !== '/login') {
            return redirect('/login')
        }
    } else {
        if (path === '/login') {
            return redirect('/')
        }
        const res = await apiUser.checkAuth({axios: app.$axios, params:{path}})
        if (res.done && res.code === '3100') {
            if (process.client) {
                Vue.prototype.$Notice.warning({
                    name: 'auth',
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
                                }, '您不是邀请会员，无法进行发布文章')
                            ])
                    },
                    duration: 3000
                })
                return redirect('/')
            } else {
                return redirect('/')
            }
        }
    }
}