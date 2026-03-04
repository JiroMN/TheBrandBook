gsap.registerPlugin(ScrollTrigger);
export function initHeroShowcaseScroll() {
  const page = document.querySelector("main");
  const container = document.querySelector("[data-hero-showcase]");
  const backdrop = container.querySelector("[data-hero-showcase-backdrop]");

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: page,
      start: "clamp(top top)",
      end: "clamp(bottom top)",
      scrub: true,
    },
  });

  tl.to(backdrop, { yPercent: 50, ease: "none" });
}
