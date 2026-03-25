// note: not all script files are being loaded by default (example: faqs...)

import { mainInit } from './main.js';
import { navBarMenu } from './menu.js';
import { homepage } from './homepage.js';
import { services } from './services.js';
import { about } from './about.js';
import { swiperInit } from './swiper.js';
import { works } from './works.js';
import { form } from './form.js';
import { footerDate } from './footer-date.js';


window.tabletBreakpoint = 991;
window.mobileBreakpoint = 767;

function init() {
    mainInit();
    navBarMenu();
    homepage();
    services();
    about();
    works();
    swiperInit();
    form();
    footerDate();

    console.log("Running main scripts loader");
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}