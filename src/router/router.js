import Vue from 'vue';
import VueRouter from 'vue-router';
import Container from "@/views/Container";
import Login from '@/views/Login';
import Home from "@/views/Home";
import StudentHomework from "@/views/student/StudentHomework";
import StudentSubmitted from "@/views/student/StudentSubmitted";
import TeacherHomework from "@/views/teacher/TeacherHomework";
import TeacherSubmitted from "@/views/teacher/TeacherSubmitted";
import StudentCommented from "@/views/student/StudentCommented";
import Alogin from "@/views/Alogin";
import TeacherPublish from "@/views/teacher/TeacherPublish";
import studentManage from "@/views/admin/StudentManage";
import courseManage from "@/views/admin/CourseManage";
import clazzManage from "@/views/admin/ClazzManage";
import teacherManage from "@/views/admin/TeacherManage";
import clazzManageDetial from "@/components/clazz/ClazzManageDetial";
import clazzInfo from "@/components/clazz/ClazzInfo";
import studentTable from "@/components/clazz/StudentTable";
import teacherTable from "@/components/clazz/TeacherTable";
import courseTable from "@/components/clazz/CourseTable";
import SHomeworkNow from "@/components/SHomework/SHomeworkNow";
import SHomeworkHistory from "@/components/SHomework/SHomeworkHistory";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "container",
        component: Container,
        children: [
            {
                path: "/student",
                name: "student-home",
                component: Home
            },
            {
                path: "/student/homework",
                name: "student-homework",
                component: StudentHomework,
                children: [
                    {
                    path: "/student/homework/now",
                    name: "student-homework-now",
                    component: SHomeworkNow,
                    },
                    {
                        path: "/student/homework/history",
                        name: "student-homework-history",
                        component: SHomeworkHistory,
                    },
                ]
            },
            {
                path: "/student/submitted",
                name: "student-submitted",
                component: StudentSubmitted
            },
            {
                path: "/student/commented",
                name: "student-commented",
                component: StudentCommented
            },
            {
                path: "/teacher",
                name: "teacher-home",
                component: Home
            },
            {
                path: "/teacher/homework",
                name: "teacher-homework",
                component: TeacherHomework
            },
            {
                path: "/teacher/submitted",
                name: "teacher-submitted",
                component: TeacherSubmitted
            },
            {
                path: "/teacher/publish",
                name: "teacher-publish",
                component: TeacherPublish
            },{
                path: "/admin",
                name: "admin-home",
                component: Home
            },
            {
                path: "/admin/student",
                name: "admin-student",
                component: studentManage
            },
            {
                path: "/admin/teacher",
                name: "admin-teacher",
                component: teacherManage
            },
            {
                path: "/admin/course",
                name: "admin-course",
                component: courseManage
            },
            {
                path: "/admin/clazz",
                name: "admin-clazz",
                component: clazzManage,
                children : [
                    {
                        path: "/admin/clazz/info",
                        name: "admin-clazz-info",
                        component: clazzInfo,
                    },
                    {
                        path: "/admin/clazz/detail",
                        name: "admin-clazz-detail",
                        component: clazzManageDetial,
                        children : [
                            {
                                path: "/admin/clazz/detail/student",
                                name: "admin-clazz-detail-student",
                                component: studentTable,
                            },
                            {
                                path: "/admin/clazz/detail/teacher",
                                name: "admin-clazz-detail-teacher",
                                component: teacherTable
                            },{
                                path: "/admin/clazz/detail/course",
                                name: "admin-clazz-detail-course",
                                component: courseTable
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/alogin",
        name: "alogin",
        component: Alogin
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if (to.path === '/login' || to.path === '/alogin') {
        next();
    } else {
        let token = localStorage.getItem('Authorization');
        if (token === null || token === '') {
            next('/login');
        } else {
            next()
        }
    }
})


export default router;
