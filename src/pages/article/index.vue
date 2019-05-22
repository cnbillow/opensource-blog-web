<template>
    <div class="article">
        <white-header></white-header>
        <author-layout :user="info.user">
            <div class="m-article">
                <div class="a-header">
                    <div class="h-title">
                        <span></span>
                        <p>{{info.article.title}}</p>
                    </div>
                    <div class="h-time">
                        <div class="t-item">
                            <i class="iconfont icon-time"></i>
                            <span>2018-12-12 14:20</span>
                        </div>
                        <div class="t-item">
                            <i class="iconfont icon-liulan"></i>
                            <span>4,200</span>
                        </div>
                        <div class="t-item">
                            <i class="iconfont icon-pinglun"></i>
                            <span>1</span>
                        </div>
                    </div>
                </div>
                <div class="a-content">
                    <mavon-editor :toolbarsFlag="false" :boxShadow="false" defaultOpen="preview" :subfield="false" v-model="info.article.text"/>
                </div>
                <div class="a-footer">
                    <div class="f-tag">
                        <div class="t-up" @click="doPraise">
                            <span>点赞({{info.article.praise_count}})</span>
                        </div>
                        <div class="t-label">
                            <div class="l-left">
                                <span>文章标签</span>
                                <i class="iconfont icon-iconset0169"></i>
                                <span>:</span>
                            </div>
                            <div class="l-right">
                                <div class="r-item" :key="key" v-for="(item, key) in info.article.tag">
                                    <span>{{item.name}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="f-pre-next"></div>
                    <div class="f-comment">
                        <div class="c-count">
                            <em>{{comment.list.length}}</em>
                            <span>条评论</span>
                        </div>
                        <div class="c-post" :class="{'c-post-active': inputFocus['-1']}">
                            <div class="p-left">
                                <img src="https://linknemo-1253378501.picgz.myqcloud.com/linknemo/20190102/5c2c76ae5aa7cb04f55bbcfa?imageView2/1/w/200/h/200" alt="">
                            </div>
                            <div class="p-right">
                                <div class="r-input">
                                    <textarea name="" id="" cols="30" rows="10" placeholder="请输入您的评论" v-model="form.text"></textarea>
                                </div>
                                <div class="r-btn">
                                    <div class="b-left">
                                        <span @click="tryInput('-1')">写下您的回复...</span>
                                    </div>
                                    <div class="b-right" @click="createArticleComment">
                                        <span>发表</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="c-list">
                            <div class="l-item"
                                 :key="key" v-for="(item, key) in comment.list">
                                <div class="i-left">
                                    <img src="https://linknemo-1253378501.picgz.myqcloud.com/linknemo/20190102/5c2c76ae5aa7cb04f55bbcfa?imageView2/1/w/200/h/200" alt="">
                                </div>
                                <div class="i-right">
                                    <div class="r-name">
                                        <span>{{item.create_user.nickname}}</span>
                                    </div>
                                    <div class="r-text">
                                        <span v-if="item.refer_user">@{{item.refer_user.nickname}} </span>
                                        <span>{{item.text}}</span>
                                    </div>
                                    <div class="r-reply">
                                        <div class="r-left">
                                            <span @click="tryInput('' + key, item.create_user.id)">回复</span>
                                        </div>
                                    </div>
                                    <div class="r-post" v-if="inputFocus['' + key]">
                                        <div class="p-input">
                                            <textarea name="" cols="30" rows="10" placeholder="请输入您的评论" v-model="form.text"></textarea>
                                        </div>
                                        <div class="p-btn">
                                            <div class="b-right" @click="createArticleComment">
                                                <span>回复</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="c-more">
                            <span>暂无更多评论</span>
                        </div>
                    </div>
                </div>
            </div>
            <template slot="left">
                <div class="l-block" v-if="info.article.know.length">
                    <div class="b-title">
                        <i class="iconfont icon-zhishi"></i>
                        <span>知识要素</span>
                    </div>
                    <div class="b-content">
                        <div class="c-knowledge">
                            <div class="k-item" :key="key" v-for="(item, key) in info.article.know">
                                <i class="iconfont icon-dian"></i>
                                <a :href="item.url" target="_blank">{{item.name}}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="l-block" v-if="info.article.source.length">
                    <div class="b-title">
                        <i class="iconfont icon-xiazai"></i>
                        <span>资源下载</span>
                    </div>
                    <div class="b-content">
                        <div class="c-download">
                            <div class="d-item" :key="key" v-for="(item, key) in info.article.source">
                                <i class="iconfont icon-dian"></i>
                                <a :href="item.url" target="_blank">{{item.name}}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="l-block" v-if="info.article.goods.length">
                    <div class="b-title">
                        <i class="iconfont icon-lianjie"></i>
                        <span>购买物件</span>
                    </div>
                    <div class="b-content">
                        <div class="c-goods">
                            <div class="g-item" :key="key" v-for="(item, key) in info.article.goods">
                                <i class="iconfont icon-dian"></i>
                                <a :href="item.url" target="_blank">{{item.name}}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
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
    import { mavonEditor } from 'mavon-editor'
    export default {
        data () {
            return {
                id: this.$route.params.id,
                inputFocus: {},
                info:{
                    user: {
                        tag: []
                    },
                    article: {
                        title: '',
                        text: '',
                        tag: [],
                        know: [],
                        source: [],
                        goods: []
                    },
                    mostViewArticles: []
                },
                comment: {
                    form: {
                        index: 1,
                        size: 10
                    },
                    list: [],
                    more: true
                },
                form: {
                    refer: '',
                    text: ''
                }
            }
        },
        components: {
            mavonEditor,
            whiteHeader,
            whiteFooter,
            authorLayout
        },
        methods: {
            tryInput (s, id = '') {
                this.inputFocus = {}
                this.form.refer = id
                this.$set(this.inputFocus, s, true)
            },
            getArticle () {
                api.page.article({id: this.id}).then(res => {
                    if (res.done) {
                        this.info = res.data
                    }
                })
            },
            getArticleComment() {
                this.comment.form.id = this.$route.params.id
                api.article.getComment(this.comment.form).then(res => {
                    if (res.done) {
                        res.data.forEach(i => {
                            this.comment.list.push(i)
                        })
                        if (this.comment.list.length === res.page.count) {
                            this.comment.more = false
                        }
                    }
                })
            },
            doPraise () {
                const data = {
                    id: this.id
                }
                api.user.doPraise(data).then(res => {
                    if (res.done) {
                        this.info.article.praise_count += 1
                        this.$Message.success('感谢您的支持！')
                    }
                })
            },
            createArticleComment () {
                if (!this.form.text) {
                    this.$Message.warning('评论不能为空')
                }
                const data = {
                    id: this.id,
                    refer: this.form.refer,
                    text:  this.form.text
                }
                api.user.createArticleComment(data).then(res => {
                    if (res.done) {
                        this.comment.list.unshift(res.data)
                        this.form.refer = ''
                        this.form.text = ''
                        this.inputFocus = {}
                        this.$Message.success('评论成功！')
                    }
                })
            }
        },
        created () {
            this.getArticle()
            this.getArticleComment()
        }
    }
</script>

<style lang="less">
    @import "index";
</style>
