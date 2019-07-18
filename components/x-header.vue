<template>
    <div class="x-header" :class="{'x-header-with-sub': sub}">
        <div class="h-main">
            <div class="m-wrap">
                <div class="w-left">
                    <div class="l-logo">
                        <h1>Kyeteo</h1>
                    </div>
                    <div class="l-module">
                        <div class="m-item"
                        @click="rep('/')"
                        :class="{'m-item-active': $route.path === '/'}">
                            <span>首页</span>
                        </div>
                    </div>
                </div>
                <div class="w-right">
                    <div class="r-search">
                        <input type="text" placeholder="搜索更新啦" v-model="keyword"/>
                        <i class="iconfont icon-sousuo" @click="doSearch"></i>
                    </div>
                    <div class="r-do">
                        <div class="d-item" @click="nav('/user/post')">
                            <i class="iconfont icon-xiezi"></i>
                            <span>写文章</span>
                        </div>
                        <div class="d-item">
                            <span @click="nav('/login')">登陆</span>
                            <span>/</span>
                            <span  @click="nav('/register')">注册</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="h-sub" v-if="sub">
            <div class="s-wrap">
                <div class="w-item w-item-active">
                    <span>前端</span>
                </div>
                <div class="w-item">
                    <span>后端</span>
                </div>
                <div class="w-item">
                    <span>嵌入式</span>
                </div>
                <div class="w-item">
                    <span>人工智能</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            keyword: ''
        }
    },
    props: {
        sub: {
            default: true
        }
    },
    methods: {
        doSearch () {
            this.keyword && this.$emit('do-search', this.keyword)
        }
    }
}
</script>


<style lang="less">
.x-header {
    position: fixed;
    top:0;
    left:0;
    width:100%;
    background: white;
    z-index: 1000;
    .h-main {
        border-bottom: 1px solid #f1f1f1;
        .m-wrap {
            display: flex;
            justify-content: space-between;
            width: 960px;
            height: 60px;
            margin: 0 auto;
            .w-left {
                display: flex;
                .l-logo {
                    display: flex;
                    align-items: center;
                    h1 {
                        color: #007fff;
                    }
                    &:hover{
                        cursor: pointer;
                    }
                }
                .l-module {
                    display: flex;
                    .m-item {
                        display: flex;
                        align-items: center;
                        padding: 0 20px;
                        span {
                            font-size: 16px;
                        }
                        &-active{
                            span {
                                font-size: 16px;
                                color: #007fff;
                            }                            
                        }
                        &:hover{
                            cursor: pointer;
                        }                        
                    }
                }
            }
            .w-right {
                display: flex;
                align-items: center;
                .r-search {
                    display: flex;
                    align-items: center;
                    width: 130px;
                    height: 30px;
                    padding: 0 10px;
                    box-sizing: border-box;
                    border: 1px solid hsla(0, 0%, 59.2%, 0.2);
                    background: rgba(227, 231, 236, 0.2);
                    input {
                        width: 90px;
                        border: none;
                        outline: none;
                        background: none;
                        font-size: 14px;
                    }
                    i {
                        font-size: 20px;
                        &:hover{
                            cursor: pointer;
                        }
                    }
                }
                .r-do {
                    display: flex;
                    align-items: center;
                    margin-left: 30px;
                    span {
                        font-size: 16px;
                        color: #007fff;
                    }
                    .d-item {
                        display: flex;
                        align-items: center;
                        i{
                            font-size: 20px;
                            color: #007fff;
                        }
                        span{
                            &:nth-child(2){
                                padding: 0 10px;
                            }
                        }
                        &:last-child{
                            position: relative;
                            padding-left: 20px;
                            &:before{
                                position: absolute;
                                content:'';
                                top:50%;
                                transform: translateY(-50%);
                                left:10px;
                                height: 70%;
                                width:1px;
                                background: hsla(0, 0%, 59.2%, 0.2);
                            }
                        }
                        &:hover{
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
    .h-sub{
        display: none;
        .s-wrap{
            display: flex;
            width:960px;
            height: 46px;
            margin:0 auto;
            .w-item{
                display: flex;
                align-items: center;
                padding-right: 10px;
                span{
                    font-size: 14px;
                }
                &:not(:first-child){
                    padding-left: 10px;
                }
                &-active{
                    span{
                        color:#007fff;
                    }
                }
                &:hover{
                    cursor: pointer;
                    color: #007fff;
                }                   
            }
        }
    }
    &-with-sub{
        box-shadow:0px 0px 10px 0px rgba(2,2,2,0.2);
        .h-sub{
            display: block;
        }
    }
}
</style>

