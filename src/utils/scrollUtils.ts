/**
 * Scrolls the window to the top of the page.
 * @param smooth Whether to use smooth scrolling behavior (default: true)
 */
export const scrollToTop = (smooth: boolean = true) => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: smooth ? 'smooth' : 'auto'
  });
};

/**
 * Scrolls to a specific element on the page.
 * @param elementId The ID of the element to scroll to
 * @param smooth Whether to use smooth scrolling behavior (default: true)
 * @param offset Optional offset from the top of the element in pixels
 */
export const scrollToElement = (elementId: string, smooth: boolean = true, offset: number = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: smooth ? 'smooth' : 'auto'
    });
  }
};
