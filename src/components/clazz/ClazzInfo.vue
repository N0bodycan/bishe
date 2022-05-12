<template>
  <div class="home-wrap">
  <div class="container">
    <el-button @click="addV =true" icon="el-icon-plus" type="primary">添加班级</el-button>
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

    <el-dialog :visible.sync="addV" title="添加班级" width="50%">
      <el-form :model="entityForm"  :rules="rules" label-width="82px" ref="form">
        <el-form-item label="班级ID" prop="clazzId">
          <el-input v-model="entityForm.clazzId"></el-input>
        </el-form-item>
        <el-form-item label="班级名称" prop="clazzName">
          <el-input v-model="entityForm.clazzName"></el-input>
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
        clazzId: '',
        clazzName: ''
      },rules: {
        clazzId: [
          { required: true, message: '请输入班级ID', trigger: 'blur' },{max:6, min:6,message: '请输入6位id',trigger: 'blur'}
        ],
        clazzName: [
          {required:true,message: '请输入班级名称', trigger: 'blur'}
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
    },
    save() {
      // console.log("save")
      this.$refs.form.validate(valid=>{
        if (valid){
          // console.log(this.entityForm)
          clazzApi.addClazz(this.entityForm.clazzId,this.entityForm.clazzName).then(res => {
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
