<template>
    <div class="article">
        <x-header></x-header>
        <author
            :user="info.user"
            :mostViewArticles="info.mostViewArticles"
            :promotes="info.promotes"
            :userHotArticles="info.userHotArticles"
            :userHotBooks="info.userHotBooks"
        >
            <div class="m-book" v-if="'id' in book">
                <div class="b-top">
                    <div class="t-cover">
                        <img :src="book.cover | imgCover" alt />
                    </div>
                    <div class="t-text">
                        <div class="te-top">
                            <h2>[专题] {{book.title}}</h2>
                            <p>{{book.desc}}</p>
                        </div>
                        <div class="te-bottom">
                            <div class="b-author">
                                <img :src="info.user.avatar | avatarCover" alt />
                                <span>{{info.user.nickname}}</span>
                            </div>
                            <div class="b-start">
                                <div class="s-btn" @click="nav('/book/' + book.id)">
                                    <span>进入相关专题</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="b-bottom">
                    <div class="b-icon">
                        <i class="iconfont icon-like"></i>
                    </div>
                    <div class="b-text">
                        <span>点赞</span>
                    </div>
                    <div class="b-avatar">
                        <div class="a-item">
                            <img :src="info.user.avatar | avatarCover" alt />
                        </div>
                    </div>
                </div>
            </div>
            <div class="m-ad">
                <google-ad :sn="7866216269"></google-ad>
            </div>
            <div class="m-article">
                <div class="a-header">
                    <div class="h-title">
                        <h1>{{section.title || info.article.title}}</h1>
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
                                <img :src="user.avatar | avatarCover" alt />
                            </div>
                            <div class="p-right">
                                <div class="r-input">
                                    <textarea
                                        :ref="`-1-comment-input`"
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
                                        <span
                                            @click="tryInput('-1')"
                                        >{{'id' in user ? '写下您的回复...' : '以游客身份评论'}}</span>
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
                                    <img :src="item.create_user.avatar | avatarCover" alt />
                                </div>
                                <div class="i-right">
                                    <div class="r-name">
                                        <span>{{item.create_user.nickname}}</span>
                                        <span>{{item.create_time | timeFormat}}</span>
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
                                    <div
                                        class="r-post"
                                        :class="{'r-post-active': inputFocus['' + key]}"
                                    >
                                        <div class="p-input">
                                            <textarea
                                                :ref="`${key}-comment-input`"
                                                name
                                                cols="30"
                                                rows="10"
                                                :placeholder="'id' in user ? '请输入您的评论' : '以游客身份回复'"
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
            <specific-recommend :recommend="recommend" @do-get="getRecommend"></specific-recommend>
            <x-footer></x-footer>
            <template slot="left">
                <div class="s-left-section s-left-section-source" v-if="info.article.know.length">
                    <div class="s-title">
                        <i class="iconfont icon-zhishi"></i>
                        <span>知识要素</span>
                    </div>
                    <div class="s-content">
                        <div class="c-knowledge">
                            <div class="k-item" :key="key" v-for="(item, key) in info.article.know">
                                <i class="iconfont icon-dian"></i>
                                <a :href="item.url" target="_blank">{{item.name}}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="s-left-section s-left-section-source" v-if="info.article.source.length">
                    <div class="s-title">
                        <i class="iconfont icon-xiazai"></i>
                        <span>资源下载</span>
                    </div>
                    <div class="s-content">
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
                <div class="s-left-section s-left-section-source" v-if="info.article.goods.length">
                    <div class="s-title">
                        <i class="iconfont icon-lianjie"></i>
                        <span>购买物件</span>
                    </div>
                    <div class="s-content">
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
                <div class="s-left-section s-left-section-tools">
                    <div class="t-top">
                        <div class="t-item">
                            <i class="iconfont icon-pinglun"></i>
                        </div>
                        <div class="t-item">
                            <i class="iconfont icon-like"></i>
                        </div>
                    </div>
                    <div class="t-bottom">
                        <div class="b-item">
                            <i class="iconfont icon-lianjie"></i>
                        </div>
                        <div class="b-item">
                            <i class="iconfont icon-weixin"></i>
                            <div class="i-weixin" id="qrcode"></div>
                        </div>
                    </div>
                </div>
            </template>
            <template slot="right">
                <div class="s-right s-right-cate" v-if="articleCategory.length">
                    <div class="r-title">
                        <i class="iconfont icon-mulu"></i>
                        <span>目录</span>
                    </div>
                    <div class="c-content">
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
                <div class="s-right s-right-ad">
                    <google-ad :sn="5240052921"></google-ad>
                </div>
                <div class="s-right s-right-link" v-if="articleCategory.length">
                    <div class="r-title">
                        <i class="iconfont icon-youqingtishi"></i>
                        <span>友情链接</span>
                    </div>
                    <div class="l-content">
                        <div class="c-item" :key="key" v-for="(item, key) in info.link">
                            <a :href="item.url" target="_blank">
                                <div class="i-left">
                                    <span>{{item.name}}</span>
                                </div>
                                <div class="i-right">
                                    <span>前往</span>
                                    <i class="iconfont icon-next"></i>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </template>
        </author>
    </div>
</template>

<script type="text/ecmascript-6">
import apiAticle from "~/api/article"
import apiUser from "~/api/user"
import apiSpecific from "~/api/specific"
import { mapState, mapGetters, mapMutations } from "vuex"
import author from "~/components/author"
import specificRecommend from "~/components/specific-recommend"
import xHeader from "~/components/x-header"
import xFooter from "~/components/x-footer"
import markdownPreview from "~/components/markdown-preview"
import googleAd from '~/components/google-ad'
export default {
    head() {
        return {
            title: `Kyeteo — ${this.info.article.title}`,
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                {
                    hid: "description",
                    name: "description",
                    content: `Kyeteo vuejs ssr 服务端渲染 esp芯片 树莓派 ${this.info.article.title}`
                }
            ],
            script: [
                {
                    src: "/js/seo.js"
                },
                {
                    src: "/js/qrcode.min.js"
                }
            ]
        }
    },
    fetch({ $axios, store, params }) {
        return store.dispatch("page/getArticle", { axios: $axios, params })
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
            recommend: {
                form: {
                    index: 1,
                    size: 10
                },
                list: [],
                more: true
            },
            form: {
                refer: "",
                text: ""
            }
        };
    },
    computed: {
        ...mapState(['user']),
        ...mapState("page", {
            info: "article"
        }),
        ...mapGetters("page", ["articleCategory"]),
        section() {
            if (!this.info.article.section.length) {
                return {}
            }
            return this.info.article.section[0]
        },
        book() {
            if (!this.info.article.section.length) {
                return {}
            }
            return this.info.article.section[0].book
        }
    },
    components: {
        xFooter,
        author,
        xHeader,
        specificRecommend,
        markdownPreview,
        googleAd
    },
    methods: {
        ...mapMutations("page", ["UPDATE_ARTICLE_PRAISE_COUNT"]),
        init() {
            this.genUrlQrcode()
            this.getArticleComment()
            this.getRecommend()
        },
        genUrlQrcode() {
            try {
                let qrcode = new QRCode("qrcode", {
                    width: 100,
                    height: 100,
                    text: location.href
                })
            } catch (e) {
                location.reload(true)
            }
        },
        tryInput(s, id = "") {
            const inputEle = Array.isArray(this.$refs[`${s}-comment-input`]) ? this.$refs[`${s}-comment-input`][0] : this.$refs[`${s}-comment-input`]
            this.inputFocus = {}
            this.form.refer = id
            this.$set(this.inputFocus, s, true)
            this.$nextTick(() => {
                inputEle.focus()
            })
        },
        getArticleComment() {
            this.comment.form.id = this.$route.params.id
            apiAticle
                .getComment({ axios: this.$axios, params: this.comment.form })
                .then(res => {
                    if (res.done) {
                        res.data.forEach(i => {
                            this.comment.list.push(i)
                        });
                        this.comment.form.index += 1
                        if (this.comment.list.length === res.page.count) {
                            this.comment.more = false
                        }
                    }
                });
        },
        getRecommend() {
            apiSpecific
                .recommend({ axios: this.$axios, params: this.recommend.form })
                .then(res => {
                    if (res.done) {
                        res.data.forEach(i => {
                            this.recommend.list.push(i)
                        });
                        this.recommend.form.index += 1
                        if (this.recommend.list.length === res.page.count) {
                            this.recommend.more = false
                        }
                    }
                });
        },
        doPraise() {
            const data = {
                id: this.id
            };
            apiUser.doPraise({ axios: this.$axios, params: data }).then(res => {
                if (res.done) {
                    this.UPDATE_ARTICLE_PRAISE_COUNT()
                    this.$Message.success("感谢您的支持！")
                }
            })
        },
        createArticleComment() {
            if (!this.form.text) {
                this.$Message.warning("评论不能为空")
            }
            const data = {
                id: this.id,
                refer: this.form.refer,
                text: this.form.text
            };
            apiUser
                .createArticleComment({ axios: this.$axios, params: data })
                .then(res => {
                    if (res.done) {
                        this.comment.list.unshift(res.data)
                        this.form.refer = ""
                        this.form.text = ""
                        this.inputFocus = {}
                        this.$Message.success("评论成功！")
                    }
                })
        }
    },
    mounted() {
        this.init()
    }
};
</script>

<style lang="less">
.article {
    .m-book {
        margin-bottom: 30px;
        background: white;
        .b-top {
            display: flex;
            padding: 20px;
            .t-cover {
                flex-basis: 130px;
                height: 190px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .t-text {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                flex: 1;
                padding-left: 20px;
                .te-top {
                    h2 {
                        font-size: 20px;
                        font-weight: 700;
                        color: #333;
                    }
                    p {
                        padding-top: 10px;
                        font-size: 14px;
                    }
                }
                .te-bottom {
                    .b-author {
                        display: flex;
                        align-items: center;
                        img {
                            width: 26px;
                            height: 26px;
                            border-radius: 13px;
                        }
                        span {
                            padding-left: 10px;
                            font-size: 14px;
                        }
                    }
                    .b-start {
                        display: flex;
                        align-items: center;
                        padding-top: 25px;
                        .s-btn {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            flex-basis: 140px;
                            height: 40px;
                            border-radius: 3px;
                            background: #007fff;
                            span {
                                font-size: 14px;
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
        .b-bottom {
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding: 8px 20px;
            border-top: 1px solid #ecf0f3;
            .b-icon {
            }
            .b-text {
                padding: 0 10px;
                span {
                    font-size: 16px;
                    font-weight: 400;
                    color: #666;
                }
            }
            .b-avatar {
                display: flex;
                align-items: center;
                .a-item {
                    width: 24px;
                    height: 24px;
                    border-radius: 12px;
                    overflow: hidden;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                    &:not(:first-child) {
                        padding-left: 10px;
                    }
                }
            }
        }
    }
    .m-ad{
        width:664px;
        margin-bottom: 30px;
        background: white;
    }
    .m-article {
        background: white;
        .a-header {
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100px;
            padding: 0 20px;
            border-bottom: 1px solid #f2f2f2;
            .h-title {
                display: flex;
                align-items: center;
                h1 {
                    margin: 0;
                    font-weight: 700;
                    color: #333;
                }
            }
            .h-time {
                display: flex;
                color: #909090;
                .t-item {
                    display: flex;
                    align-items: center;
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
        .a-footer {
            padding: 20px;
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
                    background: #007fff;
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
                        color: #007fff;
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
                        border: 1px solid #007fff;
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
                                background: #027fff;
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
                            .r-name {
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                span {
                                    &:first-child {
                                        font-size: 14px;
                                        color: #333;
                                    }
                                    &:last-child {
                                        font-size: 12px;
                                        color: #b2bac2;
                                    }
                                }
                            }
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
                                display: none;
                                border: 1px solid #007fff;
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
                                        background: #027fff;
                                        span {
                                            color: white;
                                        }
                                        &:hover {
                                            cursor: pointer;
                                        }
                                    }
                                }
                                &-active {
                                    display: block;
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
    .s-left-section {
        &-source {
            background: white;
            .s-title {
                display: flex;
                align-items: center;
                height: 42px;
                padding: 0 20px;
                color: rgb(91, 95, 109);
                border-bottom: 1px solid #f4f5f5;
                span {
                    padding-left: 10px;
                    font-size: 14px;
                    font-weight: bold;
                }
            }
            .s-content {
                padding: 20px;
                a {
                    color: #555;
                    text-decoration: underline;
                }
            }
            &:not(:first-child) {
                margin-top: 30px;
            }
        }
        &-tools {
            display: flex;
            flex-direction: column;
            align-items: center;
            .t-top {
                .t-item {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 36px;
                    height: 36px;
                    border-radius: 18px;
                    background: white;
                    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.04);
                    &:not(:first-child) {
                        margin-top: 10px;
                    }
                    &:hover {
                        cursor: pointer;
                        background: #007fff;
                        color: white;
                    }
                }
            }
            .t-bottom {
                position: relative;
                padding-top: 40px;
                .b-item {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 36px;
                    height: 36px;
                    border-radius: 18px;
                    background: white;
                    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.04);
                    .i-weixin {
                        position: absolute;
                        bottom: -115px;
                        left: 50%;
                        transform: translateX(-50%);
                        display: none;
                        border: 5px solid white;
                        background: white;
                        z-index: 10;
                    }
                    &:not(:first-child) {
                        margin-top: 10px;
                    }
                    &:hover {
                        cursor: pointer;
                        background: #007fff;
                        color: white;
                        .i-weixin {
                            display: block;
                        }
                    }
                }
                &:before {
                    position: absolute;
                    top: 20px;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    white-space: nowrap;
                    content: "分享";
                }
            }
        }
        &:not(:first-child) {
            margin-top: 30px;
        }
    }
    .s-right {
        background: white;
        .r-title {
            display: flex;
            align-items: center;
            height: 42px;
            color: rgb(91, 95, 109);
            padding: 0 20px;
            border-bottom: 1px solid #f4f5f5;
            span {
                padding-left: 10px;
                font-size: 14px;
                font-weight: bold;
            }
        }
        &-cate {
            .c-content {
                position: relative;
                padding: 20px;
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
                            color: #000;
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
                                color: #333;
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
                    left: 22.5px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 1px;
                    height: calc(100% - 40px);
                    background: #eee;
                }
            }
        }
        &-ad{
            margin-top: 30px;
        }
        &-link {
            margin-top: 30px;
            .l-content {
                display: block;
                padding: 16px;
                background: white;
                .c-item {
                    a {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        height: 50px;
                        .i-left {
                            font-size: 14px;
                            color: #333;
                            font-weight: 600;
                        }
                        &:hover {
                            cursor: pointer;
                            background-color: rgba(0, 0, 0, 0.01);
                            .i-left {
                                text-decoration: underline;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
