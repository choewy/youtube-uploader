import { useCallback, useEffect, useState } from "react";
import { createNewTodo, getTodos } from "./actions/todo.actions";
import Todos from "./components/Todos";

const App = () => {
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState([]);

  const getTodosAsync = useCallback(async () => {
    const { data } = await getTodos();
    setTodos(data.todos);
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await getTodos();
      setTodos(data.todos);
    })();
    return () => { };
  }, []);

  const valueChange = (e) => {
    const { target: { value } } = e;
    setValue(value);
  };

  const createTodo = async () => {
    setValue('');
    await createNewTodo(value);
    await getTodosAsync();
  };

  const todosProps = { todos, setTodos };

  return (
    <div>
      <input
        value={value}
        onChange={valueChange} />
      <input type='button'
        value='추가'
        onClick={createTodo} />
      <Todos {...todosProps} />
    </div>
  )
}

export default App;