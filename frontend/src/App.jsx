import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { AppContextProvider } from "./context/AppContext"
import ProtectedRoute from "./components/ProtectedRoute"

import Hero from "./components/Hero"
import Section2 from "./components/Section2"
import Section3 from "./components/Section3"
import ScanPage from "./pages/ScanPage"
import WardrobePage from "./pages/WardrobePage"
import Login from "./pages/Login"
import EmailVerify from "./pages/EmailVerify"
import ResetPassword from "./pages/ResetPassword"
import ScrollToTop from "./components/ScrollToTop"

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ToastContainer />
        <Routes>
          {/* Public routes — login bina yeh sab accessible */}
          <Route path="/login" element={<Login />} />
          <Route path="/EmailVerify" element={<EmailVerify />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />

          {/* 🔒 Protected — login zaroori */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={
              <>
                <Hero />
                <Section2 />
                <Section3 />
              </>
            } />
            <Route path="/scan" element={<ScanPage />} />
            <Route path="/wardrobe" element={<WardrobePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  )
}

export default App