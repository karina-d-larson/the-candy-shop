export function setupSearchFocus() {
  document.querySelectorAll("[data-search-input]").forEach((searchInput) => {
    searchInput.addEventListener("focus", () => {
      searchInput.parentElement?.classList.add("search-box--focused");
    });

    searchInput.addEventListener("blur", () => {
      searchInput.parentElement?.classList.remove("search-box--focused");
    });
  });
}

export function setupCrosshatchParallax() {
  document.addEventListener("mousemove", (event) => {
    const crosshatches = document.querySelectorAll(".wireframe-crosshatch");
    const x = event.clientX / window.innerWidth;
    const y = event.clientY / window.innerHeight;

    crosshatches.forEach((element) => {
      element.style.backgroundPosition = `${x * 10}px ${y * 10}px`;
    });
  });
}

export function setupButtonPress() {
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("mousedown", () => {
      button.style.transform = "translateY(1px)";
    });

    button.addEventListener("mouseup", () => {
      button.style.transform = "";
    });
  });
}

export function setupFormLabelFocus() {
  document.querySelectorAll("input, textarea, select").forEach((element) => {
    element.addEventListener("focus", () => {
      const label = element.parentElement?.querySelector("label");
      if (label) label.style.color = "#430d6e";
    });

    element.addEventListener("blur", () => {
      const label = element.parentElement?.querySelector("label");
      if (label) label.style.color = "#4c4450";
    });
  });
}

export function setupFavoriteCardHover() {
  document.querySelectorAll(".favorite-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      const image = card.querySelector("img");
      if (image) image.style.transform = "scale(1.05)";
    });

    card.addEventListener("mouseleave", () => {
      const image = card.querySelector("img");
      if (image) image.style.transform = "scale(1)";
    });
  });
}
