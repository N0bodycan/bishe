<template>
  <div class="home-wrap">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-fa fa-home"></i> 班级管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <router-view></router-view>

  </div>

</template>

<script>

export default {
  name: "ClazzManage",
  created() {
    this.$router.push({name: 'admin-clazz-info'})
  },
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
