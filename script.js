


const divInstall = document.getElementById('installContainer');
const butInstall = document.getElementById('butInstall');

/* Put code here */

//1
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  console.log('👍', 'beforeinstallprompt', event);
  window.deferredPrompt = event;
  divInstall.classList.toggle('hidden', false);
});

//2
butInstall.addEventListener('click', async () => {
  console.log('👍', 'butInstall-clicked');
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    
    return;
  }
  
  promptEvent.prompt();
  
  const result = await promptEvent.userChoice;
  console.log('👍', 'userChoice', result);
 
  window.deferredPrompt = null;
 
  divInstall.classList.toggle('hidden', true);
});

//3
window.addEventListener('appinstalled', (event) => {
  console.log('👍', 'appinstalled', event);
  window.deferredPrompt = null;
});



/* Only register a service worker if it's supported */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}

/**
 * Warn the page must be served over HTTPS
 * The `beforeinstallprompt` event won't fire if the page is served over HTTP.
 * Installability requires a service worker with a fetch event handler, and
 * if the page isn't served over HTTPS, the service worker won't load.
 */
if (window.location.protocol === 'http:') {
  const requireHTTPS = document.getElementById('requireHTTPS');
  const link = requireHTTPS.querySelector('a');
  link.href = window.location.href.replace('http://', 'https://');
  requireHTTPS.classList.remove('hidden');
}