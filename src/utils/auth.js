import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { auth, googleProvider } from '../firebase'

function getAuthInstance() {
  return auth || null
}

function rejectAuthNotConfigured() {
  return Promise.reject(
    new Error(
      'Auth is disabled because Firebase is not configured. Add VITE_FIREBASE_* values to `my-app/.env` to enable login.'
    )
  )
}

export function subscribeToAuthChanges(onUser) {
  const authInstance = getAuthInstance()
  if (!authInstance) {
    onUser?.(null)
    return () => {}
  }
  return onAuthStateChanged(authInstance, onUser)
}

export function loginWithEmail(email, password) {
  const authInstance = getAuthInstance()
  if (!authInstance) return rejectAuthNotConfigured()
  return signInWithEmailAndPassword(authInstance, email, password)
}

export function signupWithEmail(email, password) {
  const authInstance = getAuthInstance()
  if (!authInstance) return rejectAuthNotConfigured()
  return createUserWithEmailAndPassword(authInstance, email, password)
}

export function loginWithGoogle() {
  const authInstance = getAuthInstance()
  if (!authInstance || !googleProvider) return rejectAuthNotConfigured()
  return signInWithPopup(authInstance, googleProvider)
}

export function logoutUser() {
  const authInstance = getAuthInstance()
  if (!authInstance) return Promise.resolve()
  return signOut(authInstance)
}

