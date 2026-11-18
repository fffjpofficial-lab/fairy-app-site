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

  // A download control is a real link when its URL is configured, and a
  // 準備中 link to its own section when not. index.html is written in the
  // state release.js gives (so it reads the same without JavaScript); this
  // applies release.js in both directions, so release.js stays the one place
  // that decides.
  function apply(kind, href, readyLabel) {
    each('[data-download="' + kind + '"]', function (el) {
      var text = el.querySelector('[data-label]');
      if (href) {
        el.setAttribute('href', href);
        el.classList.remove('is-pending');
        el.setAttribute('rel', 'noopener');
        if (text) text.textContent = readyLabel;
      } else {
        el.setAttribute('href', el.getAttribute('data-pending-target') || '#');
        el.classList.add('is-pending');
        el.removeAttribute('rel');
        if (text) text.textContent = '準備中';
      }
    });
    each('[data-state="' + kind + '-pending"]', function (el) { el.hidden = !!href; });
    each('[data-state="' + kind + '-ready"]', function (el) { el.hidden = !href; });
  }

  // Release facts.
  setText('[data-android="versionName"]', android.versionName);
  setText('[data-android="versionCode"]', android.versionCode);
  setText('[data-android="minAndroid"]', android.minAndroid);
  setText('[data-android="fileName"]', android.fileName);
  setText('[data-android="fileSize"]', android.fileSize);
  setText('[data-android="fileBytes"]', android.fileBytes);
  setText('[data-android="apkSha256"]', android.apkSha256);
  setText('[data-android="certSha256"]', android.certSha256);
  setText('[data-ios="minIOS"]', ios.minIOS);

  // Android: the APK lives outside this site (its distribution is decided separately).
  apply('android', httpsUrl(android.downloadUrl), 'ダウンロード');

  // iOS: only a real apps.apple.com link is accepted.
  apply('ios', httpsUrl(ios.appStoreUrl, /^apps\.apple\.com$/), 'App Store で入手');

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
