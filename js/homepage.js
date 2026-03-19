export function homepage() {

    // setTimeout(() => {

    document.fonts.ready.then(() => {
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
        if (hpServices) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: hpServices,
                    start: 'top top',
                    end: '+=200%',
                    pin: true,
                    scrub: true,
                }
            })
            .to({},{
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
        if (teamSection) {
            const container = document.querySelector('.hp_team_list_container')
            const cardsContainer = container.querySelector('.hp_team_list_cards')
            const cards = document.querySelectorAll('.hp_team_list_card')
            const distance = cardsContainer.clientWidth - window.innerWidth

            const scrollTween = gsap.to(cardsContainer, {
                x: - distance,
                ease: 'none', // linear progression
                // let's pin our container while our cardsContainer is animating
                scrollTrigger: {
                    trigger: teamSection,
                    // pin: true,
                    scrub: true, // progress with the scroll
                    start: 'top 85%',
                    // end: '+=' + distance
                    end: 'bottom top'
                }
            });

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
                    // let's start from this 3 values
                    rotation: values.rotation,
                    xPercent: values.x,
                    yPercent: values.y
                }, {
                    // and finish to its 3 opposite values
                    rotation: - values.rotation,
                    xPercent: - values.x,
                    yPercent: - values.y,
                    ease: 'none', // linear progression
                    scrollTrigger: {
                        trigger: card,
                        containerAnimation: scrollTween, // our tween will listen to our scrollTween container position
                        start: 'left 120%',
                        end: 'right -20%',
                        scrub: true, // the animation progress with the scroll
                    }
                })
            })
        }
        // }, 250);

        console.log("running homepage()");
    }); // fonts ready
}