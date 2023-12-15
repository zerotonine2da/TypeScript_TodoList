import { createSlice } from '@reduxjs/toolkit';
import uuid from 'react-uuid';

//interface 사용 --> 가독성과 유지보수에 좋음
export interface Todo {
    id: string;
    title: string;
    content: string;
    isDone: boolean;
}

//초기 상태 정의
const initialState: Todo[] = [
    {
        id: uuid(),
        title: '제목1',
        content: '내용1',
        isDone: false,
    },
    {
        id: uuid(),
        title: '제목2',
        content: '내용2',
        isDone: true,
    },
];

//타입추론으로 타입지정을 안해도 되는 경우가 있음 : action.payload같은 경우
const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.push(action.payload);
        },
        removeTodo: (state, action) => {
            return state.filter((item) => item.id !== action.payload);
        },
        switchTodo: (state, action) => {
            return state.map((item) => {
                if (item.id === action.payload) {
                    return { ...item, isDone: !item.isDone };
                } else {
                    return item;
                }
            });
        },
    },
});

export const { addTodo, removeTodo, switchTodo } = todoSlice.actions;
export default todoSlice.reducer;
