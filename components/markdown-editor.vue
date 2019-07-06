<template lang="html">
  <div
  :class="isFullscreen?'markdown fullscreen':'markdown' "
  ref="markdown">
    <!-- 头部工具栏 -->
    <ul class="markdown-toolbars">
      <li><slot name="title"/></li>
      <li v-if="tools.strong" name="粗体">
        <span @click="insertStrong" class="iconfont icon-jiacu"></span>
      </li>
      <li v-if="tools.italic" name="斜体">
        <span @click="insertItalic" class="iconfont icon-zitixieti"></span>
      </li>
      <li v-if="tools.overline" name="删除线">
        <span @click="insertOverline" class="iconfont icon-zitishanchuxian"></span>
      </li>
      <li v-if="tools.h1" name="标题1">
        <span @click="insertTitle(1)" class="iconfont icon-h1"></span>
      </li>
      <li v-if="tools.h2" name="标题2">
        <span @click="insertTitle(2)" class="iconfont icon-h2"></span>
      </li>
      <li v-if="tools.h3" name="标题3">
        <span @click="insertTitle(3)" class="iconfont icon-h3"></span>
      </li>
      <li v-if="tools.hr" name="分割线">
        <span @click="insertLine" class="iconfont icon-fengexian"></span>
      </li>
      <li v-if="tools.quote" name="引用">
        <span @click="insertQuote" class="iconfont icon-yinyong"></span>
      </li>
      <li v-if="tools.ul" name="无序列表">
        <span @click="insertUl" class="iconfont icon-richtextbulletedlist"></span>
      </li>
      <li v-if="tools.ol" name="有序列表">
        <span @click="insertOl" class="iconfont icon-youxuliebiao"></span>
      </li>
      <li v-if="tools.code" name="代码块">
        <span @click="insertCode" class="iconfont icon-daima"></span>
      </li>
      <li v-if="tools.notChecked" name="未完成列表">
        <span @click="insertNotFinished" class="iconfont icon-weixuanzhongkuang"></span>
      </li>
      <li v-if="tools.checked" name="已完成列表">
        <span @click="insertFinished" class="iconfont icon-xuanzhong"></span>
      </li>
      <li v-if="tools.link" name="链接">
        <span @click="insertLink" class="iconfont icon-lianjie1"></span>
      </li>
      <li v-if="tools.image" name="图片">
        <span @click="insertImage" class="iconfont icon-ic_image"></span>
      </li>
      <li v-if="tools.table" name="表格">
        <span @click="insertTable" class="iconfont icon-biaodanzujian-biaoge"></span>
      </li>
      <li v-if="tools.shift&&preview==2" name="全屏编辑">
        <span @click="preview=3" class="iconfont icon-screenpingmu"></span>
      </li>
      <li v-if="tools.shift&&preview==3" name="分屏显示">
        <span @click="preview=1" class="iconfont icon-fenli"></span>
      </li>
      <li v-if="tools.shift&&preview==1" name="预览">
        <span @click="preview=2" class="iconfont icon-yulan"></span>
      </li>
      <li class="empty"></li>

      <li v-if="tools.fullscreen&&!isFullscreen" name="全屏">
        <span @click="isFullscreen=!isFullscreen" class="iconfont icon-quanping"></span>
      </li>
      <li v-if="tools.fullscreen&&isFullscreen" name="退出全屏">
        <span @click="isFullscreen=!isFullscreen" class="iconfont icon-zuixiaohua"></span>
      </li>
    </ul>
    <!-- 编辑器 -->
    <div class="markdown-content" :style="{background:preview==2?'#fff':''}">
      <div v-show="preview===1||preview===3" class="markdown-editor" ref="markdownContent">
        <ul class="index" ref="index" :style="{height:scrollHeight?`${scrollHeight}px`:'100%'}">
          <li :key="index" v-for="(item,index) in indexLenth">{{index+1}}</li>
        </ul>
        <textarea
          v-model="value"
          @keydown.tab="tab"
          @keyup.enter="enter"
          @keyup.delete="onDelete"
          ref="textarea"
          :style="{height:scrollHeight?`${scrollHeight}px`:'100%'}"
        ></textarea>
      </div>
      <div v-show="preview==1" class="empty" style="width:12px"></div>
      <div
        v-show="preview===1||preview===2"
        class="markdown-preview OneDark"
        ref="preview">
        <div  v-html="html"
              ref="previewInner" ></div>
      </div>
    </div>
<!--    预览图片-->
    <div :class="['preview-img',previewImgModal?'active':'']">
      <span class="preview-close iconfont icon-guanbi" @click="previewImgModal=false"></span>
      <img :src="previewImgSrc" :class="[previewImgMode]" alt="">
    </div>
  </div>
</template>

<script>
var marked = require('marked')
var highlight = require('highlight.js')
import * as qiniu from 'qiniu-js'
import apiQiniu from '~/api/qiniu'

const defaultTools = {
  strong: true,
  italic: true,
  overline: true,
  h1: true,
  h2: true,
  h3: true,
  h4: false,
  h5: false,
  h6: false,
  hr: true,
  quote: true,
  ul: true,
  ol: true,
  code: true,
  link: true,
  image: true,
  table: true,
  checked: true,
  notChecked: true,
  shift: true,
  fullscreen: true,
  print: false
}

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
  name: 'markdown',
  props: {
    md: {
      type: String,
      default: ''
    }, // 初始化内容
    width: {
      // 初始化宽度
      type: [Number, String],
      default: 'auto'
    },
    height: {
      // 初始化高度
      type: Number,
      default: 600
    }, // 宽度
    toolbars: {
      // 工具栏
      type: Object,
      default () {
        return {}
      }
    },
    interval: {
      // 自动保存间隔 mm
      type: Number,
      default: 100000
    }
  },
  data () {
    return {
      value: '', // 输入框内容
      timeoutId: null,
      indexLenth: 24,
      html: '',
      preview: 1, // 是否是预览状态
      isFullscreen: false, // 是否是全屏
      scrollHeight: null,
      lastInsert: '',
      timerId: null, // 定时器id
      imgs: [],
      previewImgModal: false,
      previewImgSrc: '',
      previewImgMode: ''
    }
  },
  computed: {
    tools () {
      const { toolbars = {} } = this
      return {
        ...defaultTools,
        ...toolbars
      }
    }
  },
  mounted () {
    this.init()
    setTimeout(() => {
      const textarea = this.$refs.textarea
      textarea.focus()
    }, 20)
  },
  methods: {
    init () {
      this.value = this.md
    },
    insertContent (initStr) {
      // 插入文本
      const { preview } = this
      if (preview === 2) {
        return
      }
      this.lastInsert = initStr
      const point = this.getCursortPosition()
      const lastChart = this.value.substring(point - 1, point)
      const lastFourCharts = this.value ? this.value.substring(point - 4, point) : ''
      if (
        lastChart !== '\n' &&
                this.value !== '' &&
                lastFourCharts !== '    '
      ) {
        const str = '\n' + initStr
        this.insertAfterText(str)
      } else {
        this.insertAfterText(initStr)
      }
    },
    getCursortPosition () {
      // 获取光标位置
      const textDom = this.$refs.textarea
      let cursorPos = 0
      if (document.selection) {
        textDom.focus()
        let selectRange = document.selection.createRange()
        selectRange.moveStart('character', -this.value.length)
        cursorPos = selectRange.text.length
      } else if (
        textDom.selectionStart ||
                parseInt(textDom.selectionStart, 0) === 0
      ) {
        cursorPos = textDom.selectionStart
      }
      return cursorPos
    },
    insertAfterText (value) {
      // 插入文本
      const textDom = this.$refs.textarea
      let selectRange
      if (document.selection) {
        textDom.focus()
        selectRange = document.selection.createRange()
        selectRange.text = value
        textDom.focus()
      } else if (
        textDom.selectionStart ||
                parseInt(textDom.selectionStart, 0) === 0
      ) {
        const startPos = textDom.selectionStart
        const endPos = textDom.selectionEnd
        const scrollTop = textDom.scrollTop
        textDom.value =
                    textDom.value.substring(0, startPos) +
                    value +
                    textDom.value.substring(endPos, textDom.value.length)
        textDom.focus()
        textDom.selectionStart = startPos + value.length
        textDom.selectionEnd = startPos + value.length
        textDom.scrollTop = scrollTop
      } else {
        textDom.value += value
        textDom.focus()
      }
      this.$set(this, 'value', textDom.value)
    },
    setCaretPosition (position) {
      // 设置光标位置
      const textDom = this.$refs.textarea
      if (textDom.setSelectionRange) {
        textDom.focus()
        textDom.setSelectionRange(position, position)
      } else if (textDom.createTextRange) {
        let range = textDom.createTextRange()
        range.collapse(true)
        range.moveEnd('character', position)
        range.moveStart('character', position)
        range.select()
      }
    },
    insertQuote () {
      // 引用
      this.insertContent('\n>  ')
    },
    insertUl () {
      // 无需列表
      this.insertContent('-  ')
    },
    insertOl () {
      // 有序列表
      this.insertContent('1. ')
    },
    insertFinished () {
      // 已完成列表
      this.insertContent('- [x]  ')
    },
    insertNotFinished () {
      // 未完成列表
      this.insertContent('- [ ]  ')
    },
    insertLink () {
      // 插入链接
      const self = this
      let name = ''
      let url = ''
      this.$Modal.confirm({
        title: '请输入链接',
        render: (h) => {
          return h('div', [
            h('Input', {
              props: {
                value: '',
                autofocus: true,
                placeholder: '请输入链接名'
              },
              on: {
                input: (val) => {
                  console.log(val)
                  name = val
                }
              }
            }, [
              h('span', {
                slot: 'prepend'
              }, '名称')
            ]),
            h('Input', {
              style: {
                paddingTop: '20px'
              },
              props: {
                value: '',
                autofocus: true,
                placeholder: '请输入链接URL'
              },
              on: {
                input: (val) => {
                  url = val
                }
              }
            }, [
              h('span', {
                slot: 'prepend'
              }, 'https://')
            ])
          ])
        },
        onOk: () => {
          self.insertContent('\n[' + name + '](//' + url + ')')
        }
      })
    },
    insertImage () {
      // 插入图片
      const self = this
      var pom = document.createElement('input')
      pom.setAttribute('type', 'file')
      pom.addEventListener('change', function (e) {
        apiQiniu.token({axios: self.$axios}).then(res => {
          if (res.done) {
            const config = {
              useCdnDomain: false,
              region: null
            }
            const putExtra = {
              fname: '',
              params: {},
              mimeType: null
            }
            const observable = qiniu.upload(
              e.path[0].files[0],
              null,
              res.data,
              putExtra,
              config
            )
            observable.subscribe({
              complete (res1) {
                self.insertContent('\n![image](' + process.env.QINIU_BASE_URL + res1.key + ')')
              }
            })
          }
        })
      })
      pom.style.display = 'none'
      if (document.createEvent) {
        const event = document.createEvent('MouseEvents')
        event.initEvent('click', true, true)
        pom.dispatchEvent(event)
      } else {
        pom.click()
      }
    },
    insertTable () {
      // 插入表格
      this.insertContent(
        '\nheader 1 | header 2\n---|---\nrow 1 col 1 | row 1 col 2\nrow 2 col 1 | row 2 col 2\n\n'
      )
    },
    insertCode () {
      // 插入code
      const point = this.getCursortPosition()
      const lastChart = this.value.substring(point - 1, point)
      this.insertContent('\n```\n\n```')
      if (lastChart !== '\n' && this.value !== '') {
        this.setCaretPosition(point + 5)
      } else {
        this.setCaretPosition(point + 5)
      }
    },
    insertStrong () {
      // 粗体
      const point = this.getCursortPosition()
      const lastChart = this.value.substring(point - 1, point)
      this.insertContent('****')
      if (lastChart !== '\n' && this.value !== '') {
        this.setCaretPosition(point + 2)
      } else {
        this.setCaretPosition(point + 2)
      }
    },
    insertItalic () {
      // 斜体
      const point = this.getCursortPosition()
      const lastChart = this.value.substring(point - 1, point)
      this.insertContent('**')
      if (lastChart !== '\n' && this.value !== '') {
        this.setCaretPosition(point + 1)
      } else {
        this.setCaretPosition(point + 1)
      }
    },
    insertOverline () {
      // overline
      const point = this.getCursortPosition()
      const lastChart = this.value.substring(point - 1, point)
      this.insertContent('~~~~')
      if (lastChart !== '\n' && this.value !== '') {
        this.setCaretPosition(point + 2)
      } else {
        this.setCaretPosition(point + 2)
      }
    },
    insertTitle (level) {
      // 插入标题
      const titleLevel = {
        1: '#  ',
        2: '##  ',
        3: '###  '
      }
      this.insertContent(titleLevel[level])
    },
    tab (e) {
      // 屏蔽teatarea tab默认事件
      this.insertContent('    ', this)
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        e.returnValue = false
      }
    },
    save () {
      // 保存操作
      const { value } = this
      return value
    },
    insertLine () {
      // 插入分割线
      this.insertContent('\n----\n')
    },
    toggleSlideDown () {
      // 显示主题选项
      this.slideDown = !this.slideDown
    },
    enter () {
      // 回车事件
      const { lastInsert } = this
      const list = ['-  ', '1. ', '- [ ]  ', '- [x]  ']
      if (list.includes(lastInsert)) {
        this.insertContent(lastInsert)
      }
    },
    onDelete () {
      // 删除时,以回车为界分割，如果数组最后一个元素为''时，将行一次插入的共嗯那个置为空，避免回车时再次插入
      if (!this.value) {
        return
      }
      const lines = this.value.split('\n')
      if (lines[lines.length - 1] === '') {
        this.lastInsert = ''
      }
    },
    addImageClickLintener () {
      // 监听查看大图
      const { imgs } = this
      if (imgs.length > 0) {
        for (let i = 0, len = imgs.length; i < len; i++) {
          imgs[i].onclick = null
        }
      }
      setTimeout(() => {
        this.imgs = this.$refs.preview.querySelectorAll('img')
        for (let i = 0, len = this.imgs.length; i < len; i++) {
          this.imgs[i].onclick = () => {
            const src = this.imgs[i].getAttribute('src')
            this.previewImage(src)
          }
        }
      }, 600)
    },
    previewImage (src) {
      // 预览图片
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
      }
    }
  },
  watch: {
    md () {
      this.value = this.md
    },
    value () {
      clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(() => {
        this.html = marked(this.value, {
          sanitize: false
        })
      }, 30)
      this.indexLenth = this.value.split('\n').length
      const height1 = this.indexLenth * 22
      const height2 = this.$refs.textarea.scrollHeight
      const height3 = this.$refs.preview.scrollHeight
      this.scrollHeight = Math.max(height1, height2, height3)
      this.indexLenth = parseInt(this.scrollHeight / 22, 0) - 1
      this.addImageClickLintener()
    }
  },
  destroyed () {
    // 销毁时清除定时器
    clearInterval(this.timerId)
  }
}
</script>

<style lang="less">
@import "../assets/less/markdown/theme";
@import "../assets/less/markdown/light";
@import "../assets/less/markdown/dark";
@import "../assets/less/markdown/one-dark";
@import "../assets/less/markdown/gitHub";
@import "../assets/less/markdown/index";
</style>
