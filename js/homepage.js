export function homepage() {

    // FOLLOWUP SECTION - text animation
    const heroFollowupContent = document.querySelector('.hp_hero_followup_content_wrapper');
    if (heroFollowupContent) {

        document.fonts.ready.then(() => {

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

    console.log("running homepage()");
}