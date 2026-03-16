import { getVariableValue } from "../helpers/helpers";

export function initButton() {
  const button = document.querySelectorAll("[data-button]");
  button.forEach((btn) => {
    const textOriginal = btn.querySelector("[data-button-h='default']");
    const textClone = btn.querySelector("[data-button-h='clone']");
    const bg = btn.querySelector("[data-button-bg]");
    const initialBorderRadius = btn.getAttribute("data-button-border-radius");
    const initialBorderRadiusValue = getVariableValue(
      `--_sizes---radius--${initialBorderRadius}`,
    );

    let splitOriginal = SplitText.create(textOriginal, {
      type: "lines",
      mask: "lines",
    });
    let splitClone = SplitText.create(textClone, {
      type: "lines",
      mask: "lines",
    });

    btn.addEventListener("mouseenter", function () {
      let tl = gsap.timeline({ defaults: { duration: 0.7 } });
      tl.to(bg, {
        scaleX: 1.1,
        borderRadius: bg.offsetWidth / 2 + "px",
      })
        .fromTo(
          splitOriginal.lines,
          {
            yPercent: 0,
          },
          {
            yPercent: -110,
            stagger: 0.03,
            duration: 0.45,
          },
          0,
        )
        .fromTo(
          splitClone.lines,
          { yPercent: 110 },
          { yPercent: 0, stagger: 0.03, duration: 0.45 },
          0,
        );
    });
    btn.addEventListener("mouseleave", function () {
      gsap.to(bg, {
        scaleX: 1,
        borderRadius: initialBorderRadiusValue,
      });
    });
  });
}

export function initPillButton() {
  const buttons = document.querySelectorAll("[data-pill-button]");

  buttons.forEach((btn) => {
    const textWrap = btn.querySelector("[data-pill-button-text-wrap]");
    const textBg = btn.querySelector("[data-pill-button-text-bg]");
    const text = btn.querySelector("[data-pill-button-text]");

    const iconWrap = btn.querySelector("[data-pill-button-icon-wrap]");
    const iconBg = btn.querySelector("[data-pill-button-icon-bg]");
    const icon = btn.querySelector("[data-pill-button-icon]");
    const iconArrowStem = btn.querySelector(
      "[data-pill-button-icon-arrow-stem]",
    );

    let isAnimating = false;

    const fullTextBgRadius = textBg.offsetWidth / 2 + "px";
    const fullIconBgRadius = iconBg.offsetWidth / 2 + "px";

    function hoverIn() {
      let tl = gsap.timeline({
        defaults: { duration: 0.4 },
        onStart: () => (isAnimating = true),
        onComplete: () => (isAnimating = false),
      });

      tl.to(textBg, {
        borderTopRightRadius: "0px",
        borderBottomRightRadius: "0px",
      })
        .to(
          iconBg,
          {
            borderTopLeftRadius: "0px",
            borderBottomLeftRadius: "0px",
          },
          "<",
        )
        .to(
          icon,
          {
            xPercent: -50,
          },
          "<50%",
        )
        .to(
          iconArrowStem,
          {
            scaleX: 2,
            transformOrigin: "right center",
          },
          "<",
        );
    }

    function hoverOut() {
      let tl = gsap.timeline({
        defaults: { duration: 0.4 },
        onStart: () => (isAnimating = true),
        onComplete: () => (isAnimating = false),
      });

      tl.to(textBg, {
        borderRadius: fullTextBgRadius,
      })
        .to(
          iconBg,
          {
            borderRadius: fullIconBgRadius,
          },
          "<",
        )
        .to(
          icon,
          {
            xPercent: 0,
          },
          "<50%",
        )
        .to(
          iconArrowStem,
          {
            scaleX: 1,
            transformOrigin: "right center",
          },
          "<",
        );
    }

    btn.addEventListener("mouseenter", function () {
      hoverIn();
    });
    btn.addEventListener("mouseleave", function () {
      hoverOut();
    });
  });
}

export function initLinkButton() {
  //————— Link Hovers —————
  const links = document.querySelectorAll("[data-nav-underline-link]");

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
