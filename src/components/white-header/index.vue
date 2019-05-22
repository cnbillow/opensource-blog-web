<template>
    <header class="white-header">
        <div class="h-wrap">
            <div class="w-left">
                <h1 @click="rep('/')">kyeteo</h1>
            </div>
            <div class="w-right" v-if="isLogin">
                <span class="r-text">个人中心</span>
                <span>/</span>
                <span class="r-text">注销</span>
            </div>
            <div class="w-right" v-else>
                <span class="r-text" @click="nav('/login')">登陆</span>
                <span>/</span>
                <span class="r-text" @click="nav('/register')">注册</span>
            </div>
        </div>
    </header>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        computed: {
            ...mapState('user', ['isLogin'])
        }
    }
</script>

<style lang="less" scoped>
    @import "index";
</style>
