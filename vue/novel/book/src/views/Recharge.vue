<template>
  <div class="recharge">
    <van-row class="topsearchNav">
      <van-col span="3" @click="$router.go(-1)">
        <span class="iconfont icon-fanhui2"></span>
      </van-col>
      <van-col span="18">
        <span class="t">充值记录</span>
      </van-col>
      <van-col span="3" class="clearfix">
        <van-icon class="home-t" name="wap-home" @click="$router.push('/main/bookcity')"/>
      </van-col>
    </van-row>
    <div class="page-payLog-wraper">
      <div class="payLog-list">
        <div class="li">
          <div class="weixin"></div>
          <div class="right">
            <div class="price">0.1元</div>
            <div class="time">2周前</div>
          </div>
          <div class="status">充值失败</div>
        </div>
        <div class="show-more">没有更多充值记录</div>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/css/recharge.less";
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>