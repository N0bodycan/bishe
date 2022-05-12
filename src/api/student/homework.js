import * as axios from "@/common/myAxios";

export const getPageSize = (size,course,teacherName,studentId) => axios.get("/student/homework/page",{
    size : size,
    course : course,
    teacherName : teacherName,
    studentId: studentId
})

export const getPage = (index,size,course,teacherName,studentId) => axios.get("/student/homework/page/"+index,{
    size : size,
    course : course,
    teacherName : teacherName,
    studentId: studentId
})
