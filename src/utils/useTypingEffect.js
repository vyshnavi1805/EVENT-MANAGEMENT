import { useEffect, useState } from 'react'

export default function useTypingEffect(text, speed = 80, pauseMs = 1200) {
  const [typed, setTyped] = useState('')

  useEffect(() => {
    let i = 0
    let timeoutId
    let cancelled = false

    const typeNext = () => {
      if (cancelled) return

      if (i < text.length) {
        i += 1
        setTyped(text.slice(0, i))
        timeoutId = window.setTimeout(typeNext, speed)
      } else {
        timeoutId = window.setTimeout(() => {
          i = 0
          setTyped('')
          typeNext()
        }, pauseMs)
      }
    }

    typeNext()

    return () => {
      cancelled = true
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [text, speed, pauseMs])

  return typed
}

