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
                    duration: 1,
                    delay: 1,
                    ease: 'power2.out'
                }).from('.hero_text_content > div', {
                    yPercent: 50,
                    opacity: 0,
                    duration: .8,
                    stagger: .1,
                    ease: 'power2.out'
                }, "-=.5")
                .from('.hero_text_cotainer .tag', {
                    yPercent: 10,
                    opacity: 0,
                    duration: .25,
                    stagger: .06,
                    delay: .5
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
            let widthExtra = 8; // give it an extra 8px space to make sure nothing gets cut
            slot.style.width = Math.max(...Array.from(track.children).map(c => c.scrollWidth)) + widthExtra + 'px';

            setTimeout(() => {
                const wordCount = track.children.length - 1; // 4 real words (5th is clone)
                lineH = slot.offsetHeight; // height in px
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



        // FOLLOWUP SECTION - text animation
        const heroFollowupContent = document.querySelector('.hp_hero_followup_content_wrapper');
        if (heroFollowupContent) {



            const text = heroFollowupContent.querySelector('.hp_hero_followup_text');
            wrapLettersInSpan(text);

            const letters = heroFollowupContent.querySelectorAll('.letter');
            const distance = text.clientWidth - document.body.clientWidth;

            const scrollTween = gsap.timeline({
                scrollTrigger: {
                    trigger: '.section_hero_hp',
                    start: 'top top',
                    end: '+=' + distance,
                    pin: true,
                    scrub: true
                }
            })
                .to('.hp_hero_background_image_wrapper img', {
                    opacity: .5,
                    filter: 'blur(20px)',
                    duration: .8
                })
                .to('.hp_hero_content_wrapper', {
                    opacity: 0,
                    filter: 'blur(10px)',
                    duration: .5
                }, "<")
                .to(text, {
                    delay: .05,
                    duration: 2,
                    x: - distance,
                    ease: 'none',
                }, "<")
                .to(text, {
                    opacity: 0,
                    duration: .25
                }, "-=.2");

            letters.forEach(letter => {
                // const values = {
                // y: (Math.floor(Math.random() * (16 - 10 + 1)) + 10) * (Math.random() * 20 - 10),
                // rotation: (Math.floor(Math.random() * (20 - 10 + 1)) + 10) * (Math.random() * 2 - 1)
                // }

                gsap.from(letter, {
                    yPercent: (Math.random() - 0.5) * 400, // Between -200 & 200
                    rotation: (Math.random() - 0.5) * 60, // Between -30 & 30
                    ease: "elastic.out(1.2, 1)", // Will bounce at the end of the animation
                    scrollTrigger: {
                        trigger: letter, // Listens to the tween's letter position
                        containerAnimation: scrollTween,
                        start: 'left 90%', // Animation starts when the letter is at the right edge of the viewport
                        end: 'left 10%', // Ends when the letter reaches the left edge of the viewport
                        scrub: 0.5 // Progresses with scrolling, with a 0.5s delay
                    }
                });
            });


            // UTIL METHOD - add span wrappers to each letter
            function wrapLettersInSpan(element) {
                const text = element.textContent;
                element.innerHTML = text
                    .split('')
                    .map(char => char === ' ' ? '<span> </span>' : `<span class="letter">${char}</span>`)
                    .join('');
            }
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
                        end: '+=' + distance
                    }
                });

                ScrollTrigger.create({
                    trigger: '.section_hp_team_wrapper',
                    pin: true,
                    start: 'top top',
                    end: '+=' + distance * .6
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

            }, 200)
        }

        console.log("running homepage()");
    }); // fonts ready
}