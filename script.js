(() => {
  // Встав сюди посилання, яке має відкривати кнопка "Join CTRL ALT NIGHT".
  // Приклад: const JOIN_ARENA_URL = "https://example.com/register";
  const JOIN_ARENA_URL = "https://t.me/citd_lpnu_bot?start=join_arena";

  const joinArenaButton = document.getElementById("joinArenaButton");
  if (!joinArenaButton) return;

  const targetUrl = JOIN_ARENA_URL.trim();
  if (!targetUrl) return;

  joinArenaButton.href = targetUrl;

  const isExternalUrl = /^https?:\/\//i.test(targetUrl);
  if (isExternalUrl) {
    joinArenaButton.target = "_blank";
    joinArenaButton.rel = "noopener noreferrer";
  } else {
    joinArenaButton.removeAttribute("target");
    joinArenaButton.removeAttribute("rel");
  }
})();

(() => {
  const rulesGrid = document.querySelector(".rules-grid");
  if (!rulesGrid) return;

  const rule1 = rulesGrid.querySelector(".rule-1");
  const rule2 = rulesGrid.querySelector(".rule-2");
  const rule3 = rulesGrid.querySelector(".rule-3");
  const rule4 = rulesGrid.querySelector(".rule-4");
  if (!rule1 || !rule2 || !rule3 || !rule4) return;

  const changedClass = "rules-grid--changed";
  const setChangedState = (isChanged) => {
    rulesGrid.classList.toggle(changedClass, isChanged);
  };

  const bindSwitch = (element, isChanged) => {
    element.addEventListener(
      "pointerenter",
      () => {
        setChangedState(isChanged);
      },
      { passive: true }
    );

    element.addEventListener("focusin", () => {
      setChangedState(isChanged);
    });

    element.addEventListener("click", () => {
      setChangedState(isChanged);
    });
  };

  bindSwitch(rule1, false);
  bindSwitch(rule4, false);
  bindSwitch(rule2, true);
  bindSwitch(rule3, true);
})();

(() => {
  const sectionIds = new Set(["rounds", "rules", "schedule", "prizes", "join"]);

  const getTargetByHash = (hash) => {
    if (!hash || !hash.startsWith("#")) return null;
    const id = decodeURIComponent(hash.slice(1));
    if (!sectionIds.has(id)) return null;
    return document.getElementById(id);
  };

  const getScrollTopForTarget = (target) => {
    const rect = target.getBoundingClientRect();
    const targetTop = window.scrollY + rect.top;
    const targetHeight = rect.height;
    const viewportHeight = window.innerHeight;
    const header = document.querySelector(".site-header");
    const headerHeight = header ? header.offsetHeight : 0;
    const topGap = headerHeight + Math.max(12, Math.round(viewportHeight * 0.03));

    let nextTop;
    if (targetHeight <= viewportHeight) {
      // Small section: center it in viewport.
      nextTop = targetTop - (viewportHeight - targetHeight) / 2;
    } else {
      // Tall section: place start a bit below viewport top.
      nextTop = targetTop - topGap;
    }

    const maxTop = Math.max(
      0,
      document.documentElement.scrollHeight - viewportHeight
    );
    return Math.min(maxTop, Math.max(0, Math.round(nextTop)));
  };

  const scrollToHashTarget = (hash, behavior = "smooth") => {
    const target = getTargetByHash(hash);
    if (!target) return;
    window.scrollTo({
      top: getScrollTopForTarget(target),
      behavior,
    });
  };

  document.addEventListener("click", (event) => {
    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor) return;
    const hash = anchor.getAttribute("href");
    if (!hash || hash === "#top" || hash === "#") return;

    const target = getTargetByHash(hash);
    if (!target) return;

    event.preventDefault();
    if (window.location.hash !== hash) {
      history.pushState(null, "", hash);
    }
    scrollToHashTarget(hash, "smooth");
  });

  window.addEventListener("popstate", () => {
    scrollToHashTarget(window.location.hash, "smooth");
  });

  const initFromHash = () => {
    scrollToHashTarget(window.location.hash, "auto");
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFromHash, { once: true });
  } else {
    initFromHash();
  }
})();
