<template>
    <div class="teacher-submitted-wrap">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-fa fa-check"></i> 学生作业列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
            <div class="query-form">
                <el-row :gutter="20">
                    <el-col :offset="15" :span="3">
                        <el-input @keyup.enter.native="handlePageChange(1)" onkeyup="value=value.replace(/[^\d]/g,'')"
                                  placeholder="作业编号" v-model="queryForm.homeworkId"/>
                    </el-col>
                    <el-col :span="3">
                        <el-input @keyup.enter.native="handlePageChange(1)" placeholder="学生姓名" v-model="queryForm.studentName"/>
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
                    <el-table-column sortable label="学生作业编号" prop="id"/>
                    <el-table-column label="作业编号" prop="homeworkId"/>
                    <el-table-column label="学生姓名" prop="studentId"/>
                    <el-table-column label="作业类型" prop="type"/>
                    <el-table-column label="作业内容" prop="text"/>
                    <el-table-column label="提交的文件" prop="filename"/>
                    <el-table-column label="提交的内容" prop="info"/>
                    <el-table-column label="评语" prop="pinyu"/>
                    <el-table-column label="得分" prop="score"/>
                    <el-table-column label="状态" prop="state"/>

                    <el-table-column align="center" label="操作" width="200px">
                        <template slot-scope="scope">
                          <el-button v-if="scope.row.filename" @click="downFile(scope.row.filename)" size="mini" type="success">
                            下载附件
                          </el-button>
                          <p></p>
                            <el-button  v-if="!scope.row.state" @click="editSubmittedStudentHomework(scope.row.id)" size="mini"
                                       type="primary">点评
                            </el-button>
                          <el-button  v-if="scope.row.state" size="mini"
                                      type="info">已点评
                          </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <el-dialog :before-close="addDialogClose" :visible.sync="editing" title="点评" width="50%">
                <el-form :model="entityForm" :rules="rules" label-width="96px" ref="form">
                    <el-form-item label="评语" prop="pinyu">
                        <el-input type="textarea"
                                  :autosize="{ minRows: 4, maxRows: 8}" v-model="entityForm.pinyu"></el-input>
                    </el-form-item>
                    <el-form-item label="分数" prop="score">
                        <el-input type="number" v-model="entityForm.score"></el-input>
                    </el-form-item>
                </el-form>
                <span class="dialog-footer" slot="footer">
                     <el-popconfirm
                         confirm-button-text='确认'
                         cancel-button-text='取消'
                         icon="el-icon-info"
                         icon-color="red"
                         title="确认打分？"
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
    import * as homeworkApi from "@/api/teacher/homework";
    import {axiosInstance} from "@/common/myAxios";

    export default {
        name: "TeacherSubmitted",
        data() {
            return {
                queryForm: {
                    homeworkId: "",
                    studentName: ""
                },
                entityForm: {
                  id:'',
                  pinyu: '',
                  score: '',
                  state: '1'
                },
                rules: {
                  pinyu: [
                    { required: true, message: '请输入评语', trigger: 'blur' },
                  ],
                  score: [
                    { required:true,message: '请输入作业得分', trigger: 'blur'}
                  ]
                },

                teacherId : this.$store.state.status.userId,

                tableData: [],
                pageSize: 5,
                total: 0,
                pageIndex: 1,
                editing: false
            };
        },
        methods: {
          query() {
            homeworkApi.getSHPage(this.pageIndex,this.pageSize,'','',this.teacherId).then(res =>{
              this.total = res.result.total;
              this.tableData = res.result.data
              console.log(res.result.data)
            })
          },
          handlePageChange(pageIndex) {
            homeworkApi.getSHPage(pageIndex,this.pageSize,this.queryForm.homeworkId,this.queryForm.studentName,this.teacherId).then(res => {
              this.total = res.result.total;
              this.tableData = res.result.data
            });
          },
          handleSizeChange(pageSize){
            homeworkApi.getSHPageSize(pageSize,this.queryForm.homeworkId,this.queryForm.studentName,this.teacherId).then(res=>{
              this.total = res.result.total;
              this.tableData = res.result.data
            })
          },
          editSubmittedStudentHomework(id){
            // console.log(id)
            this.entityForm.id  = id
            this.editing = true
          },
          addDialogClose(){
            this.$refs.form.resetFields()
            // console.log(this.$refs.upload)
            this.editing = false
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

          save(){
            // console.log(this.entityForm)

            this.$refs.form.validate(valid=>{
              if (valid){
                homeworkApi.commentHomework(this.entityForm).then(res => {
                  if (res.code === 200){
                    this.$message.success(res.message)
                    this.addDialogClose()
                    this.query()
                  }else {
                    this.$message.error(res.message)
                  }
                })
              }
            })
          }
        },
        created() {
            this.query();
        }
    }
</script>

<style scoped>

</style>
