export function menuDynamicTheme() {
    // ---------------------------------------
    // NAV MENU DYNAMIC THEME COLOR CHANGE
    // note: this feature presumes the navbar component has both a 'Base' and 
    // 'Light' theme by default that vary with each page

    const navBar = document.querySelector('.navbar');
    const lightSections = document.querySelectorAll('.light_section');
    const darkSections = document.querySelectorAll('.dark_section');

    setTimeout(() => {
        lightSections.forEach((section) => {
            ScrollTrigger.create({
                trigger: section,
                start: 'clamp(top top)',
                end: 'clamp(bottom top)',
                onEnter: () => {
                    navBar.classList.add('lighter');
                },
                onLeave: () => {
                    navBar.classList.remove('lighter');
                },
                onEnterBack: () => {
                    navBar.classList.add('lighter');
                },
                onLeaveBack: () => {
                    navBar.classList.remove('lighter');
                }
            });
        });

        darkSections.forEach((section) => {
            ScrollTrigger.create({
                trigger: section,
                start: 'clamp(top top)',
                end: 'clamp(bottom top)',
                onEnter: () => {
                    navBar.classList.add('darker');
                },
                onLeave: () => {
                    navBar.classList.remove('darker');
                },
                onEnterBack: () => {
                    navBar.classList.add('darker');
                },
                onLeaveBack: () => {
                    navBar.classList.remove('darker');
                }
            });
        });
    }, 350);

    console.log("menuDynamicTheme");
}