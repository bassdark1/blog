// public/script.js
$(document).ready(() => {
  // Fetch all blogs on page load
  fetchBlogs();

  // Handle blog submission
  $('#blogForm').submit((event) => {
    event.preventDefault();
    const title = $('#title').val();
    const content = $('#content').val();

    // Post the new blog
    $.post('/api/blogs', { title, content }, (data) => {
      console.log('Blog added successfully:', data);
      fetchBlogs(); // Refresh the blog list
    });

    // Clear the form
    $('#title').val('');
    $('#content').val('');
  });

  // Handle click on "View All Blogs" button
  $('#viewAllBlogs').click(() => {
    window.location.href = '/all-blogs.html'; // Redirect to the new page
  });
});

function fetchBlogs() {
  $.get('/api/blogs', (blogs) => {
    console.log('Blogs fetched:', blogs); // Log the fetched blogs
    displayBlogs(blogs, '#blogList');
  });
}

function displayBlogs(data, containerSelector) {
  const blogs = Array.isArray(data) ? data : (data && data.blogs) || []; // Check if data is undefined or not an array

  const blogList = $(containerSelector);
  blogList.empty();

  blogs.forEach((blog) => {
    const blogItem = $('<div>').addClass('blog-item');
    blogItem.append($('<h2>').text(blog.title));
    blogItem.append($('<p>').text(blog.content));

    // Add delete button
    const deleteButton = $('<button>').addClass('delete-button').text('Delete');
    deleteButton.data('blog-id', blog._id);
    blogItem.append(deleteButton);

    blogList.append(blogItem);
  });

  // Event listener for the delete button
  $('.delete-button').click(function () {
    const blogId = $(this).data('blog-id');
    console.log('deleting blog with id :' , blogId)
    deleteBlog(blogId);
  });
}

// Function to handle blog deletion
f// Function to handle blog deletion
function deleteBlog(blogId) {
  console.log('Deleting blog with ID:', blogId); // Log the blogId before the request

  $.ajax({
    url: `/api/blogs/${blogId}`,
    type: 'DELETE',
    success: function (response) {
      console.log('Blog deleted successfully', response);
      fetchBlogs(); // Refresh the blog list after deletion
    },
    error: function (xhr, status, error) {
      console.error('Error deleting blog:', xhr, status, error);
    },
  });
}

