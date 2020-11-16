
<template>
  <div id="nav">
    <ul>
      <router-link to="/film" active-class="active" tag="li">
        <i class="iconfont icon-dianying1"></i>
        <p>电影</p>
      </router-link>
      <router-link to="/cinema" active-class="active" tag="li">
        <i class="iconfont icon-yingyuan"></i>
        <p>影院</p>
      </router-link>
      <router-link to="/center" active-class="active" tag="li">
        <i class="iconfont icon-wode1"></i>
        <p>我的</p></router-link
      >
    </ul>
  </div>
</template>



<script>
//引入iconfont
import "../assets/iconfont/iconfont.css";
export default {
  //组件名字
  name: "comfootnav",
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
  components: {},
  // vue数据集中管理
  data() {
    return {
      value: "1",
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
  mounted() {},
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





<style lang="scss" scoped>
#nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
}
ul {
  display: flex;
  padding-bottom: 5px;
  background-color: #fff;
  li {
    flex: 1;
    height: 43px;
    margin-top: 5px;
  }
  p {
    margin-top: 2px;
  }
  i {
    font-size: 20px;
  }
}
.active {
  color: #fe5100;
}
</style>


