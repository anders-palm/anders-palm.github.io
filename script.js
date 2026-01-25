/* Kontekst för ChatGPT: Denna fil är del av en undervisningswebbsida för DNA/meningsbygge. */

const selected = {};

// När DOM är redo
window.addEventListener("DOMContentLoaded", () => {
    // Dynamisk färgkodning
    const root = document.documentElement;
    const colorList = getComputedStyle(root).getPropertyValue('--section-colors').split(',').map(c => c.trim());
    const sectionKeys = Object.keys(sections);
    sectionKeys.forEach((key, i) => {
      // Sätt CSS-variabel för varje sektion
      root.style.setProperty(`--color-${key}`, colorList[i % colorList.length]);
    });
  const sectionsContainer = document.getElementById("sections-container");
  const resultRow = document.getElementById("result-row");

  Object.entries(sections).forEach(([key, data]) => {
    selected[key] = null;

    const container = document.createElement("div");
    container.className = "section";
    container.dataset.section = key;
    container.style.display = "flex";
    container.style.flexDirection = "row";
    container.style.alignItems = "center";
    container.style.gap = "var(--section-gap)";

    data.words.forEach((word, i) => {
      const btn = document.createElement("button");
      btn.className = `section-btn btn-${key}`;
      btn.textContent = `${key}${i + 1}`;
      btn.title = word;
      btn.setAttribute("aria-pressed", "false");
      btn.setAttribute("data-section", key);
      btn.style.border = `2px solid var(--color-${key})`;
      btn.addEventListener("click", () => handleClick(key, i, btn));
      container.appendChild(btn);
    });

    sectionsContainer.appendChild(container);
  });

  updateResultRow();
});

function handleClick(section, index, btn) {
  const container = btn.parentElement;
  [...container.children].forEach(b => {
    b.classList.remove("selected");
    b.setAttribute("aria-pressed", "false");
    b.style.background = "#eee";
    b.style.color = "var(--color-neutral)";
  });

  if (selected[section] === index) {
    selected[section] = null;
  } else {
    btn.classList.add("selected");
    btn.setAttribute("aria-pressed", "true");
    selected[section] = index;
    btn.style.background = `var(--color-${section})`;
    btn.style.color = "#fff";
  }

  animateButton(btn);
  updateResultRow();
}

function animateButton(btn) {
  btn.style.filter = "brightness(1.15)";
  setTimeout(() => btn.style.filter = "brightness(1)", 180);
}

function updateResultRow() {
  const resultRow = document.getElementById("result-row");
  resultRow.innerHTML = "";

  Object.keys(sections).forEach(section => {
    const idx = selected[section];
    if (idx === null) return;
    const box = document.createElement("div");
    box.className = `result-box ${section}`;
    box.textContent = sections[section].words[idx];
    box.style.background = `var(--color-${section})`;
    resultRow.appendChild(box);
  });
}
