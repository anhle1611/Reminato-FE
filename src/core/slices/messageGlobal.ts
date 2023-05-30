import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { MessageState } from '../interfaces/message';

const initialState: MessageState = {};

export const messageSlice = createSlice({
	name: 'message',
	initialState,
	reducers: {
		show: (state, action: PayloadAction<any>) => {
			return {
				...state,
				message: action.payload
			};
		},
		hidden: () => {
			return {};
		}
	},
});

export const { show, hidden } = messageSlice.actions;
export const selectMessageGlobal = (state: RootState) => state.message;
export const messageReducer = messageSlice.reducer;
