function ResultCard({ item }) {
  return (
    <div className="mt-10 flex items-center gap-5 bg-black/25 backdrop-blur-sm border border-[#e8e0d0]/20 rounded-2xl p-4">
      <img
        src={item.imageUrl}
        alt={item.subcategory}
        className="h-24 w-24 object-contain rounded-xl bg-black/30"
      />
      <div className="flex-1">
        <h3 className="font-display text-xl text-[#f3ede3] capitalize">{item.subcategory}</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="px-3 py-1 bg-[#e8e0d0]/15 text-[#e8e0d0] rounded-full text-xs">{item.category}</span>
          {item.colors.map(c => (
            <span key={c} className="px-3 py-1 bg-[#e8e0d0]/15 text-[#e8e0d0] rounded-full text-xs capitalize">🎨 {c}</span>
          ))}
          <span className="px-3 py-1 bg-[#e8e0d0]/15 text-[#e8e0d0] rounded-full text-xs">{item.style}</span>
        </div>
      </div>
      <button className="text-[#f3ede3]/50 hover:text-red-400 transition text-xl" title="Delete">
        🗑️
      </button>
    </div>
  )
}

export default ResultCard