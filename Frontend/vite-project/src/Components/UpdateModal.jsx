import React, { useState } from "react";
import axios from "axios";

export default function UpdateModal({ todo, onClose, onUpdated }) {
  const [title, setTitle] = useState(todo.title);
  const [content, setContent] = useState(todo.content);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        `http://localhost:3500/api/todo/update/${todo._id}`,
        { title, content },
        { withCredentials: true }
      );
      setLoading(false);
      onUpdated(); // refresh todos
      onClose(); // close modal
    } catch (err) {
      setLoading(false);
      alert(
        "Error updating todo: " + (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-25 backdrop-blur-sm">
      <div className="bg-white text-black p-20 rounded-md shadow-xl min-w-[32px]">
        <h2 className="text-xl font-bold mb-4">Update Todo</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
            placeholder="Title"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
            rows={4}
            placeholder="Content"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Todo"}
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-2 text-gray-500 hover:text-gray-800 text-sm underline w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
