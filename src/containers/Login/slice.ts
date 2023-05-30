import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login } from '../../services/auth';
import { RootState } from '../../store';
import { history } from '../../utils/history';
import { show } from '../../core/slices/messageGlobal';


export interface IAuthentication {
  isProcessingRequest: boolean;
  accessToken?: string | null;
  refreshToken?: string | null;
  userLogin?:string | null
}
const initialState: IAuthentication = { isProcessingRequest: false };
export const authenticationSlice = createSlice({
	name: 'authentication',
	initialState,
	reducers: {
		success: (state, action: PayloadAction<any>) => {
			console.log(action.payload)
			return {
				...state,
				userLogin: action.payload,
				accessToken: action.payload.accessToken || null,
				refreshToken: action.payload.refreshToken || null,
				isProcessingRequest: false,
			};
		},
		error: (state) => {
			return {
				...state,
				userLogin: null,
				accessToken: null,
				refreshToken: null,
				isProcessingRequest: false,
			};
		},
	},
});
export const authenticateUser = (userData: any) => async (dispatch: any) => {
	try {
		const authData = await login(userData);
		dispatch(success(authData));
		dispatch(show({
			type: "success",
			title: "Authentication",
			content:  "Xác thực người dùng thành công !"
		}));
		history.push('/');
	} catch (err) {
		dispatch(error());
		dispatch(show({
			type: "error",
			title: "Authentication",
			content:  "Xác thực người dùng không thành công !"
		}));
	}
};
export const { success, error } = authenticationSlice.actions;
export const selectAuthentication = (state: RootState) => state.authentication;
export const authenticationReducer = authenticationSlice.reducer;
