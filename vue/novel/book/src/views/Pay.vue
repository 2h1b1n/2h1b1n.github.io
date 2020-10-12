<template>
  <div class="myPay">
    <div class="page-pay">
      <van-row class="topsearchNav">
        <van-col span="3" @click="$router.go(-1)">
          <span class="iconfont icon-fanhui2"></span>
        </van-col>
        <van-col span="18">
          <span class="t">充值</span>
        </van-col>
        <van-col span="3" class="clearfix">
          <van-icon class="home-t" name="wap-home" @click="$router.push('/main/bookcity')"/>
        </van-col>
      </van-row>
      <div class="page-pay-list">
        <div class="payList">
          <div class="title">请选择充值方式</div>
          <div class="p-list clearfix" v-for="(pay,index) in payList" :key="index">
            <div class="weixin fl">
              <img class="auto-img" :src="pay.src" alt />
            </div>
            <div class="w-right fl">
              <div class="name">
                {{pay.name}}
                <span class="recommend" v-if="pay.descId"></span>
              </div>
              <div class="desc">{{pay.desc}}</div>
            </div>
            <div class="radio-box fl">
              <van-radio-group v-model="radio">
                <van-radio :name="pay.index"></van-radio>
              </van-radio-group>
            </div>
          </div>
        </div>
        <!-- 充值金额 -->
        <div class="s-value">
          <div class="title">请选择充值金额</div>
            <div class="v-box clearfix">
          <div class="value-box " v-for="(item,index) in valueData" :key="index">
            <p class="price">{{item.price}}元</p>
            <p class="bookfair">{{item.bookfair}}</p>
            <p class="volume">{{item.volume}}</p>
            <p class="gift-bg"></p>
            <p class="gift-value">
              <span>送{{item.value}}%</span>
            </p>
          </div>
          </div>
        </div>
        <!-- 说明 -->
        <div class="explain">
            <p>说明：</p> 
            <p>1、1元 = 100个追书币</p> 
            <p>2、所充值金额暂不支持退款或提现。如充值遇到问题，请关注微信公众号：「zssqnb」，我们会及时为您服务。</p> 
            <p>客服时间：周一至周日00:00-24:00</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/css/pay.less";
export default {
  data() {
    return {
      radio: 1,
      payList: [
        {
          descId: true,
          src: require("../assets/icons/wx.png"),
          name: "微信",
          desc: "推荐安装微信6.0.2及以上版本用户使用",
          index: 1,
        },
        {
          src: require("../assets/icons/zfb.png"),
          name: "支付宝",
          desc: "数亿用户都在用，安全可托付",
          index: 2,
        },
      ],
    //   充值序列
      valueData:[
          {
              price:30,
              bookfair:"3000追书币",
              volume:"+1500追书卷",
              value:30
          },
          {
              price:50,
              bookfair:"3000追书币",
              volume:"+3500追书卷",
              value:70
          },
          {
              price:100,
              bookfair:"3000追书币",
              volume:"+8000追书卷",
              value:80
          },
          {
              price:200,
              bookfair:"3000追书币",
              volume:"+20000追书卷",
              value:100
          },
      ]
    };
  },
};
</script>

<style lang="scss" scoped>
</style>