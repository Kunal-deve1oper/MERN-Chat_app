import { Route,Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import 'react-toastify/dist/ReactToastify.css';
import Chatbody from './pages/Chatbody/Chatbody';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/chat' element={<Chatbody/>}/>
    </Routes>
    <ToastContainer/>
    </>
  );
}

export default App;
