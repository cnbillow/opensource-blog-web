<template>
    <article class="me-layout">
        <div class="l-article">
            <div class="a-side">
                <div class="s-menu">
                    <div class="m-item" @click="rep('/me-editor')" :style="{color: $route.path === '/me-editor' ? '#FF694E' : ''}">
                        <i class="iconfont icon-xiezi"></i>
                        <span>发文章</span>
                    </div>
                    <div class="m-item" @click="rep('/me-article')" :style="{color: $route.path === '/me-article' ? '#FF694E' : ''}">
                        <i class="iconfont icon-neirong"></i>
                        <span>内容管理</span>
                    </div>
                    <div class="m-item"  @click="rep('/me-comment')" :style="{color: $route.path === '/me-comment' ? '#FF694E' : ''}">
                        <i class="iconfont icon-pinglun"></i>
                        <span>评论管理</span>
                    </div>
                </div>
            </div>
            <div class="a-main">
                <slot></slot>
            </div>
        </div>
    </article>
</template>

<script type="text/ecmascript-6">
    export default {
    }
</script>
<style lang="less">
    @import 'index';
</style>
