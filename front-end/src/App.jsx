import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Game from './pages/Game';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/games/:id' Component={Game} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
