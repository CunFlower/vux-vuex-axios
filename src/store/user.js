import Vue from 'vue'

import config from '../config'

/**
 * 登录
 */
const LOGIN = 'LOGIN'
/**
 * 登录成功
 */
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
/**
 * 登录失败
 */
const LOGIN_ERROR = 'LOGIN_ERROR'
/**
 * 登录链接
*/
const LOGIN_URL =  config.apiUrl + '/user/login'

/****************************************************************************************************************/
/**
 * 退出登录
 */
const LOGOUT = 'LOGOUT'
/**
 * 退出登录成功
 */
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
/**
 * 退出登录失败
 */
const LOGOUT_ERROR = 'LOGOUT_ERROR'
/**
 * 退出登录链接
*/
const LOGOUT_URL =  config.apiUrl + '/user/logout'

export default {
    state:{
        arr:[1,2,6,7,0,5]
    },
    mutations:{
        /**
         * 登录成功
         */
        [LOGIN_SUCCESS](state, data) {
            console.log('LOGIN_SUCCESS', data)
            state['INFO'] = data.data
            localStorage.setItem('userInfo', JSON.stringify(state))
        },
        /**
         * 登录失败
         */
        [LOGIN_ERROR](state, error) {
            console.log('LOGIN_ERROR', error)
        },
        /**
         * 退出登录成功
         */
        [LOGOUT_SUCCESS](state, data) {
            console.log('LOGOUT_SUCCESS', data)
        },
        /**
         * 退出登录失败
         */
        [LOGOUT_ERROR](state, error) {
            console.log('LOGOUT_ERROR', error)
        }
    },
    actions:{
        /**
         * 登录
         */
        [LOGIN]({
            commit,
            state
        }, params) {
            return new Promise((resolve, reject) => {
                Vue.http.post(LOGIN_URL,params).then((response) => {
                    commit('LOGIN_SUCCESS', response.data)
                    resolve(response.data)
                }, (error) => {
                    commit('LOGIN_ERROR', error)
                    reject()
                })
            })
        },
        /**
         * 退出登录
         */
        [LOGOUT]({
            commit,
            state
        }, params) {
            return new Promise((resolve, reject) => {
                Vue.http.get(LOGOUT_URL).then((response) => {
                    commit('LOGOUT_SUCCESS', response.data)
                    resolve(response.data)
                }, (error) => {
                    commit('LOGOUT_ERROR', error)
                    reject()
                })
            })
        }
    },
    getters:{
        list:state =>{
            // return state.arr.filter(item => item >5)
            return state['arr'].filter(item => item >5)
        }
    }
}