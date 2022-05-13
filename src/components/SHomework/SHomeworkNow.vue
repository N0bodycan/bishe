<template>
  <div>
      <div class="query-form">
        <el-row :gutter="20">
          <el-col :offset="15" :span="3">
            <el-input @keyup.enter.native="handlePageChange(1)"
                      placeholder="科目" v-model="queryForm.course"/>
          </el-col>
          <el-col :span="3">
            <el-input @keyup.enter.native="handlePageChange(1)" placeholder="教师" v-model="queryForm.teacherName"/>
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
        <el-table :data="tableData" stripe>
          <el-table-column label="作业编号" prop="id"/>
          <el-table-column label="课程" prop="course"/>
          <el-table-column label="班级" prop="clazzId"/>
          <el-table-column label="教师" prop="teacherId"/>
          <el-table-column type="date" label="开始时间" prop="stime" :formatter="dateFormat"/>
          <el-table-column type="date" label="结束时间" prop="etime" :formatter="dateFormat"/>
          <el-table-column label="作业类型" prop="type"/>
          <el-table-column label="作业文件" prop="filename"/>
          <el-table-column label="作业内容" prop="text"/>
          <el-table-column align="center" label="操作" width="200px">
            <template slot-scope="scope">
              <el-button v-if="scope.row.filename" @click="downFile(scope.row.filename)" size="mini" type="success">
                下载附件
              </el-button>
              <p></p>
              <el-button v-if="scope.row.state === 1" @click="openSubmit(scope.row)" size="mini" type="primary">
                提交作业
              </el-button>
              <el-button v-if="scope.row.state === 0" disabled size="mini" type="warning">
                作业未开始
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog :before-close="addDialogClose" :visible.sync="editing" title="提交作业" width="50%">
        <el-form :model="homework" label-width="82px" ref="form">
          <el-form-item label="作业编号" prop="homeworkId">
            <el-input disabled type="number" v-model="homework.homeworkId"></el-input>
          </el-form-item>
          <el-form-item label="作业标题" prop="text">
            <el-input disabled type="text" v-model="homework.text"></el-input>
          </el-form-item>
          <el-form-item label="作业类型" prop="">
            <el-input disabled  v-model="homework.type"></el-input>
          </el-form-item>

          <el-form-item label="上传文件" v-show="homework.type" >
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

          <el-form-item label="提交的内容">
            <el-input type="textarea"  :autosize="{ minRows: 8, maxRows: 16}" v-model="homework.info"></el-input>
          </el-form-item>
        </el-form>
        <span class="dialog-footer" slot="footer">

                    <el-popconfirm
                        confirm-button-text='确定'
                        cancel-button-text='取消'
                        icon="el-icon-info"
                        icon-color="red"
                        title="确认提交？"
                        @confirm="submitHomework"
                    >
               <el-button slot="reference" type="primary">立即提交</el-button>
                    </el-popconfirm>
                    <el-button @click="addDialogClose">取 消</el-button>
                </span>
      </el-dialog>
  </div>
</template>

<script>
import * as homeworkApi from "@/api/student/homework";
import moment from "moment";
import {axiosInstance} from "@/common/myAxios";


export default {
  name: "StudentHomework",
  data() {
    return {
      queryForm: {
        course: "",
        teacherName: ""
      },
      studentId : this.$store.state.status.userId,

      homework:{
        homeworkId:'',
        studentId: '',
        type:'',
        filename:'',
        text:'',
        info:''
      },

      tableData: [],
      pageSize: 5,
      total: 0,
      pageIndex: 1,
      editing: false
    };
  },
  methods: {
    query() {
      homeworkApi.getPage(this.pageIndex,this.pageSize,'','',this.studentId).then(res =>{
        this.total = res.result.total;
        this.tableData = res.result.data
        // console.log(res.result.data)
      })
    },
    handlePageChange(pageIndex) {
      homeworkApi.getPage(pageIndex,this.pageSize,this.queryForm.course,this.queryForm.teacherName,this.studentId).then(res => {
        this.total = res.result.total;
        this.tableData = res.result.data
      });
    },
    handleSizeChange(pageSize){
      homeworkApi.getPageSize(pageSize,this.queryForm.course,this.queryForm.teacherName,this.studentId).then(res=>{
        this.total = res.result.total;
        this.tableData = res.result.data
      })
    },
    dateFormat(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },

    downFile(fileName){
      this.$message.success('开始下载!');
      //动态获取刚刚上传的文件的路径,所以必须先上传,再下载,当然你也可以把路径写死
      //实际项目中,获取目标文件路径即可,这个不是重点
      axiosInstance({
        method: "get",
        url: '/file/downloadTFile?fileName='+fileName,
        responseType: 'blob',
        headers: {
          Authorization: "Bearer" + localStorage.getItem("Authorization")
        }
      }).then(response => {
            //文件名 文件保存对话框中的默认显示
            let data = response;

            if(!data){
              return
            }
            console.log(response);
            //构造a标签 经过a标签来下载
            let url = window.URL.createObjectURL(new Blob([data]))
            let a = document.createElement('a')
            a.style.display = 'none'
            a.href = url
            //此处的download是a标签的内容，固定写法，不是后台api接口
            a.setAttribute('download',fileName)
            document.body.appendChild(a)
            //点击下载
            a.click()
            // 下载完成移除元素
            document.body.removeChild(a);
            // 释放掉blob对象
            window.URL.revokeObjectURL(url);
          })
          .catch(response => {
            this.$message.error(response);
          });
    },

    uploadfile(param){
      // console.log(param.file)
      if (param.file !== null && param.file.name !== '') {
        let fileObj = param.file // 相当于input里取得的files
        let fd = new FormData()// FormData 对象
        let Str = fileObj.name.lastIndexOf(".");
        this.homework.filename = this.studentId + fileObj.name.substring(0, Str) + Date.now() + fileObj.name.substring(Str, fileObj.name.length);
        // console.log(this.ruleForm.filename)
        fd.append('file', fileObj)// 文件对象
        fd.append('filename', this.homework.filename)
        homeworkApi.uploadFile(fd).then(res => {
          console.log(res)
          // if(res.code===0){
          //   // this.submitForm();//提交表单
          // }
        })
      }
    },

    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过10MB!');
        this.entityForm.photo = ""
      }
      return  isLt2M;
    },

    submitHomework(){
      // console.log(this.homework)
      this.$refs.upload.submit()
      homeworkApi.submitHomework(this.homework).then(res => {
        if (res.code === 200){
          this.$message.success(res.message);
          this.$refs.form.resetFields();
          this.$refs.upload.clearFiles();
          this.editing = false
          this.query();
        }else{
          this.$message.error(res.message)
        }
      })
    },
    addDialogClose(){
      this.$refs.form.resetFields()
      this.$refs.upload.clearFiles()
      // console.log(this.$refs.upload)
      this.editing =false
    },

    openSubmit(homework){
      this.editing = true

      this.homework.homeworkId = homework.id
      this.homework.studentId = this.studentId
      this.homework.type= homework.type
      this.homework.text = homework.text
      this.homework.info = homework.info
    }

  },
  created() {
    this.query();
  }
}
</script>

<style scoped>

</style>

