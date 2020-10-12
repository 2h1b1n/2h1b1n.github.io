<template>
  <div class="reading" :style="{'background-color':bgColor,'color':color}">
    <!-- 阅读内容 -->
    <div class="reader-content" ref="readBox" @click="openMenu">
      <section class="reader-content-details" ref="readContent">
        <h1 :style="{'font-size': titleSize + 'px','color':tColor}">{{readingData.title}}</h1>
        <div>
          <div class="read-content">
            <div
              class="read-inner"
              style=" min-height: 667px;"
              :style="{'font-size': fontsize +'px'}"
            >
              <!-- <p>{{readingData.cpContent}}</p> -->
              <p ref="size" v-for="(item,index) in readingData.cpContent" :key="index">{{item}}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- 菜单栏 -->
    <div class="top-controll-bar" v-show="ispanel">
      <span class="back" @click="$router.go(-1)">
        <i class="icon"></i>
        <i>返回</i>
      </span>
      <h1>{{readingData.title}}</h1>
      <span class="menu" @click="isMenu">
        <i class="icon"></i>
        <ul class="drop-down" v-if="isOpenMenu">
          <li>
            <router-link to="/main/bookcity" tag="a">
              <i class="menu-icon"></i>
              <span>首页</span>
            </router-link>
          </li>
          <li>
            <router-link to="/main/bookshelf" tag="a">
              <i class="menu-icon"></i>
              <span>书架</span>
            </router-link>
          </li>
          <li>
            <router-link to="/detail" tag="a">
              <i class="menu-icon"></i>
              <span>详情</span>
            </router-link>
          </li>
        </ul>
      </span>
    </div>
    <div class="bottom-controll-panel" v-show="ispanel">
      <div class="toBookShelf" @click="addBookshelf()">加入书架</div>
      <div class="item">
        <span class="btn font-btn-w" @click="reduce()">Aa-</span>
        <span class="btn progress-bar">
          <span class="content-b" :style="{'width': percent + '%'}"></span>
        </span>
        <span class="btn font-btn-w" @click="add()">Aa+</span>
      </div>
      <div class="item clearfix">
        <span
          class="btn square"
          v-for="(item,index) in squareList"
          :key="index"
          :class="item.isActive ? 'active' : ''"
          @click="toggleSquare(item,index)"
        >{{item.name}}</span>
        <!-- <span class="btn square">夜间</span>
        <span class="btn square">护眼</span>-->
      </div>
      <div class="item clearfix">
        <span class="btn chapter-btn-w fl" @click="previousChapte()">上一章</span>
        <span class="btn directory" @click="showPopup()">目录</span>
        <span class="btn chapter-btn-w mr0 fr" @click="nextChapte()">下一章</span>
      </div>
    </div>

    <!-- 显示章节列表 -->
    <van-popup v-model="show" position="left" :style="{ width:'80%',height: '100%' }">
      <div class="content">
        <div class="top-bar">
          <p>{{this.$route.query.title}}</p>
          <p>目录</p>
        </div>
        <ul class="chapter-list">
          <van-list
            class="chapter-l"
            v-model="loadOptions.isLoading"
            :finished="loadOptions.isFinished"
            :finished-text="loadOptions.finishedText"
            @load="loadData"
          >
            <li v-for="(item,index) in chapterListDatas" :key="index" @click="goReading(index)">
              <div
                class="title-c"
                :class="{current:index == currentIndex ? 'current' : ''}"
              >{{item.title}}</div>
            </li>
          </van-list>
        </ul>
      </div>
    </van-popup>
  </div>
</template>

<script>
import "../assets/css/reading.less";
export default {
  data() {
    return {
      squareList: [
        {
          name: "默认",
          isActive: true,
          backgroundColor: "#EEE6DD",
          color: "#5C5D58",
          tColor: "#333",
        },
        {
          name: "夜间",
          isActive: false,
          backgroundColor: "#0C0C0C",
          color: "#888888",
          tColor: "#888",
        },
        {
          name: "护眼",
          isActive: false,
          backgroundColor: "#B8CD8D",
          color: "#647F50",
          tColor: "#0c2e10",
        },
      ],
      //设置默认的页面背景色和字体色
      bgColor: "#EEE6DD",
      color: "#5C5D58",
      //标题默认字体大小和字体色
      titleSize: 24,
      tColor: "#333",
      //阅读页面数据
      readingData: {},
      readingDatacpContent: "",
      //默认菜单栏为隐藏
      ispanel: false,
      //默认头部菜单栏为隐藏
      isOpenMenu:false,
      //默认章节列表隐藏
      show: false,
      //获取全部章节数据
      allChapterDatas: {},
      //获取章节数据
      chapterListDatas: {},
      //chapter_id定义一个目录id获取到相应的章节
      chapter_id: "",
      loadOptions: {
        //是否处于加载状态，加载过程中不触发load事件
        isLoading: true,
        //是否完成加载所有数据
        isFinished: false,
        isFinishedText: "没有数据可加载了",
      },

      //每次加载15条数据
      loadCount: 15,
      // 默认字体大小为20
      fontsize: 20,
      // 默认滑条百分比为50
      percent: 50,
      //设置列表当前激活默认值
      currentIndex: 0,
      // 章节索引值
      chapterIndex: 0,
      cpContent: [],
    };
  },
  //created:已获取到数据，但是还没有渲染出来
  created() {
    //将目录传过来的索引值赋值给当前索引值，请求相应的章节内容
    this.currentIndex = this.$route.query.index;
    //获取阅读页面的数据
    this.getReading();
    //获取章节数据
    this.getChapterList();
    // 

  },
  methods: {
    //获取阅读详细内容
    getReading() {
       this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        //延迟自动关闭加载提示，如果该值为0，则不会自动关闭
        duration: 0
      });
      //获取章节链接数据
      //对link值进行编码 例如：encodeURIComponent(this.chapterListDatas[0].link);
      let link = encodeURIComponent(this.$route.query.link);
      this.axios({
        method: "GET",
        url: "http://novel.kele8.cn/chapters/" + link,
      })
        .then((result) => {
          this.$toast.clear();
          // 
          if (result.status == 200) {
            this.readingData = result.data.chapter;
            // 
            this.readingData.cpContent = result.data.chapter.cpContent.split(
              "\r\n"
            );
            // 
          }
        })
        .catch((err) => {
          
        });
    },

    //获取阅读章节列表
    getChapterList() {
      // 
      //根据书本id请求数据
      this.axios({
        method: "GET",
        url:
          "http://novel.kele8.cn/book-sources?view=summary&book=" +
          this.$route.query.id,
      })
        .then((result) => {
          // 
          if (result.status == 200) {
            //根据书本数据获取目录列表的id，并存储
            this.chapter_id = result.data[0]._id;
            //  

            //根据书本目录id请求章节列表数据
            this.axios({
              method: "GET",
              url: "http://novel.kele8.cn/book-chapters/" + this.chapter_id,
            })
              .then((result) => {
                
                if (result.status == 200) {
                  //缓存全部章节
                  this.allChapterDatas = result.data.chapters;
                  //先获取给定的加载数据
                  this.chapterListDatas = this.allChapterDatas.splice(
                    0,
                    this.loadCount
                  );
                  // 
                  //根据截取章节数量和总章节数量判断是否加载完成
                  if (this.allChapterDatas.length > 0) {
                    this.loadOptions.isLoading = false;
                  } else {
                    this.loadOptions.isLoading = true;
                    this.loadOptions.isFinished = true;
                  }

                  if (this.chapterListDatas.length == 0) {
                    this.loadOptions.isFinishedText = "";
                  }

                  //根据请求到章节列表获取相应的阅读内容
                  let link = encodeURIComponent(
                    this.chapterListDatas[this.currentIndex].link
                  );
                  // 
                  //请求相应章节的阅读内容
                  this.axios({
                    method: "GET",
                    url: "http://novel.kele8.cn/chapters/" + link,
                  })
                    .then((result) => {
                      this.$toast.clear();
                      // 
                      if (result.status == 200) {
                        this.readingData = result.data.chapter;
                        // 
                        this.readingData.cpContent = result.data.chapter.cpContent.split(
                          "\r\n"
                        );
                        // 
                      }
                    })
                    .catch((err) => {
                      
                    });
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
    loadData() {
      //异步更新数据
      setTimeout(() => {
        this.chapterListDatas.push(
          ...this.allChapterDatas.splice(0, this.loadCount)
        );

        //默认加载数据
        this.loadOptions.isLoading = false;
        if (this.allChapterDatas.length == 0) {
          //没有数据可加载
          this.loadOptions.isLoading = true;
          this.loadOptions.isFinished = true;
        }
      }, 1000);
    },

    //获取阅读内容
    goReading(index) {
      //点击高亮当前内容
      this.currentIndex = index;
      //获取阅读内容之后让列表隐藏
      this.show = false;
      //重新调用请求的数据
      this.getChapterList();
    },
    //点击显示隐藏菜单栏
    openMenu() {
      this.ispanel = !this.ispanel;
      // 
    },
    //点击展示章节列表
    showPopup() {
      this.show = true;
      //展开列表时隐藏菜单栏
      this.ispanel = !this.ispanel;
      this.getChapterList();
    },
    //点击显示隐藏头部菜单栏
    isMenu(){
      this.isOpenMenu = !this.isOpenMenu;
    },
    //加入书架
    addBookshelf(){
      if(localStorage.getItem("BID")){
        //把序列化成字符串的数组反序列化为数组 JSON.parse()【从一个字符串中解析出json对象】
        let Ids = JSON.parse(localStorage.getItem("BID"));
        // 
        let isAdd = Ids.find((v) =>{
          //当前已有id的时候return true否则false
          if( this.$route.query.id == v){
            this.$toast("已存在此书籍");
            return true;
          }else{
            return false;
          }
        });
        if(!isAdd){
          this.$toast("已加入书架");
          //将id加入数组前面
          Ids.unshift(this.$route.query.id);
        }
        //把Ids覆盖BookID(存储到本地需要把数据转化为字符串形式，否则会报错)
        // JSON.stringify()【从一个对象中解析出字符串】
        localStorage.setItem("BID",JSON.stringify(Ids));
        // 
      }else{
        //本地存储BookID不存在则创建key
        let Ids = [this.$route.query.id];
        // Ids.push(this.bookData._id)
        //创建一个BookID本地长期存储，将字符串化的id加入该key中
        localStorage.setItem("BID",JSON.stringify(Ids));
        
      }
    },

    //点击字体和百分比变小
    reduce() {
      //如果字体大小小于16的话，让它等于16否则就每点击一次减2
      this.fontsize = this.fontsize <= 16 ? 16 : this.fontsize - 2;
      //如果滑条百分比小于0的话，让它等于0否则就每点击一次减25
      this.percent = this.percent <= 0 ? 0 : this.percent - 25;
      this.titleSize = this.titleSize <= 20 ? 20 : this.titleSize - 2;
    },
    //点击字体变大
    add() {
      //如果字体大小大于24的话，让它等于24否则就每点击一次加2
      this.fontsize = this.fontsize >= 24 ? 24 : this.fontsize + 2;
      //如果滑条百分比大于100的话，让它等于100否则就每点击一次加25
      this.percent = this.percent >= 100 ? 100 : this.percent + 25;

      this.titleSize = this.titleSize >= 28 ? 28 : this.titleSize + 2;
    },

    //点击切换背景和字体颜色模式
    toggleSquare(item, index) {
      // 
      if (item.isActive) {
        return;
      }
      for (let i = 0; i < this.squareList.length; i++) {
        if (this.squareList[i].isActive) {
          this.squareList[i].isActive = false;
          break;
        }
      }
      this.squareList[index].isActive = true;
      //根据当前索引值，把当前激活元素的背景色和字体色赋值给页面
      this.bgColor = this.squareList[index].backgroundColor;
      this.color = this.squareList[index].color;
      this.tColor = this.squareList[index].tColor;
       //展开列表时隐藏菜单栏
      this.ispanel = !this.ispanel;
    },

    //切换上一章
    previousChapte() {
      this.currentIndex--;
      this.getChapterList();
    },
    //切换下一章
    nextChapte() {
      this.currentIndex++;
      // console.log( this.currentIndex)
      this.getChapterList();
    },

  },
 
};
</script>

<style lang="scss" scoped>
</style>