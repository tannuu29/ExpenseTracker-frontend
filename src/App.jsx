import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard'
import About from './components/About'
import ContactUs from './components/ContactUs'
import Profile from './components/Profile'
import ChangePassword from './components/ChangePassword'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </Router>
  )
}

export default App
