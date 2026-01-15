import React, { useState } from "react";

function App() {
  // state holds the list of todos, each todo is an object with id, text, and completed status
  const [todos, setTodos] = useState([]);

  // state holds the current value of the input field
  const [newTodo, setNewTodo] = useState("");

  // handle changes to the input field
  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  // handle form to submit a new todo
  const handleSubmit = (event) => {
    event.preventDefault(); // prevents page refreshing

    // doesn't allow empty todos, trims whitespaces
    if (newTodo.trim() === "") return;

    // creates a new todo object
    const todo = {
      id: Date.now(), // unique id based on timestamp
      text: newTodo,
      completed: false,
    };

    // add the new task to the todos array
    setTodos([...todos, todo]);

    // clears the input field after submission
    setNewTodo("");
  };

  // changes completion status of a todo
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // delete a todo task
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Count of how many remaining todos are left
  const remainingTodos = todos.filter((todo) => !todo.completed).length;
// styling and html 
  return (
    <div
      style={{
        backgroundColor: "#c3b3c8af",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          margin: "50px auto",
          padding: "20px",
          border: "1px solid #e0dee3",
          borderRadius: "8px",
          boxShadow: "0 5px 5px black",
          fontFamily: "monospace",
          backgroundColor: "#f1cfed",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#353434" }}>My Todo List ✅</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit} // handles form submission
        style={{ display: "flex", marginBottom: "20px" }}
      >
        <input // input field for new todo
          type="text"
          value={newTodo}
          onChange={handleInputChange} // updates state on change
          placeholder="Add something todo..."
          style={{
            flex: "1",
            padding: "10px",
            border: "1px solid #ccc9c9",
            borderRadius: "5px",
          }}
        />
        <button // button to add new todo
          type="submit"
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            backgroundColor: "#4cc476d7",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          ➕
        </button>
      </form>

      {/* remaining todos styling */}
      <p style={{ marginBottom: "10px", color: "#545252" }}>
        {remainingTodos} todos remaining
      </p>

      {/* todo list */}
      {todos.length === 0 ? (
        <p style={{ textAlign: "center", color: "#7a7878" }}>
          Looks like you have nothing to do! YAY!!!🎉
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #f3f2f2",
                borderRadius: "5px",
                backgroundColor: todo.completed ? "#cbc6cc8d" : "#f9f9f9", // changes bg if task is completed
                cursor: "pointer",
              }}
            >
              {/* click the text to trigger strike-through for completed todos */}
              <span
                onClick={() => toggleTodo(todo.id)}
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "#2f3130" : "#141414",
                }}
                // displays todo texts
              >
                {todo.text}
              </span> 

              {/* delete button */}
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#e78fdc",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                ➖
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
}
export default App; // exports the App as the default export