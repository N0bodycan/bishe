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
    </el-table>
  </div>

  </div>
</template>

<script>
import * as homeworkApi from "@/api/student/homework";
import moment from "moment";

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
      homeworkApi.getHistoryPage(this.pageIndex,this.pageSize,'','',this.studentId).then(res =>{
        this.total = res.result.total;
        this.tableData = res.result.data
        // console.log(res.result.data)
      })
    },
    queryHistory(){
      // homeworkApi.
    },
    handlePageChange(pageIndex) {
      homeworkApi.getHistoryPage(pageIndex,this.pageSize,this.queryForm.course,this.queryForm.teacherName,this.studentId).then(res => {
        this.total = res.result.total;
        this.tableData = res.result.data
      });
    },
    handleSizeChange(pageSize){
      homeworkApi.getHistoryPageSize(pageSize,this.queryForm.course,this.queryForm.teacherName,this.studentId).then(res=>{
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
    }

  },
  created() {
    this.query();
  }
}
</script>

<style scoped>

</style>

