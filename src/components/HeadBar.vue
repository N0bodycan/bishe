<template>
    <div class="head-bar">
        <div class="head-icon">
            <i class="el-icon-fa"></i>
        </div>

        <div class="title">作业管理系统</div>

        <div class="head-right">
            <div class="head-user-area">
                <div class="user-avatar">
                    <img src="../assets/logo.png" alt="Avatar"/>
                </div>

                <el-dropdown @command="handleCommand" class="user-name" trigger="click">
                    <span class="el-dropdown-link">
                        {{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="editpwd" >修改密码</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>

      <el-dialog title="修改密码" :visible.sync="visible" :before-close="DialogClose">
        <el-form :model="password" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="原密码" prop="op">
            <el-input type="password" show-password style="width: 50%"  v-model="password.op"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="np">
            <el-input type="password" show-password style="width: 50%"  v-model="password.np"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="cp">
            <el-input type="password" show-password style="width: 50%"  v-model="password.cp"></el-input>
          </el-form-item>
        </el-form>
        <span class="dialog-footer" slot="footer">
            <el-popconfirm
                confirm-button-text='确认'
                cancel-button-text='取消'
                icon="el-icon-info"
                icon-color="red"
                title="确认添加？"
                @confirm="save"
            >
               <el-button type="primary" slot="reference">确 定</el-button>
            </el-popconfirm>
            <el-button @click="DialogClose">取 消</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
import {adminChangePassword, logout, studentChangePassword, teacherChangePassword} from "@/api/user";
import userType from "@/common/userType";

    export default {
        name: "HeadBar",
        data(){
          const validatePass = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'));
            } else {
              if (this.password.cp !== '') {
                this.$refs.ruleForm.validateField('cp');
              }
              callback();
            }
          };
          const validatePass2 = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.password.np) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          };
          return {
            visible : false,
            password: {
              op: '',
              np: '',
              cp: '',
            },
            rules: {
              op: [
                { required: true, message: '请输入密码', trigger: 'blur' },
              ],
              np: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
                { validator: validatePass, trigger: 'blur' }
              ],
              cp:[
                { required: true, message: '请确认密码', trigger: 'blur' },
                { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
                { validator: validatePass2, trigger: 'blur', required: true }
              ],

            }
          }
        },
        computed: {
            username() {
                return this.$store.state.status.username;
            },
            utype(){
              return this.$store.state.status.userType
            },
            id(){
              return  this.$store.state.status.userId
            }

        },
        methods: {
            handleCommand(command) {
                if (command === "logout") {
                  this.$message.success("注销成功");
                  logout();
                  this.$router.push("/login");
                }
                if (command === "editpwd") {
                  this.visible= true
                }
            },
        DialogClose(){
            this.$refs.ruleForm.resetFields()
            // console.log(this.$refs.upload)
            this.visible =false
          },
          save(){
            this.$refs.ruleForm.validate((valid) => {
              if (valid){
                if (this.utype === userType.student){
                  studentChangePassword(this.id,this.password.op,this.password.np).then(res=>{
                    if (res.code === 200){
                      this.$message.success(res.message)
                      setTimeout(()=>{
                        logout();
                        this.$router.push("/login");
                      },700);
                    }else {
                      this.$message.error(res.message)
                    }
                  })
                }
                if (this.utype === userType.teacher){
                  teacherChangePassword(this.id,this.password.op,this.password.np).then(res=>{
                    if (res.code === 200){
                      this.$message.success(res.message)
                      setTimeout(()=>{
                        logout();
                        this.$router.push("/login");
                      },700);
                    }else {
                      this.$message.error(res.message)
                    }
                  })
                }
                if (this.utype === userType.admin){
                  adminChangePassword(this.id,this.password.op,this.password.np).then(res=>{
                    if (res.code === 200){
                      this.$message.success(res.message)
                      setTimeout(()=>{
                        logout();
                        this.$router.push("/login");
                      },700);
                    }else {
                      this.$message.error(res.message)
                    }
                  })
                }
              }else {
                console.log('error submit!!');
                return false;
              }
            })
          }
          // getphoto(){
          //   getLoginPhoto(this.$store.state.status.username,this.$store.state.status.userType).then(res=>{
          //     if (res.result.photo !== ''){
          //       return 'http://localhost:8080/static/image/'+res.result.photo
          //     }else {
          //       return '../assets/logo.png'
          //     }
          //   })
          // }
        }
    }
</script>

<style scoped>
    .head-bar {
        position: absolute;
        top: 0;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #ffffff;
        box-sizing: border-box;
        background-color: #242f42;
    }

    .head-bar .title {
        float: left;
        width: 250px;
        line-height: 70px;
    }

    .head-icon {
        float: left;
        padding: 0 20px;
        line-height: 70px;
    }

    .head-right {
        float: right;
        padding-right: 50px;
    }

    .head-user-area {
        display: flex;
        height: 70px;
        align-items: center;
    }

    .user-name {
        margin-left: 10px;
    }

    .user-avatar {
        margin-left: 20px;
    }

    .user-avatar img {
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .el-dropdown-link {
        color: #ffffff;
        cursor: pointer;
    }
</style>
