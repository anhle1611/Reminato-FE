import { configureStore } from '@reduxjs/toolkit';

import { authenticationReducer } from './containers/Login/slice';

import { messageReducer } from './core/slices/messageGlobal';

export const store = configureStore({
	reducer: {
		authentication: authenticationReducer,
		message: messageReducer
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;