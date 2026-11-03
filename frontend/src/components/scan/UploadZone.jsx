import { useState } from "react"
import { Link } from "react-router-dom"
import { ImagePlus, Loader2, Trash2, Shirt, Palette, Sparkles, CalendarDays } from "lucide-react"

const API = "http://localhost:3000"

function UploadZone() {
  // phase: "empty" → "ready" → "processing" → "done"
  const [phase, setPhase] = useState("empty")
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)

  const handleFile = (f) => {
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setPhase("ready")
  }

  const handleUpload = async () => {
    setPhase("processing")
    const fd = new FormData()
    fd.append("image", file)

    try {
      const res = await fetch(`${API}/upload`, { method: "POST", body: fd })
      const data = await res.json()

      if (data.error) {
        alert("❌ " + data.details)
        setPhase("ready")
        return
      }

      setResult(data)
      setPhase("done")
    } catch (e) {
      alert("❌ Server nahi mila — backend chal raha hai?")
      setPhase("ready")
    }
  }

  const reset = () => {
    setFile(null)
    setPreview(null)
    setResult(null)
    setPhase("empty")
  }

  const handleDelete = async () => {
    if (result?._id) {
      await fetch(`${API}/api/items/${result._id}`, { method: "DELETE" })
    }
    reset()
  }

  return (
    <div className="border-2 border-dashed border-[#e8e0d0]/40 rounded-3xl py-16 h-[460px] flex flex-col items-center justify-center text-center backdrop-blur-sm bg-black/10 relative">

      {/* Hidden file input — poora zone click karne pe khule */}
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />

      {phase === "done" ? (
        /* ===== STATE: DONE — zone khud result card ban gaya ===== */
        <>
          <img src={preview} alt={result.subcategory} className="h-44 object-contain rounded-xl mb-4 bg-black/30 p-2" />

          <h3 className="font-display text-2xl text-[#f3ede3] capitalize">{result.subcategory}</h3>

          <div className="flex flex-wrap justify-center gap-2 mt-3 max-w-md">
            {/* Category */}
            <span className="px-3.5 py-1.5 bg-[#e8e0d0]/15 text-[#e8e0d0] rounded-full text-sm flex items-center gap-1.5">
              <Shirt size={14} /> {result.category}
            </span>

            {/* Colors */}
            {result.colors.map(c => (
              <span key={c} className="px-3.5 py-1.5 bg-[#e8e0d0]/15 text-[#e8e0d0] rounded-full text-sm flex items-center gap-1.5 capitalize">
                <Palette size={14} /> {c}
              </span>
            ))}

            {/* Style */}
            <span className="px-3.5 py-1.5 bg-[#e8e0d0]/15 text-[#e8e0d0] rounded-full text-sm flex items-center gap-1.5">
              <Sparkles size={14} /> {result.style}
            </span>

            {/* Occasions */}
            {result.occasions.map(o => (
              <span key={o} className="px-3.5 py-1.5 bg-green-500/15 text-green-300 rounded-full text-sm flex items-center gap-1.5">
                <CalendarDays size={14} /> {o}
              </span>
            ))}
          </div>

          <p className="text-green-300 text-sm mt-4 font-medium">Item added to your wardrobe</p>

          <div className="flex gap-3 mt-5">
            <Link
              to="/wardrobe"
              className="bg-[#e8e0d0] text-[#3a322a] font-medium px-8 py-3 rounded-xl hover:bg-[#f3ede3] transition"
            >
              Open wardrobe
            </Link>
            <button
              onClick={reset}
              className="border border-[#e8e0d0]/50 text-[#e8e0d0] font-medium px-8 py-3 rounded-xl hover:bg-[#e8e0d0]/10 transition"
            >
              Add more items
            </button>
          </div>

          <button
            onClick={handleDelete}
            className="absolute top-4 right-4 text-[#f3ede3]/40 hover:text-red-400 transition"
            title="Wrong tag? Remove item"
          >
            <Trash2 size={18} />
          </button>
        </>
      ) : (
      /* ===== STATES: EMPTY / READY / PROCESSING ===== */
      <>
        {/* ✅ YEH LABEL — pura upper area click-to-browse ban gaya */}
        <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center">
          {preview ? (
            <img src={preview} alt="preview" className="h-44 object-contain rounded-xl mb-4" />
          ) : (
            <>
              <ImagePlus size={44} strokeWidth={1.5} className="text-[#e8e0d0]/70 mb-4" />
              <p className="text-xl text-[#f3ede3]">Drag and drop your photo here</p>
              <p className="text-sm text-[#f3ede3]/60 mt-1 underline underline-offset-4">or click to browse</p>
            </>
          )}
          {file && <span className="text-sm text-[#e8e0d0]/60 mt-2">Change photo</span>}
        </label>

        <button
          onClick={handleUpload}
          disabled={phase === "processing" || !file}
          className="bg-[#e8e0d0] text-[#3a322a] font-medium px-12 py-3.5 rounded-xl mt-6 hover:bg-[#f3ede3] transition disabled:opacity-100 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {phase === "processing" && <Loader2 size={18} className="animate-spin" />}
          {phase === "processing" ? "AI is thinking..." : "Upload item"}
        </button>

        <p className="text-[10px] tracking-[0.25em] uppercase text-[#f3ede3]/50 mt-8">
          JPG, PNG, WEBP supported · one photo at a time
        </p>
      </>
    )}
    </div>
  )
}

export default UploadZone