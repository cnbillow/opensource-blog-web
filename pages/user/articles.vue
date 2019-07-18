<template>
    <div class="articles">
        <x-header :sub="false"></x-header>
        <user>
            <div class="m-articles">
                <div class="a-left">
                    <div class="l-list">
                        <div
                            class="l-item"
                            :key="key"
                            @click="nav('/article/' + item.id)"
                            v-for="(item, key) in articles.list"
                        >
                            <div class="i-info">
                                <span>文章</span>
                                <span>{{item.user ? item.user.nickname : ''}}</span>
                                <span>mysql</span>
                            </div>
                            <div class="i-name">
                                <span>{{item.title}}</span>
                            </div>
                            <div class="i-do">
                                <div class="d-btns">
                                    <div class="b-item" @click.stop="nav('/user/post?type=1&id=' + item.id)">
                                        <span>编辑</span>
                                    </div>
                                    <div class="b-item" @click.stop="deleteArticle(item)">
                                        <span>删除</span>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="i-cover"
                                :style="{backgroundImage: `url(${qiniuBaseUrl + item.cover})`}"
                                v-if="item.cover"
                            ></div>
                        </div>
                    </div>
                    <div class="l-page">
                        <Page
                            :current="articles.page.index"
                            :page-size="articles.page.size"
                            :total="articles.page.count"
                            @on-change="pageChange"
                        />
                    </div>
                </div>
            </div>
        </user>
    </div>
</template>

<script type="text/ecmascript-6">
import apiUser from '~/api/user'
import user from '~/components/user'
import xHeader from '~/components/x-header'
export default {
    layout: 'auth',
    head() {
        return {
            title: 'Kyeteo 文章管理',
            meta: [
                { hid: 'description', name: 'description', content: 'Kyeteo vuejs ssr 服务端渲染 esp芯片 树莓派 文章管理' }
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
            qiniuBaseUrl: process.env.QINIU_BASE_URL,
            articles: {
                form: {
                    index: 1,
                    size: 10
                },
                page: {
                    index: 1,
                    size: 1,
                    count: 1
                },
                list: []
            }
        }
    },
    components: {
        user,
        xHeader
    },
    methods: {
        pageChange(e) {
            this.articles.form.index = e
            this.getArticles()
        },
        getArticles() {
            apiUser.getArticles({ axios: this.$axios, params: this.articles.form }).then(res => {
                if (res.done) {
                    this.articles.list = res.data
                    this.articles.page = res.page
                }
            })
        },
        deleteArticle(e) {
            this.$Modal.confirm({
                title: '温馨提示',
                content: '<p>文章删除后无法恢复，是否继续</p>',
                onOk: () => {
                    const data = {
                        id: e.id
                    }
                    apiUser.deleteArticle({ axios: this.$axios, params: data }).then(res => {
                        if (res.done) {
                            this.$Message.success('删除成功')
                            this.getArticles()
                        }
                    })
                },
                onCancel: () => {
                    this.$Message.info('取消');
                }
            })
        }
    },
    mounted() {
        this.getArticles()
    }
}
</script>
<style lang="less">
.articles {
    .m-articles {
        display: flex;
        .a-left {
            width: 700px;
            background: white;
            .l-list {
                .l-item {
                    position: relative;
                    padding: 15px 100px 15px 20px;
                    .i-info {
                        display: flex;
                        align-items: center;
                        span {
                            position: relative;
                            font-size: 14px;
                            &:nth-child(1) {
                                color: #007fff;
                            }
                            &:not(:first-child) {
                                padding-left: 20px;
                                color: #b2bac2;
                                &::before {
                                    position: absolute;
                                    content: "/";
                                    top: 50%;
                                    transform: translateY(-50%);
                                    left: 10px;
                                }
                            }
                        }
                    }
                    .i-name {
                        padding: 10px 0 15px 0;
                        span {
                            font-size: 16px;
                            font-weight: 600;
                            color: #333;
                        }
                    }
                    .i-do {
                        display: flex;
                        align-items: center;
                        .d-btns {
                            display: flex;
                            align-items: center;
                            border: 1px solid #f4f5f5;
                            .b-item {
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                width: 55px;
                                height: 24px;
                                &:first-child {
                                    &:hover {
                                        background: #007fff;
                                        color: white;
                                    }
                                }
                                &:last-child {
                                    border-left: 1px solid #f4f5f5;
                                    &:hover {
                                        background: #ed4014;
                                        color: white;
                                    }
                                }
                            }
                        }
                    }
                    .i-cover {
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        right: 20px;
                        width: 70px;
                        height: 70px;
                        background-size: auto 100%;
                    }
                    &:hover {
                        cursor: pointer;
                        background-color: rgba(0, 0, 0, 0.01);
                        .i-name {
                            span {
                                text-decoration: underline;
                            }
                        }
                    }
                }
            }
            .l-page {
                display: flex;
                justify-content: center;
                padding: 30px 0;
            }
        }
    }
}
</style>
