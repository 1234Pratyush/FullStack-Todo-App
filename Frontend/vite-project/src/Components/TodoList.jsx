import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateModal from "./UpdateModal"; // Make sure path is correct!

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this?"
    );
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:3500/api/todo/delete/${id}`, {
        withCredentials: true,
      });
      fetchTodos();
    } catch (err) {
      console.error("Error deleting todo:", err.message);
    }
  };

  const handleUpdate = (todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
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
                    onClick={() => handleUpdate(todo)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 cursor-pointer"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(todo._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Modal for Update */}
      {isModalOpen && selectedTodo && (
        <UpdateModal
          todo={selectedTodo}
          onClose={() => setIsModalOpen(false)}
          onUpdated={fetchTodos}
        />
      )}
    </div>
  );
};

export default TodoList;
