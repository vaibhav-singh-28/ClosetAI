import { useState } from "react"
import { Search, ChevronDown } from "lucide-react"

const PILLS = ["ALL", "TOPS", "BOTTOMS", "OUTERWEAR", "DRESSES", "SHOES", "ACCESSORIES"]

function FilterBar() {
  const [active, setActive] = useState("ALL")
  // NOTE: abhi sirf visual active state hai — filtering logic real data wiring ke saath aayegi

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Category pills */}
      <div className="flex flex-wrap gap-3">
        {PILLS.map(p => (
          <button key={p} onClick={() => setActive(p)}
            className={`text-xs tracking-[0.2em] px-4 py-2 rounded-lg transition ${
              active === p
                ? "bg-[#F0EAD9] text-[#1D251A] font-medium"
                : "border border-[#F0EAD9]/25 text-[#F0EAD9]/60 hover:text-[#F0EAD9] hover:border-[#F0EAD9]/50"
            }`}>
            [ {p} ]
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 border border-[#F0EAD9]/25 rounded-lg px-4 py-2 ml-auto">
        <Search size={15} className="text-[#F0EAD9]/50" />
        <input
          type="text"
          placeholder="Search your wardrobe..."
          className="bg-transparent outline-none text-sm placeholder:text-[#F0EAD9]/40 w-48"
        />
      </div>

      {/* Sort */}
      <button className="flex items-center gap-2 border border-[#F0EAD9]/25 rounded-lg px-4 py-2 text-xs tracking-[0.15em] text-[#F0EAD9]/70 hover:text-[#F0EAD9] transition">
        SORT: NEWEST <ChevronDown size={14} />
      </button>
    </div>
  )
}

export default FilterBar