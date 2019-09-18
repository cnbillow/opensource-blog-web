<template>
    <div class="setting">
        <x-header></x-header>
        <div class="s-tab">
            <div class="t-wrap">
                <div class="w-item"
                     :class="{'w-item-active': type === 1}"
                     @click="changeType(1)">
                    <span>个人资料</span>
                </div>
                <div class="w-item"
                     :class="{'w-item-active': type === 2}"
                     @click="changeType(2)">
                    <span>修改密码</span>
                </div>
            </div>
        </div>
        <div class="s-main">
            <div class="m-left">
                <div class="l-block l-block-profile" v-if="type === 1">
                    <div class="b-title">
                        <h1>个人资料</h1>
                    </div>
                    <div class="b-cell">
                        <div class="c-item">
                            <div class="i-left">
                                <span>头像</span>
                            </div>
                            <div class="i-right">
                                <div class="r-avatar">
                                    <div class="a-box">
                                        <img :src="user.avatar | avatarCover" alt="">
                                    </div>
                                    <div class="a-do">
                                        <div class="d-text">
                                            <span>支持jpg、png格式</span>
                                        </div>
                                        <div class="d-upload" @click="changeAvatar">
                                            <span>点击上传</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="c-item">
                            <div class="i-left">
                                <span>用户名</span>
                            </div>
                            <div class="i-right">
                                <div class="r-text" :class="{'r-text-active': profile.show1}">
                                    <div class="t-input">
                                        <input ref="profile.show1" type="text" placeholder="请输入用户名"
                                               v-model="profile.value">
                                        <span>{{user.nickname}}</span>
                                    </div>
                                    <div class="t-do">
                                        <div class="d-edit" @click="tryEdit(1, user.nickname)">
                                            <i class="iconfont icon-xiugai07"></i>
                                            <span>修改</span>
                                        </div>
                                        <div class="d-save">
                                            <span @click="update">保存</span>
                                            <span @click="cancelEdit">取消</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="c-item">
                            <div class="i-left">
                                <span>标签</span>
                            </div>
                            <div class="i-right">
                                <div class="r-text" :class="{'r-text-active': profile.show2}">
                                    <div class="t-input">
                                        <input ref="profile.show2" type="text" placeholder="请输入标签，多个标签以逗号分隔"
                                               v-model="profile.value">
                                        <span>{{user.tag.map(i => {return i.name}).join(',')}}</span>
                                    </div>
                                    <div class="t-do">
                                        <div class="d-edit"
                                             @click="tryEdit(2, user.tag.map(i => {return i.name}).join(','))">
                                            <i class="iconfont icon-xiugai07"></i>
                                            <span>修改</span>
                                        </div>
                                        <div class="d-save">
                                            <span @click="update">保存</span>
                                            <span @click="cancelEdit">取消</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="c-item">
                            <div class="i-left">
                                <span>个性签名</span>
                            </div>
                            <div class="i-right">
                                <div class="r-text" :class="{'r-text-active': profile.show3}">
                                    <div class="t-input">
                                        <input ref="profile.show3" type="text" placeholder="请输入个性签名"
                                               v-model="profile.value">
                                        <span>{{user.saying_text}}</span>
                                    </div>
                                    <div class="t-do">
                                        <div class="d-edit" @click="tryEdit(3, user.saying_text)">
                                            <i class="iconfont icon-xiugai07"></i>
                                            <span>修改</span>
                                        </div>
                                        <div class="d-save">
                                            <span @click="update">保存</span>
                                            <span @click="cancelEdit">取消</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="l-block l-block-password" v-if="type === 2">
                    <div class="b-title">
                        <h1>修改密码</h1>
                    </div>
                    <div class="b-no-service">
                        <h3>该服务尚未开放，敬请谅解!</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>>

<script>
    import {mapState, mapActions} from 'vuex'
    import xHeader from '~/components/x-header'
    import upload from '~/utils/upload'
    import apiUser from '~/api/user'

    export default {
        layout: "auth",
        head() {
            return {
                title: 'Kyeteo 个人资料修改',
                meta: [
                    {hid: 'description', name: 'description', content: 'Kyeteo vuejs ssr 服务端渲染 esp芯片 树莓派'}
                ]
            }
        },
        data() {
            return {
                type: 1,
                profile: {
                    show1: false,
                    show2: false,
                    show3: false,
                    type: 1,
                    value: ''
                }
            }
        },
        computed: {
            ...mapState(['user'])
        },
        components: {
            xHeader
        },
        methods: {
            ...mapActions(['getUserInfo']),
            changeType(n) {
                this.type = n
            },
            changeAvatar() {
                upload.qiniu({axios: this.$axios}).then(key => {
                    this.profile.type = 0
                    this.profile.value = key
                    this.update()
                })
            },
            tryEdit(n, s) {
                this.profile.show1 = false
                this.profile.show2 = false
                this.profile.show3 = false
                this.profile[`show${n}`] = true

                this.$nextTick(() => {
                    this.$refs[`profile.show${n}`].focus()
                })

                this.profile.type = n
                this.profile.value = s
            },
            cancelEdit() {
                this.profile.show1 = false
                this.profile.show2 = false
                this.profile.show3 = false
            },
            update() {
                const params = {
                    type: this.profile.type,
                    value: this.profile.value
                }
                apiUser.update({axios: this.$axios, params}).then(res => {
                    if (res.done) {
                        this.$Message.success('更新成功')
                        this.cancelEdit()
                        this.getUserInfo({axios: this.$axios})
                    }
                })
            }
        }
    }
</script>

<style lang="less">
    .setting {
        background: #f4f5f5;

        .s-tab {
            position: fixed;
            top: 61px;
            left: 0;
            width: 100%;
            z-index: 999;
            background: white;
            box-shadow: 0px 0px 10px 0px rgba(2, 2, 2, 0.2);

            .t-wrap {
                display: flex;
                width: 960px;
                height: 46px;
                margin: 0 auto;

                .w-item {
                    display: flex;
                    align-items: center;
                    padding-right: 10px;

                    span {
                        font-size: 14px;
                    }

                    &:not(:first-child) {
                        padding-left: 10px;
                    }

                    &-active {
                        span {
                            color: #007fff;
                        }
                    }

                    &:hover {
                        cursor: pointer;
                        color: #007fff;
                    }
                }
            }
        }

        .s-main {
            display: flex;
            width: 960px;
            padding-top: 128px;
            margin: 0 auto;

            .m-left {
                width: 700px;
                min-height: calc(100vh - 128px);

                .l-block {
                    padding: 32px 48px 84px 48px;
                    background: white;

                    .b-title {
                        h1 {
                            margin: 16px 0;
                            font-size: 24px;
                        }
                    }

                    .b-cell {
                        border-top: 1px solid #f1f1f1;
                        border-bottom: 1px solid #f1f1f1;

                        .c-item {
                            display: flex;
                            min-height: 100px;
                            padding: 12px 0;

                            .i-left {
                                display: flex;
                                align-items: center;
                                flex-basis: 120px;

                                span {
                                    font-size: 14px;
                                    color: #333;
                                }
                            }

                            .i-right {
                                display: flex;
                                flex: 1;
                                align-items: center;

                                .r-avatar {
                                    display: flex;
                                    align-items: center;
                                    width: 100%;

                                    .a-box {
                                        width: 72px;
                                        height: 72px;

                                        img {
                                            width: 100%;
                                            height: 100%;
                                        }
                                    }

                                    .a-do {
                                        display: flex;
                                        flex-direction: column;
                                        padding-left: 30px;
                                        align-items: flex-start;

                                        .d-text {
                                            span {
                                                color: #909090;
                                            }
                                        }

                                        .d-upload {
                                            display: flex;
                                            align-items: center;
                                            height: 30px;
                                            padding: 0 10px;
                                            margin-top: 10px;
                                            border-radius: 3px;
                                            background: #007fff;

                                            span {
                                                color: white;
                                            }

                                            &:hover {
                                                cursor: pointer;
                                            }
                                        }
                                    }
                                }

                                .r-text {
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    width: 100%;

                                    .t-input {
                                        flex: 1;
                                        font-size: 14px;
                                        color: #909090;

                                        input {
                                            display: none;
                                            border: none;
                                            outline: none;
                                            text-decoration: none;
                                        }
                                    }

                                    .t-do {
                                        font-size: 14px;
                                        color: #007fff;

                                        .d-edit {
                                            display: flex;
                                            align-items: center;

                                            &:hover {
                                                cursor: pointer;
                                            }
                                        }

                                        .d-save {
                                            display: none;
                                        }
                                    }

                                    &-active {
                                        .t-input {
                                            span {
                                                display: none;
                                            }

                                            input {
                                                display: inline-block;
                                                width: 100%;
                                            }
                                        }

                                        .t-do {
                                            .d-edit {
                                                display: none;
                                            }

                                            .d-save {
                                                display: flex;
                                                align-items: center;

                                                span {
                                                    &:last-child {
                                                        margin-left: 10px;
                                                        color: #909090;
                                                    }

                                                    &:hover {
                                                        cursor: pointer;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    .b-no-service {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100px;
                        border-top: 1px solid #f1f1f1;
                        border-bottom: 1px solid #f1f1f1;
                    }
                }
            }
        }
    }
</style>