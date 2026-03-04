import { getVariableValue } from "../helpers/helpers";

export function initButtonA() {
  const button = document.querySelectorAll("[data-button-a]");
  button.forEach((btn) => {
    const textOriginal = btn.querySelector(".button__h:not(.clone)");
    const textClone = btn.querySelector(".button__h.clone");
    const bg = btn.querySelector(".button__bg");
    const initialBorderRadius = btn.getAttribute("data-button-border-radius");
    const initialBorderRadiusValue = getVariableValue(
      `--_sizes---radius--${initialBorderRadius}`,
    );

    let splitOriginal = SplitText.create(textOriginal, {
      type: "chars",
    });
    let splitClone = SplitText.create(textClone, {
      type: "chars",
    });

    btn.addEventListener("mouseenter", function () {
      let tl = gsap.timeline({ defaults: { duration: 0.6 } });

      tl.to(bg, {
        scaleX: 1.1,
        borderRadius: "99px",
      })
        .fromTo(
          splitOriginal.chars,
          {
            yPercent: 0,
          },
          {
            yPercent: -110,
            stagger: 0.03,
          },
          0,
        )
        .fromTo(
          splitClone.chars,
          { yPercent: 110 },
          { yPercent: 0, stagger: 0.03 },
          0,
        );
    });
    btn.addEventListener("mouseleave", function () {
      gsap.to(bg, {
        scaleX: 1,
        borderRadius: "0" + initialBorderRadiusValue,
      });
    });
  });
}
