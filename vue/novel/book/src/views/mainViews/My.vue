<template>
  <div class="my">
    <div class="page-user">
      <!-- content -->
      <div class="container">
        <div class="portrait">
          <!-- 账户头像 -->
          <div class="portrait-content">
            <!-- <div class="masking"></div> -->
            <div class="user-info">
              <div v-if="isLogin">
              <div class="account clearfix" >
                <div class="account-img fl">
                  <img class="auto-img" :src="userInfo.userImg" alt />
                </div>
                <div class="account-r fl">
                  <div class="nickname">{{userInfo.nickName}}</div>
                  <div class="text">简介：{{userInfo.desc == '' ? '快留下你的脚印' : userInfo.desc}}</div>
                </div>
              </div>
              </div>
              <div class="login-text" v-else @click="togglePage('Login')">登录</div>
            </div>
          </div>
          <!-- 追书卷、充值 -->
          <div class="money clearfix">
            <div>
              <div class="money_item">
                <p>追书卷</p>
                <p class="money_2">10</p>
                <div class="exchange">兑换</div>
              </div>
              <!-- <div class="line "> </div> -->
              <div class="money_item">
                <p>追书币</p>
                <p class="money_2">10</p>
                <div class="pay">充值</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 列表 -->
      <div class="setting-list">
        <div class="m-list">
          <div class="m-cells" v-for="(item,index) in iconsData" :key="index" @click="togglePage(item.routeName)">
            <div class="m-cell clearfix">
              <img class="myBook fl" :src="item.src" alt />
              <span class="title fl">{{item.title}}</span>
              <img class="arrow-r fr" src="../../assets/icons/arrow-r.png" alt />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "../../assets/css/my.less";
export default {
  data() {
    return {
       //上传文件1MB
      maxSize: 1 * 1024 * 1024,
      iconsData: [
         {
          src: require("../../assets/icons/8.png"),
          title: "账号管理",
           routeName: 'AccountManage'
        },
        {
          src: require("../../assets/icons/1.png"),
          title: "我的书架",
          routeName: 'Bookshelf'
        },
        
        // {
        //   src: require("../../assets/icons/3.png"),
        //   title: "VIP会员",
        //    routeName: ''
        // },
        // {
        //   src: require("../../assets/icons/4.png"),
        //   title: "每日签到",
        //   routeName: 'SignIn'
        // },
        
        {
          src: require("../../assets/icons/6.png"),
          title: "充值记录",
           routeName: 'Recharge'
        },
        {
          src: require("../../assets/icons/7.png"),
          title: "消费记录",
          routeName: 'Consume'
        },
        {
          src: require("../../assets/icons/9.png"),
          title: "安全中心",
          routeName: 'Secure'
        },
      ],

      //用户信息
      userInfo: {},

      isLogin: false
    };
  },
  created(){
     this.getUserInfo();
    
    if (localStorage.getItem('__TK')) {
      this.isLogin = true;
    }
  },
  methods: {
    togglePage(name) {
      if (name === "Login") {
        this.$router.push({ name });
      } else {
        if (!this.isLogin) {
          this.$toast("请先登录");
        } else {
          this.$router.push({ name });
        }
      }
    },
    
    //获取用户信息
    getUserInfo() {
      let tokenString = localStorage.getItem("__TK");
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0
      });

      this.axios({
        method: "GET",
        url: "/findMy",
        params: {
          appkey: this.appkey,
          tokenString
        }
      })
        .then(result => {
          this.$toast.clear();
          

          if (result.data.code == "A001") {
            this.userInfo = result.data.result[0];
          }
        })
        .catch(err => {
          this.$toast.clear();
          
        });
    },
  },
};
</script>
<style lang="less" scoped>
</style>