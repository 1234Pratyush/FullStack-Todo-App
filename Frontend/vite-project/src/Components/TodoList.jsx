import React, { useEffect, useState } from "react";
import axios from "axios";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:3500/api/todo/allNotes", {
        withCredentials: true,
      });
      setTodos(res.data);
    } catch (err) {
      console.error(
        "Error fetching todos:",
        err.response?.data?.message || err.message
      );
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Delete a todo
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this?")
    if(!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:3500/api/todo/delete/${id}`, {
        withCredentials: true,
      });
      fetchTodos(); 
    } catch (err) {
      console.error("Error deleting todo:", err.message);
    }
  };

  // Update a todo
  const handleUpdate = async (id, oldTitle, oldContent) => {
    const newTitle = prompt("Enter new title:", oldTitle);
    const newContent = prompt("Enter new content:", oldContent);

    if (newTitle && newContent) {
      try {
        await axios.put(
          `http://localhost:3500/api/todo/update/${id}`,
          { title: newTitle, content: newContent },
          { withCredentials: true }
        );
        fetchTodos(); // Refresh list
      } catch (err) {
        console.error("Error updating todo:", err.message);
      }
    }
  };

  return (
    <div className="bg-zinc-900 min-h-screen py-8">
      <div className="max-w-xl mx-auto p-4 bg-zinc-800 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-white">
          Todo List
        </h1>

        {todos.length === 0 ? (
          <p className="text-center text-gray-400">No todos found.</p>
        ) : (
          <ul className="space-y-4">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className="p-4 border border-gray-700 rounded bg-zinc-700"
              >
                <p className="text-lg text-white">Title: {todo.title}</p>
                <p className="text-lg text-white">Content: {todo.content}</p>
                <p className="text-sm text-gray-300 mb-2">
                  Created at: {new Date(todo.createdAt).toLocaleString()}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      handleUpdate(todo._id, todo.title, todo.content)
                    }
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(todo._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TodoList;
