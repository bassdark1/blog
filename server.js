const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const cors = require('cors');

// ...

// Enable CORS
app.use(cors());

// ...

// Connect to MongoDB (Make sure MongoDB is running on your machine)
mongoose.connect('mongodb://localhost/blogSharingPlatform', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a Blog schema
const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Blog = mongoose.model('Blog', blogSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve the HTML and CSS files
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// API to get all blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.json({ error: 'Error fetching blogs' });
  }
});

// API to add a new blog
app.post('/api/blogs', async (req, res) => {
  const { title, content } = req.body;
  const blog = new Blog({
    title,
    content,
  });

  try {
    const savedBlog = await blog.save();
    res.json(savedBlog);
  } catch (error) {
    res.json({ error: 'Error adding blog' });
  }
});

// API to delete a blog by ID
app.delete('/api/blogs/:blogId', async (req, res) => {
  try {
    const { blogId } = req.params;
    console.log('Deleting blog with ID:', blogId);

    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      console.log('Blog not found');
      return res.status(404).json({ message: 'Blog not found' });
    }

    console.log('Blog deleted successfully');
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
