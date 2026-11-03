import HomePage from "./pages/HomePage"
import ScanPage from "./pages/ScanPage"
import { BrowserRouter, Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/scan" element={<ScanPage />} />
          <Route path="/wardrobe" element={<div className="p-10 text-2xl">Wardrobe-coming soon</div>} />
        </Routes>
    </BrowserRouter>
    
  )
}

export default App