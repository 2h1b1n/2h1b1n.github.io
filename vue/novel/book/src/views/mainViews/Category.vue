<template>
  <div class="category">
    <van-row class="topsearchNav">
      <van-col span="3" @click="$router.go(-1)">
        <span class="iconfont icon-fanhui2"></span>
      </van-col>
      <van-col span="18">
        <span class="t">分类</span>
      </van-col>
      <van-col span="3" class="clearfix">
        <van-icon class="home-t " name="wap-home" @click="$router.push('/main/bookcity')"/>
      </van-col>
    </van-row>
    <div class="category-box">
      <div class="category-section clearfix" v-for="(v,i) in typeData" :key="i">
        <h4 class="typelist">{{v.name}}</h4>
        <div class="category-list">
          <div class="book-list fl" v-for="(item,index) in typebooklist[v.enname]" :key="index" @click="goSubcategory(v.enname,item.name)">
            <span class="name">{{item.name}}</span>
            <span class="count">书籍量:{{item.bookCount}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <van-row class="topsearchNav search-t">
      <van-col span="1">
        <span class="title"></span>
      </van-col>
      <van-col class="search-c" span="20">
        <van-search @focus="getSearch" placeholder="搜索书名" />
      </van-col>
      <van-col span="3">
        <span class="title-s">搜索</span>
      </van-col>
    </van-row>
  </div>
</template>
<script>
import "../../assets/css/category.less";
import { mapState } from "vuex";
export default {
  data() {
    return {
      typebooklist: {},
      typeData: [
        { name: "男生", enname: "male" },
        { name: "女生", enname: "female" },
        { name: "漫画", enname: "picture" },
        { name: "出版", enname: "press" }
      ]
      //选择阅读类型
      // typelists:[],
      // 男生喜欢的书名类型
      // malebook:[],
      //女生喜欢的书名类型
      // femalebook:[],
    };
  },
  created() {
    //获取书类型数据
    this.getTypeData();

  },
  methods: {
    //获取书名类型数据
    getTypeData() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        //延迟自动关闭加载提示，如果该值为0，则不会自动关闭
        duration: 0
      });
      this.axios({
        method: "GET",
        url: "http://novel.kele8.cn/categories"
      })
        .then(result => {
          this.$toast.clear();
          // 
          if (result.data) {
            //缓存分类的整体类型数据
            this.typebooklist = result.data;
            // 
          }
        })
        .catch(err => {
          
        });
    },
    //底部搜索栏
    getSearch() {
      // 跳转路由
      this.$router.push("/search");
    },
    goSubcategory(gender,type){
      this.$router.push({name:'Subcategory',query:{gender:gender, type:type}})
    }
  }
};
</script>
<style lang="less" scoped>
</style>