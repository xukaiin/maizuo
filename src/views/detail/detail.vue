
<template>
  <div class="scroll" ref="listContent" :style="{ height: height + 'px' }">
    <div v-if="!isload">
      <comloading></comloading>
    </div>
    <div v-if="isload" class="detail">
      <div class="goBack" @click="goback">
          <div>{{ film.premiereAt | timeparser }}上映</div>
          <div>{{ film.nation }} | {{ film.runtime }} 分钟</div>
          <div
            :class="[more, synopsiscss]"
            :style="{ height: ` ${height} ` }"
            ref="synopsisdom"
          >
            {{ film.synopsis }}
          </div>
          <div class="toggle" :class="srcdown" @click="down">
            <img :src="srcup" alt="" class="" />
          </div>
        </div>
        <div class="actors">
          <p>演职人员</p>
          <div class="dabox">
            <comswiper :key="film.actors.length">
              <div
                v-for="(item, index) in film.actors"
                :key="index"
                class="swiper-slide"
              >
                <div class="left">
                  <img v-lazy="item.avatarAddress" alt="" />
                  <div class="actorname">{{ item.name }}</div>
                  <div class="actorrole">{{ item.role }}</div>
                </div>
              </div>
            </comswiper>
          </div>
        </div>

        <!-- 剧照 -->

        <div class="photos" style="height: 500px">
          <p>剧照</p>
          <div class="bigbox">
            <comswiper :key="film.photos.length">
              <div
                v-for="(item, index) in film.photos"
                :key="index"
                class="swiper-slide"
              >
                <div class="left">
                  <img v-lazy="item" alt="" />
                </div>
              </div>
            </comswiper>
          </div>
        </div>
      </div>
    </div>

    <!-- 剧照 -->

    <div class="goSchedule">选座购票</div>
  </div>
</template>


<script>
import BScroll from "better-scroll";
import comloading from "../../components/comloading";
import moment from "moment";
import { filmDetail } from "../../api/api";
import comswiper from "../../components/comswiper";
export default {
  //组件名字
  name: "detail",
  //接收父组件给的东西 type是接收什么东西  default 默认值
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    color: {
      type: String,
      default: "#000",
    },
  },
  //组件注册
  components: { comloading, comswiper },
  // vue数据集中管理
  data() {
    return {
      height: 0,
      value: "1",
      synopsiscss: "",
      synopsis: "",
      height: "",
      film: {},
      filmtype: {},
      more: "",
      srcdown: "",
      srcup:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAICAMAAADHqI+lAAAAOVBMVEVHcEy9xcW9wMW9wcW////Bwca9wcW9wMW9wMW+wMW+wcW9wcXMzMy+wMa+wce9wMe9wca9wMW9wMWKU/2FAAAAEnRSTlMAH+jGBDa6/vaatcIPdlNSdckJHB8JAAAASUlEQVQIHQXBhwGDMAADMCVksQr4/2MrObYCQNkOZ2oH6DWna2Q9wG9lXLQ984V3Zm/gntlb2zNvgN/KGFkPAL0mtQNA+b4C/AGl4gJfgEWzrAAAAABJRU5ErkJggg==",
      gobacksrc:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAt1BMVEVHcEz///////////////////////////////////////////////////////////////////////////////////97e3saGxyIiYnW1tYdHh9UVVUpKiulpaXLy8s6OzyysrIiIyPx8fEeHyC/v7/5+fklJihCQ0Ntb28bHB1hYWKXl5c0NTZLS0xAQUI4ODk3ODjh4eHr6+s2Nzfq6uptbm5gYGIbHB39/f2VlZdLS0wzNDUZGhs8UYRWAAAAPHRSTlMAGHpLE3cKgEdgVnJfNBZ+cBx9A28js/6sjPvK7p+Q3pn1g/iUgfLYuvzCpeTR2eHiiIXihrvD/YCl0uTUXbEtAAABd0lEQVRIx91W13KDQAw0xnCHARuDe+/dKY7T9f/flTzghCLdMaMXj/eRnZ0T0qqUSveBim96gRWGVuCZfqW4zpCuSMGVRiFhwxEInIY+0qogUFXHHcm6IFGXEa20HaGEY1PKWlNo0KzhylZZaFFuoW8WUP5qkXdtMtrnx4dkzLn/jcgMXY7wlMpVNs+SUs4nMOylvsiME6h6rjawHmfqm/YG6aETzJY5X6V8SykHsJjmvyb9TOVoD/0R5qpElxHKLewOKGHo0tuGThdn/pPsony3A20iHPevMih92MGW9OO1Pj5Gjvqwp63sx1IT4aYLGCi6wIylXp5azuCkaiAvlgY5ZryGzUolDWKplSV6Q5jMlW1rxdIwS7zA8azu+JCWfl+KSRkBM9KEF+fro0BxGJagjPimNyJp/1et/RlNx2l1esC8f2oGDGOscYYpY4RzFgdjXSmW5Fm3JBmrmXMQcM4QzvHDObk4hx7nvGQdtaxTmnXA3zR+AH8JUdNL967cAAAAAElFTkSuQmCC",
    };
  },
  //方法 函数写这里
  methods: {
    down() {
      this.synopsiscss = this.synopsiscss ? "" : "synopsiscss";
      this.more = this.more == "more" ? "less" : "more";
      this.srcdown = this.srcdown ? "" : "srcdown";
      console.log(111);
    },
    goback() {
      console.log(111);
      this.$router.push({ name: "comingsoon" });
    },
  },
  //计算属性
  computed: {
    isload() {
      var data = this.film;
      var arr = Object.keys(data);
      return arr[0];
    },
  },
  //侦听器
  watch: {},
  //过滤器
  filters: {
    toUpcase(value) {
      return value ? value.toUpperCase() : "";
    },
    timeparser(value) {
      return moment(value * 1000).format("yyyy-MM-DD");
    },
  },
  //以下是生命周期
  //组件创建之前  new操作符桥梁函数return 之前
  beforeCreate() {},
  //组件创建之后
  created() {
    this.eventBus.$emit("footernav", false);
    this.eventBus.$emit("rocket1", "向日葵");
  },
  //页面渲染之前
  beforeMount() {},
  //页面渲染之后
  async mounted() {
    this.height = document.documentElement.clientHeight;
    console.log(this.$route.params.filmId);
    let ret = await filmDetail(this.$route.params.filmId);
    // console.log(ret.data.data.film);
    this.film = ret.data.data.film;
    this.filmtype = ret.data.data.film.item;
    // this.synopsis = ret.data.data.film.synopsis;
    // var arr = this.synopsis.split("");
    await this.$refs.synopsisdom;
    // let height = Math.ceil(arr.length / 25) * 16.6;
    let height = this.$refs.synopsisdom.offsetHeight;
    this.height = height + "px";
    this.synopsiscss = "synopsis";
    console.log(this.film);
  },
  //页面销毁之前
  beforeDestroy() {},
  //页面销毁之后
  destroyed() {
    this.eventBus.$emit("footernav", true);
  },
  //页面视图数据更新之前
  beforeUpdate() {},
  //页面视图数据更新之后
  updated() {
    // if (!this.bs) {
    //   this.bs = new BScroll(".scroll", {
    //     click: true,
    //   });
    // } else {
    //   this.bs.refresh();
    // }
    if (!this.bs) {
      this.bs = new BScroll(".scroll", {
        pullUpLoad: true,
        // 激活下滑的事件监听
        pullDownRefresh: false,
        // 它会禁止一些浏览器的事件
        click: true,
        // pullUpLoad: {
        //   threshold: -20,
        // },
      });
    } else {
      //如果已经有了 new BScroll给的全部能力 我就不继续 new 新的了 以防止重新渲染容器
      //this.bs.refresh()意思是  正常运转 已有的容器
      this.bs.refresh();
    }
  },
  //组件路由守卫enter
  beforeRouteEnter(to, from, next) {
    next((vm) => {});
    // 注意，在路由进入之前，组件实例还未渲染，所以无法获取this实例，只能通过vm来访问组件实例
  },
  //组件路由守卫update更新
  beforeRouteUpdate(to, from, next) {
    // 同一页面，刷新不同数据时调用，
    next();
  },
  //组件路由守卫离开
  beforeRouteLeave(to, from, next) {
    // 离开当前路由页面时调用
    next();
  },
};
</script>





<style scoped lang="scss">
.detail {
  margin-bottom: 200px;
  .img {
    width: 100%;
    height: 56vw;
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      display: block;
      position: absolute;
      transform: translateY(-50%);
      top: 50%;
    }
  }
  .film-detail {
    padding: 15px;
    padding-top: 12px;
    background-color: #fff;
    box-sizing: border-box;
    div {
      font-size: 13px;
      color: #797d82;
      margin-top: 4px;
    }
    div:nth-of-type(1) {
      .name {
        color: #191a1b;
        font-size: 18px;
        height: 24px;
        line-height: 24px;
        margin-right: 7px;
      }
      .type {
        font-size: 9px;
        color: #fff;
        background-color: #d2d6dc;
        height: 14px;
        line-height: 14px;
        padding: 0 2px;
        border-radius: 2px;
      }
    }
    .synopsis {
      margin-top: 10px;
      height: 35px !important;
      overflow: hidden;
    }
    div:nth-of-type(6) {
      text-align: center;
      display: block;
      height: auto;
      width: 20px;
      margin: auto;
      line-height: normal;
      img {
        width: 8px;
        margin: auto;
        text-align: center;
      }
    }
  }
  .actors {
    margin-top: 10px;
    background-color: #fff;

    p {
      font-size: 16px;
      text-align: left;
      color: #191a1b;
      height: 22.5px;
      line-height: 22px;
      padding: 15px;
    }
    img {
      width: 80px;
    }
  }
  .swiper-slide {
    img {
      width: 80px;
    }
  }
  .left {
    padding-left: 10px;
  }

  .actorname {
    text-align: center;
    padding-top: 5px;
    font-size: 12px;
    color: #191a1b;
    width: 85px;
    height: 18px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .actorrole {
    width: 85px;
    height: 18px;
    text-align: center;
    font-size: 10px;
    color: #797d82;
  }
}
.more {
  margin-top: 10px !important;
  overflow: hidden;
  transition: height 0.5s ease;
}
.less {
  margin-top: 10px !important;
  overflow: hidden;
  height: 35px !important;
  transition: height 0.5s ease;
}
.srcdown {
  margin-top: 6px !important;
  transform: rotate(180deg);
}
.scroll {
  overflow: hidden;
}
.grade {
  float: right;
  color: #ffb232;
  text-align: right;
  span:nth-of-type(1) {
    font-size: 18px;
    font-style: italic;
  }
  span:nth-of-type(2) {
    font-size: 10px;
  }
}
.goSchedule {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 49px;
  width: 100%;
  text-align: center;
  background-color: #ff5f16;
  color: #fff;
  font-size: 16px;
  line-height: 49px;
  box-sizing: border-box;
  z-index: 999;
}
.goBack {
  height: 30px;
  position: absolute;
  top: 5px;
  left: 5px;
  box-sizing: border-box;
  z-index: 998;
  img {
    width: 30px;
  }
}
</style>


