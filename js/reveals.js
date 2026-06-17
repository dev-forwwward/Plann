export function reveals() {
    document.fonts.ready.then(() => {

        setTimeout(() => {
            ScrollTrigger.refresh();

            // WORD-BY-WORD REVEAL
            const revealElements = document.querySelectorAll('[text-reveal]');
            if (revealElements.length > 0) {
                revealElements.forEach((el) => {
                    const split = new SplitText(el, { type: 'words' });
                    const val = el.getAttribute('text-reveal');
                    const duration = val !== '' ? parseFloat(val) : .8;
                    const stagger = duration > .8 ? .05 : .025;

                    gsap.from(split.words, {
                        opacity: 0,
                        yPercent: 25,
                        duration,
                        stagger,
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 60%',
                            toggleActions: 'play none none none',
                        },
                    });
                });
            }

            // LINE-BY-LINE REVEAL
            const lineElements = document.querySelectorAll('[line-reveal]');
            if (lineElements.length > 0) {
                lineElements.forEach((el) => {
                    const split = new SplitText(el, { type: 'lines' });
                    const val = el.getAttribute('line-reveal');
                    const duration = val !== '' ? parseFloat(val) : .8;
                    const stagger = duration > .8 ? .05 : .025;

                    gsap.from(split.lines, {
                        opacity: 0,
                        yPercent: 25,
                        duration,
                        stagger,
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 60%',
                            toggleActions: 'play none none none',
                        },
                    });
                });
            }

            // FADE-IN UPWARDS
            const fadeinElements = document.querySelectorAll('[fade-in]');
            if (fadeinElements.length > 0) {
                fadeinElements.forEach((el) => {
                    const val = el.getAttribute('fade-in');
                    const duration = val !== '' ? parseFloat(val) : .8;

                    gsap.from(el, {
                        opacity: 0,
                        delay: 1,
                        yPercent: 25,
                        duration,
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 80%',
                            toggleActions: 'play none none none',
                        },
                    });
                });
            }

            // OPACITY FADE-IN
            const opacityElements = document.querySelectorAll('[opacity-in]');
            if (opacityElements.length > 0) {
                opacityElements.forEach((el) => {
                    const val = el.getAttribute('opacity-in');
                    const duration = val !== '' ? parseFloat(val) : .8;

                    gsap.from(el, {
                        opacity: 0,
                        delay: .5,
                        duration,
                        scrollTrigger: {
                            trigger: el,
                            start: 'clamp(top 85%)',
                            toggleActions: 'play none none none',
                        },
                    });
                });
            }

            // TAG ELS REVEAL - DEFAULT
            const tagEls = document.querySelectorAll('.tag');
            if (tagEls.length > 0) {
                tagEls.forEach((tag) => {

                    gsap.from(tag, {
                        opacity: 0,
                        delay: .2,
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

            // CASCADE REVEAL
            const cascade = document.querySelectorAll('[cascade]');
            if (cascade.length > 0) {

                cascade.forEach((cascadeContainer) => {
                    const val = cascadeContainer.getAttribute('cascade');
                    const duration = val !== '' ? parseFloat(val) : .55;
                    const cascadeCards = cascadeContainer.querySelectorAll('[cascade-el]');

                    gsap.timeline({
                        scrollTrigger: {
                            trigger: cascadeContainer,
                            start: 'clamp(top 85%)',
                            toggleActions: 'play none none none',
                        }
                    }).from(cascadeCards, {
                        opacity: 0,
                        delay: .7,
                        stagger: .08,
                        yPercent: 25,
                        duration,
                    });

                });
            }
        }, 220);
    }); // document.fonts.ready
}