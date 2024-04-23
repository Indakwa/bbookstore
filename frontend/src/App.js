import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Cart from "./pages/Cart";
import Genres from "./pages/Genres";
import Profile from "./pages/Profile";
import Admin from './pages/Admin';
import Books from './pages/Books';
import BookReader from './components/BookReader';
import VerifyRequest from './components/VerifyRequest';
import AdminLogin from './pages/AdminLogin';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';



function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/details/:bookId' element={<Details />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/books' element={<Books />} />
          <Route path="/genres/:genre" element={<Genres />} />
          <Route path='/admin-login' element={<AdminLogin />} />
          <Route path='/verify/:submissionId' element={<VerifyRequest />} />
          <Route path="/book/:bookId" element={<BookReader />} />
        </Routes>
      </Router>
      <ToastContainer />
      <TawkMessengerReact
          propertyId="6627794ba0c6737bd12f4bc0"
          widgetId="1hs533kio"
      />
    </>
  );
}

export default App;
