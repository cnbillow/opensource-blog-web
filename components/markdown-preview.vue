<template>
    <div v-html="markdownHtml" class="markdown-preview Light"></div>
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
  props: ['md'],
  computed: {
    markdownHtml () {
      return marked(this.md, {
        sanitize: false
      })
    }
  }
}
</script>

<style lang="less">
@import "../assets/less/markdown/theme";
@import "../assets/less/markdown/light";
@import "../assets/less/markdown/index";
.markdown-preview h2{
    padding: 0;
    padding-bottom: 15px;
    margin:35px 0 10px 0;
    line-height: 1.5;
    border-bottom: 1px solid #ececec;
}
</style>

