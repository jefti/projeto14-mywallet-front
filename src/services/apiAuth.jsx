import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

function createConfig(token){
    return {headers:{Authorization:`Bearer ${token}`}}
}

function login(body){
    //console.log("link :" + apiURL);
    const promise = axios.post(`${apiURL}/sign-in`,body);
    return promise;
};

function signup(body){
    const promise = axios.post(`${apiURL}/sign-up`,body);
    return promise;
};

function logout(token){
    const promise = axios.delete(`${apiURL}/sessions`,createConfig(token));
    return promise;
}

const apiAuth = {login, signup, logout};
export default apiAuth;