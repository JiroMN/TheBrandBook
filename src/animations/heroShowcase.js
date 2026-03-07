export function initHeroShowcaseScroll() {
  const page = document.querySelector("main");
  const hero = document.querySelector("[data-hero]");
  const container = document.querySelector("[data-hero-showcase]");
  const backdrop = container.querySelector("[data-hero-showcase-backdrop]");
  const image = document.querySelector("[data-hero-showcase-img]");

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: "clamp(top top)",
      end: "clamp(bottom top)",
      scrub: true,
    },
    defaults: {
      ease: "none",
    },
  });

  tl.to(backdrop, { yPercent: 40 }).fromTo(
    image,
    { yPercent: 7 },
    { yPercent: -7 },
    "<",
  );
}
