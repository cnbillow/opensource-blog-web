<template>
    <div class="author">
        <white-header></white-header>
        <author-layout :user="info.user">
            <div class="a-list">
                <div class="l-item" :key="key" v-for="(item, key) in authorArticles.list">
                    <div class="i-left">
                        <img :src="item.cover | imgCover" alt="">
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
                        <div class="c-item"
                             :key="key"
                             @click="nav('/article/' + item.id)"
                             v-for="(item, key) in info.mostViewArticles">
                            <div class="i-cover">
                                <img :src="item.cover | imgCover" alt="">
                            </div>
                            <div class="i-text">
                                <p>{{item.title}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </author-layout>
        <white-footer></white-footer>
    </div>
</template>

<script type="text/ecmascript-6">
    import {api} from '@/service/api'
    import whiteHeader from '@/components/white-header'
    import whiteFooter from '@/components/white-footer'
    import authorLayout from '@/components/author-layout'
    export default {
        data () {
            return {
                info: {
                    user: {},
                    mostViewArticles: []
                },
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
        components: {
            whiteHeader,
            whiteFooter,
            authorLayout
        },
        methods: {
            getAuthor() {
                api.page.author({id: this.$route.params.id}).then(res => {
                    if (res.done) {
                        this.info = res.data
                    }
                })
            },
            getArticles() {
                api.article.getByUserId(this.authorArticles.form).then(res => {
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
        created () {
            this.getAuthor()
            this.getArticles()
        }
    }
</script>

<style lang="less">
    @import "index";
</style>
