import Vue from 'vue'

export const AUTH_LIMITED = function () {
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
    });
}
