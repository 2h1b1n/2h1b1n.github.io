<template>
  <div class="ranking">
    <div class="topsearchNav">
      <van-row >
        <van-col span="3" @click="$router.go(-1)">
          <span class="iconfont icon-fanhui2"></span>
        </van-col>
        <van-col span="18">
          <span class="t">排行榜</span>
        </van-col>
        <van-col span="3" class="clearfix">
           <van-icon class="home-t" name="wap-home" @click="$router.push('/main/bookcity')"/>
        </van-col>
      </van-row>
    </div>

    <!-- 书籍内容列表 -->
    <div class="page-ranking-wrapper">
      <van-tabs class="v-tabs" @click="toggleBookList">
        <van-tab class="v-tab" :title="v.title" v-for="(v,index) in rankingList" :key="index" >
            <div class="ranking-list">
              <!-- 左侧边栏 -->
              <div class="left-nav fl">
                <div
                  class="inner-left"
                  :ref="'inner' + index"
                  :class="{current:index==currentIndex ? 'current' :''}"
                  v-for="(item,index) in typeData[v.enname]"
                  :key="index"
                  @click="toggleAsideNav(item,index)"
                >{{item.shortTitle}}</div>
              </div>
              <!-- 右边内容---书籍列表 -->
              <div class="right-content fl clearfix">
                <div class="book-list clearfix" v-for="(b,index) in rankBookData" :key="index" @click="goDetail(b._id)">
                  <div class="cover fl">
                    <img
                      class="auto-img"
                      :src="b.cover"
                      alt
                    />
                  </div>
                  <div class="right-t fr">
                    <h4 class="name">
                      <span>{{index+1}}.{{b.title}}</span>
                    </h4>
                    <p class="desc">{{b.shortIntro}}</p>
                    <p class="sku clearfix">
                      <span class="author fl">
                        <i>{{b.author}}</i>
                      </span>
                      <span class="tag fr">
                        <i>{{b.majorCate}}</i>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          
        </van-tab>
        <!-- <van-tab title="出版">内容 2</van-tab>
        <van-tab title="男频">内容 3</van-tab>-->
      </van-tabs>
    </div>
  </div>
</template>

<script>
import "../assets/css/ranking.less";
import { createNamespacedHelpers } from "vuex";

const { mapState, mapMutations } = createNamespacedHelpers("bookModule");
export default {
  data() {
    return {
      rankingList: [
        { title: "女频", enname: "female", isActive: true },
        { title: "出版", enname: "epub", isActive: false },
        { title: "男频", enname: "male", isActive: false },
      ],

      //书籍类型
      typeData: {},
      //移动线条的top
      top: 0,
      //获取排行榜的书籍分类数据
      rankNameList: {},
      //定义一个索引id获取相应的数据
      rank_id: "",
      //侧边导航索引
      rank_index: 0,
      //头部栏索引
      type_id: 0,
      //右边书名列表数据
      rankBookData:[],
      // female:"female",
      // 侧边栏当前索引
      currentIndex:0
    };
  },
  created() {
    //获取书籍类型数据
    this.getTypeData();
    //获取相应的书名数据
    // this.getRankBookData();
  },
 
  methods: {
    //获取书籍类型数据(左侧边栏分类数据)
    getTypeData() {
      //开启加载提示
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        //延迟自动关闭加载提示，如果该值为0，则不会自动关闭
        duration: 0,
      });
      // 获取排名分类
      this.axios({
        method: "GET",
        url: "http://novel.kele8.cn/rank-category",
      }).then((result) => {
        this.$toast.clear();
        // 
        if (result.status == 200) {
          this.typeData = result.data;
          //获取头部导航栏索引值
          let type = this.rankingList[this.type_id].enname;
          //通过切换头部和侧边栏的索引值（默认都是拿取第一个排行榜的数据）来获取相应的id
          this.rank_id = this.typeData[type][this.rank_index]._id;
          // 
          //根据id获取右边内容数据
          this.axios({
            method: "GET",
            url: "http://novel.kele8.cn/rank/" + this.rank_id,
          }).then((result) => {
            this.$toast.clear();
            // 
            if(result.status == 200){
              this.rankBookData = result.data.ranking.books;
              // 
            }

            //图片转码,图片解码转成可读格式
          //遍历数组
          this.rankBookData.forEach((val) => {
            val.cover = unescape(val.cover).slice(7);
          });


          }).catch(err =>{
            this.$toast.clear();
            
        });
        }

      }).catch(err =>{
         this.$toast.clear();
        
      });
    },
    // 切换顶部导航的时候改变书的列表
    toggleBookList(index){
      //从当前的索引值赋值给切换的索引获取相应的id数据
      this.type_id = index;
      // 
      //切换头部导航栏时默认左侧边栏是第一个
      this.rank_index=0;
      this.currentIndex=0;
      this.getTypeData();
    },
    //切换左侧边栏标签
    toggleAsideNav(item,index) {
      // 
      //通过index让当前的索引值高亮
     this.currentIndex = index;
     //从当前的索引值赋值给切换的索引获取相应的id数据
      this.rank_index = index;
      this.getTypeData();
    },
    //点击跳转到详情页 点击跳转的时候把书的id传过去
    goDetail(id){
       this.$router.push({name:'Detail',query:{id: id}})
    }
   
  },
  computed:{
     
  }
};
</script>

<style lang="scss" scoped>
</style>