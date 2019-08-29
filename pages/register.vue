<template>
    <div class="register">
        <header class="r-header">
            <div class="h-wrap">
                <div class="w-left">
                    <h1 class="border-1px-right" @click="rep('/')">kyeteo</h1>
                    <span>注册账号</span>
                </div>
                <div class="w-right">
                    <span>我已注册，现在</span>
                    <Button type="primary" @click="rep('/login')">登陆</Button>
                </div>
            </div>
        </header>
        <article class="r-article">
            <div class="a-wrap">
                <validate-form ref="form">
                    <div class="w-field">
                        <div class="f-item">
                            <div class="i-left">
                                <span>用户账号</span>
                            </div>
                            <div class="i-right">
                                <validate-input
                                    type="text"
                                    placeholder="请输入账号"
                                    ref="account"
                                    v-model="form.account"
                                    rule="account"
                                ></validate-input>
                            </div>
                        </div>
                        <div class="f-item">
                            <div class="i-left">
                                <span>用户密码</span>
                            </div>
                            <div class="i-right">
                                <validate-input
                                    type="password"
                                    placeholder="请输入密码"
                                    ref="password"
                                    v-model="form.password"
                                    rule="password"
                                ></validate-input>
                            </div>
                        </div>
                        <div class="f-item">
                            <div class="i-left">
                                <span>密码确认</span>
                            </div>
                            <div class="i-right">
                                <validate-input
                                    type="password"
                                    placeholder="请确认密码"
                                    ref="confirmPassword"
                                    v-model="form.confirmPassword"
                                    rule="password"
                                ></validate-input>
                            </div>
                        </div>
                        <div class="f-item">
                            <div class="i-left">
                                <span>邀请码</span>
                            </div>
                            <div class="i-right">
                                <input type="text" placeholder="没有邀请码可不填"/>
                                <Tooltip placement="top">
                                    <a>没有邀请码？</a>
                                    <div slot="content">
                                        <p>只有收到邀请码的注册用户才能够发表文章哟</p>
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                    <div class="w-law">
                        <input type="checkbox" checked="checked" />
                        <span>阅读并接受</span>
                        <a href>《kyeteo用户手册》</a>
                    </div>
                    <div class="w-btn">
                        <div class="b-wrap" @click="toRegister">
                            <span>注册</span>
                        </div>
                    </div>
                </validate-form>
            </div>
        </article>
    </div>
</template>

<script type="text/ecmascript-6">
import apiUser from '~/api/user'
import validateInput from '~/components/validate-input'
import validateForm from '~/components/validate-form'
export default {
    head() {
        return {
            title: 'Kyeteo 注册',
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
                password: '',
                confirmPassword: ''
            }
        }
    },
    components: {
        validateInput,
        validateForm
    },
    methods: {
        toRegister() {
            this.$refs.form.validate().then(() => {
                if (this.form.password !== this.form.confirmPassword) {
                    this.$Message.error('密码不一致')
                    return
                }
                const data = {
                    account: this.form.account,
                    password: this.form.password
                }
                apiUser.register({ axios: this.$axios, params: data }).then(res => {
                    if (res.code === '3200') {
                        this.$Message.error('用户名已存在')
                        return
                    }
                    if (res.done) {
                        this.$Message.success('注册成功')
                        this.rep('/login')
                    }
                })
            })
        }
    }
}
</script>

<style lang="less">
.register {
    .r-header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 75px;
        display: flex;
        justify-content: center;
        .h-wrap {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-basis: 980px;
            .w-left {
                display: flex;
                align-items: center;
                h1 {
                    padding-right: 10px;
                    &:hover{
                        cursor: pointer;
                    }
                }
                span {
                    padding-left: 10px;
                    font-size: 16px;
                }
            }
            .w-right {
                display: flex;
                align-items: center;
                span {
                    padding-right: 10px;
                }
            }
        }
    }
    .r-article {
        display: flex;
        justify-content: center;
        margin-top: 75px;
        background: url(/image/reg_hr.png) top no-repeat;
        .a-wrap {
            padding-top: 60px;
            flex-basis: 980px;
            .w-field {
                .f-item {
                    display: flex;
                    align-items: center;
                    .i-left {
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                        flex-basis: 65px;
                        span {
                            font-size: 14px;
                            font-weight: 700;
                            color: #666;
                        }
                    }
                    .i-right {
                        display: flex;
                        align-items: center;
                        flex-basis: 350px;
                        box-sizing: border-box;
                        padding-left: 10px;
                        input {
                            flex: 1;
                            height: 40px;
                            box-sizing: border-box;
                            padding: 0 10px;
                            line-height: 40px;
                            border: 1px solid #ddd;
                            outline: none;
                        }
                        a {
                            padding: 0 30px;
                        }
                    }
                    &:not(:last-child) {
                        padding-bottom: 25px;
                    }
                }
            }
            .w-law {
                display: flex;
                align-items: center;
                padding-left: 65px;
                margin: 25px 0;
            }
            .w-btn {
                display: flex;
                padding-left: 65px;
                .b-wrap {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-basis: 350px;
                    height: 50px;
                    background: #4490f7;
                    span {
                        color: white;
                    }
                    &:hover {
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>
