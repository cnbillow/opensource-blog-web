<template>
    <header class="black-header">
        <div class="h-wrap">
            <div class="w-left">
                <h1 @click="rep('/')">kyeteo</h1>
            </div>
            <div class="w-right" v-if="isLogin">
                <span class="r-text" @click="goCenter">个人中心</span>
                <span>/</span>
                <span class="r-text" @click="doExit">注销</span>
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
    import {mapState, mapActions} from 'vuex'
    export default {
        computed: {
            ...mapState('user', ['isLogin']),
            ...mapState('user', ['profile'])
        },
        methods: {
            ...mapActions('user', ['exit']),
            goCenter () {
                this.nav('/author/' + this.profile.id)
            },
            doExit () {
                this.exit()
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "index";
</style>
