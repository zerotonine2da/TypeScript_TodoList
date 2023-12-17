import api from './api';
import { Todo } from '../types/Todo';
//조회
const getTodos = async () => {
    const response = await api.get('/todos');
    return response.data;
};

//추가
const addTodos = async (newData: Todo) => {
    await api.post(`/todos/`, newData);
};

//삭제
const deleteTodos = async (id: string) => {
    await api.delete(`/todos/${id}`);
};

//변경
const changeTodos = async ({ id, isDone }: { id: string; isDone: boolean }) => {
    await api.patch(`/todos/${id}`, { isDone: !isDone });
};

export { getTodos, addTodos, deleteTodos, changeTodos };
