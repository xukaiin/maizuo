
<template>
  <div class="login">
    <div class="logo">
      <img
        src="https://assets.maizuo.com/h5/mz-auth/public/app/img/logo.19ca0be.png"
      />
    </div>
    <h1 class="ti">登录</h1>
    <el-container>
      <el-main>
        <!-- 表单 -->
        <el-form :rules="rules" :model="formData" ref="formData">
          <el-form-item label="手机号" prop="mobile">
            <div class="input">
              <el-input v-model="formData.mobile" maxlength="11"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <div class="input">
              <el-input type="password" v-model="formData.password"></el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="submitForm('formData')"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>



<script>
import { userLogin } from "@/api/api";
import axios from "../../api/http";
export default {
  //组件名字
  name: "login",
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
      formData: {
        mobile: "",
        password: "",
      },
      rules: {
        mobile: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式不正确！",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  //方法 函数写这里
  methods: {
    submitForm(formName) {
      console.log("submit");
      this.$refs[formName].validate(async (valid) => {
        console.log("valid", valid);
        if (valid) {
          console.log("valid进来了");
          let ret = await userLogin(this.formData);
          console.log(ret);
          if (ret.data.status == 200) {
            console.log("登录了！！！！");
            this.$store.commit("addmobile", ret.data.mobile);
            this.$message({
              message: "登陆成功 即将跳转个人中心",
              type: "success",
            });
            setTimeout(() => {
              this.$router.push({ path: "/center" });
            }, 3000);
          } else {
            console.log("我进入登陆失败了");
            this.$message({
              message: "用户名或密码输入错误",
            });
          }
        }
      });
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
  mounted() {},
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





<style lang="scss">
.logo {
  margin: 79px auto 40px;
  text-align: center;
  height: 60px;
  line-height: 60px;
  img {
    height: 60px;
  }
}
.ti {
  text-align: center;
  margin-bottom: 20px;
  color: #ff5f16;
  font-weight: 500;
}
html,
body {
  background-color: #fff;
  overflow: hidden;
}
.el-form-item__label:before {
  content: "" !important;
}
.el-input__inner {
  border-radius: 0;
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
.el-form-item__label {
  font-size: 20px;
  margin-left: 30px;
  color: rgb(110, 109, 109);
  padding: 0;
}
.input {
  text-align: center;
}
.el-form-item__error {
  text-align: left;
  color: #f14343;
  font-size: 13px;
  margin-left: 40px;
}
.el-button {
  line-height: 16px;
  font-size: 16px;
  border-radius: 3px;
  text-align: center;
  background-color: #ff5f16;
  height: 44px;
  color: #fff;
  border: none;
  width: 80%;
}
.el-form-item__content {
  text-align: center;
  margin-top: 30px;
}
</style>


