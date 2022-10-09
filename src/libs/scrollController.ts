/* Scroll不可 */
export const scrollDisable = () => {
  document.addEventListener(
    'mousewheel',
    (event: Event) => {
      event.preventDefault();
    },
    { passive: false }
  ); // PC
  document.addEventListener(
    'touchmove',
    (event: Event) => {
      event.preventDefault();
    },
    { passive: false }
  ); // SP
};

/* Scroll可 */
export const scrollable = () => {
  document.removeEventListener(
    'mousewheel',
    (event: Event) => {
      event.preventDefault();
    },
    { capture: false }
  ); // PC
  document.removeEventListener(
    'touchmove',
    (event: Event) => {
      event.preventDefault();
    },
    { capture: false }
  ); // SP
};
