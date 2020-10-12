<template>
  <div class="bookshelf">
    <van-row class="topsearchNav">
      <van-col span="3" @click="$router.go(-1)">
        <span class="iconfont icon-fanhui2"></span>
      </van-col>
      <van-col span="18">
        <span class="t">我的书架</span>
      </van-col>
      <van-col span="3" class="clearfix">
        <span class="manage fl" @click="delTag">管理</span>
      </van-col>
    </van-row>
    <!-- 导航栏 -->
    <div class="tabs">
      <!-- 图书列表 -->
      <div class="selectContainer">
        <div
          class="bookshelf-box clearfix"
          v-for="(item,index) in bookDatas"
          :key="index"
        >
        <div class="book-content fl clearfix" @click="goReading(bookChapters[0].link,bookDatas[0]._id,index)">
          <div class="leftimg fl">
            <img class="auto-img" :src="item.cover" alt />
          </div>
          <div class="right fl">
            <h4 class="name">{{item.title}}</h4>
            <p class="lastChapter">{{item.lastChapter}}</p>
            <p>{{item.cat}}</p>
          </div>
          </div>
          <div class="Del fr" v-if="isDel" @click="delSelectBook(item._id)">
            <img class="auto-img" src="../../assets/icons/delete.png" alt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "../../assets/css/bookshelf.less";
export default {
  data() {
    return {
      //定义一个对象存储书架数据
      bookShelfDatas: {},
      //用于遍历书架的数据
      bookDatas: [],
      //用于遍历书架获取的阅读章节列表
      bookChapters: {},
      //chapter_id定义一个目录id获取到相应的章节
      chapter_id: "",
      //默认跳转阅读页面的索引值
      index: 0,
      //删除图标默认隐藏
      isDel: false,
    };
  },
  created() {
    //根据id获取加入书架的数据
    // this.getBookIdDatas();
    //把本地存储的数据获取出来
    this.setBookshelfLists();
    //根据id 获取相应的阅读页面数据
    // this.getReadingPage();
  },
  methods: {
    //获取本地存储的id
    setBookshelfLists() {
      //把序列化成字符串的数据反序列化为数组
      let Ids = JSON.parse(localStorage.getItem("BID"));
      if(!Ids)return;
      // 
      //遍历数组
      Ids.map((v) => {
        // 
        this.getBookIdDatas(v);
      });
      Ids.map((b) => {
        this.getReadingPage(b);
      });
      // 
    },
    //请求存储在本地的id，获取相关数据
    getBookIdDatas(id) {
      // 
      this.axios({
        method: "GET",
        url: "http://novel.kele8.cn/book-info/" + id,
      })
        .then((result) => {
          // 
          if (result.status == 200) {
            //缓存书籍数据
            this.bookShelfDatas = result.data;
            // 
            //图片转码,图片解码转成可读格式
            //遍历数组
            this.bookShelfDatas.cover = unescape(
              this.bookShelfDatas.cover
            ).slice(7);
          }
          this.bookDatas.push(this.bookShelfDatas);
          // 
        })
        .catch((err) => {
          
        });
    },
    //请求从书架跳转到阅读页面的数据
    getReadingPage(id) {
      this.axios({
        method: "GET",
        url: "http://novel.kele8.cn/book-sources?view=summary&book=" + id,
      })
        .then((result) => {
          // 
          if (result.status == 200) {
            this.chapter_id = result.data[0]._id;
            //  
            //根据书本目录id请求章节列表数据
            this.axios({
              method: "GET",
              url: "http://novel.kele8.cn/book-chapters/" + this.chapter_id,
            })
              .then((result) => {
                // 
                if (result.status == 200) {
                  //缓存全部章节列表
                  this.bookChapters = result.data.chapters;
                  // 
                }
              })
              .catch((err) => {
                
              });
          }
        })
        .catch((err) => {
          
        });
    },
    //跳转到阅读页面
    goReading(link, id, index) {
      //拿到书本的id传实参到阅读页
      // 
      this.$router.push({
        name: "Reading",
        query: { link: link, id: id, index: this.index },
      });
    },
    //点击管理显示删除图标
    delTag() {
      this.isDel = !this.isDel;
    },
    //delSelectBook 选择相应的书籍删除
    delSelectBook(id) {
      
      // return
      let Ids = JSON.parse(localStorage.getItem("BID"));
      for (let i = 0; i < Ids.length; i++) {
        if (Ids[i] == id) {
          // 
          Ids.splice(i, 1);
        }
      }
      this.bookDatas = [];
      // this.bookDatas = Ids;
      localStorage.setItem("BID", JSON.stringify(Ids));
      this.setBookshelfLists();
      
    },
  },
};
</script>
<style lang="less" scoped>
</style>