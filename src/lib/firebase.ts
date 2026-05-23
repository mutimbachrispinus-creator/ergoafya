import { initializeApp, getApps, getApp } from 'firebase/app'
// @ts-ignore
import { getFirestore } from 'firebase/firestore'
// @ts-ignore
import { getStorage } from 'firebase/storage'

export function getDb() {
  const firebaseConfig = {
    apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
    authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'paav-d67cb.firebaseapp.com',
    projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'paav-d67cb',
    storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'paav-d67cb.appspot.com',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
    appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  }

  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'your_key') {
    throw new Error('Firebase Client SDK is missing the API Key. Please add NEXT_PUBLIC_FIREBASE_API_KEY to Cloudflare secrets.')
  }

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
  return getFirestore(app)
}

export function getAppStorage() {
  const app = getApps().length ? getApp() : initializeApp({ projectId: 'paav-d67cb' })
  return getStorage(app)
}
