import { navigateTo, router } from './router/router.js';
import { setupLinkInterception } from './navigation.js';

window.addEventListener('popstate', () => {
  router()
});

setupLinkInterception();

router();

document.addEventListener ("DOMContentLoaded", () => {
  router()
})



