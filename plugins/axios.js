import Vue from 'vue'

export default function ({ $axios, redirect }) {
    $axios.onResponse(response => {
        if (response.data.code === '2000') {
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
                                    type: 'primary',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        redirect('/login')
                                        Vue.prototype.$Notice.close('login')
                                    }
                                }
                            }, '登录')
                        ])
                },
                duration: 0
            })
        }
        if (response.data.code === '1100') {
            redirect('/404')
        }
    })
}