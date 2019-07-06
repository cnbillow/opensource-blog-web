<template>
    <div class="contents">
        <page-header theme="light"></page-header>
        <user>
            <div class="c-content">
                <div class="c-list">
                    <div class="l-item" :key="key" v-for="(item, key) in articles.list">
                        <div class="i-left">
                            <img :src="item.cover | imgCover" alt />
                        </div>
                        <div class="i-right">
                            <div class="r-name" @click="nav('/article/' + item.id)">
                                <span>{{item.title}}</span>
                            </div>
                            <div class="r-time">
                                <span>{{item.view_count}}阅读</span>
                                <span>{{item.comment_count}}评论</span>
                                <span>{{item.create_time | timeFormat}}</span>
                            </div>
                        </div>
                        <div class="i-more">
                            <Dropdown>
                                <i class="iconfont icon-gengduo"></i>
                                <DropdownMenu slot="list">
                                    <DropdownItem>置顶</DropdownItem>
                                    <DropdownItem @click.native="nav('/article/update/' + item.id)">编辑</DropdownItem>
                                    <DropdownItem @click.native="deleteArticle(item)">删除</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
                <div class="c-page">
                    <Page
                        :current="articles.page.index"
                        :page-size="articles.page.size"
                        :total="articles.page.count"
                        @on-change="pageChange"
                    />
                </div>
            </div>
        </user>
    </div>
</template>

<script type="text/ecmascript-6">
import apiUser from '~/api/user'
import user from '~/components/user'
import pageHeader from '~/components/page-header'
export default {
    layout: 'auth',
    data() {
        return {
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
        pageHeader
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
            const data = {
                id: e.id
            }
            apiUser.deleteArticle({ axios: this.$axios, params: data }).then(res => {
                if (res.done) {
                    this.$Message.success('删除成功')
                    this.getArticles()
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
.contents {
    .c-content {
        height: 100%;
        overflow-y: auto;
        background: white;
        .c-list {
            .l-item {
                position: relative;
                display: flex;
                align-items: center;
                height: 150px;
                margin: 0 30px;
                .i-left {
                    flex-basis: 156px;
                    height: 100px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .i-right {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding-left: 15px;
                    .r-name {
                        span {
                            font-size: 20px;
                            font-weight: 700;
                            color: #555;
                        }
                        &:hover {
                            cursor: pointer;
                        }
                    }
                    .r-time {
                        padding-top: 10px;
                        span {
                            position: relative;
                            font-size: 14px;
                            color: #777;
                            &:not(:last-child) {
                                padding-right: 15px;
                                &:after {
                                    position: absolute;
                                    content: "";
                                    right: 6px;
                                    top: 50%;
                                    transform: translateY(-50%);
                                    width: 2px;
                                    height: 2px;
                                    border-radius: 1px;
                                    background: #777;
                                }
                            }
                        }
                    }
                }
                .i-more {
                    position: absolute;
                    top: 30px;
                    right: 0;
                    i {
                        display: inline-block;
                        width: 30px;
                        height: 30px;
                        text-align: center;
                        line-height: 30px;
                        font-size: 20px;
                        color: #999;
                    }
                    &:hover {
                        cursor: pointer;
                    }
                }
                &:not(:last-child) {
                    border-bottom: 1px solid #f2f2f2;
                }
            }
        }
        .c-page {
            display: flex;
            justify-content: center;
            padding: 30px 0;
        }
    }
}
</style>
