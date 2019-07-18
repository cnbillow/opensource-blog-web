<template>
    <div class="login">
        <div class="l-box">
            <div class="b-top">
                <div class="t-title">
                    <span>账号密码登陆</span>
                </div>
                <div class="t-field">
                    <input type="text" placeholder="账号" v-model="form.account" />
                    <input type="password" placeholder="密码" v-model="form.password" />
                </div>
                <div class="t-auto">
                    <input type="checkbox" checked="checked" />
                    <span>自动登录</span>
                </div>
                <div class="t-btn" @click="toLogin">
                    <span>登陆</span>
                </div>
                <div class="t-reset">
                    <span>忘记密码？</span>
                </div>
            </div>
            <div class="b-bottom">
                <div class="b-left">
                    <div class="l-text">
                        <span>第三方登陆</span>
                    </div>
                    <div class="l-icon">
                        <i class="iconfont icon-weixin"></i>
                    </div>
                </div>
                <div class="b-right">
                    <span>立即注册</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import apiUser from '~/api/user'
import { mapMutations } from 'vuex'
export default {
    head() {
        return {
            title: 'Kyeteo 登陆',
            meta: [
                { hid: 'description', name: 'description', content: 'Kyeteo vuejs ssr 服务端渲染 esp芯片 树莓派 登陆' }
            ],
            script: [
                {
                    src: '/js/seo.js'
                }
            ]
        }
    },
    data() {
        return {
            form: {
                account: '',
                password: ''
            }
        }
    },
    methods: {
        ...mapMutations(['setUser']),
        async toLogin() {
            const resp = await apiUser.login({ axios: this.$axios, params: this.form })
            if (resp.done) {
                this.setUser(resp.data)
                this.$Notice.success({
                    name: 'exit',
                    title: '操作提示',
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
                                }, '登陆成功')
                            ])
                    },
                    duration: 3000
                })
                this.nav('/')
            }
        }
    }
}
</script>

<style lang="less">
.login {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    min-width: 1200px;
    min-height: 675px;
    background: url(https://www.link-nemo.com/forumlib/images/banner02.jpg)
        center no-repeat;
    background-size: cover;
    .l-box {
        position: absolute;
        right: 300px;
        top: 50%;
        transform: translateY(-50%);
        width: 352px;
        box-sizing: border-box;
        .b-top {
            padding: 0 20px;
            background: white;
            .t-title {
                display: flex;
                align-items: center;
                height: 100px;
                span {
                    font-weight: 600;
                    font-size: 18px;
                    color: #333;
                }
            }
            .t-field {
                input {
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    box-sizing: border-box;
                    padding: 0 10px;
                    border: 1px solid #e7e7e7;
                    outline: none;
                    &:first-child {
                        border-top-left-radius: 4px;
                        border-top-right-radius: 4px;
                    }
                    &:last-child {
                        border-bottom-left-radius: 4px;
                        border-bottom-right-radius: 4px;
                        border-top: none;
                    }
                }
            }
            .t-auto {
                display: flex;
                align-items: center;
                height: 54px;
            }
            .t-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 41px;
                background: #00a7eb;
                span {
                    color: white;
                }
                &:hover {
                    cursor: pointer;
                }
            }
            .t-reset {
                display: flex;
                align-items: center;
                height: 54px;
            }
        }
        .b-bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 65px;
            padding: 0 20px;
            background: #f3f8ff;
            .b-left {
                display: flex;
                align-items: center;
                .l-text {
                    span {
                        color: #00a7eb;
                    }
                }
                .l-icon {
                    display: flex;
                    align-items: center;
                    padding-left: 40px;
                    i {
                        display: inline-block;
                        width: 20px;
                        height: 20px;
                        font-size: 18px;
                        text-align: center;
                        line-height: 20px;
                        color: #00a7eb;
                    }
                }
            }
            .b-right {
                span {
                    color: #00a7eb;
                }
                &:hover {
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
