
<template>
  <div>
    <div v-if="!isload">
      <comloading></comloading>
    </div>
    <div v-if="isload">
      <div class="detail">
        <div class="img">
          <img :src="film.poster" />
        </div>
        <div class="film-detail">
          <div>
            <span class="name">{{ film.name }}</span>
            <!-- <span class="type">{{ filmtype.name }}</span> -->
            <span class="type">{{ filmtype.name }}</span>
          </div>
          <div>{{ film.category }}</div>
          <div>{{ film.premiereAt | timeparser }}上映</div>
          <div>{{ film.nation }} | {{ film.runtime }} 分钟</div>
          <div :class="[more, synopsiscss]" :style="{ height: ` ${height} ` }">
            {{ film.synopsis }}
          </div>
          <div class="toggle" :class="srcdown" @click="down">
            <img :src="srcup" alt="" class="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import comloading from "../../components/comloading";
import moment from "moment";
import { filmDetail } from "../../api/api";
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
  components: { comloading },
  // vue数据集中管理
  data() {
    return {
      value: "1",
      synopsiscss: "synopsis",
      synopsis: "",
      height: "",
      film: {},
      filmtype: {},
      more: "",
      srcdown: "",
      srcup:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAICAMAAADHqI+lAAAAOVBMVEVHcEy9xcW9wMW9wcW////Bwca9wcW9wMW9wMW+wMW+wcW9wcXMzMy+wMa+wce9wMe9wca9wMW9wMWKU/2FAAAAEnRSTlMAH+jGBDa6/vaatcIPdlNSdckJHB8JAAAASUlEQVQIHQXBhwGDMAADMCVksQr4/2MrObYCQNkOZ2oH6DWna2Q9wG9lXLQ984V3Zm/gntlb2zNvgN/KGFkPAL0mtQNA+b4C/AGl4gJfgEWzrAAAAABJRU5ErkJggg==",
    };
  },
  //方法 函数写这里
  methods: {
    down() {
      this.synopsiscss = this.synopsiscss ? "" : "synopsiscss";
      this.more = this.more == "more" ? "less" : "more";
      this.srcdown = this.srcdown ? "" : "srcdown";
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
  created() {},
  //页面渲染之前
  beforeMount() {},
  //页面渲染之后
  async mounted() {
    console.log(this.$route.params.filmId);
    let ret = await filmDetail(this.$route.params.filmId);
    // console.log(ret.data.data.film);
    this.film = ret.data.data.film;
    this.filmtype = ret.data.data.film.item;
    this.synopsis = ret.data.data.film.synopsis;
    var arr = this.synopsis.split("");
    let height = Math.ceil(arr.length / 25) * 17;
    this.height = height + "px";
  },
  //页面销毁之前
  beforeDestroy() {},
  //页面销毁之后
  destroyed() {},
  //页面视图数据更新之前
  beforeUpdate() {},
  //页面视图数据更新之后
  updated() {},
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
}
.more {
  margin-top: 10px;
  overflow: hidden;

  transition: height 0.5s ease;
}
.less {
  margin-top: 10px;
  overflow: hidden;

  height: 35px !important;
  transition: height 0.5s ease;
}
.srcdown {
  transform: rotate(180deg);
}
</style>


