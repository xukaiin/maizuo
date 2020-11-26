
<template>
  <div>
    <van-index-bar :index-list="indexList" style="z-index: 999">
      <template v-for="(item, index) in dataList">
        <van-index-anchor :index="item.index" :key="index" />
        <van-cell
          @click="aaaa(city.name, city.cityId)"
          :title="city.name"
          v-for="(city, index) in item.data"
          :key="index"
        />
      </template>
    </van-index-bar>
  </div>
</template>



<script>
import { cityListData } from "../../api/api";
export default {
  //组件名字
  name: "city",
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
      dataList: [],
      indexList: [],
      height: 0,
    };
  },
  //方法 函数写这里
  methods: {
    aaaa(name, cityId) {
      // this.eventBus.$emit("cityId", cityId);
      this.$store.commit("add", name);
      this.$store.commit("add1", cityId);
      this.$router.push(this.$router.go(-1));
    },
  },
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
  created() {
    this.eventBus.$emit("footernav", false);
  },
  //页面渲染之前
  beforeMount() {},
  //页面渲染之后
  async mounted() {
    window.scroll(0, 0);
    let ret = await cityListData();
    let cities = ret.data.data.cities;
    // console.log(city);
    var codeList = []; //ABCD
    var dataList = []; //城市信息
    var indexList = []; //城市没有的ABCD
    for (let i = 65; i <= 90; i++) {
      codeList.push(String.fromCharCode(i));
    }
    // console.log(codeList);
    codeList.forEach((element) => {
      let temArr = cities.filter(
        (ele) => ele.pinyin.substr(0, 1) == element.toLowerCase()
      );
      if (temArr.length > 0) {
        // console.log(temArr);
        dataList.push({
          index: element,
          data: temArr,
        });
        indexList.push(element);
      }
    });
    console.log(dataList);
    // console.log(indexList);
    this.dataList = dataList;
    this.indexList = indexList;
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
  updated() {},

  //组件路由守卫enter
  beforeRouteEnter(to, from, next) {
    console.log(from);
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
    next();
  },
};
</script>





<style scoped lang="scss">
.scroll {
  overflow: hidden;
}
</style>


