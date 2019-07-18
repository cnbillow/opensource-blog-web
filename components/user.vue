<template>
    <article class="user">
        <div class="u-tab">
            <div class="t-wrap">
                <div class="w-left">
                    <div
                        class="l-item"
                        :class="{'l-item-active': $route.path === '/user/post'}"
                        @click="rep('/user/post')"
                    >
                        <span>写文章/专题</span>
                    </div>
                    <div
                        class="l-item"
                        :class="{'l-item-active': $route.path === '/user/articles'}"
                        @click="rep('/user/articles')"
                    >
                        <span>文章管理</span>
                    </div>
                    <div
                        class="l-item"
                        :class="{'l-item-active': $route.path === '/user/books'}"
                        @click="rep('/user/books')"
                    >
                        <span>专题管理</span>
                    </div>
                </div>
                <div class="w-right">
                    <template v-if="$route.path === '/user/post'">
                        <div class="r-btn" @click="doPost" v-if="!$route.query.id">
                            <span>发表</span>
                        </div>
                        <div class="r-btn" @click="doUpdate" v-else>
                            <span>更新</span>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <div class="u-main">
            <slot></slot>
        </div>
    </article>
</template>

<script type="text/ecmascript-6">
export default {
    methods: {
        doPost() {
            this.$emit('do-post')
        },
        doUpdate() {
            this.$emit('do-update')
        }
    }
}
</script>
<style lang="less">
.user {
    background: #f4f5f5;
    .u-tab {
        position: fixed;
        top: 60px;
        left: 0;
        width: 100%;
        background: white;
        box-shadow: 0px 0px 10px 0px rgba(2, 2, 2, 0.2);
        z-index: 999;
        .t-wrap {
            display: flex;
            justify-content: space-between;
            width: 960px;
            height: 46px;
            margin: 0 auto;
            .w-left {
                display: flex;
                align-items: center;
                .l-item {
                    padding-right: 10px;
                    span {
                        font-size: 14px;
                    }
                    &:not(:first-child) {
                        padding-left: 10px;
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
            .w-right {
                display: flex;
                align-items: center;
                .r-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100px;
                    height: 30px;
                    border-radius: 3px;
                    background: #007fff;
                    span {
                        font-size: 14px;
                        color: white;
                    }
                    &:hover {
                        cursor: pointer;
                    }
                }
            }
        }
    }
    .u-main {
        width: 960px;
        box-sizing: border-box;
        min-height: 100vh;
        padding-top: 136px;
        margin: 0 auto;
    }
}
</style>
