---
title: Resources
permalink: /resources/
---

{% assign resources = site.resources | sort: "date" | reverse %}
{% assign categories = site.resources | map: "category" | compact | uniq | sort %}
{% assign tags = site.resources | map: "tags" | join: "," | split: "," | uniq | sort %}

<section class="resources-page" aria-labelledby="resources-heading">
  <header class="resources-hero">
    <h1 class="resources-hero__title" id="resources-heading">Resources</h1>
    <p class="resources-hero__subtitle">
      Guides, writeups, and learning materials from our members to help you get started in cybersecurity.
    </p>
  </header>

  <form class="resource-filters" role="search" aria-label="Filter resources">
    <div class="resource-filters__field resource-filters__field--search">
      <label for="resource-search">Search resources</label>
      <input type="search" id="resource-search" name="q" placeholder="Try “linux”, “CTF” or “OSINT”…" autocomplete="off">
    </div>

    <div class="resource-filters__field">
      <label for="resource-category">Category</label>
      <select id="resource-category" name="category">
        <option value="">All categories</option>
        {% for category in categories %}
          <option value="{{ category | escape }}">{{ category }}</option>
        {% endfor %}
      </select>
    </div>

    <div class="resource-filters__field">
      <label for="resource-tag">Tag</label>
      <select id="resource-tag" name="tag">
        <option value="">All tags</option>
        {% for tag in tags %}
          <option value="{{ tag | escape }}">{{ tag }}</option>
        {% endfor %}
      </select>
    </div>

    <div class="resource-filters__field">
      <label for="resource-sort">Sort</label>
      <select id="resource-sort" name="sort">
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="title">Title (A–Z)</option>
      </select>
    </div>
  </form>

  <div class="resource-status">
    <p class="resource-status__count" aria-live="polite">{{ resources.size }} {% if resources.size == 1 %}entry{% else %}entries{% endif %} shown</p>
    <button type="button" class="resource-status__clear" hidden>Clear filters</button>
  </div>

  <ol class="resource-list">
    {% for resource in resources %}
      {% assign words = resource.content | number_of_words %}
      {% assign read_time = words | divided_by: 200 | at_least: 1 %}
      {% assign tag_text = resource.tags | join: ' ' %}
      <li class="resource"
          data-title="{{ resource.title | downcase | escape }}"
          data-date="{{ resource.date | date: '%Y-%m-%d' }}"
          data-category="{{ resource.category | escape }}"
          data-tags="{{ resource.tags | join: '|' | escape }}"
          data-search="{{ resource.title | append: ' ' | append: resource.description | append: ' ' | append: resource.category | append: ' ' | append: tag_text | downcase | escape }}">
        <h2 class="resource__title"><a href="{{ resource.url | relative_url }}">{{ resource.title }}</a></h2>
        {% if resource.description %}
          <p class="resource__desc">{{ resource.description }}</p>
        {% endif %}
        <p class="resource-meta">
          <time datetime="{{ resource.date | date: '%Y-%m-%d' }}">{{ resource.date | date: '%-d %b %Y' }}</time>
          {% if resource.category %}<span>{{ resource.category }}</span>{% endif %}
          <span>{{ read_time }} min read</span>
        </p>
      </li>
    {% endfor %}
  </ol>

  <p class="resource-empty" hidden>No resources match your filters.</p>
</section>

<script>
  (function () {
    var form = document.querySelector('.resource-filters');
    var list = document.querySelector('.resource-list');
    if (!form || !list) return;

    var search = form.elements.q;
    var category = form.elements.category;
    var tag = form.elements.tag;
    var sort = form.elements.sort;
    var count = document.querySelector('.resource-status__count');
    var clear = document.querySelector('.resource-status__clear');
    var empty = document.querySelector('.resource-empty');
    var items = Array.from(list.children);

    var comparators = {
      newest: function (a, b) { return b.dataset.date.localeCompare(a.dataset.date); },
      oldest: function (a, b) { return a.dataset.date.localeCompare(b.dataset.date); },
      title: function (a, b) { return a.dataset.title.localeCompare(b.dataset.title); }
    };

    function apply() {
      var terms = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
      var shown = 0;

      items.forEach(function (item) {
        var matches =
          terms.every(function (term) { return item.dataset.search.indexOf(term) !== -1; }) &&
          (!category.value || item.dataset.category === category.value) &&
          (!tag.value || item.dataset.tags.split('|').indexOf(tag.value) !== -1);
        item.hidden = !matches;
        if (matches) shown += 1;
      });

      items.slice().sort(comparators[sort.value] || comparators.newest).forEach(function (item) {
        list.appendChild(item);
      });

      count.textContent = shown + (shown === 1 ? ' entry' : ' entries') + ' shown';
      empty.hidden = shown > 0;
      clear.hidden = !(search.value || category.value || tag.value || sort.value !== 'newest');
      syncUrl();
    }

    // Keep the filters in the address bar so a filtered view can be shared
    function syncUrl() {
      var params = new URLSearchParams();
      if (search.value.trim()) params.set('q', search.value.trim());
      if (category.value) params.set('category', category.value);
      if (tag.value) params.set('tag', tag.value);
      if (sort.value !== 'newest') params.set('sort', sort.value);
      var query = params.toString();
      history.replaceState(null, '', location.pathname + (query ? '?' + query : ''));
    }

    function setSelect(select, value) {
      if (value && Array.from(select.options).some(function (o) { return o.value === value; })) {
        select.value = value;
      }
    }

    var params = new URLSearchParams(location.search);
    search.value = params.get('q') || '';
    setSelect(category, params.get('category'));
    setSelect(tag, params.get('tag'));
    setSelect(sort, params.get('sort'));

    form.addEventListener('input', apply);
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    clear.addEventListener('click', function () {
      form.reset();
      apply();
      search.focus();
    });

    apply();
  })();
</script>
