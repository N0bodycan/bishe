import * as axios from "@/common/myAxios";

export const uploadPic= (file) => axios.picpost("/pic/upload",file)
