export function about() {

    const teamSection = document.querySelector('.section_team');
    const teamCards = document.querySelectorAll('.team_card');
    const teamNavLinks = document.querySelectorAll('.team_list_item');
    const navLinks = document.querySelectorAll('.team_list_item');

    if (teamSection && teamCards.length > 0 && teamNavLinks.length > 0) {
        teamCards.forEach((card, i) => {

            // desktop scrollTrigger innit
            if (window.innerWidth > 767) {
                ScrollTrigger.create({
                    trigger: card,
                    start: 'top 128px',
                    end: 'bottom 128px',
                    onEnter: () => {
                        let activeIndex = document.querySelector('.team_list_item.active');

                        // clear previous active nav list el if it exists
                        if (activeIndex) {
                            activeIndex.classList.remove('active');
                        }

                        // update current active nav list el
                        teamNavLinks[i].classList.add('active');

                    },
                    onLeave: () => {
                        teamNavLinks[i].classList.remove('active');
                    },
                    onEnterBack: () => {
                        let activeIndex = document.querySelector('.team_list_item.active');

                        // clear previous active nav list el if it exists
                        if (activeIndex) {
                            activeIndex.classList.remove('active');
                        }

                        teamNavLinks[i].classList.add('active');
                    },
                    onLeaveBack: () => {
                        teamNavLinks[i].classList.remove('active');
                    },
                });
            } else {
                // mobile view
                // 'read more' feature

                const readMoreBtn = card.querySelector('.read_more');
                if(readMoreBtn) {
                    readMoreBtn.addEventListener('click', () => {
                        card.classList.toggle('show_full_bio');
                    });
                }

            }

            // add on-click navigation (desktop/mobile)
            navLinks[i].addEventListener('click', (e) => {
                let prevActive = document.querySelector('.team_list_item.active');
                if (prevActive) { prevActive.classList.remove('active') }

                // avoid scroll-to behavior to an already-active element
                if (prevActive != e.target) {
                    navLinks[i].classList.add('active');
                    let targetScroll = teamCards[i].parentElement;
                    window.lenis.scrollTo(targetScroll, {
                        offset: -100
                    });
                }
            });

        });

    }

    console.log("running about()");
}