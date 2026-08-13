import { router } from './router/router.js';
import { setupLinkInterception } from './navigation.js';



setupLinkInterception();

router();

window.addEventListener('popstate', () => {
  router(); 
});

document.addEventListener("DOMContentLoaded"), () => {
  router();
}