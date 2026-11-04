import HomePage from "./pages/HomePage"
import ScanPage from "./pages/ScanPage"
import WardrobePage from "./pages/WardrobePage"
import { BrowserRouter, Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/scan" element={<ScanPage />} />
          <Route path="/wardrobe" element= {<WardrobePage />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App