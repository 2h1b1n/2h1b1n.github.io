<template>
  <div class="detail">
    <van-row class="topsearchNav">
      <van-col span="3" @click="$router.go(-1)">
        <span class="iconfont icon-fanhui2"></span>
      </van-col>
      <van-col span="18">
        <span class="t">书籍详情</span>
      </van-col>
      <van-col span="3" class="clearfix">
        <van-icon class="home-t" name="wap-home" @click="$router.push('/main/bookcity')"/>
      </van-col>
    </van-row>
    <div class="page-book-detail">
      <div class="book-detail clearfix" >
        <div class="left-img fl">
          <img class="auto-img" :src="bookData.cover" alt />
        </div>
        <div class="right-detail fl">
          <div class="desc">
            <h1>{{bookData.title}}</h1>
            <p class="sku">
              <a href>
                <span class="c-bule">{{bookData.author}}</span>
              </a>
              <i>|</i>
              <span>{{bookData.cat}}</span>
              <i>|</i>
              <span>{{bookData.wordCount}}万字</span>
            </p>
            <p class="longIntro">{{bookData.majorCate}}</p>
          </div>
        </div>
      </div>

      <div class="read-link">
        <div class="btn-box clearfix">
          <div class="button fl" @click="addBookshelf()">加入书架</div>
          <div class="button fl" @click="goReading(allChapterList[0].link,index,bookData.title)">开始阅读</div>
        </div>
        <!-- <div class="month-tags">
          开通VIP，免费阅读此书
          <i>&gt;</i>
        </div> -->
      </div>
      <!-- 阅读数据 -->
      <div class="read-data clearfix">
        <div class="item fl">
          <p class="key">追人气</p>
          <p class="readCount">{{bookData.latelyFollower}}万</p>
        </div>
        <div class="item fl">
          <p class="key">读者留存率</p>
          <p class="readCount">{{bookData.retentionRatio}}%</p>
        </div>
        <div class="item fl">
          <p class="key">日更字数/天</p>
          <p class="readCount">{{bookData.serializeWordCount}}</p>
        </div>
      </div>
      <!-- 简介 -->
      <div class="introduction-wraper">
        <div class="introduction">
          <p class="introduct-t">{{bookData.longIntro}}</p>
        </div>
        <!-- <div class="bottom-arrow">
          <img class="auto-img" src="../assets/images/bottom-arrow.png" alt />
        </div> -->
      </div>
      <!-- 目录 -->
      <div class="catalog clearfix" @click="goCatalogue(bookData._id,bookData.title)">
        <div class="title fl">目录</div>
        <div class="right-arrow fr">
          <img class="auto-img" src="../assets/images/right-arrow.png" alt />
        </div>
        <span class="text fr">[更新到...]&nbsp;{{bookData.lastChapter}}</span>
      </div>
      <!-- 热门书评 -->
      <div class="hot-comment">
        <div class="comment-top">热门书评</div>
        <ul class="c-comment-list">
          <li v-for="(com,t) in commentData" :key="t">
            <div class="comment">
              <img
                class="avater"
                src="http://statics.zhuishushenqi.com/icon/avatar.png"
                alt
              />
              <div class="right-c">
                <p class="name">{{com.author.nickname}}</p>
                <p class="content">{{com.content}}</p>
                <p class="score">
                  <i class="star-full"></i>
                  <i class="star-full"></i>
                  <i class="star-full"></i>
                  <i class="star-full"></i>
                  <i class="star-full"></i>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import "../assets/css/detail.less";
export default {
  data(){
    return{
      //定义一个书籍详情的id数据
      bookData:{},
      //评论数据
      commentData:{},
      tip:"",
      //chapter_id定义一个目录id获取到相应的章节
      chapter_id: "",
      //全部章节列表
      allChapterList:{},
      //阅读页面数据
      readingData: {},
      //默认跳转阅读页面的索引值
      index:0,
      //默认title值为空，书名标题
      title:"",
    }
  },
  created(){
    //获取相关的书籍详情
    this.getDetailById();
    //获取书籍短评
    this.getBookComment();
    //获取阅读内容
    this.getReadingContent();
  },
  methods:{
    getDetailById(){
      //开启加载提示
      this.$toast.loading({
        message:"加载中...",
        forbidClick:true,
        //延迟自动关闭加载提示，如果该值为0，则不会自动关闭
        duration: 0,
      });
      this.axios({
        method:"GET",
        url:"http://novel.kele8.cn/book-info/"+this.$route.query.id,
      }).then(result =>{
        this.$toast.clear();
        // 
        if(result.status == 200){
          //缓存书籍详情数据
          this.bookData = result.data;
          // 
           //图片转码,图片解码转成可读格式
            //遍历数组
          this.bookData.cover = unescape(this.bookData.cover).slice(7);
           //把人气数量转换成个数万并保留两位小数
           this.bookData.latelyFollower = (this.bookData.latelyFollower/10000).toFixed(2);
          //把文章字数简写成个数万，并向上取整数
          this.bookData.wordCount = Math.ceil((this.bookData.wordCount/10000));
        }

       
      }).catch(err =>{
        this.$toast.clear();
        
      })

    },
    getBookComment(){
       //获取token

      this.axios({
        method:'GET',
        url:'http://novel.kele8.cn/book/short-reviews?book='+this.$route.query.id+'&limit=3',
      }).then(result =>{
        this.$toast.clear();
        // 
        if(result.data.docs){
          this.commentData = result.data.docs;
          // 
        }
      }).catch(err =>{
        this.$toast.clear();
        
      })
    },
    //获取阅读内容
    getReadingContent(){
       //根据书本id请求数据
      this.axios({
        method:"GET",
        url:"http://novel.kele8.cn/book-sources?view=summary&book=" +
          this.$route.query.id,
      }).then(result =>{
        // 
        if(result.status == 200){
          //根据书本数据获取目录列表的id，并存储
          this.chapter_id = result.data[0]._id;
          //  
           //根据书本目录id请求章节列表数据
           this.axios({
             method:"GET",
             url:"http://novel.kele8.cn/book-chapters/" + this.chapter_id,
           }).then(result =>{
            //  
             if(result.status == 200){
               //缓存全部章节列表
               this.allChapterList = result.data.chapters;
              // 

              //根据请求到章节列表获取相应的阅读内容
                // let link = encodeURIComponent(
                //     this.allChapterList[this.index].link
                //   );
                //  
             }
           }).catch(err =>{
             
           })
        }
      }).catch(err =>{
        
      })
    },
    //点击跳转到相应的目录
    //id表示书名id,根据书名获取相关的章节列表，title表示书名标题，方便在目录章节Catalogue跳转时把title传给Reanding页面
    goCatalogue(id,title){
      this.$router.push({name:'Catalogue',query:{id:id,title:title}})
    },
    // 点击跳转到阅读页面
    // 传参===>link(属性名):link(属性值，可以改变的量) 传过去要用this.$route.query.link拿数据;index表示章节的索引值;title表示书名标题
    goReading(link,index,title){
      // 
      // 
      //传书名到阅读页
      // 
       this.$router.push({name:'Reading',query:{link:link ,id:this.$route.query.id,index:this.index,title:title}})
    },
    //加入书架
    addBookshelf(){
      if(localStorage.getItem("BID")){
        //把序列化成字符串的数组反序列化为数组 JSON.parse()【从一个字符串中解析出json对象】
        let Ids = JSON.parse(localStorage.getItem("BID"));
        // 
        let isAdd = Ids.find((v) =>{
          //当前已有id的时候return true否则false
          if( this.bookData._id == v){
            this.$toast("已存在此书籍");
            return true;
          }else{
            return false;
          }
        });
        if(!isAdd){
          this.$toast("已加入书架");
          //将id加入数组前面
          Ids.unshift(this.bookData._id);
        }
        //把Ids覆盖BookID(存储到本地需要把数据转化为字符串形式，否则会报错)
        // JSON.stringify()【从一个对象中解析出字符串】
        localStorage.setItem("BID",JSON.stringify(Ids));
        
      }else{
        //本地存储BookID不存在则创建key
        let Ids = [this.bookData._id];
        // Ids.push(this.bookData._id)
        //创建一个BookID本地长期存储，将字符串化的id加入该key中
        localStorage.setItem("BID",JSON.stringify(Ids));
        // 
      }
    }
  }

};
</script>