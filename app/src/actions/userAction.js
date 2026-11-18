import { 
    USER_SIGNUP_FAIL, 
    USER_SIGNUP_REQUEST, 
    USER_SIGNUP_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_PROFILE_UPDATE_REQUEST,
    USER_PROFILE_UPDATE_SUCCESS,
    USER_PROFILE_UPDATE_FAIL} from "../constants/UserConstansts";
import axios from '../api'

export const signup = (fname,lname,email,password)=>async(dispatch)=>{
    try{
        dispatch({
            type:USER_SIGNUP_REQUEST
        })

        const config={
            headers:{
                "Content-type":"application/json"
            },
        }

        const {data}=await axios.post("/api/users/register",{
            fname:fname,
            lname:lname,
            email:email,
            password:password,
        },config)

        dispatch({
            type:USER_SIGNUP_SUCCESS,
            payload:data,
        })
    }

    catch(error){
        dispatch({
            type:USER_SIGNUP_FAIL,
            payload: error.response && (error.response.data.details || error.response.data.detail)
            ? error.response.data.details || error.response.data.detail
            : error.message,
        })
    }
}


export const login = (email,password)=>async(dispatch)=>{
    try{
        dispatch({
            type:USER_LOGIN_REQUEST
        })

        const config={
            headers:{
                "Content-type":"application/json"
            },
        }

        const {data}=await axios.post("/api/users/login",{
            email:email,
            password:password,
        },config)

        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data,
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    }

    catch(error){
        dispatch({
            type:USER_LOGIN_FAIL,
            payload: error.response && (error.response.data.details || error.response.data.detail)
            ? error.response.data.details || error.response.data.detail
            : error.message,
        })
    }
}

export const logout=()=>(disptach)=>{
    localStorage.removeItem('userInfo')
    disptach({type:USER_LOGOUT})
}

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_LIST_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get('/api/users/getallusers/', config)
        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload:
                error.response && (error.response.data.details || error.response.data.detail)
                    ? error.response.data.details || error.response.data.detail
                    : error.message,
        })
    }
}

export const updateUserProfile = (profile) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_PROFILE_UPDATE_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.put('/api/users/profile/', profile, config)
        const updatedUserInfo = { ...userInfo, ...data }
        localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo))
        dispatch({
            type: USER_PROFILE_UPDATE_SUCCESS,
            payload: updatedUserInfo,
        })
    } catch (error) {
        dispatch({
            type: USER_PROFILE_UPDATE_FAIL,
            payload:
                error.response && (error.response.data.details || error.response.data.detail)
                    ? error.response.data.details || error.response.data.detail
                    : error.message,
        })
    }
}