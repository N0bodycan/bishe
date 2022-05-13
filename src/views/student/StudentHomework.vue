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
          <el-button @click="query" icon="el-icon-check" type="primary" plain>进行作业</el-button>
          <el-button @click="queryHistory" icon="el-icon-close" type="warning" plain>历史作业</el-button>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
        name: "StudentHomework",
        methods:{
          query(){
            this.$router.push({name:"student-homework-now"})
          },
          queryHistory(){
            this.$router.push({name:"student-homework-history"})
          }
        },
        created() {
          this.$router.push({name:"student-homework-now"})
        }
    }
</script>

<style scoped>

</style>
