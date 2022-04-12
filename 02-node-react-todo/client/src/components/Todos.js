import Todo from "./Todo";

const Todos = (props) => {
    const { todos, setTodos } = props;
    return (
        <ul>
            {
                todos.map((todo, key) => {
                    const todoProps = { key, todo, todos, setTodos };
                    return <Todo {...todoProps} />;
                })
            }
        </ul>
    );
};

export default Todos;