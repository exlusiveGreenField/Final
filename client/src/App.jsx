import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx"
import Contact from "./components/Contact.jsx";
import Oneproduct from './components/Oneproduct.jsx'
import Signup from './components/Login/SignUp';
import Login from './components/Login/Login';
import { AuthProvider } from './components/context/AuthContext';
import Dashboard from './components/Admin/Dashboard.jsx'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/about' element={<About/>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/oneProduct" element={<Oneproduct />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
