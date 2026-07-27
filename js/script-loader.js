// Cache-busted dynamic imports: jsdelivr/browsers cache static `import` specifiers
// hard (branch-alias staleness even after purge). A fresh query param per load
// forces a real fetch every time, so pushes to main show up immediately.
const v = Date.now();
const [
    { mainInit },
    { navBarMenu },
    { homepage },
    { services },
    { about },
    { reveals },
    { swiperInit },
    { works },
    { form },
    { footerDate },
    { menuDynamicTheme },
] = await Promise.all([
    import(`./main.js?v=${v}`),
    import(`./menu.js?v=${v}`),
    import(`./homepage.js?v=${v}`),
    import(`./services.js?v=${v}`),
    import(`./about.js?v=${v}`),
    import(`./reveals.js?v=${v}`),
    import(`./swiper.js?v=${v}`),
    import(`./works.js?v=${v}`),
    import(`./form.js?v=${v}`),
    import(`./footer-date.js?v=${v}`),
    import(`./menu-dynamic-theme.js?v=${v}`),
]);

// not all script files are being loaded by default (example: faqs...)

window.tabletBreakpoint = 991;
window.mobileBreakpoint = 767;

function init() {
    document.fonts.ready.then(() => {
        mainInit();
        navBarMenu();
        homepage();
        services();
        about();
        works();
        menuDynamicTheme();
        swiperInit();
        form();
        footerDate();
        reveals();

        console.log("Running main scripts loader");
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
