import * as axios from "@/common/myAxios";

export const getPageSize = (size,username,name) => axios.get("/admin/teacherm/page",{
    size : size,
    username : username,
    name : name,
})

export const getPage = (index,size,username,name) => axios.get("/admin/teacherm/page/"+index,{
    size : size,
    username :username,
    name : name
})

export const getCSPageSize = (size,username,name,clazz) => axios.get("/admin/teacherm/clazzpage",{
    size : size,
    username : username,
    name : name,
    clazz: clazz
})

export const getCSPage = (index,size,username,name,clazz) => axios.get("/admin/teacherm/clazzpage/"+index,{
    size : size,
    username :username,
    name : name,
    clazz: clazz
})

export const existTeacher = (username) => axios.get("/admin/teacherm/exist",{
    username:username
})

export const getTeacherByTitle = course => axios.get("/admin/teacherm/getC",{
    course: course
})

export const addTeacher = (teacher) => axios.put("/admin/teacherm/add",teacher)

export const resetPassword = (username) => axios.post('/admin/teacherm/resetp/'+username)

export const deleteTeacher = (username) => axios.post('/admin/teacherm/delete/'+username)

export const pullTeacher = (clazz,username) => axios.post('/admin/teacherm/pull/'+clazz+'/'+username);
