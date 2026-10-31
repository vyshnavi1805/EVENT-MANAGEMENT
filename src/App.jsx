import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import AuthModal from './pages/AuthModal'
import {
  loginWithEmail,
  loginWithGoogle,
  logoutUser,
  signupWithEmail,
  subscribeToAuthChanges,
} from './utils/auth'

function App() {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login') // 'login' | 'signup'

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((nextUser) => {
      setUser(nextUser)
      setAuthLoading(false)
    })

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    try {
      await logoutUser()
      setAuthOpen(false)
    } catch (err) {
      alert(err?.message || 'Logout failed')
    }
  }

  const openLogin = () => {
    setAuthMode('login')
    setAuthOpen(true)
  }

  const openSignup = () => {
    setAuthMode('signup')
    setAuthOpen(true)
  }

  return (
    <>
      <Navbar
        user={user}
        authLoading={authLoading}
        onLogin={openLogin}
        onSignup={openSignup}
        onLogout={handleLogout}
      />
      <Hero />

      <Services />
      <Gallery />
      <Pricing />
      <Contact />
      <Footer />
      <Chatbot />
      <AuthModal
        open={authOpen}
        mode={authMode}
        onClose={() => setAuthOpen(false)}
        onSwitchMode={(nextMode) => setAuthMode(nextMode)}
        onEmailLogin={loginWithEmail}
        onEmailSignup={signupWithEmail}
        onGoogleLogin={loginWithGoogle}
        onSuccess={() => setAuthOpen(false)}
      />
    </>
  )
}

export default App
