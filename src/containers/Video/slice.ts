import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { history } from '../../utils/history';
import { show } from '../../core/slices/messageGlobal';
import { IVideoState, Video } from './type';
import _ from 'lodash'
import { create, videos, like } from '../../services/video';


const initialState: IVideoState = { 
	videos: [],
	totaPage: 1,
	totalObjects: 0,
	popupCreate: false
};
export const videoSlice = createSlice({
	name: 'video',
	initialState,
	reducers: {
		loadList: (state, action: PayloadAction<any>) => {
			const { items, total_pages, total_objects } = action.payload.data;
			const {page} = action.payload.pagination;

			state.videos = page === 1 ? items : [...state.videos, ...items];
			state.totaPage = total_pages;
			state.totalObjects = total_objects;
		},
		addVideo: (state, action: PayloadAction<Video>) => {
			state.videos = [action.payload, ...state.videos]
		},
		likeAction: (state, action: PayloadAction<any>) => {
			const { id, category, name, userId, voted } = action.payload;

			state.videos = _.map(state.videos, item => {
				if(item.id === id) {
					if(category === 1) {
						item.like = item.like + 1
						item.dislike = voted ? item.dislike - 1 : item.dislike
					}else {
						item.like = voted ? item.like - 1 : item.like
						item.dislike = item.dislike + 1
					}

					item.user_like = name;
					item.like_category = category;

					return item;
				}else {
					return item;
				}

			})
		},
		openPopupCreate: (state, action: PayloadAction<boolean>) => {
			state.popupCreate = action.payload;
		},
	},
});



export const loadListVideo = (pagination: any) => async (dispatch: any) => {
	try {
		const res = await videos(pagination);
		if(res.data.data) {
			dispatch(loadList({data: res.data.data, pagination}));
		}
	} catch (err) {
		console.log(err)
		dispatch(show({
			type: "error",
			title: "Video",
			content:  "Có lỗi xảy ra khi load video !"
		}));
	}
};

export const createVideo = (video: any) => async (dispatch: any) => {
	try {
		await create(video);
		dispatch(loadListVideo({page: 1, limit: 3}));
		dispatch(show({
			type: "success",
			title: "Video",
			content:  "Share video thành công !"
		}));
		dispatch(openPopupCreate(false));
	} catch (err) {
		console.log(err)
		dispatch(show({
			type: "error",
			title: "Authentication",
			content:  "Share video không thành công !"
		}));
	}
};

export const likeVideo = (liked: any) => async (dispatch: any) => {
	try {
		await like(liked);
		dispatch(likeAction(liked));
		dispatch(show({
			type: "success",
			title: "Video",
			content:  "Bạn đã like video!"
		}));
		history.push('/');
	} catch (err) {
		dispatch(show({
			type: "error",
			title: "Video",
			content:  "Có lỗi xảy ra!"
		}));
	}
};
export const { loadList, addVideo, likeAction, openPopupCreate } = videoSlice.actions;
export const selectVideos = (state: RootState) => state.video;
export const videoReducer = videoSlice.reducer;
