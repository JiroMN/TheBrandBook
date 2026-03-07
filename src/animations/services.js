function getRotation(direction) {
  return direction === "right" ? -10 : 10;
}

export function initServicesIntro() {
  const intro = document.querySelector("[data-services-intro]");
  const text = intro.querySelector("[data-services-intro-h]");

  new SplitText(text, {
    type: "chars, words, lines",
    linesClass: "services-intro__h-line",
    mask: "lines",
    autoSplit: true,
    onSplit: (self) => {
      let appearTimeline = gsap.timeline({
        defaults: { ease: "osmo", duration: 1.2 },
        scrollTrigger: {
          trigger: text,
          start: "20% 75%",
          end: "center 40%",
          scrub: true,
        },
      });

      appearTimeline.from(self.words, {
        yPercent: 110,
        stagger: 0.05,
      });

      let scrollingTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: text,
          start: "50% 75%",
          end: "center 40%",
          scrub: true,
        },
      });

      scrollingTimeline.fromTo(
        self.chars,
        { autoAlpha: 0.15 },
        { autoAlpha: 1, stagger: 0.05 },
      );
    },
  });
}

export function initStackingServices() {
  const services = document.querySelectorAll("[data-service-item]");

  if (services.length < 2) return;

  services.forEach((service, index) => {
    service.style.zIndex = index * 10;

    if (index === 0) return;

    const previousService = services[index - 1];
    const previousCard = previousService.querySelector("[data-service-card]");
    const previousMarquee = previousService.querySelector(
      "[data-service-marquee]",
    );

    const tlDefaults = {
      ease: "none",
      duration: 2,
    };

    let sectionTimeline = gsap.timeline({
      defaults: tlDefaults,
      scrollTrigger: {
        trigger: service,
        start: "top+=10% bottom",
        end: "end end",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    let sectionContentTimeline = gsap.timeline({
      defaults: tlDefaults,
      scrollTrigger: {
        trigger: service,
        start: "top-=25% bottom+=10%",
        end: "end center",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    sectionTimeline.fromTo(previousService, { yPercent: 0 }, { yPercent: 50 });

    if (previousCard) {
      const rotation = getRotation(previousCard.dataset.serviceCardDirection);

      sectionContentTimeline
        .from(previousCard, { rotate: rotation }, 0)
        .fromTo(previousCard, { yPercent: 15 }, { yPercent: -15 }, 0)
        .fromTo(previousMarquee, { yPercent: 0 }, { yPercent: -300 }, 0);
    }

    if (index === services.length - 1) {
      const currentCard = service.querySelector("[data-service-card]");
      if (currentCard) {
        const rotation = getRotation(currentCard.dataset.serviceCardDirection);

        gsap
          .timeline({
            defaults: tlDefaults,
            scrollTrigger: {
              trigger: service,
              start: "top-=25% bottom+=10%",
              end: "end end",
              scrub: true,
              invalidateOnRefresh: true,
            },
          })
          .from(currentCard, { rotate: rotation }, 0)
          .fromTo(currentCard, { yPercent: 15 }, { yPercent: 0 }, 0);
      }
    }
  });
}
