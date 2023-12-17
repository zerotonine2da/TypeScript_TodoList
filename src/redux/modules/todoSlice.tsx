import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../axios/api';

export interface Todo {
    id: string;
    title: string;
    content: string;
    isDone: boolean;
}

interface TodoState {
    todos: Todo[];
    isLoading: boolean;
    isError: boolean;
    Error: string | null;
}

const initialState: TodoState = {
    todos: [],
    isLoading: false,
    isError: false,
    Error: null,
};

//조회
export const __getTodos = createAsyncThunk<Todo[]>('getTodos', async (payload, thunkAPI) => {
    try {
        const response = await api.get('/todos');
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        console.log(error);
    }
});

//추가
export const __addTodos = createAsyncThunk<Todo[], {}>('addTodos', async (payload, thunkAPI) => {
    try {
        const response = await api.post(`/todos/`, payload);
        thunkAPI.dispatch(__getTodos());
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        console.log('todoSlice [add] error', error);
        throw error;
    }
});

//삭제
export const __deleteTodos = createAsyncThunk<Todo[], string>('deleteTodos', async (payload, thunkAPI) => {
    try {
        const response = await api.delete(`/todos/${payload}`);
        thunkAPI.dispatch(__getTodos());
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        console.log('todoSlice [delete] error', error);
        throw error;
    }
});

//변경
export const __changeTodos = createAsyncThunk<Todo, { id: string; isDone: boolean }>(
    'changeTodos',
    async (payload, thunkAPI) => {
        try {
            const response = await api.patch(`/todos/${payload.id}`, { isDone: !payload.isDone });
            thunkAPI.dispatch(__getTodos());

            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            console.log('todoSlice [delete] error', error);
            throw error;
        }
    }
);

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(__getTodos.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(__getTodos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.todos = action.payload;
            })
            .addCase(__getTodos.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.Error = action.error.message || 'error';
            });
        builder
            .addCase(__addTodos.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(__addTodos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(__addTodos.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.Error = action.error.message || 'error';
            });
        builder
            .addCase(__deleteTodos.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(__deleteTodos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(__deleteTodos.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.Error = action.error.message || 'error';
            });
        builder
            .addCase(__changeTodos.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(__changeTodos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(__changeTodos.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.Error = action.error.message || 'error';
            });
    },
});

export default todoSlice.reducer;
