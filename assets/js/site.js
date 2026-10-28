// Applies assets/js/release.js to the page. Without JavaScript the page still
// reads correctly: every download control starts in its 準備中 state.
(function () {
  'use strict';

  var release = window.FAIRY_RELEASE || {};
  var android = release.android || {};
  var ios = release.ios || {};
  var pages = release.pages || {};

  function httpsUrl(value, hostPattern) {
    if (typeof value !== 'string') return null;
    try {
      var url = new URL(value);
      if (url.protocol !== 'https:') return null;
      if (hostPattern && !hostPattern.test(url.hostname)) return null;
      return url.href;
    } catch (e) {
      return null;
    }
  }

  function each(selector, fn) {
    Array.prototype.forEach.call(document.querySelectorAll(selector), fn);
  }

  function setText(selector, text) {
    if (text === undefined || text === null) return;
    each(selector, function (el) { el.textContent = String(text); });
  }

  // A download control becomes a real link only when a URL is configured.
  function enable(selector, href, label) {
    each(selector, function (el) {
      el.setAttribute('href', href);
      el.removeAttribute('aria-disabled');
      el.classList.remove('is-pending');
      el.setAttribute('rel', 'noopener');
      var text = el.querySelector('[data-label]');
      if (text && label) text.textContent = label;
    });
  }

  // Release facts.
  setText('[data-android="versionName"]', android.versionName);
  setText('[data-android="versionCode"]', android.versionCode);
  setText('[data-android="minAndroid"]', android.minAndroid);
  setText('[data-android="fileName"]', android.fileName);
  setText('[data-android="fileSize"]', android.fileSize);
  setText('[data-android="apkSha256"]', android.apkSha256);
  setText('[data-android="certSha256"]', android.certSha256);
  setText('[data-ios="minIOS"]', ios.minIOS);

  // Android: the APK lives outside this site (its distribution is decided separately).
  var apk = httpsUrl(android.downloadUrl);
  if (apk) {
    enable('[data-download="android"]', apk, 'APK をダウンロード');
    each('[data-state="android-pending"]', function (el) { el.hidden = true; });
    each('[data-state="android-ready"]', function (el) { el.hidden = false; });
  }

  // iOS: only a real apps.apple.com link is accepted.
  var store = httpsUrl(ios.appStoreUrl, /^apps\.apple\.com$/);
  if (store) {
    enable('[data-download="ios"]', store, 'App Store で入手');
    each('[data-state="ios-pending"]', function (el) { el.hidden = true; });
    each('[data-state="ios-ready"]', function (el) { el.hidden = false; });
  }

  // Pending controls do nothing when pressed (they are links to their section).
  each('[data-download].is-pending', function (el) {
    el.addEventListener('click', function (event) {
      var target = el.getAttribute('data-pending-target');
      if (!target) return;
      event.preventDefault();
      var section = document.querySelector(target);
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Future pages appear in the navigation only when they exist.
  Object.keys(pages).forEach(function (key) {
    if (pages[key] === true) {
      each('[data-page="' + key + '"]', function (el) { el.hidden = false; });
    }
  });

  // Copy buttons for the SHA-256 values.
  each('[data-copy]', function (button) {
    button.addEventListener('click', function () {
      var source = document.querySelector(button.getAttribute('data-copy'));
      if (!source || !navigator.clipboard) return;
      navigator.clipboard.writeText(source.textContent.trim()).then(function () {
        var original = button.textContent;
        button.textContent = 'コピーしました';
        setTimeout(function () { button.textContent = original; }, 1600);
      }, function () { /* clipboard refused: the value stays selectable */ });
    });
  });

  // Mobile navigation.
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });
    each('#site-nav a', function (link) {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      });
    });
  }

  var year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
