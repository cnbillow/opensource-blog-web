<template>
    <div class="register">
        <header class="r-header">
            <div class="h-wrap">
                <div class="w-left">
                    <h1 class="border-1px-right">kyeteo</h1>
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
                <div class="w-field">
                    <div class="f-item">
                        <div class="i-left">
                            <span>用户账号</span>
                        </div>
                        <div class="i-right">
                            <input type="text" placeholder="用户账号" v-model="form.account">
                        </div>
                    </div>
                    <div class="f-item">
                        <div class="i-left">
                            <span>用户密码</span>
                        </div>
                        <div class="i-right">
                            <input type="password" placeholder="账号密码" v-model="form.password">
                        </div>
                    </div>
                    <div class="f-item">
                        <div class="i-left">
                            <span>密码确认</span>
                        </div>
                        <div class="i-right">
                            <input type="password" placeholder="密码确认" v-model="form.confirmPassword">
                        </div>
                    </div>
                    <div class="f-item">
                        <div class="i-left">
                            <span>邀请码</span>
                        </div>
                        <div class="i-right">
                            <input type="text">
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
                    <input type="checkbox" checked="checked">
                    <span>阅读并接受</span>
                    <a href="">《kyeteo用户手册》</a>
                </div>
                <div class="w-btn">
                    <div class="b-wrap" @click="toRegister">
                        <span>注册</span>
                    </div>
                </div>
            </div>
        </article>
    </div>
</template>

<script type="text/ecmascript-6">
    import {api} from '@/service/api'

    export default {
        data() {
            return {
                form: {
                    account: '',
                    password: '',
                    confirmPassword: ''
                }
            }
        },
        methods: {
            toRegister() {
                if (!this.form.account) {
                    this.$Message.error('账号不能为空')
                    return
                }
                if (!this.form.password) {
                    this.$Message.error('密码不能为空')
                    return
                }
                if (!this.form.confirmPassword) {
                    this.$Message.error('确认密码不能为空')
                    return
                }
                if (this.form.password !== this.form.password) {
                    this.$Message.error('密码不一致')
                    return
                }
                const data = {
                    account: this.form.account,
                    password: this.form.password
                }
                api.user.register(data).then(res => {
                    if (res.done) {
                        this.$Message.success('注册成功')
                        this.rep('/login')
                    }
                })
            }
        }
    }
</script>

<style lang="less">
    @import 'index';
</style>
