<template>
  <div class="search">
    <van-row class="topsearchNav">
      <van-col span="3" @click="$router.go(-1)">
        <span class="iconfont icon-fanhui2"></span>
      </van-col>
      <van-col span="18">
        <span class="t">搜索</span>
      </van-col>
      <van-col span="3" class="clearfix">
        <van-icon class="home-t" name="wap-home" @click="$router.push('/main/bookcity')"/>
      </van-col>
    </van-row>
    <!-- 搜索 -->
    <div class="page-searching-wrapper">
      <div class="searching-wrapper">
        <div class="searching-input">
          <input type="text" v-model="value" @keyup.enter="search"  placeholder="请输入搜索内容"  />
        </div>
        <span>确定</span>
      </div>

      <div class="searching-auto" v-if="value=='' ? false : true">
        <div class="li" v-for="(lis,index) in keywordsData" :key="index">{{lis}}</div>
        <!-- <div class="li">凡人修仙传</div>
        <div class="li">凡人修真传</div> -->
      </div>
      <!-- 热门搜索 -->
      <div class="searching-section" v-else>
        <div class="searching-hotWords">
          <div class="searching-title">
            <div class="title">热门推荐</div>
            <div class="right refresh" @click="getHotWord()">换一批</div>
          </div>
          <div class="content" v-for="(item,index) in searchHotWords" :key="index">{{item.word}}</div>
        </div>
        <div class="searching-history">
          <div class="searching-title">
            <div class="title">搜索历史</div>
            <div class="right delete">删除历史</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/css/search.less";
export default {
  data() {
    return {
      // 最新热词
      searchHotWords: [],
      //获取自动补全搜索数据
      keywordsData: [],
      //input的值
      value:'',
      index:0
      // 定义一个自动补全关键字
      // keywords:""
    };
  },
  created() {
    //获取热词搜索数据
    this.hotWordsData();
    //获取自动补全数据
    this.autoWordsData();
    //获取关键字数据
    // this.keywords = this.$route.query.keywords;
  },
  methods: {
    //请求热词搜索数据
    hotWordsData() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        //延迟自动关闭加载提示，如果该值为0，则不会自动关闭
        duration: 0,
      });
      this.axios({
        method: "GET",
        url: "http://novel.kele8.cn/search-hotwords",
      })
        .then((result) => {
          this.$toast.clear();
          // 
          if (result.status == 200) {
            this.searchHotWords = result.data.searchHotWords.splice(this.index,6);
            // 
          }
        })
        .catch((err) => {
          
        });
    },

    //请求自动补全数据
    autoWordsData() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        //延迟自动关闭加载提示，如果该值为0，则不会自动关闭
        duration: 0,
      });
      //让输入的值赋值给关键字之后，回车产生数据
        let keywords = this.value;
      this.axios({
        method: "GET",
        url:"http://novel.kele8.cn/auto-complete?query="+ keywords
        // url: "http://novel.kele8.cn/search-hotwords"
      })
        .then((result) => {
          this.$toast.clear();
          // 
          if (result.status == 200) {
            this.keywordsData = result.data.keywords;
            // 
          }
        })
        .catch((err) => {
          
        });
    },
    //在输入value值的时候回车进行关键字查找，调用关键字数据
    search(){
      this.autoWordsData();
    },
    //点击换一换热词
    getHotWord(){
      // 
      //每次加6的拿取热词
      this.index += 6;
      //拿到索引值为36的时候让他从索引值0开始拿，否则一直拿6条数据
      this.index = this.index == 36 ? 0 : this.index;
      this.hotWordsData();
    }
  },
};
</script>

<style lang="scss" scoped>
</style>