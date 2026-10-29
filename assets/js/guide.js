// 使い方ガイド: tapping a screenshot shows it larger. No library; the page reads fine without it.
(function () {
  'use strict';
  var dialog = null;

  function close() { if (dialog && dialog.open) dialog.close(); }

  function open(frame, label) {
    if (!dialog) {
      dialog = document.createElement('dialog');
      dialog.className = 'lightbox';
      dialog.setAttribute('aria-label', '拡大した画像');
      dialog.innerHTML = '<div class="lightbox-inner"><button class="lightbox-close" type="button" aria-label="閉じる">×</button><div class="lightbox-body"></div></div>';
      dialog.addEventListener('click', function (event) {
        // A tap outside the picture, or on the close button, closes it.
        if (event.target === dialog || event.target.closest('.lightbox-close')) close();
      });
      document.body.appendChild(dialog);
    }
    var body = dialog.querySelector('.lightbox-body');
    body.innerHTML = '';
    var copy = frame.cloneNode(true);
    var img = copy.querySelector('img');
    if (img) {
      img.removeAttribute('loading');
      img.alt = label || img.alt;
      // Size the frame from the picture's own proportions so it fits the screen and the pink
      // marks (placed in % of the frame) stay on the same spot of the picture.
      var w = Number(img.getAttribute('width')), h = Number(img.getAttribute('height'));
      if (w > 0 && h > 0) copy.style.width = 'min(88vw, 440px, calc(86vh * ' + (w / h).toFixed(4) + '))';
    }
    body.appendChild(copy);
    if (typeof dialog.showModal === 'function') dialog.showModal();
  }

  Array.prototype.forEach.call(document.querySelectorAll('.zoom'), function (button) {
    button.addEventListener('click', function () {
      var frame = button.querySelector('.shot-frame');
      if (frame) open(frame, (button.getAttribute('aria-label') || '').replace(/^画像を拡大: /, ''));
    });
  });
})();
