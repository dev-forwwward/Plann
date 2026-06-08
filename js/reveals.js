export function reveals() {
    document.fonts.ready.then(() => {

    const revealElements = document.querySelectorAll('[text-reveal]');
    if (revealElements.length > 0) {
        revealElements.forEach((el) => {
            const split = new SplitText(el, { type: 'words' });

            gsap.from(split.words, {
                opacity: 0,
                yPercent: 25,
                duration: .8,
                stagger: 0.09,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 60%',
                    toggleActions: 'play none none none',
                },
            });
        });
    }

    const fadeinElements = document.querySelectorAll('[fade-in]');
    if (fadeinElements.length > 0) {
        fadeinElements.forEach((el) => {

            gsap.from(el, {
                opacity: 0,
                yPercent: 25,
                duration: .8,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 70%',
                    toggleActions: 'play none none none',
                },
            });
        });
    }

    const tagEls = document.querySelectorAll('.tag');
    if (tagEls.length > 0) {
        tagEls.forEach((tag) => {

            gsap.from(tag, {
                opacity: 0,
                yPercent: 25,
                duration: .8,
                scrollTrigger: {
                    trigger: tag,
                    start: 'top 70%',
                    toggleActions: 'play none none none',
                },
            });
        });
    }

    }); // document.fonts.ready
}