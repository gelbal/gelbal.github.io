(function() {
  let searchData;
  
  // DOM elements
  const searchModal = document.getElementById('search-modal');
  const searchToggle = document.getElementById('search-toggle');
  const searchClose = document.getElementById('search-close');
  const searchInput = document.getElementById('search-input');
  const bottomSearchInput = document.getElementById('bottom-search-input');
  const searchResults = document.getElementById('search-results');
  const backdrop = document.querySelector('.search-modal-backdrop');
  
  // Fetch search data
  fetch('/search.json')
    .then(response => response.json())
    .then(data => {
      searchData = data;
    })
    .catch(error => {
      console.error('Error loading search data:', error);
    });
  
  // Open modal
  function openModal() {
    searchModal.classList.add('active');
    searchModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // Focus the input after a short delay to ensure modal is visible
    setTimeout(() => {
      searchInput.focus();
    }, 100);
  }
  
  // Close modal
  function closeModal() {
    searchModal.classList.remove('active');
    searchModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    searchInput.value = '';
    searchResults.innerHTML = '';
  }
  
  // Display search results
  function displayResults(results) {
    if (results.length === 0) {
      searchResults.innerHTML = '<p>No results found.</p>';
      return;
    }
    
    let html = '<div class=\"content-grid\">';
    results.forEach(item => {
      const excerpt = item.content.length > 150 ? 
        item.content.substring(0, 150) + '...' : 
        item.content;
      
      html += `
        <article class=\"content-card\">
          <a href=\"${item.url}\">
            <div class=\"card-content\">
              <h3>${item.title}</h3>
              <p class=\"search-excerpt\">${excerpt}</p>
              <div class=\"search-meta\">
                <span class=\"search-date\">${new Date(item.date).toLocaleDateString()}</span>
                ${item.tags ? `<span class=\"search-tags\">${item.tags}</span>` : ''}
              </div>
            </div>
          </a>
        </article>
      `;
    });
    html += '</div>';
    searchResults.innerHTML = html;
  }
  
  // Search function
  function search(query) {
    if (!searchData || query.length < 2) {
      searchResults.innerHTML = '';
      return;
    }
    
    const results = searchData.filter(item => {
      const searchText = (item.title + ' ' + item.content + ' ' + item.tags).toLowerCase();
      return searchText.includes(query.toLowerCase());
    });
    
    displayResults(results);
  }
  
  // Event listeners
  if (searchToggle) {
    searchToggle.addEventListener('click', openModal);
  }
  
  if (searchClose) {
    searchClose.addEventListener('click', closeModal);
  }
  
  if (backdrop) {
    backdrop.addEventListener('click', closeModal);
  }
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      search(e.target.value);
    });
  }
  
  if (bottomSearchInput) {
    bottomSearchInput.addEventListener('click', openModal);
    bottomSearchInput.addEventListener('focus', openModal);
  }
  
  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchModal.classList.contains('active')) {
      closeModal();
    }
  });
})();