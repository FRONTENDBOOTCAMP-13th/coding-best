// nav
// 모든 네비게이션 버튼과 섹션 가져오기
const navItems = document.querySelectorAll(".home-nav");
const sections = document.querySelectorAll("section");

// 🔥 Intersection Observer 설정 (스크롤 시 활성화)
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const activeId = entry.target.id;

        // 모든 네비 버튼에서 active 클래스 제거
        navItems.forEach((nav) => nav.classList.remove("active"));

        // 현재 보이는 섹션과 연결된 네비 버튼에 active 추가
        const activeNav = document.querySelector(
          `.home-nav[data-target="${activeId}"]`
        );
        if (activeNav) {
          activeNav.classList.add("active");
        }
      }
    });
  },
  { root: null, rootMargin: "0px", threshold: 0.3 } // 30% 이상 보이면 감지
);

// 모든 섹션을 감지 대상으로 설정
sections.forEach((section) => observer.observe(section));

// 🔥 네비게이션 클릭 시 해당 섹션으로 이동 및 active 추가
navItems.forEach((navItem) => {
  navItem.addEventListener("click", function (event) {
    event.preventDefault(); // 기본 동작 방지

    // 기존 활성화된 버튼에서 active 클래스 제거
    navItems.forEach((item) => item.classList.remove("active"));

    // 현재 클릭된 버튼에 active 클래스 추가
    this.classList.add("active");

    // 해당 섹션으로 부드럽게 스크롤 이동
    const targetId = this.getAttribute("data-target");
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// gallery
document.addEventListener("DOMContentLoaded", () => {
  const galleryBox = document.querySelector(".gallery-box");
  const leftButton = document.querySelector(
    ".home-gallery-button-container .home-gallery-button:first-child"
  );
  const rightButton = document.querySelector(
    ".home-gallery-button-container .home-gallery-button:last-child"
  );

  if (!galleryBox || !leftButton || !rightButton) {
    console.error("갤러리 요소를 찾을 수 없습니다.");
    return;
  }

  let scrollAmount = 0;
  const itemWidth = 340; // 갤러리 아이템 한 개 크기 (여백 포함)
  const wrapperWidth = document.querySelector(".gallery-wrapper").clientWidth; // 한 번에 보이는 영역 크기
  const maxScroll = galleryBox.scrollWidth - wrapperWidth; // 최대 이동 가능 거리

  console.log("Max Scroll:", maxScroll); // 디버깅 용도

  rightButton.addEventListener("click", () => {
    if (scrollAmount < maxScroll) {
      scrollAmount += itemWidth * 2; // 한 번에 2개씩 이동
      if (scrollAmount > maxScroll) scrollAmount = maxScroll; // 최대 이동 제한
      galleryBox.style.transform = `translateX(-${scrollAmount}px)`;
    }
  });

  leftButton.addEventListener("click", () => {
    if (scrollAmount > 0) {
      scrollAmount -= itemWidth * 2; // 한 번에 2개씩 이동
      if (scrollAmount < 0) scrollAmount = 0; // 최소 이동 제한
      galleryBox.style.transform = `translateX(-${scrollAmount}px)`;
    }
  });
});
