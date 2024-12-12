import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [quoteData, setQuoteData] = useState(null); // State for the quote
  const [connectedUsers, setConnectedUsers] = useState(0); // State for WebSocket user count
  const [posts, setPosts] = useState([]); // State for user posts
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const [rating, setRating] = useState(0);

  const navigate = useNavigate();

  // Fetch the quote on component mount
  useEffect(() => {
    const url = "https://quote.cs260.click";
    fetch(url)
      .then((x) => x.json())
      .then((response) => {
        setQuoteData(response); // Store the quote data as an object
      })
      .catch((error) => {
        console.error("Error fetching quote:", error);
      });
  }, []);

  // WebSocket connection setup
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setConnectedUsers(data.count); // Update the connected users count
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => ws.close(); // Cleanup WebSocket on component unmount
  }, []);

  // Fetch user's posts (ratings) on component mount
  useEffect(() => {
    const fetchUserPosts = async () => {
      const currentUser = localStorage.getItem('currentUser'); // Get the username from localStorage

      if (!currentUser) {
        console.error('No user is logged in.');
        navigate('/'); // Redirect to login page if no user is logged in
        return;
      }

      try {
        const response = await fetch(`/api/ratings?username=${currentUser}`);
        if (response.ok) {
          const userPosts = await response.json();
          console.log('Fetched user posts:', userPosts);
          setPosts(userPosts); // Update the posts state with fetched data
        } else {
          console.error('Failed to fetch user posts');
        }
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    fetchUserPosts();
  }, [navigate]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setRating(0);
    setSelectedLocation("");
    setSelectedMenuItem("");
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();

    const currentUser = localStorage.getItem('currentUser'); // Retrieve the username from localStorage

    if (!currentUser) {
      console.error('No user is logged in.');
      alert('You need to log in to submit a post.');
      return;
    }

    if (selectedLocation && selectedMenuItem && rating > 0) {
      const newPost = {
        username: currentUser, // Automatically set the username
        location: selectedLocation,
        menuItem: selectedMenuItem,
        rating: rating,
      };

      try {
        // Save the post locally
        setPosts([...posts, newPost]);

        // Send the data to the backend
        const response = await fetch('/api/save-rating', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newPost),
        });

        if (response.ok) {
          console.log('Rating saved successfully');
        } else {
          console.error('Failed to save rating');
        }
      } catch (error) {
        console.error('Error submitting rating:', error);
      }

      closeModal(); // Close the modal after submission
    } else {
      console.error('All fields are required to submit a post.');
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${rating >= star ? "selected" : ""}`}
            onClick={() => setRating(star)} // Allow rating selection
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="bg-light p-3">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div
            className="logo-container"
            onClick={() => navigate("/home")}
            style={{ cursor: "pointer" }}
          >
            <img src="../images/Taco-Bell-Logo.png" alt="Taco Bell Logo" className="logo" />
          </div>
          <a
            href="https://github.com/colivi1499/startup"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            Github - Boston, Wade, Cameron
          </a>
          <div className="d-flex gap-3">
            <button
              onClick={() => {
                localStorage.removeItem('currentUser'); // Clear the username from localStorage
                navigate('/'); // Redirect to login page
              }}
              className="btn btn-link purple-lnk"
            >
              LOGOUT
            </button>
          </div>
        </div>
      </header>

      <main className="container my-4">
        <h2>Your Posts</h2>
        <div className="posts-container">
          {posts.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: "40%" }}>Menu Item</th>
                  <th style={{ width: "20%" }}>Rating</th>
                  <th style={{ width: "40%" }}>Location</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, index) => (
                  <tr key={index}>
                    <td>{post.menuItem}</td>
                    <td>
                      <div className="rating">{renderStars(post.rating)}</div>
                    </td>
                    <td>{post.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-muted">No posts yet. Click "Create Post" to add one!</p>
          )}
        </div>

        {/* Display the fetched quote */}
        <div className="quote-container my-4">
          <h3>Quote of the Day</h3>
          {quoteData ? (
            <blockquote className="blockquote">
              <p>{quoteData.quote}</p>
              <footer className="blockquote-footer">{quoteData.author}</footer>
            </blockquote>
          ) : (
            <p>Loading quote...</p>
          )}
        </div>
      </main>

      <footer className="bg-light py-3 mt-auto">
        <div className="container d-flex justify-content-between">
          <button className="btn btn-primary purple-btn" onClick={openModal}>
            Create Post
          </button>
          {/* Real-time WebSocket data */}
          <button className="btn btn-primary purple-btn">
            Connected Users: {connectedUsers}
          </button>
        </div>
      </footer>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <form onSubmit={handlePostSubmit}>
              <h2>Create a New Post</h2>

              {/* Dropdown for Menu Item */}
              <label htmlFor="menuItem" className="form-label">
                Menu Item:
              </label>
              <select
                id="menuItem"
                className="form-select mb-3"
                value={selectedMenuItem}
                onChange={(e) => setSelectedMenuItem(e.target.value)}
                required
              >
                <option value="">Select Menu Item</option>
                <option value="Crunchy Taco">Crunchy Taco</option>
                <option value="Burrito Supreme">Burrito Supreme</option>
                <option value="Cheesy Gordita Crunch">Cheesy Gordita Crunch</option>
                <option value="Nacho Fries">Nacho Fries</option>
              </select>

              {/* Star Rating */}
              <label className="form-label">Rate Your Experience:</label>
              <div className="rating mb-3">{renderStars(rating)}</div>

              {/* Dropdown for Location */}
              <label htmlFor="location" className="form-label">
                Location:
              </label>
              <select
                id="location"
                className="form-select mb-3"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                required
              >
                <option value="">Select Location</option>
                <option value="Downtown Taco Bell">Downtown Taco Bell</option>
                <option value="Suburban Taco Bell">Suburban Taco Bell</option>
                <option value="Airport Taco Bell">Airport Taco Bell</option>
              </select>

              {/* Post Button */}
              <button type="submit" className="btn btn-success">
                Post
              </button>

              {/* Cancel Button */}
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}





