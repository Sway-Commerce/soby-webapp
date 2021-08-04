export function isScrollToTheBottom(event) {
  return (
      event.target.scrollHeight - (Math.round(event.target.scrollTop) + event.target.offsetHeight) < 100
  );
}