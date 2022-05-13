<template>
    <div class="home">
        <head-bar/>
        <side-bar/>

        <div class="content-box">
            <div class="content" v-loading="this.$store.state.loading">
                <router-view/>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
    </div>
</template>

<script>
import UserType from "@/common/userType";
import HeadBar from "@/components/HeadBar";
import SideBar from "@/components/SideBar";
import {getLoginStatus} from "@/api/user";

export default {
        name: "Container",
        components: {
            HeadBar,
            SideBar
        },
        methods: {
            redirectHome(userType) {
                if (userType === UserType.student) {
                    this.$router.push("/student");
                } else if (userType === UserType.teacher) {
                    this.$router.push("/teacher");
                }else if (userType === UserType.admin){
                  this.$router.push("/admin");
                }
            }
        },
        created() {
            getLoginStatus().then(res => {
                if (res.code === 200){
                  // console.log(res.result)
                  this.$store.commit("loginStatus", res.result.isLogin);
                  if (this.$route.path === "/") {
                     this.redirectHome(res.userType);
                  }
                }
            });

        }
    };
</script>

<style scoped>
    .content-box {
        position: absolute;
        left: 200px;
        right: 0;
        top: 70px;
        bottom: 0;
        background: #f0f0f0;
    }

    .content {
        width: auto;
        height: 100%;
        padding: 10px;
        overflow-y: scroll;
        box-sizing: border-box;
    }
</style>
