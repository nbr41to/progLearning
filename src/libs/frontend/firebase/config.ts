import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_APP_MEASUREMENT_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps();
const auth = getAuth();
// const analytics = getAnalytics();

export { app, auth };

// const firebaseIsRunning = () => !!getApps().length;

// export const getApp = () => {
//   if (!firebaseIsRunning()) initializeApp(firebaseConfig);

//   return _getApp();
// };

// export const getAnalytics = () => {
//   if (!firebaseIsRunning()) getApp();

//   return _getAnalytics();
// };

// export function getAuth() {
//   if (!firebaseIsRunning()) getApp();

//   return _getAuth();
// }
