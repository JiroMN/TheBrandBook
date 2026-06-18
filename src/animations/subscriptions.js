// -----------------------------------------
// Subscription Toggle (standalone, herbruikbaar)
// -----------------------------------------
export function prepSubscriptionToggle(scope = document) {
  const prices = scope.querySelectorAll("[data-subscription-price-variant]");
  if (!prices) return;
  gsap.set(prices, {
    opacity: 100,
  });
}

export function initSubscriptionToggle(scope = document) {
  scope.querySelectorAll("[data-subscription-toggle-wrap]").forEach((wrap) => {
    const items = [...wrap.querySelectorAll("[data-subscription-toggle-item]")];
    if (items.length < 2) return;

    wrap.style.setProperty("--toggle-count", items.length);

    function setActive(index) {
      const value = items[index].dataset.subscriptionToggleItem;

      wrap.style.setProperty("--toggle-active", index);
      wrap.dataset.subscriptionToggleActive = value;

      const card = wrap.closest("[data-vsa-subscription-card]");
      if (card) {
        card.dataset.subscriptionToggleActive = value;

        // Toon/verberg price variants
        const activePrice = card.querySelector(
          `[data-subscription-price-variant="${value}"]`,
        );
        const otherPrices = card.querySelectorAll(
          `[data-subscription-price-variant]:not([data-subscription-price-variant="${value}"])`,
        );

        if (!activePrice || !otherPrices) return;

        let tl = gsap.timeline();
        tl.to(otherPrices, {
          yPercent: -101,
        }).fromTo(activePrice, { yPercent: 101 }, { yPercent: 0 }, "<50%");
      }

      items.forEach((item, i) => {
        item.toggleAttribute("data-subscription-toggle-active", i === index);
      });
    }

    items.forEach((item, i) => {
      item.addEventListener("click", () => setActive(i));
    });

    setActive(1);
  });
}

// -----------------------------------------
// VSA Subscription Card
// -----------------------------------------

function initVSASubscriptionCard() {
  document.querySelectorAll("[data-vsa-subscription-card]").forEach((card) => {
    // Luister naar toggle changes binnen deze card
    card.addEventListener("subscriptionToggleChange", (e) => {
      const { value } = e.detail;
      // Straks: update prijs, tekst, of andere elementen op basis van value
      // if (value === "driemaandelijks") { ... }
    });
  });

  initSubscriptionToggle();
}
