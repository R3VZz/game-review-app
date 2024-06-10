import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import GameList from './api/game-list';
import Game from './pages/Game'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' Component={GameList} />
          <Route path='/games/:id' Component={Game} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
