import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Registration from './components/Registration/Registration';
import Navbar from './components/Navbar/Navbar';
import FriendsList from './components/Friends/FriendsList';
import Profile from './components/Profile/Profile';
import ConversationList from './components/Messenger/ConversationList';

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path='/auth/register' element={<Registration/>}></Route>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
        <Route path='/friends' element={<ProtectedRoute><FriendsList /></ProtectedRoute>}/>
        <Route path='/chat' element={<ProtectedRoute><ConversationList /></ProtectedRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;
