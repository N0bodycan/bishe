import * as axios from "@/common/myAxios";

export const getAllClazz = () => axios.pureGet("/admin/allclazz")

export const getPageSize = (size,clazzname) => axios.get("/admin/clazzm/page",{
    size : size,
    clazzName : clazzname,
})

export const getPage = (index,size,clazzname) => axios.get("/admin/clazzm/page/"+index,{
    size : size,
    clazzName: clazzname,
})

export const addClazzCourse = (clazz,course,teacher) => axios.put("/admin/clazzm/addCC",{
    clazz:clazz,
    course: course,
    teacher: teacher
})

export const addClazz = (clazzId,clazzName) => axios.put("/admin/clazzm/add",{
    clazzId:clazzId,
    clazzName:clazzName
})
