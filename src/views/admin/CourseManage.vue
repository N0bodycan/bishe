<template>
  <div class="home-wrap">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-fa fa-home"></i> 课程管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <el-button @click="addV = true" icon="el-icon-plus" type="primary">添加课程</el-button>
      <div class="query-form">
        <el-row :gutter="20">
          <el-col :offset="15" :span="3">
            <el-input @keyup.enter.native="handlePageChange(1)"
                      placeholder="学科" v-model="queryForm.name"/>
          </el-col>
          <el-col :span="3">
            <el-input @keyup.enter.native="handlePageChange(1)" placeholder="教师姓名" v-model="queryForm.teachername"/>
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
          <el-table-column label="ID" prop="id" sortable/>
          <el-table-column label="课程" prop="name" sortable/>
          <el-table-column label="分值" prop="score"/>
          <el-table-column label="任课教师" prop="teachers" width="200px"/>
          <el-table-column align="center" label="操作" width="200px">
            <template slot-scope="scope">
              <el-popconfirm
                  confirm-button-text='确认'
                  cancel-button-text='取消'
                  icon="el-icon-info"
                  icon-color="red"
                  title="确认重置？"
                  @confirm="deleteCourse(scope.row.id)"
              >
                <el-button slot="reference" size="mini" type="danger">
                  删除课程
                </el-button>

              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>

        <el-dialog :visible.sync="addV" title="编辑" width="50%">
          <el-form :model="entityForm"  :rules="rules" label-width="82px" ref="form">
            <el-form-item label="学科" prop="name">
              <el-input  type="text"  v-model="entityForm.name"></el-input>
            </el-form-item>
            <el-form-item label="分值" prop="score">
              <el-input  type="number" onkeyup="value=value.replace(/[^\d]/g,'')" v-model="entityForm.score"></el-input>
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
import * as coursemApi from "@/api/admin/coursem";
import {addCourse, deleteCourse} from "@/api/admin/coursem";

export default {
  name: "CourseManage",
  data() {
    return {
      queryForm: {
        name: "",
        teachername:""
      },
      entityForm: {
        name: '',
        score: ''
      },rules: {
        name: [
          { required: true, message: '请输入学科名', trigger: 'blur' },
        ],
        score: [
          {required:true,message: '请输入学科分值', trigger: 'blur'}
        ]
      },
      tableData: [],
      pageSize: 5,
      total: 0,
      pageIndex: 1,
      addV: false
    };
  },
  methods: {
    query() {
      coursemApi.getPage(this.pageIndex,this.pageSize).then(res =>{
        this.total = res.result.total;
        this.tableData = res.result.data
      })
    },
    handlePageChange(pageIndex) {
      coursemApi.getPage(pageIndex,this.pageSize,this.queryForm.name,this.queryForm.teachername).then(res => {
        this.total = res.result.total;
        this.tableData = res.result.data
      });
    },
    handleSizeChange(pageSize){
      coursemApi.getPageSize(pageSize,this.queryForm.name,this.queryForm.teachername).then(res=>{
        this.total = res.result.total;
        this.tableData = res.result.data
      })
    },
    // editStudentHomework(homeworkId) {
    //   homeworkApi.getHomework(homeworkId).then(res => {
    //     this.entityForm = res;
    //     this.editing = true;
    //   })
    // },

    save() {
      // console.log("save")
      this.$refs.form.validate(valid=>{
        if (valid){
          addCourse(this.entityForm).then(res => {
            if (res.code === 200){
              this.$message.success(res.message)
              this.addDialogClose()
              this.query()
            }else {
              this.$message.error(res.message)
            }
          })
        }else {
          // console.log('error submit!!');
          return false;
        }
      })
    },

    deleteCourse(id){
      // console.log(id)
      deleteCourse(id).then(res => {
        if (res.code === 200){
          this.$message.success(res.message)
          this.addDialogClose()
          this.query()
        }else {
          this.$message.error(res.message)
        }
      })
    },

    addDialogClose(){
      this.$refs.form.resetFields()
      // console.log(this.$refs.upload)
      this.addV =false
    },
  },
  created() {
    this.query();
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
</style>
