---
layout: default
title: Search
---

# Search

<div class="search-container">
  <input type="text" id="search-input" placeholder="Search posts..." />
  <div id="search-results"></div>
</div>

<script>
(function() {
  let searchData;
  
  // Fetch search data
  fetch('/search.json')
    .then(response => response.json())
    .then(data => {
      searchData = data;
    });
  
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  
  function displayResults(results) {
    if (results.length === 0) {
      searchResults.innerHTML = '<p>No results found.</p>';
      return;
    }
    
    let html = '<div class="content-grid">';
    results.forEach(item => {
      html += `
        <article class="content-card">
          <a href="${item.url}">
            <div class="card-content">
              <h3>${item.title}</h3>
              <p class="search-excerpt">${item.content.substring(0, 150)}...</p>
              <div class="search-meta">
                <span class="search-date">${new Date(item.date).toLocaleDateString()}</span>
                ${item.tags ? `<span class="search-tags">${item.tags}</span>` : ''}
              </div>
            </div>
          </a>
        </article>
      `;
    });
    html += '</div>';
    searchResults.innerHTML = html;
  }
  
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
  
  searchInput.addEventListener('input', (e) => {
    search(e.target.value);
  });
})();
</script>