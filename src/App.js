import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Registration from './components/Registration/Registration';
import FriendsList from './components/Friends/FriendsList';
import Profile from './components/Profile/Profile';
import ChatBox from "./components/Messenger/ChatBox";
import ViewPost from "./components/Post/ViewPost";
import NewNavbar from "./components/Navbar/v2/Navbar";
import About from "./components/About/About";
import Settings from "./components/settings/Settings";
import UserProfile from "./components/Profile/v2/UserProfile";
import { ChatProvider } from "./context/ChatContext";
import JoinCreate from "./components/Messenger/JoinCreate";
import SelectedUserProfile from "./components/Profile/v2/SelectedUserProfile";
import ConnectionsManager from "./components/Friends/ConnectionsManager";

function App() {
  return (
    <Router>
      <NewNavbar />
      <ToastContainer />
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path='/auth/register' element={<Registration/>} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
        <Route path='/user-profile' element={<ProtectedRoute><UserProfile /></ProtectedRoute>}/>
        <Route path='/user-profile/:id' element={<ProtectedRoute><SelectedUserProfile /></ProtectedRoute>}/>
        <Route path='/friends' element={<ProtectedRoute><FriendsList /></ProtectedRoute>}/>
        <Route path='/connections' element={<ProtectedRoute><ConnectionsManager /></ProtectedRoute>}/>
        <Route path='/chat' element={
          <ProtectedRoute>
            <ChatProvider>
              <JoinCreate />
            </ChatProvider>
          </ProtectedRoute>
        }/>
        <Route path='/chat/:id' element={
          <ProtectedRoute>
            <ChatProvider>
              <ChatBox />
            </ChatProvider>
          </ProtectedRoute>
        }/>
        <Route path='/posts/:id' element={<ProtectedRoute><ViewPost /></ProtectedRoute>}/>
        <Route path='/about' element={<ProtectedRoute><About /></ProtectedRoute>}/>
        <Route path='/settings' element={<ProtectedRoute><Settings /></ProtectedRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;
