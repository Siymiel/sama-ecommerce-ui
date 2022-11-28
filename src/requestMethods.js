import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/v1";
const fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6IjYzNGIwMDg2ODJmMzZlYjQzNTE5NDk3OSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NjQyODQwOSwiZXhwIjoxNjY2Njg3NjA5fQ.HWEXt24ssQDDzFFCsskRzfk4W4zCihc-pYOkjsDUkOI";
const TOKEN = localStorage.getItem("persist:root") ? JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)?.currentUser?.accessToken : fakeToken
// console.log(TOKEN)

export const publicRequest = axios.create({
    baseURL: BASE_URL
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${TOKEN}` }
});