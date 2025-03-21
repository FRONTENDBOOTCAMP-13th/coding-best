document.addEventListener("DOMContentLoaded", () => {
  const bodyWrapper = document.querySelector(".body-wrapper");
  const pages = document.querySelectorAll(".page");
  const navItems = document.querySelectorAll("header nav ul li");
  const navLinks = document.querySelectorAll("header nav ul li a");

  let currentPageIndex = 0;
  let isScrolling = false;

  // ✅ 새로고침 시 첫 번째 페이지 강제 표시
  function initPage() {
    bodyWrapper.classList.add("show-page-1");
    pages[0].style.opacity = "1";
    pages[0].style.pointerEvents = "auto";
    pages[0].style.visibility = "visible";
  }

  // 페이지 전환 함수
  function showPage(index) {
    if (index < 0 || index >= pages.length) return;

    for (let i = 1; i <= pages.length; i++) {
      bodyWrapper.classList.remove(`show-page-${i}`);
    }
    bodyWrapper.classList.add(`show-page-${index + 1}`);

    // 첫 페이지가 아닌 경우 나머지 숨기기
    pages.forEach((page, idx) => {
      if (idx === index) {
        page.style.opacity = "1";
        page.style.pointerEvents = "auto";
        page.style.visibility = "visible";
      } else {
        page.style.opacity = "0";
        page.style.pointerEvents = "none";
        page.style.visibility = "hidden";
      }
    });

    currentPageIndex = index;

    // 메뉴 활성화 상태 업데이트
    navItems.forEach((li, liIndex) => {
      li.classList.toggle("active", liIndex === index);
    });
  }

  // 초기화 실행
  initPage();

  // 스크롤 이벤트 추가 (그대로 유지)
  window.addEventListener("wheel", (event) => {
    if (isScrolling) return;

    const target = event.target.closest(".page");
    const isMobile = window.innerWidth <= 768;

    if (isMobile && target && target.scrollHeight > target.clientHeight) {
      const scrollTop = target.scrollTop;
      const scrollBottom = scrollTop + target.clientHeight;
      const scrollingDown = event.deltaY > 0;
      const scrollingUp = event.deltaY < 0;

      if (scrollingDown && scrollBottom < target.scrollHeight) return;
      if (scrollingUp && scrollTop > 0) return;
    }

    isScrolling = true;

    if (event.deltaY > 0 && currentPageIndex < pages.length - 1) {
      currentPageIndex++;
    } else if (event.deltaY < 0 && currentPageIndex > 0) {
      currentPageIndex--;
    }

    showPage(currentPageIndex);

    setTimeout(() => {
      isScrolling = false;
    }, 800);
  });

  // 메뉴 클릭 이벤트 추가
  navLinks.forEach((link, index) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      showPage(index);
    });
  });

  // 페이지 초기 표시
  showPage(currentPageIndex);
});
