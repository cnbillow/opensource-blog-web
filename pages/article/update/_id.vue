<template>
    <div class="my-article">
        <page-header theme="light"></page-header>
        <user>
            <div class="a-container">
                <div class="c-editor">
                    <div class="e-wrap">
                        <div class="w-title">
                            <input type="text" placeholder="请输入文章标题（5-20字）" v-model="form.title" />
                        </div>
                        <div class="w-mavon">
                            <markdown-editor ref="markdown" :md="form.text"></markdown-editor>
                        </div>
                        <div class="w-form">
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
                                        v-for="(item, key) in activeTag"
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
                                        v-for="(item, key) in activeKnow"
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
                                        v-for="(item, key) in activeSource"
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
                                        v-for="(item, key) in activeGoods"
                                    >{{item.name}}</Tag>
                                    <Button
                                        icon="ios-add"
                                        type="dashed"
                                        @click="drawerVisible4 = true"
                                    >添加</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="c-btn">
                    <div class="b-left">
                        <div class="l-count">
                            <span>数字 {{form.text.length}}</span>
                        </div>
                    </div>
                    <div class="b-right">
                        <div class="r-publish" @click="doUpdate">
                            <span>更新</span>
                        </div>
                    </div>
                </div>
            </div>
            <Drawer title="文章标签" :closable="false" width="360" v-model="drawerVisible1">
                <CellGroup>
                    <Cell
                        :title="item.name"
                        :key="key"
                        :selected="activeTag.map(i => {return i.id}).includes(item.id)"
                        @click.native="selectTag(item)"
                        v-for="(item, key) in tagList"
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
                    <div class="c-block" :key="key" v-for="(item, key) in activeKnow">
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
                    <div class="c-block" :key="key" v-for="(item, key) in activeSource">
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
                    <div class="c-block" :key="key" v-for="(item, key) in activeGoods">
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
        </user>
    </div>
</template>

<script type="text/ecmascript-6">
import apiUser from '~/api/user'
import apiArticle from '~/api/article'
import user from '~/components/user'
import pageHeader from '~/components/page-header'
import markdownEditor from '~/components/markdown-editor'

export default {
    data() {
        return {
            drawerVisible1: false,
            drawerVisible2: false,
            drawerVisible3: false,
            drawerVisible4: false,
            tagList: [],
            activeTag: [],
            activeKnow: [],
            activeSource: [],
            activeGoods: [],
            form: {
                id: this.$route.params.id,
                title: '',
                text: ''
            }
        }
    },
    components: {
        user,
        pageHeader,
        markdownEditor
    },
    methods: {
        getArticle() {
            apiUser.getArticle({ axios: this.$axios, params: { id: this.form.id } }).then(res => {
                if (res.done) {
                    this.form.title = res.data.title
                    this.form.text = res.data.text
                    this.activeTag = res.data.tag.map(i => {
                        return {
                            id: i.id,
                            name: i.name
                        }
                    })
                    this.activeKnow = res.data.know.map(i => {
                        return {
                            name: i.name,
                            url: i.url
                        }
                    })
                    this.activeSource = res.data.source.map(i => {
                        return {
                            name: i.name,
                            url: i.url
                        }
                    })
                    this.activeGoods = res.data.goods.map(i => {
                        return {
                            name: i.name,
                            url: i.url
                        }
                    })
                }
            })
        },
        toOpenTag() {
            apiArticle.getTag({axios: this.$axios}).then(res => {
                if (res.done) {
                    this.tagList = res.data
                    this.drawerVisible1 = true
                }
            })
        },
        selectTag(e) {
            if (this.activeTag.map(i => { return i.id }).includes(e.id)) {
                this.activeTag = this.activeTag.filter(i => {
                    return i.id !== e.id
                })
                return
            }
            this.activeTag.push(e)
        },
        delTag(e) {
            this.activeTag = this.activeTag.filter(i => {
                return i.id !== e.id
            })
        },
        addKnow() {
            const data = {
                id: this.activeKnow.length,
                name: '',
                url: ''
            }
            this.activeKnow.push(data)
        },
        delKnow(e) {
            this.activeKnow = this.activeKnow.filter(i => {
                return i.id !== e.id
            })
        },
        addSource() {
            const data = {
                id: this.activeSource.length,
                name: '',
                url: ''
            }
            this.activeSource.push(data)
        },
        delSource(e) {
            this.activeSource = this.activeSource.filter(i => {
                return i.id !== e.id
            })
        },
        addGoods() {
            const data = {
                id: this.activeGoods.length,
                name: '',
                url: ''
            }
            this.activeGoods.push(data)
        },
        delGoods(e) {
            this.activeGoods = this.activeGoods.filter(i => {
                return i.id !== e.id
            })
        },
        doUpdate() {
            if (!this.form.title) {
                this.$Message.warning('标题必填')
                return
            }
            this.form.tag = this.activeTag.map(i => {
                return i.id
            }).join('|')
            this.form.know = this.activeKnow.map(i => {
                return {
                    name: i.name,
                    url: i.url
                }
            })
            this.form.source = this.activeSource.map(i => {
                return {
                    name: i.name,
                    url: i.url
                }
            })
            this.form.goods = this.activeGoods.map(i => {
                return {
                    name: i.name,
                    url: i.url
                }
            })
            this.form.text = this.$refs.markdown.save()
            apiUser.updateArticle({ axios: this.$axios, params: this.form }).then(res => {
                if (res.done) {
                    this.$Message.success('更新成功')
                }
            })
        }
    },
    mounted() {
        this.getArticle()
    }
}
</script>
<style lang="less">
.my-article {
    .a-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: white;
        .c-editor {
            flex: 1;
            overflow-y: auto;
            overflow-x: hidden;
            .e-wrap {
                padding: 20px 40px;
                .w-title {
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
                .w-mavon {
                    .v-note-wrapper {
                        width: 100%;
                        min-height: 600px;
                        z-index: 999;
                        .v-note-op {
                            border-left: none;
                            border-right: none;
                            border-bottom: 1px solid #e0e0e0;
                        }
                        .v-note-panel {
                            border: none;
                        }
                    }
                }
                .w-form {
                    padding: 35px 0 100px 0;
                    .f-item {
                        display: flex;
                        align-items: center;
                        .i-left {
                            display: flex;
                            justify-content: flex-end;
                            flex-basis: 120px;
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
        }
        .c-btn {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-basis: 81px;
            box-sizing: border-box;
            padding: 0 40px;
            border-top: 1px solid rgb(232, 232, 232);
            .b-left {
                display: flex;
                align-items: center;
                .l-count {
                    span {
                        font-size: 14px;
                        color: rgb(158, 158, 158);
                    }
                }
            }
            .b-right {
                .r-publish {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100px;
                    height: 40px;
                    border-radius: 4px;
                    background: #f85959;
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
