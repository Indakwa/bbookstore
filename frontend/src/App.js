import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Admin from './pages/Admin';
import BookReader from './components/BookReader';
import VerifyRequest from './components/VerifyRequest';
import AdminLogin from './pages/AdminLogin';



function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/details' element={<Details />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/admin-login' element={<AdminLogin />} />
          <Route path='/verify/:submissionId' element={<VerifyRequest />} />
          <Route path="/book/:bookId" element={<BookReader />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
