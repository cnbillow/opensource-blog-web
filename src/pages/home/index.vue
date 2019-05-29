<template>
    <div class="home">
        <black-header></black-header>
        <article>
            <div class="h-article">
                <div class="a-main">
                    <div class="m-carousel">
                        <Carousel :height="350" loop>
                            <CarouselItem :key="key" v-for="(item, key) in info.banner">
                                <div class="i-block">
                                    <img :src="item.cover | imgCover"
                                         alt="">
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
                                                    <img :src="item.user ? item.user.avatar : '' | avatarCover"
                                                         alt="">
                                                </div>
                                                <div class="l-name">
                                                    <span>{{item.user ? item.user.nickname : ''}}</span>
                                                </div>
                                                <div class="l-time">
                                                    <span>{{item.create_time | timeFormat}}</span>
                                                </div>
                                            </div>
                                            <div class="a-right" @click="nav('/article/' + item.id)">
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
                                <div class="d-item"
                                     :key="key"
                                     @click="nav('/author/' + item.id)"
                                     v-for="(item, key) in info.user">
                                    <img :src="item.avatar | avatarCover"
                                         alt="">
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
                                <div class="t-item"
                                     :style="{backgroundColor: randomColor(0.8)}"
                                     :key="key"
                                     @click="nav('/tag/' + item.id)"
                                     v-for="(item, key) in info.tag">
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
                                <div class="l-item" :key="key" v-for="(item, key) in info.link">
                                    <a :href="item.url">{{item.name}}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="s-bar">
                        <div class="b-item" @click="nav('/my-publish')">
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
        <black-footer></black-footer>
    </div>
</template>

<script type="text/ecmascript-6">
    import {api} from '@/service/api'
    import blackHeader from '@/components/black-header'
    import blackFooter from '@/components/black-footer'

    export default {
        data() {
            return {
                info: {
                    banner: [],
                    link: [],
                    newestArticle: [],
                    tag: [],
                    user: []
                },
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
        components: {
            blackHeader,
            blackFooter
        },
        methods: {
            flxedBar () {
                const aSide = document.querySelector('.a-side')
                const sBar =  document.querySelector('.s-bar')
                if (aSide && sBar) {
                    sBar.style.bottom = (aSide.getBoundingClientRect().bottom - window.innerHeight + 110) + 'px'
                }
            },
            scrollTop () {
                window.scrollTo(0, 0)
            },
            randomColor(a) {
                let r = Math.floor(Math.random() * 255)
                let g = Math.floor(Math.random() * 255)
                let b = Math.floor(Math.random() * 255)
                return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')'
            },
            getHomeInfo () {
                api.page.home().then(res => {
                    if (res.done) {
                        this.info = res.data
                    }
                })
            },
            getHotArticles() {
                api.article.getHotArticles(this.hotArticles.form).then(res => {
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
        created() {
            this.getHomeInfo()
            this.getHotArticles()
        },
        mounted() {
            window.onscroll = () => {
                this.flxedBar()
            }
        }
    }
</script>

<style lang="less">
    @import './index';
</style>
