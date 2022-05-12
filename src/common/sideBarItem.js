import UserType from "@/common/userType";
import userType from "@/common/userType";

let SideBarItem = {};

SideBarItem.items = [
    {
        icon: "el-icon-fa fa-home",
        index: "/student",
        title: "学生首页",
        userType: UserType.student
    },
    {
        icon: "el-icon-fa fa-book",
        index: "/student/homework",
        title: "作业列表",
        userType: UserType.student
    },
    {
        icon: "el-icon-fa fa-check",
        index: "/student/submitted",
        title: "已提交的作业",
        userType: UserType.student
    },
    {
        icon: "el-icon-fa fa-thumbs-up",
        index: "/student/commented",
        title: "老师已点评的作业",
        userType: UserType.student
    },
    {
        icon: "el-icon-fa fa-home",
        index: "/teacher",
        title: "教师首页",
        userType: UserType.teacher
    },
    {
        icon: "el-icon-fa fa-book",
        index: "/teacher/publish",
        title: "发布作业",
        userType: UserType.teacher
    },
    {
        icon: "el-icon-fa fa-book",
        index: "/teacher/homework",
        title: "作业列表",
        userType: UserType.teacher
    },
    {
        icon: "el-icon-fa fa-check",
        index: "/teacher/submitted",
        title: "学生作业列表",
        userType: UserType.teacher
    },
    {
        icon: "el-icon-house",
        index: "/admin",
        title: "管理员首页",
        userType: userType.admin
    },
    {
        icon: "el-icon-user-solid",
        index: "/admin/student",
        title: "学生管理",
        userType: userType.admin
    },
    {
        icon: "el-icon-s-custom",
        index: "/admin/teacher",
        title: "教师管理",
        userType: userType.admin
    },
    {
        icon: "el-icon-s-management",
        index: "/admin/course",
        title: "课程管理",
        userType: userType.admin
    },
    {
        icon: "el-icon-s-order",
        index: "/admin/clazz",
        title: "班级管理",
        userType: userType.admin
    }

];

export default SideBarItem;
