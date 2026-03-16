export function initFooterParallex() {
  const footer = document.querySelectorAll("[data-footer]");

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: footer,
      start: "clamp(top bottom)",
      end: "clamp(end end)",
      scrub: true,
    },
  });

  tl.from(footer, {
    yPercent: -100,
    ease: "none",
  });
}
