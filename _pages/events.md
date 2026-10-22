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

        <div class="event__media">
          {% if event.image and event.image != "" %}
            <img src="{{ event.image | relative_url }}" alt="{{ event.title }}" class="event__image" loading="lazy" decoding="async">
          {% else %}
            <img src="{{ '/assets/images/ntu_sentinels_transparent.png' | relative_url }}" alt="" class="event__image event__image--placeholder" loading="lazy" decoding="async">
          {% endif %}
        </div>
      </article>
    {% endfor %}
  </div>
</section>
