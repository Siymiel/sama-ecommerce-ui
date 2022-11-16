import { publicRequest } from "../requestMethods";
import { 
    loginFailure, 
    loginStart, 
    loginSuccess,
    logoutStart, 
    logoutSuccess, 
    logoutFailure, 
} from "./userFeature"
import toast from 'react-hot-toast';

export const attemptLogin = async (dispatch, user) => {
    dispatch(loginStart());

    try {
        const res = await publicRequest.post('/login', user)
        dispatch(loginSuccess(res.data))
        toast.success("Successfully logged in!")
    } catch (err) {
        dispatch(loginFailure())
    }
}

export const attemptLogout = async (dispatch, username) => {
    dispatch(logoutStart());

    try {
        await publicRequest.post('/logout', username)
        dispatch(logoutSuccess())
        toast.success("Successfully logged out!")
    } catch (err) {
        dispatch(logoutFailure())
    }
}

