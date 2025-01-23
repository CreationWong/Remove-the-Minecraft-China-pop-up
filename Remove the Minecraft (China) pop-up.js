// ==UserScript==
// @name         Remove the Minecraft (China) pop-up
// @namespace    https://creationwong.xyz/
// @version      1.0
// @description  移除 Minecraft 网站向我的世界网站弹窗
// @author       CreationWong
// @match        *://*.minecraft.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 向控制台发送信息
    function logInfo(message) {
        console.info('[RemoveMinecraftPopup]:', message);
    }

    // 检查并更新<body>元素的样式和类，支持模糊匹配
    function updateBodyStylesAndClasses() {
        const bodyClassChecks = [
            { hasClass: 'MC_modal_open', style: { overflow: 'auto', paddingRight: '' } },
            { hasClass: 'modal-open', classToRemove: 'modal-open' }
        ];

        bodyClassChecks.forEach(({ hasClass, style, classToRemove }) => {
            const bodyElement = document.body;
            if (bodyElement.classList.contains(hasClass)) {
                if (style) {
                    Object.assign(bodyElement.style, style);
                    logInfo(`Updated styles for <body>: ${JSON.stringify(style)}`);
                }
                if (classToRemove) {
                    bodyElement.classList.remove(classToRemove);
                    logInfo(`Removed class "${classToRemove}" from <body>`);
                }
            }
        });
    }

    // 移除特定元素，支持模糊匹配
    function removeElements(selectors) {
        selectors.forEach(selector => {
            // 使用querySelectorAll以支持多个匹配元素的移除
            document.querySelectorAll(selector).forEach(element => {
                element.remove();
                logInfo(`Removed element matching selector: ${selector}`);
            });
        });
    }

    // 设置MutationObserver监听DOM变化
    function setupObserver() {
        const observer = new MutationObserver(() => {
            updateBodyStylesAndClasses();
            removeElements([
                'section.MC_Theme_Vanilla.MC_Bg_Core__rich-black[data-mc-ref="mc_modals_modalA"][data-aem-item="mc-modalA"]',
                'div.geo-loc-wrapper-content.geo-loc-val[data-geo-loc-val=\'{"geoloc":"cn"}\']'
            ]);
        });

        observer.observe(document.body, { attributes: true, childList: true, subtree: true });
        logInfo('MutationObserver set up.');
    }

    // 初始化脚本
    function init() {
        updateBodyStylesAndClasses();
        removeElements([
            'section.MC_Theme_Vanilla.MC_Bg_Core__rich-black[data-mc-ref="mc_modals_modalA"][data-aem-item="mc-modalA"]',
            'div.geo-loc-wrapper-content.geo-loc-val[data-geo-loc-val=\'{"geoloc":"cn"}\']'
        ]);
        setupObserver();
        logInfo('Script initialization completed.');
    }

    // 执行初始化
    init();
})();