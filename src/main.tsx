import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Handle redirects from fallback.html
const handleRedirects = () => {
  // Check if we have a path in the URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const redirectPath = urlParams.get('path');

  if (redirectPath) {
    // Remove the query parameter
    urlParams.delete('path');
    const newUrl = window.location.pathname +
      (urlParams.toString() ? `?${urlParams.toString()}` : '') +
      window.location.hash;

    // Update the URL to the redirect path without reloading the page
    window.history.replaceState(null, '', redirectPath);
  }

  // Also check sessionStorage for backward compatibility
  const sessionRedirectPath = sessionStorage.getItem('redirectPath');
  if (sessionRedirectPath) {
    // Clear the redirect path from sessionStorage
    sessionStorage.removeItem('redirectPath');
    // Update the URL to the redirect path without reloading the page
    window.history.replaceState(null, '', sessionRedirectPath);
  }
};

// Run the redirect handler
handleRedirects();

createRoot(document.getElementById("root")!).render(<App />);
