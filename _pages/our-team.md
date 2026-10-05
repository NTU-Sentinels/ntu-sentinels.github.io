---
title: Our Team
permalink: /our-team/
---

<div class="team-page" aria-labelledby="team-heading">
  <!-- Hero Section -->
  <header class="team-hero">
    <h1 class="team-hero__title" id="team-heading">We are the people who make up NTU Sentinels</h1>
    <p class="team-hero__subtitle">
      Meet the students driving cybersecurity excellence, technical training, CTF competitions, and industry collaborations at Nanyang Technological University.
    </p>

    <!-- Subcommittee Quick Navigation -->
    <nav class="team-nav" aria-label="Subcommittees navigation">
      <a href="#executive" class="team-nav__pill team-nav__pill--executive">Executive Committee</a>
      <a href="#technical" class="team-nav__pill team-nav__pill--technical">Technical &amp; Training</a>
      <a href="#events" class="team-nav__pill team-nav__pill--events">Events</a>
      <a href="#liaison" class="team-nav__pill team-nav__pill--liaison">External Liaison &amp; Operations</a>
      <a href="#publicity" class="team-nav__pill team-nav__pill--publicity">Publicity</a>
    </nav>
  </header>

  <!-- Subcommittee Sections (Bifurcation) -->
  {% assign sections = "executive|Executive Committee|Leadership & Club Direction;;technical|Technical & Training|CTF Training, Workshops & Infrastructure;;events|Events|Club Activities, Hackathons & Socials;;liaison|External Liaison & Operations|Industry Partnerships, Sponsorships & Club Admin;;publicity|Publicity|Brand Presence, Social Media & Media Coverage" | split: ";;" %}

  {% for sec in sections %}
    {% assign parts = sec | split: "|" %}
    {% assign sec_key = parts[0] %}
    {% assign sec_title = parts[1] %}
    {% assign sec_desc = parts[2] %}
    {% assign members = site.data.team[sec_key] %}

    <section class="team-section team-section--{{ sec_key }}" id="{{ sec_key }}">
      <div class="team-section__header">
        <div class="team-section__header-main">
          <div class="team-section__pill-group">
            <span class="team-section__pill team-section__pill--{{ sec_key }}">{{ sec_title }}</span>
            <span class="team-section__count">{{ members.size }} members</span>
          </div>
          <h2 class="team-section__title">{{ sec_title }}</h2>
        </div>
        <p class="team-section__desc">{{ sec_desc }}</p>
      </div>

      <div class="team-grid">
        {% for member in members %}
          <article class="team-member team-member--{{ sec_key }}">
            <div class="team-member__photo-wrap">
              <img src="{{ member.image | relative_url }}" alt="{{ member.name }}" class="team-member__photo" loading="lazy" decoding="async">
            </div>

            <div class="team-member__content">
              <h3 class="team-member__name">{{ member.name }}</h3>
              <p class="team-member__role">{{ member.role }}</p>

              {% if member.course and member.course != "" %}
                <span class="team-member__course">{{ member.course }}</span>
              {% endif %}

              {% if member.tagline and member.tagline != "" %}
                <p class="team-member__tagline">“{{ member.tagline }}”</p>
              {% endif %}

              {% if member.links.size > 0 %}
                <div class="team-member__socials">
                  {% for link in member.links %}
                    <a href="{{ link.url }}" class="team-member__social-btn team-member__social-btn--{{ link.type }}" target="_blank" rel="noopener noreferrer" aria-label="{{ member.name }}'s {{ link.label }}" title="{{ link.label }}">
                      {% if link.type == 'linkedin' %}
                        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                      {% elsif link.type == 'github' %}
                        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                      {% else %}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                      {% endif %}
                    </a>
                  {% endfor %}
                </div>
              {% endif %}
            </div>
          </article>
        {% endfor %}
      </div>
    </section>
  {% endfor %}
</div>

<script>
  (function () {
    function initTeamSmoothScroll() {
      var pills = document.querySelectorAll('.team-nav__pill');
      pills.forEach(function (link) {
        var href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          link.setAttribute('data-target', href.substring(1));
          link.style.cursor = 'pointer';
        }
        link.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          var targetId = this.getAttribute('data-target');
          var target = document.getElementById(targetId);
          if (!target) return false;

          var masthead = document.querySelector('.masthead');
          var NAV_H = (masthead ? masthead.offsetHeight : 72) + 24;
          var DURATION = 600;
          var startY = window.scrollY;
          var rawTop = target.getBoundingClientRect().top + window.scrollY;
          var endY = Math.max(0, rawTop - NAV_H);
          endY = Math.min(endY, document.body.scrollHeight - window.innerHeight);

          if (Math.abs(endY - startY) < 2) return false;

          var t0 = null;
          function step(ts) {
            if (t0 === null) t0 = ts;
            var progress = Math.min((ts - t0) / DURATION, 1);
            var ease = progress < 0.5
              ? 4 * progress * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            window.scrollTo(0, Math.round(startY + (endY - startY) * ease));
            if (progress < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          return false;
        });
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initTeamSmoothScroll);
    } else {
      initTeamSmoothScroll();
    }
  })();
</script>
