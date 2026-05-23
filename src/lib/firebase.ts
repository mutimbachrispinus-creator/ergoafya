import { initializeApp, getApps, getApp } from 'firebase/app'
// @ts-ignore
import { getFirestore } from 'firebase/firestore/lite'
// @ts-ignore
import { getStorage } from 'firebase/storage'
import { env } from './env'

export function getDb() {
  const firebaseConfig = {
    apiKey:            env('NEXT_PUBLIC_FIREBASE_API_KEY', 'next_public_firebase_api_key', 'apiKey'),
    authDomain:        env('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', 'next_public_firebase_auth_domain', 'authDomain') || 'paav-d67cb.firebaseapp.com',
    projectId:         env('NEXT_PUBLIC_FIREBASE_PROJECT_ID', 'next_public_firebase_project_id', 'projectId', 'project_id') || 'paav-d67cb',
    storageBucket:     env('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET', 'next_public_firebase_storage_bucket', 'storageBucket') || 'paav-d67cb.appspot.com',
    messagingSenderId: env('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID', 'next_public_firebase_messaging_sender_id', 'messagingSenderId'),
    appId:             env('NEXT_PUBLIC_FIREBASE_APP_ID', 'next_public_firebase_app_id', 'appId'),
  }

  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'your_key') {
    throw new Error('Firebase Client SDK is missing the API Key. Please add NEXT_PUBLIC_FIREBASE_API_KEY or next_public_firebase_api_key to Cloudflare secrets.')
  }

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
  return getFirestore(app)
}

export function getAppStorage() {
  const app = getApps().length ? getApp() : initializeApp({ projectId: 'paav-d67cb' })
  return getStorage(app)
}
