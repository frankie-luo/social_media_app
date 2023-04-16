import './App.css';
import Auth from './pages/auth/Auth';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';

function App() {
  return (
    <div className="App">
      <div className='blur' style={{top: '-20%', right: 0}}></div>
      <div className='blur' style={{top: '40%', left: -100 + 'px'}}></div>
      {/* <Home/>
      <Profile /> */}
      <Auth />
    </div>
  );
}

export default App;
