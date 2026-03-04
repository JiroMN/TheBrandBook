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

  //————— Hide/Show on scroll —————
  function showNav() {}

  function hideNav() {}

  lenis.on("scroll", () => {});

  //————— Link Hovers —————
  const links = nav.querySelectorAll("[data-nav-underline-link]");

  links.forEach((link) => {
    const underline = link.querySelector("[data-nav-underline-link-stroke]");

    link.addEventListener("mouseenter", function () {
      gsap.to(underline, {
        scaleX: 1,
        transformOrigin: "left center",
      });
    });
    link.addEventListener("mouseleave", function () {
      gsap.to(underline, {
        scaleX: 0,
        transformOrigin: "right center",
      });
    });
  });
}
