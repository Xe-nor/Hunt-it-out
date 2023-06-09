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
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  window.location.href = "/mobile.html";
} 

