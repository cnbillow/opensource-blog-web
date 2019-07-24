<template>
    <div class="x-header">
        <div class="h-wrap">
            <div class="w-left">
                <div class="l-logo">
                    <h1>Kyeteo</h1>
                </div>
                <div class="l-module">
                    <div
                        class="m-item"
                        @click="rep('/')"
                        :class="{'m-item-active': $route.path === '/'}"
                    >
                        <span>首页</span>
                    </div>
                </div>
            </div>
            <div class="w-right">
                <div class="r-search">
                    <input type="text" placeholder="搜索更新啦" v-model="keyword" />
                    <i class="iconfont icon-sousuo" @click="doSearch"></i>
                </div>
                <div class="r-do">
                    <div class="d-item" @click="nav('/user/post')">
                        <i class="iconfont icon-xiezi"></i>
                        <span>写文章</span>
                    </div>
                    <div class="d-item" v-if="!('id' in user)">
                        <span @click="nav('/login')">登陆</span>
                        <span>/</span>
                        <span @click="nav('/register')">注册</span>
                    </div>
                    <div class="d-item" v-else>
                        <img
                            :src="user.avatar | avatarCover"
                            @click="nav('/author/' + user.id)"
                            alt
                        />
                        <span @click="toExit">注销</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import apiUser from '~/api/user'
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
export default {
    data() {
        return {
            keyword: ''
        }
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
        ...mapMutations(['setUser']),
        doSearch() {
            this.keyword && this.$emit('do-search', this.keyword)
        },
        async toExit() {
            const resp = await apiUser.exit({ axios: this.$axios })
            if (resp.done) {
                this.setUser({})
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
                                }, '注销成功')
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
.x-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px solid #f1f1f1;
    background: white;
    z-index: 1000;
    .h-wrap {
        display: flex;
        justify-content: space-between;
        width: 960px;
        height: 60px;
        margin: 0 auto;
        .w-left {
            display: flex;
            .l-logo {
                display: flex;
                align-items: center;
                h1 {
                    color: #007fff;
                }
                &:hover {
                    cursor: pointer;
                }
            }
            .l-module {
                display: flex;
                .m-item {
                    display: flex;
                    align-items: center;
                    padding: 0 20px;
                    span {
                        font-size: 16px;
                    }
                    &-active {
                        span {
                            font-size: 16px;
                            color: #007fff;
                        }
                    }
                    &:hover {
                        cursor: pointer;
                    }
                }
            }
        }
        .w-right {
            display: flex;
            align-items: center;
            .r-search {
                display: flex;
                align-items: center;
                width: 130px;
                height: 30px;
                padding: 0 10px;
                box-sizing: border-box;
                border: 1px solid hsla(0, 0%, 59.2%, 0.2);
                background: rgba(227, 231, 236, 0.2);
                input {
                    width: 90px;
                    border: none;
                    outline: none;
                    background: none;
                    font-size: 14px;
                }
                i {
                    font-size: 20px;
                    &:hover {
                        cursor: pointer;
                    }
                }
            }
            .r-do {
                display: flex;
                align-items: center;
                margin-left: 30px;
                span {
                    font-size: 16px;
                    color: #007fff;
                }
                .d-item {
                    display: flex;
                    align-items: center;
                    i {
                        font-size: 20px;
                        color: #007fff;
                    }
                    img {
                        width: 30px;
                        height: 30px;
                        border-radius: 15px;
                    }
                    span {
                        &:nth-child(2) {
                            padding: 0 10px;
                        }
                    }
                    &:last-child {
                        position: relative;
                        padding-left: 20px;
                        &:before {
                            position: absolute;
                            content: "";
                            top: 50%;
                            transform: translateY(-50%);
                            left: 10px;
                            height: 70%;
                            width: 1px;
                            background: hsla(0, 0%, 59.2%, 0.2);
                        }
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

