<template>
    <div class="tag">
        <white-header></white-header>
        <article>
            <div class="t-article">
                <div class="a-main">
                    <div class="m-hot">
                        <div class="h-title">
                            <span>标签：#{{info.tag.name}}</span>
                        </div>
                        <div class="h-list">
                            <div class="l-item" :key="key" v-for="(item, key) in article.list">
                                <div class="i-title">
                                    <h3 @click="nav('/article/' + item.id)">{{item.title}}</h3>
                                </div>
                                <div class="i-content">
                                    <div class="c-left">
                                        <img :src="item.cover | imgCover"
                                             alt="">
                                    </div>
                                    <div class="c-right">
                                        <div class="r-text">
                                            <p>{{item.text}}</p>
                                        </div>
                                        <div class="r-author">
                                            <div class="a-left">
                                                <div class="l-avatar">
                                                    <img src="https://linknemo-1253378501.picgz.myqcloud.com/linknemo/20190102/5c2c76ae5aa7cb04f55bbcfa?imageView2/1/w/200/h/200"
                                                         alt="">
                                                </div>
                                                <div class="l-name">
                                                    <span>kyeteo</span>
                                                </div>
                                                <div class="l-time">
                                                    <span>2018年06月15 10:00</span>
                                                </div>
                                            </div>
                                            <div class="a-right">
                                                <span>阅读更多</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="h-more">
                            <span v-if="article.more" @click="getArticlesByTagId">查看更多文章</span>
                            <span v-else>暂无更多文章</span>
                        </div>
                    </div>
                </div>
                <div class="a-side">
                    <div class="s-item">
                        <div class="i-title">
                            <span>最新文章</span>
                        </div>
                        <div class="i-content">
                            <div class="c-article">
                                <template v-for="(item, key) in info.newestArticle">
                                    <div class="a-top" :key="key" v-if="key === 0" @click="nav('/article/' + item.id)">
                                        <img :src="item.cover | imgCover"
                                             alt="">
                                        <div class="i-title">
                                            <span>{{item.title}}</span>
                                        </div>
                                    </div>
                                    <div class="a-item" :key="key" @click="nav('/article/' + item.id)" v-else>
                                        <div class="i-left">
                                            <img :src="item.cover | imgCover"
                                                 alt="">
                                        </div>
                                        <div class="i-right">
                                            <div class="r-text">
                                                <p>{{item.title}}</p>
                                            </div>
                                            <div class="r-time">
                                                <span>2018年12月 12:30</span>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="s-item">
                        <div class="i-title">
                            <span>友情链接</span>
                        </div>
                        <div class="i-content">
                            <div class="c-link">
                                <div class="l-item" :key="key" v-for="(item, key) in info.link">
                                    <a :href="item.url">{{item.name}}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
        <white-footer></white-footer>
    </div>
</template>

<script type="text/ecmascript-6">
    import {api} from '@/service/api'
    import whiteHeader from '@/components/white-header'
    import whiteFooter from '@/components/white-footer'

    export default {
        data() {
            return {
                info: {
                    link: [],
                    newestArticle: [],
                    tag: {}
                },
                article: {
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
            whiteFooter
        },
        methods: {
            getTagInfo () {
                const data = {
                    id: this.article.form.id
                }
                api.page.tag(data).then(res => {
                    if (res.done) {
                        this.info = res.data
                    }
                })
            },
            getArticlesByTagId() {
                api.article.getByTagId(this.article.form).then(res => {
                    if (res.done) {
                        res.data.forEach(i => {
                            this.article.list.push(i)
                        })
                        if (this.article.list.length === res.page.count) {
                            this.article.more = false
                        }
                    }
                })
            }
        },
        created() {
            this.getTagInfo()
            this.getArticlesByTagId()
        }
    }
</script>

<style lang="less">
    @import './index';
</style>
