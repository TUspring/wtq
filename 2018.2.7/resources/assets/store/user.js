import Vue from 'vue'
import util from'../js/util'
export const USER_SIGNIN = 'USER_SIGNIN' //登录成功
export const USER_SIGNOUT = 'USER_SIGNOUT' //退出登录
export const USER_SETSTATE = 'USER_SETSTATE' //设置user登录状态等信息
export const USER_SETINFO = 'USER_SETINFO' //更新user详细信息


export default {
    state: {
        id:util.getData('user').id||'',
        user_info:util.getData('user_info').user_info||{}
    },
    getters: {
        getUserId: state => () => state.id
    },
    mutations: {
        [USER_SIGNIN](state, user) {
            util.setData('user', user)
            Object.assign(state, user)
        },
        [USER_SIGNOUT](state) {
            util.removeData('user')
            util.removeData('user_info')
            state.id=''
            state.user_info={}
            // Object.keys(state).forEach(k => Vue.set(state, k ,null))
        },
        [USER_SETSTATE](state,data) {
            Object.assign(state, data)
        },
        [USER_SETINFO](state,data) {
            state.user_info=Object.assign({},state.user_info, data)
            util.setData('user_info', state.user_info)
        }
    },
    actions: {
        [USER_SIGNIN]({commit}, user) {
            commit(USER_SIGNIN, user)
        },
        [USER_SIGNOUT]({commit}) {
            commit(USER_SIGNOUT)
        },
        [USER_SETSTATE]({commit}, data) {
            commit(USER_SETSTATE, data)
        },
        [USER_SETINFO]({commit}, data) {
            commit(USER_SETINFO, data)
        }
    }
}