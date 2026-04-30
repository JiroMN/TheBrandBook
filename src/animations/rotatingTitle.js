const STEP = 4;
const SLIDE = 0.6;

export function initRotatingText() {
  document.querySelectorAll("[data-rotating-words]").forEach((rotator) => {
    // Parse comma-separated words
    const words = (rotator.dataset.rotatingWords || "")
      .split(",")
      .map((w) => w.trim())
      .filter(Boolean);
    if (words.length < 2) return;

    // Build two slots — we'll alternate between them
    rotator.textContent = "";
    const slotA = document.createElement("span");
    const slotB = document.createElement("span");
    slotA.className = "rt-slot";
    slotB.className = "rt-slot";
    rotator.appendChild(slotA);
    rotator.appendChild(slotB);

    let active = 0;
    let current = slotA;
    let incoming = slotB;

    // Initial state: first word visible, second slot waiting below
    current.textContent = words[active];
    gsap.set(current, { yPercent: 0, autoAlpha: 1 });
    gsap.set(incoming, { yPercent: 100, autoAlpha: 0 });
    rotator.style.width = current.offsetWidth + "px";

    function cycle() {
      // Move to next word
      active = (active + 1) % words.length;
      incoming.textContent = words[active];

      // Reveal incoming slot below the line and measure its natural width
      gsap.set(incoming, { yPercent: 100, autoAlpha: 1 });
      const targetWidth = incoming.offsetWidth;

      const out = current;
      const inc = incoming;

      gsap
        .timeline({
          defaults: { duration: SLIDE, ease: "power4.inOut" },
          onComplete: () => {
            // Reset old slot below the line for the next cycle
            gsap.set(out, { yPercent: 100, autoAlpha: 0 });
          },
        })
        // Animate wrapper width to the new word's width
        .to(rotator, { width: targetWidth }, 0)
        // Slide old word up and out
        .to(out, { yPercent: -100, autoAlpha: 0 }, 0)
        // Slide new word up and in
        .to(inc, { yPercent: 0 }, 0);

      // Swap roles for the next cycle
      current = inc;
      incoming = out;
    }

    // Loop forever with a fixed delay between cycles
    gsap.delayedCall(STEP, function loop() {
      cycle();
      gsap.delayedCall(STEP, loop);
    });

    // Recompute width when viewport changes (font-size / layout shifts)
    window.addEventListener("resize", () => {
      rotator.style.width = current.offsetWidth + "px";
    });
  });
}
