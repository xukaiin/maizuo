
<template>
  <div>
    <div class="logo">
      <img
        src="https://assets.maizuo.com/h5/mz-auth/public/app/img/logo.19ca0be.png"
      />
    </div>
    <h1 class="ti">注册</h1>
    <div class="title">手机号</div>
    <div class="input">
      <input type="text" ref="mobile" maxlength="11" />
      <div class="err1" ref="err1">请输入手机号</div>
      <div class="err2" ref="err2">请输入正确的手机号</div>
      <br />
    </div>
    <div class="title">密码</div>
    <div class="input">
      <input type="text" maxlength="12" ref="password" />
      <div class="err3" ref="err3">请输入6-12位密码</div>
      <div class="err4" ref="err4">请输入密码</div>
      <br />
    </div>

    <div class="submit">
      <button @click="dianjizhuce">点击注册</button>
    </div>
  </div>
</template>



<script>
import axios from "../../api/http";
export default {
  //组件名字
  name: "register",
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
      mobile: "",
      password: "",
      mobilereg: false,
      passwordreg: false,
    };
  },
  //方法 函数写这里
  methods: {
    dianjizhuce() {
      if (this.mobilereg && this.passwordreg) {
        console.log(this.mobile, this.password);
        axios
          .post("http://localhost:3005/register", {
            mobile: this.mobile,
            password: this.password,
          })
          .then((data) => {
            console.log(data);
            if (data.data.code == "200") {
              console.log("sueecss");
              this.$message({
                message: "注册成功",
                type: "success",
              });
            } else {
              this.$message.error("注册失败");
              console.log("failed");
            }
          });
      }
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
  mounted() {
    this.$refs.mobile.addEventListener("blur", () => {
      this.mobilereg = false;
      this.$refs.err1.style.display = "none";
      this.$refs.err2.style.display = "none";
      let value = this.$refs.mobile.value;
      let reg = /^1[3-9]\d{9}$/;
      if (value == "") {
        this.$refs.err1.style.display = "block";
      } else if (!reg.test(value)) {
        this.$refs.err2.style.display = "block";
      } else {
        this.mobilereg = true;
        this.mobile = value;
        console.log(this.moblie);
      }
    });
    this.$refs.password.addEventListener("blur", () => {
      this.passwordreg = false;
      this.$refs.err3.style.display = "none";
      this.$refs.err4.style.display = "none";
      let value = this.$refs.password.value;
      console.log(this.$refs.password.value);
      if (value == "") {
        this.$refs.err4.style.display = "block";
      } else if (value.length < 6) {
        this.$refs.err3.style.display = "block";
      } else {
        this.passwordreg = true;
        this.password = value;
        console.log(this.password);
      }
    });
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





<style lang="scss" scope>
.logo {
  margin: 79px auto 40px;
  text-align: center;
  height: 60px;
  line-height: 60px;
  img {
    height: 60px;
  }
}
.input {
  text-align: center;
}
input {
  height: 15px;
  margin-bottom: 15px;
  line-height: 15px;
  padding: 15px 0;
  width: 80%;
  font-size: 20px;
  color: #656566;
  border: 0;
  outline-width: 0;
  border-bottom: 1px solid #ff5f16;
}
body,
html {
  background-color: #fff;
  overflow: hidden;
}
.ti {
  text-align: center;
  margin-bottom: 40px;
  color: #ff5f16;
  font-weight: 500;
}
.title {
  font-size: 20px;
  margin-left: 30px;
  color: rgb(110, 109, 109);
}
.submit {
  margin-top: 70px;
  text-align: center;
}
button {
  line-height: 45px;
  font-size: 16px;
  border-radius: 3px;
  text-align: center;
  background-color: #ff5f16;
  height: 44px;
  color: #fff;
  border: none;
  width: 80%;
}
.err1,
.err2,
.err3,
.err4 {
  text-align: left;
  color: rgb(241, 67, 67);
  font-size: 13px;
  margin-left: 40px;
  display: none;
}
</style>


