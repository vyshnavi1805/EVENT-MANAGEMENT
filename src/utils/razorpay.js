let razorpayScriptPromise = null

function loadRazorpayScript() {
  if (razorpayScriptPromise) return razorpayScriptPromise

  razorpayScriptPromise = new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve(window.Razorpay)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => resolve(window.Razorpay)
    script.onerror = () =>
      reject(new Error('Failed to load Razorpay checkout script'))

    document.body.appendChild(script)
  })

  return razorpayScriptPromise
}

/**
 * Reusable payment function (Razorpay Checkout)
 * @param {{ title: string, amount: number, currency?: string }} plan
 */
export async function handlePayment(plan) {
  const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID
  const currency = plan.currency || 'INR'

  if (!keyId) {
    throw new Error('Missing VITE_RAZORPAY_KEY_ID in your .env file')
  }

  await loadRazorpayScript()

  const amount = Number(plan.amount)
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error('Invalid payment amount for the selected plan')
  }

  return new Promise((resolve, reject) => {
    const options = {
      key: keyId,
      amount,
      currency,
      name: 'Evento',
      description: `Payment for ${plan.title}`,
      handler: (response) => resolve(response),
      prefill: {
        email: '',
        contact: '',
      },
      theme: {
        color: '#3a72ff',
      },
      modal: {
        ondismiss: () => reject(new Error('Payment dismissed')),
      },
    }

    const rzp = new window.Razorpay(options)

    rzp.on('payment.failed', (response) => {
      reject(
        new Error(
          response?.error?.description || 'Payment failed. Try again.'
        )
      )
    })

    rzp.open()
  })
}

