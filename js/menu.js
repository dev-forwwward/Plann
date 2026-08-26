export function navBarMenu() {
    // ---------------------------------------
    // NAV MENU
    const trigger = document.querySelector('#menu-trigger');
    const menuNavBar = document.querySelector(".mobile-dropdown-menu");
    const navLinks = document.querySelectorAll('.menu-link');
    const html = document.documentElement;
    const body = document.body;
    const mobileMenu = document.querySelector('.mobile-dropdown-menu');

    let scrollY = 0;
    // Hide initially with class
    //mobileMenu.classList.add('is-hidden');


    // URL language check
    const localesContainer = document.querySelectorAll('.locales-container');
    if (localesContainer.length > 0) {
        if (window.location.href.endsWith('pt')) {
            localesContainer.forEach((locales) => {
                locales.classList.add('pt-lang');
            });

        } else {
            localesContainer.forEach((locales) => {
                locales.classList.remove('pt-lang');
            });
        }
    }


    trigger.addEventListener("click", function (event) {
        console.log("click");
        event.stopPropagation();

        const isOpen = menuNavBar.classList.contains("w--open");

        if (isOpen) {
            // CLOSE MENU
            body.classList.remove("navbar-menu-open");
            html.classList.remove("lock-viewport");

            // Restore scroll
            // body.style.position = '';
            // body.style.top = '';
            window.scrollTo(0, scrollY);

            gsap.to(mobileMenu, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    //mobileMenu.classList.add('is-hidden');
                    menuNavBar.classList.remove("w--open");
                    gsap.set('.mobile-dropdown-menu', { display: 'none' });
                }
            });


        } else {
            // OPEN MENU
            scrollY = window.scrollY;

            // Lock scroll
            // body.style.position = 'fixed';
            // body.style.top = `-${scrollY}px`;
            body.classList.add("navbar-menu-open");
            html.classList.add("lock-viewport");

            // Remove display none
            //mobileMenu.classList.remove('is-hidden');

            gsap.timeline({ defaults: { overwrite: true } })
                .fromTo('.mobile-dropdown-menu', { opacity: 0 }, {
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power2.out',
                    onStart: () => {
                        menuNavBar.classList.add("w--open");
                        gsap.set('.mobile-dropdown-menu', { display: 'flex' });
                        html.classList.add("lock-viewport"); // ✅ lock scroll
                    }
                })
                .fromTo('.nav_menu_bg_gradient', { opacity: 0 }, {
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power3.out'
                }, "<")
                .fromTo('.menu-link-container, .mobile-dropdown-menu .button, .text-size-medium', {
                    opacity: 0,
                    yPercent: 10
                }, {
                    opacity: 1,
                    yPercent: 0,
                    stagger: 0.1,
                    duration: 1,
                    ease: 'power2.out'
                }, "<");
        }
    });

    /* Menu HIDE/REVEAL w/ Scroll */
    let lastScrollTop = 0;
    const navComponent = document.querySelector(".navbar_component");

    if (!navComponent) {
        console.warn("navComponent not found.");
        return;
    }

    // Below this, treat frame-to-frame movement as noise, not a direction
    // change — Lenis's eased scroll shrinks to sub-pixel deltas as it settles,
    // and comparing every frame against the previous one made the nav flicker
    // hidden/visible repeatedly whenever a scroll came to a stop.
    const SCROLL_DIRECTION_THRESHOLD = 5;

    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const isOpen = menuNavBar.classList.contains("w--open");

        if (!isOpen) {
            if (scrollTop <= 10) {
                navComponent.style.top = "0";
                document.body.classList.add("nav-visible");
                lastScrollTop = scrollTop;
            } else if (Math.abs(scrollTop - lastScrollTop) > SCROLL_DIRECTION_THRESHOLD) {
                if (scrollTop > lastScrollTop) {
                    let navHeight = navComponent.offsetHeight;
                    navComponent.style.top = `-${navHeight}px`;
                    document.body.classList.remove("nav-visible");
                } else {
                    navComponent.style.top = "0";
                    document.body.classList.add("nav-visible");
                }
                lastScrollTop = scrollTop;
            }
        }

        if (scrollTop > 50 && !isOpen) {
            navComponent.classList.add("scrolled");
        } else {
            navComponent.classList.remove("scrolled");
        }
    };

    // Mobile browsers collapse/expand their address bar on tap and scroll,
    // which shifts scrollY by tens of px with no user scroll gesture behind
    // it. Resync the reference point on viewport-height change so that shift
    // isn't misread as a scroll-down and doesn't hide the nav on its own.
    const resyncScrollReference = () => {
        lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    };
    if (window.visualViewport) {
        window.visualViewport.addEventListener("resize", resyncScrollReference);
    } else {
        window.addEventListener("resize", resyncScrollReference);
    }

    // Run scroll logic on load in case page is opened mid-scroll
    handleScroll();

    lenis.on("scroll", handleScroll);

    console.log("running navBarMenu()");

}