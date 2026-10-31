import { useRef, useState } from 'react'
import { sendContactEmail } from '../utils/emailjs'

export default function Contact() {
  const formRef = useRef(null)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('success') // 'success' | 'error'

  const onSubmit = async (e) => {
    e.preventDefault()
    const formEl = formRef.current
    if (!formEl) return

    setSubmitting(true)
    setMessage(null)

    try {
      const response = await sendContactEmail(formEl)
      setMessageType('success')
      setMessage(
        response?.demo
          ? 'Demo mode: message form works. Add EmailJS keys in `.env` to send real emails.'
          : 'Message sent successfully!'
      )
      formEl.reset()
    } catch (err) {
      setMessageType('error')
      setMessage(err?.message || 'Failed to send message')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="contact" id="contact">
      <h1 className="heading">
        CONTACT <span>US</span>
      </h1>

      <div className="contact-container">
        <form ref={formRef} className="contact-form" onSubmit={onSubmit}>
          <div className="input-box">
            <input
              type="text"
              name="fullName"
              placeholder="Your Full Name"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email Address"
              required
            />
          </div>

          <div className="input-box">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
            />
            <input
              type="text"
              name="eventType"
              placeholder="Event Type (Wedding, Corporate, Birthday...)"
              required
            />
          </div>

          <textarea
            name="message"
            placeholder="Tell us about your event requirements..."
            rows="6"
            required
          />

          <button type="submit" className="btn" disabled={submitting}>
            {submitting ? 'Sending...' : 'Send Message'}
          </button>

          {message ? (
            <p className={`contact-message ${messageType}`}>{message}</p>
          ) : null}
        </form>
      </div>
    </section>
  )
}

