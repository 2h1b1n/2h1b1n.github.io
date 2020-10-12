<template>
  <div class="bookcity">
      <!-- 顶部导航 -->
      <van-row class="topsearchNav">
        <van-col span="12">
          <img class="title-img auto-img" src="../../assets/images/logo.png" alt />
        </van-col>
        <van-col span="5"></van-col>
        <van-col span="7" >
          <span class="iconfont icon-wode-copy-copy fr" @click="$router.push('/main/my')" ></span>
          <span class="iconfont icon-wodeshujia fr" @click="$router.push('/main/bookshelf')" ></span>
        </van-col>
      </van-row>

       <div class="v-search s-box">
        <van-search class="title-s get-s" @focus="getSearch" placeholder="搜索书名" />
      </div>
      <div class="containter">
      <!-- 顶部导航end -->
      <van-swipe :autoplay="3000" indicator-color="#ffffff" style=" height: 160px;">
        <van-swipe-item v-for="(item, index) in bannerData" :key="index">
          <img class="auto-img" v-lazy="item.images" alt />
        </van-swipe-item>
      </van-swipe>

      <!-- 导航栏 -->
      <div class="mybooks-box clearfix">
        <div
          class="mybook fl"
          v-for="(item,index) in bookList"
          :key="index"
          @click="toggleList(index)"
        >
          <img :src="item.src" alt />
          <span>{{item.name}}</span>
        </div>
      </div>
      <!-- 最近阅读 -->
      <div class="record">
        <div class="history">最近阅读</div>
        <div class="read">暂无阅读记录</div>
      </div>
      
      <div class="c-book-recommend">
        <!-- 畅销热榜 -->
        <div class="title">
          热门推荐
          <i class="tip"></i>
          <div class="right refresh" @click="toggleBookLists()">换一批</div>
        </div>
        <!-- 书籍列表 -->
        <div class="content c-book-recommend-list c1" v-if="isBookList">
        <div class="recommend-list clearfix" v-for="(item,index) in hotBookData" :key="index" @click="goDetail(item._id)">
          <div class="cover fl">
              <img
            :src="item.cover"
            class="auto-img"
          />
          </div>
          <div class="recommend-right fl">
            <h4 class="name">
              <span>{{item.title}}</span>
            </h4>
            <p class="desc">{{item.shortIntro}}</p>
            <p class="category">
              {{item.minorCate}}
              <span class="split">|</span>
              <span class="c-blue">{{item.latelyFollower}}万</span>人气
              <!-- <i class="tag">{{item.majorCate}}</i> -->
            </p>
          </div>
        </div>
        </div>
        <!-- 女生佳作 -->
        <!-- 书籍列表 -->
        <div class="content c-book-recommend-list c2" v-else>
        <div class="recommend-list clearfix" v-for="(item,index) in femaleBookData" :key="index"  @click="goDetail(item._id)">
          <div class="cover fl">
              <img
            :src="item.cover"
            class="auto-img"
          />
          </div>
          <div class="recommend-right fl">
            <h4 class="name">
              <span>{{item.title}}</span>
              <!-- <i class="complete">完结</i> -->
            </h4>
            <p class="desc">{{item.shortIntro}}</p>
            <p class="category">
              {{item.minorCate}}
              <span class="split">|</span>
              <span class="c-blue">{{item.latelyFollower}}万</span>人气
              <!-- <i class="tag">{{item.majorCate}}</i> -->
            </p>
          </div>
        </div>
        </div>
      </div>
      </div>
  </div>
</template>
<script>

import "../../assets/css/bookcity.less";
export default {
  data() {
    return {
      bannerData: [
        {
          images:
            "https://plf-new.zhuishushenqi.com/management/images/20200710/68002d4b4b334227a4fda1f4cd9990a7.jpg",
        },
        {
          images:
            "https://plf-new.zhuishushenqi.com/management/images/20200710/19ccd241fee0446a82b328ed13fd8a90.jpg",
        },
        {
          images:
            "https://plf-new.zhuishushenqi.com/management/images/20200717/4fa0c1d24edb421e88b4a1a1f7cc6506.jpg",
        },
      ],
      //书籍导航
      bookList: [
        {
          src: require("../../assets/images/shelf.png"),
          name: "书架",
          routeName: "Bookshelf",
        },
        {
          src: require("../../assets/images/goal.png"),
          name: "排行",
          routeName: "Ranking",
        },
        {
          src: require("../../assets/images/nav.png"),
          name: "充值",
          routeName: "Pay",
        },
      ],
      //男频热榜数据
      hotBookData:{},
      //女生佳作
      femaleBookData:{},
      isBookList:true,
    };
  },
  created(){
      //获取男频热榜书籍数据
      this.getHotBook();
      //获取女生佳作书籍数据
      this.getFemaleBook();
  },
  methods: {
    getSearch() {
      // 跳转路由
      this.$router.push("/search");
    },
    //切换路由
    toggleList(index) {
      this.$router.push({ name: this.bookList[index].routeName });
    },

    //请求男频书籍数据
    getHotBook(){

      this.axios({
        method:"GET",
        url:"http://novel.kele8.cn/category-info?gender=male&type=hot&major=奇幻&minor=&start=0&limit=10"
      }).then(result =>{
         this.$toast.clear();
        // 
        if(result.status == 200){
          this.hotBookData = result.data.books;
          // 

          //图片转码,图片解码转成可读格式
          //遍历数组
          this.hotBookData.forEach((val) => {
            val.cover = unescape(val.cover).slice(7);
            // 
          });
           //把人气数量转换成个数万并保留两位小数
          this.hotBookData.forEach((num) => {
            num.latelyFollower = (num.latelyFollower / 10000).toFixed(2);
            // 
          });
        }
      }).catch(err =>{
         this.$toast.clear();
         
      })
    },

    //请求女生佳作的书籍数据
    getFemaleBook(){
   
      this.axios({
        method:"GET",
        url:"http://novel.kele8.cn/category-info?gender=female&type=hot&major=现代言情&minor=&start=0&limit=10"

      }).then(result =>{
        this.$toast.clear();
        // 
         if(result.status == 200){
          this.femaleBookData = result.data.books;
          // 

          //图片转码,图片解码转成可读格式
          //遍历数组
          this.femaleBookData.forEach((val) => {
            val.cover = unescape(val.cover).slice(7);
            // 
          });
           //把人气数量转换成个数万并保留两位小数
          this.femaleBookData.forEach((num) => {
            num.latelyFollower = (num.latelyFollower / 10000).toFixed(2);
            // 
          });
        }
      }).catch(err =>{
        this.$toast.clear();
        
      })
    },
     //点击跳转到详情页 点击跳转的时候把书的id传过去
    goDetail(id){
       this.$router.push({name:'Detail',query:{id: id}})
    },
    //点击切换书城书籍列表
    toggleBookLists(){
        this.isBookList = !this.isBookList;
    }
   

  },
};
</script>
<style lang="less" scoped>
</style>