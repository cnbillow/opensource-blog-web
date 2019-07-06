<template>
    <div class="article">
        <page-header theme="light"></page-header>
        <author :user="info.user">
            <div class="m-article">
                <div class="a-header">
                    <div class="h-title">
                        <span></span>
                        <h1>{{info.article.title}}</h1>
                    </div>
                    <div class="h-time">
                        <div class="t-item">
                            <i class="iconfont icon-time"></i>
                            <span>{{info.article.create_time | timeFormat}}</span>
                        </div>
                        <div class="t-item">
                            <i class="iconfont icon-liulan"></i>
                            <span>{{info.article.view_count}}</span>
                        </div>
                        <div class="t-item">
                            <i class="iconfont icon-pinglun"></i>
                            <span>{{info.article.comment_count}}</span>
                        </div>
                    </div>
                </div>
                <div class="a-content">
                    <markdown-preview :md="info.article.text"></markdown-preview>
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
                                <div
                                    class="r-item"
                                    :key="key"
                                    v-for="(item, key) in info.article.tag"
                                >
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
                                <img
                                    src="https://linknemo-1253378501.picgz.myqcloud.com/linknemo/20190102/5c2c76ae5aa7cb04f55bbcfa?imageView2/1/w/200/h/200"
                                    alt
                                />
                            </div>
                            <div class="p-right">
                                <div class="r-input">
                                    <textarea
                                        name
                                        id
                                        cols="30"
                                        rows="10"
                                        placeholder="请输入您的评论"
                                        v-model="form.text"
                                    ></textarea>
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
                            <div class="l-item" :key="key" v-for="(item, key) in comment.list">
                                <div class="i-left">
                                    <img
                                        src="https://linknemo-1253378501.picgz.myqcloud.com/linknemo/20190102/5c2c76ae5aa7cb04f55bbcfa?imageView2/1/w/200/h/200"
                                        alt
                                    />
                                </div>
                                <div class="i-right">
                                    <div class="r-name">
                                        <span>{{item.create_user.nickname}}</span>
                                    </div>
                                    <div class="r-text">
                                        <span v-if="item.refer_user">@{{item.refer_user.nickname}}</span>
                                        <span>{{item.text}}</span>
                                    </div>
                                    <div class="r-reply">
                                        <div class="r-left">
                                            <span
                                                @click="tryInput('' + key, item.create_user.id)"
                                            >回复</span>
                                        </div>
                                    </div>
                                    <div class="r-post" v-if="inputFocus['' + key]">
                                        <div class="p-input">
                                            <textarea
                                                name
                                                cols="30"
                                                rows="10"
                                                placeholder="请输入您的评论"
                                                v-model="form.text"
                                            ></textarea>
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
                            <div
                                class="d-item"
                                :key="key"
                                v-for="(item, key) in info.article.source"
                            >
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
                            <div
                                class="g-item"
                                :key="key"
                                v-for="(item, key) in info.article.goods"
                            >
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
                    <div class="b-content b-content-article">
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
                <div class="r-block">
                    <div class="b-title">
                        <i class="iconfont icon-xuanchuantuiguang"></i>
                        <span>热门服务</span>
                    </div>
                    <div class="b-content b-content-service">
                        <div
                            class="c-item"
                            :key="key"
                            @click="openUrl(item.url)"
                            v-for="(item, key) in info.promotes"
                        >
                            <div class="i-cover">
                                <img :src="item.cover | imgCover" alt />
                            </div>
                            <div class="i-name">
                                <p>{{item.name}}</p>
                            </div>
                            <div class="i-desc">
                                <p>{{item.desc}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="r-block" v-if="articleCategory.length">
                    <div class="b-title">
                        <i class="iconfont icon-mulu"></i>
                        <span>目录</span>
                    </div>
                    <div class="b-content b-content-category">
                        <div class="c-item" :key="key" v-for="(item, key) in articleCategory">
                            <div class="i-title">
                                <span>{{item.name}}</span>
                            </div>
                            <div class="i-sub">
                                <div class="s-item" :key="key1" v-for="(item1, key1) in item.list">
                                    <span>{{item1.name}}</span>
                                </div>
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
import apiAticle from '~/api/article'
import apiUser from '~/api/user'
import { mapState, mapGetters, mapMutations } from 'vuex'
import author from '~/components/author'
import pageHeader from '~/components/page-header'
import pageFooter from '~/components/page-footer'
import markdownPreview from '~/components/markdown-preview'
export default {
    head() {
        return {
            title: `Kyeteo — ${this.info.article.title}`,
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                { hid: 'description', name: 'description', content: `Kyeteo vuejs ssr 服务端渲染 esp芯片 树莓派 ${this.info.article.title}` }
            ],
            script: [
                {
                    src: '/js/seo.js'
                }
            ]
        }
    },
    fetch({ $axios, store, params }) {
        return store.dispatch('page/getArticle', { axios: $axios, params })
    },
    data() {
        return {
            id: this.$route.params.id,
            inputFocus: {},
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
    computed: {
        ...mapState('page', {
            info: 'article'
        }),
        ...mapGetters('page', ['articleCategory'])
    },
    components: {
        author,
        pageHeader,
        pageFooter,
        markdownPreview
    },
    methods: {
        ...mapMutations('page', ['UPDATE_ARTICLE_PRAISE_COUNT']),
        tryInput(s, id = '') {
            this.inputFocus = {}
            this.form.refer = id
            this.$set(this.inputFocus, s, true)
        },
        getArticleComment() {
            this.comment.form.id = this.$route.params.id
            apiAticle.getComment({ axios: this.$axios, params: this.comment.form }).then(res => {
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
        doPraise() {
            const data = {
                id: this.id
            }
            apiUser.doPraise({ axios: this.$axios, params: data }).then(res => {
                if (res.done) {
                    this.UPDATE_ARTICLE_PRAISE_COUNT()
                    this.$Message.success('感谢您的支持！')
                }
            })
        },
        createArticleComment() {
            if (!this.form.text) {
                this.$Message.warning('评论不能为空')
            }
            const data = {
                id: this.id,
                refer: this.form.refer,
                text: this.form.text
            }
            apiUser.createArticleComment({ axios: this.$axios, params: data }).then(res => {
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
    mounted() {
        this.getArticleComment()
    }
}
</script>

<style lang="less">
.article {
    .m-article {
        padding: 0 30px;
        margin-top: 15px;
        .a-header {
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 83px;
            border-bottom: 1px solid #f2f2f2;
            .h-title {
                display: flex;
                align-items: center;
                span {
                    display: inline-block;
                    width: 4px;
                    height: 4px;
                    background-color: rgb(255, 105, 78);
                    border-width: 2px;
                    border-style: solid;
                    border-color: rgb(195, 195, 195);
                    border-image: initial;
                    border-radius: 100%;
                }
                p {
                    padding-left: 10px;
                    margin: 0;
                    font-weight: 700;
                    font-size: 16px;
                    color: rgb(85, 85, 85);
                }
            }
            .h-time {
                display: flex;
                .t-item {
                    display: flex;
                    align-items: center;
                    color: rgb(85, 85, 85);
                    i {
                        display: inline-block;
                        width: 20px;
                        height: 20px;
                        text-align: center;
                        line-height: 20px;
                        font-size: 14px;
                    }
                    &:not(:first-child) {
                        padding-left: 10px;
                    }
                }
            }
        }
        .a-content {
            .v-note-wrapper {
                width: 664px;
                .v-note-panel {
                    border: none;
                    .v-note-show {
                        .v-show-content {
                            padding: 0;
                            background: white;
                        }
                    }
                }
            }
        }
        .a-footer {
            .f-tag {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 200px;
                border-bottom: 1px solid rgb(225, 232, 237);
                .t-up {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 110px;
                    height: 36px;
                    border-radius: 18px;
                    background: #dc3dea;
                    span {
                        color: white;
                    }
                    &:hover {
                        cursor: pointer;
                    }
                }
                .t-label {
                    display: flex;
                    align-items: center;
                    padding-top: 10px;
                    color: rgb(85, 85, 85);
                    .l-left {
                        display: flex;
                        align-items: center;
                    }
                    .l-right {
                        display: flex;
                        align-items: center;
                        padding-left: 10px;
                        .r-item {
                            &:not(:last-child) {
                                &:after {
                                    content: ",";
                                }
                            }
                        }
                    }
                }
            }
            .f-comment {
                .c-count {
                    display: flex;
                    align-items: center;
                    height: 50px;
                    em {
                        font: 22px/24px Georgia;
                        color: #f85959;
                    }
                    span {
                        font-size: 16px;
                        font-weight: 700;
                        color: #657180;
                    }
                }
                .c-post {
                    display: flex;
                    .p-left {
                        display: flex;
                        justify-content: center;
                        flex-basis: 45px;
                        img {
                            display: inline-block;
                            width: 30px;
                            height: 30px;
                            border-radius: 15px;
                        }
                    }
                    .p-right {
                        flex: 1;
                        border: 1px solid #3f404c;
                        .r-input {
                            display: none;
                            padding: 11px 16px 0;
                            textarea {
                                width: 100%;
                                height: 100px;
                                padding: 0;
                                font-size: 16px;
                                border: none;
                                outline: none;
                                resize: none;
                            }
                        }
                        .r-btn {
                            display: flex;
                            justify-content: space-between;
                            height: 44px;
                            background: white;
                            .b-left {
                                display: flex;
                                align-items: center;
                                padding-left: 16px;
                            }
                            .b-right {
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                flex-basis: 110px;
                                background: #3f404c;
                                span {
                                    color: white;
                                }
                                &:hover {
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                    &-active {
                        .p-right {
                            .r-input {
                                display: block;
                            }
                            .r-btn {
                                justify-content: flex-end;
                                background: #f4f5f6;
                                .b-left {
                                    display: none;
                                }
                            }
                        }
                    }
                }
                .c-list {
                    padding-top: 22px;
                    .l-item {
                        display: flex;
                        padding: 14px 0;
                        border-top: 1px solid #f2f2f2;
                        .i-left {
                            display: flex;
                            justify-content: center;
                            flex-basis: 45px;
                            img {
                                display: inline-block;
                                width: 30px;
                                height: 30px;
                                border-radius: 15px;
                            }
                        }
                        .i-right {
                            flex: 1;
                            font-size: 14px;
                            color: #555;
                            .r-text {
                                p {
                                    margin: 0;
                                }
                            }
                            .r-reply {
                                .r-left {
                                    span {
                                        color: #406599;
                                    }
                                    &:hover {
                                        cursor: pointer;
                                    }
                                }
                            }
                            .r-post {
                                border: 1px solid #3f404c;
                                .p-input {
                                    padding: 11px 16px 0;
                                    textarea {
                                        width: 100%;
                                        height: 100px;
                                        padding: 0;
                                        font-size: 16px;
                                        border: none;
                                        outline: none;
                                        resize: none;
                                    }
                                }
                                .p-btn {
                                    display: flex;
                                    justify-content: flex-end;
                                    height: 44px;
                                    background: #f4f5f6;
                                    .b-right {
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        flex-basis: 110px;
                                        background: #3f404c;
                                        span {
                                            color: white;
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
                .c-more {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 30px;
                    margin: 30px 0;
                    background: #f4f5f6;
                    span {
                        color: #406599;
                    }
                    &:hover {
                        cursor: pointer;
                    }
                }
            }
        }
    }
    .l-block {
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
            padding-left: 20px;
            a {
                color: #555;
                text-decoration: underline;
            }
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
            &-article {
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
                    &:not(:first-child) {
                        margin-top: 10px;
                    }
                    &:hover {
                        cursor: pointer;
                    }
                }
            }
            &-service {
                .c-item {
                    .i-cover {
                        width: 100%;
                        height: 90px;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .i-name {
                        padding: 5px 0;
                        font-size: 16px;
                        font-weight: 600;
                        color: #373d41;
                    }
                    &:hover {
                        cursor: pointer;
                    }
                    &:not(:first-child) {
                        padding-top: 20px;
                    }
                }
            }
            &-category {
                position: relative;
                .c-item {
                    display: flex;
                    flex-direction: column;
                    .i-title {
                        position: relative;
                        display: flex;
                        align-items: center;
                        width: 100%;
                        box-sizing: border-box;
                        height: 26px;
                        padding-left: 20px;
                        margin-bottom: 6px;
                        span {
                            text-decoration: none;
                            font-size: 14px;
                            font-weight: 600;
                            color:#000;
                        }
                        &::before {
                            position: absolute;
                            content: "";
                            left: 0;
                            top: 50%;
                            transform: translateY(-50%);
                            width: 5px;
                            height: 5px;
                            border-radius: 2.5px;
                            background: currentColor;
                        }
                        &:hover {
                            background: #ebedef;
                            cursor: pointer;
                        }
                    }
                    .i-sub {
                        width: 100%;
                        box-sizing: border-box;
                        padding-left: 16px;
                        .s-item {
                            position: relative;
                            display: flex;
                            align-items: center;
                            height: 26px;
                            padding-left: 20px;
                            margin-bottom: 6px;
                            span {
                                text-decoration: none;
                                color:#333;
                            }
                            &::before {
                                position: absolute;
                                content: "";
                                left: 0;
                                top: 50%;
                                transform: translateY(-50%);
                                width: 4px;
                                height: 4px;
                                border-radius: 2px;
                                background: currentColor;
                            }
                            &:hover {
                                background: #ebedef;
                                cursor: pointer;
                            }
                        }
                    }
                }
                &::before {
                    position: absolute;
                    content: "";
                    left: 2.5px;
                    top: 0;
                    width: 1px;
                    height: 100%;
                    background: #eee;
                }
            }
        }
    }
}
</style>
