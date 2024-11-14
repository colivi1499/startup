import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './group.css';

export default function Group() {
  return (
    <>
      <header>
        <h1>Group Page</h1>
      </header>

      <main>
        <div className="group-feed">
          <h2>Group Feed</h2>
          <p>Group feed from information stored in a database goes here</p>
        </div>
      </main>

      <footer>
      </footer>
    </>
  );
}
