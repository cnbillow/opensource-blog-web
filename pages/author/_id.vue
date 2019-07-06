<template>
    <div class="author">
        <page-header theme="light"></page-header>
        <author :user="info.user">
            <div class="a-list">
                <div class="l-item" :key="key" v-for="(item, key) in authorArticles.list">
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
                </div>
            </div>
            <div class="a-more">
                <span v-if="authorArticles.more" @click="getArticles">查看更多文章</span>
                <span v-else>暂无更多文章</span>
            </div>
            <template slot="right">
                <div class="r-block">
                    <div class="b-title">
                        <i class="iconfont icon-paixingbang"></i>
                        <span>点击排行榜</span>
                    </div>
                    <div class="b-content">
                        <div
                            class="c-item"
                            :key="key"
                            @click="nav('/article/' + item.id)"
                            v-for="(item, key) in info.mostViewArticles"
                        >
                            <div class="i-cover">
                                <img :src="item.cover | imgCover" alt />
                            </div>
                            <div class="i-text">
                                <p>{{item.title}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </author>
        <page-footer theme="light"></page-footer>
    </div>
</template>

<script type="text/ecmascript-6">
import apiArticle from '~/api/article'
import { mapState } from 'vuex'
import author from '~/components/author'
import pageHeader from '~/components/page-header'
import pageFooter from '~/components/page-footer'
export default {
    fetch({ $axios, store, params }) {
        return store.dispatch('page/getAuthor', { axios: $axios, params })
    },
    data() {
        return {
            authorArticles: {
                form: {
                    id: this.$route.params.id,
                    index: 1,
                    size: 10
                },
                list: [],
                more: true
            }
        }
    },
    computed: {
        ...mapState('page', {
            info: 'author'
        })
    },
    components: {
        author,
        pageHeader,
        pageFooter,
    },
    methods: {
        getArticles() {
            apiArticle.getByUserId({axios: this.$axios, params: this.authorArticles.form}).then(res => {
                if (res.done) {
                    res.data.forEach(i => {
                        this.authorArticles.list.push(i)
                    })
                    this.authorArticles.form.index += 1
                    if (this.authorArticles.list.length === res.page.count) {
                        this.authorArticles.more = false
                    }
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
.author {
    .a-list {
        padding: 0 30px;
        margin-top: 15px;
        .l-item {
            display: flex;
            align-items: center;
            height: 150px;
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
            &:not(:last-child) {
                border-bottom: 1px solid #f2f2f2;
            }
        }
    }
    .a-more {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30px;
        margin: 30px 30px;
        background: #f4f5f6;
        span {
            color: #406599;
        }
        &:hover {
            cursor: pointer;
        }
    }
    .r-block {
        padding-top: 15px;
        .b-title {
            display: flex;
            align-items: center;
            height: 42px;
            color: rgb(91, 95, 109);
            span {
                padding-left: 10px;
                font-size: 14px;
                font-weight: bold;
            }
        }
        .b-content {
            .c-item {
                display: flex;
                align-items: center;
                .i-cover {
                    flex-basis: 48px;
                    height: 48px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .i-text {
                    flex: 1;
                    padding-left: 10px;
                    p {
                        margin: 0;
                        line-height: 20px;
                        font-size: 14px;
                        color: rgb(230, 120, 100);
                    }
                }
                &:hover {
                    cursor: pointer;
                }
                &:not(:first-child) {
                    margin-top: 10px;
                }
            }
        }
    }
}
</style>
