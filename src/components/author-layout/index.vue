<template>
    <div class="user-layout">
        <div class="l-cover"></div>
        <div class="l-outline">
            <div class="o-wrap">
                <div class="w-item">
                    <span class="i-name">访问</span>
                    <span class="i-count">257,234</span>
                </div>
                <div class="w-item">
                    <span class="i-name">文章</span>
                    <span class="i-count">78</span>
                </div>
            </div>
        </div>
        <div class="l-content">
            <div class="c-wrap">
                <div class="w-left">
                    <div class="l-avatar">
                        <img :src="user.avatar | avatarCover" alt="">
                    </div>
                    <div class="l-name">
                        <span>{{user.nickname}}</span>
                        <i class="iconfont icon-nv"></i>
                    </div>
                    <div class="l-what-is-up">
                        <p>个性签名：{{user.what_is_up}}</p>
                    </div>
                    <div class="l-tags">
                        <div class="t-item"
                             :key="key"
                             v-for="(item, key) in user.tag">
                            <i class="iconfont icon-iconset0169"></i>
                            <span>{{item.name}}</span>
                        </div>
                    </div>
                    <slot name="left"></slot>
                </div>
                <div class="w-mid">
                    <slot></slot>
                </div>
                <div class="w-right">
                    <slot name="right"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['user']
    }
</script>

<style lang="less">
    @import 'index.less';
</style>
