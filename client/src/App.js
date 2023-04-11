import './App.css';
import Home from './pages/home/Home';

function App() {
  return (
    <div className="App">
      <div className='blur' style={{top: '-20%', right: 0}}></div>
      <div className='blur' style={{top: '40%', left: -100 + 'px'}}></div>
      <Home/>
    </div>
  );
}

export default App;
