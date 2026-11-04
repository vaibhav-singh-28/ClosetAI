import { Link } from "react-router-dom"
import { ScanLine, SearchX } from "lucide-react"

function ItemCard({ item }) {
  return (
    <div className="group">
      <div className="rounded-xl bg-[#2A3324] h-52 flex items-center justify-center p-4 overflow-hidden">
        <img src={item.imageUrl} alt={item.subcategory}
             className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300" />
      </div>
      <h3 className="font-display text-lg mt-3">{item.subcategory}</h3>
      <div className="flex flex-wrap gap-1.5 mt-2">
        {[item.category, item.colors[0], item.style].map(tag => (
          <span key={tag}
            className="border border-[#F0EAD9]/25 rounded-full px-2.5 py-0.5 text-[9px] tracking-[0.15em] uppercase text-[#F0EAD9]/70">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

function EmptyWardrobe() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-3xl text-[#F0EAD9]/70">Your wardrobe is empty.</p>
      <p className="text-sm text-[#F0EAD9]/40 mt-2">Scan your first item and let AI do the magic.</p>
      <Link to="/scan"
        className="mt-6 flex items-center gap-2 bg-[#F0EAD9] text-[#1D251A] font-medium px-8 py-3 rounded-xl hover:bg-white transition">
        <ScanLine size={16} /> Scan your first item
      </Link>
    </div>
  )
}

// ⭐ NAYA: filter/search pe kuch match nahi hua
function NoMatch({ onClear }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <SearchX size={36} className="text-[#F0EAD9]/30 mb-4" />
      <p className="font-display text-2xl text-[#F0EAD9]/60">No items match your filters.</p>
      <button onClick={onClear}
        className="mt-5 text-xs tracking-[0.2em] border border-[#F0EAD9]/30 px-5 py-2 rounded-lg text-[#F0EAD9]/70 hover:text-[#F0EAD9] hover:border-[#F0EAD9]/60 transition">
        [ CLEAR FILTERS ]
      </button>
    </div>
  )
}

function ItemGrid({ items, hasFilters }) {
  if (items.length === 0) {
    // Wardrobe khaali hai YA filters ne sab chhupa diya?
    return hasFilters ? <NoMatch /> : <EmptyWardrobe />
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-10 mt-10">
      {items.map(item => <ItemCard key={item._id} item={item} />)}
    </div>
  )
}

export default ItemGrid