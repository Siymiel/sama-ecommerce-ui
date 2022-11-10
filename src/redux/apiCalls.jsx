import { publicRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./userFeature"

export const attemptLogin = async (dispatch, user) => {
    dispatch(loginStart());

    try {
        const res = await publicRequest.post('/login', user)
        dispatch(loginSuccess(res.data))
    } catch (err) {
        dispatch(loginFailure())
    }
}