import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { logout, login, register, getUser, getAccessToken, getRefreshToken } from '../../services/auth';
import { RootState } from '../../store';
import { history } from '../../utils/history';
import { show } from '../../core/slices/messageGlobal';


export interface IAuthentication {
  isProcessingRequest: boolean;
  accessToken?: string | null;
  refreshToken?: string | null;
  userLogin?:string | null
}
const initialState: IAuthentication = { 
    isProcessingRequest: false,
    userLogin: JSON.parse(getUser() || ""),
    accessToken: getAccessToken() || "",
    refreshToken: getRefreshToken() || ""
};
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
		out: (state) => {
			return {
				...state,
				userLogin: null,
				accessToken: null,
				refreshToken: null,
				isProcessingRequest: false,
			};
		}
	},
});

export const authenticateUser = (userData: any) => async (dispatch: any) => {
	try {
		const authData = await login(userData);
        console.log(authData)
		dispatch(success(authData));
		dispatch(show({
			type: "success",
			title: "Authentication",
			content:  "Xác thực người dùng thành công !"
		}));
	} catch (err) {
		dispatch(error());
		dispatch(show({
			type: "error",
			title: "Authentication",
			content:  "Xác thực người dùng không thành công !"
		}));
	}
};

export const logoutUser = () => async (dispatch: any) => {
   
	try {
		await logout();
	} catch (err) {
		console.log(err);
	}

    dispatch(out());
    dispatch(show({
        type: "success",
        title: "Authentication",
        content:  "Đăng xuất người dùng thành công !"
    }));
};

export const registerUser = (newUserData: any) => async (dispatch: any) => {
    try {
        await register(newUserData);
        dispatch(
            show({
                type: "success",
                title: "Authentication",
                content:  "Đăng kí người dùng thành công !"
            }
        ));
    } catch (err) {
        dispatch(show({
            type: "error",
            title: "Authentication",
            content:  "Đăng kí người dùng không thành công !"
        }));
    }
};

export const { success, error, out } = authenticationSlice.actions;
export const selectAuthentication = (state: RootState) => state.authentication;
export const authenticationReducer = authenticationSlice.reducer;
