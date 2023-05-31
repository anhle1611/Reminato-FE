import axios from "axios";

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
    localStorage.setItem('access_token', JSON.stringify(authRes.access_token));
    localStorage.setItem('refresh_token', JSON.stringify(authRes.refresh_token));
};
  
export const removeTokens = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};

export const getUser = () => localStorage.getItem('user');
export const setUser = (user: any) => localStorage.setItem('user', JSON.stringify(user));
export const getAccessToken = () => localStorage.getItem('access_token')?.slice(1, -1);
export const getRefreshToken = () => localStorage.getItem('refresh_token');