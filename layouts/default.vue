<template>
  <div class="layout-default"
  :class="{'layout-default-with-tip': app.tipVisible}"
  @click="defaultLayoutClick">
    <nuxt />
    <specific-tip
    :width="tipWith"
    @do-close="closeTip"
    v-if="app.tipVisible"></specific-tip>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
import specificTip from '~/components/specific-tip'
import event from '~/utils/event'
export default {
    computed: {
        ...mapState(['app']),
        tipWith () {
            if (this.$route.path === '/') {
                return 960
            }
            if (this.$route.path.indexOf('/article') >= 0) {
                return 1200
            }
        }
    },
    components: {
        specificTip
    },
    methods: {
        ...mapMutations(['setAppTip']),
        defaultLayoutClick () {
            event.$emit('default-layout-click')
        },
        closeTip () {
            this.setAppTip(false)
        }
    }
}
</script>

<style lang="less">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.layout-default{
    &-with-tip{
        padding-bottom: 128px;
    }
}
</style>
