import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import DeckBuilder from './components/DeckBuilder';
import SoloPlay from './components/SoloPlay';
import Multiplayer from './components/Multiplayer';
function App(): JSX.Element {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/decks" element={<DeckBuilder />} />
        <Route path="/solo" element={<SoloPlay />} />
        <Route path="/multiplayer" element={<Multiplayer />} />
      </Routes>
    </Router>
  )
}

export default App