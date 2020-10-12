<template>
  <div id="app">
    <!-- 一级路由插座 -->
    <router-view></router-view>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // margin-bottom: 50px;
  height: 100%;
  width: 100%;
  background-color: #fff;
}
html,
body {
  
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
.auto-img {
  width: 100%;
  // height: auto;
  display: block;
}
.one-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.van-search {
  padding: 0px;
  margin: 5px;
  background-color: #ddd;
}
.van-search__content {
  background-color: #fff;
}
// 顶部导航栏
.topsearchNav {
  background-color: #1989FA;
  .icon-fanhui2,
  .home-t,
  .t {
    text-align: center;
    display: block;
    height: 44px;
    line-height: 44px;
    color: #fff;
  }
  .icon-fanhui2,
  .home-t {
    font-size: 20px;
  }
  .t {
    font-size: 20px;
  }
}
.c-bule {
  color: #1989FA;
}
.search-t {
  background-color: #fff;
}
</style>
