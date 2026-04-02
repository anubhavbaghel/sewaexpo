document.addEventListener('DOMContentLoaded', function () {
    const hero = document.getElementById('home-hero-carousel');
    const statsSection = document.getElementById('home-stats');
    const pageNeedsFallback = Array.from(document.querySelectorAll('#home-stats .font-serif')).some(function (node) {
        return /^0\+?$/.test(node.textContent.trim());
    });

    if (!pageNeedsFallback) {
        return;
    }

    function revealElements(elements) {
        elements.forEach(function (element, index) {
            element.style.transitionDelay = index * 120 + 'ms';
            element.classList.remove('opacity-0', 'translate-y-8', 'scale-95');
            element.classList.add('opacity-100', 'translate-y-0', 'scale-100');
        });
    }

    function hideElements(elements) {
        elements.forEach(function (element) {
            element.style.transitionDelay = '0ms';
            if (element.classList.contains('scale-100')) {
                element.classList.remove('scale-100');
                element.classList.add('scale-95');
            }
            if (element.classList.contains('translate-y-0')) {
                element.classList.remove('translate-y-0');
                element.classList.add('translate-y-8');
            }
            if (element.classList.contains('opacity-100')) {
                element.classList.remove('opacity-100');
            }
            if (!element.classList.contains('opacity-0')) {
                element.classList.add('opacity-0');
            }
        });
    }

    if (hero) {
        const heroChildren = Array.from(hero.children);
        const slides = heroChildren.filter(function (child) {
            return child.tagName === 'DIV' && child.className.includes('absolute inset-0 transition-opacity');
        });
        const navButtons = heroChildren.filter(function (child) {
            return child.tagName === 'BUTTON';
        });
        const dotContainer = heroChildren.find(function (child) {
            return child.tagName === 'DIV' && child.querySelectorAll('button').length === slides.length;
        });
        const dots = dotContainer ? Array.from(dotContainer.querySelectorAll('button')) : [];
        const scrollCue = heroChildren.find(function (child) {
            return child.tagName === 'DIV' && child.className.includes('bottom-8') && !child.querySelector('button');
        });
        let activeSlide = 0;
        let heroTimer;

        function renderSlide(index) {
            activeSlide = index;

            slides.forEach(function (slide, slideIndex) {
                const active = slideIndex === activeSlide;
                slide.classList.toggle('opacity-100', active);
                slide.classList.toggle('opacity-0', !active);
                slide.setAttribute('aria-hidden', active ? 'false' : 'true');

                const stagedElements = Array.from(slide.querySelectorAll('.transition-all.duration-700'));
                if (active) {
                    revealElements(stagedElements);
                } else {
                    hideElements(stagedElements);
                }
            });

            dots.forEach(function (dot, dotIndex) {
                const active = dotIndex === activeSlide;
                dot.classList.toggle('bg-orange', active);
                dot.classList.toggle('w-12', active);
                dot.classList.toggle('bg-white/50', !active);
                dot.classList.toggle('w-2', !active);
            });

            if (scrollCue) {
                scrollCue.classList.remove('opacity-0');
                scrollCue.classList.add('opacity-100');
            }
        }

        function startHeroTimer() {
            window.clearInterval(heroTimer);
            heroTimer = window.setInterval(function () {
                renderSlide((activeSlide + 1) % slides.length);
            }, 5000);
        }

        if (slides.length) {
            renderSlide(0);
            startHeroTimer();

            if (navButtons[0]) {
                navButtons[0].addEventListener('click', function () {
                    renderSlide((activeSlide - 1 + slides.length) % slides.length);
                    startHeroTimer();
                });
            }

            if (navButtons[1]) {
                navButtons[1].addEventListener('click', function () {
                    renderSlide((activeSlide + 1) % slides.length);
                    startHeroTimer();
                });
            }

            dots.forEach(function (dot, index) {
                dot.addEventListener('click', function () {
                    renderSlide(index);
                    startHeroTimer();
                });
            });
        }
    }

    if (statsSection) {
        const statCards = Array.from(statsSection.querySelectorAll('.group.text-center'));
        const statValues = statCards.map(function (card) {
            return card.querySelector('.font-serif');
        });
        const targets = [2500, 8, 2];
        let statsAnimated = false;

        function animateValue(node, target, suffix) {
            const start = performance.now();
            const duration = target > 100 ? 1600 : 900;

            function step(timestamp) {
                const progress = Math.min((timestamp - start) / duration, 1);
                const value = Math.round(target * progress);
                node.textContent = value + suffix;

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            }

            window.requestAnimationFrame(step);
        }

        const statsObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting || statsAnimated) {
                    return;
                }

                statsAnimated = true;
                statCards.forEach(function (card, index) {
                    card.style.opacity = '1';
                    card.style.animation = 'fadeInUp 0.6s ease-out ' + index * 120 + 'ms forwards';
                });

                statValues.forEach(function (node, index) {
                    if (!node) {
                        return;
                    }

                    animateValue(node, targets[index], index === 0 ? '+' : '');
                });

                statsObserver.disconnect();
            });
        }, { threshold: 0.3 });

        statsObserver.observe(statsSection);
    }

    const observerTargets = Array.from(document.querySelectorAll('[style*="opacity:0"]')).filter(function (element) {
        const insideHero = hero && hero.contains(element);
        const insideStats = statsSection && statsSection.contains(element);
        return !insideHero && !insideStats;
    });

    if (observerTargets.length) {
        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.style.opacity = '1';
                revealObserver.unobserve(entry.target);
            });
        }, { threshold: 0.15 });

        observerTargets.forEach(function (element) {
            revealObserver.observe(element);
        });
    }
});
