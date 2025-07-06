import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './features/api/apiSlice';
// import other reducers...

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    // user: userReducer,
    // other reducers...
  },
  devTools: process.env.NODE_ENV !== 'production', 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
      immutableCheck: true, 
    }).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;