document.addEventListener("DOMContentLoaded", function () {
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const galleryWrapper = document.querySelector(".gallery-wrapper");
  const galleryComponents = document.querySelectorAll(".gallery-component");

  let slideIndex = 0; // 현재 보여지는 컴포넌트의 인덱스
  const slideWidth =
    galleryComponents[0].offsetWidth +
    parseInt(getComputedStyle(galleryComponents[0]).marginRight); // 컴포넌트 너비 + margin 너비 계산

  // 슬라이드 이전 버튼 클릭
  prevBtn.addEventListener("click", function () {
    if (slideIndex > 0) {
      slideIndex--;
    } else {
      slideIndex = galleryComponents.length - 2; // 마지막으로 이동
    }
    galleryWrapper.style.transition = "transform 0.3s ease"; // 부드럽게 이동
    galleryWrapper.style.transform = `translateX(-${
      slideWidth * slideIndex
    }px)`; // 슬라이드 이동
  });

  // 슬라이드 다음 버튼 클릭
  nextBtn.addEventListener("click", function () {
    if (slideIndex < galleryComponents.length - 2) {
      // 두 개씩 보여주기 위해 -2로 설정
      slideIndex++;
    } else {
      slideIndex = 0; // 처음으로 돌아가기
    }
    galleryWrapper.style.transition = "transform 0.3s ease"; // 부드럽게 이동
    galleryWrapper.style.transform = `translateX(-${
      slideWidth * slideIndex
    }px)`; // 슬라이드 이동
  });
});
