import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx"
import Contact from "./components/Contact.jsx";
import Oneproduct from './components/Oneproduct.jsx'
import Signup from './components/Login/SignUp';
import Login from './components/Login/Login';
import Shop from "./components/Shop.jsx";
import Profile from "./components/Profile.jsx"
import { AuthProvider } from './components/context/AuthContext';
import Dashboard from './components/Admin/Dashboard.jsx'
import Cart from "./components/Cart.jsx";
import Wishlist from "./components/WishList.jsx";
import Orders from "./components/Orders.jsx"
import AddProduct from "./components/AddProduct.jsx";
import EditProfile from "./components/EditProfile.jsx";
import { ProfileProvider } from "./components/context/ProfileContext.jsx";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AuthProvider>
        <ProfileProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/about' element={<About/>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/oneProduct" element={<Oneproduct />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/orders"  element={<Orders />} />
          <Route path="/addProduct" element={<AddProduct/>} />
          <Route path="/editProfile" element={<EditProfile/>} />
        </Routes>
        </ProfileProvider>
        </AuthProvider>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
