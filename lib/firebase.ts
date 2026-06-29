import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";
import { getRemoteConfig, fetchAndActivate, getValue } from "firebase/remote-config";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLaGqXByqp6YWU8BVm1qeSYx0PzA-PohQ",
  authDomain: "the-corporate-halwai.firebaseapp.com",
  projectId: "the-corporate-halwai",
  storageBucket: "the-corporate-halwai.firebasestorage.app",
  messagingSenderId: "331738723234",
  appId: "1:331738723234:web:c3528effe6526e341878fb",
  measurementId: "G-K9XG1469NJ"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Analytics (only supported in browser environments)
let analytics: any = null;
let remoteConfig: any = null;

if (typeof window !== "undefined") {
  isAnalyticsSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });

  remoteConfig = getRemoteConfig(app);
  
  // Set fetch interval to 1 hour (3600000ms) for production, or 0 for dev (if needed)
  remoteConfig.settings.minimumFetchIntervalMillis = 3600000;
}

export { app, analytics, remoteConfig, fetchAndActivate, getValue };
