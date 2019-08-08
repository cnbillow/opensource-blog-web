<template>
    <div class="specific-tip">
        <div class="t-main">
            <div class="m-wrap" :style="{width: `${width}px`}">
                <div class="w-left">
                    <div class="l-cover">
                        <img src="/image/jion_us.webp" alt />
                    </div>
                    <div class="l-info">
                        <h2>对这个开源博客感兴趣？那就加入我们吧！</h2>
                        <p>丰富的知识面，企业级的开发规范，拥抱开源，不仅给自己的技能加速，还给自己的职场添砖加瓦!</p>
                    </div>
                </div>
                <div class="w-right">
                    <div class="r-more" @click="getMore">
                        <span>查看更多</span>
                        <i class="iconfont icon-next"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="t-close" @click="doClose">
            <i class="iconfont icon-guanbi1"></i>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        width: {
            default () {
                return 960
            }
        }
    },
    methods: {
        getMore() {
            window.open('https://gitee.com/is-kyeteo/opensource-blog-web')
        },
        doClose () {
            this.$emit('do-close')
        }
    }
}
</script>

<style lang="less">
.specific-tip {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: white;
    z-index: 1000;
    .t-main {
        .m-wrap {
            display: flex;
            justify-content: space-between;
            height: 128px;
            margin: 0 auto;
            .w-left {
                display: flex;
                .l-cover {
                    position: relative;
                    width: 148px;
                    img {
                        position: absolute;
                        left:0;
                        bottom:0;
                        width: 148px;
                        height: 148px;
                    }
                }
                .l-info {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding-left: 20px;
                    p {
                        padding-top: 10px;
                    }
                }
            }
            .w-right {
                display: flex;
                align-items: center;
                .r-more {
                    display: flex;
                    align-items: center;
                    color: #007fff;
                    &:hover {
                        cursor: pointer;
                    }
                }
            }
        }
    }
    .t-close {
        position: absolute;
        top: 10px;
        right: 10px;
        i {
            font-size: 20px;
        }
        &:hover {
            cursor: pointer;
            i {
                color: #007fff;
            }
        }
    }
}
</style>


