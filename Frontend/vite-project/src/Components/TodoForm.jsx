import React, { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const Todo = () => {
  const [todo, setTodo] = useState({
    title: "",
    content: "",
  });

  const [user, setUser] = useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:3500/api/todo/create");
      setUser(res.data); 
    } catch (err) {
      console.log("Error fetching user: ", err.message);
    }
  };

  useEffect(() => {
    fetchUser(); 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3500/api/todo/create",
        todo
      );
      console.log(res.data);
      alert("Todo Created");
      setTodo({ title: "", content: "" });
    } catch (err) {
      console.log("Error cannot create Todo: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 p-8 relative text-white">
      {/* Top-right user circle */}
      <div className="absolute top-6 right-6">
        <div className="w-22 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
          {user ? user.name.split(" ")[0] : "User"}
        </div>
      </div>

      {/* Main Todo Card */}
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md mt-16 text-black">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Todo
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            value={todo.title}
            onChange={handleChange}
            placeholder="Enter title"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />

          <textarea
            name="content"
            value={todo.content}
            onChange={handleChange}
            placeholder="Enter content"
            rows="4"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />

          <button
            type="submit"
            className="bg-blue-500 w-full text-white py-2 rounded-md hover:bg-blue-600"
          >
            Add Todo
          </button>
        </form>
      </div>
    </div>
  );
};

export default Todo;
