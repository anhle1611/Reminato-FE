import axios from "axios";
import moment from "moment";

const API_URL = import.meta.env.VITE_API_URL;

const route = {
   LOGIN: `${API_URL}/auth/login`,
   REGISTER: `${API_URL}/users`,
   LOGOUT: `${API_URL}/auth/logout`
}

const headers = {
    'Content-Type': 'application/json'
}

export interface AuthPayload {
    name: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    password: string;
    password_confirmation: string
}

export const register = (newUser: RegisterPayload) => {
    return axios.post(route.REGISTER, {user: newUser}, { headers });
};

export const login = (user: AuthPayload) => {
    return axios.post(route.LOGIN, {
        user,
    }).then((response) => {
        if (response.data.data) {
            setTokens(response.data.data)
        }

        return response.data.data;
    }).catch((error) => {
        console.log(error)
        throw error;
    });
};

export const logout = () => {
    removeTokens();
    return axios.delete(route.LOGOUT, { 
        headers: { ...headers, ...authHeader()},
    });
};

export const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user')|| "");
  
    if (user && user.accessToken) {
        return { 'Authorization': `Bearer ${user.access_token}` };
    } else {
        return {};
    }
}

export const isAuthenticated = (): boolean => {
    
    return getAccessToken() ? true : false;
};
  

export const setTokens = (authRes: any) => {
    localStorage.setItem('user', JSON.stringify(authRes));
};
  
export const removeTokens = () => {
    localStorage.removeItem('user');
};

export const setUser = (user: any) => localStorage.setItem('user', JSON.stringify(user));

export const getUser = () => {
    const user = localStorage.getItem('user');
    if(user) {
        const userJson = JSON.parse(user);
        if(moment().isSameOrBefore(userJson.expires_on)) return userJson;
    }

    removeTokens();
    return null;
};

export const getAccessToken = () => {
    const user = localStorage.getItem('user');
    if(user) {
        const userJson = JSON.parse(user);
        if(moment().isSameOrBefore(userJson.expires_on)) return userJson.access_token;
    }

    removeTokens();
    return null;
};

export const getRefreshToken = () => {
    const user = localStorage.getItem('user');
    if(user) {
        const userJson = JSON.parse(user);
        if(moment().isSameOrBefore(userJson.expires_on)) return userJson.refresh_token;
    }

    removeTokens();
    return null;
};