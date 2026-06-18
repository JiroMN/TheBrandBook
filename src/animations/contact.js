export function initContactPage() {
  const page = document.querySelector("[data-contact-page]");

  // init Form

  // init CTA
  const backdrop = page.querySelector("[data-contact-cta-backdrop]");
  let tl = gsap.timeline({
    repeat: -1,
    defaults: { duration: 120, ease: "none" },
  });

  tl.to(backdrop, {
    rotate: 360,
  });
}
