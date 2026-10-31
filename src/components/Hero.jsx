import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCoverflow, FreeMode } from 'swiper/modules'
import useTypingEffect from '../utils/useTypingEffect'

import 'swiper/css'
import 'swiper/css/effect-coverflow'

import home1 from '../../../images/home-1.jpg?url'
import home2 from '../../../images/home-2.jpg?url'
import home3 from '../../../images/home-3.jpeg?url'
import home4 from '../../../images/home-4.jpeg?url'
import home5 from '../../../images/home-5.webp?url'
import home6 from '../../../images/home-6.jpeg?url'

const sliderImages = [
  home1,
  home2,
  home3,
  home4,
  home5,
  home6,
  home1,
  home2,
  home3,
  home4,
  home5,
  home6,
]

export default function Hero() {
  const typedText = useTypingEffect(
    'ITS TIME TO CELEBRATE! THE BEST\nEVENT ORGANIZERS',
    120,
    1600
  )

  return (
    <section className="hero" id="hero">
      <h1 className="hero-typed-heading">
        <span className="typing-dynamic">{typedText}</span>
        <span className="typing-cursor" aria-hidden="true" />
      </h1>

      <button
        className="btn"
        onClick={() => {
          const el = document.getElementById('contact')
          el?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        Contact Us
      </button>

      <Swiper
        className="home-slider"
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        spaceBetween={30}
        loop={true}
        speed={4000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        freeMode={{
          enabled: true,
          momentum: false,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: true,
        }}
        modules={[Autoplay, EffectCoverflow, FreeMode]}
      >
        {sliderImages.map((src, idx) => (
          <SwiperSlide key={`${src}-${idx}`}>
            <img src={src} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

