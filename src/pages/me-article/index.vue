<template>
    <div class="articles">
        <white-header></white-header>
        <me-layout>
            <div class="a-content">
                <div class="c-list">
                    <div class="l-item" :key="key" v-for="(item, key) in articles.list">
                        <div class="i-left">
                            <img :src="item.cover | imgCover" alt="">
                        </div>
                        <div class="i-right">
                            <div class="r-name" @click="nav('/article/' + item.id)">
                                <span>{{item.title}}</span>
                            </div>
                            <div class="r-time">
                                <span>2,452阅读</span>
                                <span>21评论</span>
                                <span>2018-07-15 12:12</span>
                            </div>
                        </div>
                        <div class="i-more">
                            <Dropdown>
                                <i class="iconfont icon-gengduo"></i>
                                <DropdownMenu slot="list">
                                    <DropdownItem>置顶</DropdownItem>
                                    <DropdownItem>编辑</DropdownItem>
                                    <DropdownItem @click.native="deleteArticle(item)">删除</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
                <div class="c-page">
                    <Page :current="articles.page.index" :page-size="articles.page.size" :total="articles.page.count" @on-change="pageChange"/>
                </div>
            </div>
        </me-layout>
    </div>
</template>

<script type="text/ecmascript-6">
    import {api} from '@/service/api'
    import meLayout from '@/components/me-layout'
    import whiteHeader from '@/components/white-header'
    export default {
        data () {
            return {
                articles: {
                    form: {
                        index: 1,
                        size: 10
                    },
                    page: {
                        index: 1,
                        size: 1,
                        count: 1
                    },
                    list: []
                }
            }
        },
        components: {
            meLayout,
            whiteHeader,
        },
        methods: {
            pageChange (e) {
                this.articles.form.index = e
                this.getArticles()
            },
            getArticles () {
                api.user.getArticles(this.articles.form).then(res => {
                    if (res.done) {
                        this.articles.list = res.data
                        this.articles.page = res.page
                    }
                })
            },
            deleteArticle (e) {
                const data = {
                    id: e.id
                }
                api.user.deleteArticle(data).then(res => {
                    if (res.done) {
                        this.$Message.success('删除成功')
                        this.getArticles()
                    }
                })
            }
        },
        created () {
            this.getArticles()
        }
    }
</script>
<style lang="less">
    @import 'index';
</style>
