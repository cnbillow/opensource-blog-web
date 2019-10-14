<template>
    <div class="google-ad">
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <!-- PC/首页/右侧 -->
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-1051265394774958"
             :data-ad-slot="sn"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
    </div>
</template>

<script>
    export default {
        props: {
            sn: {
                required: true
            }
        }
    }
</script>

<style lang="less">
    .google-ad{
        width:100%;
        height: auto;
    }
</style>
