import * as axios from "@/common/myAxios";

export const getTeacher = (id) => axios.get("/teacher",{
    id:id
})

export const getTeacherClazz = id => axios.get("/teacher/clazz",{
    id:id
})

export const publishHomework = homework => axios.put("/teacher/publish",homework)

export const deleteHomework = homeworkId => axios.del("/teacher/homework/"+homeworkId)

export const updateHomework = homework => axios.put("/teacher/homeworkupdate",homework)

export const getPageSize = (size,clazzId,type,teacherId) => axios.get("/teacher/homework/page",{
    size : size,
    clazzId : clazzId,
    type : type,
    teacherId: teacherId
})

export const getPage = (index,size,clazzId,type,teacherId) => axios.get("/teacher/homework/page/"+index,{
    size : size,
    clazzId : clazzId,
    type : type,
    teacherId: teacherId
})

export const getSHPageSize = (size,homeworkId,studentName,teacherId) => axios.get("/teacher/studenthomework/page",{
    size : size,
    homeworkId : homeworkId,
    studentName : studentName,
    teacherId: teacherId
})

export const getSHPage = (index,size,homeworkId,studentName,teacherId) => axios.get("/teacher/studenthomework/page/"+index,{
    size : size,
    homeworkId : homeworkId,
    studentName : studentName,
    teacherId: teacherId
})

export const commentHomework = score => axios.put("/teacher/comment",score)
