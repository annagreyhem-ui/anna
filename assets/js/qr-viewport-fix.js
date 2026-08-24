/* iOS Safari (esp. iOS 26) bug: fixed/sticky bottom elements don't follow
   the toolbar as it hides/shows during scroll, leaving a gap where
   unmasked page content is revealed beneath the fixed foot-scrim / legal
   footer. We measure the live gap via visualViewport and push our fixed
   bottom elements down by that amount so they always reach the true
   bottom edge. No-op (gap stays 0) on browsers without the bug. */
(function () {
  if (!window.visualViewport) return;
  var vv = window.visualViewport;
  function sync() {
    var gap = window.innerHeight - vv.height - vv.offsetTop;
    document.documentElement.style.setProperty('--qr-toolbar-gap', Math.max(0, Math.round(gap)) + 'px');
  }
  vv.addEventListener('resize', sync);
  vv.addEventListener('scroll', sync);
  window.addEventListener('scroll', sync, { passive: true });
  sync();
})();
