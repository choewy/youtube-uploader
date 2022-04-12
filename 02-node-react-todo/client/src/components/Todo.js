import { useRef, useState } from "react";
import { deleteTodo, doneTodo, orderTodo, updateTodo } from "../actions/todo.actions";
import useOutsideClick from "../hooks/useOutsideClick";

const Todo = (props) => {
    const { todo, todos, setTodos } = props;
    const { _id, value, order, doneAt } = todo;
    const [editable, setEditable] = useState(false);
    const [newValue, setNewValue] = useState(value);
    const inputRef = useRef(null);

    const editEnable = () => setEditable(true);
    const editDisable = () => setEditable(false);

    const doneClick = async (e) => {
        const { data } = await doneTodo(_id, Boolean(doneAt));
        setTodos(todos.map(todo => todo._id === _id ? data.todo : todo));
    };

    const newValueChange = (e) => {
        const { target: { value } } = e;
        setNewValue(value);
    };

    const upClick = async () => {
        const { data } = await orderTodo(_id, order + 1);
        const { current, target } = data;
        if (target) {
            setTodos(todos.map(todo => {
                if (current._id === todo.id) return target;
                if (target._id === todo._id) return current;
                return todo;
            }));
        };
    };

    const downClick = async () => {
        const { data } = await orderTodo(_id, order - 1);
        const { current, target } = data;
        if (target) {
            setTodos(todos.map(todo => {
                if (current._id === todo.id) return target;
                if (target._id === todo._id) return current;
                return todo;
            }));
        };
    };

    const deleteClick = async () => {
        const { data: { ok } } = await deleteTodo(_id);
        if (ok) setTodos(todos.filter(todo => todo._id !== _id));
    };

    const valueSave = async () => {
        if (value !== newValue) {
            const { data: { ok } } = await updateTodo(_id, newValue);
            if (ok) setTodos(todos.map(todo => todo._id === _id ? { ...todo, value: newValue } : todo))
        }
        editDisable();
    };

    useOutsideClick(inputRef, valueSave);

    return (
        <li >
            <input type="checkbox" checked={doneAt ? true : false} onChange={doneClick} />
            {
                editable
                    ? <input
                        ref={inputRef}
                        value={newValue}
                        onChange={newValueChange}
                        onAuxClick={editDisable} />
                    : <span onDoubleClick={editEnable}>{value}</span>
            }
            <button onClick={upClick}>up</button>
            <button onClick={downClick}>down</button>
            <button onClick={deleteClick}>-</button>
        </li>
    );
};

export default Todo;