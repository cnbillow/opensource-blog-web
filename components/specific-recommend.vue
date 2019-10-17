<template>
    <div class="specific-recommend">
        <div class="r-content">
            <div class="c-title">
                <span>相关推荐</span>
            </div>
            <div class="c-list">
                <template v-for="(item, key) in recommend.list">
                    <div
                        class="l-item"
                        :key="key"
                        @click="nav('/article/' + item.id)"
                        v-if="item.type === 1"
                    >
                        <div class="i-info">
                            <span>文章</span>
                            <span>{{item.user_nickname}}</span>
                        </div>
                        <div class="i-name">
                            <span>{{item.title}}</span>
                        </div>
                        <div class="i-do">
                            <div class="d-btns">
                                <div class="b-item">
                                    <i class="iconfont icon-like"></i>
                                    <span>{{item.praise_count}}</span>
                                </div>
                                <div class="b-item">
                                    <i class="iconfont icon-pinglun"></i>
                                    <span>{{item.comment_count}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="l-item" @click="nav('/book/' + item.id)" :key="key" v-else>
                        <div class="i-info">
                            <span>专题</span>
                            <span>{{item.user_nickname}}</span>
                        </div>
                        <div class="i-name">
                            <span>{{item.title}}</span>
                        </div>
                        <div class="i-do">
                            <div class="d-btns">
                                <div class="b-item">
                                    <i class="iconfont icon-like"></i>
                                    <span>{{item.praise_count}}</span>
                                </div>
                                <div class="b-item">
                                    <i class="iconfont icon-pinglun"></i>
                                    <span>{{item.comment_count}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <div class="r-more">
            <div class="m-wrap" @click="doGet">
                <span v-if="recommend.more">查看更多文章</span>
                <span v-else>暂无更多文章</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        recommend: {
            default() {
                return {
                    more: true,
                    list: []
                }
            }
        }
    },
    methods: {
        doGet() {
            this.$emit('do-get')
        }
    }
}
</script>


<style lang="less">
.specific-recommend {
    margin-top: 30px;
    background: white;
    .r-content {
        .c-title {
            display: flex;
            align-items: center;
            height: 50px;
            padding: 0 20px;
            border-bottom: 1px solid rgba(178, 186, 194, 0.15);
            span {
                font-size: 14px;
                font-weight: 600;
                color: #909090;
            }
        }
        .c-list {
            .l-item {
                padding: 15px 20px;
                .i-info {
                    display: flex;
                    align-items: center;
                    span {
                        position: relative;
                        font-size: 14px;
                        &:nth-child(1) {
                            color: #007fff;
                        }
                        &:not(:first-child) {
                            padding-left: 20px;
                            color: #b2bac2;
                            &::before {
                                position: absolute;
                                content: "/";
                                top: 50%;
                                transform: translateY(-50%);
                                left: 10px;
                            }
                        }
                    }
                }
                .i-name {
                    padding: 10px 0 15px 0;
                    span {
                        font-size: 16px;
                        font-weight: 600;
                        color: #333;
                    }
                }
                .i-do {
                    display: flex;
                    align-items: center;
                    .d-btns {
                        display: flex;
                        align-items: center;
                        border: 1px solid #f4f5f5;
                        .b-item {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 55px;
                            height: 24px;
                            i {
                                font-size: 16px;
                            }
                            &:last-child {
                                border-left: 1px solid #f4f5f5;
                            }
                        }
                    }
                }
                &:hover {
                    cursor: pointer;
                    background-color: rgba(0, 0, 0, 0.01);
                    .i-name {
                        text-decoration: underline;
                    }
                }
            }
        }
    }
    .r-more {
        padding: 30px;
        .m-wrap {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 30px;
            background: #f4f5f6;
            &:hover {
                cursor: pointer;
            }
        }
    }
}
</style>

