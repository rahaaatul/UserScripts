// ==UserScript==
// @name        eFootball Fix Links
// @namespace    https://github.com/DaPotatoMan
// @version      1.0
// @description  Enables for you to copy the link or open links in new tab
// @author       DaPotatoMan
// @match        https://www.efootballhub.net/*
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';

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
            tag.href = link
            tag.appendChild(node);
            parent.appendChild(tag);

            console.log(node);
        }
    });
})();