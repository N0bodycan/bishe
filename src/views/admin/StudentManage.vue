<template>
  <div class="home-wrap">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-fa fa-home"></i> 学生管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <el-button @click="addV = true" icon="el-icon-plus" type="primary">添加学生</el-button>
      <div class="query-form">
        <el-row :gutter="20">
          <el-col :offset="15" :span="3">
            <el-input @keyup.enter.native="handlePageChange(1)" onkeyup="value=value.replace(/[^\d]/g,'')"
                      placeholder="学号" v-model="queryForm.username"/>
          </el-col>
          <el-col :span="3">
            <el-input @keyup.enter.native="handlePageChange(1)" placeholder="姓名" v-model="queryForm.name"/>
          </el-col>
          <el-col :span="3">
            <el-button @click="handlePageChange(1)" icon="el-icon-search" type="primary">搜索</el-button>
          </el-col>
        </el-row>
      </div>

      <div>
        <p></p>
      </div>

      <el-row justify="center" type="flex">
        <el-pagination
            :current-page.sync="pageIndex"
            :page-sizes="[5,10,15,20]"
            :page-size="pageSize"
            :total="total"
            @current-change="handlePageChange"
            @size-change="handleSizeChange"
            background
            layout="total,sizes,prev, pager, next"
        >
        </el-pagination>
      </el-row>

      <div>
        <p></p>
      </div>

      <div class="table">
        <el-table :data="tableData"
                  stripe>
          <el-table-column label="学号" prop="username" sortable/>
          <el-table-column label="姓名" prop="name" sortable/>
          <el-table-column label="性别" prop="gender"/>
          <el-table-column label="电话号码" prop="phone" />
          <el-table-column label="班级" prop="clazz" />
          <el-table-column label="照片"  width="150px">
            <template slot-scope="scope" v-if="scope.row.photo">
                <img
                    class="el-upload-list__item-thumbnail"
                    :src="'http://localhost:8080/static/image/'+scope.row.photo" alt=""
                    width="70px"
                >
            </template>

          </el-table-column>
          <el-table-column align="center" label="操作" width="200px">
            <template slot-scope="scope">
              <el-popconfirm
                  confirm-button-text='确认'
                  cancel-button-text='取消'
                  icon="el-icon-info"
                  icon-color="red"
                  title="确认重置？"
                  @confirm="resetPassword(scope.row.username)"
              >
                <el-button slot="reference" size="mini" type="warning">
                  重置密码
                </el-button>

              </el-popconfirm>
              <p></p>
              <el-popconfirm
                  confirm-button-text='确认'
                  cancel-button-text='取消'
                  icon="el-icon-info"
                  icon-color="red"
                  title="确认删除？"
                  @confirm="deleteStudent(scope.row.username)"
              >
                <el-button slot="reference" size="mini" type="danger">
                  删除学生
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog :before-close="addDialogClose" :visible.sync="addV" title="添加学生" width="50%">
        <el-form :model="entityForm" :rules="rules" ref="ruleForm" label-width="82px" class="demo-ruleForm">
          <el-form-item label="学号" prop="username">
            <el-input v-model="entityForm.username"></el-input>
          </el-form-item>
          <el-form-item label="登录密码" prop="password">
            <el-input type="password" placeholder="默认为学号" v-model="entityForm.password"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="entityForm.name"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="entityForm.gender">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="班级" prop="clazz">
            <el-select v-model="entityForm.clazz" placeholder="请选择班级">
              <el-option :key="index" v-for="(value,index) in clazz" :label="value.clazzName" :value="value.clazzId"/>
            </el-select>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="entityForm.phone"></el-input>
          </el-form-item>

          <el-form-item label="两寸照片">
            <el-upload
                ref="upload"
                action="#"
                :http-request="uploadpic"
                list-type="picture-card"
                :auto-upload="false"
                :limit="1"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
            >
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url" alt=""
                >
                <span class="el-upload-list__item-actions">
        <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
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
            <el-button @click="addDialogClose">取 消</el-button>
        </span>
      </el-dialog>
    </div>

  </div>

</template>

<script>
import * as studentmApi from "@/api/admin/studentm";
import * as clazzmApl from "@/api/admin/clazzm";
import * as picApi from "@/api/admin/file";
import { isvalidPhone } from '@/utils/validate'
import {deleteStudent, resetPassword} from "@/api/admin/studentm";
// import Config from "@/common/config";
export default {
  name: "StudentManage",
  data() {
    const validPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入电话号码'))
      } else if (!isvalidPhone(value)) { //判断用户输入的值是否符合规则
        callback(new Error('请输入正确的11位手机号码'))
      } else {
        callback()
      }
    }
    return {
      queryForm: {
        username: "",
        name: ""
      },
      clazz: [],
      entityForm: {
        username: '',
        password: '123456',
        clazz:'',
        name: '',
        phone: '',
        gender: '',
        photo: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入学生学号', trigger: 'blur' },
          { min: 8, max: 8, message: '学号为八位数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '请输入6 - 12位字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入学生姓名', trigger: 'blur' },
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'blur' },
        ],
        clazz: [
          { required: true, message: '请选择班级', trigger: 'blur' },
        ],
        phone: [
          { required: true, trigger: 'blur', validator: validPhone }
        ]
      },

      tableData: [],
      pageSize: 5,
      total: 0,
      pageIndex: 1,

      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      addV: false
    };
  },
  methods: {
    query() {
      studentmApi.getPage(this.pageIndex,this.pageSize).then(res =>{
        this.total = res.result.total;
        this.tableData = res.result.data
        // console.log(res.result.data)
      })
    },
    handlePageChange(pageIndex) {
      studentmApi.getPage(pageIndex,this.pageSize,this.queryForm.username,this.queryForm.name).then(res => {
        this.total = res.result.total;
        this.tableData = res.result.data
      });
    },
    handleSizeChange(pageSize){
      studentmApi.getPageSize(pageSize,this.queryForm.username,this.queryForm.name).then(res=>{
        this.total = res.result.total;
        this.tableData = res.result.data
      })
    },
    addStudent() {
      this.addV = true;
      // homeworkApi.getHomework(homeworkId).then(res => {
      //   this.entityForm = res;
      //   this.editing = true;
      // })
    },
    uploadpic(param){
      console.log(param.file)
      let fileObj = param.file // 相当于input里取得的files
      let fd = new FormData()// FormData 对象
      let Str=fileObj.name.lastIndexOf(".");
      this.entityForm.photo = this.entityForm.username + 'pic'+ fileObj.name.substring(Str,fileObj.name.length);
      fd.append('file', fileObj)// 文件对象
      fd.append("picname",this.entityForm.username)
      picApi.uploadPic(fd).then(res=>{
        console.log(res)
        // if(res.code===0){
        //   // this.submitForm();//提交表单
        // }
      })
    }
    ,
    save() {
      // console.log("queren")

      this.$refs.ruleForm.validate((valid) => {
            if (valid) {
              // console.log(this.entityForm)
              studentmApi.existStudent(this.entityForm.username).then(res=> {
                if (res.code === 200){
                  this.$refs.upload.submit()
                  studentmApi.addStudent(this.entityForm).then(res => {
                    if (res.result.code === '1'){
                      this.$message.success(res.result.message)
                      this.addDialogClose()
                    }else if (res.result.code === '0'){
                      this.$message.error(res.result.message)
                      // this.addDialogClose()
                    }else {
                      this.$message.error(res.result.message)
                      // this.addDialogClose()
                    }
                  })
                }else{
                  this.$message.error(res.message)
                }
              })
            } else {
              console.log('error submit!!');
              return false;
            }
      })
      // this.$refs.upload.submit();
      // console.log(this.entityForm)
      // this.$refs.ruleForm.validate((valid) => {
      //   if (valid) {
      //     this.$refs.upload.submit()
      //   } else {
      //     return false;
      //   }
      // })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/gif');
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG,JPEG,PNG,GIF 格式!');
        this.entityForm.photo = ""
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!');
        this.entityForm.photo = ""
      }
      return isJPG && isLt2M;
    },
    handleRemove(file) {
      console.log(file);
      // console.log(this.$refs.upload.getFile(file))
      this.$refs.upload.clearFiles()
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    addDialogClose(){
      this.$refs.ruleForm.resetFields()
      this.$refs.upload.clearFiles()
      // console.log(this.$refs.upload)
      this.addV =false
    },

    resetPassword(username){
      // console.log("chongzhi",username)
      resetPassword(username).then(res => {
        if (res.code === 200){
          this.$message.success(username+"  重置成功")
        }else {
          this.$message.success(username+res.message)
        }
      })
    },

    deleteStudent(username){
      deleteStudent(username).then(res=>{
        if (res.code === 200 ){
          this.$message.success(res.message)
        }else{
          this.$message.error(res.message)
        }
      })
    }
  },


  created() {
    this.query();
    clazzmApl.getAllClazz().then(res => {
      // this.clazz =  eval('(' + res.result+ ')');
      this.clazz =   res.result
      // console.log(this.clazz)
    })
  }
}
</script>

<style scoped>
.home-wrap {
  width: 100%;
  height: 100%;
}
.main-wrap {
  width: 100%;
  height: 100%;
  margin-top: 10px;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 5px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.mybutton{
  margin-left: 3px;
}
</style>
