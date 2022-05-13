<template>
    <div class="student-submitted-wrap">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-fa fa-check"></i> 已提交的作业
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">

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
              <el-table-column v-show="false" label="id" prop="id"/>
              <el-table-column label="作业编号" prop="homeworkId"/>
              <el-table-column label="课程" prop="course"/>
              <el-table-column label="教师" prop="teacherId"/>
              <el-table-column type="date" label="开始时间" prop="stime" :formatter="dateFormat"/>
              <el-table-column type="date" label="结束时间" prop="etime" :formatter="dateFormat"/>
              <el-table-column label="作业内容" prop="text"/>
              <el-table-column label="作业类型" prop="type"/>
              <el-table-column label="提交的文件" prop="filename"/>
              <el-table-column label="提交的文本" prop="info"/>

              <el-table-column align="center" label="操作" width="200px">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.filename" @click="downFile(scope.row.filename)" size="mini" type="success">
                    下载文件
                  </el-button>
                  <p></p>
                  <el-button @click="openEdit(scope.row)" size="mini" type="primary">
                    修改作业
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

            <el-dialog :before-close="addDialogClose" :visible.sync="editing" title="修改作业" width="50%">
                <el-form :model="entityForm" label-width="82px" ref="form">
                    <el-form-item label="作业ID">
                        <el-input disabled type="number" v-model="entityForm.id"></el-input>
                    </el-form-item>
                    <el-form-item label="作业标题">
                        <el-input disabled type="text" v-model="entityForm.text"></el-input>
                    </el-form-item>
                  <el-form-item label="原文件" v-if="entityForm.type">
                    <el-input disabled type="text" v-model="entityForm.filename"></el-input>
                  </el-form-item>
                  <el-form-item label="上传文件" v-show="entityForm.type" >
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
                        <el-input type="textarea"
                                  :autosize="{ minRows: 4, maxRows: 8}"
                                  v-model="entityForm.info">
                        </el-input>
                    </el-form-item>
                </el-form>
                <span class="dialog-footer" slot="footer">
                  <el-popconfirm
                      confirm-button-text='确认'
                      cancel-button-text='取消'
                      icon="el-icon-info"
                      icon-color="red"
                      title="确认修改？"
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
    import * as homeworkApi from "@/api/student/homework";
    import moment from "moment";
    import {axiosInstance} from "@/common/myAxios";

    export default {
        name: "StudentSubmitted",
        data() {
          return {
            entityForm: {
              id: '',
              text: '',
              type: '',
              filename: '',
              info: ''
            },

            studentId : this.$store.state.status.userId,
            tableData: [],
            pageSize: 5,
            total: 0,
            pageIndex: 1,
            editing: false
          };
        },
        methods: {
          query() {
            homeworkApi.getCommitPage(this.pageIndex,this.pageSize,this.studentId).then(res =>{
              this.total = res.result.total;
              this.tableData = res.result.data
              // console.log(res.result.data)
            })
          },
          handlePageChange(pageIndex) {
            homeworkApi.getCommitPage(pageIndex,this.pageSize,this.studentId).then(res => {
              this.total = res.result.total;
              this.tableData = res.result.data
            });
          },
          handleSizeChange(pageSize){
            homeworkApi.getCommitPageSize(pageSize,this.studentId).then(res=>{
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
          uploadfile(param){
            // console.log(param.file)
            if (param.file !== null && param.file.name !== '') {
              let fileObj = param.file // 相当于input里取得的files
              let fd = new FormData()// FormData 对象
              let Str = fileObj.name.lastIndexOf(".");
              this.entityForm.filename = this.studentId + fileObj.name.substring(0, Str) + Date.now() + fileObj.name.substring(Str, fileObj.name.length);
              console.log(this.entityForm.filename)
              fd.append('file', fileObj)// 文件对象
              fd.append('filename', this.entityForm.filename)
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
            }
            return  isLt2M;
          },
          save(){
            // console.log(this.entityForm)
            this.$refs.upload.submit();
            homeworkApi.updateHomework(this.entityForm).then(res=>{
              if ( res.code === 200){
                this.$message.success(res.message);
                this.$refs.upload.clearFiles()
                this.addDialogClose()
                this.query()
              }else {
                this.$message.error(res.message);
              }
            })
          },

          downFile(fileName){
            this.$message.success('开始下载!');
            //动态获取刚刚上传的文件的路径,所以必须先上传,再下载,当然你也可以把路径写死
            //实际项目中,获取目标文件路径即可,这个不是重点
            axiosInstance({
              method: "get",
              url: '/file/downloadSFile?fileName='+fileName,
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


          openEdit(row){
            // console.log(row.id)
            this.entityForm.id = row.id
            this.entityForm.text = row.text
            this.entityForm.type = row.type
            this.entityForm.filename = row.filename
            this.entityForm.info = row.info

            this.editing = true
          },
          addDialogClose(){
            this.$refs.form.resetFields()
            this.$refs.upload.clearFiles()
            this.editing =false
          }
        },


        created() {
            this.query();
        }
    };
</script>

<style scoped>

</style>
