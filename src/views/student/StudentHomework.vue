<template>
    <div class="student-homework-wrap">
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
                        <el-input @keyup.enter.native="query"
                                  placeholder="科目" v-model="queryForm.course"/>
                    </el-col>
                    <el-col :span="3">
                        <el-input @keyup.enter.native="query" placeholder="教师" v-model="queryForm.teacherName"/>
                    </el-col>
                    <el-col :span="3">
                        <el-button @click="query" icon="el-icon-search" type="primary">搜索</el-button>
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
                    <el-table-column label="开始时间" prop="stime"/>
                    <el-table-column label="结束时间" prop="etime"/>
                    <el-table-column label="作业类型" prop="type"/>
                    <el-table-column label="作业文件" prop="filename"/>
                    <el-table-column label="作业内容" prop="text"/>
                    <el-table-column align="center" label="操作" width="200px">
                        <template slot-scope="">
                            <el-button  size="mini" type="success">
                                提交作业
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <el-dialog :visible.sync="editing" title="编辑" width="50%">
                <el-form :model="entityForm" label-width="82px" ref="form">
                    <el-form-item label="作业编号">
                        <el-input disabled type="number" v-model="entityForm.homeworkId"></el-input>
                    </el-form-item>
                    <el-form-item label="作业标题">
                        <el-input disabled type="text" v-model="entityForm.homeworkTitle"></el-input>
                    </el-form-item>
                    <el-form-item label="作业内容">
                        <el-input disabled type="textarea" v-model="entityForm.homeworkContent"></el-input>
                    </el-form-item>
                    <el-form-item label="提交的标题">
                        <el-input type="text" v-model="entityForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="提交的内容">
                        <el-input type="textarea" v-model="entityForm.content"></el-input>
                    </el-form-item>
                </el-form>
                <span class="dialog-footer" slot="footer">
                    <el-button  type="primary">确 定</el-button>
                    <el-button @click="editing = false">取 消</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import * as homeworkApi from "@/api/student/homework";

export default {
        name: "StudentHomework",
        data() {
            return {
              queryForm: {
                  course: "",
                  teacherName: ""
              },
              studentId : this.$store.state.status.userId,

              entityForm: {},

              tableData: [],
              pageSize: 5,
              total: 0,
              pageIndex: 1,
              editing: false
            };
        },
        methods: {
          query() {
            homeworkApi.getPage(this.pageIndex,this.pageSize).then(res =>{
              this.total = res.result.total;
              this.tableData = res.result.data
              // console.log(res.result.data)
            })
          },
          handlePageChange(pageIndex) {
            homeworkApi.getPage(pageIndex,this.pageSize,this.queryForm.course,this.queryForm.teacherName).then(res => {
              this.total = res.result.total;
              this.tableData = res.result.data
            });
          },
          handleSizeChange(pageSize){
            homeworkApi.getPageSize(pageSize,this.queryForm.course,this.queryForm.teacherName).then(res=>{
              this.total = res.result.total;
              this.tableData = res.result.data
            })
          },

        },
        created() {
            this.query();
        }
    }
</script>

<style scoped>

</style>
