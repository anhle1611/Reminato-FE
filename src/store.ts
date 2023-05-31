import { configureStore } from '@reduxjs/toolkit';

import { authenticationReducer } from './core/slices/authGlobal';
import { messageReducer } from './core/slices/messageGlobal';
import { videoReducer } from './containers/Video/slice';

export const store = configureStore({
	reducer: {
		authentication: authenticationReducer,
		message: messageReducer,
		video: videoReducer
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;