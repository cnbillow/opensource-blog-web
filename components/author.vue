<template>
    <div class="author">
        <div class="l-cover"></div>
        <div class="l-outline">
            <div class="o-wrap">
                <div class="w-item">
                    <span class="i-name">访问</span>
                    <span class="i-count">{{user.view_count}}</span>
                </div>
                <div class="w-item">
                    <span class="i-name">文章</span>
                    <span class="i-count">{{user.article_count}}</span>
                </div>
            </div>
        </div>
        <div class="l-content">
            <div class="c-wrap">
                <div class="w-left">
                    <div class="l-profile">
                        <div class="p-avatar">
                            <img :src="user.avatar | avatarCover" alt />
                        </div>
                        <div class="p-name">
                            <span>{{user.nickname}}</span>
                            <i class="iconfont icon-nv"></i>
                        </div>
                        <div class="p-contact">
                            <div class="c-btn">
                                <i class="iconfont icon-tianjia"></i>
                                <span>加好友</span>
                            </div>
                            <div class="c-panel">
                                <div class="p-qr">
                                    <img :src="user.weixin_url | imgCover" alt />
                                </div>
                                <div class="p-text">
                                    <p>{{user.weixin_desc}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="p-what-is-up">
                            <p>个性签名：{{user.what_is_up}}</p>
                        </div>
                        <div class="p-tags">
                            <div class="t-item" :key="key" v-for="(item, key) in user.tag">
                                <i class="iconfont icon-iconset0169"></i>
                                <span>{{item.name}}</span>
                            </div>
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
.author {
    .l-cover {
        height: 380px;
        background: url(https://linknemo-1253378501.picgz.myqcloud.com/linknemo/20190211/5c611c0a5aa7cb73d5630095?imageView2/q/50!)
            center no-repeat;
        background-size: cover;
    }
    .l-outline {
        display: flex;
        justify-content: center;
        border-bottom: 1px solid #e1e8ed;
        .o-wrap {
            display: flex;
            width: 1200px;
            height: 60px;
            box-sizing: border-box;
            padding-left: 300px;
            .w-item {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 0 15px;
                span {
                    color: #555;
                }
                .i-name {
                    font-size: 13px;
                }
                .i-count {
                    font-size: 15px;
                    font-weight: 600;
                }
                &:hover {
                    cursor: pointer;
                    span {
                        color: #ff694e;
                    }
                    &:after {
                        position: absolute;
                        content: "";
                        bottom: 0;
                        width: 100%;
                        height: 3px;
                        background: #ff694e;
                    }
                }
            }
        }
    }
    .l-content {
        display: flex;
        justify-content: center;
        .c-wrap {
            display: flex;
            width: 1200px;
            .w-left {
                flex-basis: 216px;
                flex-shrink: 0;
                .l-profile {
                    position: relative;
                    padding-top: 35px;
                    .p-avatar {
                        position: absolute;
                        top: -184px;
                        left: 0;
                        width: 216px;
                        height: 216px;
                        box-sizing: border-box;
                        border: 8px solid white;
                        border-radius: 8px;
                        overflow: hidden;
                        background: white;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .p-name {
                        display: flex;
                        align-items: center;
                        span {
                            font-size: 21px;
                            font-weight: 600;
                            color: #555;
                        }
                        i {
                            padding-left: 20px;
                            color: #ff694e;
                        }
                    }
                    .p-contact {
                        position: relative;
                        display: flex;
                        align-items: center;
                        margin-top: 15px;
                        .c-btn {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            flex: 1;
                            height: 34px;
                            background: #ff694e;
                            i {
                                color: white;
                            }
                            span {
                                color: white;
                            }
                            &:hover {
                                cursor: pointer;
                            }
                        }
                        .c-panel {
                            position: absolute;
                            right: -250px;
                            top: 50%;
                            transform: translateY(-50%);
                            width: 230px;
                            align-items: center;
                            background: #333;
                            z-index: 2000;
                            display: none;
                            .p-qr {
                                width: 200px;
                                flex-basis: 200px;
                                padding-top: 15px;
                                img {
                                    display: inline-block;
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            .p-text {
                                padding: 15px 0;
                                p {
                                    color: white;
                                }
                            }
                            &::after {
                                position: absolute;
                                content: "";
                                left: -20px;
                                top: 50%;
                                transform: translateY(-50%);
                                width: 0;
                                height: 0;
                                border-width: 10px;
                                border-style: solid;
                                border-color: transparent #333 transparent
                                    transparent;
                            }
                        }
                        &:hover {
                            .c-panel {
                                display: flex;
                                flex-direction: column;
                            }
                        }
                    }
                    .p-what-is-up {
                        margin-top: 15px;
                        p {
                            font-size: 12px;
                            color: #555;
                        }
                    }
                    .p-tags {
                        margin-top: 15px;
                        .t-item {
                            display: flex;
                            align-items: center;
                            i {
                                color: #ff694e;
                            }
                            span {
                                padding-left: 10px;
                                color: #555;
                            }
                        }
                    }
                }
            }
            .w-mid {
                flex: 1;
                flex-shrink: 0;
            }
            .w-right {
                flex-basis: 260px;
                flex-shrink: 0;
            }
        }
    }
}
</style>
