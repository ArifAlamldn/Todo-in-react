import './App.css';
import { useState } from 'react';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const onChange = (e) => {
    e.preventDefault();
    if (editId) {
      const updatedTodo = todos.map((t) =>
        t.id === editId ? { id: t.id, todo } : t
      );
      setTodos(updatedTodo);
      setEditId(0);
      setTodo("");
      return;
    }
    if (todo !== "") {
      setTodos([{ id: `${Date.now()}`, todo }, ...todos]);
      setTodo("");
    }
  };

  const deleteTodo = (id) => {
    const newTodo = todos.filter((to) => to.id !== id);
    setTodos(newTodo);
  };

  const editHandler = (id) => {
    const edit = todos.find((to) => to.id === id);
    setTodo(edit.todo);
    setEditId(id);
  };

  return (
    <div className='container'>
      <div className='box'>
        <h1>TodoList</h1>

        <form action="" onSubmit={onChange}>
          <input
            value={todo}
            type="text"
            placeholder='Write Here...'
            onChange={(e) => { setTodo(e.target.value); }}
          />
          <button type='submit'>{editId ? "Edit" : "Go"}</button>
        </form>
        <div className='line'></div>

        <ul>
          {todos.map((val) => (
            <li key={val.id}>
              <span>{val.todo}</span> {/* Removed unnecessary key prop here */}
              <div>
                <button onClick={() => { editHandler(val.id); }}>Edit</button>
                <button onClick={() => { deleteTodo(val.id); }}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
