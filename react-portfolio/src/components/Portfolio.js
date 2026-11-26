import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <section id="home">
          <h1>Hi, I'm Your Name</h1>
          <h2>Frontend Developer</h2>
          <p>Creating beautiful and responsive web interfaces</p>
        </section>
        <section id="about">
          <h2>About Me</h2>
          <p>I am a passionate frontend developer with experience in HTML, CSS, JavaScript, and React. I love creating responsive websites and web applications.</p>
        </section>
        <section id="projects">
          <h2>My Projects</h2>
          <ul>
            <li>Concentric Circles</li>
            <li>Ten Cards</li>
            <li>To-Do List</li>
            <li>Chessboard</li>
            <li>Snake Ladder Game</li>
          </ul>
        </section>
        <section id="contact">
          <h2>Contact</h2>
          <p>Email: your.email@example.com</p>
        </section>
      </header>
    </div>
  );
}

export default App;