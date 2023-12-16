import { createSlice } from '@reduxjs/toolkit';

export interface Todo {
    id: string;
    title: string;
    content: string;
    isDone: boolean;
}

const initialState: Todo[] = [];

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            console.log('action', action);
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
        fetchTodo: (state, action) => {
            return action.payload;
        },
    },
});

export const { addTodo, removeTodo, switchTodo, fetchTodo } = todoSlice.actions;
export default todoSlice.reducer;
