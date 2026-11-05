import { useState, useEffect, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Shirt, Sparkles, ChevronDown, Wand2, Camera, Heart } from "lucide-react"
import { AppContent } from "../context/AppContext"

// ⭐ Sage green palette
const SAGE = "#a3b18a"
const SAGE_LIGHT = "#c5cdb4"
const SAGE_PALE = "#dde3d2"
const SAGE_DEEP = "#7d8f6f"
const CREAM = "#f5f2ea"
const MUTED = "#a8a3b8"

const WelcomePage = () => {
  const { isLoggedin } = useContext(AppContent)
  const navigate = useNavigate()
  const [showAuth, setShowAuth] = useState(false)

  useEffect(() => {
    if (isLoggedin) navigate("/", { replace: true })
  }, [isLoggedin, navigate])

  useEffect(() => {
    const handleScroll = () => setShowAuth(window.scrollY > 350)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (isLoggedin === null) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-[#f5f2ea] flex items-center justify-center tracking-[0.3em] text-sm">
        LOADING...
      </div>
    )
  }

  const clothes = [
    { color: SAGE, delay: 0.2, sway: 3.2 },
    { color: SAGE_LIGHT, delay: 0.45, sway: 3.8 },
    { color: SAGE_PALE, delay: 0.7, sway: 3.0 },
    { color: CREAM, delay: 0.95, sway: 3.6 },
    { color: SAGE_DEEP, delay: 1.2, sway: 3.4 },
  ]

  const reveal = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
  }

  const steps = [
    { icon: Camera, title: "Snap Your Closet", text: "Photograph the clothes you already own — takes two minutes." },
    { icon: Wand2, title: "AI Styles You", text: "Our AI mixes and matches your pieces into endless fresh outfits." },
    { icon: Heart, title: "Wear With Confidence", text: "See the look before you wear it. Save favorites, plan your week." },
  ]

  return (
    <div className="bg-[#0a0a0f] text-[#f5f2ea] min-h-screen" style={{ fontFamily: "'DM Sans', 'Jost', sans-serif" }}>
      {/* ===== NAVBAR — brand logo + Sign Up button (right) ===== */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0f]/70 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-4 h-18">
          <Link to="/welcome" className="group">
            <span className="font-tagline text-4xl tracking-wide text-[#f5f2ea]">
              CLØSET<span style={{ color: SAGE }}>AI</span>
            </span>
          </Link>

          {/* ⭐ NAYA: Sign Up button */}
          <Link
            to="/login"
            className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:opacity-85"
            style={{ backgroundColor: SAGE, color: "#0a0a0f" }}
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* ===== HERO — BADA WELCOME ===== */}
      <section className="min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16 px-6">
        {/* Bada welcome headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-display text-center leading-tight"
          style={{ fontSize: "clamp(2.8rem, 8vw, 6.5rem)" }}
        >
          Welcome to <span className="italic" style={{ color: SAGE }}>CløsetAI</span>
        </motion.h1>

        {/* Wardrobe wali lines — ab secondary */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 text-center text-4xl sm:text-4xl font-light"
          style={{ color: CREAM }}
        >
          Your Wardrobe, <span className="italic" style={{ color: SAGE }}>Reimagined</span> with AI
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-5 text-center text-lg max-w-lg"
          style={{ color: MUTED }}
        >
          Discover endless outfit possibilities from the clothes you already own —
          without ever trying them on.
        </motion.p>

        {/* Clothes rail animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="relative mt-16 sm:mt-20 w-full max-w-3xl"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.9 }}
            className="absolute top-0 left-0 w-full h-[3px] bg-white/15 rounded-full origin-left"
          />
          <div className="flex justify-between pt-[3px]">
            {clothes.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -120 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: item.delay + 0.9, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                <div className="w-px h-6 bg-white/20" />
                <motion.div
                  animate={{ rotate: [0, 4, -4, 0] }}
                  transition={{ duration: item.sway, repeat: Infinity, ease: "easeInOut", delay: item.delay + 1.7 }}
                  style={{ transformOrigin: "top center" }}
                  className="w-14 h-14 sm:w-20 sm:h-20"
                >
                  <div
                    className="w-full h-full rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: item.color + "1f" }}
                  >
                    <Shirt className="w-7 h-7 sm:w-10 sm:h-10" style={{ color: item.color }} />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
          className="absolute bottom-8 flex flex-col items-center gap-1"
          style={{ color: MUTED, opacity: 0.5 }}
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-28 px-6">
        <motion.h2 {...reveal} transition={{ duration: 0.7 }} className="text-center text-4xl sm:text-5xl font-bold">
          How It <span className="italic" style={{ color: SAGE }}>Works</span>
        </motion.h2>
        <motion.p {...reveal} transition={{ duration: 0.7, delay: 0.1 }} className="text-center mt-4 max-w-md mx-auto" style={{ color: MUTED }}>
          From closet chaos to curated fits in three simple steps.
        </motion.p>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              {...reveal}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-300"
              onMouseEnter={e => { e.currentTarget.style.borderColor = SAGE + "66"; e.currentTarget.style.backgroundColor = SAGE + "0d" }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = ""; e.currentTarget.style.backgroundColor = "" }}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: SAGE + "26" }}>
                <step.icon className="w-6 h-6" style={{ color: SAGE }} />
              </div>
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: SAGE, opacity: 0.75 }}>Step {i + 1}</span>
              <h3 className="text-xl font-bold mt-2 mb-3">{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{step.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== QUOTE ===== */}
      <section className="py-28 px-6 border-t border-white/5">
        <motion.blockquote {...reveal} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto text-center">
          <p className="text-3xl sm:text-4xl font-medium leading-snug" style={{ color: CREAM, opacity: 0.9 }}>
            "The most sustainable outfit is the one{" "}
            <span className="italic" style={{ color: SAGE }}>already in your closet</span>."
          </p>
          <footer className="mt-6 text-sm tracking-widest uppercase" style={{ color: MUTED, opacity: 0.6 }}>
            — The ClosetAI philosophy
          </footer>
        </motion.blockquote>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-12 px-6 border-t border-white/5 text-center text-sm" style={{ color: MUTED, opacity: 0.5 }}>
        ©️ 2026 ClosetAI — wear everything you own.
      </footer>

      {/* ===== FLOATING AUTH BUTTON ===== */}
      <AnimatePresence>
        {showAuth && (
          <motion.div
            initial={{ opacity: 0, y: 60, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 60, x: "-50%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed bottom-6 left-1/2 z-50"
          >
            <Link
              to="/login"
              className="flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:opacity-85"
              style={{ backgroundColor: SAGE, color: "#0a0a0f", boxShadow: `0 8px 30px ${SAGE}66` }}
            >
              <Sparkles className="w-4 h-4" />
              Login / Sign Up
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default WelcomePage