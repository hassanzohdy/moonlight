export function scrollTop() {
  const scrollOptions: ScrollToOptions = { behavior: "smooth" };

  scrollOptions.top = 0;

  window.scrollTo(scrollOptions);
}

export function scrollTo(element: HTMLElement) {
  const scrollOptions: ScrollToOptions = { behavior: "smooth" };

  scrollOptions.top = 0;

  element.scrollIntoView(scrollOptions);
}
