const TIPS = [
  { img: "/tips/tip1.jpg", text: "Use a clean, plain background" },
  { img: "/tips/tip2.jpg", text: "Ensure good lighting" },
  { img: "/tips/tip3.jpg", text: "Keep the item clearly in the frame" },
]

function TipsSection() {
  return (
    <div>
      <p className="text-xs tracking-[0.25em] uppercase text-[#f3ede3]/70 mb-4">
        Tips for better results
      </p>
      <div className="grid grid-cols-3 gap-4">
        {TIPS.map((tip, i) => (
          <div key={i}>
            <div className="rounded-xl overflow-hidden bg-black/20 h-30 flex items-center justify-center">
              <img src={tip.img} alt="tip" className="h-full w-full object-cover" />
            </div>
            <p className="text-xs text-[#f7f3ec] /80 mt-2 leading-snug">{tip.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TipsSection