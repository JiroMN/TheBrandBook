export function initAutoPlayBenefits() {
  const wrappers = document.querySelectorAll("[data-benefits]");
  const inactiveFilter = "grayscale(1) brightness(0.55) invert(0%)";
  const activeFilter = "grayscale(0) brightness(1) invert(0%)";
  const inactiveOpacity = 0.4;
  const activeOpacity = 1;

  wrappers.forEach((section) => {
    const contentWrap = section.querySelector("[data-benefits-list-wrap]");
    const contentItems = contentWrap.querySelectorAll(
      "[data-benefits-list-item]",
    );
    const backdropWrap = section.querySelector("[data-benefits-backdrops]");
    const backdrops = backdropWrap.querySelectorAll("[data-benefits-backdrop]");
    const visualWrap = section.querySelector("[data-benefits-showcases]");
    const visuals = visualWrap.querySelectorAll("[data-benefits-showcase]");

    const autoplayDuration = 5000;
    let activeContent = null;
    let activeVisual = null;
    let activeBackdrop = null;
    let isAnimating = false;
    let progressBarTween = null;

    gsap.set(visuals, { autoAlpha: 0, xPercent: 3 });
    gsap.set(backdrops, { autoAlpha: 0 });
    gsap.set(visuals[0], { autoAlpha: 1, xPercent: 0 });
    gsap.set(backdrops[0], { autoAlpha: 1 });

    function startProgressBar(index) {
      if (progressBarTween) progressBarTween.kill();
      const bar = contentItems[index].querySelector(
        "[data-benefits-progress-inner]",
      );
      if (!bar) return;

      gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
      progressBarTween = gsap.to(bar, {
        scaleX: 1,
        duration: autoplayDuration / 1000,
        onComplete: () => {
          if (!isAnimating) {
            const nextIndex = (index + 1) % contentItems.length;
            switchTab(nextIndex);
          }
        },
      });
    }

    function switchTab(index) {
      if (isAnimating || contentItems[index] === activeContent) return;

      isAnimating = true;
      if (progressBarTween) progressBarTween.kill();

      const outgoingContent = activeContent;
      const outgoingVisual = activeVisual;
      const outgoingBackdrop = activeBackdrop;
      const outgoingBar = outgoingContent?.querySelector(
        "[data-benefits-progress-inner]",
      );

      const incomingContent = contentItems[index];
      const incomingVisual = visuals[index];
      const incomingBackdrop = backdrops[index];
      const incomingBar = incomingContent.querySelector(
        "[data-benefits-progress-inner]",
      );
      const incomingDetails = incomingContent.querySelector(
        "[data-benefits-list-item-p]",
      );

      console.log(incomingBackdrop);

      contentItems.forEach((item, i) => {
        if (i !== index) {
          gsap.set(item, {
            filter: inactiveFilter,
            autoAlpha: inactiveOpacity,
          });
        }
      });

      const tl = gsap.timeline({
        defaults: { duration: 0.65, ease: "power3" },
        onComplete: () => {
          activeContent = incomingContent;
          activeVisual = incomingVisual;
          activeBackdrop = incomingBackdrop;
          isAnimating = false;
          startProgressBar(index);
        },
      });

      if (outgoingContent) {
        if (outgoingBar) {
          tl.set(outgoingBar, { transformOrigin: "right center" }).to(
            outgoingBar,
            { scaleX: 0, duration: 0.3 },
            0,
          );
        }
        tl.to(
          outgoingContent,
          {
            filter: inactiveFilter,
            autoAlpha: inactiveOpacity,
          },
          0,
        );
        if (outgoingVisual) {
          tl.to(outgoingVisual, { autoAlpha: 0, xPercent: 3 }, 0);
        }
        const outgoingDetails = outgoingContent.querySelector(
          "[data-benefits-list-item-p]",
        );
        if (outgoingDetails) {
          tl.to(outgoingDetails, { height: 0, paddingTop: 0 }, 0);
        }
        if (outgoingBackdrop) {
          tl.to(outgoingBackdrop, { autoAlpha: 0 }, 0);
        }
      }

      if (incomingVisual) {
        tl.fromTo(
          incomingVisual,
          { autoAlpha: 0, xPercent: 3 },
          { autoAlpha: 1, xPercent: 0 },
          0.3,
        );
      }
      if (incomingBackdrop) {
        tl.fromTo(
          incomingBackdrop,
          { autoAlpha: 0 },
          { autoAlpha: 1, overwrite: true },
          0,
        );
      }
      tl.fromTo(
        incomingContent,
        {
          filter: inactiveFilter,
          autoAlpha: inactiveOpacity,
        },
        {
          filter: activeFilter,
          autoAlpha: activeOpacity,
        },
        0,
      );
      if (incomingDetails) {
        tl.set(
          incomingDetails,
          {
            paddingTop: 10,
          },
          0,
        ).fromTo(incomingDetails, { height: 0 }, { height: "auto" }, 0);
      }
      if (incomingBar) {
        tl.set(incomingBar, { scaleX: 0, transformOrigin: "left center" }, 0);
      }
    }

    ScrollTrigger.create({
      trigger: section,
      start: "clamp(top+=100px bottom)",
      onEnter: () => switchTab(0),
    });

    contentItems.forEach((item, i) => {
      item.addEventListener("click", function () {
        if (item === activeContent) return;
        switchTab(i);
      });
    });
  });
}
