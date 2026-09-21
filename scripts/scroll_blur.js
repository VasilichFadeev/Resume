const bg = document.querySelector(".bg");
const bgBlur = document.querySelector(".bg--blur");
const text = document.querySelector(".greeting-text");
const blur = document.querySelector(".greeting-blur");
const hint = document.querySelector(".scroll-hint");

let ticking = false;
let idleTimer = null;
let vh = window.innerHeight;

function update() {
  const progress = Math.min(window.scrollY / vh, 1);

  bgBlur.style.opacity = progress;

  text.style.opacity = 1 - progress;
  blur.style.opacity = 1 - progress;

  const paused = progress >= 1;

  text.style.animationPlayState = paused ? "paused" : "running";
  blur.style.animationPlayState = paused ? "paused" : "running";

  ticking = false;
}

function onScroll() {
  if (!ticking) {
    requestAnimationFrame(update);
    ticking = true;
  }

  hint.classList.add("hidden");

  clearTimeout(idleTimer);

  idleTimer = setTimeout(() => {
    hint.classList.remove("hidden");
  }, 500);
}

window.addEventListener("scroll", onScroll, {
  passive: true,
});

window.addEventListener("resize", () => {
  vh = window.innerHeight;
  update();
});

update();
