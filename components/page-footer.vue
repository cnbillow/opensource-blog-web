<template>
    <div
        class="page-footer"
        :class="{'page-footer-dark' : theme === 'dark', 'page-footer-light' : theme === 'light'}"
    >
        <i class="iconfont icon-home"></i>
        <p>Copyright © 2015-2019 [kyeteo] All Rights Reserved. EMAIL：2479438290@qq.com</p>
        <p>
            <a href="http://www.beian.miit.gov.cn">粤ICP备18013659号-1</a>
        </p>
    </div>
</template>

<script>
export default {
    props: {
        theme: {
            default: 'dark'
        }
    },
}
</script>


<style lang="less" scoped>
.page-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p {
        margin: 0;
    }
    &-dark {
        height: 90px;
        background: #333;
        i {
            display: none;
        }
        p {
            color: #a5a4a4;
            a {
                color: #a5a4a4;
            }
        }
    }
    &-light {
        height: 200px;
        background: white;
        i {
            font-size: 20px;
            padding-bottom: 20px;
            color: #555;
            &:hover{
                cursor: pointer;
            }
        }
        p {
            color: #555;
            a {
                color: #555;
            }
        }
    }
}
</style>
