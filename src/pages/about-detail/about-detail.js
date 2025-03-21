document.addEventListener("DOMContentLoaded", () => {
  const bodyWrapper = document.querySelector(".body-wrapper");
  const pages = document.querySelectorAll(".page");
  const navItems = document.querySelectorAll("header nav ul li");
  const navLinks = document.querySelectorAll("header nav ul li a");

  let currentPageIndex = 0;
  let isScrolling = false;

  // 페이지 전환 함수
  function showPage(index) {
    if (index < 0 || index >= pages.length) return;

    // 페이지 상태 클래스 갱신
    for (let i = 1; i <= pages.length; i++) {
      bodyWrapper.classList.remove(`show-page-${i}`);
    }
    bodyWrapper.classList.add(`show-page-${index + 1}`);
    currentPageIndex = index;

    // header 메뉴 강조 업데이트
    navItems.forEach((li, liIndex) => {
      li.classList.toggle("active", liIndex === index);
    });
  }

  function canGoToNextPage() {
    const currentPage = pages[currentPageIndex];

    if (window.innerWidth <= 768) {
      // 현재 페이지 내부 전체 높이 기준으로 비교
      const scrollBottom = currentPage.scrollTop + currentPage.clientHeight;
      return scrollBottom >= currentPage.scrollHeight - 10;
    }

    return true;
  }

  // 휠로 페이지 넘김
  window.addEventListener("wheel", (event) => {
    if (isScrolling) return;
    // 내부 스크롤 가능한 영역에 휠 이벤트가 발생했는지 확인
    const target = event.target.closest(".page");
    const isMobile = window.innerWidth <= 768;

    // 모바일이고 내부에서 스크롤 중이라면, window 휠 막기
    if (isMobile && target && target.scrollHeight > target.clientHeight) {
      const scrollTop = target.scrollTop;
      const scrollBottom = scrollTop + target.clientHeight;

      const scrollingDown = event.deltaY > 0;
      const scrollingUp = event.deltaY < 0;

      // 아래로 스크롤 시, 아직 다 안 내려갔다면 무시 (페이지 전환 방지)
      if (scrollingDown && scrollBottom < target.scrollHeight) {
        return; // 내부에서 더 스크롤할 게 있음
      }

      // 위로 스크롤 시, 아직 위에 더 남았다면 무시
      if (scrollingUp && scrollTop > 0) {
        return; // 내부에서 더 위로 스크롤할 게 있음
      }
    }
    isScrolling = true;

    // 다음 페이지로 넘어갈 때 조건 추가
    if (event.deltaY > 0 && currentPageIndex < pages.length - 1) {
      if (!canGoToNextPage()) {
        isScrolling = false;
        return; // 아직 끝까지 스크롤 안 했으면 리턴
      }
      currentPageIndex++;
    } else if (event.deltaY < 0 && currentPageIndex > 0) {
      currentPageIndex--;
    }

    showPage(currentPageIndex);

    setTimeout(() => {
      isScrolling = false;
    }, 800);
  });

  // 메뉴 클릭으로 페이지 전환 (이미지 버튼 한 개 때문에 index + 1로 보정)
  navLinks.forEach((link, index) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      showPage(index); // index 1부터 page-1, page-2 ... 에 대응
    });
  });

  // 페이지 이동 시 아래처럼 사용
  if (canGoToNextPage()) {
    goToNextPage(); // 다음 페이지 전환 함수
  }

  // 초기 진입 시 첫 페이지 표시
  showPage(currentPageIndex);
});

// window.addEventListener("wheel", (event) => {
//   if (isScrolling) return;

//   // 내부 스크롤 가능한 영역에 휠 이벤트가 발생했는지 확인
//   const target = event.target.closest(".page");
//   const isMobile = window.innerWidth <= 768;

//   // 모바일이고 내부에서 스크롤 중이라면, window 휠 막기
//   if (isMobile && target && target.scrollHeight > target.clientHeight) {
//     const scrollTop = target.scrollTop;
//     const scrollBottom = scrollTop + target.clientHeight;

//     const scrollingDown = event.deltaY > 0;
//     const scrollingUp = event.deltaY < 0;

//     // 아래로 스크롤 시, 아직 다 안 내려갔다면 무시 (페이지 전환 방지)
//     if (scrollingDown && scrollBottom < target.scrollHeight) {
//       return; // 내부에서 더 스크롤할 게 있음
//     }

//     // 위로 스크롤 시, 아직 위에 더 남았다면 무시
//     if (scrollingUp && scrollTop > 0) {
//       return; // 내부에서 더 위로 스크롤할 게 있음
//     }
//   }

//   isScrolling = true;

//   if (event.deltaY > 0 && currentPageIndex < pages.length - 1) {
//     currentPageIndex++;
//   } else if (event.deltaY < 0 && currentPageIndex > 0) {
//     currentPageIndex--;
//   }

//   showPage(currentPageIndex);

//   setTimeout(() => {
//     isScrolling = false;
//   }, 800);
// });
