<template>
  <div class="header">
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <!-- 没有用户名：未登录 -->
          <p v-if="!userInfo.name">
            <span>请</span>
            <!-- 声明式导航：router-link务必要有to属性 -->
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
          <!-- 登录了 -->
          <p v-else>
            <a>{{ userInfo.name }}</a>
            <a class="register" @click="loginOut">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="logo">
        <img src="@/assets/images/shangpinghui.png" alt="" />
      </div>
      <div class="search">
        <el-input placeholder="请输入内容" v-model="keyword">
          <el-button slot="append" @click="search">搜索</el-button>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      keyword: "",
    };
  },
  created() {},
  mounted() {
    this.$bus.$on("clear", () => {
      this.keyword = "";
    });
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
    register() {
      this.$router.push("/register");
      // this.$router.push({name:"register"})
    },
    search() {
      let loction = {
        name: "search",
        params: { keyword: this.keyword || undefined },
      };
      //存在query参数
      loction.query = this.$route.query;
      this.$router.push(loction);
    },
    async loginOut() {
      try {
        await this.$store.dispatch("user/loginOut");
        this.$router.push("/home")
      } catch (error) {
        alert(error.message);
      }
    },
  },
  computed: {
    ...mapState("user", ["userInfo"]),
  },
};
</script>

<style lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          a {
            cursor: pointer;
          }
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }
}
.bottom {
  width: 1200px;
  margin: 40px auto 0 auto;
  height: 111px;
  display: flex;
  justify-content: space-between;
  .el-input__inner {
    width: 490px;
    border: 2px solid red;
  }
  .el-input__inner:focus {
    border: 2px solid red;
  }
  .el-input-group__append {
    background-color: #ea4a36;
    color: white;
    border: 2px solid #ea4a36;
  }
}
</style>