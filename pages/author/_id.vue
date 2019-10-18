<template>
    <div class="author">
        <x-header></x-header>
        <author
            :user="info.user"
            :mostViewArticles="info.mostViewArticles"
            :promotes="info.promotes"
            :userHotArticles="info.userHotArticles"
            :userHotBooks="info.userHotBooks"
        >
            <div class="m-author">
                <div class="a-ad">
                    <google-ad :sn="4285724595"></google-ad>
                </div>
                <div class="a-article">
                    <div class="a-title">
                        <span>他/她的文章</span>
                    </div>
                    <div class="a-list">
                        <div
                            class="l-item"
                            @click="nav('/article/' + item.id)"
                            :key="key"
                            v-for="(item, key) in authorArticles.list"
                        >
                            <div class="i-info">
                                <span>文章</span>
                                <span>kyeteo</span>
                                <span>{{item.create_time}}</span>
                            </div>
                            <div class="i-name">
                                <span v-if="item.section.length && item.section[0].book">《{{item.section[0].book.title}}》</span>
                                <span>{{item.title}}</span>
                            </div>
                            <div class="i-desc">
                                <p>{{item.text | mdText}}</p>
                            </div>
                            <div class="i-do">
                                <div class="d-btns">
                                    <div class="b-item">
                                        <i class="iconfont icon-like"></i>
                                        <span>65</span>
                                    </div>
                                    <div class="b-item">
                                        <i class="iconfont icon-pinglun"></i>
                                        <span>15</span>
                                    </div>
                                </div>
                            </div>
                            <div class="i-cover">
                                <img :src="item.cover | imgCover" alt />
                            </div>
                        </div>
                    </div>
                    <div class="a-more">
                        <div class="m-wrap" @click="getArticles">
                            <span v-if="authorArticles.more">查看更多文章</span>
                            <span v-else>暂无更多文章</span>
                        </div>
                    </div>
                </div>
                <div class="a-book">
                    <div class="b-title">
                        <span>TA的专题</span>
                    </div>
                    <div class="b-list">
                        <div
                            class="l-item"
                            @click="nav('/book/' + item.id)"
                            :key="key"
                            v-for="(item, key) in authorBooks.list"
                        >
                            <div class="i-info">
                                <span>专题</span>
                                <span>{{'id' in item.user ? item.user.nickname : ''}}</span>
                            </div>
                            <div class="i-name">
                                <span>{{item.title}}</span>
                            </div>
                            <div class="i-do">
                                <div class="d-btns">
                                    <div class="b-item">
                                        <i class="iconfont icon-like"></i>
                                        <span>{{item.praise_count}}</span>
                                    </div>
                                    <div class="b-item">
                                        <i class="iconfont icon-pinglun"></i>
                                        <span>{{item.comment_count}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="b-more">
                        <div class="m-wrap" @click="getBooks">
                            <span v-if="authorBooks.more">查看更多专题</span>
                            <span v-else>暂无更多专题</span>
                        </div>
                    </div>
                </div>
            </div>
            <specific-recommend :recommend="recommend" @do-get="getRecommend"></specific-recommend>
            <x-footer></x-footer>
        </author>
    </div>
</template>

<script type="text/ecmascript-6">
import apiArticle from "~/api/article"
import apiBook from "~/api/book"
import apiSpecific from "~/api/specific"
import { mapState } from "vuex"
import author from "~/components/author"
import xHeader from "~/components/x-header"
import specificRecommend from "~/components/specific-recommend"
import xFooter from "~/components/x-footer"
import googleAd from '~/components/google-ad'
const marked = require("marked")
export default {
    head() {
        return {
            title: `${this.info.user.nickname}的个人主页 -keyteo`,
            meta: [
                {
                    hid: "keywords",
                    name: "keywords",
                    content: `${this.info.user.nickname}`
                },
                {
                    hid: "description",
                    name: "description",
                    content: `${this.info.user.saying_text}`
                }
            ]
        }
    },
    fetch({ $axios, store, params }) {
        return store.dispatch("page/getAuthor", { axios: $axios, params })
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
            },
            authorBooks: {
                form: {
                    id: this.$route.params.id,
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
            }
        }
    },
    computed: {
        ...mapState("page", {
            info: "author"
        })
    },
    filters: {
        mdText(md) {
            const mdHtml = marked(md, {
                sanitize: false
            });
            let text = ""
            try {
                text = mdHtml
                    .match(/<\S+>(.*)<\S+>/g)
                    .map(i => {
                        return i.match(/<\S+>(.*)<\S+>/)[1];
                    })
                    .join("")
            } finally {
                text = text.substring(0, 100)
                if (text.length === 100) {
                    text = text + "..."
                }
            }
            return text
        }
    },
    components: {
        author,
        xHeader,
        specificRecommend,
        xFooter,
        googleAd
    },
    methods: {
        init() {
            this.getArticles()
            this.getBooks()
            this.getRecommend()
        },
        getArticles() {
            apiArticle
                .getByUserId({
                    axios: this.$axios,
                    params: this.authorArticles.form
                })
                .then(res => {
                    if (res.done) {
                        res.data.forEach(i => {
                            this.authorArticles.list.push(i)
                        });
                        this.authorArticles.form.index += 1
                        if (
                            this.authorArticles.list.length === res.page.count
                        ) {
                            this.authorArticles.more = false
                        }
                    }
                });
        },
        getBooks() {
            apiBook
                .getByUserId({
                    axios: this.$axios,
                    params: this.authorBooks.form
                })
                .then(res => {
                    if (res.done) {
                        res.data.forEach(i => {
                            this.authorBooks.list.push(i)
                        });
                        this.authorBooks.form.index += 1
                        if (
                            this.authorBooks.list.length === res.page.count
                        ) {
                            this.authorBooks.more = false
                        }
                    }
                })
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
        }
    },
    mounted() {
        this.init()
    }
};
</script>

<style lang="less">
.author {
    .m-author {
        .a-ad{
            width:664px;
            background: white;
        }
        .a-article {
            margin-top: 30px;
            background: white;
            .a-title {
                display: flex;
                align-items: center;
                height: 50px;
                padding: 0 20px;
                border-bottom: 1px solid rgba(178, 186, 194, 0.15);
                span {
                    font-size: 14px;
                    font-weight: 600;
                    color: #909090;
                }
            }
            .a-list {
                .l-item {
                    position: relative;
                    padding: 15px 200px 15px 20px;
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
                        display: flex;
                        align-items: center;
                        padding: 10px 0 15px 0;
                        span {
                            font-size: 16px;
                            font-weight: 600;
                            color: #333;
                        }
                    }
                    .i-desc {
                        padding-bottom: 15px;
                        p {
                            height: 90px;
                            line-height: 30px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            font-size: 14px;
                            color: #8b8b8b;
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
                                i {
                                    font-size: 16px;
                                }
                                &:last-child {
                                    border-left: 1px solid #f4f5f5;
                                }
                            }
                        }
                    }
                    .i-cover {
                        position: absolute;
                        top: 50%;
                        right: 20px;
                        transform: translateY(-50%);
                        width: 150px;
                        height: 80px;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    &:hover {
                        cursor: pointer;
                        background-color: rgba(0, 0, 0, 0.01);
                        .i-name {
                            text-decoration: underline;
                        }
                    }
                }
            }
            .a-more {
                padding: 30px;
                .m-wrap {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 30px;
                    background: #f4f5f6;
                    span {
                        color: #406599;
                    }
                }
                &:hover {
                    cursor: pointer;
                }
            }
        }
        .a-book {
            margin-top: 30px;
            background: white;
            .b-title {
                display: flex;
                align-items: center;
                height: 50px;
                padding: 0 20px;
                border-bottom: 1px solid rgba(178, 186, 194, 0.15);
                span {
                    font-size: 14px;
                    font-weight: 600;
                    color: #909090;
                }
            }
            .b-list {
                .l-item {
                    padding: 15px 20px;
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
                                i {
                                    font-size: 16px;
                                }
                                &:last-child {
                                    border-left: 1px solid #f4f5f5;
                                }
                            }
                        }
                    }
                    &:hover {
                        cursor: pointer;
                        background-color: rgba(0, 0, 0, 0.01);
                        .i-name {
                            text-decoration: underline;
                        }
                    }
                }
            }
            .b-more {
                padding: 30px;
                .m-wrap {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 30px;
                    background: #f4f5f6;
                    span {
                        color: #406599;
                    }
                }
                &:hover {
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
