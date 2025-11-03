// cars-filter.js
// Optimized filter/search logic for cars gallery

(function () {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  function debounce(fn, delay = 300) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(null, args), delay);
    };
  }

  function parsePrice(str) {
    if (typeof str === 'number') return str;
    if (!str) return 0;
    return parseFloat(String(str).replace(/[^0-9.]/g, '')) || 0;
  }

  function getAllCards() {
    return $$('.car-item');
  }

  function applyFilters() {
    const searchQuery = $('#search-input').value.trim().toLowerCase();
    const brandFilter = $('#brand-select').value.toLowerCase();
    const minPrice = parsePrice($('#min-price').value);
    const maxPrice = parsePrice($('#max-price').value);
    const sortBy = $('#sort-select').value;

    const cards = getAllCards();
    let matchedCount = 0;

    // Apply filters to each card
    cards.forEach(card => {
      const carName = (card.dataset.name || '').toLowerCase();
      const carBrand = (card.dataset.brand || '').toLowerCase();
      const carPrice = parsePrice(card.dataset.price);

      let isVisible = true;

      // Filter 1: Search (match car name only) - flexible matching
      if (searchQuery) {
        isVisible = carName.includes(searchQuery);
      }

      // Filter 2: Brand dropdown
      if (isVisible && brandFilter) {
        isVisible = carBrand === brandFilter;
      }

      // Filter 3: Min price
      if (isVisible && minPrice > 0) {
        isVisible = carPrice >= minPrice;
      }

      // Filter 4: Max price
      if (isVisible && maxPrice > 0) {
        isVisible = carPrice <= maxPrice;
      }

      card.style.display = isVisible ? '' : 'none';
      if (isVisible) matchedCount++;
    });

    // Debug info
    if (searchQuery) {
      console.log(`Search: "${searchQuery}" → Found ${matchedCount} cars`);
    }

    // Apply sorting
    if (sortBy && sortBy !== 'default') {
      const gallery = document.querySelector('.cars-gallery');
      if (gallery) {
        const visibleCards = cards.filter(c => c.style.display !== 'none');
        const sortedCards = visibleCards.slice().sort((a, b) => {
          const priceA = parsePrice(a.dataset.price);
          const priceB = parsePrice(b.dataset.price);
          const nameA = (a.dataset.name || '').toLowerCase();
          const nameB = (b.dataset.name || '').toLowerCase();

          if (sortBy === 'price-asc') return priceA - priceB;
          if (sortBy === 'price-desc') return priceB - priceA;
          if (sortBy === 'name-asc') return nameA.localeCompare(nameB);
          if (sortBy === 'name-desc') return nameB.localeCompare(nameA);
          return 0;
        });

        sortedCards.forEach(node => gallery.appendChild(node));
      }
    }
  }

  function clearFilters() {
    $('#search-input').value = '';
    $('#brand-select').value = '';
    $('#min-price').value = '';
    $('#max-price').value = '';
    $('#sort-select').value = 'default';
    applyFilters();
  }

  document.addEventListener('DOMContentLoaded', () => {
    const searchInput = $('#search-input');
    if (!searchInput) return;

    const debouncedFilter = debounce(applyFilters, 250);
    const debouncedPriceFilter = debounce(applyFilters, 350);

    // Search input
    searchInput.addEventListener('input', debouncedFilter);

    // Brand dropdown - auto clear search when selecting brand
    $('#brand-select').addEventListener('change', () => {
      const brand = $('#brand-select').value;
      if (brand) {
        $('#search-input').value = '';
      }
      applyFilters();
    });

    // Price filters
    $('#min-price').addEventListener('input', debouncedPriceFilter);
    $('#max-price').addEventListener('input', debouncedPriceFilter);

    // Sort
    $('#sort-select').addEventListener('change', applyFilters);

    // Clear button
    $('#clear-filters').addEventListener('click', clearFilters);

    // Populate brand options dynamically
    const brands = new Set();
    getAllCards().forEach(card => {
      if (card.dataset.brand) {
        brands.add(card.dataset.brand.toLowerCase());
      }
    });

    const brandSelect = $('#brand-select');
    if (brandSelect && brandSelect.options.length <= 1) {
      Array.from(brands)
        .sort()
        .forEach(b => {
          const opt = document.createElement('option');
          opt.value = b;
          opt.textContent = b.charAt(0).toUpperCase() + b.slice(1);
          brandSelect.appendChild(opt);
        });
    }

    // Reset when clicking a car card to navigate
    getAllCards().forEach(card => {
      card.addEventListener('click', () => {
        clearFilters();
      });
    });

    // Reset on page show (back button)
    window.addEventListener('pageshow', (e) => {
      if (e.persisted) {
        clearFilters();
      }
    });

    // Initial render
    applyFilters();
  });

})();
