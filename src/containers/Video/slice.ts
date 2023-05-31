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
	totalObjects: 0
};
export const videoSlice = createSlice({
	name: 'video',
	initialState,
	reducers: {
		loadList: (state, action: PayloadAction<any>) => {
			const { items, totaPage, totalObjects } = action.payload

			return {
				videos: [...state.videos, ...items],
				totaPage,
				totalObjects
			};
		},
		addVideo: (state, action: PayloadAction<Video>) => {
			return {
				...state,
				videos: [action.payload, ...state.videos]
			};
		},
		likeAction: (state, action: PayloadAction<any>) => {
			const { id, type, name } = action.payload;

			return {
				...state,
				videos: _.map(state.videos, item => {
					if(item.id === id) {
						if(type === 1) {
							item.like = item.like + 1
						}else {
							item.dislike = item.dislike + 1
						}

						item.likes = [{ name }]

						return item;
					}else {
						return item;
					}

				})
			};
		}
	},
});

export const loadListVideo = (pagination: any) => async (dispatch: any) => {
	try {
		const res = await videos(pagination);
		if(res.data.data) {
			dispatch(loadList(res.data.data));
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
		const res = await create(video);
		dispatch(addVideo(res.data.data));
		dispatch(show({
			type: "success",
			title: "Video",
			content:  "Share video thành công !"
		}));
		history.push('/');
	} catch (err) {
		dispatch(show({
			type: "error",
			title: "Authentication",
			content:  "Share video không thành công !"
		}));
	}
};

export const likeVideo = (like: any) => async (dispatch: any) => {
	try {
		await like(like);
		dispatch(likeAction(like));
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
export const { loadList, addVideo, likeAction } = videoSlice.actions;
export const selectVideos = (state: RootState) => state.video;
export const videoReducer = videoSlice.reducer;
