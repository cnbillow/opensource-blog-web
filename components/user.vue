<template>
    <article class="user">
        <div class="l-article">
            <div class="a-side">
                <div class="s-menu">
                    <div class="m-item" @click="rep('/user/post')" :style="{color: $route.path === '/user/post' ? '#FF694E' : ''}">
                        <i class="iconfont icon-xiezi"></i>
                        <span>发文章</span>
                    </div>
                    <div class="m-item" @click="rep('/user/articles')" :style="{color: $route.path === '/user/articles' ? '#FF694E' : ''}">
                        <i class="iconfont icon-neirong"></i>
                        <span>内容管理</span>
                    </div>
                    <div class="m-item"  @click="rep('/user/comments')" :style="{color: $route.path === '/user/comments' ? '#FF694E' : ''}">
                        <i class="iconfont icon-pinglun"></i>
                        <span>评论管理</span>
                    </div>
                </div>
            </div>
            <div class="a-main">
                <slot></slot>
            </div>
        </div>
    </article>
</template>

<script type="text/ecmascript-6">
export default {
}
</script>
<style lang="less">
.user{
  position: absolute;
  top:0;
  bottom:0;
  width:100%;
  display: flex;
  justify-content: center;
  background-color: #f6f6f6;
  .l-article{
    display: flex;
    justify-content: space-between;
    width:1200px;
    padding-top: 70px;
    .a-side{
      flex-basis: 15%;
      flex-shrink: 0;
      .s-menu{
        background: white;
        .m-item{
          display: flex;
          align-items: center;
          height: 42px;
          box-sizing: border-box;
          padding-left: 45px;
          color:#666;
          span{
            padding-left: 10px;
          }
          &:hover{
            cursor: pointer;
            color:#FF694E;
          }
        }
      }
    }
    .a-main{
      flex-basis: 83%;
      flex-shrink: 0;
    }
  }
}

</style>
