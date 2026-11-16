import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_SIGNUP_FAIL,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_PROFILE_UPDATE_REQUEST,
    USER_PROFILE_UPDATE_SUCCESS,
    USER_PROFILE_UPDATE_FAIL,
    USER_PROFILE_UPDATE_RESET,
} from "../constants/UserConstansts";

export const userSignupReducers =(state={},action)=>{
    switch(action.type){
        case USER_SIGNUP_REQUEST:
            return {loading:true}

        case USER_SIGNUP_SUCCESS:
            return {loading:false,userInfo:action.payload}

        case USER_SIGNUP_FAIL:
            return {loading:false,error:action.payload}

        default:
            return state
    }
}

export const userloginReducers =(state={},action)=>{
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {loading:true}

        case USER_LOGIN_SUCCESS:
            return {loading:false,userInfo:action.payload}

        case USER_PROFILE_UPDATE_SUCCESS:
            return { ...state, loading: false, userInfo: action.payload }

        case USER_LOGIN_FAIL:
            return {loading:false,error:action.payload}

        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userProfileUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_PROFILE_UPDATE_REQUEST:
            return { loading: true }
        case USER_PROFILE_UPDATE_SUCCESS:
            return { loading: false, success: true }
        case USER_PROFILE_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case USER_PROFILE_UPDATE_RESET:
            return {}
        default:
            return state
    }
}

export const userListReducers = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { ...state, loading: true, users: [] }
        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload }
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload, users: [] }
        default:
            return state
    }
}