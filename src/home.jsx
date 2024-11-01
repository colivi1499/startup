import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';

export default function Home() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="bg-light p-3">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Taco Bell Logo on the top left */}
          <div className="logo-container">
            <img src="../images/Taco-Bell-Logo.png" alt="Taco Bell Logo" className="logo" />
          </div>
          <a href="https://github.com/colivi1499/startup" target="_blank" rel="noopener noreferrer" className="text-primary">
            Github - Boston, Wade, Cameron
          </a>
          {/* Search bar centered in the header */}
          <form className="d-flex" action="/search">
            <input className="form-control me-2" type="search" placeholder="Search..." aria-label="Search" name="search" />
            <button className="btn btn-primary purple-btn" type="submit">Search</button>
          </form>
          {/* Add Friend and Login links on the top right */}
          <div className="d-flex gap-3">
            <a href="add-friend.html" className="btn btn-link purple-lnk">Add Friend</a>
            <a href="login.html" className="btn btn-link purple-lnk">LOGIN</a>
          </div>
        </div>
      </header>

      <main className="container my-4">
        <section className="groups-section text-center">
          <h2>Your Groups</h2>
          <ul className="list-unstyled">
            <li>
              <button className="btn btn-primary w-100 my-2 purple-btn" onClick={() => window.location.href = 'group.html'}>
                Group 1
              </button>
            </li>
            <li>
              <button className="btn btn-primary w-100 my-2 purple-btn" onClick={() => window.location.href = 'group.html'}>
                Group 2
              </button>
            </li>
          </ul>
        </section>
      </main>

      <footer className="bg-light py-3 mt-auto">
        <div className="container d-flex justify-content-between">
          <button className="btn btn-primary purple-btn">Create Group</button>
          <button className="btn btn-primary purple-btn">Local Weather "API Call"</button>
          <button className="btn btn-primary purple-btn">Message Friends "websocket"</button>
        </div>
      </footer>
    </div>
  );
}
