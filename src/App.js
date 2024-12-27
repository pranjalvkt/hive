import './App.css';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from './components/Registration/Registration';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/auth/login" element={<Login />} />
        <Route path='/auth/register' element={<Registration/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
