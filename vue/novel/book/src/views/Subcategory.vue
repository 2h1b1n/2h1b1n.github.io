<template>
  <div class="subcategory">
    <div>
      <van-row class="topsearchNav">
        <van-col span="3" @click="$router.go(-1)">
          <span class="iconfont icon-fanhui2"></span>
        </van-col>
        <van-col span="18">
          <span class="t">{{nameType}}</span>
        </van-col>
        <van-col span="3" class="clearfix">
          <van-icon class="home-t" name="wap-home" @click="$router.push('/main/bookcity')"/>
        </van-col>
      </van-row>
      <div class="page-category-result-wraper">
        <div class="filter-item-wraper">
          <div class="filter-item">
            <div class="inner">
              <ul>
                <li
                  :class="item.isActive ? 'active': ''"
                  v-for="(item, index) in bookNameType"
                  :key="index"
                  @click="toggleNav(item,index)"
                >{{item.title}}</li>
                <!-- <li>新书</li> -->
              </ul>
            </div>
          </div>
        </div>
        <!-- 图书列表 -->
        <div class="booklist clearfix" v-for="(v,i) in bookNameLists" :key="i" @click="goDetail(v._id)">
          <div class="leftimg fl">
            <img class="auto-img" :src="v.cover" alt />
          </div>
          <div class="right fl">
            <h4 class="name">{{v.title}}</h4>
            <p>
              {{v.author}}
              <span class="split">|</span>
              {{v.majorCate}}
            </p>
            <p>{{v.shortIntro}}</p>
            <p class="important">
              <span class="c-bule">{{v.latelyFollower}}万</span>
              人气
              <span>
                <span class="split">|</span>
                <span class="c-bule">{{v.retentionRatio}}%</span>读者留存
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "../assets/css/subcategory.less";
import "../assets/css/public.less";
export default {
  data() {
    return {
      bookNameType: [
        { title: "热门", enname: "hot", isActive: true },
        { title: "新书", enname: "new", isActive: false },
      ],
      //默认热门
      hot: "hot",
      //书名类型
      bookNameLists: {},
      nameType: "",
    };
  },
  created() {
    //根据类型获取书名类型数据
    this.getCategoryByType();
    this.nameType = this.$route.query.type;
  },
  methods: {
    back() {
      this.$router.go(-1);
    },

    //获取子分类书名类型数据
    getCategoryByType() {
      //开启加载提示
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        //延迟自动关闭加载提示，如果该值为0，则不会自动关闭
        duration: 0,
      });
      this.axios({
        method: "GET",
        url:
          "http://novel.kele8.cn/category-info?gender=" +
          this.$route.query.gender +
          "&type=" +
          this.hot +
          "&major=" +
          this.$route.query.type +
          "&minor=&start=0&limit=200",
      })
        .then((result) => {
          this.$toast.clear();
          // 
          if (result.data.books) {
            //缓存相应书名类型的数据，如玄幻，
            this.bookNameLists = result.data.books;
            // 
          }

          //获取书名类型

          //图片转码,图片解码转成可读格式
          //遍历数组
          this.bookNameLists.forEach((val) => {
            val.cover = unescape(val.cover).slice(7);
            // 
          });
          //把人气数量转换成个数万并保留两位小数
          this.bookNameLists.forEach((num) => {
            num.latelyFollower = (num.latelyFollower / 10000).toFixed(2);
            // 
          });
        })
        .catch((err) => {
          
        });
    },

    //切换标签
    toggleNav(item, index) {
      if (item.isActive) {
        return;
      }
      for (let i = 0; i < this.bookNameType.length; i++) {
        if (this.bookNameType[i].isActive) {
          this.bookNameType[i].isActive = false;
          break;
        }
      }
      
      this.bookNameType[index].isActive = true;
      //切换type书籍类型
      //  
      this.hot = this.bookNameType[index].enname;
      // 
      //点击切换类型的时候，再次调用相应的书籍类型值
      this.getCategoryByType();
    },
    //点击跳转到详情页 点击跳转的时候把书的id传过去
    goDetail(id){
      // 

       this.$router.push({name:'Detail',query:{id: id}})
    }
  },
};
</script>