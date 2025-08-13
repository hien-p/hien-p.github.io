// Enhanced Windmill Theme - Custom JavaScript

(function() {
    'use strict';

    // ===== SMOOTH SCROLLING =====
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ===== ENHANCED SEARCH =====
    function initEnhancedSearch() {
        const searchInput = document.querySelector('.wm-search-form input');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const query = this.value.toLowerCase();
                const searchResults = document.querySelectorAll('.wm-search-result');
                
                searchResults.forEach(result => {
                    const title = result.querySelector('.wm-search-result-title').textContent.toLowerCase();
                    const content = result.querySelector('.wm-search-result-content').textContent.toLowerCase();
                    
                    if (title.includes(query) || content.includes(query)) {
                        result.style.display = 'block';
                        // Highlight matching text
                        highlightText(result, query);
                    } else {
                        result.style.display = 'none';
                    }
                });
            });
        }
    }

    function highlightText(element, query) {
        const titleElement = element.querySelector('.wm-search-result-title');
        const contentElement = element.querySelector('.wm-search-result-content');
        
        if (titleElement) {
            titleElement.innerHTML = titleElement.textContent.replace(
                new RegExp(query, 'gi'),
                match => `<mark style="background-color: #ffeb3b; padding: 0 2px;">${match}</mark>`
            );
        }
        
        if (contentElement) {
            contentElement.innerHTML = contentElement.textContent.replace(
                new RegExp(query, 'gi'),
                match => `<mark style="background-color: #ffeb3b; padding: 0 2px;">${match}</mark>`
            );
        }
    }

    // ===== DARK MODE TOGGLE =====
    function initDarkModeToggle() {
        // Remove any existing custom dark mode toggles to prevent duplicates
        const customToggles = document.querySelectorAll('.dark-mode-toggle');
        customToggles.forEach(toggle => {
            if (toggle.style.position === 'fixed') {
                toggle.remove();
            }
        });
        
        // Let the theme handle dark mode - don't create custom toggle
        console.log('Using theme dark mode toggle');
    }

    // ===== ENHANCED NAVIGATION =====
    function initEnhancedNavigation() {
        const navItems = document.querySelectorAll('.wm-nav-item');
        
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all items
                navItems.forEach(nav => nav.classList.remove('active'));
                // Add active class to clicked item
                this.classList.add('active');
            });
        });
        
        // Fix sidebar behavior for mobile
        initMobileSidebar();
    }
    
    function initMobileSidebar() {
        const navPane = document.querySelector('.wm-nav-pane');
        const contentPane = document.querySelector('.wm-content-pane');
        const hamburgerBtn = document.querySelector('.wm-top-bar .navbar-toggle, .wm-top-bar button[aria-label*="menu"], .wm-top-bar .hamburger');
        
        if (!navPane || !contentPane) return;
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'wm-nav-overlay';
        document.body.appendChild(overlay);
        
        // Handle hamburger button click
        if (hamburgerBtn) {
            hamburgerBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleSidebar();
            });
        }
        
        // Handle overlay click to close sidebar
        overlay.addEventListener('click', function() {
            closeSidebar();
        });
        
        // Handle escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeSidebar();
            }
        });
        
        function toggleSidebar() {
            const isOpen = navPane.classList.contains('wm-nav-pane-open');
            if (isOpen) {
                closeSidebar();
            } else {
                openSidebar();
            }
        }
        
        function openSidebar() {
            navPane.classList.add('wm-nav-pane-open');
            contentPane.classList.add('wm-content-pane-shifted');
            overlay.classList.add('wm-nav-overlay-visible');
            document.body.style.overflow = 'hidden';
        }
        
        function closeSidebar() {
            navPane.classList.remove('wm-nav-pane-open');
            contentPane.classList.remove('wm-content-pane-shifted');
            overlay.classList.remove('wm-nav-overlay-visible');
            document.body.style.overflow = '';
        }
        
        // Close sidebar when clicking on nav items (mobile)
        const navLinks = navPane.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    setTimeout(closeSidebar, 100);
                }
            });
        });
    }

    // ===== PROGRESS BAR =====
    function initProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: var(--primary-color);
            z-index: 1001;
            transition: width 0.1s ease;
        `;
        
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    // ===== ENHANCED CODE BLOCKS =====
    function initEnhancedCodeBlocks() {
        const codeBlocks = document.querySelectorAll('pre code');
        
        codeBlocks.forEach(block => {
            // Add copy button
            const copyButton = document.createElement('button');
            copyButton.innerHTML = '📋';
            copyButton.className = 'copy-code-btn';
            copyButton.style.cssText = `
                position: absolute;
                top: 8px;
                right: 8px;
                background: rgba(255, 255, 255, 0.9);
                border: 1px solid #ddd;
                border-radius: 4px;
                padding: 4px 8px;
                cursor: pointer;
                font-size: 12px;
                transition: all 0.2s ease;
            `;
            
            const preElement = block.parentElement;
            preElement.style.position = 'relative';
            preElement.appendChild(copyButton);
            
            copyButton.addEventListener('click', function() {
                navigator.clipboard.writeText(block.textContent).then(() => {
                    this.innerHTML = '✅';
                    setTimeout(() => {
                        this.innerHTML = '📋';
                    }, 2000);
                });
            });
        });
    }

    // ===== ENHANCED TABLES =====
    function initEnhancedTables() {
        const tables = document.querySelectorAll('table');
        
        tables.forEach(table => {
            // Make tables responsive
            const wrapper = document.createElement('div');
            wrapper.style.cssText = `
                overflow-x: auto;
                border-radius: var(--border-radius);
                box-shadow: var(--shadow-light);
            `;
            
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
            
            // Add hover effects
            const rows = table.querySelectorAll('tr');
            rows.forEach(row => {
                row.addEventListener('mouseenter', function() {
                    this.style.backgroundColor = 'var(--background-light)';
                });
                
                row.addEventListener('mouseleave', function() {
                    this.style.backgroundColor = '';
                });
            });
        });
    }

    // ===== ENHANCED ADMONITIONS =====
    function initEnhancedAdmonitions() {
        const admonitions = document.querySelectorAll('.admonition');
        
        admonitions.forEach(admonition => {
            // Add collapse functionality
            const title = admonition.querySelector('.admonition-title');
            if (title) {
                title.style.cursor = 'pointer';
                title.addEventListener('click', function() {
                    const content = admonition.querySelector('.admonition-content') || admonition;
                    const isCollapsed = content.style.display === 'none';
                    content.style.display = isCollapsed ? 'block' : 'none';
                    this.innerHTML = this.innerHTML.replace(
                        /[▼▲]/g, 
                        isCollapsed ? '▼' : '▲'
                    );
                });
            }
        });
    }

    // ===== LAZY LOADING FOR IMAGES =====
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    // ===== ENHANCED FOOTER =====
    function initEnhancedFooter() {
        const footer = document.querySelector('footer');
        if (footer) {
            const currentYear = new Date().getFullYear();
            const yearSpan = footer.querySelector('.current-year');
            if (yearSpan) {
                yearSpan.textContent = currentYear;
            }
        }
    }

    // ===== INITIALIZATION =====
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initAll);
        } else {
            initAll();
        }
    }

    function initAll() {
        initSmoothScrolling();
        initEnhancedSearch();
        initDarkModeToggle();
        initEnhancedNavigation();
        initProgressBar();
        initEnhancedCodeBlocks();
        initEnhancedTables();
        initEnhancedAdmonitions();
        initLazyLoading();
        initEnhancedFooter();
        
        // Add CSS for dark mode
        const darkModeCSS = `
            body.dark-mode {
                --text-primary: #ffffff;
                --text-secondary: #b0b0b0;
                --background-light: #121212;
                --background-dark: #1e1e1e;
                --surface-color: #1e1e1e;
                --border-color: #333333;
            }
            
            body.dark-mode {
                background-color: var(--background-light);
                color: var(--text-primary);
            }
            
            body.dark-mode .wm-page-content {
                background: var(--surface-color);
            }
            
            body.dark-mode pre {
                background: #2d2d2d;
                border-color: var(--border-color);
            }
            
            body.dark-mode code {
                background: #3d3d3d;
                color: #ff6b6b;
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = darkModeCSS;
        document.head.appendChild(style);
    }

    // Initialize everything
    init();

})();
