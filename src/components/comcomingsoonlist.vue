
<template>
  <div>
    <comloading v-if="!flag"></comloading>
    <div v-if="flag" class="content">
      <div class="item" v-for="(item, index) in list1" :key="index">
        <div class="left">
          <img :src="item.poster" />
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
          <div>上映日期: {{ item.premiereAt | date }}</div>
        </div>
        <div class="right">
          <span>预购</span>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import comloading from "@/components/comloading.vue";
import moment from "moment";
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
  },
  //组件注册
  components: { comloading },
  // vue数据集中管理
  data() {
    return {
      value: "1",
    };
  },
  //方法 函数写这里
  methods: {},
  //计算属性
  computed: {
    flag() {
      //   console.log("computed in filmlist");
      console.log(this.list1);
      return this.list1[0];
    },
  },
  //侦听器
  watch: {},
  //过滤器
  filters: {
    toUpcase(value) {
      return value ? value.toUpperCase() : "";
    },
    //时间戳
    // formatDate(timestamp) {
    //   var weekarr = ["日", "一", "二", "三", "四", "五", "六"];
    //   var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    //   var M =
    //     date.getMonth() + 1 < 10
    //       ? "0" + (date.getMonth() + 1)
    //       : date.getMonth() + 1;
    //   var D = date.getDate();
    //   var W = weekarr[date.getDay()] + " ";
    //   return "周" + W + M + "月" + D + "日";
    // },
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
    // console.log("mounted in filmlist");
    console.log(this.list1);
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
.content {
  padding-bottom: 100px;
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

    span {
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
</style>


