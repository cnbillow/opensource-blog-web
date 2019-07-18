<template>
    <div class="page-recommend">
        <div class="r-title">
            <span>相关推荐</span>
        </div>
        <div class="r-list">
            <div class="l-item">
                <div class="i-info">
                    <span>专题</span>
                    <span>kyeteo</span>
                    <span>mysql</span>
                </div>
                <div class="i-name">
                    <span>mysql从入门到精通</span>
                </div>
                <div class="i-do">
                    <div class="d-btns">
                        <div class="b-item">
                            <i class="iconfont icon-like"></i>
                            <span>65</span>
                        </div>
                        <div class="b-item">
                            <i class="iconfont icon-pinglun"></i>
                            <span>15</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less">
.page-recommend {
    margin-top: 30px;
    background: white;
    .r-title {
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
    .r-list {
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
            }
        }
    }
}
</style>

