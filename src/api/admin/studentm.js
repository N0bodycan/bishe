import * as axios from "@/common/myAxios";

export const getPageSize = (size,username,name,clazz) => axios.get("/admin/studentm/page",{
    size : size,
    username : username,
    name : name,
    clazz: clazz
})

export const getPage = (index,size,username,name,clazz) => axios.get("/admin/studentm/page/"+index,{
    size : size,
    username :username,
    name : name,
    clazz : clazz
})

export const addStudent = (student) => axios.put("/admin/studentm/add",student)

export const existStudent = (username) => axios.get("/admin/studentm/exist",{
    username:username
})

export const resetPassword = (username) => axios.post('/admin/studentm/resetp/'+username)

export const deleteStudent = (username) => axios.post('/admin/studentm/delete/'+username)
