import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AppContent } from "../context/AppContext"

function ProtectedRoute() {
  const { isLoggedin } = useContext(AppContent)

  if (isLoggedin === null) {
    return (
      <div className="min-h-screen bg-[#1D251A] text-[#F0EAD9] flex items-center justify-center tracking-[0.3em] text-sm">
        LOADING...
      </div>
    )
  }

  return isLoggedin ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute