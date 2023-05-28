import './App.css';
import Auth from './pages/auth/Auth';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {

  const user = useSelector(state => state.auth.userAuthData)

  return (
    <div className="App">
      <div className='blur' style={{top: '-20%', right: 0}}></div>
      <div className='blur' style={{top: '40%', left: -100 + 'px'}}></div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={user ? <Navigate to='/home' /> : <Navigate to='/login' />} />
          <Route path='/home' element={user ? <Home /> : <Navigate to='/login' />} />
          <Route path='/login' element={user ? <Home /> : <Auth />} />
          <Route path='/profile' element={user ? <Profile /> : <Navigate to='/login' />} />
        </Routes>
      </BrowserRouter>
      {/* <Home/>
      <Profile /> */}
    </div>
  );
}

export default App;
