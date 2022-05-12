import * as axios from "@/common/myAxios";

export const uploadPic= (file) => axios.picpost("/pic/upload",file)

export const uploadFile = (file) => axios.filepost("/file/upload",file)
