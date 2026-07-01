export function homepage() {

    document.fonts.ready.then(() => {
        // HERO
        const hpHeroSection = document.querySelector('.section_hero_hp');

        if (hpHeroSection) {

            // Reveal
            gsap.timeline()
                .from('.hp_hero_content_wrapper .content_1', {
                    yPercent: 50,
                    opacity: 0,
                    duration: .5,
                    delay: .4,
                    ease: 'power2.out'
                }).from('.hero_text_content > div', {
                    yPercent: 50,
                    opacity: 0,
                    duration: .8,
                    stagger: .1,
                    ease: 'power2.out'
                }, "-=.25")
                .from('.hero_text_cotainer .tag', {
                    yPercent: 10,
                    opacity: 0,
                    duration: .25,
                    stagger: .06,
                    delay: .25
                }, "<")
                .from('.navbar-wrapper', {
                    yPercent: -100,
                    duration: 1,
                    ease: 'power2.out'
                }, "<");


            // Word Slot Roll Effect
            const slot = document.getElementById('slot');
            const track = document.getElementById('track');

            let lineH;

            // Append clone of first word as 5th sibling
            track.appendChild(track.children[0].cloneNode(true));

            // Slot width = widest word
            let widthExtra = 6; // give it an extra 8px space to make sure nothing gets cut
            slot.style.width = Math.max(...Array.from(track.children).map(c => c.scrollWidth)) + widthExtra + 'px';

            setTimeout(() => {
                const wordCount = track.children.length - 1; // 4 real words (5th is clone)
                lineH = slot.offsetHeight + 10; // height in px
                gsap.set('.word-item', {
                    height: lineH
                });

                const tl = gsap.timeline({ repeat: -1, paused: false });

                for (let i = 1; i <= wordCount; i++) {
                    tl.to(track, {
                        y: () => { return `-${i * lineH}px` },
                        duration: 1,
                        ease: 'power2.inOut'
                    }, '+=1.5')
                }

                // Snap back to start instantly after landing on the clone
                tl.set(track, { y: 0 });
            }, 350);

            window.addEventListener('resize', () => {
                // update above values
                slot.style.width = Math.max(...Array.from(track.children).map(c => c.scrollWidth)) + 'px';
                lineH = slot.offsetHeight; // height in px
                gsap.set('.word-item', {
                    height: lineH
                });
            });
        } else {
            // Anywhere else that is not the homepage
            gsap.from('.navbar-wrapper', {
                yPercent: -100,
                duration: 1,
                delay: 1,
                ease: 'power2.out'
            });
        }

        // FOLLOWUP SECTION - text animation reveal
        const heroFollowupContent = document.querySelector('#hero-follow-up');
        if (heroFollowupContent) {

            const texts = heroFollowupContent.querySelectorAll('h2');
            texts.forEach((text) => {
                const split = new SplitText(text, { type: 'words' });
            });

            gsap.fromTo('#hero-follow-up .hero-follow-up-h2 div', {
                opacity: 0.2
            }, {
                scrollTrigger: {
                    trigger: heroFollowupContent.querySelector('.bg_container'),
                    start: 'top 60%',
                    end: 'top top',
                    scrub: true,
                    // markers: true
                },
                opacity: 1,
                stagger: .5,
                duration: 2,
                ease: 'none'
            });

            gsap.timeline({
                scrollTrigger: {
                    trigger: heroFollowupContent,
                    start: 'top top',
                    end: '+=100%',
                    pin: true,
                    anticipatePin: 1,
                    scrub: true,
                },
            }).from('#hero-follow-up .highlight-secondary span', {
                opacity: 0,
                stagger: .4,
                duration: .8,
                ease: 'none',
                onComplete: () => {
                    gsap.to('#hero-follow-up .btn-container', {
                        opacity: 1,
                        yPercent: 25,
                        duration: 1,
                    });
                },
                onReverseComplete: ()=> {
                    gsap.to('#hero-follow-up .btn-container', {
                        opacity: 0,
                        yPercent: 25,
                        duration: 1,
                    });
                }
            });

            gsap.fromTo('#hero-follow-up .background-color-primary', {
                opacity: 1
            }, {
                scrollTrigger: {
                    trigger: heroFollowupContent,
                    start: 'bottom 95%',
                    end: 'bottom 96%',
                    toggleActions: 'play none reverse none',
                },
                opacity: 0,
                duration: .8,
            });


        }

        // IMG SLIDE CURTAIN
        const hpServices = document.querySelector('.section_services');
        if (hpServices && window.innerWidth > window.mobileBreakpoint) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: hpServices,
                    start: 'top top',
                    end: '+=200%',
                    pin: true,
                    anticipatePin: 1,
                    scrub: true,
                }
            })
                .to({}, {
                    duration: .25
                })
                .to('.hp_curtain_effect_img_container', {
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                    stagger: 1.55,
                    ease: 'none',
                    duration: 1.5
                });
        }

        // TEAM SECTION - text animation
        const teamSection = document.querySelector('.section_hp_team.hp_team_card_effect');
        if (teamSection && window.innerWidth > window.mobileBreakpoint) {
            const container = document.querySelector('.hp_team_list_container')
            const cardsContainer = container.querySelector('.hp_team_list_cards')
            const cards = document.querySelectorAll('.hp_team_list_card')
            const distance = (cardsContainer.clientWidth - window.innerWidth) * 1.2


            setTimeout(() => {

                const scrollTween = gsap.to(cardsContainer, {
                    x: - distance,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: teamSection,
                        scrub: true,
                        start: 'top bottom',
                        end: '+=' + distance,
                        // markers: true
                    }
                });

                ScrollTrigger.create({
                    trigger: '.section_hp_team_wrapper',
                    pin: true,
                    anticipatePin: 1,
                    start: 'top top',
                    end: '+=' + distance * .6,
                    // markers: true
                });

                if (window.innerWidth > 767) {
                    cards.forEach(card => {
                        const values = {
                            // get a value between 30 and 50 or -30 and -50
                            x: (Math.random() * 20 + 30) * (Math.random() < 0.5 ? 1 : -1),
                            // get a value between 10 and 16 or -16 and -10
                            y: (Math.random() * 6 + 10) * (Math.random() < 0.5 ? 1 : -1),
                            // get a value between 10 and 20 or -10 and -20
                            rotation: (Math.random() * 10 + 10) * (Math.random() < 0.5 ? 1 : -1)
                        };
                        gsap.fromTo(card, {
                            rotation: values.rotation,
                            xPercent: values.x,
                            yPercent: values.y
                        }, {
                            rotation: - values.rotation,
                            xPercent: - values.x,
                            yPercent: - values.y,
                            ease: 'none', // linear progression
                            scrollTrigger: {
                                trigger: card,
                                containerAnimation: scrollTween, // tween will listen to scrollTween container position
                                start: 'left 120%',
                                end: 'right -20%',
                                scrub: true,
                            }
                        })
                    });
                } else {
                    gsap.fromTo('.hp_team_list_container', {
                        xPercent: 0,
                    }, {
                        delay: .5,
                        xPercent: -100,
                        ease: 'none', // linear progression
                        scrollTrigger: {
                            // trigger: card,
                            containerAnimation: scrollTween,
                            start: 'left 120%',
                            end: 'right -20%',
                            scrub: true,
                        }
                    })
                }


                const tabListSection = document.querySelector('.section_layout493');
                const tabsList = document.querySelectorAll('.layout493_tab-link');
                if (tabsList && tabListSection) {
                    // tabsList.forEach(tab => {
                    //     tab.addEventListener('mouseenter', () => {
                    //         tab.click();
                    //     });
                    // });

                    const links = gsap.utils.toArray('.layout493_tab-link');
                    const N = links.length;

                    let current = -1;
                    const goTo = (idx) => {
                        if (idx === current) return;
                        current = idx;
                        links[idx].click();
                    };

                    // iterate through each tab
                    ScrollTrigger.create({
                        trigger: tabListSection,
                        start: 'top top',
                        end: '+=200%',
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        onUpdate: (self) => {
                            const idx = Math.min(N - 1, Math.floor(self.progress * N));
                            goTo(idx);
                        },
                    });
                }
            }, 10);
        }

        console.log("running homepage()");
    }); // fonts ready
}