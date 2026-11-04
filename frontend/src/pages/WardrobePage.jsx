import { Link } from "react-router-dom"
import StatsBar from "../components/wardrobe/StatsBar"
import FilterBar from "../components/wardrobe/FilterBar"
import ItemGrid from "../components/wardrobe/ItemGrid"

// ===== STATIC FAKE DATA (design match ke liye) =====
// Kal isko GET /items se replace karenge
const TIP_IMGS = ["/tips/tip1.jpg", "/tips/tip2.jpeg", "/tips/tip3.jpeg"]
const FAKE_ITEMS = [
  { _id: "1", subcategory: "Basic T-Shirt", category: "top",      colors: ["white"], style: "casual" },
  { _id: "2", subcategory: "Hoodie",        category: "top",      colors: ["black"], style: "casual" },
  { _id: "3", subcategory: "Overshirt",     category: "outerwear",colors: ["olive"], style: "casual" },
  { _id: "4", subcategory: "Knit Sweater",  category: "top",      colors: ["beige"], style: "winter" },
  { _id: "5", subcategory: "Camp Shirt",    category: "top",      colors: ["black"], style: "casual" },
  { _id: "6", subcategory: "Denim Jeans",   category: "bottom",   colors: ["blue"],  style: "casual" },
  { _id: "7", subcategory: "Cargo Pants",   category: "bottom",   colors: ["beige"], style: "utility" },
  { _id: "8", subcategory: "Trousers",      category: "bottom",   colors: ["black"], style: "formal" },
  { _id: "9", subcategory: "Bomber Jacket", category: "outerwear",colors: ["cream"], style: "casual" },
  { _id: "10", subcategory: "Denim Jacket", category: "outerwear",colors: ["blue"],  style: "casual" },
  { _id: "11", subcategory: "Sneakers",     category: "shoes",    colors: ["white"], style: "casual" },
  { _id: "12", subcategory: "Cap",          category: "accessory",colors: ["black"], style: "casual" },
].map((item, i) => ({ ...item, imageUrl: TIP_IMGS[i % 3] }))  // 3 images ko rotate kar rahe

function WardrobePage() {
  return (
    <div className="min-h-screen bg-[#1D251A] text-[#F0EAD9]">
      {/* ===== NAVBAR (bracket style — design ke hisaab se) ===== */}
      <nav className="flex items-center justify-between px-10 py-6">
        <Link to="/" className="font-display text-xl tracking-widest">CLOSET AI</Link>
        <div className="flex gap-10 text-sm tracking-widest">
          <Link to="/scan" className="text-[#F0EAD9]/50 hover:text-[#F0EAD9] transition">[ SCAN ]</Link>
          <span className="text-[#F0EAD9]/30">[ DISCOVER ]</span>
          <Link to="/wardrobe" className="text-[#F0EAD9] border-b border-[#F0EAD9] pb-1">[ WARDROBE ]</Link>
          <span className="text-[#F0EAD9]/30">[ PROFILE ]</span>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-10 pb-16">
        {/* ===== HEADER ===== */}
        <div className="flex items-end justify-between mt-8">
          <div className="flex items-start gap-10">
            <div>
              <div className="flex items-center gap-4 text-xs tracking-[0.3em] text-[#F0EAD9]/60">
                <span>02</span>
                <span className="h-px w-16 bg-[#F0EAD9]/30" />
                <span>WARDROBE</span>
              </div>
              <h1 className="font-display text-6xl mt-5">Your collection.</h1>
            </div>
            {/* Right side text + vertical divider */}
            <div className="hidden md:block border-l border-[#F0EAD9]/20 pl-8 pb-2">
              <p className="font-display text-lg leading-snug">Your wardrobe, your style.</p>
              <p className="text-sm text-[#F0EAD9]/60 mt-1">Every piece you own, all in one place.</p>
            </div>
          </div>
        </div>

        {/* ===== STATS ===== */}
        <StatsBar items={FAKE_ITEMS} />

        <div className="h-px bg-[#F0EAD9]/15 my-8" />

        {/* ===== FILTERS + SEARCH + SORT ===== */}
        <FilterBar />

        {/* ===== GRID ===== */}
        <ItemGrid items={FAKE_ITEMS} />
      </main>
    </div>
  )
}

export default WardrobePage