import axios from 'axios';

export const getTodos = async () => await axios.get('/api/todos');
export const createNewTodo = async (value) => await axios.post('/api/todos', { value });
export const doneTodo = async (todoId, done) => await axios.patch(`/api/todos/${todoId}?done=${done}`);
export const deleteTodo = async (todoId) => await axios.delete(`/api/todos/${todoId}`);
export const orderTodo = async (todoId, order) => await axios.patch(`/api/todos/${todoId}`, { order });
export const updateTodo = async (todoId, value) => await axios.patch(`/api/todos/${todoId}`, { value });