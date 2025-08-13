// Custom JavaScript for Table of Contents hierarchy
console.log('=== TOC SCRIPT LOADED ===');

document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DOM CONTENT LOADED ===');
    
    // Function to add heading level classes to TOC items
    function addTocLevelClasses() {
        const tocItems = document.querySelectorAll('.wm-page-toc .wm-toc-li');
        console.log('Found TOC items:', tocItems.length);
        
        if (tocItems.length === 0) {
            console.log('No TOC items found, trying alternative selector...');
            const altTocItems = document.querySelectorAll('.wm-page-toc li');
            console.log('Alternative selector found:', altTocItems.length, 'items');
        }
        
        tocItems.forEach(function(item, index) {
            const link = item.querySelector('a');
            if (link) {
                const text = link.textContent.trim();
                console.log(`Item ${index}: "${text}"`);
                
                // Analyze heading level based on URL hash pattern and text content
                let level = 1; // Default level
                
                // Get the href to analyze the heading level
                const href = link.getAttribute('href');
                const lowerText = text.toLowerCase();
                
                console.log(`  Analyzing: "${text}" with href: ${href}`);
                
                // Try to find the actual heading element in the iframe
                if (href && href.includes('#')) {
                    const hash = href.split('#')[1];
                    console.log(`  Hash found: ${hash}`);
                    
                    // Try to find heading in iframe content
                    const iframe = document.querySelector('.wm-article');
                    if (iframe && iframe.contentDocument) {
                        const headingElement = iframe.contentDocument.querySelector(`[id="${hash}"]`) || 
                                             iframe.contentDocument.querySelector(`[name="${hash}"]`);
                        
                        if (headingElement) {
                            const tagName = headingElement.tagName.toLowerCase();
                            if (tagName === 'h1') level = 1;
                            else if (tagName === 'h2') level = 2;
                            else if (tagName === 'h3') level = 3;
                            else if (tagName === 'h4') level = 4;
                            else if (tagName === 'h5') level = 5;
                            else if (tagName === 'h6') level = 6;
                            
                            console.log(`  Found heading element: ${tagName} -> level ${level}`);
                        } else {
                            console.log(`  No heading element found for hash: ${hash}`);
                            // Fallback to text analysis
                            level = analyzeTextForLevel(lowerText, index);
                        }
                    } else {
                        console.log(`  No iframe found, using text analysis`);
                        // Fallback to text analysis
                        level = analyzeTextForLevel(lowerText, index);
                    }
                } else {
                    console.log(`  No hash in href, using text analysis`);
                    // Fallback to text analysis
                    level = analyzeTextForLevel(lowerText, index);
                }
                
                // Universal function to analyze heading level for any markdown file
                function analyzeTextForLevel(text, index) {
                    // Get all TOC items to analyze hierarchy
                    const allTocItems = document.querySelectorAll('.wm-page-toc .wm-toc-li');
                    const allTexts = Array.from(allTocItems).map(item => {
                        const link = item.querySelector('a');
                        return link ? link.textContent.trim() : '';
                    });
                    
                    console.log(`  Analyzing hierarchy for "${text}" at index ${index}`);
                    
                    // Find the current item's position
                    const currentIndex = allTexts.findIndex(t => t.toLowerCase() === text.toLowerCase());
                    if (currentIndex === -1) {
                        console.log(`  Could not find current item in TOC list`);
                        return index === 0 ? 1 : 1; // Fallback
                    }
                    
                    // Universal hierarchy logic: analyze URL patterns to determine heading levels
                    const currentLink = allTocItems[currentIndex].querySelector('a');
                    const currentHref = currentLink ? currentLink.getAttribute('href') : '';
                    
                    // Try to get heading level from iframe content
                    const iframe = document.querySelector('.wm-article');
                    if (iframe && iframe.contentDocument && currentHref && currentHref.includes('#')) {
                        const hash = currentHref.split('#')[1];
                        const headingElement = iframe.contentDocument.querySelector(`[id="${hash}"]`) || 
                                             iframe.contentDocument.querySelector(`[name="${hash}"]`);
                        
                        if (headingElement) {
                            const tagName = headingElement.tagName.toLowerCase();
                            const level = parseInt(tagName.charAt(1));
                            console.log(`  Found heading element: ${tagName} -> level ${level}`);
                            return level;
                        }
                    }
                    
                    // Fallback: analyze based on text patterns and position
                    // Most markdown files follow this pattern: H1, H1, H1, H2, H1, H2, etc.
                    // We can infer hierarchy based on common patterns
                    
                    // Check if this looks like a subsection (H2, H3, etc.)
                    const lowerText = text.toLowerCase();
                    const isSubsection = 
                        lowerText.includes('cấu trúc') ||
                        lowerText.includes('cách hoạt động') ||
                        lowerText.includes('how') ||
                        lowerText.includes('what is') ||
                        lowerText.includes('overview') ||
                        lowerText.includes('introduction') ||
                        lowerText.includes('setup') ||
                        lowerText.includes('configuration') ||
                        lowerText.includes('example') ||
                        lowerText.includes('reference') ||
                        lowerText.includes('conclusion') ||
                        lowerText.includes('summary');
                    
                    // Check if previous item was a main section
                    if (currentIndex > 0) {
                        const prevText = allTexts[currentIndex - 1].toLowerCase();
                        const prevIsMainSection = 
                            prevText.includes('storage') ||
                            prevText.includes('consensus') ||
                            prevText.includes('execution') ||
                            prevText.includes('architecture') ||
                            prevText.includes('blockchain') ||
                            prevText.includes('network') ||
                            prevText.includes('protocol') ||
                            prevText.includes('system') ||
                            prevText.includes('framework') ||
                            prevText.includes('platform');
                        
                        // If current item looks like subsection and previous was main section
                        if (isSubsection && prevIsMainSection) {
                            console.log(`  Detected subsection: "${text}" -> level 2`);
                            return 2;
                        }
                    }
                    
                    // Default logic: first item is H1, others are H1 unless they look like subsections
                    if (currentIndex === 0) {
                        console.log(`  First item: "${text}" -> level 1`);
                        return 1;
                    } else if (isSubsection) {
                        console.log(`  Subsection detected: "${text}" -> level 2`);
                        return 2;
                    } else {
                        console.log(`  Main section: "${text}" -> level 1`);
                        return 1;
                    }
                }
                
                // Remove any existing level classes
                item.classList.remove('toc-level-1', 'toc-level-2', 'toc-level-3', 'toc-level-4');
                
                // Add the level class
                item.classList.add(`toc-level-${level}`);
                
                // Add data attribute for debugging
                item.setAttribute('data-toc-level', level);
                
                console.log(`  Applied class: toc-level-${level}`);
                console.log(`  Item classes after:`, item.className);
                console.log(`  Item data-level:`, item.getAttribute('data-toc-level'));
                
                // Force a repaint to ensure CSS is applied
                item.style.display = 'none';
                item.offsetHeight; // Trigger reflow
                item.style.display = '';
            }
        });
    }
    
    // Run the function when page loads
    addTocLevelClasses();
    
    // Simple test - force apply styles to specific items
    setTimeout(function() {
        console.log('=== SIMPLE TEST - FORCE APPLY STYLES ===');
        const tocItems = document.querySelectorAll('.wm-page-toc .wm-toc-li');
        console.log(`Found ${tocItems.length} TOC items`);
        
        tocItems.forEach(function(item, index) {
            const link = item.querySelector('a');
            const text = link ? link.textContent.trim() : '';
            console.log(`Item ${index}: "${text}"`);
            
            // Simple logic: first item is level 1, "cấu trúc" and "cách hoạt động" are level 2
            if (index === 0) {
                console.log(`  Setting item ${index} to level 1`);
                item.style.marginLeft = '0px';
                item.style.paddingLeft = '8px';
                if (link) {
                    link.style.padding = '8px 0 8px 12px';
                    link.style.borderLeft = '4px solid #3498db';
                    link.style.backgroundColor = '#f8f9fa';
                    link.style.fontWeight = '700';
                    link.style.fontSize = '15px';
                    link.style.color = '#2c3e50';
                }
            } else if (text.toLowerCase().includes('cấu trúc') || text.toLowerCase().includes('cách hoạt động')) {
                console.log(`  Setting item ${index} to level 2`);
                item.style.marginLeft = '20px';
                item.style.paddingLeft = '24px';
                if (link) {
                    link.style.padding = '6px 0 6px 16px';
                    link.style.borderLeft = '2px solid #5dade2';
                    link.style.backgroundColor = '#fafbfc';
                    link.style.fontWeight = '600';
                    link.style.fontSize = '14px';
                    link.style.color = '#34495e';
                }
            } else {
                console.log(`  Setting item ${index} to level 1`);
                item.style.marginLeft = '0px';
                item.style.paddingLeft = '8px';
                if (link) {
                    link.style.padding = '8px 0 8px 12px';
                    link.style.borderLeft = '4px solid #3498db';
                    link.style.backgroundColor = '#f8f9fa';
                    link.style.fontWeight = '700';
                    link.style.fontSize = '15px';
                    link.style.color = '#2c3e50';
                }
            }
        });
    }, 500);
    
    // Also run when TOC is updated (for dynamic content)
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.target.classList.contains('wm-page-toc')) {
                // Wait a bit for iframe to be ready
                setTimeout(function() {
                    handleIframeContent();
                    addTocLevelClasses();
                }, 300);
            }
        });
    });
    
    // Observe TOC container for changes
    const tocContainer = document.querySelector('.wm-page-toc');
    if (tocContainer) {
        observer.observe(tocContainer, { childList: true, subtree: true });
    }
    
    // Continuous monitoring - apply styles every second
    setInterval(function() {
        const tocItems = document.querySelectorAll('.wm-page-toc .wm-toc-li');
        if (tocItems.length > 0) {
            console.log(`=== MONITORING: Found ${tocItems.length} TOC items ===`);
            
            tocItems.forEach(function(item, index) {
                const link = item.querySelector('a');
                const text = link ? link.textContent.trim() : '';
                
                // Simple logic: first item is level 1, "cấu trúc" and "cách hoạt động" are level 2
                if (index === 0) {
                    item.style.marginLeft = '0px';
                    item.style.paddingLeft = '8px';
                    if (link) {
                        link.style.padding = '8px 0 8px 12px';
                        link.style.borderLeft = '4px solid #3498db';
                        link.style.backgroundColor = '#f8f9fa';
                        link.style.fontWeight = '700';
                        link.style.fontSize = '15px';
                        link.style.color = '#2c3e50';
                    }
                } else if (text.toLowerCase().includes('cấu trúc') || text.toLowerCase().includes('cách hoạt động')) {
                    item.style.marginLeft = '20px';
                    item.style.paddingLeft = '24px';
                    if (link) {
                        link.style.padding = '6px 0 6px 16px';
                        link.style.borderLeft = '2px solid #5dade2';
                        link.style.backgroundColor = '#fafbfc';
                        link.style.fontWeight = '600';
                        link.style.fontSize = '14px';
                        link.style.color = '#34495e';
                    }
                } else {
                    item.style.marginLeft = '0px';
                    item.style.paddingLeft = '8px';
                    if (link) {
                        link.style.padding = '8px 0 8px 12px';
                        link.style.borderLeft = '4px solid #3498db';
                        link.style.backgroundColor = '#f8f9fa';
                        link.style.fontWeight = '700';
                        link.style.fontSize = '15px';
                        link.style.color = '#2c3e50';
                    }
                }
            });
        }
    }, 1000); // Check every 1 second
});

// Additional function to handle iframe content (for mkdocs-windmill)
function handleIframeContent() {
    const iframe = document.querySelector('.wm-article');
    if (iframe && iframe.contentDocument) {
        // Apply styles to iframe content
        const iframeHead = iframe.contentDocument.head;
        if (iframeHead) {
            const style = iframe.contentDocument.createElement('style');
            style.textContent = `
                /* Apply heading hierarchy to iframe content */
                h1 { border-left: 4px solid #3498db !important; padding-left: 16px !important; background-color: #f8f9fa !important; }
                h2 { border-left: 3px solid #5dade2 !important; padding-left: 20px !important; background-color: #fafbfc !important; }
                h3 { border-left: 2px solid #85c1e9 !important; padding-left: 24px !important; background-color: #fcfdfe !important; }
                h4 { border-left: 1px solid #d6eaf8 !important; padding-left: 28px !important; background-color: #fefefe !important; }
            `;
            iframeHead.appendChild(style);
        }
        
        // Add data attributes to headings for easier identification
        const headings = iframe.contentDocument.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(function(heading, index) {
            const tagName = heading.tagName.toLowerCase();
            const level = parseInt(tagName.charAt(1));
            heading.setAttribute('data-heading-level', level);
            heading.setAttribute('data-heading-index', index);
            console.log(`Iframe heading: ${tagName} (level ${level}) - "${heading.textContent.trim()}"`);
        });
    }
}

// Run iframe handler when iframe loads
window.addEventListener('load', function() {
    setTimeout(function() {
        handleIframeContent();
        // Re-run TOC analysis after iframe is processed
        setTimeout(addTocLevelClasses, 500);
    }, 1000); // Delay to ensure iframe is loaded
});

// Also run when iframe content changes
const iframeObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' && mutation.target.tagName === 'IFRAME') {
            setTimeout(function() {
                handleIframeContent();
                addTocLevelClasses();
            }, 500);
        }
    });
});

// Observe for iframe changes
const iframeContainer = document.querySelector('.wm-article-container') || document.querySelector('.wm-content-pane');
if (iframeContainer) {
    iframeObserver.observe(iframeContainer, { childList: true, subtree: true });
}
