import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Handle any redirect path stored in sessionStorage
// This will be used when a user directly navigates to a route
const redirectPath = sessionStorage.getItem('redirectPath');
if (redirectPath) {
  // Clear the redirect path from sessionStorage
  sessionStorage.removeItem('redirectPath');
  // Update the URL to the redirect path without reloading the page
  window.history.replaceState(null, '', redirectPath);
}

createRoot(document.getElementById("root")!).render(<App />);
