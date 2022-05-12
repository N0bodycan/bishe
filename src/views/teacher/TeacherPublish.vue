<template>
  <div class="home-wrap">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-fa fa-home"></i> 发布作业
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="学科">
          <el-input style="width: 50%" disabled v-model="ruleForm.course"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="clazzId">
          <el-select v-model="ruleForm.clazzId" placeholder="请选择班级">
            <el-option :key="index" v-for="(value,index) in clazz" :label="value.clazzName" :value="value.clazzId"/>
          </el-select>
        </el-form-item>
        <el-form-item label="作业时间" required>
          <el-date-picker
              style="width: 50%;"
              v-model="ruleForm.time"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss "
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="作业类型" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择作业类型">
            <el-option label="提交文本" value="0"></el-option>
            <el-option label="提交文件或图片" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="上传文件">
          <el-upload
              ref="upload"
              action="#"
              :http-request="uploadfile"
              :auto-upload="false"
              :limit="1"
              :before-upload="beforeUpload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item label="作业内容" prop="text">
          <el-input style="width: 50%" type="textarea"  :autosize="{ minRows: 8, maxRows: 16}" v-model="ruleForm.text"></el-input>
        </el-form-item>

        <el-form-item>
          <el-popconfirm
              confirm-button-text='确定'
              cancel-button-text='取消'
              icon="el-icon-info"
              icon-color="red"
              title="确认发布？"
              @confirm="submitForm('ruleForm')"
          >
            <el-button slot="reference" type="primary">立即发布</el-button>
          </el-popconfirm>

          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import {getTeacher, getTeacherClazz, publishHomework} from "@/api/teacher/homework";
import * as fileApi from "@/api/admin/file";

export default {
  name: "TeacherPublish",
  data() {
    return {
      ruleForm: {
        course: '',
        clazzId: '',
        teacherId: '',
        time:[],
        type: '',
        filename: '',
        text: ''
      },
      rules: {
        clazzId: [
          { required: true, message: '请选择班级', trigger: 'blur' }
        ],
        type: [
          {required: true, message: '请选择作业类型', trigger: 'blur' }
        ],
        text: [
          { required: true, message: '请填写作业内容', trigger: 'blur' }
        ]
      },

      clazz: []
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs.upload.submit();
          const howework = {
            course: this.ruleForm.course,
            clazzId: this.ruleForm.clazzId,
            teacherId: this.ruleForm.teacherId,
            stime: this.ruleForm.time[0],
            etime: this.ruleForm.time[1],
            type: this.ruleForm.type,
            filename: this.ruleForm.filename,
            text: this.ruleForm.text
          };
          publishHomework(howework).then(res =>{
            if (res.code === 200){
              this.$message.success(res.message);
              this.$refs.ruleForm.resetFields();
              this.$refs.upload.clearFiles()
            }else {
              this.$message.error(res.message);
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    uploadfile(param){
      // console.log(param.file)
      let fileObj = param.file // 相当于input里取得的files
      let fd = new FormData()// FormData 对象
      let Str=fileObj.name.lastIndexOf(".");
      this.ruleForm.filename = this.ruleForm.teacherId+fileObj.name.substring(0,Str)+Date.now()+fileObj.name.substring(Str,fileObj.name.length);
      // console.log(this.ruleForm.filename)
      fd.append('file', fileObj)// 文件对象
      fd.append('filename',this.ruleForm.filename)
      fileApi.uploadFile(fd).then(res=>{
        console.log(res)
        // if(res.code===0){
        //   // this.submitForm();//提交表单
        // }
      })
    },

    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过10MB!');
        this.entityForm.photo = ""
      }
      return  isLt2M;
    },
  },
  created() {
    this.ruleForm.teacherId = this.$store.state.status.userId
    getTeacher(this.ruleForm.teacherId).then(res => {
      if (res.code === 200){
        this.ruleForm.course = res.result.title
      }
    })
    getTeacherClazz(this.ruleForm.teacherId).then(res => {
      if (res.code === 200){
        this.clazz = res.result
      }
    })
  }
}
</script>

<style scoped>

</style>
