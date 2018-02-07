import Vue from 'vue'

export default {
    state: {
        auth:true,
        loginModal:{
            show:false
        },
        resetPWDModal:{
            show:false
        },
        forgetPassword_Modal:{
            show:false
        },
        header:{
            contentType:'default',
            rightContentType:'default'
        }
    },
    getters: {
        getHeaderState: state => () => state.header
    },
    mutations: {
        changeCompontentStates:(state,data) => {
            Object.keys(data).forEach((key) => {
                state[key]=data[key]
            })
        }
    },
    actions: {
        changeCompontentStates:({commit}, data) => {
            commit('changeCompontentStates', data)
        }
    }
}