<template>
    <div class="conments">
        <white-header></white-header>
        <my-layout>
        </my-layout>
    </div>
</template>

<script type="text/ecmascript-6">
    import whiteHeader from '@/components/white-header'
    import myLayout from '@/components/my-layout'
    export default {
        data () {
            return {}
        },
        components: {
            whiteHeader,
            myLayout
        }
    }
</script>
<style lang="less">
    @import 'index';
</style>
