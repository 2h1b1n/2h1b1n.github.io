<template>
  <div class="catalogue">
    <van-row class="topsearchNav">
      <van-col span="3" @click="$router.go(-1)">
        <span class="iconfont icon-fanhui2"></span>
      </van-col>
      <van-col span="18">
        <span class="t">目录</span>
      </van-col>
      <van-col span="3" class="clearfix">
        <van-icon class="home-t" name="wap-home" @click="$router.push('/main/bookcity')"/>
      </van-col>
    </van-row>

    <div class="chapter-detail" >
      <!-- 目录标题 -->
      <div class="chapter-header">
        <div class="chapter-header-1">
          <h3 class="chapter-title">目录</h3>
          <span class="chapter-title-desc">共{{allcount}}章</span> 
        </div>
      </div>
      <!-- 章节列表 -->
      <van-list
        class="chapter-l"
        v-model="loadOptions.isLoading"
        :finished="loadOptions.isFinished"
        :finished-text="loadOptions.finishedText"
        @load="loadData"
        
      >
        <!-- <div class="chapter-body"> -->
          <ul class="chapter-list">
            <li v-for="(item,index) in chapterListDatas" :key="index" @click="goReading(item.link,index,title)">
              <div>{{item.title}}</div>
            </li>
          </ul>
        <!-- </div> -->
      </van-list>
    </div>
  </div>
</template>

<script>
import "../assets/css/catalogue.less";
export default {
  data() {
    return {
      //获取全部章节数据
      allChapterDatas:{},
      //获取章节数据
      chapterListDatas:{},
      //chapter_id定义一个目录id获取到相应的章节
      chapter_id: "",
      loadOptions: {
        //是否处于加载状态，加载过程中不触发load事件
        isLoading: true,

        //是否完成加载所有数据
        isFinished: false,
        isFinishedText: "没有数据可加载了",
      },

      //每次加载8条数据
      loadCount: 15,
      //当前默认索引值
      current:"",
      //获取总章节数据
      allcount:"",
      //书名标题
      title:"",
    };
  },
  created() {
    //获取章节数据
    this.getChapterDatas();
    // this.getChapterDatas();
    //  
  },
  methods: {
    getChapterDatas() {
      //开启加载提示
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        //延迟自动关闭加载提示，如果该值为0，则不会自动关闭
        duration: 0,
      });
      //请求外部资源的id数据（外部id为相应书籍网站的id）
      this.axios({
        method: "GET",
        url:
          "http://novel.kele8.cn/book-sources?view=summary&book=" +
          this.$route.query.id,
      })
        .then((result) => {
          this.$toast.clear();
          // 
          if (result.status == 200) {
            this.chapter_id = result.data[0]._id;
            // 
            //根据获取到的内部id来获取相应的数据
            this.axios({
              method: "GET",
              url: "http://novel.kele8.cn/book-chapters/" + this.chapter_id,
            })
              .then((result) => {
                // 
                if(result.status == 200){
                  //缓存全部章节，拿取它的长度
                  this.allcount = result.data.chapters.length;
                  //缓存全部的章节数据
                  this.allChapterDatas = result.data.chapters;
                  // 
                  //先获取给定的加载数据
                  this.chapterListDatas = this.allChapterDatas.splice(0,this.loadCount);
                // 
                 //根据截取章节数量和总章节数量判断是否加载完成
                 if(this.allChapterDatas.length >0){
                   this.loadOptions.isLoading = false;
                 }else{
                   this.loadOptions.isLoading = true;
                   this.loadOptions.isFinished = true;
                 }

                 if(this.chapterListDatas.length == 0){
                   this.loadOptions.isFinishedText = "";
                 }
                }
                     
              })
              .catch((err) => {
                this.$toast.clear();
                
              });

             
          }
        })
        .catch((err) => {
          this.$toast.clear();
          
        });
    },

    //懒加载章节数据
    loadData(){
      //异步更新数据
      setTimeout(() =>{
        this.chapterListDatas.push(
          ...this.allChapterDatas.splice(0,this.loadCount)
        );

        //默认加载数据
         this.loadOptions.isLoading = false;
        if(this.allChapterDatas.length == 0){
          //没有数据可加载
          this.loadOptions.isLoading = true;
          this.loadOptions.isFinished = true;
        }
      },1000)
    },
    //点击跳转到阅读页 点击跳转的时候把书的link传过去
    // 传参===>link(属性名):link(属性值，可以改变的量) 传过去要用this.$route.query.link拿数据;index表示章节的索引值;title表示书名标题
    goReading(link,index,title){
      // 
      // 
     this.current = index;
      this.$router.push({name:'Reading',query:{link: link,id:this.$route.query.id,index:this.current,title:this.$route.query.title}})
    },
   
  },
};
</script>

<style lang="scss" scoped>
</style>