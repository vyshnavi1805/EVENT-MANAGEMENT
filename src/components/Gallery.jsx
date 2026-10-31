import { useEffect, useRef, useState } from 'react'

import g1 from '../../../images/g1.jpeg?url'
import g2 from '../../../images/g2.jpeg?url'
import g3 from '../../../images/g3.jpeg?url'
import g4 from '../../../images/g4.avif?url'
import g5 from '../../../images/g5.webp?url'
import g6 from '../../../images/g6.jpg?url'
import g7 from '../../../images/g7.jpg?url'
import g8 from '../../../images/g8.avif?url'
import g9 from '../../../images/g9.webp?url'

const galleryImages = [g1, g2, g3, g4, g5, g6, g7, g8, g9]

export default function Gallery() {
  const containerRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="gallery" id="gallery">
      <h1 className="heading">
        OUR <span>GALLERY</span>
      </h1>

      <div
        ref={containerRef}
        className={`gallery-container gallery-stack ${inView ? 'is-visible' : ''}`}
      >
        {galleryImages.map((src, i) => (
          <div className="gallery-box" key={`${src}-${i}`} style={{ ['--i']: i }}>
            <img src={src} alt="" />
          </div>
        ))}
      </div>
    </section>
  )
}

