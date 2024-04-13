import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Test from "./pages/Test";


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/details' element={<Details />} />
          <Route path='/test' element={<Test />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
