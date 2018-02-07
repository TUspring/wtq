import Vue from 'vue'

export default {
    state: {
        auth:true,
        changePWDModal:{
            show:false
        },
        header:{

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