<template>
    <div class="index">
        <page-header></page-header>
        <article>
            <div class="h-article">
                <div class="a-main">
                    <div class="m-carousel">
                        <Carousel :height="350" loop>
                            <CarouselItem :key="key" v-for="(item, key) in home.banner">
                                <div class="i-block">
                                    <img :src="item.cover | imgCover" alt />
                                    <div class="b-title" @click="nav('/article/' + item.id)">
                                        <span>{{item.title}}</span>
                                    </div>
                                </div>
                            </CarouselItem>
                        </Carousel>
                    </div>
                    <div class="m-hot">
                        <div class="h-title">
                            <span>热门文章</span>
                        </div>
                        <div class="h-list">
                            <div class="l-item" :key="key" v-for="(item, key) in hotArticles.list">
                                <div class="i-title">
                                    <h3 @click="nav('/article/' + item.id)">{{item.title}}</h3>
                                </div>
                                <div class="i-content">
                                    <div class="c-left">
                                        <img :src="item.cover | imgCover" alt />
                                    </div>
                                    <div class="c-right">
                                        <div class="r-text">
                                            <p>{{item.text}}</p>
                                        </div>
                                        <div class="r-author">
                                            <div class="a-left">
                                                <div class="l-avatar">
                                                    <img
                                                        :src="item.user ? item.user.avatar : '' | avatarCover"
                                                        alt
                                                    />
                                                </div>
                                                <div class="l-name">
                                                    <span>{{item.user ? item.user.nickname : ''}}</span>
                                                </div>
                                                <div class="l-time">
                                                    <span>{{item.create_time | timeFormat}}</span>
                                                </div>
                                            </div>
                                            <div
                                                class="a-right"
                                                @click="nav('/article/' + item.id)"
                                            >
                                                <span>阅读更多</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="h-more">
                            <span v-if="hotArticles.more" @click="getHotArticles">查看更多文章</span>
                            <span v-else>暂无更多文章</span>
                        </div>
                    </div>
                </div>
                <div class="a-side">
                    <div class="s-item">
                        <div class="i-title">
                            <span>贡献榜</span>
                        </div>
                        <div class="i-content">
                            <div class="c-devote">
                                <div
                                    class="d-item"
                                    :key="key"
                                    @click="nav('/author/' + item.id)"
                                    v-for="(item, key) in home.user"
                                >
                                    <img :src="item.avatar | avatarCover" alt />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="s-item">
                        <div class="i-title">
                            <span>热门标签</span>
                        </div>
                        <div class="i-content">
                            <div class="c-tag">
                                <div
                                    class="t-item"
                                    :style="{backgroundColor: randomColor(0.8)}"
                                    :key="key"
                                    @click="nav('/search?tag=' + item.id)"
                                    v-for="(item, key) in home.tag"
                                >
                                    <span>{{item.name}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="s-item">
                        <div class="i-title">
                            <span>最新文章</span>
                        </div>
                        <div class="i-content">
                            <div class="c-article">
                                <template v-for="(item, key) in home.newestArticle">
                                    <div
                                        class="a-top"
                                        :key="key"
                                        v-if="key === 0"
                                        @click="nav('/article/' + item.id)"
                                    >
                                        <img :src="item.cover | imgCover" alt />
                                        <div class="i-title">
                                            <span>{{item.title}}</span>
                                        </div>
                                    </div>
                                    <div
                                        class="a-item"
                                        :key="key"
                                        @click="nav('/article/' + item.id)"
                                        v-else
                                    >
                                        <div class="i-left">
                                            <img :src="item.cover | imgCover" alt />
                                        </div>
                                        <div class="i-right">
                                            <div class="r-text">
                                                <p>{{item.title}}</p>
                                            </div>
                                            <div class="r-time">
                                                <span>{{item.create_time | timeFormat}}</span>
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
                                <div class="l-item" :key="key" v-for="(item, key) in home.link">
                                    <a :href="item.url">{{item.name}}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="s-bar">
                        <div class="b-item" @click="nav('/user/post')">
                            <i class="iconfont icon-xiezi"></i>
                            <span>发文</span>
                        </div>
                        <div class="b-item border-1px-top" @click="scrollTop">
                            <i class="iconfont icon-dingbu"></i>
                            <span>顶部</span>
                        </div>
                    </div>
                </div>
            </div>
        </article>
        <page-footer></page-footer>
    </div>
</template>

<script type="text/ecmascript-6">
import apiArticle from '~/api/article'
import pageHeader from '~/components/page-header'
import pageFooter from '~/components/page-footer'
import { mapState } from 'vuex'
import Vue from 'vue'

export default {
    head() {
        return {
            title: 'Kyeteo — 为梦想再次出发',
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                { hid: 'description', name: 'description', content: 'Kyeteo vuejs ssr 服务端渲染 esp芯片 树莓派' }
            ],
            script: [
                {
                    src: '/js/seo.js'
                }
            ]
        }
    },
    fetch({ $axios, store, params }) {
        return store.dispatch('page/getIndex', { axios: $axios })
    },
    data() {
        return {
            hotArticles: {
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
        ...mapState('page', ['home'])
    },
    components: {
        pageHeader,
        pageFooter
    },
    methods: {
        flxedBar() {
            const aSide = document.querySelector('.a-side')
            const sBar = document.querySelector('.s-bar')
            if (aSide && sBar) {
                sBar.style.bottom = (aSide.getBoundingClientRect().bottom - window.innerHeight + 110) + 'px'
            }
        },
        scrollTop() {
            window.scrollTo(0, 0)
        },
        randomColor(a) {
            let r = Math.floor(Math.random() * 255)
            let g = Math.floor(Math.random() * 255)
            let b = Math.floor(Math.random() * 255)
            return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')'
        },
        getHotArticles() {
            apiArticle.getHotArticles({ axios: this.$axios, params: this.hotArticles.form }).then(res => {
                if (res.done) {
                    res.data.forEach(i => {
                        this.hotArticles.list.push(i)
                    })
                    this.hotArticles.form.index += 1
                    if (this.hotArticles.list.length === res.page.count) {
                        this.hotArticles.more = false
                    }
                }
            })
        }
    },
    mounted() {
        window.onscroll = () => {
            this.flxedBar()
        }
        this.getHotArticles()
    }
}
</script>

<style lang="less">
.index {
    background-color: #f6f6f6;
    article {
        display: flex;
        justify-content: center;
        .h-article {
            display: flex;
            justify-content: space-between;
            width: 1200px;
            padding: 70px 0 20px 0;
            .a-main {
                flex-basis: 66%;
                flex-shrink: 0;
                .m-carousel {
                    .i-block {
                        position: relative;
                        width: 100%;
                        height: 100%;
                        .b-title {
                            position: absolute;
                            bottom: 12%;
                            width: 100%;
                            height: 39px;
                            display: flex;
                            align-items: center;
                            box-sizing: border-box;
                            padding: 0 40px;
                            background: RGBA(0, 0, 0, 0.6);
                            span {
                                font-size: 26px;
                                color: white;
                            }
                            &:hover {
                                cursor: pointer;
                            }
                        }
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
                .m-hot {
                    margin-top: 20px;
                    padding: 20px;
                    background: white;
                    .h-title {
                        position: relative;
                        display: flex;
                        align-items: center;
                        height: 62px;
                        span {
                            font-size: 18px;
                            font-weight: 600;
                            color: #282828;
                        }
                        &:after {
                            position: absolute;
                            left: 0;
                            bottom: 0;
                            width: 50px;
                            height: 2px;
                            content: "";
                            background-color: #282828;
                        }
                    }
                    .h-list {
                        .l-item {
                            padding-bottom: 30px;
                            border-bottom: #eee 1px dashed;
                            .i-title {
                                display: flex;
                                align-items: center;
                                height: 62px;
                                h3 {
                                    color: #555;
                                    &:hover {
                                        cursor: pointer;
                                    }
                                }
                            }
                            .i-content {
                                display: flex;
                                .c-left {
                                    flex-basis: 213px;
                                    height: 138px;
                                    img {
                                        width: 100%;
                                        height: 100%;
                                    }
                                }
                                .c-right {
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: space-between;
                                    flex: 1;
                                    padding-left: 20px;
                                    .r-text {
                                        p {
                                            height: 60px;
                                            line-height: 20px;
                                            font-size: 14px;
                                            overflow: hidden;
                                            text-overflow: ellipsis;
                                            color: #666;
                                        }
                                    }
                                    .r-author {
                                        display: flex;
                                        justify-content: space-between;
                                        .a-left {
                                            display: flex;
                                            align-items: center;
                                            .l-avatar {
                                                display: inline-block;
                                                width: 30px;
                                                height: 30px;
                                                border-radius: 15px;
                                                overflow: hidden;
                                                img {
                                                    width: 100%;
                                                    height: 100%;
                                                }
                                            }
                                            .l-name {
                                                padding: 0 5px;
                                                span {
                                                    color: #555;
                                                }
                                            }
                                            .l-time {
                                                span {
                                                    color: #999;
                                                }
                                            }
                                        }
                                        .a-right {
                                            display: flex;
                                            align-items: center;
                                            justify-content: center;
                                            flex-basis: 80px;
                                            height: 28px;
                                            border-radius: 3px;
                                            background: #12b7de;
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
                    .h-more {
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
            .a-side {
                position: relative;
                flex-basis: 32%;
                flex-shrink: 0;
                .s-item {
                    padding: 20px;
                    background: white;
                    .i-title {
                        position: relative;
                        display: flex;
                        align-items: center;
                        height: 62px;
                        span {
                            font-size: 18px;
                            font-weight: 600;
                            color: #282828;
                        }
                        &:after {
                            position: absolute;
                            left: 0;
                            bottom: 0;
                            width: 50px;
                            height: 2px;
                            content: "";
                            background-color: #282828;
                        }
                    }
                    .i-content {
                        padding: 25px 0;
                        .c-devote {
                            display: flex;
                            .d-item {
                                display: inline-block;
                                width: 50px;
                                height: 50px;
                                border-radius: 25px;
                                overflow: hidden;
                                img {
                                    width: 100%;
                                    height: 100%;
                                }
                                &:hover {
                                    cursor: pointer;
                                }
                            }
                        }
                        .c-tag {
                            display: flex;
                            flex-wrap: wrap;
                            .t-item {
                                display: flex;
                                align-items: center;
                                height: 30px;
                                padding: 0 11px;
                                margin: 0 10px 10px 0;
                                border-radius: 8px;
                                span {
                                    color: white;
                                }
                                &:hover {
                                    cursor: pointer;
                                }
                            }
                        }
                        .c-article {
                            .a-top {
                                position: relative;
                                height: 182px;
                                img {
                                    width: 100%;
                                    height: 100%;
                                }
                                .i-title {
                                    position: absolute;
                                    bottom: 0;
                                    left: 0;
                                    width: 100%;
                                    box-sizing: border-box;
                                    display: flex;
                                    align-items: center;
                                    padding: 0 20px;
                                    background: RGBA(0, 0, 0, 0.8);
                                    span {
                                        font-size: 15px;
                                        white-space: nowrap;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        color: white;
                                    }
                                }
                                &:hover {
                                    cursor: pointer;
                                }
                            }
                            .a-item {
                                display: flex;
                                padding-top: 20px;
                                .i-left {
                                    flex-basis: 102px;
                                    flex-shrink: 0;
                                    height: 77px;
                                    img {
                                        width: 100%;
                                        height: 100%;
                                    }
                                }
                                .i-right {
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: space-between;
                                    padding-left: 10px;
                                    .r-text {
                                        p {
                                            height: 48px;
                                            width: 232px;
                                            margin: 0;
                                            line-height: 24px;
                                            font-size: 15px;
                                            overflow: hidden;
                                            text-overflow: ellipsis;
                                            color: #888;
                                        }
                                    }
                                    .r-time {
                                        display: flex;
                                        align-items: center;
                                        span {
                                            font-size: 12px;
                                            color: #9a9a9a;
                                        }
                                    }
                                }
                                &:hover {
                                    cursor: pointer;
                                }
                            }
                        }
                        .c-link {
                            display: flex;
                            flex-wrap: wrap;
                            .l-item {
                                margin: 0 10px 10px 0;
                                a {
                                    text-decoration: underline;
                                    color: #555;
                                }
                            }
                        }
                    }
                    &:not(:first-child) {
                        margin-top: 20px;
                    }
                }
                .s-bar {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    padding: 10px;
                    background: white;
                    color: #555;
                    .b-item {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        width: 40px;
                        height: 80px;
                        i {
                            font-size: 30px;
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
</style>
