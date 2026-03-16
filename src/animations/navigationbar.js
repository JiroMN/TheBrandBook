export function initNavigationbar() {
  const navWrap = document.querySelector("[data-nav-wrap]");
  const nav = navWrap.querySelector("[data-nav-bar]");
  const marquee = navWrap.querySelector("[data-nav-marquee]");

  let hasPlayedInitialAnimation = false;

  const marqueeIsVisible = navWrap.getAttribute("data-marquee-visible")
    ? true
    : false;

  function showMarquee() {
    gsap.to(marquee, {
      yPercent: 0,
      autoAlpha: 1,
      onComplete: () => navWrap.setAttribute("data-marquee-visible", ""),
    });
  }
  function hideMarquee() {
    gsap.to(marquee, {
      yPercent: -50,
      autoAlpha: 0,
      onComplete: () => navWrap.removeAttribute("data-marquee-visible"),
    });
  }

  let tl = gsap.timeline({
    delay: 0.8,
    onComplete: () => (hasPlayedInitialAnimation = true),
  });

  tl.set(marquee, {
    yPercent: -50,
    autoAlpha: 0,
  })
    .add(() => showMarquee())
    .add(() => hideMarquee(), ">5");

  navWrap.addEventListener("mouseenter", function () {
    if (!hasPlayedInitialAnimation || marqueeIsVisible) return;
    showMarquee();
  });
  navWrap.addEventListener("mouseleave", function () {
    if (!hasPlayedInitialAnimation) return;
    hideMarquee();
  });
}
