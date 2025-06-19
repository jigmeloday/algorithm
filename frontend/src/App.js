import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { 
  XLayout, 
  Home, 
  Profile, 
  Explore, 
  Notifications, 
  Messages,
  TweetDetail 
} from './components';

function App() {
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    username: 'johndoe',
    displayName: 'John Doe',
    handle: '@johndoe',
    avatar: 'https://images.pexels.com/photos/4909465/pexels-photo-4909465.jpeg',
    bio: 'Software Engineer | Tech Enthusiast | Coffee Lover ☕',
    followers: 1234,
    following: 567,
    joined: 'March 2019',
    verified: true
  });

  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>
      <BrowserRouter>
        <XLayout 
          currentUser={currentUser} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode}
        >
          <Routes>
            <Route path="/" element={<Home currentUser={currentUser} />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/notifications" element={<Notifications currentUser={currentUser} />} />
            <Route path="/messages" element={<Messages currentUser={currentUser} />} />
            <Route path="/profile/:username" element={<Profile currentUser={currentUser} />} />
            <Route path="/tweet/:id" element={<TweetDetail currentUser={currentUser} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </XLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;