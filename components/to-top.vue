<template>
    <div class="to-top" @click="scrollTop">
        <i class="iconfont icon-dingbu1"></i>
    </div>
</template>>

<script>
export default {
    methods: {
        scrollTop() {
            window.scrollTo(0, 0)
        }
    }
}
</script>

<style lang="less">
.to-top{
    position: fixed;
    bottom:140px;
    right:40px;
    width:40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    background: white;
    box-shadow:0px 0px 10px 0px rgba(7, 53, 64, 0.35);
    &:hover{
        cursor: pointer;
    }
}
</style>