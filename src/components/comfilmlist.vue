
<template>
  <div
    class="list scroll"
    :style="{ height: height + 'px' }"
    style="background: #fff"
  >
    <comloading v-if="!flag"></comloading>
    <div v-if="flag" class="content">
      <div
        class="item"
        v-for="(item, index) in data"
        :key="index"
        @click="todetail(item.filmId)"
      >
        <div class="left">
          <img v-lazy="item.poster" />
        </div>
        <div class="middle">
          <div>
            <span>{{ item.name }} </span>
            <span class="filmTypeName"> {{ item.filmType.name }}</span>
          </div>
          <div>
            <span v-if="item.grade">观众评分</span>
            <span class="grade">{{ item.grade }}</span>
          </div>
          <div>
            主演:
            <span v-for="(items, index) in item.actors" :key="index"
              >{{ items.name }}
            </span>
          </div>
          <div v-if="type == 1">{{ item.nation }} | {{ item.runtime }}分钟</div>
          <div v-else>上映日期: {{ item.premiereAt | date }}</div>
        </div>
        <div class="right">
          <span v-if="type == 1" class="buynow">购票</span>
          <span v-else class="earlybuy">预购</span>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import moment from "moment";
import BScroll from "better-scroll";
import { nowplayingListData, comingsoonListData } from "@/api/api";
import comloading from "@/components/comloading.vue";
export default {
  //组件名字
  name: "filmlist",
  //接收父组件给的东西 type是接收什么东西  default 默认值
  props: {
    list1: {
      type: Array,
      default() {
        return [];
      },
    },
    color: {
      type: String,
      default: "#000",
    },
    type: {
      type: Number,
      default: "1",
    },
  },
  //组件注册
  components: { comloading },
  // vue数据集中管理
  data() {
    return {
      value: "1",
      data: [],
      height: 0,
      moreflag: true,
      page: 1,
      bs: null,
    };
  },
  //方法 函数写这里
  methods: {
    todetail(filmId) {
      console.log(filmId);
      this.$router.push({ name: "detail", params: { filmId } });
    },
    async getData() {
      // console.log("getdata in filmlist");
      if (this.moreflag) {
        this.page++;
        if (this.type == 1) {
          var ret = await nowplayingListData(this.page);
          // console.log(this.page);
          // console.log(ret.data.data.films);
        } else {
          var ret = await comingsoonListData(this.page);
        }
        if (ret.data.data.films.length < 10) {
          this.flag = this.moreflag;
        }
        // console.log(ret);
        this.data = this.data.concat(ret.data.data.films);
      }
    },
  },
  //计算属性
  computed: {
    flag() {
      // console.log("computed in filmlist");
      console.log(this.list1);
      return this.list1[0];
    },
  },
  //侦听器
  watch: {
    list1: function () {
      this.data = this.list1;
    },
  },
  //过滤器
  filters: {
    toUpcase(value) {
      return value ? value.toUpperCase() : "";
    },
    date(value) {
      moment.locale("zh-cn");
      return moment(value * 1000).format("ddd MMMDo");
    },
  },
  //以下是生命周期
  //组件创建之前  new操作符桥梁函数return 之前
  beforeCreate() {},
  //组件创建之后
  created() {},
  //页面渲染之前
  beforeMount() {},
  //页面渲染之后 `
  mounted() {
    // window.addEventListener(
    //   "scroll",
    //   () => {
    //     console.log(document.documentElement.offsetHeight);
    //   },
    //   true
    // ),
      // console.log("mounted in filmlist");
      console.log(this.list1);
    this.height = document.documentElement.clientHeight - 100;
  },
  //页面销毁之前
  beforeDestroy() {},
  //页面销毁之后
  destroyed() {},
  //页面视图数据更新之前
  beforeUpdate() {},
  //页面视图数据更新之后
  updated() {
    //new 得到better scroll的全部能力
    this.bs = new BScroll(".scroll", {
      pullUpLoad: true,
      // 激活下滑的事件监听
      pullDownRefresh: true,
      // 它会禁止一些浏览器的事件
      click: true,
    });
    this.bs.on("pullingUp", () => {
      // 获取数据
      this.getData();
      this.bs.finishPullUp();
    });
    this.bs.on("pullingDown", () => {
      // 获取数据
      this.getData();
      //这一步停止当前这一步 下拉刷新  刷新一次够了  要不服务器受不了
      this.bs.finishPullDown();
    });
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
.content {
  padding-bottom: 50px;
}
.item {
  margin-top: 15px;
  padding-bottom: 15px;
  display: flex;
  color: #797d82;
  font-size: 13px;
  border-bottom: 1px solid #ededed;

  .left {
    width: 66px;
    height: 94px;
    margin-left: 10px;
    margin-right: 10px;
    img {
      width: 66px;
      height: 100%;
    }
  }

  .middle {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 55%;
    .filmTypeName {
      font-size: 9px;
      color: #fff;
      background-color: #d2d6dc;
      height: 14px;
      line-height: 14px;
      padding: 0 2px;
      border-radius: 2px;
    }
    div:nth-of-type(1) {
      color: #191a1b;
      font-size: 16px;
    }

    div:nth-of-type(3) {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .right {
    width: 15%;
    display: flex;
    align-items: center;
    margin-right: 20px;

    .buynow {
      border: 1px solid #ff5f16;
      background: white;
      color: #ff5f16;
      border-radius: 2px;
      height: 25px;
      line-height: 25px;
      font-size: 13px;
      width: 50px;
      text-align: center;
    }
    .earlybuy {
      border: 1px solid #ffb232;
      background: white;
      color: #ffb232;
      border-radius: 2px;
      height: 25px;
      line-height: 25px;
      font-size: 13px;
      width: 50px;
      text-align: center;
    }
  }
}
.scroll {
  overflow: scroll;
}
</style>


