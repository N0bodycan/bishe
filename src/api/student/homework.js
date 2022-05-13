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

export const getHistoryPageSize = (size,course,teacherName,studentId) => axios.get("/student/homework/historypage",{
    size : size,
    course : course,
    teacherName : teacherName,
    studentId: studentId
})

export const getHistoryPage = (index,size,course,teacherName,studentId) => axios.get("/student/homework/historypage/"+index,{
    size : size,
    course : course,
    teacherName : teacherName,
    studentId: studentId
})

export const getCommitPageSize = (size,studentId) => axios.get("/student/homework/commitpage",{
    size : size,
    studentId: studentId
})

export const getCommitPage = (index,size,studentId) => axios.get("/student/homework/commitpage/"+index,{
    size : size,
    studentId: studentId
})

export const submitHomework = (homework) => axios.put('/student/homework/submit',homework)

export const updateHomework = homework => axios.post('/student/homework/update',homework)

export const uploadFile = (file) => axios.filepost("/file/upload/student",file)

export const getCommentPage = (index,size,homeworkId,course,studentId) => axios.get("/student/homework/commentpage/"+index,{
    size: size,
    homeworkId: homeworkId,
    course:course,
    studentId:studentId
})

export const getCommentPageSize = (size,homeworkId,course,studentId) => axios.get("/student/homework/commentpage",{
    size:size,
    homeworkId:homeworkId,
    course:course,
    studentId:studentId,
})
