(() => {
  // Встав сюди посилання, яке має відкривати кнопка "Join CTRL ALT NIGHT".
  // Приклад: const JOIN_ARENA_URL = "https://example.com/register";
  const JOIN_ARENA_URL = "";

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
