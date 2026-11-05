import UploadZone from "../components/scan/UploadZone"
import TipsSection from "../components/scan/TipsSection"
import { Link } from "react-router-dom"
// ❌ ResultCard import hata do — ab use nahi ho raha

function ScanPage() {

  return (
    <div className="relative min-h-screen text-[#f3ede3]">
      {/* ===== FULL PAGE BACKGROUND ===== */}
      <div className="fixed inset-0 -z-10">
        <img src="/bg.jpg" alt="" className="h-full w-full object-cover" />
      </div>

      {/* ===== NAVBAR ===== */}
      <nav className="flex items-center justify-between px-10 py-6">
        <Link to="/" className="font-tagline text-4xl tracking-wide">CLØSET AI</Link>
        <div className="flex gap-10 text-xs tracking-[0.2em] uppercase">
          <Link to="/scan" className="text-[#F0EAD9] border-b border-[#F0EAD9] pb-1">[ Scan ]</Link>
          <span className="text-[#f3ede3]/50 hover:text-[#f3ede3] transition cursor-pointer">[ Discover ]</span>
          <Link to="/wardrobe" className="text-[#F0EAD9]/50 hover:text-[#F0EAD9] transition">[ WARDROBE ]</Link>
          <span className="text-[#f3ede3]/50 hover:text-[#f3ede3] transition cursor-pointer">[ Profile ]</span>
        </div>
      </nav>

      {/* ===== MAIN CONTENT ===== */}
      <main className="max-w-7xl mx-auto px-10 grid md:grid-cols-5 gap-10 mt-8">
        {/* Left: Hero text */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-4 text-xs tracking-[0.3em] text-[#f3ede3]/70">
            <span>01</span>
            <span className="h-px w-16 bg-[#e8e0d0]/40" />
            <span>SCAN</span>
          </div>
          <h1 className="font-tagline text-5xl md:text-6xl mt-6 leading-tight">
            Add to your wardrobe.
          </h1>
          <p className="text-[#f3ede3]/70 mt-6 max-w-sm font-light leading-relaxed">
            Upload a photo of your clothing item. We'll identify the item, colour and style for you.
          </p>
        </div>

        {/* Right: Upload zone — ab props nahi chahiye, sab andar hai */}
        <div className="md:col-span-3">
          <UploadZone />

          <div className="mt-10">
            <TipsSection />
          </div>
        </div>
      </main>

      {/* ===== TIPS — hamesha dikhenge, kisi se replace nahi honge ===== */}
      
    </div>
  )
}

export default ScanPage