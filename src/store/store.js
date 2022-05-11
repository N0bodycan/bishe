import Vue from "vue";
import Vuex from "vuex";
import SideBarItem from "@/common/sideBarItem";
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        status: {
            loggedIn: false,
            userId: -1,
            username: "",
            userType: 0
        },
        token: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
        loading: false,
        sideBarItems: []
    },
    mutations: {
        login(state, res) {
            console.log("login",res)
            state.status.loggedIn = res.isLogin;
            state.status.userId = res.username;
            state.status.username = res.name;
            state.status.userType = res.userType;

            let items = [];
            for (let i = 0; i < SideBarItem.items.length; i++) {
                let item = SideBarItem.items[i];
                if (item.userType === res.userType) {
                    items.push(item);
                }
            }

            state.sideBarItems = items;
        },
        logout(state) {
            state.status = {
                loggedIn: false,
                userId: -1,
                username: "",
                userType: 0,
            }
        },

        changeToken(state, token) {
            state.token = token;
            localStorage.setItem('Authorization', token);
        },

        loginStatus(state, islogin){
            state.status.loggedIn = islogin;
            if (!islogin){
                state.status.loggedIn = false
                state.status.userId = -1
                state.status.username = ""
                state.status.userType = 0
                state.token =  ''
                state.loading= false
                state.sideBarItems= []
                localStorage.removeItem("Authorization")
                console.log("token被删除")
            }
        }
    },
    plugins: [createPersistedState({
        storage: window.localStorage,
        reducer(val) {
            return {
                // 只储存state中的assessmentData
                status: val.status,
                loading: val.loading,
                sideBarItems: val.sideBarItems
            }
        }
    })]
})
