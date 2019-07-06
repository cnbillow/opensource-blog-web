<template>
    <div
        class="page-header"
        :class="{'page-header-dark' : theme === 'dark', 'page-header-light' : theme === 'light'}"
    >
        <div class="h-wrap">
            <div class="w-left">
                <h1 @click="rep('/')">kyeteo</h1>
            </div>
            <div class="w-right" v-if="'id' in user">
                <span class="r-text" @click="goCenter">个人中心</span>
                <span>/</span>
                <span class="r-text" @click="doExit">注销</span>
            </div>
            <div class="w-right" v-else>
                <span class="r-text" @click="nav('/login')">登陆</span>
                <span>/</span>
                <span class="r-text" @click="nav('/register')">注册</span>
            </div>
        </div>
    </div>
</template>

<script>
import apiUser from '~/api/user'
import { mapState, mapMutations } from 'vuex'
export default {
    props: {
        theme: {
            default: 'dark'
        }
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
        ...mapMutations(['setUser']),
        goCenter() {
            this.nav('/author/' + this.user.id)
        },
        async doExit() {
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
            }
        }
    }
}
</script>

<style lang="less" scoped>
.page-header {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    width: 100%;
    z-index: 1000;
    .h-wrap {
        display: flex;
        justify-content: space-between;
        width: 1200px;
        height: 51px;
        .w-left {
            h1 {
                height: 51px;
                margin: 0;
                line-height: 51px;
                &:hover {
                    cursor: pointer;
                }
            }
        }
        .w-right {
            display: flex;
            .r-text {
                padding: 0 20px;
                &:hover {
                    cursor: pointer;
                }
            }
            span {
                height: 51px;
                line-height: 51px;
            }
        }
    }
    &-dark {
        background: #000;
        .h-wrap {
            .w-left {
                h1 {
                    color: #00a7eb;
                }
            }
            .w-right {
                span {
                    color: #bdbdbd;
                }
            }
        }
    }
    &-light {
        background: white;
        border-bottom: 1px solid #f1f1f1;
        .h-wrap {
            .w-left {
                h1 {
                    color: #555;
                }
            }
            .w-right {
                span {
                    color: #ff694e;
                }
            }
        }
    }
}
</style>
