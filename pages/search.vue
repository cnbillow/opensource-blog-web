<template>
    <div class="search">
        <x-header></x-header>
        <div class="s-main">
            <div class="m-left">
                <div class="l-about" v-if="info.author.length || 'id' in info.tag">
                    <div class="a-title">
                        <span>TA们都在关注</span>
                    </div>
                    <div class="a-content">
                        <div class="c-item c-item-author"
                        :key="key"
                        @click="nav('/author/' + item.id)"
                        v-for="(item, key) in info.author">
                            <div class="a-left">
                                <div class="l-avatar">
                                     <img :src="item.avatar | avatarCover" alt />
                                </div>
                                <div class="l-info">
                                    <div class="i-name">
                                        <span>用户</span>
                                        <span>{{item.nickname}}</span>
                                    </div>
                                    <div class="i-desc">
                                        <span>21关注</span>
                                        <span>54文章</span>
                                    </div>
                                </div>
                            </div>
                            <div class="a-right">
                                <div class="r-focus">
                                    <span>关注</span>
                                </div>
                            </div>
                        </div>
                        <div class="c-item c-item-tag" v-if="'id' in info.tag">
                            <div class="t-left">
                                <div class="l-avatar">
                                    <img :src="info.tag.cover | imgCover" alt />
                                </div>
                                <div class="l-info">
                                    <div class="i-name">
                                        <span>标签</span>
                                        <span>{{info.tag.name}}</span>
                                    </div>
                                    <div class="i-desc">
                                        <span>21关注</span>
                                        <span>54文章</span>
                                    </div>
                                </div>
                            </div>
                            <div class="t-right">
                                <div class="r-focus">
                                    <span>关注</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="l-articles">
                    <div class="a-tab">
                        <div class="t-item t-item-active">
                            <span>综合</span>
                        </div>
                        <div class="t-item">
                            <span>文章</span>
                        </div>
                        <div class="t-item">
                            <span>用户</span>
                        </div>
                    </div>
                    <div class="a-list">
                        <div class="l-item">
                            <div
                                class="l-item"
                                :key="key"
                                @click="nav('/article/' + item.id)"
                                v-for="(item, key) in article.list"
                            >
                                <div class="i-info">
                                    <span>文章</span>
                                    <span>{{'id' in item.user ? item.user.nickname : ''}}</span>
                                    <span v-if="item.tag.length">{{item.tag[0].name}}</span>
                                </div>
                                <div class="i-name">
                                    <span v-if="item.section.length && item.section[0].book">《{{item.section[0].book.title}}》</span>
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
                                <div
                                    class="i-cover"
                                    :style="{backgroundImage: `url(${qiniuBaseUrl + item.cover})`}"
                                    v-if="item.cover"
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div class="a-more">
                        <div class="m-wrap" @click="doSearch">
                            <span v-if="article.more">查看更多文章</span>
                            <span v-else>暂无更多文章</span>
                        </div>
                    </div>
                </div>
                <x-footer></x-footer>
            </div>
            <div class="m-right">
                <div class="r-ad">
                    <google-ad :sn="2042704637"></google-ad>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import apiArticle from '~/api/article'
import { mapState } from 'vuex'
import xHeader from '~/components/x-header'
import xFooter from '~/components/x-footer'
import googleAd from '~/components/google-ad'

export default {
    head() {
        return {
            title: this.$route.query.keyword ? `Kyeteo 搜索关键字 ${this.$route.query.keyword}` : `Kyeteo 搜索标签 ${this.info.tag.name}`,
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: this.$route.query.keyword ? 'Kyeteo vuejs ssr 服务端渲染 esp芯片 树莓派' : `Kyeteo vuejs ssr 服务端渲染 esp芯片 树莓派 ${this.info.tag.name}`
                }
            ],
            script: [
                {
                    src: "/js/seo.js"
                }
            ]
        };
    },
    fetch({ $axios, store, query }) {
        return store.dispatch("page/getSearch", {
            axios: $axios,
            params: { tagId: query.tagId, keyword: query.keyword }
        });
    },
    data() {
        return {
            qiniuBaseUrl: process.env.QINIU_BASE_URL,
            article: {
                form: {
                    tagId: this.$route.query.tagId,
                    keyword: this.$route.query.keyword,
                    index: 1,
                    size: 10
                },
                list: [],
                more: true
            }
        };
    },
    computed: {
        ...mapState("page", {
            info: "search"
        })
    },
    components: {
        xHeader,
        xFooter,
        googleAd
    },
    methods: {
        doSearch() {
            apiArticle
                .search({ axios: this.$axios, params: this.article.form })
                .then(res => {
                    if (res.done) {
                        res.data.forEach(i => {
                            this.article.list.push(i);
                        });
                        if (this.article.list.length === res.page.count) {
                            this.article.more = false;
                        }
                    }
                });
        }
    },
    mounted() {
        this.doSearch();
    }
};
</script>

<style lang="less">
.search {
    background: #f4f5f5;
    .s-main {
        display: flex;
        width: 960px;
        padding-top: 80px;
        margin: 0 auto;
        .m-left {
            width: 700px;
            .l-about {
                margin-bottom: 30px;
                background: white;
                .a-title {
                    display: flex;
                    align-items: center;
                    height: 45px;
                    box-sizing: border-box;
                    padding: 0 20px;
                    border-bottom: 1px solid hsla(0, 0%, 59.2%, 0.1);
                    span {
                        font-size: 14px;
                    }
                }
                .a-content {
                    .c-item {
                        padding: 20px;
                        &-author {
                            display: flex;
                            justify-content: space-between;
                            .a-left {
                                display: flex;
                                align-items: center;
                                .l-avatar {
                                    width: 45px;
                                    height: 45px;
                                    border-radius: 22.5px;
                                    overflow: hidden;
                                    img {
                                        width: 100%;
                                        height: 100%;
                                    }
                                }
                                .l-info {
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: center;
                                    padding: 20px;
                                    .i-name {
                                        span {
                                            font-size: 14px;
                                            &:first-child {
                                                color: #909090;
                                            }
                                            &:last-child {
                                                position: relative;
                                                padding-left: 10px;
                                                font-weight: 600;
                                                color: #e8001c;
                                                &:before {
                                                    position: absolute;
                                                    content: "/";
                                                    top: 50%;
                                                    transform: translate(
                                                        -50%,
                                                        -50%
                                                    );
                                                    left: 5px;
                                                }
                                            }
                                        }
                                    }
                                    .i-desc {
                                        display: flex;
                                        align-items: center;
                                        padding-top: 5px;
                                        span {
                                            font-size: 14px;
                                            &:last-child {
                                                position: relative;
                                                padding-left: 10px;
                                                &:before {
                                                    position: absolute;
                                                    content: "";
                                                    top: 50%;
                                                    transform: translate(
                                                        -50%,
                                                        -50%
                                                    );
                                                    left: 5px;
                                                    width: 2px;
                                                    height: 2px;
                                                    border-radius: 1px;
                                                    background: #515a6e;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            .a-right {
                                display: flex;
                                align-items: center;
                                .r-focus {
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    width: 74px;
                                    height: 30px;
                                    box-sizing: border-box;
                                    border: 1px solid #007fff;
                                    border-radius: 3px;
                                    span {
                                        font-size: 14px;
                                        color: #007fff;
                                    }
                                    &:hover {
                                        border: none;
                                        background: #007fff;
                                        cursor: pointer;
                                        span {
                                            color: white;
                                        }
                                    }
                                }
                            }
                        }
                        &-tag {
                            display: flex;
                            justify-content: space-between;
                            .t-left {
                                display: flex;
                                align-items: center;
                                .l-avatar {
                                    width: 45px;
                                    height: 45px;
                                    border-radius: 22.5px;
                                    overflow: hidden;
                                    img {
                                        width: 100%;
                                        height: 100%;
                                    }
                                }
                                .l-info {
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: center;
                                    padding: 20px;
                                    .i-name {
                                        span {
                                            font-size: 14px;
                                            &:first-child {
                                                color: #909090;
                                            }
                                            &:last-child {
                                                position: relative;
                                                padding-left: 10px;
                                                font-weight: 600;
                                                color: #e8001c;
                                                &:before {
                                                    position: absolute;
                                                    content: "/";
                                                    top: 50%;
                                                    transform: translate(
                                                        -50%,
                                                        -50%
                                                    );
                                                    left: 5px;
                                                }
                                            }
                                        }
                                    }
                                    .i-desc {
                                        display: flex;
                                        align-items: center;
                                        padding-top: 5px;
                                        span {
                                            font-size: 14px;
                                            &:last-child {
                                                position: relative;
                                                padding-left: 10px;
                                                &:before {
                                                    position: absolute;
                                                    content: "";
                                                    top: 50%;
                                                    transform: translate(
                                                        -50%,
                                                        -50%
                                                    );
                                                    left: 5px;
                                                    width: 2px;
                                                    height: 2px;
                                                    border-radius: 1px;
                                                    background: #515a6e;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            .t-right {
                                display: flex;
                                align-items: center;
                                .r-focus {
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    width: 74px;
                                    height: 30px;
                                    box-sizing: border-box;
                                    border: 1px solid #007fff;
                                    border-radius: 3px;
                                    span {
                                        font-size: 14px;
                                        color: #007fff;
                                    }
                                    &:hover {
                                        border: none;
                                        background: #007fff;
                                        cursor: pointer;
                                        span {
                                            color: white;
                                        }
                                    }
                                }
                            }
                        }
                        &:hover {
                            cursor: pointer;
                            background-color: rgba(0, 0, 0, 0.01);
                        }
                    }
                }
            }
            .l-articles {
                background: white;
                .a-tab {
                    display: flex;
                    align-items: center;
                    height: 45px;
                    box-sizing: border-box;
                    padding: 0 20px;
                    border-bottom: 1px solid hsla(0, 0%, 59.2%, 0.1);
                    .t-item {
                        span {
                            font-size: 14px;
                        }
                        &-active {
                            span {
                                color: #007fff;
                            }
                        }
                        &:not(:first-child) {
                            position: relative;
                            margin-left: 30px;
                            &:before {
                                position: absolute;
                                content: "";
                                top: 50%;
                                transform: translateY(-50%);
                                left: -15px;
                                height: 70%;
                                width: 1px;
                                background: hsla(0, 0%, 59.2%, 0.2);
                            }
                        }
                    }
                }
                .a-list {
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
                            display: flex;
                            align-items: center;
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
                            .i-name{
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
                        &:hover{
                            cursor: pointer;
                        }
                    }
                }
            }
        }
        .m-right{
            flex:1;
            margin-left: 20px;
            .r-ad{
                width:100%;
                background: white;
            }
        }
    }
}
</style>



