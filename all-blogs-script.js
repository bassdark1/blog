// public/all-blogs-script.js
$(document).ready(() => {
    // Fetch all blogs on page load
    fetchAllBlogs();
  });
  
  // Function to fetch all blogs
  function fetchAllBlogs() {
    $.get('/api/blogs', (blogs) => {
      displayBlogs(blogs, '#allBlogsList');
    });
  }
  
  // Function to display blogs
  function displayBlogs(blogs, containerSelector) {
    const blogList = $(containerSelector);
    blogList.empty();
  
    blogs.forEach((blog) => {
      const blogItem = $('<div>').addClass('blog-item');
      blogItem.append($('<h2>').text(blog.title));
      blogItem.append($('<p>').text(blog.content));
      blogList.append(blogItem);
    });
  }
  