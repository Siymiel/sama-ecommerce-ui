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

    // Bypass login for demo user
    if (user.username === 'test' && user.password === 'password') {
        // Mock user data
        const mockUserData = {
            id: 1,
            username: 'test',
            token: 'demo-token', // You can use a placeholder token for demo purposes
            // Add any other user-related data you need here
        };
        
        dispatch(loginSuccess(mockUserData));
        toast.success("Successfully logged in as demo user!");
        return; // Exit early to bypass the API call
    }

    // try {
    //     const res = await publicRequest.post('/login', user)
    //     dispatch(loginSuccess(res.data))
    //     toast.success("Successfully logged in!")
    // } catch (err) {
    //     dispatch(loginFailure())
    // }
}

export const attemptLogout = async (dispatch, username) => {
    dispatch(logoutStart());

     // Bypass logout for demo user
     if (username === 'test') {
        // Perform any necessary cleanup or state reset here if needed
        dispatch(logoutSuccess());
        toast.success("Successfully logged out as demo user!");
        return; // Exit early to bypass the API call
    }


    try {
        await publicRequest.post('/logout', username)
        dispatch(logoutSuccess())
        toast.success("Successfully logged out!")
    } catch (err) {
        dispatch(logoutFailure())
    }
}

