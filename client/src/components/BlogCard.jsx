const BlogCard = ({ blog, onDelete, onEdit }) => {
  return (
    <div className="blog-card">
      <h3>{blog.title}</h3>
      <p>{blog.description}</p>
      <div className="actions">
        <button onClick={() => onEdit(blog)}>Edit</button>
        <button onClick={() => onDelete(blog._id)}>Delete</button>
      </div>
    </div>
  );
};

export default BlogCard;
