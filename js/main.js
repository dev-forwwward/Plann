export function mainInit() {

    // LENIS
    window.lenis = new Lenis(); // globally available

    // Sync Lenis scrolling with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    // This ensures Lenis's smooth scroll animation updates on each GSAP tick
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    // Disable lag smoothing in GSAP to prevent any delay in scroll animations
    gsap.ticker.lagSmoothing(0);

    // FANCYBOX INIT
    const fancyboxEl = document.querySelector("[data-fancybox]");
    if (fancyboxEl) {
        Fancybox.bind("[data-fancybox]", {
            on: {
                init: () => {
                    lenis.stop();
                },
                close: () => {
                    lenis.start();
                }
            }
        });
    }

    // Preloader
    const preloaderEl = document.querySelector('.preloader');
    if (preloaderEl) {
        gsap.to(preloaderEl, {
            opacity: 0,
            delay: .1,
            duration: .5,
            ease: "power2.out",
            onComplete: () => {
                preloaderEl.remove();
            }
        });
    }


    // Generic Hero Fade-in
    // note: does not include homepage hero
    const fadeInEls = document.querySelectorAll('.fade-in');

    if (fadeInEls.length > 0 && !document.querySelector('.section_hero_hp')) {
        gsap.from(fadeInEls, {
            opacity: 0,
            yPercent: 5,
            duration: 1,
            delay: 1,
            stagger: .1,
            ease: 'power2.out'
        });
    }


    // Job offers dynamic text
    // this code block counts the number of '.content5_job_opening' elements (job offers) and 
    // updates the Careers hero button text content
    const jobOffers = document.querySelectorAll('.content5_job_opening');
    const seeOffersBtn = document.querySelector('.job_offers_btn_container .button');
    if (jobOffers.length > 0 && seeOffersBtn) {
        const firstIconContainer = seeOffersBtn.querySelector('.btn_arrow_container');
        if (firstIconContainer) {
            // if button has a icons, insert the count after the first icon container (which is only seen on hover)
            firstIconContainer.insertAdjacentHTML('afterend', `<span class="job_count">${jobOffers.length}</span>`);
        } else {
            // if no icons, just add the count at the beginning of the button
            seeOffersBtn.insertAdjacentHTML('afterbegin', `<span class="job_count">${jobOffers.length}</span>`);
        }
    }


    console.log("Loading mainInit()");

}