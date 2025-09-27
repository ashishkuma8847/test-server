import { useEffect, useRef } from "react"

const Animated = () => {
  // ✅ Array of references to each blob element
  const blobRefs = useRef([])

  // ✅ Initial starting positions for blobs
  const initialPositions = [
    { x: -4, y: 0 },
    { x: -4, y: 0 },
    { x: 20, y: -8 },
    { x: 20, y: -8 },
  ]

  useEffect(() => {
    let requestId

    // ✅ Function to animate blobs on scroll
    const handleScroll = () => {
      const newScroll = window.pageYOffset // current scroll position (Y-axis)

      // ✅ Move each blob based on scroll position
      blobRefs.current.forEach((blob, index) => {
        const initialPos = initialPositions[index]

        // Sine & Cosine create smooth oscillating movement
        const xOffset = Math.sin(newScroll / 100 + index * 0.5) * 340 // Horizontal wave movement
        const yOffset = Math.cos(newScroll / 100 + index * 0.5) * 40  // Vertical wave movement

        const x = initialPos.x + xOffset
        const y = initialPos.y + yOffset

        // ✅ Apply smooth transformation (translate for fluid movement)
        blob.style.transform = `translate(${x}px, ${y}px)`
        blob.style.transition = "transform 1.4s ease-out"
      })

      // ✅ Keep animating smoothly
      requestId = requestAnimationFrame(handleScroll)
    }

    // Attach scroll listener
    window.addEventListener("scroll", handleScroll)

    return () => {
      // Cleanup on unmount
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(requestId)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10">
      {/* 🔵 Blobs Container */}
      <div className="absolute inset-0">
        {/* Teal Blob (top-left) */}
        <div
          ref={(ref) => (blobRefs.current[0] = ref)}
          className="absolute top-0 -left-4 md:w-96 md:h-96 w-72 h-72 bg-customTeal rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20"
        ></div>

        {/* Cyan Blob (top-right, hidden on small screens) */}
        <div
          ref={(ref) => (blobRefs.current[1] = ref)}
          className="absolute top-0 -right-4 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20 hidden sm:block"
        ></div>

        {/* Emerald Blob (bottom-left) */}
        <div
          ref={(ref) => (blobRefs.current[2] = ref)}
          className="absolute -bottom-8 left-[-40%] md:left-20 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20"
        ></div>

        {/* Blue Blob (bottom-right, hidden on small screens) */}
        <div
          ref={(ref) => (blobRefs.current[3] = ref)}
          className="absolute -bottom-10 right-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 md:opacity-10 hidden sm:block"
        ></div>
      </div>

      {/* ✅ Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f20_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f20_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    </div>
  )
}

export default Animated
