const CATS = [
  { key: "all",       label: "ITEMS" },
  { key: "top",       label: "TOPS" },
  { key: "bottom",    label: "BOTTOMS" },
  { key: "outerwear", label: "OUTERWEAR" },
  { key: "dress",     label: "DRESSES" },
  { key: "shoes",     label: "SHOES" },
  { key: "accessory", label: "ACCESSORIES" },
]

function StatsBar({ items }) {
  return (
    <div className="flex flex-wrap items-center mt-10">
      {CATS.map((cat, i) => (
        <div key={cat.key}
             className={`flex items-baseline gap-2 ${i > 0 ? "border-l border-[#F0EAD9]/15 px-8" : "pr-8"}`}>
          <span className="font-display text-3xl">
            {cat.key === "all" ? items.length : items.filter(it => it.category === cat.key).length}
          </span>
          <span className="text-[10px] tracking-[0.2em] text-[#F0EAD9]/50">{cat.label}</span>
        </div>
      ))}
    </div>
  )
}

export default StatsBar