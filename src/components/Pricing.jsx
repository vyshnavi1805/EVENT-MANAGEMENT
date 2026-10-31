import { useState } from 'react'
import { handlePayment } from '../utils/razorpay'

const plans = [
  {
    id: 'birthdays',
    title: 'For Birthdays',
    displayPrice: '$250.99',
    amount: 10000, // Dummy amount (Razorpay test mode)
    currency: 'INR',
    features: [
      'Full Services',
      'Decorations',
      'Music And Photos',
      'Food And Drinks',
      'Invitation Card',
    ],
  },
  {
    id: 'wedding',
    title: 'For Wedding',
    displayPrice: '$450.99',
    amount: 10000,
    currency: 'INR',
    mostPopular: true,
    features: [
      'Full Services',
      'Decorations',
      'Music And Photos',
      'Food And Drinks',
      'Invitation Card',
    ],
  },
  {
    id: 'concerts',
    title: 'For Concerts',
    displayPrice: '$650.99',
    amount: 10000,
    currency: 'INR',
    features: [
      'Full Services',
      'Decorations',
      'Music And Photos',
      'Food And Drinks',
      'Invitation Card',
    ],
  },
  {
    id: 'others',
    title: 'For Others',
    displayPrice: '$850.99',
    amount: 10000,
    currency: 'INR',
    features: [
      'Full Services',
      'Decorations',
      'Music And Photos',
      'Food And Drinks',
      'Invitation Card',
    ],
  },
]

export default function Pricing() {
  const [payingId, setPayingId] = useState(null)

  const onCheckout = async (plan) => {
    if (payingId) return
    setPayingId(plan.id)

    try {
      await handlePayment({
        title: plan.title,
        amount: plan.amount,
        currency: plan.currency,
      })
      alert('Payment successful')
    } catch (err) {
      alert(err?.message || 'Payment failed')
    } finally {
      setPayingId(null)
    }
  }

  return (
    <section className="price" id="price">
      <h1 className="heading">
        OUR <span>PRICE</span>
      </h1>

      <div className="price-container">
        {plans.map((plan) => (
          <div className="price-box" key={plan.id}>
            {plan.mostPopular ? (
              <div className="most-popular-tag">Most Popular</div>
            ) : null}

            <div className="price-title">{plan.title}</div>
            <h2>{plan.displayPrice}</h2>
            <ul>
              {plan.features.map((f) => (
                <li key={f}>✔ {f}</li>
              ))}
            </ul>

            <button
              disabled={payingId === plan.id}
              onClick={() => onCheckout(plan)}
            >
              {payingId === plan.id ? 'Processing...' : 'Check Out'}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

