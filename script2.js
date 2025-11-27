function toggle(el) {
  const open = el.classList.contains("open");
  if (open) {
    el.classList.remove("open");
    el.setAttribute("aria-pressed", "false");
  } else {
    el.classList.add("open");
    el.setAttribute("aria-pressed", "true");

    const ta = el.querySelector(".editarea");
    if (ta) {
      ta.style.display = "block";
      ta.focus();
    }
  }
}

document.addEventListener("touchstart", function () {}, { passive: true });
