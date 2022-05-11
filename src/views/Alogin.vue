<template>
    <div class="register-wrap">
        <div class="register-form">
            <div class="form-title">管理员登录</div>
            <el-form ref="form" :model="formData" :rules="rules" class="form-content" label-width="0px">

                <el-form-item prop="username">
                  <el-input  placeholder="账号" v-model="formData.username">
                    <span slot="prepend"><i class="el-icon-user"></i></span>
                  </el-input>
                </el-form-item>

                <el-form-item prop="password">
                  <el-input placeholder="密码" type="password" v-model="formData.password"
                            @keyup.enter.native="login()">
                    <span slot="prepend"><i class="el-icon-lock"></i></span>
                  </el-input>
                </el-form-item>

                <div class="register-button" v-loading="this.$store.state.loading">
                    <el-button @click="login()" type="success">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import {adminLogin} from "@/api/user";

export default {
        name: "Alogin",
        data() {
          return {
            formData: {
              username: "",
              password: "",
              userType: "3"
            },
            rules: {
              username: [{required: true ,message: "请输入账号", trigger: "blur"}],
              password: [{required: true,  message: "请输入密码", trigger: "blur"}],
            }
          };
        },
        methods: {
          login() {
            this.$refs.form.validate(valid => {
              if (valid) {
                  adminLogin(this.formData.username,this.formData.password).then(res => {
                    if (res.code === 200){
                      if (res.result.code === 1){
                        this.$store.commit("login", res.result);
                        this.$store.commit("changeToken",res.result.token)
                        this.$router.push({ name:'container' });
                        this.$message.success(res.result.message);
                      }else {
                        this.$message.error(res.result.message);
                      }
                    }else {
                      this.$message.error("与后端服务器通信失败");
                    }
                  })
              }
            });
          }
        }
    }
</script>

<style scoped>
    .register-wrap {
        position: fixed;
        width: 100%;
        height: 100%;
        background-image: url("../assets/login-background.jpg");
        background-size: 100% 100%;
    }

    .form-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #ffffff;
        border-bottom: 1px solid #dddddd;
    }

    .register-form {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 350px;
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(0, 0, 0, 0.5);
        overflow: hidden;
    }

    .form-content {
        padding: 30px 30px;
        text-align: center;
    }

    .register-button {
        text-align: center;
    }

    .register-button button {
        width: 100%;
        height: 38px;
    }
</style>
