export function swiperInit() {

    // Init Homepage Works Swiper
    let hpWorksSwiper = document.querySelector('.hp_works_swiper');
    const hpWorkSwiperSlides = document.querySelectorAll('.hp_works_slide');

    if (hpWorksSwiper && hpWorkSwiperSlides) {

        setTimeout(() => {
            hpWorksSwiper = new Swiper('.hp_works_swiper', {
                slidesPerView: 1.8,
                spaceBetween: 16,
                centeredSlides: true,
                direction: 'horizontal',
                loop: true,
                autoWidth: true,
                speed: 1000,
                autoplay: {
                    delay: 1800,
                    disableOnInteraction: false,
                },

                freeMode: true,
                freeModeMomentum: false,
                allowTouchMove: true,

                breakpoints: {
                    // for screens 768px wide and up
                    768: {
                        autoplay: {
                            delay: 0,
                            disableOnInteraction: false, // if true, will pause on hover
                        },
                        slidesPerView: 6,
                        spaceBetween: 32,
                        speed: 8000, // Smooth transition speed
                        centeredSlides: false,
                        freeMode: true,
                        freeModeMomentum: false,
                    }
                },
                on: {
                    init: function () {
                        // add mouse hover listener to all slides
                        // update swiper measurements with each hover (since they expand on hover)
                        hpWorkSwiperSlides.forEach((slide) => {
                            slide.addEventListener('mouseenter', () => {
                                hpWorksSwiper.update();
                                // hpWorksSwiper.autoplay.stop();
                            });
                            slide.addEventListener('mouseleave', () => {
                                hpWorksSwiper.update();
                                // hpWorksSwiper.autoplay.start();
                            });
                        });
                    },
                }
            });

            window.addEventListener('resize', () => { hpWorksSwiper.update(); });

        }, 800);

    }

    // HOMEPAGE team slider - mobile only
    const hpTeamSwiperContainer = document.querySelector('.swiper.hp_team_list_container');
    if (hpTeamSwiperContainer && window.innerWidth <= window.mobileBreakpoint) {
        const teamSwiper = new Swiper(hpTeamSwiperContainer, {
            slidesPerView: .99,
            spaceBetween: 14,
            loop: false,
            breakpoints: {
                // for screens 420px wide and up
                420: {
                    slidesPerView: 1.5
                }
            }
        });
    }

    // ABOUT Team Swiper
    const teamSwiperContainer = document.querySelector('.team_card_list_swiper');
    if (teamSwiperContainer && window.innerWidth <= 767) {
        hpWorksSwiper = new Swiper(teamSwiperContainer, {
            slidesPerView: 1.1,
            spaceBetween: 14,
            // centeredSlides: true,
            // direction: 'horizontal',
            loop: false,
            // autoWidth: true,

            // freeMode: true,

            on: {
                // update navigation active state
                slideChange: function () {
                    const items = document.querySelectorAll('.team_list_item');
                    items.forEach(item => item.classList.remove('active'));
                    if (items[this.activeIndex]) {
                        items[this.activeIndex].classList.add('active');
                    }
                },
            },
        });

        document.querySelectorAll('.team_list_item').forEach((item, index) => {
            item.addEventListener('click', () => {
                hpWorksSwiper.slideTo(index);
            });
        });
    }

    // SERVICES Mobile Swiper
    const servicesSwiperContainer = document.querySelector('.swiper.layout350_component');
    if (servicesSwiperContainer && window.innerWidth <= 767) {
        const tabLinks = document.querySelectorAll('a.layout350_tab-link');

        // update nav links active state based on active swiper slide
        function updateTabLinks(activeIndex) {
            tabLinks.forEach((link, i) => {
                link.classList.toggle('is-active', i === activeIndex);
            });
        }

        const servicesSwiper = new Swiper(servicesSwiperContainer, {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: false,
            effect: "fade",
            on: {
                slideChange() {
                    updateTabLinks(this.activeIndex);
                },
                init() {
                    updateTabLinks(this.activeIndex);
                },
            },
        });

        tabLinks.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                servicesSwiper.slideTo(index);
            });
        });
    }

    console.log("running swiperInit()");

}