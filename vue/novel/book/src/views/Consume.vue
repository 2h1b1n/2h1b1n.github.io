<template>
  <div class="consume">
    <van-row class="topsearchNav">
      <van-col span="3" @click="$router.go(-1)">
        <span class="iconfont icon-fanhui2"></span>
      </van-col>
      <van-col span="18">
        <span class="t">消费记录</span>
      </van-col>
      <van-col span="3" class="clearfix">
        <van-icon class="home-t" name="wap-home" @click="$router.push('/main/bookcity')"/>
      </van-col>
    </van-row>
    <div class="page-costLog-wraper">
      <div class="noData" style>
        <div>
          <div class="ku"></div>
          <p>
            亲，您并未充值过，
            <span class="findBooks">快去找书吧</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/css/consume.less";
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>