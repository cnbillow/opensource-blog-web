<template>
    <div class="conments">
        <page-header theme="light"></page-header>
        <user></user>
    </div>
</template>

<script type="text/ecmascript-6">
import user from '~/components/user'
import pageHeader from '~/components/page-header'
export default {
    layout: 'auth',
    data() {
        return {}
    },
    components: {
        user,
        pageHeader
    }
}
</script>
<style lang="less">
</style>
