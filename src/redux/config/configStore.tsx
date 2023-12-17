import { configureStore } from '@reduxjs/toolkit';
import todos from '../modules/todoSlice';
import { useDispatch } from 'react-redux';
const store = configureStore({
    reducer: { todos },
});

//useSelector state 타입 정의
export type RootState = ReturnType<typeof store.getState>;

//useDispatch
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
//export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
