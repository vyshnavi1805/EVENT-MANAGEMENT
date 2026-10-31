import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'

const envConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

function hasRealValue(value) {
  if (!value) return false
  const normalized = String(value).trim().toLowerCase()
  return normalized !== 'demo' && normalized !== 'changeme'
}

function isLikelyValidApiKey(value) {
  return hasRealValue(value) && String(value).startsWith('AIza')
}

// Fallback for local demo runs when .env is empty.
const fallbackConfig = {
  apiKey: "AIzaSyBZAFfjeJ3em2C-HD05qN5dh7XflQa6P04",
  authDomain: "evento-app-62039.firebaseapp.com",
  projectId: "evento-app-62039",
  storageBucket: "evento-app-62039.firebasestorage.app",
  messagingSenderId: "768942051785",
  appId: "1:768942051785:web:4939cd60b07162aa74d818",
  measurementId: "G-4LY7MYKHRJ",
}

const hasEnvFirebaseConfig =
  isLikelyValidApiKey(envConfig.apiKey) &&
  hasRealValue(envConfig.authDomain) &&
  hasRealValue(envConfig.projectId) &&
  hasRealValue(envConfig.appId)

const firebaseConfig = hasEnvFirebaseConfig ? envConfig : fallbackConfig

const hasFirebaseConfig =
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.appId

let auth = null
let googleProvider = null

try {
  if (hasFirebaseConfig) {
    const app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    googleProvider = new GoogleAuthProvider()
  }
} catch (err) {
  console.error('Firebase init error:', err)
}

export { auth, googleProvider, firebaseConfig, hasFirebaseConfig }