import HomePage from "./pages/HomePage";
import PokemonPage from "./pages/PokemonPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/pokemon/:pokename" element={<PokemonPage />} />
            </Routes>
        </Router>
    </>
  )
}

export default App
