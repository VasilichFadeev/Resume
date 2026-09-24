const bg = document.querySelector(".bg");
const bgBlur = document.querySelector(".bg--blur");
const bgSolid = document.querySelector(".bg--solid");
const text = document.querySelector(".greeting-text");
const blur = document.querySelector(".greeting-blur");
const hint = document.querySelector(".scroll-hint");
const aboutTitle = document.querySelector(".about-title");
const aboutSection = document.getElementById("section-1");

let ticking = false;
let idleTimer = null;
let vh = window.innerHeight;

function update() {
  const progress = Math.min(window.scrollY / vh, 1);

  bgBlur.style.opacity = progress;

  const solidProgress = Math.min(Math.max((window.scrollY - vh) / vh, 0), 1);
  bgSolid.style.opacity = solidProgress;

  text.style.opacity = 1 - progress;
  blur.style.opacity = 1 - progress;

  const paused = progress >= 1;

  text.style.animationPlayState = paused ? "paused" : "running";
  blur.style.animationPlayState = paused ? "paused" : "running";

  updateAbout();

  ticking = false;
}

function updateAbout() {
  const rect = aboutSection.getBoundingClientRect();

  const progress = Math.min(Math.max((vh - rect.top) / vh, 0), 1);

  const contrast = 1 - progress * 0.7;

  aboutTitle.style.setProperty("--contrast", contrast);
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
