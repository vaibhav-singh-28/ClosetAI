import { Search, ChevronDown } from "lucide-react"

const PILLS = ["ALL", "TOPS", "BOTTOMS", "OUTERWEAR", "DRESSES", "SHOES", "ACCESSORIES"]

function FilterBar({ cat, setCat, query, setQuery, sort, setSort }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Pills — ab actually filter karte hain */}
      <div className="flex flex-wrap gap-3">
        {PILLS.map(p => (
          <button key={p} onClick={() => setCat(p)}
            className={`text-xs tracking-[0.2em] px-4 py-2 rounded-lg transition ${
              cat === p
                ? "bg-[#F0EAD9] text-[#1D251A] font-medium"
                : "border border-[#F0EAD9]/25 text-[#F0EAD9]/60 hover:text-[#F0EAD9] hover:border-[#F0EAD9]/50"
            }`}>
            [ {p} ]
          </button>
        ))}
      </div>

      {/* Search — type karte hi filter hota hai */}
      <div className="flex items-center gap-2 border border-[#F0EAD9]/25 rounded-lg px-4 py-2 ml-auto focus-within:border-[#F0EAD9]/60 transition">
        <Search size={15} className="text-[#F0EAD9]/50" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search your wardrobe..."
          className="bg-transparent outline-none text-sm placeholder:text-[#F0EAD9]/40 w-48"
        />
      </div>

      {/* Sort — asli dropdown */}
      <div className="relative">
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="appearance-none bg-transparent border border-[#F0EAD9]/25 rounded-lg pl-4 pr-9 py-2 text-xs tracking-[0.15em] text-[#F0EAD9]/70 outline-none cursor-pointer hover:border-[#F0EAD9]/50 [&>option]:bg-[#1D251A]">
          <option value="newest">SORT: NEWEST</option>
          <option value="oldest">SORT: OLDEST</option>
          <option value="name">SORT: NAME A-Z</option>
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#F0EAD9]/50" />
      </div>
    </div>
  )
}

export default FilterBar