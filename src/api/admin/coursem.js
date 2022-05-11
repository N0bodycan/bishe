import * as axios from "@/common/myAxios";

export const getPageSize = (size,name,teachername) => axios.get("/admin/coursem/page",{
    size : size,
    name : name,
    teachername : teachername,
})

export const getPage = (index,size,name,teachername) => axios.get("/admin/coursem/page/"+index,{
    size : size,
    name :name,
    teachername : teachername
})

export const getCCPageSize = (size,name,teachername,clazz) => axios.get("/admin/clazzcoursem/page",{
    size : size,
    name : name,
    teachername : teachername,
    clazz:clazz
})

export const getCCPage = (index,size,name,teachername,clazz) => axios.get("/admin/clazzcoursem/page/"+index,{
    size : size,
    name :name,
    teachername : teachername,
    clazz:clazz
})

export const getCourse = () => axios.pureGet("/admin/coursem/all")

export const  addCourse = (course) => axios.put("/admin/coursem/",course)

export const deleteCourse = (id) => axios.del("/admin/coursem/"+id)

export const deleteClazzCourse = (clazzId,courseId) => axios.del('/admin/clazzcourse/'+clazzId+'/'+courseId)
