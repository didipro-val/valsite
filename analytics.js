/* Optional audience measurement. Public site token, never an API credential. */
(() => {
  'use strict';
  const key = 'valmeo-analytics-consent-v1';
  const lifetime = 180 * 24 * 60 * 60 * 1000;
  let choice = null;
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (saved && ['accepted', 'denied'].includes(saved.value) &&
        saved.time <= Date.now() && Date.now() - saved.time < lifetime) choice = saved.value;
  } catch (_) { /* Storage may be unavailable; default remains off. */ }

  const style = document.createElement('style');
  style.textContent = `.audience-notice{position:fixed;bottom:16px;left:16px;right:16px;max-width:620px;z-index:10000;padding:20px;background:#fffaf2;color:#344638;border:1px solid #c7b8a2;border-radius:16px;box-shadow:0 6px 30px #26322526;font:15px/1.5 system-ui,sans-serif}.audience-notice h2{margin:0 0 8px;font:600 18px/1.3 system-ui,sans-serif}.audience-notice p{margin:0 0 12px}.audience-notice a{color:#805238;text-decoration:underline}.audience-actions{display:flex;flex-wrap:wrap;gap:10px}.audience-actions button{padding:11px 16px;border:1px solid #536b50;border-radius:24px;background:#fffaf2;color:#344638;font:600 14px/1.3 system-ui,sans-serif;cursor:pointer}.audience-actions button:focus-visible{outline:3px solid #a25838;outline-offset:3px}@media(max-width:480px){.audience-notice{bottom:10px;left:10px;right:10px;padding:16px}.audience-actions button{flex:1}}`;
  document.head.append(style);

  const status = document.getElementById('analytics-status');
  if (status) status.textContent = choice === 'accepted' ? 'Statistiques : acceptées dans ce navigateur.' : 'Statistiques : désactivées dans ce navigateur.';
  if (!choice) {
    const notice = document.createElement('section');
    notice.className = 'audience-notice';
    notice.setAttribute('aria-labelledby', 'audience-title');
    notice.innerHTML = '<h2 id="audience-title">Un petit coup de pouce à la boutique ?</h2><p>Avec votre accord, des statistiques sans cookies nous aident à comprendre les visites. Vous pouvez refuser et changer d’avis à tout moment. <a href="./cookies.html">En savoir plus</a></p><div class="audience-actions"><button type="button" data-audience-choice="accepted">Accepter</button><button type="button" data-audience-choice="denied">Refuser</button></div>';
    document.body.append(notice);
  }
  document.querySelectorAll('[data-audience-choice]').forEach(button => {
    button.addEventListener('click', () => {
      const value = button.dataset.audienceChoice;
      try {
        localStorage.setItem(key, JSON.stringify({ value, time: Date.now() }));
      } catch (_) {
        if (status) status.textContent = 'Votre navigateur empêche de mémoriser ce choix. Les statistiques restent désactivées.';
        document.querySelector('.audience-notice')?.remove();
        return;
      }
      // Reload also removes every listener installed by a previously accepted beacon.
      location.reload();
    });
  });
  if (choice !== 'accepted') return;
  const beacon = document.createElement('script');
  beacon.type = 'module';
  beacon.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  beacon.dataset.cfBeacon = JSON.stringify({token:'f9b309890d4a4ad8817b27a5237dfa91', spa:false});
  document.body.append(beacon);
})();
