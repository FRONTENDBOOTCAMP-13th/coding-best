const grid = document.querySelector(".gallery-masonry");
const items = document.querySelectorAll(".cat");

window.addEventListener("load", () => {
  items.forEach((item) => {
    const rowHeight = parseInt(
      window.getComputedStyle(item).getPropertyValue("height")
    );
    const rowSpan = Math.ceil(rowHeight / 10 + 1); // 10은 grid-gap, +1은 약간의 여유 공간
    item.style.gridRowEnd = `span ${rowSpan}`;
  });
});
