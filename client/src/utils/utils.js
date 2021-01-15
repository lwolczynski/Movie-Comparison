import smoothscroll from "smoothscroll-polyfill";

// Smoothscroll used, as { behavior: smooth } attribute is not supported on iPhone
smoothscroll.polyfill();

const scrollToElement = (element) => {
  const y = element.getBoundingClientRect().top + window.pageYOffset + 1; // 1px added to start view just under the top border
  window.scrollTo({ top: y, behavior: "smooth" });
};

export default scrollToElement;
