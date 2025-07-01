import { configureStore } from '@reduxjs/toolkit';

// import your reducers here
// import userReducer from './slices/userSlice';

const store = configureStore({
    reducer: {
        // user: userReducer,
        // add other reducers here
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;