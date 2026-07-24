/**
 * Tracks clicks on telephone links as GA4 `phone_click` events.
 *
 * A single delegated listener covers every current and future <a href="tel:">
 * element without delaying or cancelling the browser's normal dialing action.
 */
(function () {
  'use strict';

  document.addEventListener('click', function (event) {
    var target = event.target instanceof Element
      ? event.target
      : event.target.parentElement;
    var link = target && target.closest('a[href]');

    if (!link || !link.getAttribute('href').toLowerCase().startsWith('tel:')) {
      return;
    }

    // GA4 may be unavailable if analytics is blocked or has not initialized.
    if (typeof window.gtag !== 'function') {
      return;
    }

    window.gtag('event', 'phone_click', {
      phone_number: link.getAttribute('href').slice(4).trim(),
      link_text: link.textContent.trim().replace(/\s+/g, ' '),
      page_location: window.location.href,
      page_title: document.title
    });
  });
})();
