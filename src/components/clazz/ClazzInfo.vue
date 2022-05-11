<template>
  <div class="home-wrap">
  <div class="container">
    <div class="query-form">
      <el-row :gutter="20">
        <el-col :offset="15" :span="3">
          <el-input @keyup.enter.native="handlePageChange(1)"
                    placeholder="班级名" v-model="queryForm.clazzName"/>
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
        <el-table-column label="ID" prop="clazzId" sortable/>
        <el-table-column label="班级" prop="clazzName" sortable/>
        <el-table-column align="center" label="操作" width="200px">
          <template slot-scope="scope">
            <el-button @click="manage(scope.row.clazzId)" size="mini" type="danger">
              管理班级
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  </div>
</template>

<script>
import * as clazzApi from "@/api/admin/clazzm";

export default {
  name: "ClazzInfo",
  data() {
    return {
      queryForm: {
        clazzName: "",
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
      clazzApi.getPage(this.pageIndex,this.pageSize).then(res =>{
        this.total = res.result.total;
        this.tableData = res.result.data
        // console.log(res.result.data)
      })
    },
    handlePageChange(pageIndex) {
      clazzApi.getPage(pageIndex,this.pageSize,this.queryForm.clazzName).then(res => {
        this.total = res.result.total;
        this.tableData = res.result.data
      });
    },
    handleSizeChange(pageSize){
      clazzApi.getPageSize(pageSize,this.queryForm.clazzName).then(res=>{
        this.total = res.result.total;
        this.tableData = res.result.data
      })
    },
    manage(clazzId){
      // console.log(clazzId)
      this.$router.push({name: 'admin-clazz-detail',params: {clazzId: clazzId}})
    }
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
