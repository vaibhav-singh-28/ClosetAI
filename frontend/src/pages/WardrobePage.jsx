import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import StatsBar from "../components/wardrobe/StatsBar"
import FilterBar from "../components/wardrobe/FilterBar"
import ItemGrid from "../components/wardrobe/ItemGrid"

const API = "http://localhost:3000"

// Pill label → item.category (jo DB mein hai)
const CAT_MAP = {
  ALL: null, TOPS: "top", BOTTOMS: "bottom", OUTERWEAR: "outerwear",
  DRESSES: "dress", SHOES: "shoes", ACCESSORIES: "accessory",
}

function WardrobePage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [cat, setCat] = useState("ALL")
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState("newest")

  // ===== REAL DATA: page khulte hi /items se lao =====
  useEffect(() => {
    fetch(`${API}/items`)
      .then(r => r.json())
      .then(data => { setItems(data); setLoading(false) })
      .catch(() => { setError("Backend se data nahi mila — server chal raha hai? (node server.js)"); setLoading(false) })
  }, [])

  // ===== FILTER + SEARCH + SORT (sab client-side, ek pipeline) =====
  const filtered = items
    .filter(it => !CAT_MAP[cat] || it.category === CAT_MAP[cat])
    .filter(it => {
      const q = query.trim().toLowerCase()
      if (!q) return true
      return it.subcategory.toLowerCase().includes(q) ||
             it.colors.some(c => c.toLowerCase().includes(q))
    })
    .sort((a, b) => {
      if (sort === "newest") return b._id.localeCompare(a._id)  // ObjectId: naya = bada
      if (sort === "oldest") return a._id.localeCompare(b._id)
      return a.subcategory.localeCompare(b.subcategory)
    })

  return (
    <div className="min-h-screen bg-[#1D251A] text-[#F0EAD9]">
      {/* Navbar — waise hi jaise static version mein tha */}
      <nav className="flex items-center justify-between px-10 py-6">
        <Link to="/" className="font-tagline text-4xl tracking-wide">CLØSET AI</Link>
        <div className="flex gap-10 text-sm tracking-widest">
          <Link to="/scan" className="text-[#F0EAD9]/50 hover:text-[#F0EAD9] transition">[ SCAN ]</Link>
          <span className="text-[#F0EAD9]/30">[ DISCOVER ]</span>
          <Link to="/wardrobe" className="text-[#F0EAD9] border-b border-[#F0EAD9] pb-1">[ WARDROBE ]</Link>
          <span className="text-[#F0EAD9]/30">[ PROFILE ]</span>
        </div>
      </nav>

      <main className="max-w-350 mx-auto px-10 pb-16">
        {/* Header — waise hi */}
        <div className="flex items-end justify-between mt-8">
          <div className="flex items-start gap-10">
            <div>
              <div className="flex items-center gap-4 text-xs tracking-[0.3em] text-[#F0EAD9]/60">
                <span>02</span>
                <span className="h-px w-16 bg-[#F0EAD9]/30" />
                <span>WARDROBE</span>
              </div>
              <h1 className="font-inter text-6xl mt-5">Your collection.</h1>
            </div>
            <div className="hidden md:block border-l border-[#F0EAD9]/20 pl-8 p-2 mt-4">
              <p className="font-display text-lg leading-snug">Your wardrobe, your style.</p>
              <p className="text-sm text-[#F0EAD9]/60 mt-1">Every piece you own, all in one place.</p>
            </div>
          </div>
        </div>

        {/* Stats — HAMESHA poore wardrobe ke (filter se change nahi hote) */}
        <StatsBar items={items} />

        <div className="h-px bg-[#F0EAD9]/15 my-8" />

        {/* Filters — ab controlled (state neeche se upar aayi) */}
        <FilterBar cat={cat} setCat={setCat} query={query} setQuery={setQuery} sort={sort} setSort={setSort} />

        {/* Grid / Loading / Error */}
        {loading ? (
          <p className="text-center mt-24 text-[#F0EAD9]/50 tracking-widest">LOADING YOUR WARDROBE...</p>
        ) : error ? (
          <p className="text-center mt-24 text-red-300">{error}</p>
        ) : (
          <ItemGrid items={filtered} hasFilters={cat !== "ALL" || query.trim() !== ""} />
        )}
      </main>
    </div>
  )
}

export default WardrobePage