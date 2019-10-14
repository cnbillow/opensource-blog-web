<template>
    <div class="book">
        <x-header></x-header>
        <author
            :user="info.user"
            :mostViewArticles="info.mostViewArticles"
            :promotes="info.promotes"
        >
            <div class="m-book">
                <div class="b-info">
                    <div class="i-top">
                        <div class="t-cover">
                            <img :src="info.book.cover | imgCover" alt />
                        </div>
                        <div class="t-text">
                            <div class="te-top">
                                <h2>[文章] {{info.book.title}}</h2>
                                <p>{{info.book.desc}}</p>
                            </div>
                            <div class="te-bottom">
                                <div class="b-author">
                                    <img :src="info.user.avatar | avatarCover" alt />
                                    <span>{{info.user.nickname}}</span>
                                </div>
                                <div class="b-start">
                                    <div class="s-btn">
                                        <span>阅读</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="i-bottom">
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
                <div class="b-list">
                    <div class="l-tab">
                        <div class="t-item t-item-active">
                            <span>目录</span>
                        </div>
                        <div class="t-item">
                            <span>评论</span>
                        </div>
                    </div>
                    <div class="l-content">
                        <div class="c-title">
                            <span>专题内容</span>
                        </div>
                        <div class="c-cate">
                            <div
                                class="c-item"
                                :class="{'c-item-disable': !item.article.length}"
                                :key="key"
                                @click="item.article.length ? nav('/article/' + item.article[0].id) : noTip()"
                                v-for="(item, key) in info.book.section"
                            >
                                <div class="i-tag">
                                    <span>{{key + 1}}</span>
                                </div>
                                <div class="i-text">
                                    <h3>{{item.title}}</h3>
                                    <p>574次学习</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <specific-recommend :recommend="recommend" @do-get="getRecommend"></specific-recommend>
            <x-footer></x-footer>
            <template slot="right">
                <div class="s-right s-right-ad">
                    <google-ad :sn="7841826223"></google-ad>
                </div>
            </template>
        </author>
    </div>
</template>

<script type="text/ecmascript-6">
import apiSpecific from "~/api/specific"
import { mapState } from 'vuex'
import author from '~/components/author'
import xHeader from '~/components/x-header'
import specificRecommend from '~/components/specific-recommend'
import xFooter from "~/components/x-footer"
import googleAd from '~/components/google-ad'
export default {
    head() {
        return {
            title: `Kyeteo — ${this.info.book.title}`,
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                { hid: 'description', name: 'description', content: `Kyeteo vuejs ssr 服务端渲染 esp芯片 树莓派 ${this.info.book.title}` }
            ]
        }
    },
    fetch({ $axios, store, params }) {
        return store.dispatch('page/getBook', { axios: $axios, params })
    },
    data() {
        return {
            id: this.$route.params.id,
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
        ...mapState('page', {
            info: 'book'
        })
    },
    components: {
        author,
        xHeader,
        specificRecommend,
        xFooter,
        googleAd
    },
    methods: {
        noTip() {
            this.$Message.success("文章尚未完成，敬请期待！")
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
    mounted () {
        this.getRecommend()
    }
}
</script>

<style lang="less">
.book {
    .m-book {
        .b-info {
            background: white;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
            .i-top {
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
                            }
                        }
                    }
                }
            }
            .i-bottom {
                display: flex;
                align-items: center;
                box-sizing: border-box;
                padding: 8px 20px;
                border-top: 1px solid #ecf0f3;
                border-bottom: 1px solid #ecf0f3;
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
        .b-list {
            margin-top: 20px;
            background: white;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
            .l-tab {
                display: flex;
                height: 50px;
                border-bottom: 1px solid #ecf0f3;
                .t-item {
                    display: flex;
                    align-items: center;
                    padding: 0 10px;
                    span {
                        font-size: 16px;
                        color: #333;
                    }
                    &-active {
                        color: #007fff;
                        border-bottom: 2px solid #007fff;
                    }
                    &:hover {
                        cursor: pointer;
                    }
                }
            }
            .l-content {
                display: block;
                padding: 30px;
                background: white;
                .c-title {
                    line-height: 1.5;
                    padding-bottom: 12px;
                    margin-bottom: 20px;
                    line-height: 1.5;
                    border-bottom: 1px solid #ecf0f3;
                    font-size: 20px;
                    font-weight: 700;
                    color: #333;
                }
                .c-cate {
                    padding: 20px 0;
                    .c-item {
                        position: relative;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        height: 70px;
                        padding-left: 70px;
                        .i-tag {
                            position: absolute;
                            top: 50%;
                            left: 28px;
                            transform: translateY(-50%);
                            span {
                                font-size: 16px;
                                color: #b5b7ba;
                            }
                        }
                        .i-text {
                            h3 {
                                font-size: 14px;
                                color: #333;
                            }
                        }
                        &-disable {
                            .i-text {
                                color: #b5b7ba;
                                h3 {
                                    color: #b5b7ba;
                                }
                            }
                        }
                        &:before {
                            position: absolute;
                            content: "";
                            top: 50%;
                            left: 10px;
                            transform: translateY(-50%);
                            width: 46px;
                            height: 46px;
                            border-radius: 23px;
                            box-sizing: border-box;
                            border: 2px solid #b5b7ba;
                            z-index: 10;
                        }
                        &:not(:last-child) {
                            &:after {
                                position: absolute;
                                content: "";
                                top: 80%;
                                left: 32px;
                                width: 2px;
                                height: 28px;
                                background: #b5b7ba;
                                z-index: 10;
                            }
                        }
                        &:hover {
                            cursor: pointer;
                            background: #f4f5f5;
                        }
                    }
                }
            }
        }
    }
    .r-block {
        background: white;
        .b-title {
            display: flex;
            align-items: center;
            height: 42px;
            padding: 0 16px;
            border-bottom: 1px solid #f4f5f5;
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
        }
        &:not(:first-child) {
            margin-top: 20px;
        }
    }
    .s-right {
        background: white;
    }
}
</style>
