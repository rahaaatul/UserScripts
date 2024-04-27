// ==UserScript==
// @name         eFootball Fix Links
// @namespace    https://github.com/DaPotatoMan
// @version      1.1
// @description  Enables you to open the search results in new tab or copy the links directly.
// @author       DaPotatoMan
// @match        *://efootballhub.net
// @match        *://efootballhub.net/*
// @match        *://*.efootballhub.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function fixLinks() {
        const linkNodes = document.querySelectorAll('tr[onclick]');
        const links = Array.from(linkNodes);

        links.forEach((node) => {
            const onclickValue = node.getAttribute('onclick');
            const isLinkScript = onclickValue.startsWith('location.href');
            const parent = node.parentElement;

            if (isLinkScript) {
                node.removeAttribute('onclick');

                // Create link tag
                const link = onclickValue.replace(/location\.href=\('|'\);/gm, '');
                const tag = document.createElement('a');
                tag.href = link;
                tag.appendChild(node);
                parent.appendChild(tag);
            }
        });
    }

    // Initial execution
    fixLinks();

    // Listen for DOM changes and re-execute the script
    const observer = new MutationObserver(function(mutations) {
        fixLinks();
});

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();