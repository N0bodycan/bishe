<template>

    <div class="container">
      <el-button @click="back" icon="el-icon-back" type="danger" plain>返回</el-button>
      <h1 style="text-align: center" v-text="clazzId"></h1>
      <el-divider></el-divider>
      <el-button @click="studentInfo" icon="el-icon-s-custom" type="primary" plain>学生信息</el-button>
      <el-button @click="teacherInfo" icon="el-icon-user" type="primary" plain>教师信息</el-button>
      <el-button @click="courseInfo" icon="el-icon-edit-outline" type="primary" plain>课程信息</el-button>

      <router-view></router-view>

    </div>
</template>

<script>
export default {
  name: "ClazzManageDetial",
  data(){
    return {
      clazzId: this.$route.params.clazzId
    }
  },

  methods:{
    back(){
      this.$router.push({name:"admin-clazz-info"})
    },
    studentInfo(){
      this.$router.push({name:"admin-clazz-detail-student",params:{clazzId: this.clazzId.toString()}})
    },
    teacherInfo(){
      this.$router.push({name:"admin-clazz-detail-teacher",params:{clazzId: this.clazzId.toString()}})
    },
    courseInfo(){
      this.$router.push({name:"admin-clazz-detail-course",params:{clazzId: this.clazzId.toString()}})
    }
  },
  created() {
    this.$router.push({name:"admin-clazz-detail-student",params:{clazzId: this.clazzId.toString()}})
  }
}
</script>

<style scoped>

</style>
