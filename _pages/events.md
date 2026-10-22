---
title: Events
permalink: /events/
---

<section class="events-page" aria-labelledby="events-heading">
  <header class="events-hero">
    <h1 class="events-hero__title" id="events-heading">Our Events</h1>
    <p class="events-hero__subtitle">
      The events that bring our community together to learn, compete, and connect.
    </p>
  </header>

  <div class="events-list">
    {% for event in site.data.events %}
      <article class="event" id="{{ event.id }}" aria-labelledby="{{ event.id }}-title">
        <div class="event__content">
          <h2 class="event__title" id="{{ event.id }}-title">{{ event.title }}</h2>
          {% assign paragraphs = event.description | split: "
" %}
          {% for paragraph in paragraphs %}
            {% assign text = paragraph | strip %}
            {% if text != "" %}<p class="event__desc">{{ text }}</p>{% endif %}
          {% endfor %}
        </div>

        {% assign images = event.images %}
        <div class="event__media"{% if images.size > 1 %} data-carousel{% endif %}>
          {% if images.size > 0 %}
            <div class="event__track" role="region" aria-label="{{ event.title }} photos"{% if images.size > 1 %} tabindex="0"{% endif %}>
              {% for image in images %}
                <img src="{{ image | relative_url }}" alt="{{ event.title }} photo {{ forloop.index }} of {{ images.size }}" class="event__image" loading="lazy" decoding="async">
              {% endfor %}
            </div>

            {% if images.size > 1 %}
              <button type="button" class="event__nav event__nav--prev" aria-label="Previous photo">&#8249;</button>
              <button type="button" class="event__nav event__nav--next" aria-label="Next photo">&#8250;</button>
              <div class="event__dots">
                {% for image in images %}
                  <button type="button" class="event__dot" aria-label="Show photo {{ forloop.index }}"></button>
                {% endfor %}
              </div>
            {% endif %}
          {% else %}
            <img src="{{ '/assets/images/ntu_sentinels_transparent.png' | relative_url }}" alt="" class="event__image event__image--placeholder" loading="lazy" decoding="async">
          {% endif %}
        </div>
      </article>
    {% endfor %}
  </div>
</section>

<script>
  (function () {
    var AUTOPLAY_MS = 5000;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function initCarousel(carousel) {
      var track = carousel.querySelector('.event__track');
      var slides = track.querySelectorAll('.event__image');
      var dots = carousel.querySelectorAll('.event__dot');
      var current = 0;
      var paused = false;
      var ticking = false;

      function goTo(i) {
        current = (i + slides.length) % slides.length;
        track.scrollTo({ left: current * track.clientWidth, behavior: reduceMotion ? 'auto' : 'smooth' });
        update();
      }

      function update() {
        dots.forEach(function (dot, i) {
          if (i === current) {
            dot.setAttribute('aria-current', 'true');
          } else {
            dot.removeAttribute('aria-current');
          }
        });
      }

      // Keep the dots in sync when the track is swiped or scrolled directly
      track.addEventListener('scroll', function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          ticking = false;
          current = Math.round(track.scrollLeft / track.clientWidth);
          update();
        });
      }, { passive: true });

      carousel.querySelector('.event__nav--prev').addEventListener('click', function () { goTo(current - 1); });
      carousel.querySelector('.event__nav--next').addEventListener('click', function () { goTo(current + 1); });
      dots.forEach(function (dot, i) {
        dot.addEventListener('click', function () { goTo(i); });
      });

      // Pause auto-advance while the viewer is looking at or using the carousel
      carousel.addEventListener('mouseenter', function () { paused = true; });
      carousel.addEventListener('mouseleave', function () { paused = false; });
      carousel.addEventListener('focusin', function () { paused = true; });
      carousel.addEventListener('focusout', function () { paused = false; });
      carousel.addEventListener('touchstart', function () { paused = true; }, { passive: true });

      if (!reduceMotion) {
        setInterval(function () {
          if (!paused && !document.hidden) goTo(current + 1);
        }, AUTOPLAY_MS);
      }

      update();
    }

    function init() {
      document.querySelectorAll('[data-carousel]').forEach(initCarousel);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();
</script>
