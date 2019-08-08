<template>
    <div class="error">
        <x-header></x-header>
        <div class="e-box">
            <img class="b-404" src="/image/error-404.png" alt />
            <img class="b-water" src="/image/error-water.png" alt />
            <img class="b-cloud" src="/image/error-cloud.png" alt />
            <img class="b-fish" src="/image/error-fish.png" alt />
        </div>
        <div class="e-btn">
            <div class="b-wrap" @click="rep('/')">
                <span>返回首页</span>
            </div>
        </div>
    </div>
</template>

<script>
import xHeader from '~/components/x-header'
export default {
    head() {
        return {
            title: 'Kyeteo 服务器发生未知错误/(ㄒoㄒ)/~~',
            meta: [
                { hid: 'description', name: 'description', content: 'Kyeteo vuejs ssr 服务端渲染 esp芯片 树莓派' }
            ],
            script: [
                {
                    src: '/js/seo.js'
                }
            ]
        }
    },
    components: {
        xHeader
    }
}
</script>

<style lang="less">
.error{
    .e-box{
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        width:624px;
        height: 600px;
        padding-top: 90px;
        margin:0 auto;
        .b-404{
            width:70%;
        }
        .b-water{
            position: absolute;
            top:339px;
            left:50%;
            transform: translateX(-50%);
            width:100%;
            opacity: .7;
            z-index: 9;
        }
        .b-cloud{
            position: absolute;
            top:339px;
            left:50%;
            transform: translateX(-50%);
            width:253px;
            z-index: 10;
        }
        .b-fish{
            position: absolute;
            top:330px;
            left:50%;
            transform: translate(-50%, -50%);
            width:130px;
        }
    }
    .e-btn{
        display: flex;
        justify-content: center;
        .b-wrap{
            display: flex;
            align-items: center;
            justify-content: center;
            width:120px;
            height: 50px;
            border-radius: 5px;
            background: #007fff;
            span{
                font-size: 14px;
                color:white;
            }
            &:hover{
                cursor: pointer;
            }
        }
    }
}
</style>


