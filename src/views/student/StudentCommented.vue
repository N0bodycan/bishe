<template>
    <div class="student-commented-wrap">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-fa fa-thumbs-up"></i> 老师已点评的作业
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
                        <el-input @keyup.enter.native="handlePageChange(1)" placeholder="科目" v-model="queryForm.course"/>
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
                    <el-table-column label="作业编号" prop="homeworkId"/>
                    <el-table-column label="老师" prop="teacherName"/>
                    <el-table-column label="课程" prop="course"/>
                    <el-table-column label="作业内容" prop="text"/>
                    <el-table-column label="作业类型" prop="type"/>
                    <el-table-column label="提交文件" prop="filename"/>
                    <el-table-column label="提交答案" prop="info"/>
                    <el-table-column label="评语" prop="pinyu"/>
                    <el-table-column label="分数" prop="score"/>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    import * as homeworkApi from "@/api/student/homework";

    export default {
        name: "StudentCommented",
        data() {
            return {
                queryForm: {
                    homeworkId: "",
                    course: ""
                },
                studentId: this.$store.state.status.userId,

                tableData: [],
                pageSize: 5,
                total: 0,
                pageIndex: 1,
            };
        },
        methods: {
          query() {
            homeworkApi.getCommentPage(this.pageIndex,this.pageSize,'','',this.studentId).then(res =>{
              this.total = res.result.total;
              this.tableData = res.result.data
              // console.log(res.result.data)
            })
          },
          handlePageChange(pageIndex) {
            homeworkApi.getCommentPage(pageIndex,this.pageSize,this.queryForm.homeworkId,this.queryForm.course,this.studentId).then(res => {
              this.total = res.result.total;
              this.tableData = res.result.data
            });
          },
          handleSizeChange(pageSize){
            homeworkApi.getCommentPageSize(pageSize,this.queryForm.homeworkId,this.queryForm.course,this.studentId).then(res=>{
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
