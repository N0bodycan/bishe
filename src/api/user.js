import {get, post, pureGet} from "@/common/myAxios";

export const adminLogin = (username, password) => post("/admin/login", {
    username: username,
    password: password,
});
export const studentLogin = (username, password) => post("/student/login", {
    username: username,
    password: password,
});

export const teacherLogin = (username, password) => post("/teacher/login", {
    username: username,
    password: password,
});

export const getLoginStatus = () => pureGet("/login/status");

export const getLoginPhoto = (username,role) => get("/login/photo",{
    username: username,
    role: role
})

export const logout = () => {
    localStorage.removeItem("Authorization");
    localStorage.removeItem("vuex")
};
