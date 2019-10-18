<template>
    <div class="author">
        <div class="l-cover" :style="{backgroundImage: userCover}"></div>
        <div class="l-outline">
            <div class="o-wrap">
                <div class="w-item">
                    <span class="i-name">文章</span>
                    <span class="i-count">14</span>
                </div>
                <div class="w-item">
                    <span class="i-name">专题</span>
                    <span class="i-count">1</span>
                </div>
            </div>
        </div>
        <div class="l-content">
            <div class="c-wrap">
                <div class="w-left">
                    <div class="l-default">
                        <div class="d-author">
                            <div class="a-top">
                                <div class="t-avatar" @click="nav('/author/' + user.id)">
                                    <img :src="user.avatar | avatarCover" alt />
                                </div>
                            </div>
                            <div class="a-bottom">
                                <div class="b-name">
                                    <span>{{user.nickname}}</span>
                                    <i class="iconfont icon-nv"></i>
                                </div>
                                <div class="b-favo">
                                    <div class="f-item">
                                        <div class="i-left">
                                            <i class="iconfont icon-gongwenbao"></i>
                                        </div>
                                        <div class="i-right">
                                            <span
                                                :key="key"
                                                v-for="(item, key) in user.tag"
                                            >{{item.name}}</span>
                                        </div>
                                    </div>
                                    <div class="f-item">
                                        <div class="i-left">
                                            <i class="iconfont icon-mingpian"></i>
                                        </div>
                                        <div class="i-right">
                                            <span>{{user.saying_text}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="b-contact">
                                    <div class="c-item">
                                        <i class="iconfont icon-github"></i>
                                    </div>
                                    <div class="c-item">
                                        <Tooltip placement="right" theme="light">
                                            <i class="iconfont icon-weixin"></i>
                                            <div class="weixin-content" slot="content">
                                                <img :src="user.weixin_url | imgCover" alt="">
                                                <p>{{user.weixin_desc}}</p>
                                            </div>
                                        </Tooltip>
                                    </div>
                                </div>
                                <div class="b-focus">
                                    <span>关注</span>
                                </div>
                            </div>
                        </div>
                        <div class="d-works">
                            <div class="w-tab">
                                <div
                                    class="t-item"
                                    :class="{'t-item-active': workType === 1}"
                                    @click="workType = 1"
                                >
                                    <span>文章</span>
                                </div>
                                <div
                                    class="t-item"
                                    :class="{'t-item-active': workType === 2}"
                                    @click="workType = 2"
                                >
                                    <span>专题</span>
                                </div>
                            </div>
                            <div class="w-list w-list-article" v-if="workType === 1">
                                <div
                                    class="a-item"
                                    :key="key"
                                    v-for="(item, key) in userHotArticles"
                                >
                                    <a :href="'/article/' + item.id">
                                        <div class="i-name">
                                            <a :href="'/article/' + item.id">{{item.title}}</a>
                                        </div>
                                        <div class="i-stati">
                                            <div class="s-item">
                                                <i class="iconfont icon-like"></i>
                                                <span>{{item.praise_count}}</span>
                                            </div>
                                            <div class="s-item">
                                                <i class="iconfont icon-pinglun"></i>
                                                <span>{{item.comment_count}}</span>
                                            </div>
                                        </div>
                                        <div class="i-icon">
                                            <i
                                                class="iconfont"
                                                :class="{'icon-first': key === 0, 'icon-second': key === 1, 'icon-third': key === 2}"
                                                v-if="key < 3"
                                            ></i>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div class="w-list w-list-book" v-else>
                                <div
                                    class="b-item"
                                    :key="key"
                                    v-for="(item, key) in userHotBooks"
                                >
                                    <a :href="'/book/' + item.id">
                                        <div class="i-cover">
                                            <img :src="item.cover | imgCover" alt />
                                        </div>
                                        <div class="i-text">
                                            <div class="t-name">
                                                <a :href="'/book/' + item.id">{{item.title}}</a>
                                            </div>
                                            <div class="t-author">
                                                <span>{{item.user.nickname}}</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="l-slot">
                        <slot name="left"></slot>
                    </div>
                </div>
                <div class="w-mid">
                    <slot></slot>
                </div>
                <div class="w-right">
                    <div class="r-default">
                        <div class="d-section d-section-most">
                            <div class="s-title">
                                <i class="iconfont icon-paixingbang"></i>
                                <span>点击排行榜</span>
                            </div>
                            <div class="s-list">
                                <div
                                    class="l-item"
                                    :key="key"
                                    @click="nav('/article/' + item.id)"
                                    v-for="(item, key) in mostViewArticles"
                                >
                                    <a :href="'/article/' + item.id">
                                        <div class="i-cover">
                                            <img :src="item.cover | imgCover" alt />
                                        </div>
                                        <div class="i-text">
                                            <a :href="'/article/' + item.id">{{item.title}}</a>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="d-section d-section-service">
                            <div class="s-title">
                                <i class="iconfont icon-xuanchuantuiguang"></i>
                                <span>热门服务</span>
                            </div>
                            <div class="s-list">
                                <div
                                    class="l-item"
                                    :key="key"
                                    @click="openUrl(item.url)"
                                    v-for="(item, key) in promotes"
                                >
                                    <div class="i-cover">
                                        <img :src="item.cover | imgCover" alt />
                                    </div>
                                    <div class="i-name">
                                        <p>{{item.name}}</p>
                                    </div>
                                    <div class="i-desc">
                                        <p>{{item.desc}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="r-slot">
                        <slot name="right"></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            workType: 1
        }
    },
    props: ['user', 'mostViewArticles', 'promotes', 'userHotArticles', 'userHotBooks'],
    computed: {
        userCover () {
            if (!this.user.cover) {
                return false
            }
            return `url(${process.env.QINIU_BASE_URL + this.user.cover})`
        }
    }
}
</script>

<style lang="less">
@-webkit-keyframes rotate-infinite {
    0% {
        transform: rotate(0deg);
    }

    25% {
        transform: rotate(90deg);
    }

    50% {
        transform: rotate(180deg);
    }

    75% {
        transform: rotate(270deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
.author {
    .l-cover {
        height: 380px;
        background: url(//cdn.kyeteo.cn/FpMZM0QyNdUTjBB1PI7kDoNYLpRs)
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
                        color: #007fff;
                    }
                    &:after {
                        position: absolute;
                        content: "";
                        bottom: 0;
                        width: 100%;
                        height: 3px;
                        background: #007fff;
                    }
                }
            }
        }
    }
    .l-content {
        display: flex;
        justify-content: center;
        background: #f4f5f5;
        .c-wrap {
            display: flex;
            width: 1200px;
            .w-left {
                flex-basis: 216px;
                flex-shrink: 0;
                .l-default {
                    position: relative;
                    padding-top: 259px;
                    .d-author {
                        position: absolute;
                        top: -150px;
                        left: 0;
                        width: 100%;
                        background: white;
                        .a-top {
                            .t-avatar {
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                height: 150px;
                                box-sizing: border-box;
                                border-bottom: 1px solid #e1e8ed;
                                img {
                                    width: 100px;
                                    height: 100px;
                                    border-radius: 50px;
                                }
                                &:hover {
                                    cursor: pointer;
                                    img {
                                        animation: rotate-infinite 0.8s linear
                                            infinite;
                                    }
                                }
                            }
                        }
                        .a-bottom {
                            padding: 16px 16px 30px 16px;
                            .b-name {
                                display: flex;
                                align-items: center;
                                span {
                                    font-size: 26px;
                                    font-weight: 600;
                                    color: #333;
                                }
                                i {
                                    padding-left: 10px;
                                }
                            }
                            .b-favo {
                                .f-item {
                                    display: flex;
                                    align-items: center;
                                    .i-left {
                                        padding-right: 10px;
                                        i {
                                            font-size: 20px;
                                        }
                                    }
                                    .i-right {
                                        span {
                                            &:not(:first-child) {
                                                position: relative;
                                                padding-left: 20px;
                                                &:before {
                                                    position: absolute;
                                                    content: "";
                                                    left: 10px;
                                                    top: 50%;
                                                    transform: translateY(-50%);
                                                    width: 2px;
                                                    height: 10px;
                                                    background: #f4f5f5;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            .b-contact {
                                display: flex;
                                align-items: center;
                                padding: 10px 0;
                                .c-item {
                                    i {
                                        font-size: 20px;
                                    }
                                    &:not(:first-child) {
                                        padding-left: 10px;
                                    }
                                    &:hover{
                                        cursor: pointer;
                                    }
                                }
                            }
                            .b-focus {
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                flex: 1;
                                height: 34px;
                                box-sizing: border-box;
                                border: 1px solid #6cbd45;
                                i {
                                    color: #6cbd45;
                                }
                                span {
                                    color: #6cbd45;
                                }
                                &:hover {
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                    .d-works {
                        background: white;
                        .w-tab {
                            display: flex;
                            height: 42px;
                            box-sizing: border-box;
                            border-bottom: 1px solid #ecf0f3;
                            .t-item {
                                display: flex;
                                align-items: center;
                                padding: 0 20px;
                                font-size: 16px;
                                span {
                                    color: #333;
                                }
                                &-active {
                                    border-bottom: 2px solid #007fff;
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
                        .w-list {
                            &-article {
                                .a-item {
                                    position: relative;
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: center;
                                    height: 70px;
                                    padding: 0 40px 0 16px;
                                    .i-name {
                                        display: flex;
                                        align-items: center;
                                        width: 150px;
                                        a {
                                            display: inline-block;
                                            width: 100%;
                                            white-space: nowrap;
                                            overflow: hidden;
                                            text-overflow: ellipsis;
                                            font-size: 14px;
                                            color:#515a6e;
                                        }
                                    }
                                    .i-stati {
                                        display: flex;
                                        align-items: center;
                                        .s-item {
                                            display: flex;
                                            align-items: center;
                                            color: #b2bac2;
                                            &:not(:first-child) {
                                                padding-left: 20px;
                                            }
                                        }
                                    }
                                    .i-icon {
                                        position: absolute;
                                        top: 50%;
                                        transform: translateY(-50%);
                                        right: 16px;
                                        i {
                                            font-size: 20px;
                                            color:#515a6e;
                                        }
                                    }
                                    &:hover {
                                        cursor: pointer;
                                        background-color: rgba(0, 0, 0, 0.01);
                                    }
                                }
                            }
                            &-book {
                                .b-item {
                                    a{
                                    display: flex;
                                    padding: 20px 10px;
                                        .i-cover {
                                            flex-basis: 52px;
                                            height: 72px;
                                            img {
                                                width: 100%;
                                                height: 100%;
                                            }
                                        }
                                        .i-text {
                                            padding-left: 10px;
                                            .t-name {
                                                a {
                                                    padding: 0;
                                                    font-size: 14px;
                                                    color:#515a6e;
                                                }
                                            }
                                            .t-author {
                                                display: flex;
                                                align-items: center;
                                                span {
                                                    position: relative;
                                                    color: #fc4544;
                                                }
                                            }
                                        }
                                    }
                                    &:hover {
                                        cursor: pointer;
                                        background-color: rgba(0, 0, 0, 0.01);
                                    }
                                }
                            }
                        }
                    }
                }
                .l-slot {
                    padding-top: 30px;
                }
            }
            .w-mid {
                flex:1;
                width: 0;
                min-height: 1000px;
                padding: 30px;
            }
            .w-right {
                flex-basis: 260px;
                flex-shrink: 0;
                padding-top: 30px;
                .r-default {
                    .d-section {
                        background: white;
                        .s-title {
                            display: flex;
                            align-items: center;
                            height: 42px;
                            padding: 0 16px;
                            border-bottom: 1px solid #f4f5f5;
                            color: rgb(91, 95, 109);
                            span {
                                padding-left: 10px;
                                font-size: 14px;
                                font-weight: bold;
                                color: #31445b;
                            }
                        }
                        .s-list {
                            padding: 16px;
                        }
                        &-most {
                            .s-list {
                                .l-item {
                                    a{
                                    display: flex;
                                    align-items: center;
                                        .i-cover {
                                            flex-basis: 48px;
                                            height: 48px;
                                            img {
                                                width: 100%;
                                                height: 100%;
                                            }
                                        }
                                        .i-text {
                                            flex: 1;
                                            align-items: center;
                                            padding-left: 10px;
                                            a {
                                                margin: 0;
                                                line-height: 20px;
                                                font-size: 14px;
                                                color:#515a6e;
                                            }
                                        }
                                    }
                                    &:not(:first-child) {
                                        margin-top: 10px;
                                    }
                                    &:hover {
                                        cursor: pointer;
                                    }
                                }
                            }
                        }
                        &-service {
                            .s-list {
                                .l-item {
                                    .i-cover {
                                        width: 100%;
                                        height: 90px;
                                        img {
                                            width: 100%;
                                            height: 100%;
                                        }
                                    }
                                    .i-name {
                                        padding: 5px 0;
                                        font-size: 16px;
                                        font-weight: 600;
                                        color: #373d41;
                                    }
                                    &:hover {
                                        cursor: pointer;
                                    }
                                    &:not(:first-child) {
                                        padding-top: 20px;
                                    }
                                }
                            }
                        }
                        &:not(:first-child) {
                            margin-top: 20px;
                        }
                    }
                }
                .r-slot {
                    padding-top: 30px;
                }
            }
        }
    }
}
.weixin-content{
    img{
        width:150px;
        height: 150px;
    }
    p{
        padding: 10px 0;
        text-align: center;
    }
}
</style>
