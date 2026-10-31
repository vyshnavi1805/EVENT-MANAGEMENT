import { useMemo, useState } from 'react'

function getBotReply(text) {
  const msg = text.toLowerCase()

  if (msg.includes('price') || msg.includes('cost') || msg.includes('plan')) {
    return 'Check the "Price" section to see packages for birthdays, weddings, concerts, and more.'
  }

  if (msg.includes('gallery') || msg.includes('photos')) {
    return 'You can find our latest photos in the "Gallery" section. Hover over images for a better look.'
  }

  if (msg.includes('contact') || msg.includes('email') || msg.includes('message')) {
    return 'Use the "Contact Us" form to send your event details. We will get back to you soon.'
  }

  if (msg.includes('login') || msg.includes('signup') || msg.includes('google')) {
    return 'You can log in using email/password or Google. Look at the top navbar for the Login option.'
  }

  if (msg.includes('checkout') || msg.includes('payment') || msg.includes('razorpay')) {
    return 'Select a plan and click "Check Out". Payment uses Razorpay test mode (dummy amount).'
  }

  return 'Tell me your event type (wedding, birthday, concert, etc.) and I will suggest the best plan.'
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I can help you plan your event. What are you organizing?' },
  ])

  const canSend = useMemo(() => input.trim().length > 0, [input])

  const send = () => {
    if (!canSend) return
    const userText = input.trim()
    setInput('')

    setMessages((prev) => [...prev, { from: 'user', text: userText }])

    const reply = getBotReply(userText)
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'bot', text: reply }])
    }, 350)
  }

  return (
    <>
      <button
        type="button"
        className="chatbot-launcher"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        Chat
      </button>

      {open ? (
        <div className="chatbot-panel" role="dialog" aria-label="Event planner chatbot">
          <div className="chatbot-header">
            <span>Evento Assistant</span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat">
              X
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((m, idx) => (
              <div
                key={`${m.from}-${idx}`}
                className={`chatbot-msg ${m.from === 'bot' ? 'chatbot-msg--bot' : 'chatbot-msg--user'}`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="chatbot-input-row">
            <input
              className="chatbot-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') send()
              }}
            />
            <button className="chatbot-send" type="button" onClick={send} disabled={!canSend}>
              Send
            </button>
          </div>
        </div>
      ) : null}
    </>
  )
}

