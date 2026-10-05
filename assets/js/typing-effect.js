(function () {
  'use strict';

  function initTyping() {
    var heroBody = document.querySelector('.home-hero__body');
    if (!heroBody) return;

    var paragraphs = Array.from(heroBody.querySelectorAll('p'));
    if (!paragraphs.length) return;

    // Respect user preference for reduced motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    var items = paragraphs.map(function (p) {
      var fullText = p.textContent.trim().replace(/\s+/g, ' ');
      p.innerHTML = '';

      var textSpan = document.createElement('span');
      textSpan.className = 'typing-text';
      textSpan.setAttribute('aria-hidden', 'true');

      var cursorSpan = document.createElement('span');
      cursorSpan.className = 'typing-cursor';
      cursorSpan.setAttribute('aria-hidden', 'true');

      var srOnlySpan = document.createElement('span');
      srOnlySpan.className = 'sr-only';
      srOnlySpan.textContent = fullText;

      p.appendChild(textSpan);
      p.appendChild(cursorSpan);
      p.appendChild(srOnlySpan);

      return {
        p: p,
        fullText: fullText,
        textSpan: textSpan,
        cursorSpan: cursorSpan,
        currentIndex: 0,
        isFinished: false,
        nextCharTime: 0
      };
    });

    var animationId = null;
    var isComplete = false;

    function skipAll() {
      if (isComplete) return;
      isComplete = true;
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      items.forEach(function (item) {
        item.currentIndex = item.fullText.length;
        item.textSpan.textContent = item.fullText;
        item.isFinished = true;
        item.cursorSpan.classList.add('is-done');
        item.cursorSpan.style.display = 'none';
      });
    }

    // Allow user to click anywhere on the text block to instantly finish typing
    heroBody.addEventListener('click', skipAll, { once: true });

    // Allow pressing Space or Escape to skip typing
    window.addEventListener(
      'keydown',
      function (e) {
        if (e.key === 'Escape' || (e.key === ' ' && document.activeElement === document.body)) {
          skipAll();
        }
      },
      { once: true }
    );

    // Initial short pause before simultaneous stream starts
    var startTime = performance.now() + 260;
    items.forEach(function (item) {
      item.nextCharTime = startTime;
    });

    function tick(now) {
      if (isComplete) return;

      var allDone = true;

      items.forEach(function (item) {
        if (item.isFinished) return;
        allDone = false;

        if (now >= item.nextCharTime) {
          if (item.currentIndex < item.fullText.length) {
            var char = item.fullText[item.currentIndex];
            item.currentIndex += 1;
            item.textSpan.textContent = item.fullText.slice(0, item.currentIndex);

            // Fast terminal stream cadence (14-22ms per char)
            var charDelay = 14 + Math.random() * 8;
            if (char === '.' || char === '!' || char === '?') {
              charDelay += 60; // subtle pause at end of sentences
            } else if (char === ',') {
              charDelay += 30; // micro pause at commas
            }

            item.nextCharTime = now + charDelay;
          } else {
            item.isFinished = true;
            item.cursorSpan.classList.add('is-done');
            item.cursorSpan.remove();
          }
        }
      });

      if (!allDone) {
        animationId = requestAnimationFrame(tick);
      } else {
        isComplete = true;
      }
    }

    animationId = requestAnimationFrame(tick);
  }

  var started = false;
  function safeInit() {
    if (started) return;
    started = true;
    initTyping();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(safeInit);
        setTimeout(safeInit, 400);
      } else {
        safeInit();
      }
    });
  } else {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(safeInit);
      setTimeout(safeInit, 400);
    } else {
      safeInit();
    }
  }
})();
