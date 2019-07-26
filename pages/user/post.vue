<template>
    <div class="post">
        <x-header></x-header>
        <user @do-post="doPost" @do-update="doUpdate">
            <div class="m-post">
                <div class="p-tab">
                    <div class="t-item" @click="type = 1" :class="{'t-item-active': type === 1}">
                        <span>文章</span>
                    </div>
                    <div class="t-item" @click="type = 2" :class="{'t-item-active': type === 2}">
                        <span>专题</span>
                    </div>
                </div>
                <div class="p-article" v-if="type === 1">
                    <div class="a-title">
                        <input
                            type="text"
                            placeholder="请输入文章标题（5-20字）"
                            v-model="article.form.title"
                        />
                    </div>
                    <div class="a-markdown">
                        <markdown-editor ref="markdown" :md="article.form.text"></markdown-editor>
                    </div>
                    <div class="a-form">
                        <div class="f-item">
                            <div class="i-left">
                                <span>文章标签</span>
                            </div>
                            <div class="i-right">
                                <Tag
                                    type="dot"
                                    closable
                                    :key="key"
                                    @on-close="delTag(item)"
                                    v-for="(item, key) in article.activeTag"
                                >{{item.name}}</Tag>
                                <Button icon="ios-add" type="dashed" @click="toOpenTag">添加</Button>
                            </div>
                        </div>
                        <div class="f-item">
                            <div class="i-left">
                                <span>知识要素</span>
                            </div>
                            <div class="i-right">
                                <Tag
                                    type="dot"
                                    closable
                                    :key="key"
                                    @on-close="delKnow(item)"
                                    v-for="(item, key) in article.activeKnow"
                                >{{item.name}}</Tag>
                                <Button
                                    icon="ios-add"
                                    type="dashed"
                                    @click="drawerVisible2 = true"
                                >添加</Button>
                            </div>
                        </div>
                        <div class="f-item">
                            <div class="i-left">
                                <span>资源下载</span>
                            </div>
                            <div class="i-right">
                                <Tag
                                    type="dot"
                                    closable
                                    :key="key"
                                    @on-close="delSource(item)"
                                    v-for="(item, key) in article.activeSource"
                                >{{item.name}}</Tag>
                                <Button
                                    icon="ios-add"
                                    type="dashed"
                                    @click="drawerVisible3 = true"
                                >添加</Button>
                            </div>
                        </div>
                        <div class="f-item">
                            <div class="i-left">
                                <span>物品购买</span>
                            </div>
                            <div class="i-right">
                                <Tag
                                    type="dot"
                                    closable
                                    :key="key"
                                    @on-close="delGoods(item)"
                                    v-for="(item, key) in article.activeGoods"
                                >{{item.name}}</Tag>
                                <Button
                                    icon="ios-add"
                                    type="dashed"
                                    @click="drawerVisible4 = true"
                                >添加</Button>
                            </div>
                        </div>
                        <div class="f-item">
                            <div class="i-left">
                                <span>绑定专题</span>
                            </div>
                            <div class="i-right">
                                <Tag
                                    type="dot"
                                    closable
                                    @on-close="delBookSection"
                                    v-if="'title' in article.activeBookSection"
                                >{{article.activeBookSection.title}}</Tag>
                                <Button
                                    icon="ios-add"
                                    type="dashed"
                                    @click="toOpenBook"
                                    v-else
                                >添加</Button>
                            </div>
                        </div>
                        <div class="f-item">
                            <div class="i-left">
                                <span>文章分类</span>
                            </div>
                            <div class="i-right">
                                <Tag
                                    type="dot"
                                    closable
                                    :key="key"
                                    @on-close="delType(item)"
                                    v-for="(item, key) in article.activeType"
                                >{{item.name}}</Tag>
                                <Button icon="ios-add" type="dashed" @click="toOpenType">添加</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-book" v-else>
                    <div class="b-item">
                        <div class="i-title">
                            <span>标题</span>
                        </div>
                        <div class="i-content">
                            <div class="c-title">
                                <input
                                    type="text"
                                    placeholder="请输入专题标题（5-20字）"
                                    v-model="book.form.title"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="b-item">
                        <div class="i-title">
                            <span>描述</span>
                        </div>
                        <div class="i-content">
                            <div class="c-desc">
                                <textarea placeholder="请输入专题描述" v-model="book.form.desc"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="b-item">
                        <div class="i-title">
                            <span>封面</span>
                        </div>
                        <div class="i-content">
                            <div class="c-cover">
                                <div
                                    class="c-wrap"
                                    :style="book.form.cover ? {backgroundImage: `url(${qiniuBaseUrl + book.form.cover})`} : {}"
                                    @click="addBookCover"
                                >
                                    <span v-if="!book.form.cover">点击上传封面</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="b-item">
                        <div class="i-title">
                            <span>内容</span>
                        </div>
                        <div class="i-content">
                            <div class="c-section">
                                <div class="s-wrap">
                                    <div class="w-list" v-if="book.form.section.length">
                                        <div
                                            class="l-item"
                                            :key="key"
                                            v-for="(item, key) in book.form.section"
                                        >
                                            <div class="i-left">
                                                <input placeholder="请输入名称" v-model="item.title" />
                                            </div>
                                            <div class="i-right" @click="delSection(key)">
                                                <i class="iconfont icon-shanchu"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="w-add" @click="addSection">
                                        <span>添加</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </user>
        <Drawer title="文章标签" :closable="false" width="360" v-model="drawerVisible1">
            <CellGroup>
                <Cell
                    :title="item.name"
                    :key="key"
                    :selected="article.activeTag.map(i => {return i.id}).includes(item.id)"
                    @click.native="selectTag(item)"
                    v-for="(item, key) in article.tagList"
                />
            </CellGroup>
        </Drawer>
        <Drawer title="知识要素" :closable="false" width="360" v-model="drawerVisible2">
            <div class="d-header" slot="header">
                <div class="h-left">
                    <span>知识要素</span>
                </div>
                <div class="h-right">
                    <Button type="primary" @click="addKnow">添加</Button>
                </div>
            </div>
            <div class="d-content">
                <div class="c-block" :key="key" v-for="(item, key) in article.activeKnow">
                    <div class="b-item">
                        <div class="i-left">
                            <span>名称:</span>
                        </div>
                        <div class="i-right">
                            <Input
                                placeholder="输入名称"
                                clearable
                                style="width: 100%"
                                v-model="item.name"
                            />
                        </div>
                    </div>
                    <div class="b-item">
                        <div class="i-left">
                            <span>链接:</span>
                        </div>
                        <div class="i-right">
                            <Input
                                placeholder="输入链接"
                                clearable
                                style="width: 100%"
                                v-model="item.url"
                            >
                                <span slot="prepend">https:</span>
                            </Input>
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
        <Drawer title="资源下载" :closable="false" width="360" v-model="drawerVisible3">
            <div class="d-header" slot="header">
                <div class="h-left">
                    <span>资源下载</span>
                </div>
                <div class="h-right">
                    <Button type="primary" @click="addSource">添加</Button>
                </div>
            </div>
            <div class="d-content">
                <div class="c-block" :key="key" v-for="(item, key) in article.activeSource">
                    <div class="b-item">
                        <div class="i-left">
                            <span>名称:</span>
                        </div>
                        <div class="i-right">
                            <Input
                                placeholder="输入名称"
                                clearable
                                style="width: 100%"
                                v-model="item.name"
                            />
                        </div>
                    </div>
                    <div class="b-item">
                        <div class="i-left">
                            <span>链接:</span>
                        </div>
                        <div class="i-right">
                            <Input
                                placeholder="输入链接"
                                clearable
                                style="width: 100%"
                                v-model="item.url"
                            >
                                <span slot="prepend">https:</span>
                            </Input>
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
        <Drawer title="物品购买" :closable="false" width="360" v-model="drawerVisible4">
            <div class="d-header" slot="header">
                <div class="h-left">
                    <span>物品购买</span>
                </div>
                <div class="h-right">
                    <Button type="primary" @click="addGoods">添加</Button>
                </div>
            </div>
            <div class="d-content">
                <div class="c-block" :key="key" v-for="(item, key) in article.activeGoods">
                    <div class="b-item">
                        <div class="i-left">
                            <span>名称:</span>
                        </div>
                        <div class="i-right">
                            <Input
                                placeholder="输入名称"
                                clearable
                                style="width: 100%"
                                v-model="item.name"
                            />
                        </div>
                    </div>
                    <div class="b-item">
                        <div class="i-left">
                            <span>链接:</span>
                        </div>
                        <div class="i-right">
                            <Input
                                placeholder="输入链接"
                                clearable
                                style="width: 100%"
                                v-model="item.url"
                            >
                                <span slot="prepend">https:</span>
                            </Input>
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
        <Drawer title="专题绑定" :closable="false" width="360" v-model="drawerVisible5">
            <CellGroup>
                <Cell
                    :title="item.title"
                    :key="key"
                    @click.native="selectBook(item)"
                    v-for="(item, key) in article.bookList"
                />
            </CellGroup>
        </Drawer>
        <Drawer :title="`专题内容-${article.activeBook.title}`" :closable="false" width="360" v-model="drawerVisible6">
            <CellGroup>
                <Cell
                    :title="item.title"
                    :key="key"
                    :selected="article.activeBookSection.id === item.id"
                    @click.native="selectBookSection(item)"
                    v-for="(item, key) in article.activeBook.section"
                />
            </CellGroup>
        </Drawer>
        <Drawer title="文章类型" :closable="false" width="360" v-model="drawerVisible7">
            <CellGroup>
                <Cell
                    :title="item.name"
                    :key="key"
                    :selected="article.activeType.map(i => {return i.id}).includes(item.id)"
                    @click.native="selectType(item)"
                    v-for="(item, key) in article.typeList"
                />
            </CellGroup>
        </Drawer>
    </div>
</template>

<script type="text/ecmascript-6">
import apiUser from "~/api/user"
import apiArticle from "~/api/article"
import user from "~/components/user"
import xHeader from "~/components/x-header"
import markdownEditor from "~/components/markdown-editor"
import upload from "~/utils/upload"

export default {
    layout: "auth",
    head() {
        return {
            title: "Kyeteo 写文章",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: "Kyeteo vuejs ssr 服务端渲染 esp芯片 树莓派 写文章"
                }
            ],
            script: [
                {
                    src: "/js/seo.js"
                }
            ]
        }
    },
    data() {
        return {
            qiniuBaseUrl: process.env.QINIU_BASE_URL,
            type: this.$route.query.type ? this.$route.query.type * 1 : 1,
            drawerVisible1: false,
            drawerVisible2: false,
            drawerVisible3: false,
            drawerVisible4: false,
            drawerVisible5: false,
            drawerVisible6: false,
            drawerVisible7: false,
            article: {
                tagList: [],
                tagType: [],
                activeTag: [],
                activeType: [],
                activeKnow: [],
                activeSource: [],
                activeGoods: [],
                bookList: [],
                activeBook: {},
                activeBookSection: {},
                form: {
                    id: this.$route.query.id,
                    title: "",
                    text: ""
                }
            },
            book: {
                form: {
                    id: this.$route.query.id,
                    title: "",
                    desc: "",
                    cover: "",
                    section: []
                }
            }
        }
    },
    components: {
        user,
        xHeader,
        markdownEditor
    },
    methods: {
        getArticle() {
            apiUser
                .getArticle({
                    axios: this.$axios,
                    params: { id: this.article.form.id }
                })
                .then(res => {
                    if (res.done) {
                        this.article.form.title = res.data.title
                        this.article.form.text = res.data.text
                        this.article.activeTag = res.data.tag.map(i => {
                            return {
                                id: i.id,
                                name: i.name
                            }
                        })
                        this.article.activeType = res.data.type.map(i => {
                            return {
                                id: i.id,
                                name: i.name
                            }
                        })
                        this.article.activeKnow = res.data.know.map(i => {
                            return {
                                name: i.name,
                                url: i.url
                            }
                        })
                        this.article.activeSource = res.data.source.map(i => {
                            return {
                                name: i.name,
                                url: i.url
                            }
                        })
                        this.article.activeGoods = res.data.goods.map(i => {
                            return {
                                name: i.name,
                                url: i.url
                            }
                        })
                        this.article.activeBookSection = res.data.section.length ? res.data.section[0] : {}
                    }
                })
        },
        getBook() {
            apiUser
                .getBook({
                    axios: this.$axios,
                    params: { id: this.article.form.id }
                })
                .then(res => {
                    if (res.done) {
                        this.book.form.title = res.data.title
                        this.book.form.desc = res.data.desc
                        this.book.form.cover = res.data.cover
                        this.book.form.section = res.data.section.map(i => {
                            return {
                                title: i.title
                            }
                        })
                    }
                })
        },
        toOpenBook () {
            apiUser.getOwnBooks({ axios: this.$axios }).then(res => {
                if (res.done) {
                    this.article.bookList = res.data
                    this.drawerVisible5 = true
                }
            })
        },
        selectBook (o) {
            this.article.activeBook = o
            this.drawerVisible5 = false
            this.drawerVisible6 = true
        },
        selectBookSection (o) {
            this.article.activeBookSection = o
             this.drawerVisible6 = false
        },
        delBookSection () {
            this.article.activeBook = {}
            this.article.activeBookSection = {}
        },
        toOpenTag() {
            apiArticle.getTags({ axios: this.$axios }).then(res => {
                if (res.done) {
                    this.article.tagList = res.data
                    this.drawerVisible1 = true
                }
            })
        },
        toOpenType() {
            apiArticle.getTypes({ axios: this.$axios }).then(res => {
                if (res.done) {
                    this.article.typeList = res.data
                    this.drawerVisible7 = true
                }
            })
        },
        selectTag(e) {
            if (
                this.article.activeTag
                    .map(i => {
                        return i.id
                    })
                    .includes(e.id)
            ) {
                this.article.activeTag = this.article.activeTag.filter(i => {
                    return i.id !== e.id
                })
                return
            }
            this.article.activeTag.push(e)
        },
        selectType(e) {
            if (
                this.article.activeType
                    .map(i => {
                        return i.id
                    })
                    .includes(e.id)
            ) {
                this.article.activeType = this.article.activeType.filter(i => {
                    return i.id !== e.id
                })
                return
            }
            this.article.activeType.push(e)
        },
        delTag(e) {
            this.article.activeTag = this.article.activeTag.filter(i => {
                return i.id !== e.id
            })
        },
        delType(e) {
            this.article.activeType = this.article.activeType.filter(i => {
                return i.id !== e.id
            })
        },
        addKnow() {
            const data = {
                id: this.article.activeKnow.length,
                name: "",
                url: ""
            }
            this.article.activeKnow.push(data)
        },
        delKnow(e) {
            this.article.activeKnow = this.article.activeKnow.filter(i => {
                return i.id !== e.id
            })
        },
        addSource() {
            const data = {
                id: this.article.activeSource.length,
                name: "",
                url: ""
            }
            this.article.activeSource.push(data)
        },
        delSource(e) {
            this.article.activeSource = this.article.activeSource.filter(i => {
                return i.id !== e.id
            })
        },
        addGoods() {
            const data = {
                id: this.article.activeGoods.length,
                name: "",
                url: ""
            }
            this.article.activeGoods.push(data)
        },
        delGoods(e) {
            this.article.activeGoods = this.article.activeGoods.filter(i => {
                return i.id !== e.id
            })
        },
        async addBookCover() {
            const key = await upload.qiniu({ axios: this.$axios })
            this.book.form.cover = key
        },
        addSection() {
            this.book.form.section.push({
                title: ""
            })
        },
        delSection(i) {
            this.book.form.section[i] = false
            this.book.form.section = this.book.form.section.filter(i => {
                return i
            })
        },
        createArticle() {
            if (!this.article.form.title) {
                this.$Message.warning("标题必填")
                return
            }
            this.article.form.tag = this.article.activeTag
                .map(i => {
                    return i.id
                })
                .join("|")
            this.article.form.type = this.article.activeType
                .map(i => {
                    return i.id
                })
                .join("|")
            this.article.form.know = this.article.activeKnow.map(i => {
                return {
                    name: i.name,
                    url: i.url
                }
            })
            this.article.form.source = this.article.activeSource.map(i => {
                return {
                    name: i.name,
                    url: i.url
                }
            })
            this.article.form.goods = this.article.activeGoods.map(i => {
                return {
                    name: i.name,
                    url: i.url
                }
            })
            this.article.form.section = 'id' in this.article.activeBookSection ? this.article.activeBookSection.id : ''
            this.article.form.text = this.$refs.markdown.save()
            apiUser
                .createArticle({
                    axios: this.$axios,
                    params: this.article.form
                })
                .then(res => {
                    if (res.done) {
                        this.$Message.success("发表成功")
                    }
                })
        },
        updateArticle() {
            if (!this.article.form.title) {
                this.$Message.warning("标题必填")
                return
            }
            this.article.form.tag = this.article.activeTag
                .map(i => {
                    return i.id
                })
                .join("|")
            this.article.form.type = this.article.activeType
                .map(i => {
                    return i.id
                })
                .join("|")
            this.article.form.know = this.article.activeKnow.map(i => {
                return {
                    name: i.name,
                    url: i.url
                }
            })
            this.article.form.source = this.article.activeSource.map(i => {
                return {
                    name: i.name,
                    url: i.url
                }
            })
            this.article.form.goods = this.article.activeGoods.map(i => {
                return {
                    name: i.name,
                    url: i.url
                }
            })
            this.article.form.section = 'id' in this.article.activeBookSection ? this.article.activeBookSection.id : ''
            this.article.form.text = this.$refs.markdown.save()
            apiUser
                .updateArticle({
                    axios: this.$axios,
                    params: this.article.form
                })
                .then(res => {
                    if (res.done) {
                        this.$Message.success("更新成功")
                    }
                })
        },
        createBook() {
            if (!this.book.form.title) {
                this.$Message.warning("标题必填")
                return
            }
            apiUser
                .createBook({ axios: this.$axios, params: this.book.form })
                .then(res => {
                    if (res.done) {
                        this.$Message.success("发表成功")
                    }
                })
        },
        updateBook() {
            if (!this.book.form.title) {
                this.$Message.warning("标题必填")
                return
            }
            apiUser
                .updateBook({ axios: this.$axios, params: this.book.form })
                .then(res => {
                    if (res.done) {
                        this.$Message.success("发表成功")
                    }
                })
        },
        doPost() {
            if (this.type === 1) {
                this.createArticle()
            }
            if (this.type === 2) {
                this.createBook()
            }
        },
        doUpdate() {
            if (this.type === 1) {
                this.updateArticle()
            }
            if (this.type === 2) {
                this.updateBook()
            }
        }
    },
    mounted() {
        this.article.form.id && (this.type === 1 ? this.getArticle() : this.getBook())
    }
};
</script>
<style lang="less">
.post {
    .m-post {
        background: white;
        .p-tab {
            display: flex;
            height: 45px;
            padding: 0 20px;
            border-bottom: 1px solid #f1f1f1;
            .t-item {
                display: flex;
                align-items: center;
                padding-right: 20px;
                span {
                    font-size: 14px;
                }
                &:not(:first-child) {
                    padding-left: 20px;
                }
                &-active {
                    span {
                        color: #007fff;
                    }
                }
                &:hover {
                    cursor: pointer;
                    span {
                        color: #007fff;
                    }
                }
            }
        }
        .p-article {
            padding: 20px;
            .a-title {
                display: flex;
                align-items: center;
                height: 58px;
                input {
                    width: 100%;
                    border: none;
                    outline: none;
                    font-size: 20px;
                    color: #595959;
                }
            }
            .a-form {
                padding: 35px 0 100px 0;
                .f-item {
                    display: flex;
                    align-items: center;
                    .i-left {
                        display: flex;
                        flex-basis: 70px;
                        span {
                            font-size: 16px;
                            color: #999;
                        }
                    }
                    .i-right {
                        flex: 1;
                        padding-left: 40px;
                    }
                    &:not(:last-child) {
                        padding-bottom: 40px;
                    }
                }
            }
        }
        .p-book {
            padding: 20px;
            .b-item {
                .i-title {
                    display: flex;
                    align-items: center;
                    height: 46px;
                    span {
                        font-size: 14px;
                    }
                }
                .i-content {
                    padding: 20px 0;
                    font-size: 14px;
                    .c-title {
                        display: flex;
                        align-items: center;
                        input {
                            width: 100%;
                            border: none;
                            outline: none;
                            font-size: 20px;
                            color: #595959;
                        }
                    }
                    .c-desc {
                        textarea {
                            width: 100%;
                            min-height: 60px;
                            border: none;
                            outline: none;
                            color: #595959;
                        }
                    }
                    .c-cover {
                        display: flex;
                        .c-wrap {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 240px;
                            height: 96px;
                            background: hsla(0, 0%, 87%, 0.6);
                            background-size: 100% auto;
                            span {
                                font-size: 14px;
                                color: rgba(51, 51, 51, 0.4);
                            }
                            &:hover {
                                cursor: pointer;
                            }
                        }
                    }
                    .c-section {
                        display: flex;
                        .s-wrap {
                            width: 240px;
                            .w-list {
                                padding-bottom: 30px;
                                .l-item {
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    height: 30px;
                                    padding: 0 10px;
                                    background: #f4f5f5;
                                    input {
                                        border: none;
                                        outline: none;
                                        background: #f4f5f5;
                                    }
                                    .i-right {
                                        &:hover {
                                            cursor: pointer;
                                        }
                                    }
                                    &:not(:first-child) {
                                        margin-top: 10px;
                                    }
                                }
                            }
                            .w-add {
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                height: 30px;
                                border-radius: 3px;
                                background: #007fff;
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
                &:not(:first-child) {
                    padding-top: 40px;
                }
            }
        }
    }
}
.d-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .h-left {
        font-size: 14px;
        font-weight: 700;
        color: #17233d;
    }
}
.d-content {
    .c-block {
        .b-item {
            display: flex;
            align-items: center;
            .i-left {
                flex-basis: 50px;
                span {
                    font-size: 14px;
                }
            }
            .i-right {
                flex: 1;
            }
            &:last-child {
                padding-top: 10px;
            }
        }
        &:not(:first-child) {
            padding-top: 20px;
        }
    }
}
</style>
