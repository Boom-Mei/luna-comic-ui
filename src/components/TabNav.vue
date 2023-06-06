<template>
  <div class="tob-nav">
    <!-- <router-link class="box" tag="div" to="./">
      <span class="iconfont icon-xiaofangzi"></span>
      <p>首页</p>
    </router-link>
    <router-link class="box" tag="div" to="/sort">
      <span class="iconfont icon-fenlei"></span>
      <p>分类</p>
    </router-link>
    <router-link class="box" tag="div" to="/bookshelf">
      <span class="iconfont icon-shujia"></span>
      <p>书架</p>
    </router-link>
    <router-link class="box" tag="div" to="/my">
      <span class="iconfont icon-bilibilidonghua"></span>
      <p>我的</p>
    </router-link> -->

    <router-link class="box" tag="div" to="./">
      <div class="image home"></div>
      <p>首页</p>
    </router-link>
    <router-link class="box" tag="div" to="/sort">
      <div class="image sort"></div>
      <p>分类</p>
    </router-link>
    <router-link class="box" tag="div" to="/bookshelf">
      <div class="image book"></div>
      <p>书架</p>
    </router-link>
    <router-link class="box" tag="div" to="/my">
      <div class="image my"></div>
      <p>我的</p>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.tob-nav {
  position: fixed;
  bottom: 0px;
  display: flex;
  align-items: center;
  width: 100%;
  z-index: 8;
  border-top: 1px solid #ccc;
  background-color: #fff;
  min-height: 55px;
  .box {
    flex: 1;
    text-align: center;
    height: 100%;
    color: gray;
    display: flex;
    flex-direction: column;
    align-items: center;
    .image {
      width: 25px;
      height: 25px;
    }
    .home {
      background: url(@/assets/image/nav/home_f.png) no-repeat center / 25px
        25px;
    }

    .sort {
      background: url(@/assets/image/nav/fen_f.png) no-repeat center / 25px 25px;
    }

    .book {
      background: url(@/assets/image/nav/book_f.png) no-repeat center / 25px
        25px;
    }

    .my {
      background: url(@/assets/image/nav/my_f.png) no-repeat center / 25px 25px;
    }

    &.router-link-exact-active {
      // background-color: skyblue;
      color: black;
          .home {
      background: url(@/assets/image/nav/home_t.png) no-repeat center / 25px
        25px;
    }

    .sort {
      background: url(@/assets/image/nav/fen_t.png) no-repeat center / 25px 25px;
    }

    .book {
      background: url(@/assets/image/nav/book_t.png) no-repeat center / 25px
        25px;
    }

    .my {
      background: url(@/assets/image/nav/my_t.png) no-repeat center / 25px 25px;
    }
    }

    img {
      width: 25px;
      height: 25px;
    }
    p {
      font-size: 13px;
    }
    .icon-bilibilidonghua {
      font-size: 28px;
    }
    .icon-xiaofangzi {
      font-size: 28px;
    }
  }
}
</style>