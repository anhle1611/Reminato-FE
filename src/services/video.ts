import axios from "axios";

import { getAccessToken } from "./auth";

const API_URL = import.meta.env.VITE_API_URL;

const route = {
   VIDEOS: `${API_URL}/videos`,
   CREATE_VIDEO: `${API_URL}/videos`,
   LIKE_ACTION: `${API_URL}/videos/:id/like/action`
}

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAccessToken()}`,
    'Accept': 'application/json',
}

export interface PanigationPayload {
    page: number;
    limit: number;
}

export interface CreatePayload {
    title: string;
    url: string;
    descrition?: string;
}

export interface LikePayload {
    id: string;
    category: string;
}

export const videos = (params: PanigationPayload) => {
    return axios.get(route.VIDEOS, {params, headers});
};

export const create = (video: CreatePayload) => {
    return axios.post(route.CREATE_VIDEO, { video }, { headers });
};

export const like = ({id, category}: LikePayload) => {
    return axios.put(route.LIKE_ACTION.replace('/:id/', `/${id}/`), { category }, { headers });
};