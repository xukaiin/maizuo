
<template>
  <div>
    <div>
      <comcinemanav></comcinemanav>
    </div>

    <!-- 影院列表 -->
    <div>
      <div v-if="!isloading" class="loading">
        <comloading></comloading>
      </div>

      <div v-if="isloading">
        <ul class="cinemalist">
          <li v-for="(item, index) in cinemalist" :key="index">
            <div class="info">
              <p class="cinemaname">{{ item.name }}</p>
              <p class="address">{{ item.address }}</p>
            </div>
            <div class="price">
              <span class="lowprice"
                ><span style="font-size: 11px">￥</span>
                <span class="rmb" style="font-size: 15px">{{
                  item.lowPrice | price
                }}</span>
                <span class="upon">起</span>
              </span>
              <span class="postiton">{{ item.Distance | distance }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>



<script>
import comloading from "../../components/comloading";
import { cinemaListData } from "../../api/api";
import comcinemanav from "../../components/comcinemanav";
export default {
  //组件名字
  name: "cinema",
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
  components: { comcinemanav, comloading },
  // vue数据集中管理
  data() {
    return {
      value: "1",
      cinemalist: "",
      cityId: this.$store.state.cityId,
    };
  },
  //方法 函数写这里
  methods: {},
  //计算属性
  computed: {
    isloading() {
      return this.cinemalist[0];
    },
  },
  //侦听器
  watch: {},
  //过滤器
  filters: {
    toUpcase(value) {
      return value ? value.toUpperCase() : "";
    },
    price(value) {
      return parseFloat(value / 100);
    },
    distance(value) {
      return value.toFixed(2) + "KM";
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
    let ret = await cinemaListData(this.cityId);
    this.cinemalist = ret.data.data.cinemas;
    console.log(ret.data.data.cinemas);
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
.cinemalist {
  margin-top: 44px;
  padding-bottom: 50px;
  li {
    position: relative;
    background-color: #fff;
    padding: 15px;
  }
  .info {
    width: calc(100% - 65px);
    text-align: left;
    padding-right: 15px;
    p {
      display: block;
      max-width: 80%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .cinemaname {
      color: #191a1b;
      font-size: 15px;
    }
    .address {
      color: #797d82;
      font-size: 12px;
      margin-top: 5px;
    }
  }
  .price {
    font-size: 15px;
    color: #ff5f16;
    float: right;
    margin-top: -40px;
    .rmb {
      margin-right: 5px;
    }
    .upon {
      font-size: 10px;
    }
    .postiton {
      font-weight: 400;
      display: block;
      margin-top: 5px;
      font-size: 11px;
      color: #797d82;
      text-align: right;
    }
  }
}
.loading {
  margin-top: 50px;
  z-index: 999;
}
</style>


