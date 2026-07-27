// ABOUTME: Powers the site-wide search dialog and renders the local post index.
// ABOUTME: Manages keyboard focus, modal state, and accessible result updates.
(function() {
  let searchData;
  let searchLoadFailed = false;
  let lastFocusedElement;
  let previousBodyOverflow = '';

  const pageContainer = document.querySelector('.container');
  const searchModal = document.getElementById('search-modal');
  const searchTriggers = document.querySelectorAll('[data-search-trigger]');
  const searchClose = document.getElementById('search-close');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const backdrop = document.querySelector('.search-modal-backdrop');

  if (!searchModal || !searchClose || !searchInput || !searchResults) {
    return;
  }

  function showStatus(message) {
    const status = document.createElement('p');
    status.textContent = message;
    searchResults.replaceChildren(status);
  }

  fetch('/search.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Search index returned ${response.status}`);
      }

      return response.json();
    })
    .then(data => {
      searchData = data;

      if (searchModal.classList.contains('active') && searchInput.value.length >= 2) {
        search(searchInput.value);
      }
    })
    .catch(error => {
      searchLoadFailed = true;
      console.error('Error loading search data:', error);
    });

  function setTriggerState(expanded) {
    searchTriggers.forEach(trigger => {
      trigger.setAttribute('aria-expanded', String(expanded));
    });
  }

  function openModal(event) {
    lastFocusedElement = event ? event.currentTarget : document.activeElement;
    previousBodyOverflow = document.body.style.overflow;
    searchModal.classList.add('active');
    searchModal.setAttribute('aria-hidden', 'false');
    setTriggerState(true);
    document.body.style.overflow = 'hidden';

    if (pageContainer) {
      pageContainer.inert = true;
    }

    if (searchLoadFailed) {
      showStatus('Search is temporarily unavailable.');
    }

    window.requestAnimationFrame(() => {
      searchInput.focus();
    });
  }

  function closeModal() {
    searchModal.classList.remove('active');
    searchModal.setAttribute('aria-hidden', 'true');
    setTriggerState(false);
    document.body.style.overflow = previousBodyOverflow;
    searchInput.value = '';
    searchResults.replaceChildren();

    if (pageContainer) {
      pageContainer.inert = false;
    }

    if (lastFocusedElement && document.contains(lastFocusedElement)) {
      lastFocusedElement.focus();
    }
  }

  function displayResults(results) {
    searchResults.replaceChildren();

    if (results.length === 0) {
      showStatus('No results found.');
      return;
    }

    const grid = document.createElement('div');
    grid.className = 'content-grid';

    results.forEach(item => {
      const excerpt = item.content.length > 150 ?
        `${item.content.substring(0, 150)}…` :
        item.content;
      const tags = Array.isArray(item.tags) ? item.tags.join(', ') : item.tags;
      const article = document.createElement('article');
      const link = document.createElement('a');
      const cardContent = document.createElement('div');
      const title = document.createElement('h3');
      const summary = document.createElement('p');
      const meta = document.createElement('div');

      article.className = 'content-card';
      link.href = item.url;
      cardContent.className = 'card-content';
      title.className = 'card-title';
      title.textContent = item.title;
      summary.className = 'search-excerpt';
      summary.textContent = excerpt;
      meta.className = 'search-meta';

      const date = new Date(item.date);
      if (!Number.isNaN(date.getTime())) {
        const dateElement = document.createElement('span');
        dateElement.className = 'search-date';
        dateElement.textContent = date.toLocaleDateString();
        meta.appendChild(dateElement);
      }

      if (tags) {
        const tagsElement = document.createElement('span');
        tagsElement.className = 'search-tags';
        tagsElement.textContent = tags;
        meta.appendChild(tagsElement);
      }

      cardContent.append(title, summary, meta);
      link.appendChild(cardContent);
      article.appendChild(link);
      grid.appendChild(article);
    });

    searchResults.appendChild(grid);
  }

  function search(query) {
    if (query.length < 2) {
      searchResults.replaceChildren();
      return;
    }

    if (searchLoadFailed) {
      showStatus('Search is temporarily unavailable.');
      return;
    }

    if (!searchData) {
      showStatus('Loading search…');
      return;
    }

    const normalizedQuery = query.toLocaleLowerCase();
    const results = searchData.filter(item => {
      const searchText = [
        item.title,
        item.content,
        Array.isArray(item.tags) ? item.tags.join(' ') : item.tags
      ].join(' ').toLocaleLowerCase();

      return searchText.includes(normalizedQuery);
    });

    displayResults(results);
  }

  function trapFocus(event) {
    const focusableElements = Array.from(
      searchModal.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter(element => element.offsetParent !== null);

    if (focusableElements.length === 0) {
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  searchTriggers.forEach(trigger => {
    trigger.addEventListener('click', openModal);
  });

  searchClose.addEventListener('click', closeModal);

  if (backdrop) {
    backdrop.addEventListener('click', closeModal);
  }

  searchInput.addEventListener('input', event => {
    search(event.target.value);
  });

  document.addEventListener('keydown', event => {
    if (!searchModal.classList.contains('active')) {
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
    } else if (event.key === 'Tab') {
      trapFocus(event);
    }
  });
})();
