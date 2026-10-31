import emailjs from 'emailjs-com'

export async function sendContactEmail(formEl) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  if (!serviceId || !templateId || !publicKey) {
    // Demo-safe mode: do not break the app when EmailJS is not configured.
    return { demo: true }
  }

  try {
    const templateParams = {
      from_name: formEl?.fullName?.value || '',
      from_email: formEl?.email?.value || '',
      phone: formEl?.phone?.value || '',
      event_type: formEl?.eventType?.value || '',
      message: formEl?.message?.value || '',
    }

    const result = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    )
    return { demo: false, result }
  } catch (err) {
    const details = err?.text || err?.message || ''
    if (String(details).toLowerCase().includes('public key')) {
      throw new Error('Invalid EmailJS public key. Please verify VITE_EMAILJS_PUBLIC_KEY.')
    }
    if (String(details).toLowerCase().includes('service')) {
      throw new Error('Invalid EmailJS service/template configuration. Please verify your EmailJS IDs.')
    }
    throw new Error('Unable to send email right now. Please try again in a moment.')
  }
}

