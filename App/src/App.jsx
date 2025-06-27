import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import SearchResults from './pages/SearchResults'
import UserProfile from './pages/UserProfile'
import CoursePage from './pages/CoursePage'
import AuthRoute from './AuthRoute'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/profile" element={<AuthRoute component={UserProfile} />}/>
        <Route path="/course/:id" element={<CoursePage />} />
      </Routes>
    </Router>
  )
}

export default App
