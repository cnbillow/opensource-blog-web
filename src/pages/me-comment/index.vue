<template>
    <div class="editor">
        <white-header></white-header>
        <me-layout>
        </me-layout>
    </div>
</template>

<script type="text/ecmascript-6">
    import whiteHeader from '@/components/white-header'
    import meLayout from '@/components/me-layout'
    export default {
        data () {
            return {}
        },
        components: {
            whiteHeader,
            meLayout
        }
    }
</script>
<style lang="less">
    @import 'index';
</style>
