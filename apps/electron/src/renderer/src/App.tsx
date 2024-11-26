import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import PageOne from './components/DeckBuilder';
import PageTwo from './components/SoloPlay';
import PageThree from './components/Multiplayer';
function App(): JSX.Element {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/page-one" element={<PageOne />} />
        <Route path="/page-two" element={<PageTwo />} />
        <Route path="/page-three" element={<PageThree />} />
      </Routes>
    </Router>
  )
}

export default App
