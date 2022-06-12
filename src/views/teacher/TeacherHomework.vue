<template>
    <div class="teacher-homework-wrap">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-fa fa-book"></i> 作业列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
          <div class="query-form">
            <el-row :gutter="20">
              <el-col :offset="15" :span="3">
                <el-input @keyup.enter.native="handlePageChange(1)"
                          placeholder="班级" v-model="queryForm.clazzId"/>
              </el-col>
              <el-col :span="3">
                <el-select v-model="queryForm.type" placeholder="作业类型">
                  <el-option label="提交文本" value="0"/>
                  <el-option label="提交文件或图片" value="1"/>
                </el-select>
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
                    <el-table-column label="科目" prop="course"/>
                    <el-table-column label="班级" prop="clazzId"/>
                    <el-table-column type="date" label="开始时间" prop="stime" :formatter="dateFormat"/>
                  <el-table-column type="date" label="结束时间" prop="etime" :formatter="dateFormat"/>
                    <el-table-column label="作业类型" prop="type"/>
                    <el-table-column label="作业文件" prop="filename"/>
                    <el-table-column label="作业内容" prop="text"/>

                    <el-table-column align="center" label="操作" width="200px">
                        <template slot-scope="scope">
                            <el-button @click="editHomework(scope.row)" size="mini" type="success">编辑
                            </el-button>
                          <el-popconfirm
                              confirm-button-text='确认'
                              cancel-button-text='取消'
                              icon="el-icon-info"
                              icon-color="red"
                              title="确认修改？"
                              @confirm="deleteHomework(scope.row.id)"
                          >
                            <el-button slot="reference" size="mini" type="danger">删除</el-button>
                          </el-popconfirm>

                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <el-dialog :before-close="addDialogClose" :visible.sync="edit" title="修改作业" width="50%">
              <el-form :model="ruleForm" ref="form" label-width="100px" class="demo-ruleForm">
              <el-form-item label="学科">
                <el-input style="width: 50%" disabled v-model="ruleForm.course"></el-input>
              </el-form-item>
              <el-form-item label="班级" prop="clazzId">
                <el-input disabled :value="ruleForm.clazzId"></el-input>
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

    import * as homeworkApi from "@/api/teacher/homework";
    import * as fileApi from "@/api/admin/file";
    import moment from "moment";

    export default {
        name: "TeacherHomework",
        data() {
            return {
                queryForm: {
                    clazzId: "",
                    type: ""
                },
                teacherId : this.$store.state.status.userId,

              ruleForm: {
                course: '',
                clazzId: '',
                teacherId: '',
                time:[],
                type: '',
                filename: '',
                text: ''
              },

                tableData: [],
                pageSize: 5,
                total: 0,
                pageIndex: 1,
                edit: false
            };
        },
        methods: {
          query() {
            homeworkApi.getPage(this.pageIndex,this.pageSize,'','',this.teacherId).then(res =>{
              this.total = res.result.total;
              this.tableData = res.result.data
            })
          },
          handlePageChange(pageIndex) {
            homeworkApi.getPage(pageIndex,this.pageSize,this.queryForm.clazzId,this.queryForm.type,this.teacherId).then(res => {
              this.total = res.result.total;
              this.tableData = res.result.data
            });
          },
          handleSizeChange(pageSize){
            homeworkApi.getPageSize(pageSize,this.queryForm.clazzId,this.queryForm.type,this.teacherId).then(res=>{
              this.total = res.result.total;
              this.tableData = res.result.data
            })
          },

          uploadfile(param){
            // console.log(param.file)
            if (param.file !== null && param.file.name !== ''){
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

            editHomework(row) {
                this.ruleForm =row
                console.log(this.ruleForm)
                this.edit =true
            },
          save() {
              if (this.ruleForm.time !== undefined){
                this.ruleForm.stime = this.ruleForm.time[0]
                this.ruleForm.etime = this.ruleForm.time[1]
              }
              this.$refs.upload.submit()
              homeworkApi.updateHomework(this.ruleForm).then(res =>{
                if (res.code === 200){
                  this.$message.success(res.message);
                  this.$refs.upload.clearFiles();
                  this.addDialogClose()
                }else {
                  this.$message.error(res.message);
                }
              })
            },
            deleteHomework(homeworkId) {
                homeworkApi.deleteHomework(homeworkId).then((res) => {
                  if (res.code === 200){
                    this.$message.success(res.message);
                    this.query();
                  }else {
                    this.$message.success(res.message);
                  }

                });
            },
          addDialogClose(){
            this.$refs.form.resetFields()
            this.$refs.upload.clearFiles()
            // console.log(this.$refs.upload)
            this.edit =false
          },
          dateFormat(row, column) {
            var date = row[column.property];
            if (date == undefined) {
              return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
          }
        },
        created() {
            this.query();
        }
    }
</script>

<style scoped>

</style>
