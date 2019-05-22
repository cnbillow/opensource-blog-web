<template>
    <div class="editor">
        <white-header></white-header>
        <me-layout>
            <div class="e-container">
                <div class="c-editor">
                    <div class="e-wrap">
                        <div class="w-title">
                            <input type="text" placeholder="请输入文章标题（5-20字）" v-model="form.title">
                        </div>
                        <div class="w-mavon">
                            <mavon-editor
                                    ref="md"
                                    :toolbars="toolbars"
                                    :boxShadow="false"
                                    defaultOpen="edit"
                                    :subfield="false"
                                    @imgAdd="imgAdd"
                                    v-model="form.text"/>
                        </div>
                        <div class="w-form">
                            <div class="f-item">
                                <div class="i-left">
                                    <span>文章标签</span>
                                </div>
                                <div class="i-right">
                                    <Tag type="dot"
                                         closable
                                         :key="key"
                                         @on-close="delTag(item)"
                                         v-for="(item, key) in activeTag">{{item.name}}</Tag>
                                    <Button icon="ios-add" type="dashed" @click="toOpenTag">添加</Button>
                                </div>
                            </div>
                            <div class="f-item">
                                <div class="i-left">
                                    <span>知识要素</span>
                                </div>
                                <div class="i-right">
                                    <Tag type="dot"
                                         closable
                                         :key="key"
                                         @on-close="delKnow(item)"
                                         v-for="(item, key) in activeKnow">{{item.name}}</Tag>
                                    <Button icon="ios-add" type="dashed" @click="drawerVisible2 = true">添加</Button>
                                </div>
                            </div>
                            <div class="f-item">
                                <div class="i-left">
                                    <span>资源下载</span>
                                </div>
                                <div class="i-right">
                                    <Tag type="dot"
                                         closable
                                         :key="key"
                                         @on-close="delSource(item)"
                                         v-for="(item, key) in activeSource">{{item.name}}</Tag>
                                    <Button icon="ios-add" type="dashed" @click="drawerVisible3 = true">添加</Button>
                                </div>
                            </div>
                            <div class="f-item">
                                <div class="i-left">
                                    <span>物品购买</span>
                                </div>
                                <div class="i-right">
                                    <Tag type="dot"
                                         closable
                                         :key="key"
                                         @on-close="delGoods(item)"
                                         v-for="(item, key) in activeGoods">{{item.name}}</Tag>
                                    <Button icon="ios-add" type="dashed" @click="drawerVisible4 = true">添加</Button>
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
                        <div class="r-publish" @click="doPublish">
                            <span>发表</span>
                        </div>
                    </div>
                </div>
            </div>
            <Drawer
                    title="文章标签"
                    :closable="false"
                    width="360"
                    v-model="drawerVisible1">
                <CellGroup>
                    <Cell
                            :title="item.name"
                            :key="key"
                            :selected="activeTag.map(i => {return i.id}).includes(item.id)"
                            @click.native="selectTag(item)"
                            v-for="(item, key) in tagList"/>
                </CellGroup>
            </Drawer>
            <Drawer
                    title="知识要素"
                    :closable="false"
                    width="360"
                    v-model="drawerVisible2">
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
                                <Input placeholder="输入名称" clearable style="width: 100%" v-model="item.name"/>
                            </div>
                        </div>
                        <div class="b-item">
                            <div class="i-left">
                                <span>链接:</span>
                            </div>
                            <div class="i-right">
                                <Input placeholder="输入链接" clearable style="width: 100%" v-model="item.url">
                                    <span slot="prepend">http://</span>
                                </Input>
                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
            <Drawer
                    title="资源下载"
                    :closable="false"
                    width="360"
                    v-model="drawerVisible3">
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
                                <Input placeholder="输入名称" clearable style="width: 100%" v-model="item.name"/>
                            </div>
                        </div>
                        <div class="b-item">
                            <div class="i-left">
                                <span>链接:</span>
                            </div>
                            <div class="i-right">
                                <Input placeholder="输入链接" clearable style="width: 100%" v-model="item.url">
                                    <span slot="prepend">http://</span>
                                </Input>
                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
            <Drawer
                    title="物品购买"
                    :closable="false"
                    width="360"
                    v-model="drawerVisible4">
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
                                <Input placeholder="输入名称" clearable style="width: 100%" v-model="item.name"/>
                            </div>
                        </div>
                        <div class="b-item">
                            <div class="i-left">
                                <span>链接:</span>
                            </div>
                            <div class="i-right">
                                <Input placeholder="输入链接" clearable style="width: 100%" v-model="item.url">
                                    <span slot="prepend">http://</span>
                                </Input>
                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
        </me-layout>
    </div>
</template>

<script type="text/ecmascript-6">
    import {api} from '@/service/api'
    import {QINIU_URL} from '@/config/var/qiniu'
    import {TOOL_BARS} from '../../config/var/editor'
    import * as qiniu from 'qiniu-js'
    import {mavonEditor} from 'mavon-editor'
    import meLayout from '@/components/me-layout'
    import whiteHeader from '@/components/white-header'

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
                    title: '',
                    text: ''
                },
                toolbars: TOOL_BARS
            }
        },
        components: {
            mavonEditor,
            meLayout,
            whiteHeader,
        },
        methods: {
            toOpenTag(){
                api.article.getTag().then(res => {
                    if (res.done) {
                        this.tagList = res.data
                        this.drawerVisible1 = true
                    }
                })
            },
            selectTag (e) {
                if ( this.activeTag.map(i => {return i.id}).includes(e.id)) {
                    this.activeTag =  this.activeTag.filter(i => {
                        return i.id !== e.id
                    })
                    return
                }
                this.activeTag.push(e)
            },
            delTag (e) {
                this.activeTag =  this.activeTag.filter(i => {
                    return i.id !== e.id
                })
            },
            addKnow () {
                const data = {
                    id:  this.activeKnow.length,
                    name: '',
                    url: ''
                }
                this.activeKnow.push(data)
            },
            delKnow (e) {
                this.activeKnow =  this.activeKnow.filter(i => {
                    return i.id !== e.id
                })
            },
            addSource () {
                const data = {
                    id:  this.activeSource.length,
                    name: '',
                    url: ''
                }
                this.activeSource.push(data)
            },
            delSource (e) {
                this.activeSource =  this.activeSource.filter(i => {
                    return i.id !== e.id
                })
            },
            addGoods () {
                const data = {
                    id:  this.activeGoods.length,
                    name: '',
                    url: ''
                }
                this.activeGoods.push(data)
            },
            delGoods (e) {
                this.activeGoods =  this.activeGoods.filter(i => {
                    return i.id !== e.id
                })
            },
            imgAdd(pos, file) {
                const self = this
                api.qiniu.token().then(res => {
                    if (res.done) {
                        const config = {
                            useCdnDomain: false,
                            region: null
                        }
                        const putExtra = {
                            fname: "",
                            params: {},
                            mimeType: null
                        }
                        const observable = qiniu.upload(file, null, res.data, putExtra, config)
                        observable.subscribe({
                            complete(res1) {
                                self.$refs.md.$img2Url(pos, QINIU_URL + res1.key)
                            }
                        })
                    }
                })
            },
            doPublish() {
                if (!this.form.title){
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
                api.user.createArticle(this.form).then(res => {
                    if (res.done) {
                        this.$Message.success('发表成功')
                    }
                })
            }
        }
    }
</script>
<style lang="less">
    @import 'index';

</style>
