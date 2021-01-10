const scrollToElement = (element) => {
  const y = element.getBoundingClientRect().top + window.pageYOffset + 1;
  window.scrollTo({ top: y, behavior: "smooth" });
};

export default scrollToElement;
