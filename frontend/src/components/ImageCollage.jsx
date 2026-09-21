const COLS = 6
const ROWS = 3

export const container_W = 60
export const container_H = 40
export const piece_Size = container_W / COLS

export const imagePieces = [
  { id: 0,  row: 0, col: 0, startX: -38, startY: -25, scale: 0.45, blur: 26, rotate: -8,  startTime: 0.98, duration: 2.2 },
  { id: 1,  row: 0, col: 1, startX: 22,  startY: -40, scale: 0.55, blur: 20, rotate: 6,   startTime: 2.29, duration: 2.0 },
  { id: 2,  row: 0, col: 2, startX: -15, startY: 30,  scale: 0.6,  blur: 18, rotate: -4,  startTime: 1.45, duration: 2.4 },
  { id: 3,  row: 0, col: 3, startX: 40,  startY: 15,  scale: 0.4,  blur: 28, rotate: 10,  startTime: 3.02, duration: 1.8 },
  { id: 4,  row: 0, col: 4, startX: -30, startY: -10, scale: 0.5,  blur: 22, rotate: -6,  startTime: 0.55, duration: 2.6 },
  { id: 5,  row: 0, col: 5, startX: 35,  startY: -30, scale: 0.45, blur: 25, rotate: 8,   startTime: 3.85, duration: 1.6 },
  { id: 6,  row: 1, col: 0, startX: -45, startY: 20,  scale: 0.5,  blur: 24, rotate: 5,   startTime: 1.90, duration: 2.1 },
  { id: 7,  row: 1, col: 1, startX: 18,  startY: 35,  scale: 0.6,  blur: 16, rotate: -10, startTime: 3.42, duration: 1.7 },
  { id: 8,  row: 1, col: 2, startX: -20, startY: -35, scale: 0.4,  blur: 27, rotate: 7,   startTime: 1.34, duration: 2.3 },
  { id: 9,  row: 1, col: 3, startX: 30,  startY: -15, scale: 0.55, blur: 19, rotate: -5,  startTime: 2.64, duration: 1.9 },
  { id: 10, row: 1, col: 4, startX: -35, startY: 25,  scale: 0.45, blur: 23, rotate: 9,   startTime: 3.55, duration: 1.6 },
  { id: 11, row: 1, col: 5, startX: 42,  startY: 10,  scale: 0.5,  blur: 21, rotate: -7,  startTime: 0.68, duration: 2.5 },
  { id: 12, row: 2, col: 0, startX: -25, startY: -30, scale: 0.6,  blur: 17, rotate: 4,   startTime: 3.94, duration: 1.5 },
  { id: 13, row: 2, col: 1, startX: 15,  startY: 40,  scale: 0.4,  blur: 29, rotate: -9,  startTime: 1.79, duration: 2.2 },
  { id: 14, row: 2, col: 2, startX: -40, startY: -15, scale: 0.5,  blur: 22, rotate: 6,   startTime: 2.74, duration: 1.8 },
  { id: 15, row: 2, col: 3, startX: 28,  startY: -25, scale: 0.55, blur: 18, rotate: -4,  startTime: 1.07, duration: 2.4 },
  { id: 16, row: 2, col: 4, startX: -18, startY: 35,  scale: 0.45, blur: 25, rotate: 8,   startTime: 3.10, duration: 1.7 },
  { id: 17, row: 2, col: 5, startX: 38,  startY: 20,  scale: 0.5,  blur: 20, rotate: -6,  startTime: 2.17, duration: 2.0 },
]

const ImageCollage = ({ piecesRef, imageUrl }) => {
    return (
        <>
        {imagePieces.map((piece, i) => (
            <div
                key= {piece.id}
                ref ={(el) => (piecesRef.current[i] = el)}
                className="absolute overflow-hidden"
                style = {{
                    width: `${piece_Size}vw`,
                    height: `${piece_Size}vw`,
                    left: `${piece.col * piece_Size}vw`,
                    top: `${piece.row * piece_Size}vw`,
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: `${container_W}vw ${container_H}vw`,
                    backgroundPosition: `-${piece.col * piece_Size}vw -${piece.row * piece_Size}vw`,
                }}
            />
            ))}
        </>
    )
}

export default ImageCollage