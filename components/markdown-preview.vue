<template>
    <div class="markdown-preview">
        <div ref="preview" v-html="markdownHtml" class="markdown-preview Light"></div>
        <div :class="['preview-img',previewImgModal?'active':'']">
            <span class="preview-close iconfont icon-guanbi" @click="previewImgModal=false"></span>
            <img :src="previewImgSrc" :class="[previewImgMode]" alt />
        </div>
    </div>
</template>

<script>
const marked = require('marked')
const highlight = require('highlight.js')

const renderer = new marked.Renderer()
marked.setOptions({
    renderer,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    highlight: function (code) {
        return highlight.highlightAuto(code).value
    }
})
export default {
    data() {
        return {
            previewImgSrc: '',
            previewImgModal: false,
            previewImgMode: ''
        }
    },
    props: ['md'],
    computed: {
        markdownHtml() {
            return marked(this.md, {
                sanitize: false
            })
        }
    },
    methods: {
        addImageClickLintener() {
            this.imgs = this.$refs.preview.querySelectorAll('img')
            for (let i = 0, len = this.imgs.length; i < len; i++) {
                this.imgs[i].onclick = () => {
                    const src = this.imgs[i].getAttribute('src')
                    this.previewImage(src)
                }
            }
        },
        previewImage(src) {
            const img = new Image()
            img.src = src
            img.onload = () => {
                const width = img.naturalWidth
                const height = img.naturalHeight
                if (height / width > 1.4) {
                    this.previewImgMode = 'horizontal'
                } else {
                    this.previewImgMode = 'vertical'
                }
                this.previewImgSrc = src
                this.previewImgModal = true
                console.log(this.previewImgSrc)
            }
        }
    },
    mounted() {
        this.addImageClickLintener()
    }
}
</script>

<style lang="less">
@import "../assets/less/markdown/theme";
@import "../assets/less/markdown/light";
@import "../assets/less/markdown/index";
.markdown-preview h2 {
    padding: 0;
    padding-bottom: 15px;
    margin: 35px 0 10px 0;
    line-height: 1.5;
    border-bottom: 1px solid #ececec;
}
</style>

