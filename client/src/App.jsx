import { useEffect, useState } from "react";
import BlogCard from "./components/BlogCard";
import "./App.css";

const API_URL = "https://new-blog-app-1.onrender.com";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [editId, setEditId] = useState(null);

  const fetchBlogs = async () => {
    const res = await fetch(`${API_URL}/get-blogs`);
    const data = await res.json();
    setBlogs(data.blogs);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      const res = await fetch(`${API_URL}/update-blog/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setEditId(null);
    } else {
      const res = await fetch(`${API_URL}/post-blog`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
    }
    setFormData({ title: "", description: "" });
    fetchBlogs();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/delete-blog/${id}`, {
      method: "DELETE",
    });
    fetchBlogs();
  };

  const handleEdit = (blog) => {
    setFormData({ title: blog.title, description: blog.description });
    setEditId(blog._id);
  };

  return (
    <div className="container">
      <h1>Blog Post App</h1>
      <form onSubmit={handleSubmit} className="blog-form">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
        <button type="submit">{editId ? "Update Blog" : "Post Blog"}</button>
      </form>

      <div className="blog-list">
        {blogs.length === 0 ? (
          <p>No blogs available.</p>
        ) : (
          blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
