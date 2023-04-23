window.addEventListener("scroll", (e) => {
  document.documentElement.style.setProperty(
    "--scrollTop",
    `${this.scrollY}px`
  ); // Update method
});
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
ScrollSmoother.create({
  wrapper: ".wrapper",
  content: ".content",
});
if (
  navigator.platform.indexOf("Win") > -1 ||
  navigator.platform.indexOf("Mac") > -1
) {
  window.location.href = "/index.html";
}
