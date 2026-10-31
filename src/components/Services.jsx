import aboutpic from '../../../images/aboutpic.jpeg?url'

import client1 from '../../../images/client1.jpeg?url'
import client2 from '../../../images/client2.jpg?url'
import client3 from '../../../images/client3.webp?url'
import client4 from '../../../images/client4.avif?url'
import client5 from '../../../images/client5.jpg?url'
import client6 from '../../../images/client6.webp?url'

const services = [
  {
    icon: '📍',
    title: 'Venue Selection',
    description:
      'We help you choose the perfect venue that matches your theme, guest list, and budget to create a memorable celebration experience.',
  },
  {
    icon: '📨',
    title: 'Invitation Card',
    description:
      'We design elegant and customized invitation cards that beautifully reflect your event style and leave a lasting first impression.',
  },
  {
    icon: '🍽️',
    title: 'Food And Drinks',
    description:
      'From delicious starters to premium beverages, we provide high-quality catering services tailored to your event preferences.',
  },
  {
    icon: '🎵',
    title: 'Entertainment',
    description:
      'We arrange live music, DJs, performances, and engaging activities to keep your guests entertained throughout the event.',
  },
  {
    icon: '📸',
    title: 'Photos And Videos',
    description:
      'Our professional photographers and videographers capture every special moment so you can relive your celebration forever.',
  },
  {
    icon: '🍰',
    title: 'Custom Foods',
    description:
      'We offer customized menus including themed cakes, regional cuisines, and special dishes prepared with great care and taste.',
  },
]

const reviews = [
  {
    img: client1,
    name: 'John Deo',
    role: 'Happy Client',
    text:
      'The team delivered an outstanding experience. Everything was well-organized, beautifully arranged, and executed exactly as promised. Highly professional service!',
  },
  {
    img: client2,
    name: 'Sarah Smith',
    role: 'Event Client',
    text:
      'From planning to execution, the coordination was seamless. They truly understand client expectations and deliver beyond imagination.',
  },
  {
    img: client3,
    name: 'David Lee',
    role: 'Corporate Client',
    text:
      'Our corporate event was handled with great professionalism. The team ensured everything ran smoothly and on schedule.',
  },
  {
    img: client4,
    name: 'Priya Sharma',
    role: 'Wedding Client',
    text:
      'They made our special day unforgettable. The decorations, lighting, and arrangements were absolutely perfect.',
  },
  {
    img: client5,
    name: 'Sophia Reynolds',
    role: 'Birthday Celebration',
    text:
      'From décor to entertainment, everything was handled perfectly. Evento created a vibrant and joyful atmosphere that made the birthday celebration unforgettable for everyone.',
  },
  {
    img: client6,
    name: 'Michael Carter',
    role: 'Engagement Ceremony',
    text:
      'The team’s creativity and attention to detail were outstanding. Our engagement ceremony was elegant, beautifully organized, and truly exceeded our expectations.',
  },
]

function handleSpotlightMove(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100
  e.currentTarget.style.setProperty('--spotlight-x', `${x}%`)
  e.currentTarget.style.setProperty('--spotlight-y', `${y}%`)
}

export default function Services() {
  return (
    <>
      <section className="services" id="services">
        <h1 className="heading">
          OUR <span>SERVICES</span>
        </h1>

        <div className="service-container">
          {services.map((s) => (
            <div
              className="service-box"
              key={s.title}
              onMouseMove={handleSpotlightMove}
            >
              <div className="icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about" id="about">
        <h1 className="heading">
          <span>ABOUT US</span> {' '}
        </h1>

        <div className="about-container">
          <div className="about-image">
            <img src={aboutpic} alt="About Evento" />
          </div>

          <div className="about-content">
            <h1>
              We Will Give A Very <span>Special Celebration</span> For You
            </h1>
            <p>
              At Evento, we specialize in delivering exceptional event experiences tailored to your vision. From intimate gatherings to grand celebrations, our expert team handles every detail with precision, creativity, and professionalism to ensure flawless execution.
            </p>
            <p>
              With years of industry expertise and a passion for perfection, we transform ideas into extraordinary moments. Our commitment to quality, innovation, and client satisfaction makes every event seamless, memorable, and truly remarkable.
            </p>

            <a href="#contact" className="about-btn">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <section className="review" id="review">
        <h1 className="heading">
          CLIENTS <span>REVIEW</span>
        </h1>

        <div className="review-container">
          {reviews.map((r) => (
            <div
              className="review-card spotlight-card"
              key={r.name}
              onMouseMove={handleSpotlightMove}
            >
              <div className="client-info">
                <img src={r.img} alt="Client" />
                <div>
                  <h4>{r.name}</h4>
                  <span>{r.role}</span>
                </div>
              </div>
              <p>{r.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

