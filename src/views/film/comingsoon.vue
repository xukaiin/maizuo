
<template>
  <div>
    <!-- <h1>nowplaying</h1> -->
    <comcomingsoonlist
      v-if="flag"
      :list1="list1"
      :type="type"
    ></comcomingsoonlist>
    <div>
      <!-- <h3 v-for="(item, index) in arr" :key="index">{{ item }}</h3> -->
      <!-- <h3 v-for="(value, key, index) in obj" :key="index">{{ value }}</h3> -->
      <!-- <h3 v-for="(item, index) in items" :key="index">
        {{item.name}}
        <h3 v-for="itemm in item.item2" :key="itemm.id">{{ itemm.text }}</h3>
      </h3> -->
    </div>
  </div>
</template>



<script>
import comcomingsoonlist from "@/components/comcomingsoonlist";
import { comingsoonListData } from "@/api/api";

export default {
  //组件名字
  name: "nowplaying",
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
  components: { comcomingsoonlist },
  // vue数据集中管理
  data() {
    return {
      flag: true,
      list1: [],
      page: 1,
      type: 1,
    };
  },
  //方法 函数写这里
  methods: {},
  //计算属性
  computed: {},
  //侦听器
  watch: {},
  //过滤器
  filters: {
    toUpcase(value) {
      return value ? value.toUpperCase() : "";
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
    let ret = await comingsoonListData(this.page);
    this.list1 = ret.data.data.films;
    // console.log(ret.data.data.films);
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
</style>


