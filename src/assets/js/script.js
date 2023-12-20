function appMain() {

const changeTheme = document.querySelector(".change-theme");
let theme = localStorage.getItem("theme");
changeTheme.addEventListener('click', () => {
    if (theme === "dark") {
        document.querySelector("html").classList.remove("dark");
        document.querySelector("html").classList.add("light");
        theme = "light";
    } else {
        document.querySelector("html").classList.add("dark");
        document.querySelector("html").classList.remove("light");
        theme = "dark";
    }
    localStorage.setItem("theme", theme);
});
if (theme === "dark") {
    document.querySelector("html").classList.add("dark");
}
if (theme === "light") {
    document.querySelector("html").classList.add("light");
};

if (document.querySelector('.swiper')) {
  var swiper = new Swiper(".swiper", {
    grabCursor: true,
    spaceBetween: 20,
    lazy: true,
    centeredSlides: false,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 3000,
    },
    keyboard: {
      enabled: true
    },
    mousewheel: false,
    breakpoints: {
      460: {
        slidesPerView: 1
      },
      768: {
        slidesPerView: 2
      },
      1024: {
        slidesPerView: 4
      },
      1600: {
        slidesPerView: 4
      }
    }
  });
};

};